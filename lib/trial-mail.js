// Free trial emails (login, copy to us, reminder before the trial ends).
// Plain tables and inline styles so they render the same in Gmail, Outlook,
// Apple Mail and Zoho, on phones and desktops, in light and dark mode.
import { allPlans } from '../src/site.mjs';

const SITE = 'https://mojo4k.uk';
export const SUPPORT = 'help@mojo4k.uk';

const RED = '#C8102E';
const NAVY = '#012169';
const INK = '#0b1022';
const MUTED = '#5b5d73';
const FONT = "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO = "'SFMono-Regular',Menlo,Consolas,'Courier New',monospace";

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const shell = ({ preheader, body }) => `<!doctype html>
<html lang="en-GB" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>MOJO 4K</title>
<style>
  body { margin:0; padding:0; -webkit-text-size-adjust:100%; }
  a { color:${RED}; }
  @media (max-width: 620px) {
    .wrap { padding: 12px 8px !important; }
    .pad { padding-left: 20px !important; padding-right: 20px !important; }
    .h1 { font-size: 26px !important; line-height: 32px !important; }
    .val { font-size: 17px !important; }
    .stack { display: block !important; width: 100% !important; }
    .cell { padding: 8px 3px !important; font-size: 13px !important; }
    .pill { min-width: 0 !important; padding: 8px 9px !important; font-size: 14px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#eef0f6;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#eef0f6;">${esc(preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef0f6;">
<tr><td align="center" class="wrap" style="padding:28px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
<!-- header -->
<tr><td style="background:#060914;border-radius:20px 20px 0 0;padding:26px 28px 22px;" class="pad">
  <a href="${SITE}/uk/" style="text-decoration:none;"><img src="${SITE}/brand/logo-email.png" width="190" height="44" alt="MOJO 4K" style="display:block;border:0;width:190px;height:44px;color:#ffffff;font:800 24px ${FONT};"></a>
</td></tr>
<tr><td style="padding:0;font-size:0;line-height:0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td width="33%" height="5" style="background:${RED};font-size:0;line-height:0;">&nbsp;</td>
    <td width="34%" height="5" style="background:#ffffff;font-size:0;line-height:0;">&nbsp;</td>
    <td width="33%" height="5" style="background:${NAVY};font-size:0;line-height:0;">&nbsp;</td>
  </tr></table>
</td></tr>
<tr><td style="background:#ffffff;border-radius:0 0 20px 20px;padding:0;">
${body}
</td></tr>
<!-- footer -->
<tr><td align="center" style="padding:22px 16px 6px;font:13px/20px ${FONT};color:${MUTED};">
  <a href="${SITE}/uk/" style="color:${MUTED};text-decoration:none;font-weight:700;">MOJO 4K</a> · British TV, every match, films &amp; box sets in 4K<br>
  <a href="${SITE}/go/wa" style="color:${MUTED};">WhatsApp</a> · <a href="mailto:${SUPPORT}" style="color:${MUTED};">${SUPPORT}</a> · <a href="${SITE}/pricing/" style="color:${MUTED};">Plans</a>
</td></tr>
<tr><td align="center" style="padding:4px 16px 0;font:12px/18px ${FONT};color:#8b8da3;">You’re getting this because you asked for a free trial on mojo4k.uk.</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

const button = (href, label, bg = RED, color = '#ffffff') => `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr>
<td align="center" bgcolor="${bg}" style="border-radius:999px;background:${bg};">
<a href="${href}" target="_blank" style="display:inline-block;padding:15px 30px;font:700 16px/20px ${FONT};color:${color};text-decoration:none;border-radius:999px;">${label}</a>
</td></tr></table>`;

const field = (label, value, last) => `
<tr><td style="padding:14px 18px;${last ? '' : 'border-bottom:1px solid #e6e8f0;'}">
  <div style="font:600 12px/16px ${FONT};letter-spacing:.08em;text-transform:uppercase;color:${MUTED};">${label}</div>
  <div class="val" style="margin-top:6px;font:700 19px/26px ${MONO};color:${INK};word-break:break-all;">${esc(value)}</div>
