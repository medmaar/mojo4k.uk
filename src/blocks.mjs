import { pricing, planFeatures, faqs } from './site.mjs';
import { icon } from './icons.mjs';
import { trustpilot, whatsapp, google } from './reviews.mjs';

const monthsLabel = (m) => (m === 1 ? '1 Month' : `${m} Months`);
const perMonth = (p) => (p.months === 1 ? 'Billed monthly' : `≈ £${(p.price / p.months).toFixed(2)}/mo`);
const conn = (d) => `${d} device${d > 1 ? 's' : ''} at the same time`;

export const planCard = (p, devices, i) => `<article class="plan${p.months === 12 ? ' plan--best' : ''} reveal" style="--d:${(i * 0.08).toFixed(2)}s">
  ${p.months === 12 ? '<span class="plan-badge">Best value</span>' : ''}
  <div class="plan-name">${monthsLabel(p.months)}</div>
  <div class="plan-sub"><span class="js-sub">${devices} simultaneous connection${devices > 1 ? 's' : ''}</span></div>
  <div class="price"><span class="cur">£</span><span class="amt">${p.price}</span><span class="per">/ ${p.months === 1 ? '1 month' : `${p.months} months`}</span></div>
  <div class="price-meta"><s>£${p.original}</s><span class="save">Save 50%</span><span class="per-month">${perMonth(p)}</span></div>
  <ul class="checks"><li><span class="js-conn">${conn(devices)}</span></li>${planFeatures.map((f) => `<li>${f.replace(/&/g, '&amp;')}</li>`).join('')}</ul>
  <a class="btn ${p.months === 12 ? 'btn--primary' : 'btn--ghost'} btn--block" href="/${p.slug}/">Get ${monthsLabel(p.months)}</a>
  <div class="plan-foot">Ready within 5 minutes</div>
</article>`;

export const pricingSection = ({ heading = true, id = 'pricing' } = {}) => {
  const first = pricing[0];
  return `<section class="section" id="${id}">
  <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="container z"><div data-pricing>
  ${heading ? `<div class="section-head reveal"><span class="kicker">Pricing</span><h2 class="h2">Simple plans. <span class="grad-text nowrap">Half the price.</span></h2><p>Every plan includes every channel, every match, every film and every feature. Pick how many screens you need and how long you want to save.</p></div>` : ''}
  <div class="seg-wrap reveal"><p class="seg-note">How many devices will watch at the same time?</p>
  <div class="seg" role="tablist" aria-label="Number of devices" style="--n:${pricing.length};--i:0"><span class="seg-thumb" aria-hidden="true"></span>${pricing
    .map((g, i) => `<button type="button" role="tab" data-devices="${g.devices}" aria-selected="${i === 0}"><b>${g.devices}</b> <span>device${g.devices > 1 ? 's' : ''}</span></button>`)
    .join('')}</div></div>
  <div class="plans">${first.plans.map((p, i) => planCard(p, first.devices, i)).join('')}</div>
  <div class="pricing-foot">
    <span>${icon.refund} 7-day money-back guarantee</span>
    <span>${icon.bolt} Ready within 5 minutes</span>
    <span>${icon.chat} 24/7 live support</span>
    <span>${icon.lock} Secure &amp; private</span>
  </div>
  <p class="center muted small" style="margin-top:14px">All prices in pounds sterling (£). No contract, no auto-renewal, no nasty surprises.</p>
  <script type="application/json">${JSON.stringify(pricing.map(({ devices, plans }) => ({ devices, plans: plans.map(({ months, price, original, slug }) => ({ months, price, original, slug })) })))}</script>
  </div></div>
</section>`;
};

export const faqList = (items = faqs) =>
  `<div class="faq">${items.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}</summary><div class="answer"><p>${a}</p></div></details>`).join('')}</div>`;

export const faqSchema = (items = faqs) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
});

export const faqSection = (items = faqs) => `<section class="section" id="faq">
  <div class="container faq-layout">
    <div class="faq-aside reveal">
      <span class="kicker">FAQ</span>
      <h2 class="h2">Frequently asked questions</h2>
      <p class="muted">Can't find what you're looking for? Our team replies in minutes, day and night.</p>
      <div class="btn-row" style="margin-top:22px">
        <a class="btn btn--wa" href="/go/wa" target="_blank" rel="noopener">${icon.whatsapp} Chat on WhatsApp</a>
      </div>
    </div>
    <div class="reveal">${faqList(items)}</div>
  </div>
