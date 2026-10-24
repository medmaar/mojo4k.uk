// POST /api/trial: automatic free trial.
// 1. Checks the request (honeypot, field formats, silent bot flood guard).
// 2. Creates a demo line on the Trex reseller panel (activationpanel API).
// 3. Emails the login to the customer with Resend (copy to us).
//
// Cloudflare Pages settings this needs (Settings > Variables and Secrets):
//   TREX_API_KEY     (secret)  reseller API key from the panel
//   RESEND_API_KEY   (secret)  Resend API key
//   TRIAL_KV         (KV binding, set in wrangler.toml)
// Optional:
//   TREX_API_URL      default https://activationpanel.ru/api/api.php
//   TREX_PACKAGE_ID   bouquet id to use; otherwise looked up by TREX_PACKAGE_NAME
//   TREX_PACKAGE_NAME default "USA - All"
//   TRIAL_FROM        default "MOJO 4K <help@mojo4k.uk>"
//   TRIAL_NOTIFY      default help@mojo4k.uk (gets an "Automation / mojo4k.uk / trial" copy)
//   TRIAL_SERVER_URL  default http://line.trxdnscloud.ru (server URL customers use)
//   TRIAL_REMIND_HOURS default 4 (reminder email this many hours before the trial ends)

import { loginEmail, adminEmail, reminderEmail, SUPPORT } from '../../lib/trial-mail.js';

const SERVER_URL = 'http://line.trxdnscloud.ru';
const TRIAL_HOURS = 24;
const DAY = 86400;
const FLOOD_LIMIT = 30; // requests per IP per hour before the silent fallback

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const sha = async (s) => {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`mojo4k-trial:${s}`));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('').slice(0, 40);
};