</td></tr>`;

const step = (n, title, text) => `
<tr><td valign="top" width="48" style="padding:0 0 18px;">
  <div style="width:36px;height:36px;border-radius:50%;background:${RED};color:#ffffff;font:800 17px/36px ${FONT};text-align:center;">${n}</div>
</td><td valign="top" style="padding:2px 0 18px;">
  <div style="font:700 17px/24px ${FONT};color:${INK};">${title}</div>
  <div style="margin-top:2px;font:15px/23px ${FONT};color:${MUTED};">${text}</div>
</td></tr>`;

// ---- 1. Customer: the login ----
export const loginEmail = (name, l) => {
  const hi = name ? `, ${name}` : '';
  return {
  subject: 'Your MOJO 4K free trial is ready 🇬🇧',
  html: shell({
    preheader: `Your login details are inside${hi}. Start watching in minutes.`,
    body: `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td class="pad" style="padding:34px 36px 8px;">
  <div style="font:700 13px/18px ${FONT};letter-spacing:.14em;text-transform:uppercase;color:${RED};">Free trial activated</div>
  <h1 class="h1" style="margin:8px 0 10px;font:800 30px/36px ${FONT};color:${INK};letter-spacing:-.02em;">You’re all set${esc(hi)}!</h1>
  <p style="margin:0;font:16px/25px ${FONT};color:${MUTED};">Here’s your MOJO 4K login. Every channel, every match and every film is unlocked${l.expire ? ` until <b style="color:${INK};">${esc(l.expire)}</b>` : ''}.</p>
</td></tr>
<tr><td class="pad" style="padding:22px 36px 6px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:2px solid ${INK};border-radius:16px;border-collapse:separate;background:#f7f8fc;">
    <tr><td style="background:${INK};border-radius:13px 13px 0 0;padding:12px 18px;font:700 14px/20px ${FONT};color:#ffffff;">🔑 Your login details</td></tr>
    ${field('Server URL', l.server)}
    ${field('Username', l.username)}
    ${field('Password', l.password, true)}
  </table>
  <p style="margin:14px 0 4px;font:600 13px/18px ${FONT};color:${MUTED};">M3U playlist link (for apps that ask for one link):</p>
  <div style="padding:12px 14px;border-radius:12px;background:#f1f2f8;border:1px dashed #c9ccdc;font:13px/20px ${MONO};color:${INK};word-break:break-all;">${esc(l.m3u)}</div>
</td></tr>
<tr><td class="pad" style="padding:30px 36px 8px;">
  <h2 style="margin:0 0 18px;font:800 21px/28px ${FONT};color:${INK};">Start watching in 3 steps</h2>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    ${step(1, 'Install an IPTV app', 'IPTV Smarters Pro, TiviMate or IBO Player all work, on Firestick, Smart TV, phone, tablet or computer.')}
    ${step(2, 'Log in with Xtream Codes', 'Enter the server URL, username and password above. If your app asks for a playlist link, paste the M3U link instead.')}
    ${step(3, 'Grab the popcorn', `Open Live TV and enjoy. Stuck? Our <a href="${SITE}/iptv-setup-guides/" style="color:${RED};font-weight:700;">setup guides</a> cover every device.`)}
  </table>
</td></tr>
<tr><td class="pad" align="center" style="padding:10px 36px 8px;">
  ${button(`${SITE}/go/wa?text=${encodeURIComponent("Hi MOJO 4K, I need help setting up my free trial.")}`, '💬 Need a hand? WhatsApp us', '#25D366', '#04210f')}
  <p style="margin:12px 0 0;font:14px/21px ${FONT};color:${MUTED};">Real people, 24/7. Most messages answered within minutes.</p>