</section>`;

const logos = [
  ['2024/12/sky-sport.png', 'Sky Sports'], ['2024/12/tnt-sports.png', 'TNT Sports'], ['2024/12/sky-cinema.png', 'Sky Cinema'],
  ['2024/12/bein-sports.png', 'beIN Sports'], ['2024/12/dazn.png', 'DAZN'], ['2024/12/sky-max.png', 'Sky Max'],
  ['2024/12/netflix.png', 'Netflix'], ['2024/12/prime-video.png', 'Prime Video'], ['2024/12/apple-plus.png', 'Apple TV+'],
  ['2024/12/hbo-max.png', 'HBO Max'], ['2024/12/espn.png', 'ESPN'], ['2024/12/FOX.webp', 'FOX'],
  ['2024/12/national-geographic.png', 'National Geographic'], 
  ['2024/12/canal-.png', 'Canal+'], 
  ['2024/12/brand_item09-150x46-1.webp', 'TV network'],
  ['2024/12/brand_item08-150x46-1.webp', 'TV network'], ['2024/12/brand_item06-150x46-1.webp', 'TV network'], ['2024/12/brand_item05-150x46-1.webp', 'TV network'],
];

// Continuous sliding strip: the items are rendered twice so the loop is seamless.
// The second copy is hidden from screen readers.
export const marquee = (items, { speed = 60, reverse = false, cls = '' } = {}) =>
  `<div class="marquee ${cls}${reverse ? ' marquee--rev' : ''}" style="--speed:${speed}s"><div class="marquee-track"><div class="marquee-set">${items.join('')}</div><div class="marquee-set" aria-hidden="true">${items.join('')}</div></div></div>`;

const logoTile = ([src, alt], hidden) =>
  `<div class="logo-tile"><img src="/images/${src}" alt="${hidden ? '' : alt}" height="40" loading="lazy" data-fallback="${alt}"></div>`;

export const logoMarquee = () => `<section class="section--tight">
  <p class="center muted small" style="margin-bottom:22px">All your favourite British channels, sport and streaming in one subscription</p>
  ${marquee(logos.slice(0, 9).map((l) => logoTile(l)), { speed: 45 })}
  <div style="height:14px"></div>
  ${marquee(logos.slice(9).map((l) => logoTile(l)), { speed: 50, reverse: true })}
</section>`;

export const posters = ['movies-4.jpg', 'movies-3.jpg', 'movies-2.jpg', 'movies-1.jpg', 'movies.jpg', 'movies-6.jpg', 'movies-5.jpg', 'movies-7.jpg', 'movies-8.webp', 'movies-9.webp', 'movies-10.webp', 'movies-11.webp', 'movies-12.webp', 'movies-13.webp'].map((f) => `/images/2025/01/${f}`);

export const posterImg = (src, lazy = true, alt = '') => `<img src="${src}" alt="${alt}" width="590" height="800"${lazy ? ' loading="lazy"' : ''}>`;

const devices = [
  ['android-phone.png', 'Android phone'], ['apple-tv.png', 'Apple TV'], ['samsung-tv.webp', 'Samsung TV'], ['smarters-player.png', 'Smarters Player'],
  ['fire-tv.png', 'Fire TV'], ['android-tv.png', 'Android TV'], ['lg-smart-tv.png', 'LG Smart TV'], ['ios-devices.png', 'iOS devices'],
  ['buzz-tv.png', 'Buzz TV'], ['firestick.png', 'Firestick'], ['informir-box.png', 'Infomir box'], ['magbox.png', 'MAG box'],
  ['nvidia-shield.png', 'Nvidia Shield'], ['windows.png', 'Windows'], ['web-player.png', 'Web player'], ['xbox.webp', 'Xbox'],
];

export const devicesSection = () => `<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="kicker">Every screen</span><h2 class="h2">Works on the kit you already own</h2><p>Firestick, Samsung and LG Smart TVs, Android boxes, iPhone, laptops and more. Use the IPTV app you already know.</p></div>
  </div>
  <div class="reveal">
    ${marquee(devices.slice(0, 8).map(([f, a]) => `<div class="device"><img src="/images/2024/12/${f}" alt="${a}" width="300" height="100" loading="lazy" data-fallback="${a}"></div>`), { speed: 40, cls: 'devices-rail' })}
    <div style="height:14px"></div>
    ${marquee(devices.slice(8).map(([f, a]) => `<div class="device"><img src="/images/2024/12/${f}" alt="${a}" width="300" height="100" loading="lazy" data-fallback="${a}"></div>`), { speed: 44, reverse: true, cls: 'devices-rail' })}
  </div>
  <div class="container">
    <div class="apps reveal">${['IPTV Smarters Pro', 'TiviMate', 'IBO Player', 'Smart One', 'DuplexPlay', 'OTT Navigator', 'MAG / Formuler', 'Kodi', 'VLC'].map((a) => `<span class="chip">${a}</span>`).join('')}</div>
  </div>
