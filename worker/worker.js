/**
 * MOJO 4K UK — Worker (iptv-trial-mojo4kuk), same layout as every other site's trial Worker.
 * Today it runs the invoice emails for paid plans (the generated block below). The site's free
 * trial still runs as the Pages Function functions/api/trial.js.
 * Secret (Cloudflare → Workers → iptv-trial-mojo4kuk → Settings → Variables and Secrets): RESEND_KEY.
 * KV binding TRIALS = namespace "Trial-mojo4k.uk" (the same one the site uses as TRIAL_KV).
 */

const FROM_EMAIL  = "MOJO 4K <help@mojo4k.uk>";
const ADMIN_EMAIL = "help@mojo4k.uk";
const SITE_URL    = "https://mojo4k.uk/uk/";

// Brand used by the invoice email (same shape as EMAIL_BRAND in the other sites' Workers).
const EMAIL_BRAND = {
  "name": "MOJO 4K",
  "domain": "mojo4k.uk",
  "url": "https://mojo4k.uk/uk/",
  "lang": "en",
  "email": "help@mojo4k.uk",
  "logo": {
    "src": "https://iptv-trial-mojo4kuk.medmaar.workers.dev/email/logo.png?v=1",
    "w": 190,
    "h": 44
  },
  "c": {
    "head": "#060914",
    "headLine": "#060914",
    "accent": "#C8102E",
    "btn": "#C8102E",
    "onBtn": "#FFFFFF"
  },
  "waUrl": "https://mojo4k.uk/go/wa",
  "waLabel": ""
};

const EMAIL_LOGO_PNG = "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";

