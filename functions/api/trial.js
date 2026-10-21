// POST /api/trial: automatic free trial.
// 1. Checks the request (honeypot, fields, one trial per email / number, IP rate limit).
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
//   TRIAL_NOTIFY      default help@mojo4k.uk (gets a copy of every trial email)

const SITE = 'https://mojo4k.uk';
const SUPPORT = 'help@mojo4k.uk';
const DAY = 86400;
const ONE_TRIAL_FOR = 90 * DAY; // one trial per email / number for 90 days
const IP_LIMIT = 3; // trial attempts per IP per day

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const sha = async (s) => {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`mojo4k-trial:${s}`));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('').slice(0, 40);
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

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
    const o = trex.first(await trex.call(env, { action: 'new', type: 'm3u', sub: '99', pack, note }));
    if (!trex.ok(o) || !o.url) throw new Error(`panel: ${o.message || JSON.stringify(o).slice(0, 200)}`);
    const u = new URL(o.url);
    const line = {
      userId: o.user_id || '',
      server: `${u.protocol}//${u.host}`,
      username: u.searchParams.get('username') || '',
      password: u.searchParams.get('password') || '',
      m3u: o.url,
      expire: '',
    };
    if (!line.username || !line.password) throw new Error('panel: no username/password in url');
    try { // best effort: real expiry date
      const info = trex.first(await trex.call(env, { action: 'device_info', username: line.username, password: line.password }));
      if (info.expire) line.expire = String(info.expire);
    } catch {}
    return line;
  },
};

// ---- Email ----
const emailHtml = (name, l) => {
  const row = (k, v) => `<tr><td style="padding:10px 14px;color:#6b6b80;font-size:14px;white-space:nowrap;border-bottom:1px solid #ececf2">${k}</td><td style="padding:10px 14px;font:600 15px/1.4 Menlo,Consolas,monospace;color:#0b1022;word-break:break-all;border-bottom:1px solid #ececf2">${esc(v)}</td></tr>`;
  return `<!doctype html><html lang="en-GB"><body style="margin:0;background:#f3f4f8;font-family:Arial,Helvetica,sans-serif;color:#1d1d2b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f8;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden">
<tr><td style="background:#060914;padding:20px 24px"><img src="${SITE}/brand/icon-512.png" width="36" height="36" alt="" style="vertical-align:middle;border-radius:8px"> <span style="vertical-align:middle;color:#fff;font:800 22px Arial,sans-serif;letter-spacing:-.5px">MOJO <span style="background:#C8102E;border-radius:6px;padding:1px 7px">4K</span></span></td></tr>
<tr><td style="padding:0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td height="4" style="background:#C8102E;font-size:0">&nbsp;</td><td height="4" style="background:#ffffff;font-size:0">&nbsp;</td><td height="4" style="background:#012169;font-size:0">&nbsp;</td></tr></table></td></tr>
<tr><td style="padding:28px 24px 8px">
<h1 style="margin:0 0 10px;font-size:22px;color:#0b1022">Your free trial is ready, ${esc(name)}!</h1>
<p style="margin:0 0 18px;font-size:15px;line-height:1.6">Here are your login details. Keep this email safe.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ececf2;border-radius:12px;border-collapse:separate;overflow:hidden">
${row('Server URL', l.server)}${row('Username', l.username)}${row('Password', l.password)}${l.expire ? row('Expires', l.expire) : ''}
</table>
<p style="margin:16px 0 6px;font-size:14px;color:#6b6b80">M3U playlist link (for apps that ask for a link):</p>
<p style="margin:0 0 22px;font:13px/1.5 Menlo,Consolas,monospace;word-break:break-all;background:#f6f6fa;border-radius:10px;padding:10px 12px">${esc(l.m3u)}</p>
<h2 style="margin:0 0 8px;font-size:17px;color:#0b1022">Get watching in 3 steps</h2>
<ol style="margin:0 0 20px;padding-left:20px;font-size:15px;line-height:1.7">
<li>Install an IPTV app on your device, for example IPTV Smarters Pro, TiviMate or IBO Player.</li>
<li>Choose <b>Xtream Codes</b> login and enter the server URL, username and password above (or paste the M3U link).</li>
<li>Open Live TV and enjoy. Step-by-step guides for every device: <a href="${SITE}/iptv-setup-guides/" style="color:#C8102E">mojo4k.uk/iptv-setup-guides</a></li>
</ol>
<p style="margin:0 0 24px"><a href="${SITE}/go/wa" style="display:inline-block;background:#25d366;color:#04210f;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:999px">Need help? Chat on WhatsApp</a></p>
<p style="margin:0 0 6px;font-size:14px;line-height:1.6">Enjoying it? Pick a plan any time at <a href="${SITE}/pricing/" style="color:#C8102E">mojo4k.uk/pricing</a>. Every plan has a 7-day money-back guarantee.</p>
</td></tr>
<tr><td style="padding:18px 24px 24px;font-size:12px;color:#8a8aa0">MOJO 4K · ${SUPPORT} · You received this because you asked for a free trial on mojo4k.uk.</td></tr>
</table></td></tr></table></body></html>`;
};