</td></tr>
<tr><td class="pad" style="padding:26px 36px 34px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#060914;border-radius:16px;">
    <tr><td style="padding:22px 22px;">
      <div style="font:800 18px/24px ${FONT};color:#ffffff;">Loving it? Keep watching from £7.</div>
      <div style="margin-top:4px;font:14px/21px ${FONT};color:#b9bbcc;">No contract, no auto-renewal, 7-day money-back guarantee.</div>
      <div style="margin-top:14px;"><a href="${SITE}/pricing/" style="display:inline-block;padding:11px 20px;border-radius:999px;background:${RED};color:#ffffff;font:700 15px/18px ${FONT};text-decoration:none;">See the plans →</a></div>
    </td></tr>
  </table>
</td></tr>
</table>`,
  }),
  text: `You're all set${hi}! Your MOJO 4K free trial is ready.

Server URL: ${l.server}
Username: ${l.username}
Password: ${l.password}${l.expire ? `\nExpires: ${l.expire}` : ''}
M3U link: ${l.m3u}

1. Install an IPTV app (IPTV Smarters Pro, TiviMate or IBO Player).
2. Log in with Xtream Codes using the details above, or paste the M3U link.
3. Setup guides: ${SITE}/iptv-setup-guides/

Help on WhatsApp: ${SITE}/go/wa
Plans from £7: ${SITE}/pricing/`,
  };
};

// ---- 2. Copy to us ----
export const adminEmail = (t) => ({
  subject: `Automation / mojo4k.uk / trial / ${t.name || 'No name'} / ${t.email || 'No email'}`,
  text: `New automatic free trial on mojo4k.uk

Name: ${t.name || '-'}
Email: ${t.email || '-'}
WhatsApp: ${t.phone || '-'}
Notes: ${t.notes || '-'}
Customer email sent: ${t.emailed ? 'yes' : 'NO (shown on screen instead)'}