function tkLogoResponse(request) {
  if (request.method !== "GET" || new URL(request.url).pathname !== "/email/logo.png") return null;
  const bin = atob(EMAIL_LOGO_PNG), bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Response(bytes, { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable", "Access-Control-Allow-Origin": "*" } });
}

async function handleFetch(request, env) {
  if (request.method === "GET" && new URL(request.url).pathname === "/") return new Response("MOJO 4K UK Worker — OK", { status: 200 });
  return new Response("Not found", { status: 404 });
}

// ── invoice emails (generated by invoice-emails/build.mjs from kit.js and sites.mjs; edit those, not this block) ──

const INVOICE = (() => {
const SITE = {
  "name": "MOJO 4K",
  "domain": "mojo4k.uk",
  "url": "https://mojo4k.uk/uk/",
  "lang": "en",
  "email": "help@mojo4k.uk",
  "from": "help@mojo4k.uk",
  "admin": "help@mojo4k.uk",
  "logo": {
    "src": "https://iptv-trial-mojo4kuk.medmaar.workers.dev/email/logo.png?v=1",
    "w": 190,
    "h": 44
  },
  "head": "#060914",
  "headLine": "#060914",
  "btn": "#C8102E",
  "onBtn": "#FFFFFF",
  "accent": "#C8102E",
  "waUrl": "https://mojo4k.uk/go/wa",
  "waLabel": "",
  "cur": "GBP",
  "map": {
    "7": 9,
    "12": 18,
    "17": 27,
    "23": 36,
    "27": 45,
    "29": 39,
    "39": 49,
    "49": 69,
    "62": 89,
    "71": 105,
    "83": 135,
    "90": 140,
    "110": 180,
    "117": 175,
    "138": 225
  },
  "header": {
    "src": "https://iptv-trial-mojo4kuk.medmaar.workers.dev/invoice/header.png?v=1daad6416a",
    "h": 92
  }
};
const HEADER_PNG = "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";

// Invoice email for paid plans (1, 3, 6, 12 months). Free trials never come here.
// The site's order form POSTs { name, email, plan } to /invoice right after its order email is sent.
// Static sites load /invoice.js instead, which does that POST after a successful EmailJS order send.
// Needs SITE (brand, contacts, lang, cur, map, manual) defined above it and env.RESEND_KEY.
// The payment link (full URL, LINKS below) is picked by the order's amount only: USD and EUR amounts use the same links,
// SITE.map turns another currency's price into the USD price first (GBP on mojo4k.uk).
// The client's email shows the price in the site's own currency (SITE.cur).
// Unknown amount → the client gets nothing and the site inbox gets a notice instead.
// SITE.manual → the client gets nothing and the site inbox gets the order to invoice by hand.
// INVOICE_MODE (below) does the same for every order while it is "notify_owner".

// Who gets the email when a client orders a paid plan. Flip this one line to switch.
//   "notify_owner": the client gets nothing; the site inbox (SITE.admin) gets a sale notification
//                   with the order and its payment link, to invoice the client by hand.
//   "send_client":  the client gets the invoice email with the payment link; the site inbox gets a copy notice.
// 18 Nov 2026: invoices to clients are back on (Mo), with the night queue below.
const INVOICE_MODE = "send_client";

// Night queue: invoices are emailed to clients from 05:00 to 00:59 UTC (UTC+0 all year, no DST).
// An order placed from 01:00 to 04:59 UTC is saved in the Worker's KV ("invoiceq:" keys) and emailed
// after 05:00 by flushQueue(): GET/POST <base>/invoice-flush. mojo4k.de's Worker cron (every hour, on the hour)
// calls it on every site; a GitHub workflow is a backup (GitHub starts scheduled runs hours late), and every
// daytime order also sends what is waiting.
// The site inbox hears about the night order at once ("sale queued / ...") and again when it is sent.
// To change the hours, edit these two numbers.
const NIGHT_PAUSE_FROM_UTC = 1; // first queued hour (01:00)
const NIGHT_PAUSE_TO_UTC = 5;   // first hour invoices go out again (05:00)
function nightPaused(now = new Date()) {
  const h = now.getUTCHours();
  return h >= NIGHT_PAUSE_FROM_UTC && h < NIGHT_PAUSE_TO_UTC;
}

const LINKS = {
  9: "https://www.exploringnewlocationdaily.com/l/Andiamo?wanted=true",
  18: "https://www.exploringnewlocationdaily.com/l/Allons-y?wanted=true",
  27: "https://www.exploringnewlocationdaily.com/l/Vamonos?wanted=true",
  29: "https://www.exploringnewlocationdaily.com/l/Deutschland?wanted=true",
  36: "https://www.exploringnewlocationdaily.com/l/Pme?wanted=true",
  39: "https://www.exploringnewlocationdaily.com/l/VamosLa?wanted=true",
  45: "https://www.exploringnewlocationdaily.com/l/Idemo?wanted=true",
  49: "https://www.exploringnewlocationdaily.com/l/osterreich?wanted=true",
  50: "https://www.exploringnewlocationdaily.com/l/Magyarorszg?wanted=true",
  69: "https://www.exploringnewlocationdaily.com/l/DanubeDuo?wanted=true",
  75: "https://www.exploringnewlocationdaily.com/l/MediterraneanTrio?wanted=true",
  89: "https://www.exploringnewlocationdaily.com/l/WesternFour?wanted=true",
  99: "https://www.exploringnewlocationdaily.com/l/CentralEFour?wanted=true",
  105: "https://www.exploringnewlocationdaily.com/l/SunSeaFive?wanted=true",
  120: "https://www.exploringnewlocationdaily.com/l/TheGrandTourSix?wanted=true",
  135: "https://www.exploringnewlocationdaily.com/l/WesternSouthernSeven?wanted=true",
  140: "https://www.exploringnewlocationdaily.com/l/CentralEasternEight?wanted=true",
  175: "https://www.exploringnewlocationdaily.com/l/TheGrandEuropeanNine?wanted=true",
  180: "https://www.exploringnewlocationdaily.com/l/TheExpandedEuropeTen?wanted=true",
  225: "https://www.exploringnewlocationdaily.com/l/TheCompleteCollection?wanted=true",
};

// The message text is Mo's, word for word; the other languages are straight translations of it.
const TEXT = {
  en: {
    subject: "Your secure payment invoice",
    hi: "Hi {name},", hiAnon: "Hi there,",
    intro: "Please find below your secure payment invoice for {what}:",
    preheader: "Your secure payment invoice for {what} is ready.",
    order: "Order", amount: "Amount", pay: "Pay securely",
    note: "Please note that the invoice description may differ due to our payment provider’s requirements. This does not affect your order — your subscription remains exactly as agreed.",
    activation: "Once your payment is completed, activation usually takes <strong>between 5 minutes and 2 hours</strong>.",
    screenshot: "Please send us a screenshot of your payment confirmation email after payment so we can verify your order and proceed with activation as quickly as possible.",
    thanks: "Thank you!", team: "The {brand} Team",
    why: "You are receiving this email because you placed an order on {domain}.",
    waText: "Hi {brand}! Here is my payment confirmation.",
    months: { 1: "one month", 3: "three months", 6: "six months", 12: "one year" },
    plan: { 1: "1 Month", 3: "3 Months", 6: "6 Months", 12: "12 Months" },
    devices: (n) => `${n} Device${n > 1 ? "s" : ""}`, withDevices: (what, n) => `${what} (${n} devices)`,
  },
  fr: {
    subject: "Votre facture de paiement sécurisée",
    hi: "Bonjour {name},", hiAnon: "Bonjour,",
    intro: "Veuillez trouver ci-dessous votre facture de paiement sécurisée pour {what}&nbsp;:",
    preheader: "Votre facture de paiement sécurisée pour {what} est prête.",
    order: "Commande", amount: "Montant", pay: "Payer en toute sécurité",
    note: "Veuillez noter que la description de la facture peut différer en raison des exigences de notre prestataire de paiement. Cela n’affecte pas votre commande — votre abonnement reste exactement tel que convenu.",
    activation: "Une fois votre paiement effectué, l’activation prend généralement <strong>entre 5 minutes et 2 heures</strong>.",
    screenshot: "Veuillez nous envoyer une capture d’écran de votre e-mail de confirmation de paiement après le paiement, afin que nous puissions vérifier votre commande et procéder à l’activation le plus rapidement possible.",
    thanks: "Merci&nbsp;!", team: "L’équipe {brand}",
    why: "Vous recevez cet e-mail car vous avez passé une commande sur {domain}.",
    waText: "Bonjour {brand} ! Voici ma confirmation de paiement.",
    months: { 1: "un mois", 3: "trois mois", 6: "six mois", 12: "un an" },
    plan: { 1: "1 mois", 3: "3 mois", 6: "6 mois", 12: "12 mois" },
    devices: (n) => `${n} appareil${n > 1 ? "s" : ""}`, withDevices: (what, n) => `${what} (${n} appareils)`,
  },
  de: {
    subject: "Ihre sichere Zahlungsrechnung",
    hi: "Hallo {name},", hiAnon: "Hallo,",
    intro: "anbei finden Sie Ihre sichere Zahlungsrechnung für {what}:",
    preheader: "Ihre sichere Zahlungsrechnung für {what} ist bereit.",
    order: "Bestellung", amount: "Betrag", pay: "Sicher bezahlen",
    note: "Bitte beachten Sie, dass die Rechnungsbeschreibung aufgrund der Anforderungen unseres Zahlungsanbieters abweichen kann. Dies hat keinen Einfluss auf Ihre Bestellung — Ihr Abonnement bleibt genau wie vereinbart.",
    activation: "Sobald Ihre Zahlung abgeschlossen ist, dauert die Aktivierung in der Regel <strong>zwischen 5 Minuten und 2 Stunden</strong>.",
    screenshot: "Bitte senden Sie uns nach der Zahlung einen Screenshot Ihrer Zahlungsbestätigungs-E-Mail, damit wir Ihre Bestellung überprüfen und die Aktivierung so schnell wie möglich durchführen können.",
    thanks: "Vielen Dank!", team: "Ihr {brand}-Team",
    why: "Sie erhalten diese E-Mail, weil Sie eine Bestellung auf {domain} aufgegeben haben.",
    waText: "Hallo {brand}! Hier ist meine Zahlungsbestätigung.",
    months: { 1: "einen Monat", 3: "drei Monate", 6: "sechs Monate", 12: "ein Jahr" },
    plan: { 1: "1 Monat", 3: "3 Monate", 6: "6 Monate", 12: "12 Monate" },
    devices: (n) => `${n} ${n > 1 ? "Geräte" : "Gerät"}`, withDevices: (what, n) => `${what} (${n} Geräte)`,
  },
  no: {
    subject: "Din sikre betalingsfaktura",
    hi: "Hei {name},", hiAnon: "Hei,",
    intro: "Her er din sikre betalingsfaktura for {what}:",
    preheader: "Din sikre betalingsfaktura for {what} er klar.",
    order: "Bestilling", amount: "Beløp", pay: "Betal trygt",
    note: "Vær oppmerksom på at fakturabeskrivelsen kan avvike på grunn av kravene fra betalingsleverandøren vår. Dette påvirker ikke bestillingen din — abonnementet ditt er nøyaktig som avtalt.",
    activation: "Når betalingen er fullført, tar aktiveringen vanligvis <strong>mellom 5 minutter og 2 timer</strong>.",
    screenshot: "Send oss et skjermbilde av e-posten med betalingsbekreftelsen etter at du har betalt, slik at vi kan bekrefte bestillingen din og aktivere abonnementet så raskt som mulig.",
    thanks: "Tusen takk!", team: "Hilsen {brand}",
    why: "Du mottar denne e-posten fordi du har lagt inn en bestilling på {domain}.",
    waText: "Hei {brand}! Her er betalingsbekreftelsen min.",
    months: { 1: "én måned", 3: "tre måneder", 6: "seks måneder", 12: "ett år" },
    plan: { 1: "1 måned", 3: "3 måneder", 6: "6 måneder", 12: "12 måneder" },
    devices: (n) => `${n} ${n > 1 ? "tilkoblinger" : "tilkobling"}`, withDevices: (what, n) => `${what} (${n} tilkoblinger)`,
  },
};

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif";
const MONO = "SFMono-Regular,Menlo,Consolas,'Liberation Mono','Courier New',monospace";
const C = { page: "#F2F3F5", card: "#FFFFFF", ink: "#14171F", body: "#4B5161", muted: "#8A8F9C", line: "#E6E8EC", box: "#F7F8FA" };
const NO_NAME = ["anonymous", "anonym", "(not provided)", "not provided", "ikke oppgitt", "non renseigné", "nicht angegeben", "-", "—"];

const T = () => TEXT[SITE.lang] || TEXT.en;

// The price as the client saw it on the site: "$49 USD", "49 €", "£39", "1215 kr".
function money(n, cur, html = true) {
  const sp = html ? "&nbsp;" : " ", lang = SITE.lang;
  const v = Number.isInteger(n) ? String(n) : Number(n).toFixed(2).replace(".", lang === "en" ? "." : ",");
  if (cur === "EUR") return lang === "en" ? `€${v}` : `${v}${sp}€`;
  if (cur === "GBP") return `£${v}`;
  if (cur === "NOK") return `${v}${sp}kr`;
  if (!html) return `$${v}`;
  return lang === "en" ? `$${v} USD` : lang === "fr" ? `${v}${sp}$${sp}US` : `${v}${sp}USD`;
}
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (s, vars) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

// Reads the order out of whatever plan text the site sends, in any of its languages:
// "12 Months - 1 Device — $49", "6 Monate / 1 Verbindung / 39€", "1 Jahr IPTV Abo für 2 Geräte – 89 € (2 Geräte, 1 Jahr)",
// "2 appareils — 12 mois — 69€", "12 Months · 2 Devices — £62", "12 måneder – 3 tilkoblinger – kr 1215"
// → { amount (site's own price), cur (site's currency), usd (invoice price), months, devices }
function parsePlan(plan) {
  const s = String(plan || "").replace(/\s+/g, " ");
  const num = (v) => Number(String(v).replace(/[.,](?=\d{3}\b)/g, "").replace(",", "."));
  const CUR = { "$": "USD", "€": "EUR", "£": "GBP", usd: "USD", eur: "EUR", gbp: "GBP" };
  let amount = null, cur = null;
  const sym = s.match(/([$€£])\s*(\d[\d.,]*)|(\d[\d.,]*)\s*(€|\$|£|USD|EUR|GBP)/i);
  const nok = s.match(/(?:\bkr\.?|\bNOK)\s*(\d[\d.,]*)|(\d[\d.,]*)\s*(?:kr\b|NOK\b)/i);
  if (sym) { amount = num(sym[2] || sym[3]); cur = CUR[(sym[1] || sym[4]).toLowerCase()]; }
  else if (nok) { amount = num(nok[1] || nok[2]); cur = "NOK"; }
  cur = SITE.cur || cur || "USD";
  const usd = amount == null ? null : SITE.map ? SITE.map[amount] ?? null : cur === "NOK" ? null : amount;
  const year = /(?:^|[^\d])(?:1|one|un|ein|ett)\s*(?:years?|an|ans|année|jahr|år)(?![a-zà-ÿ])/i.test(s);
  const m = s.match(/(\d+)\s*(?:months?|mois|monate?|måned(?:er)?|maaned(?:er)?)(?![a-zà-ÿ])/i) || s.match(/(?:^|[^\w])(\d+)m(?![a-zà-ÿ\d])/i);
  const months = m ? Number(m[1]) : year ? 12 : null;
  const d = s.match(/(\d+)\s*(?:devices?|connections?|connexions?|appareils?|écrans?|ger(?:ä|a)te?|verbindung(?:en)?|tilkobling(?:er)?|enhet(?:er)?)(?![a-zà-ÿ])/i);
  return { amount, cur, usd, months, devices: d ? Number(d[1]) : 1 };
}

function describe({ months, devices }) {
  const t = T(), base = t.months[months] || t.months[12];
  return devices > 1 ? t.withDevices(base, devices) : base;
}

function summary({ months, devices }) {
  const t = T();
  return `${t.plan[months] || ""} · ${t.devices(devices)}`.replace(/^ · /, "");
}

function linkFor(usd) {
  return Number.isInteger(usd) && LINKS[usd] ? LINKS[usd] : null;
}

function greeting(name) {
  const full = String(name || "").trim(), first = full.split(/\s+/)[0] || "";
  return !first || NO_NAME.includes(full.toLowerCase()) ? T().hiAnon : fmt(T().hi, { name: esc(first) });
}

function invoiceEmail({ name, parsed, link }) {
  const S = SITE, t = T(), what = describe(parsed);
  const vars = { brand: esc(S.name), domain: S.domain };
  const p = (html, extra = "") => `<p style="margin:0 0 16px;font-size:16px;line-height:25px;color:${C.body};${extra}">${html}</p>`;
  const wa = `${S.waUrl || `https://wa.me/${S.wa}`}?text=${encodeURIComponent(fmt(t.waText, { brand: S.name }))}`;
  return `<!DOCTYPE html>
<html lang="${S.lang === "no" ? "nb" : S.lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">
<title>${esc(S.name)}</title>
<style>
  body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}
  img{border:0;outline:none;text-decoration:none}a{text-decoration:none}
  @media only screen and (max-width:620px){.o{padding:12px 8px!important}.x{padding-left:22px!important;padding-right:22px!important}.b{padding-left:18px!important;padding-right:18px!important}.v{display:block!important;width:100%!important;text-align:left!important;padding-top:0!important;border-top:0!important}.l{display:block!important;width:100%!important;padding-bottom:2px!important}}
</style></head>
<body style="margin:0;padding:0;background-color:${C.page};" bgcolor="${C.page}">
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${fmt(t.preheader, { what: esc(what) })}${"&#847;&zwnj;&nbsp;".repeat(40)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background-color:${C.page};">
<tr><td align="center" class="o" style="padding:24px 10px;">
<!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.card}" style="max-width:600px;background-color:${C.card};border-radius:10px;border-collapse:separate;font-family:${FONT};">
  ${S.header ? `<tr><td align="center" bgcolor="${S.head}" style="background-color:${S.head};border-radius:10px 10px 0 0;padding:0;font-size:0;line-height:0;">
    <a href="${S.url}" target="_blank"><img src="${S.header.src}" width="600" height="${S.header.h}" alt="${esc(S.name)}" style="display:block;width:100%;max-width:600px;height:auto;border-radius:10px 10px 0 0;color:#FFFFFF;font:700 22px ${FONT};"></a>
  </td></tr>` : `<tr><td align="center" bgcolor="${S.head}" style="background-color:${S.head};border-bottom:1px solid ${S.headLine || S.head};border-radius:10px 10px 0 0;padding:24px 20px;">
    <a href="${S.url}" target="_blank"><img src="${S.logo.src}" width="${S.logo.w}" height="${S.logo.h}" alt="${esc(S.name)}" style="display:block;margin:0 auto;max-width:100%;height:auto;color:${S.head === "#FFFFFF" ? C.ink : "#FFFFFF"};font:700 22px ${FONT};"></a>
  </td></tr>`}
  <tr><td class="x" style="padding:32px 40px 8px;">
    ${p(greeting(name), `color:${C.ink};font-weight:600;`)}
    ${p(fmt(t.intro, { what: esc(what) }))}
  </td></tr>
  <tr><td class="x" style="padding:0 40px 28px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.box}" style="background-color:${C.box};border:1px solid ${C.line};border-top:3px solid ${S.btn};border-radius:8px;border-collapse:separate;">
      <tr><td class="b" style="padding:22px 26px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td class="l" style="padding:0 0 10px;font-size:14px;line-height:22px;color:${C.muted};">${t.order}</td>
              <td class="v" align="right" style="padding:0 0 10px;font-size:15px;line-height:22px;font-weight:700;color:${C.ink};">${esc(summary(parsed))}</td></tr>
          <tr><td class="l" style="padding:10px 0 18px;border-top:1px solid ${C.line};font-size:14px;line-height:22px;color:${C.muted};">${t.amount}</td>
              <td class="v" align="right" style="padding:10px 0 18px;border-top:1px solid ${C.line};font-size:20px;line-height:24px;font-weight:800;color:${C.ink};">${money(parsed.amount, parsed.cur)}</td></tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td align="center" bgcolor="${S.btn}" style="background-color:${S.btn};border-radius:6px;">
            <a href="${esc(link)}" target="_blank" style="display:inline-block;padding:14px 28px;font-size:16px;line-height:20px;font-weight:700;color:${S.onBtn || "#FFFFFF"};border-radius:6px;">${t.pay} &rarr;</a>
          </td></tr></table>
        <div style="margin:16px 0 0;padding:10px 12px;background-color:${C.card};border:1px solid ${C.line};border-radius:6px;font-family:${MONO};font-size:14px;line-height:21px;word-break:break-all;"><a href="${esc(link)}" target="_blank" style="color:${S.accent};font-weight:700;">${esc(link)}</a></div>
      </td></tr>
    </table>
  </td></tr>
  <tr><td class="x" style="padding:0 40px 12px;">
    ${p(t.note)}
    ${p(t.activation.replace("<strong>", `<strong style="color:${C.ink};">`))}
    ${p(t.screenshot, `padding:14px 16px;background-color:${C.box};border-left:3px solid ${S.btn};border-radius:4px;color:${C.ink};`)}
  </td></tr>
  <tr><td class="x" style="padding:0 40px 36px;">
    <div style="border-top:1px solid ${C.line};padding-top:22px;">
      ${p(`${t.thanks}<br><strong style="color:${C.ink};">${fmt(t.team, vars)}</strong>`, "margin:0;")}
    </div>
  </td></tr>
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;font-family:${FONT};">
  <tr><td align="center" style="padding:20px 16px 4px;font-size:12px;line-height:20px;color:${C.muted};">
    <a href="${S.url}" target="_blank" style="color:${C.muted};">${S.domain}</a>
    &nbsp;&middot;&nbsp; <a href="${wa}" target="_blank" style="color:${C.muted};">WhatsApp${S.waLabel ? "&nbsp;" + esc(S.waLabel).replace(/ /g, "&nbsp;") : ""}</a>
    &nbsp;&middot;&nbsp; <a href="mailto:${S.email}" style="color:${C.muted};">${S.email}</a><br>
    ${fmt(t.why, vars)}
  </td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table>
</body></html>`;
}

// Served at /invoice.js for the static sites' order pages. After an EmailJS order send succeeds
// (emailjs.send, emailjs.sendForm or a fetch to api.emailjs.com), it posts the order to /invoice.
// It never changes what the page does, does nothing on a failed send, and posts each order once
// (EmailJS v4's emailjs.send goes through fetch, so both hooks see the same order).
function hookScript(base) {
  return `(function(){
var U=${JSON.stringify(base + "/invoice")},seen={};
function post(p){try{
  var email=String(p.from_email||p.email||p.reply_to||"").trim();
  var plan=String(p.plan||"");if(p.price&&plan.indexOf(p.price)<0)plan+=" — "+p.price;
  if(!plan||!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email))return;
  var k=email.toLowerCase()+"|"+plan;if(seen[k]&&Date.now()-seen[k]<60000)return;seen[k]=Date.now();
  var body=JSON.stringify({name:String(p.from_name||p.full_name||p.name||""),email:email,plan:plan});
  (window.__ivFetch||fetch)(U,{method:"POST",headers:{"Content-Type":"application/json"},body:body,keepalive:true}).catch(function(){});
}catch(e){}}
function after(pr,p){try{if(pr&&pr.then)pr.then(function(){post(p);},function(){});}catch(e){}return pr;}
function formObj(f){var o={};try{if(typeof f==="string")f=document.querySelector(f);new FormData(f).forEach(function(v,k){o[k]=v;});}catch(e){}return o;}
if(!window.__ivFetch){window.__ivFetch=window.fetch;window.fetch=function(u,o){
  var pr=window.__ivFetch.apply(this,arguments);
  try{if(String(u&&u.url||u).indexOf("api.emailjs.com")>-1&&o&&typeof o.body==="string"){var b=JSON.parse(o.body);
    pr.then(function(r){if(r&&r.ok)post(b.template_params||{});},function(){});}}catch(e){}
  return pr;};}
function wrap(){var e=window.emailjs;if(!e||!e.send||e.__iv)return !!(e&&e.__iv);
  var s=e.send,sf=e.sendForm;
  e.send=function(a,b,p){return after(s.apply(this,arguments),p||{});};
  if(sf)e.sendForm=function(a,b,f){var o=formObj(f);return after(sf.apply(this,arguments),o);};
  e.__iv=1;return true;}
if(!wrap()){var n=0,t=setInterval(function(){if(wrap()||++n>200)clearInterval(t);},50);}
})();`;
}

const cors = (origin) => ({ "Access-Control-Allow-Origin": origin || "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Vary": "Origin" });
const json = (data, status, origin) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...cors(origin) } });

async function send(env, from, to, subject, html, replyTo) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_KEY || env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) throw new Error(`Resend (${res.status}): ${await res.text()}`);
}