// ---- Trex panel adapter (activationpanel API v1.81) ----
const trex = {
  base: (env) => env.TREX_API_URL || 'https://activationpanel.ru/api/api.php',
  async call(env, params) {
    const u = new URL(trex.base(env));
    for (const [k, v] of Object.entries({ ...params, api_key: env.TREX_API_KEY })) u.searchParams.set(k, v);
    const r = await fetch(u, { headers: { Accept: 'application/json' } });
    const text = await r.text();
    let data;
    try { data = JSON.parse(text); } catch { throw new Error(`panel: not JSON (${r.status}) ${text.slice(0, 200)}`); }
    return data;
  },
  first: (d) => (Array.isArray(d) ? d[0] : d) || {},
  ok: (o) => String(o.status).toLowerCase() === 'true' || o.status === 1 || o.status === true,
  norm: (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(),
  async packageId(env) {
    if (env.TREX_PACKAGE_ID) return String(env.TREX_PACKAGE_ID);
    const cached = await env.TRIAL_KV.get('trex:pack');
    if (cached) return cached;
    const want = trex.norm(env.TREX_PACKAGE_NAME || 'USA - All');
    const list = await trex.call(env, { action: 'bouquet' });
    const rows = Array.isArray(list) ? list : Object.values(list || {});
    const hit = rows.find((b) => b && trex.norm(b.name) === want);
    if (!hit) throw new Error(`panel: package "${env.TREX_PACKAGE_NAME || 'USA - All'}" not found in ${rows.map((b) => b && b.name).join(', ')}`);
    await env.TRIAL_KV.put('trex:pack', String(hit.id), { expirationTtl: DAY });
    return String(hit.id);
  },
  async createDemo(env, note) {
    const pack = await trex.packageId(env);
    const o = trex.first(await trex.call(env, { action: 'new', type: 'm3u', sub: '99', pack, notes: note }));
    if (!trex.ok(o) || !o.url) throw new Error(`panel: ${o.message || JSON.stringify(o).slice(0, 200)}`);
    // The panel's own link can have an empty host (http:///get.php?...), so only the
    // username and password are taken from it; the server is ours to set.
    const q = new URLSearchParams(String(o.url).split('?')[1] || '');
    const server = String(env.TRIAL_SERVER_URL || SERVER_URL).replace(/\/+$/, '');
    const line = {
      userId: o.user_id || '',
      server,
      username: q.get('username') || '',
      password: q.get('password') || '',
      expire: '',
    };
    line.m3u = `${server}/get.php?username=${encodeURIComponent(line.username)}&password=${encodeURIComponent(line.password)}&type=m3u_plus&output=ts`;
    if (!line.username || !line.password) throw new Error('panel: no username/password in url');
    try { // best effort: real expiry date
      const info = trex.first(await trex.call(env, { action: 'device_info', username: line.username, password: line.password }));
      if (info.expire) line.expire = String(info.expire);
    } catch {}
    return line;
  },
};

// ---- Email (Resend) ----
const resend = async (env, msg) => {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env.TRIAL_FROM || `MOJO 4K <${SUPPORT}>`, reply_to: SUPPORT, ...msg }),
  });
  if (!r.ok) throw new Error(`resend ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return r.json().catch(() => ({}));
};

// ---- Handler ----
export async function onRequestPost({ request, env }) {
  if (!env.TRIAL_KV || !env.TREX_API_KEY) return json({ ok: false, code: 'setup' }, 503);
  let b;
  try { b = await request.json(); } catch { return json({ ok: false, code: 'bad' }, 400); }
  if (b.website) return json({ ok: true, emailed: true }); // honeypot: pretend it worked

  // Every field is optional: formats are only checked when something was typed.
  const name = String(b.first_name || '').trim().slice(0, 60);
  const email = String(b.email || '').trim().toLowerCase().slice(0, 120);
  const dial = String(b.dial_code || '').replace(/[^\d+]/g, '').slice(0, 6);
  const digits = String(b.phone || '').replace(/\D/g, '').replace(/^0+/, '');
  const notes = String(b.notes || '').trim().slice(0, 500);
  if ((email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) || (digits && (digits.length < 6 || digits.length > 15)))
    return json({ ok: false, code: 'invalid' }, 400);
  const phone = digits ? `${/^\+\d{1,4}$/.test(dial) ? dial : ''}${digits}` : '';

  // No limit on trials per customer. Only a silent flood guard against bots
  // hammering the panel (FLOOD_LIMIT requests per IP per hour); it falls back to
  // the manual request flow, so a real customer never sees a refusal.
  const kv = env.TRIAL_KV;
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const hIp = await sha(`${ip}:${new Date().toISOString().slice(0, 13)}`);
  const tries = Number(await kv.get(`ip:${hIp}`)) || 0;
  if (tries >= FLOOD_LIMIT) return json({ ok: false, code: 'busy' }, 503);
  await kv.put(`ip:${hIp}`, String(tries + 1), { expirationTtl: 2 * 3600 });

  let line;
  try {
    line = await trex.createDemo(env, `Trial / mojo4k.uk / ${email} | ${phone}`.slice(0, 200));
  } catch (e) {
    console.error('trial panel error', e && e.message);
    return json({ ok: false, code: 'panel' }, 502);
  }

  const created = new Date().toISOString();

  let emailed = false;
  if (email) {
    try { await resend(env, { to: [email], ...loginEmail(name, line) }); emailed = true; } catch (e) { console.error('trial email error', e && e.message); }
  }

  // Reminder a few hours before the trial ends, scheduled with Resend (no cron needed).
  let reminder = '';
  if (emailed) {
    const hrs = Number(env.TRIAL_REMIND_HOURS) || 4;
    const at = new Date(Date.now() + (TRIAL_HOURS - hrs) * 3600e3).toISOString();
    try { reminder = (await resend(env, { to: [email], scheduled_at: at, ...reminderEmail(name) })).id || 'scheduled'; }
    catch (e) { console.error('trial reminder error', e && e.message); }
  }

  const record = { created, name, email, phone, notes, emailed, reminder, ...line };
  try { await resend(env, { to: [env.TRIAL_NOTIFY || SUPPORT], ...(email ? { reply_to: email } : {}), ...adminEmail(record) }); } catch (e) { console.error('trial notify error', e && e.message); }

  // Kept 30 days so nothing is lost if an email fails.
  await kv.put(`trial:${created}:${(await sha(created + email)).slice(0, 8)}`, JSON.stringify(record), { expirationTtl: 30 * DAY });

  return json(emailed ? { ok: true, emailed } : { ok: true, emailed, login: { server: line.server, username: line.username, password: line.password, m3u: line.m3u, expire: line.expire } });
}

export const onRequest = () => json({ ok: false, code: 'method' }, 405);