</section>`;

// Written customer reviews in the same layout as the Maple4K reviews section:
// Trustpilot (one big card at a time), WhatsApp (chat cards) and Google (star cards).
const escHtml = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const flags = {
  GB: '<svg class="rv-flag" viewBox="0 0 60 30" aria-label="United Kingdom" role="img"><clipPath id="uk-c"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="uk-t"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath><g clip-path="url(#uk-c)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" clip-path="url(#uk-t)" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></g></svg>',
  US: '<svg class="rv-flag" viewBox="0 0 20 14" aria-label="United States" role="img"><rect width="20" height="14" fill="#B22234"/><path d="M0 1.6h20M0 3.8h20M0 5.9h20M0 8.1h20M0 10.2h20M0 12.4h20" stroke="#fff" stroke-width="1.08"/><rect width="8" height="7.54" fill="#3C3B6E"/></svg>',
  CA: '<svg class="rv-flag" viewBox="0 0 20 14" aria-label="Canada" role="img"><rect width="20" height="14" fill="#FF0000"/><rect x="5" width="10" height="14" fill="#fff"/><polygon points="10,2 11,5.5 14.5,5.5 11.8,7.5 12.8,11 10,9 7.2,11 8.2,7.5 5.5,5.5 9,5.5" fill="#FF0000"/></svg>',
};
const tpStars = (cls = '') => `<span class="tp-stars ${cls}" role="img" aria-label="Rated 5 out of 5">${'<i>★</i>'.repeat(5)}</span>`;
const tpLogo = `<div class="rv-logo"><svg viewBox="0 0 260 62" width="190" height="45" role="img" aria-label="Trustpilot, 5 stars"><path d="M28 0l5.5 17H52L37.5 27.5l5.5 17L28 34 13 44.5l5.5-17L4 17h18.5z" fill="#00b67a"/><path d="M28 0l5.5 17H52L37.5 27.5 28 34V0z" fill="#005128"/><text x="60" y="22" font-family="Arial,sans-serif" font-weight="700" font-size="22" fill="#fff">Trustpilot</text><g transform="translate(60,32)">${[0, 24, 48, 72, 96].map((x) => `<rect x="${x}" width="20" height="20" rx="2" fill="#00b67a"/><text x="${x + 10}" y="15" text-anchor="middle" font-size="14" fill="#fff">★</text>`).join('')}</g></svg></div>`;
const waLogo = `<div class="rv-logo rv-logo--wa"><span class="rv-wa-tile">${icon.whatsapp}</span><span>WhatsApp</span></div>`;
const gLogo = `<div class="rv-logo"><svg viewBox="0 0 230 56" width="200" height="49" role="img" aria-label="Google Reviews"><path d="M22 10C15.4 10 10 15.4 10 22s5.4 12 12 12c5.6 0 10.3-3.8 11.6-9H22v-4h16.2c.2 1 .3 2 .3 3 0 8.8-5.9 15-16.5 15C10.5 39 4 32.5 4 22S10.5 5 22 5c5.6 0 10.2 2.1 13.8 5.4l-3.6 3.6C29.8 11.6 26.2 10 22 10z" fill="#4285F4"/><text x="50" y="26" font-family="Arial,sans-serif" font-weight="700" font-size="24" dominant-baseline="middle"><tspan fill="#4285F4">G</tspan><tspan fill="#EA4335">o</tspan><tspan fill="#FBBC05">o</tspan><tspan fill="#4285F4">g</tspan><tspan fill="#34A853">l</tspan><tspan fill="#EA4335">e</tspan></text><text x="50" y="48" font-family="Arial,sans-serif" font-weight="600" font-size="15" fill="rgba(255,255,255,.6)">Reviews</text><text x="122" y="48" font-family="Arial,sans-serif" font-size="15" fill="#FBBC05">★★★★★</text></svg></div>`;

// A swipeable slider: cards snap into place, dots and autoplay come from site.js.
const slider = (cards, { per = 1, label }) =>
  `<div class="rv-slider" data-slider style="--per:${per}" aria-roledescription="carousel" aria-label="${label}"><div class="rv-track" tabindex="0">${cards.join('')}</div><div class="rv-dots" role="tablist" aria-label="Choose slide"></div></div>`;

const tpCard = (r) => `<article class="rv-card rv-card--tp">
  <div class="rv-card-top">${tpStars()}<span class="rv-verified">${icon.check} Verified</span></div>
  <h3 class="rv-title">${escHtml(r.title)}</h3>
  <p class="rv-text">${escHtml(r.text)}</p>
  <p class="rv-by rv-by--tp">— ${escHtml(r.name)} ${flags[r.country] || ''}<span class="rv-date">Date of experience: ${r.date}</span></p>