// One invoice per address and plan every 10 minutes, so a double click never sends two.
// Kept in the Worker's KV under "invoice:" (trial records use other keys); Cache API as a fallback.
async function seenBefore(env, email, planText) {
  const raw = new TextEncoder().encode(`${email.toLowerCase()}|${planText}`);
  const hash = [...new Uint8Array(await crypto.subtle.digest("SHA-256", raw))].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
  const kv = env.TRIALS || env.TRIAL_KV, key = `invoice:${SITE.domain}:${hash}`;
  try {
    if (kv) {
      if (await kv.get(key)) return { hit: true };
      await kv.put(key, "1", { expirationTtl: 600 });
      return { hit: false, undo: () => kv.delete(key) };
    }
    const cache = caches.default, req = new Request(`https://invoice.local/${key}`);
    if (await cache.match(req)) return { hit: true };
    await cache.put(req, new Response("1", { headers: { "Cache-Control": "max-age=600" } }));
    return { hit: false, undo: () => cache.delete(req) };
  } catch (err) {
    console.error("[invoice] dedupe", err.message);
    return { hit: false };
  }
}

// The client's invoice email plus the site inbox's copy notice.
async function sendInvoice(env, { name, email, planText, parsed, link, queuedAt }) {
  const S = SITE, from = `${S.name} <${S.from || S.email}>`, admin = S.admin || S.email;
  const who = `${name || "-"} / ${email}`, price = parsed.amount == null ? "?" : money(parsed.amount, parsed.cur, false);
  const facts = `Name: ${esc(name || "-")}<br>Email: ${esc(email)}<br>Plan: ${esc(planText)}`;
  await send(env, from, email, T().subject, invoiceEmail({ name, parsed, link }), S.email);
  const late = queuedAt ? `<br>Ordered at ${esc(queuedAt)} (night), sent from the morning queue.` : "";
  await send(env, from, admin, `invoice / ${S.domain} / $${parsed.usd} / ${who}${queuedAt ? " / from night queue" : ""}`,
    `<p>Invoice emailed to the client.</p><p>${facts}<br>Price shown to the client: ${esc(price)}<br>Link ($${parsed.usd}): <a href="${link}">${link}</a>${late}</p>`, email).catch((e) => console.error("[invoice] admin copy", e.message));
}

