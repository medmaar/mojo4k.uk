import { site, nav, waLink } from './site.mjs';
import { icon } from './icons.mjs';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const brand = `<a class="brand" href="/uk/" aria-label="MOJO 4K home"><picture><source srcset="/favicon.svg?v=__V__" media="(prefers-reduced-motion: reduce)"><img src="/brand/logo-animated.svg?v=__V__" width="40" height="40" alt=""></picture><span class="wm"><span class="m">MOJO</span><span class="k">4K</span><span class="uk" aria-hidden="true">UK</span></span></a>`;

const navLinks = (path) =>
  nav.map(([href, label]) => `<a href="${href}"${href === path ? ' aria-current="page"' : ''}>${label}</a>`).join('');

const tracking = () => {
  const out = [];
  const tags = site.gtag.filter(Boolean);
  if (tags.length) {
    out.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${tags[0]}"></script>`);
    out.push(`<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());${tags.map((t) => `gtag("config","${t}");`).join('')}</script>`);
  }
  if (site.facebookPixel) {
    out.push(`<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","${site.facebookPixel}");fbq("track","PageView");</script>`);
  }
  return out.join('\n');
};

const baseSchema = [
  {
    '@type': 'Organization',
    '@id': `${site.url}/uk/#organization`,
    name: site.name,
    alternateName: 'MOJO4K',
    url: `${site.url}/uk/`,
    logo: `${site.url}/brand/icon-512.png`,
    email: site.email,
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: site.email, areaServed: 'GB', availableLanguage: ['en-GB'] },
  },
  {
    '@type': 'WebSite',
    '@id': `${site.url}/uk/#website`,
    url: `${site.url}/uk/`,
    name: site.name,
    alternateName: 'MOJO4K',
    publisher: { '@id': `${site.url}/uk/#organization` },
    inLanguage: site.lang,
  },
];