const emailText = (name, l) => `Your MOJO 4K free trial is ready, ${name}!

Server URL: ${l.server}
Username: ${l.username}
Password: ${l.password}${l.expire ? `\nExpires: ${l.expire}` : ''}
M3U link: ${l.m3u}

1. Install an IPTV app (IPTV Smarters Pro, TiviMate or IBO Player).
2. Choose Xtream Codes login and enter the details above (or paste the M3U link).
3. Setup guides: ${SITE}/iptv-setup-guides/

Help on WhatsApp: ${SITE}/go/wa
MOJO 4K · ${SUPPORT}`;

const sendEmail = async (env, to, name, line) => {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.TRIAL_FROM || `MOJO 4K <${SUPPORT}>`,
      to: [to],
      bcc: [env.TRIAL_NOTIFY || SUPPORT],
      reply_to: SUPPORT,
      subject: 'Your MOJO 4K free trial login',
      html: emailHtml(name, line),
      text: emailText(name, line),
    }),
  });
  if (!r.ok) throw new Error(`resend ${r.status}: ${(await r.text()).slice(0, 200)}`);
};

// ---- Handler ----
export async function onRequestPost({ request, env }) {
  if (!env.TRIAL_KV || !env.TREX_API_KEY) return json({ ok: false, code: 'setup' }, 503);
  let b;
  try { b = await request.json(); } catch { return json({ ok: false, code: 'bad' }, 400); }
  if (b.website) return json({ ok: true, emailed: true }); // honeypot: pretend it worked

  const name = String(b.first_name || '').trim().slice(0, 60);
  const email = String(b.email || '').trim().toLowerCase().slice(0, 120);
  const dial = String(b.dial_code || '').replace(/[^\d+]/g, '').slice(0, 6);
  const digits = String(b.phone || '').replace(/\D/g, '').replace(/^0+/, '');
  const notes = String(b.notes || '').trim().slice(0, 500);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !/^\+\d{1,4}$/.test(dial) || digits.length < 6 || digits.length > 15)
    return json({ ok: false, code: 'invalid' }, 400);
  const phone = `${dial}${digits}`;

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const [hEmail, hPhone, hIp] = await Promise.all([sha(email), sha(phone), sha(ip)]);
  const kv = env.TRIAL_KV;

  const tries = Number(await kv.get(`ip:${hIp}`)) || 0;
  if (tries >= IP_LIMIT) return json({ ok: false, code: 'limit' }, 429);
  await kv.put(`ip:${hIp}`, String(tries + 1), { expirationTtl: DAY });

  if ((await kv.get(`email:${hEmail}`)) || (await kv.get(`phone:${hPhone}`))) return json({ ok: false, code: 'used' }, 409);

  let line;
  try {
    line = await trex.createDemo(env, `Website trial · ${name} · ${email} · ${phone}`.slice(0, 200));
  } catch (e) {
    console.error('trial panel error', e && e.message);
    return json({ ok: false, code: 'panel' }, 502);
  }

  const created = new Date().toISOString();
  await Promise.all([
    kv.put(`email:${hEmail}`, created, { expirationTtl: ONE_TRIAL_FOR }),
    kv.put(`phone:${hPhone}`, created, { expirationTtl: ONE_TRIAL_FOR }),
  ]);

  let emailed = true;
  try { await sendEmail(env, email, name, line); } catch (e) { emailed = false; console.error('trial email error', e && e.message); }

  // Kept 30 days so nothing is lost if the email fails.
  await kv.put(`trial:${created}:${hEmail.slice(0, 8)}`, JSON.stringify({ created, name, email, phone, notes, emailed, ...line }), { expirationTtl: 30 * DAY });

  return json(emailed ? { ok: true, emailed } : { ok: true, emailed, login: { server: line.server, username: line.username, password: line.password, m3u: line.m3u, expire: line.expire } });
}

export const onRequest = () => json({ ok: false, code: 'method' }, 405);