const QKEY = () => `invoiceq:${SITE.domain}:`;
const kvOf = (env) => env.TRIALS || env.TRIAL_KV || null;

// Saves a night order (kept 14 days at most). Returns false when there is no KV to save it in.
async function enqueue(env, order) {
  const kv = kvOf(env);
  if (!kv) return false;
  const at = new Date();
  const key = `${QKEY()}${at.toISOString()}:${Math.random().toString(36).slice(2, 10)}`;
  await kv.put(key, JSON.stringify({ ...order, at: at.toISOString(), tries: 0 }), { expirationTtl: 14 * 86400 });
  return true;
}

// Emails every queued night invoice, oldest first. Does nothing from 01:00 to 04:59 UTC.
// A failed send stays queued for the next run; after 5 failures the site inbox gets it to send by hand.
async function flushQueue(env) {
  if (INVOICE_MODE !== "send_client" || SITE.manual) return { ok: true, sent: 0, waiting: 0, note: "manual" };
  if (nightPaused()) return { ok: true, sent: 0, waiting: null, note: "night: queue is sent from 05:00 UTC" };
  const kv = kvOf(env);
  if (!kv) return { ok: true, sent: 0, waiting: 0, note: "no kv" };
  let sent = 0, failed = 0, keys = [], cursor;
  do {
    const page = await kv.list({ prefix: QKEY(), cursor });
    keys.push(...page.keys.map((k) => k.name));
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor);
  // Nothing waiting: no KV writes at all (this runs every hour from the scheduled sender).
  if (!keys.length) return { ok: true, sent: 0, failed: 0, waiting: 0 };
  // One run at a time (the scheduled run and a daytime order can arrive together).
  const lock = `invoiceq-lock:${SITE.domain}`;
  if (await kv.get(lock)) return { ok: true, sent: 0, waiting: keys.length, note: "another run is sending" };
  await kv.put(lock, "1", { expirationTtl: 60 });
  try {
    keys.sort();
    for (const key of keys) {
      const raw = await kv.get(key);
      if (!raw) continue;
      let o;
      try { o = JSON.parse(raw); } catch { await kv.delete(key); continue; }
      const parsed = parsePlan(o.planText), link = linkFor(parsed.usd);
      try {
        if (!link) throw new Error(`no link for ${parsed.usd}`);
        // Claim it before sending, so a second run can never email the same invoice twice.
        await kv.delete(key);
        await sendInvoice(env, { ...o, parsed, link, queuedAt: o.at });
        sent++;
      } catch (err) {
        failed++;
        const tries = (o.tries || 0) + 1;
        console.error("[invoice] queued send", key, err.message);
        if (tries >= 5 || !link) {
          const S = SITE, from = `${S.name} <${S.from || S.email}>`;
          await send(env, from, S.admin || S.email, `invoice NOT sent / ${S.domain} / ${o.planText} / ${o.name || "-"} / ${o.email}`,
            `<p>A night order could not be emailed from the morning queue (${esc(err.message)}). Please send the invoice yourself.</p><p>Name: ${esc(o.name || "-")}<br>Email: ${esc(o.email)}<br>Plan: ${esc(o.planText)}<br>Ordered at: ${esc(o.at)}</p>`, o.email).catch(() => {});
          await kv.delete(key);
        } else {
          await kv.put(key, JSON.stringify({ ...o, tries }), { expirationTtl: 14 * 86400 });
        }
      }
    }
  } finally {
    await kv.delete(lock).catch(() => {});
  }
  return { ok: failed === 0, sent, failed, waiting: keys.length - sent };
}