Server URL: ${t.server}
Username: ${t.username}
Password: ${t.password}
Expires: ${t.expire || '-'}
M3U: ${t.m3u}
Panel user id: ${t.userId || '-'}
Created: ${t.created}`,
});

// ---- 3. Customer: reminder before the trial ends ----
const planUrl = (p) => `${SITE}/${p.slug}/`;
const monthsLabel = (m) => (m === 1 ? '1 month' : `${m} months`);

export const reminderEmail = (name) => {
  const hi = name ? `, ${name}` : '';
  const plans = allPlans();
  const months = [1, 6, 12];
  const devices = [...new Set(plans.map((p) => p.devices))];
  const find = (d, m) => plans.find((p) => p.devices === d && p.months === m);
  const best = find(1, 12);
  const grid = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0;border:1px solid #e1e4ee;border-radius:16px;overflow:hidden;">
  <tr>
    <td class="cell" style="padding:12px 10px;background:${INK};font:700 13px/18px ${FONT};color:#ffffff;">Screens</td>
    ${months.map((m) => `<td class="cell" align="center" style="padding:12px 10px;background:${INK};font:700 13px/18px ${FONT};color:#ffffff;">${monthsLabel(m)}</td>`).join('')}
  </tr>
  ${devices.map((d, i) => `<tr>
    <td class="cell" style="padding:12px 10px;${i ? 'border-top:1px solid #e1e4ee;' : ''}font:700 15px/20px ${FONT};color:${INK};white-space:nowrap;">${d} device${d > 1 ? 's' : ''}</td>
    ${months.map((m) => { const p = find(d, m); return `<td class="cell" align="center" style="padding:10px 6px;${i ? 'border-top:1px solid #e1e4ee;' : ''}${m === 12 ? 'background:#fff4f6;' : ''}">${p ? `<a href="${planUrl(p)}" class="pill" style="display:inline-block;min-width:64px;padding:9px 10px;border-radius:999px;border:2px solid ${m === 12 ? RED : '#cfd3e2'};font:800 15px/18px ${FONT};color:${m === 12 ? RED : INK};text-decoration:none;">£${p.price}</a>` : ''}</td>`; }).join('')}
  </tr>`).join('')}
</table>`;
  return {
    subject: `${name ? `${name}, your` : 'Your'} MOJO 4K free trial ends soon ⏰`,
    html: shell({
      preheader: 'Keep every channel, match and film. Plans from £7, no contract.',
      body: `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td class="pad" style="padding:34px 36px 6px;">
  <div style="font:700 13px/18px ${FONT};letter-spacing:.14em;text-transform:uppercase;color:${RED};">Your trial ends in a few hours</div>
  <h1 class="h1" style="margin:8px 0 10px;font:800 30px/36px ${FONT};color:${INK};letter-spacing:-.02em;">Don’t lose the telly${esc(hi)}!</h1>
  <p style="margin:0;font:16px/25px ${FONT};color:${MUTED};">Hope you’ve enjoyed MOJO 4K. Pick a plan below to keep every channel, every match and every film. Tap a price, fill in one short form, and we’ll keep you watching.</p>
</td></tr>
${best ? `<tr><td class="pad" style="padding:22px 36px 4px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#060914;border-radius:18px;">
    <tr><td style="padding:22px 24px;">
      <div style="display:inline-block;padding:4px 10px;border-radius:999px;background:${RED};font:700 12px/16px ${FONT};letter-spacing:.06em;text-transform:uppercase;color:#ffffff;">Best value</div>
      <div style="margin-top:10px;font:800 22px/28px ${FONT};color:#ffffff;">12 months · 1 device</div>
      <div style="margin-top:2px;font:800 40px/46px ${FONT};color:#ffffff;">£${best.price} <span style="font:500 15px/20px ${FONT};color:#b9bbcc;">just £${(best.price / 12).toFixed(2)} a month</span></div>
      <div style="margin-top:14px;"><a href="${planUrl(best)}" style="display:inline-block;padding:13px 24px;border-radius:999px;background:${RED};color:#ffffff;font:700 16px/20px ${FONT};text-decoration:none;">Choose this plan →</a></div>
    </td></tr>
  </table>
</td></tr>` : ''}
<tr><td class="pad" style="padding:26px 36px 6px;">
  <h2 style="margin:0 0 6px;font:800 21px/28px ${FONT};color:${INK};">All plans</h2>
  <p style="margin:0 0 14px;font:14px/21px ${FONT};color:${MUTED};">Choose how many screens watch at once and for how long. Tap any price to order.</p>
  ${grid}
</td></tr>
<tr><td class="pad" style="padding:20px 36px 6px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="font:15px/26px ${FONT};color:${INK};">
      ✅ 50,000+ live channels &amp; 300,000+ films and box sets<br>
      ✅ Every Premier League match, Sky Sports &amp; TNT Sports<br>
      ✅ No contract, no auto-renewal, priced in £<br>
      ✅ 7-day money-back guarantee
    </td></tr>
  </table>
</td></tr>
<tr><td class="pad" align="center" style="padding:24px 36px 34px;">
  ${button(`${SITE}/pricing/`, 'Compare all plans')}
  <p style="margin:14px 0 0;font:14px/21px ${FONT};color:${MUTED};">Questions? <a href="${SITE}/go/wa?text=${encodeURIComponent("Hi MOJO 4K, my free trial is ending and I'd like to pick a plan.")}" style="color:#128C4A;font-weight:700;">WhatsApp us</a>, we’re here 24/7.</p>
</td></tr>
</table>`,
    }),
    text: `Don't lose the telly${hi}! Your MOJO 4K free trial ends in a few hours.

Pick a plan to keep watching (tap to order):
${allPlans().map((p) => `- ${monthsLabel(p.months)}, ${p.devices} device${p.devices > 1 ? 's' : ''}: £${p.price}  ${planUrl(p)}`).join('\n')}

All plans: ${SITE}/pricing/
WhatsApp: ${SITE}/go/wa`,
  };
};