export function page({ path, title, description, body, schema = [], ogImage = site.ogImage, noindex = false, preload = '' }) {
  const url = site.url + path;
  const graph = [
    ...baseSchema,
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, isPartOf: { '@id': `${site.url}/uk/#website` }, inLanguage: site.lang },
    ...schema,
  ];
  return `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large'}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="${site.themeColor}">
<meta property="og:locale" content="${site.locale}">
<meta name="geo.region" content="GB">
<meta name="geo.placename" content="United Kingdom">
<link rel="alternate" hreflang="en-GB" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${site.url}${ogImage}">
${site.googleSiteVerification ? `<meta name="google-site-verification" content="${site.googleSiteVerification}">\n` : ''}<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/brand/icon-512.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&family=Instrument+Serif:ital@0;1&display=swap">
${preload}<link rel="stylesheet" href="/css/site.css?v=__V__">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
${tracking()}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="progress" aria-hidden="true"></div>
<div class="top-bar">
<a class="promo" href="/referral/">🇬🇧 Refer a mate · get 1 year FREE <span>· <u>see how</u> →</span></a>
<header class="header">
  <div class="container">
    ${brand}
    <nav class="nav" aria-label="Main">${navLinks(path)}</nav>
    <div class="header-cta">
      <a class="btn btn--ghost btn--sm hide-sm" href="/free-iptv-trial-uk/">Free trial</a>
      <a class="btn btn--primary btn--sm" href="/pricing/">Get started</a>
      <button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav"><span></span></button>
    </div>
  </div>
</header>
</div>
<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">
  ${navLinks(path)}
  <a class="btn btn--primary btn--lg btn--block" href="/pricing/">See plans · 50% off</a>
  <a class="btn btn--ghost btn--lg btn--block" href="/free-iptv-trial-uk/">Ask for a free trial</a>
</nav>
<main id="main">
${body}
</main>
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        ${brand}
        <p style="margin-top:18px">IPTV made for British homes. Live telly, every match, films and box sets in stunning 4K on every screen. Priced in pounds, no contracts, no hidden fees.</p>
        <span class="made-in">🇬🇧 Made for British homes</span>
        <div class="pay" aria-label="Accepted payment methods"><span>VISA</span><span>Mastercard</span><span>PayPal</span><span>Apple Pay</span><span>Amex</span></div>
      </div>
      <div><h4>Service</h4><ul><li><a href="/pricing/">Pricing</a></li><li><a href="/free-iptv-trial-uk/">Free trial</a></li><li><a href="/uk-iptv-channels/">Channels list</a></li><li><a href="/iptv-setup-guides/">Setup guides</a></li></ul></div>
      <div><h4>Company</h4><ul><li><a href="/about/">About us</a></li><li><a href="/referral/">Referral programme</a></li><li><a href="/contact/">Contact us</a></li></ul></div>
      <div><h4>Legal</h4><ul><li><a href="/terms/">Terms &amp; conditions</a></li><li><a href="/privacy/">Privacy policy</a></li><li><a href="/refunds/">Refund policy</a></li><li><a href="/disclaimer/">Disclaimer</a></li></ul></div>
      <div><h4>Get in touch</h4><ul>
        <li><a href="/go/wa" target="_blank" rel="noopener">WhatsApp</a></li>
        <li><a href="/go/telegram" target="_blank" rel="noopener">Telegram</a></li>
        <li><a href="mailto:${site.email}">${site.email}</a></li>
      </ul></div>
    </div>
    <p class="footer-disclaimer"><strong>Disclaimer:</strong> MOJO 4K does not host or stream any copyrighted content. All content is provided by third-party providers. Users are responsible for ensuring they have the rights to view content in their jurisdiction. <a href="/disclaimer/">Read more</a></p>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} MOJO 4K. All rights reserved.</span>
      <span>🇬🇧 Serving England, Scotland, Wales &amp; Northern Ireland · Prices in £ · 7-day money-back guarantee</span>
    </div>
  </div>
  <div class="footer-word" aria-hidden="true">MOJO 4K</div>
</footer>
<div class="dock" aria-label="Contact us">
  <a class="wa" href="/go/wa" target="_blank" rel="noopener" data-label="Chat on WhatsApp" aria-label="Chat on WhatsApp">${icon.whatsapp}</a>
  <a class="em" href="mailto:${site.email}" data-label="Email us" aria-label="Email us">${icon.mail}</a>
</div>
<script src="/js/site.js?v=__V__" defer></script>
</body>
</html>
`;
}

// Shared blocks used by several pages.

export const pageHero = ({ kicker, title, lead, actions = '' }) => `
<section class="page-hero">
  <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div><div class="grid-bg" aria-hidden="true"></div>
  <div class="container z narrow center">
    ${kicker ? `<span class="kicker">${kicker}</span>` : ''}
    <h1 class="h1">${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${actions ? `<div class="btn-row center-row">${actions}</div>` : ''}
  </div>
</section>`;

export const ctaBand = (title = 'Ready to ditch the Sky bill?', text = 'Every match, all your British telly and the latest films in 4K, for half what you pay Sky. Up and running within 5 minutes.') => `
<section class="section section--tight">
  <div class="container">
    <div class="cta-band reveal">
      <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
      <span class="kicker">Start today</span>
      <h2 class="h2">${title}</h2>
      <p>${text}</p>
      <div class="btn-row center-row">
        <a class="btn btn--primary btn--lg" href="/pricing/">See plans · 50% off</a>
        <a class="btn btn--wa btn--lg" href="/go/wa" target="_blank" rel="noopener">${icon.whatsapp} Chat on WhatsApp</a>
      </div>
    </div>
  </div>
</section>`;

export const waButton = (label = 'Chat on WhatsApp', text) =>
  `<a class="btn btn--wa btn--lg" href="${text ? waLink(text) : '/go/wa'}" target="_blank" rel="noopener">${icon.whatsapp} ${label}</a>`;