</article>`;

const waCard = (r) => `<article class="rv-card rv-card--wa">
  <div class="rv-wa-head"><span class="rv-wa-avatar">${icon.whatsapp}</span><span><b>WhatsApp</b><small>${escHtml(r.topic)}</small></span></div>
  <div class="rv-chat">${r.lines.map((l) => `<p class="rv-bubble">${escHtml(l)}</p>`).join('')}</div>
  <p class="rv-by rv-by--wa">— Verified customer · name hidden at their request</p>
</article>`;

const gCard = (r) => `<article class="rv-card rv-card--g">
  <span class="g-stars" role="img" aria-label="Rated ${r.rating || 5} out of 5">${'★'.repeat(r.rating || 5)}</span>
  <p class="rv-gname">${escHtml(r.name)}</p>
  <p class="rv-text">${escHtml(r.text)}</p>
</article>`;

export const reviewsSection = () => `<section class="section rv-section" id="reviews">
  <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="container z">
    <div class="section-head reveal">
      <span class="kicker">Verified reviews</span>
      <h2 class="h2">What customers say about <span class="grad-text nowrap">MOJO 4K</span></h2>
      <p>Real feedback from Trustpilot, WhatsApp${google.length ? ' &amp; Google' : ''}, copied word for word.</p>
      <div class="rv-stats">
        <div><b class="c-tp">5★</b><span>Trustpilot</span></div>
        <div><b class="c-wa">24/7</b><span>WhatsApp support</span></div>
        ${google.length ? '<div><b class="c-g">★★★★★</b><span>Google</span></div>' : ''}
        <div><b class="c-red">5 min</b><span>Activation</span></div>
        <div><b class="c-blue">7-day</b><span>Money back</span></div>
      </div>
    </div>
    <div class="rv-block reveal">${tpLogo}<div class="rv-narrow">${slider(trustpilot.map(tpCard), { per: 1, label: 'Trustpilot reviews' })}</div></div>
    <div class="rv-block reveal">${waLogo}<div class="rv-mid">${slider(whatsapp.map(waCard), { per: 2, label: 'WhatsApp feedback' })}</div></div>
    ${google.length ? `<div class="rv-block reveal">${gLogo}${slider(google.map(gCard), { per: 3, label: 'Google reviews' })}</div>` : ''}
  </div>
</section>`;

export const sportsList = [
  ['⚽', 'Football', 'Every Premier League match, EFL, FA Cup, SPFL, Champions League, England & Scotland'],
  ['🥊', 'Boxing & UFC', 'Every big fight night on PPV, UFC, WWE & MMA'],
  ['🏎️', 'Motorsport', 'Formula 1 incl. the British Grand Prix, MotoGP, BTCC'],
  ['🏏', 'Cricket', 'England Tests, The Ashes, The Hundred, IPL'],
  ['🏉', 'Rugby', 'Six Nations, Premiership Rugby, Super League, Lions tours'],
  ['🎾', 'Tennis', 'Wimbledon, Queen’s and every Grand Slam'],
  ['🏇', 'Racing', 'Cheltenham, the Grand National, Royal Ascot'],
  ['🎯', 'Darts, snooker & golf', 'PDC World Championship, the Crucible, The Open, Ryder Cup'],
];

// A news-ticker style band of what's on, in flag colours.
const tickerItems = ['Premier League', 'Sky Sports', 'TNT Sports', 'BBC One', 'ITV1', 'Six Nations', 'Wimbledon', 'The Ashes', 'British Grand Prix', 'Cheltenham Festival', 'Champions League', 'Boxing PPV', 'Sky Cinema', 'Channel 4', 'Grand National', 'PDC Darts', 'The Open', 'SPFL'];
export const ticker = () => `<div class="ticker-wrap"><div class="ticker" role="presentation"><span class="ticker-label"><span class="live-dot"></span>Live on MOJO 4K</span>${marquee(tickerItems.map((t) => `<span class="ticker-item">${t}</span>`), { speed: 55, cls: 'ticker-rail' })}</div></div>`;