// GET <base>/invoice.js, GET <base>/invoice/header.png and POST <base>/invoice ("/invoice" on the Workers, "/api/invoice" on Pages).
// Returns null for any other request.
async function handle(request, env) {
  const url = new URL(request.url);
  if (url.pathname.endsWith("/invoice.js") && request.method === "GET") {
    return new Response(hookScript(url.origin + url.pathname.slice(0, -"/invoice.js".length)), { headers: { "Content-Type": "application/javascript; charset=utf-8", "Cache-Control": "public, max-age=300", "Access-Control-Allow-Origin": "*" } });
  }
  // The email's header (brand colour + logo) as one picture, so mail apps in dark mode can't
  // recolour the band behind a light logo.
  if (url.pathname.endsWith("/invoice/header.png") && request.method === "GET" && HEADER_PNG) {
    const bin = atob(HEADER_PNG), bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new Response(bytes, { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable", "Access-Control-Allow-Origin": "*" } });
  }
  // Sends the invoices queued at night (only from 05:00 UTC). Safe to call any time: it only sends what is due.
  if (url.pathname.endsWith("/invoice-flush") && (request.method === "GET" || request.method === "POST")) {
    const r = await flushQueue(env);
    return new Response(JSON.stringify(r), { status: r.ok ? 200 : 500, headers: { "Content-Type": "application/json" } });
  }
  if (!url.pathname.endsWith("/invoice")) return null;
  const origin = request.headers.get("Origin") || "";
  const host = origin.replace(/^https?:\/\/(www\.)?/, "");
  if (request.method === "OPTIONS") return new Response(null, { headers: cors(origin) });
  if (request.method !== "POST") return json({ error: "not found" }, 404, origin);
  // Only the site's own pages may ask for an invoice.
  if (host !== SITE.domain) return json({ error: "unknown site" }, 403, origin);

  let body;
  try { body = await request.json(); } catch { return json({ error: "bad json" }, 400, origin); }
  const name = String(body.name || "").trim().slice(0, 100);
  const email = String(body.email || "").trim().slice(0, 200);
  const planText = String(body.plan || "").slice(0, 300);
  // A form without the client's email falls back to the site's own address: nothing to send then.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.toLowerCase().endsWith("@" + SITE.domain) || !planText) {
    return json({ success: true, invoice: false }, 200, origin);
  }
  // No plan length in the text means it isn't a plan order (a lead or trial form): nothing to do.
  const parsed = parsePlan(planText);
  if (!parsed.months) return json({ success: true, invoice: false }, 200, origin);

  const seen = await seenBefore(env, email, planText);
  if (seen.hit) return json({ success: true, duplicate: true }, 200, origin);

  const link = linkFor(parsed.usd);
  const S = SITE, from = `${S.name} <${S.from || S.email}>`, admin = S.admin || S.email;
  const who = `${name || "-"} / ${email}`, price = parsed.amount == null ? "?" : money(parsed.amount, parsed.cur, false);
  const facts = `Name: ${esc(name || "-")}<br>Email: ${esc(email)}<br>Plan: ${esc(planText)}`;
  try {
    // Manual mode (INVOICE_MODE, or SITE.manual on a site that is always manual): only the site inbox hears about the sale.
    if (S.manual || INVOICE_MODE !== "send_client") {
      const pay = link ? `<br>Payment link for $${parsed.usd}: <a href="${link}">${link}</a>` : "<br>Payment link: none for this amount";
      const why = S.manual ? "Invoices for this site are always sent by hand" : "Invoice emails to clients are switched off (INVOICE_MODE)";
      await send(env, from, admin, `sale / ${S.domain} / ${price} / ${who}`,
        `<p>New sale on ${S.domain}. ${why}, so nothing was emailed to the client. Please deliver the order and send the invoice yourself.</p><p>${facts}<br>Price: ${esc(price)}${pay}</p>`, email);
      return json({ success: true, invoice: false }, 200, origin);
    }
    if (!link) {
      await send(env, from, admin, `invoice NOT sent / ${S.domain} / ${price} / ${who}`,
        `<p>No payment link matches this order, so no invoice was emailed to the client. Please send it by hand.</p><p>${facts}<br>Price read: ${esc(price)}</p>`, email);
      return json({ success: true, invoice: false }, 200, origin);
    }
    // Night (01:00 to 04:59 UTC): save the order; flushQueue() emails the invoice after 05:00 UTC.
    if (nightPaused()) {
      const queued = await enqueue(env, { name, email, planText });
      if (queued) {
        await send(env, from, admin, `sale queued / ${S.domain} / ${price} / ${who}`,
          `<p>New sale on ${S.domain} at night. The invoice is saved and will be emailed to the client automatically after 05:00 UTC. Nothing to do.</p><p>${facts}<br>Price: ${esc(price)}<br>Link ($${parsed.usd}): <a href="${link}">${link}</a></p>`, email);
        return json({ success: true, invoice: false, queued: true }, 200, origin);
      }
      // No storage to queue in: never lose the sale, hand it to the site inbox instead.
      await send(env, from, admin, `sale / ${S.domain} / ${price} / ${who} / night, not queued`,
        `<p>New sale on ${S.domain} at night. It could not be saved for the 05:00 UTC send, so nothing was emailed to the client. Please send the invoice yourself.</p><p>${facts}<br>Price: ${esc(price)}<br>Payment link for $${parsed.usd}: <a href="${link}">${link}</a></p>`, email);
      return json({ success: true, invoice: false }, 200, origin);
    }
    await sendInvoice(env, { name, email, planText, parsed, link });
    // Daytime order: also send anything still waiting from the night.
    await flushQueue(env).catch((e) => console.error("[invoice] flush", e.message));
    return json({ success: true, invoice: true }, 200, origin);
  } catch (err) {
    if (seen.undo) await seen.undo().catch(() => {});
    console.error("[invoice]", err.message);
    return json({ success: false, error: err.message }, 500, origin);
  }
}

return { handle, flushQueue, hookScript, invoiceEmail, parsePlan, describe, linkFor, money };
})();

// ── end invoice emails ──

export default {
  async fetch(request, env) { return (await INVOICE.handle(request, env)) || tkLogoResponse(request) || handleFetch(request, env); },
};
