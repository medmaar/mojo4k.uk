import { pricing, planFeatures, faqs } from './site.mjs';
import { icon } from './icons.mjs';

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

const logoTile = ([src, alt], hidden) =>
  `<div class="logo-tile"><img src="/images/${src}" alt="${hidden ? '' : alt}" height="40" loading="lazy" data-fallback="${alt}"></div>`;

export const logoMarquee = () => `<section class="section--tight">
  <p class="center muted small" style="margin-bottom:22px">All your favourite British channels, sport and streaming in one subscription</p>
  <div class="marquee" style="--speed:70s"><div class="marquee-track">${logos.map((l) => logoTile(l)).join('')}${logos.map((l) => logoTile(l, true)).join('')}</div></div>
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
    <div class="devices reveal">${devices.map(([f, a]) => `<div class="device"><img src="/images/2024/12/${f}" alt="${a}" width="300" height="100" loading="lazy" data-fallback="${a}"></div>`).join('')}</div>
    <div class="apps reveal">${['IPTV Smarters Pro', 'TiviMate', 'IBO Player', 'Smart One', 'DuplexPlay', 'OTT Navigator', 'MAG / Formuler', 'Kodi', 'VLC'].map((a) => `<span class="chip">${a}</span>`).join('')}</div>
  </div>
</section>`;

// Real customer screenshots carried over from the WordPress site.
const trustpilotShots = [1, 2, 3, 4, 5, 6].map((n) => `/images/2025/02/${n}.webp`);
const whatsappShots = [1, 2, 3, 4, 5, 6, 7].map((n) => `/images/2025/01/${n}.jpg`);

const shotRail = (shots, label) =>
  `<div class="shot-rail" tabindex="0" aria-label="${label}">${shots.map((s, i) => `<figure class="shot"><img src="${s}" alt="${label} ${i + 1}" loading="lazy" data-fallback="${label}"></figure>`).join('')}</div>`;

export const reviewsSection = () => `<section class="section rv-section" id="reviews">
  <div class="container">
    <div class="section-head reveal">
      <span class="kicker">Customer reviews</span>
      <h2 class="h2">What customers say about <span class="grad-text">MOJO 4K</span></h2>
      <p>Real feedback from customers across the UK, on Trustpilot and in our WhatsApp support chat.</p>
    </div>
    <div class="rv-block reveal">
      <div class="rv-brand"><span class="rv-stars" aria-label="5 out of 5 stars"><i>★</i><i>★</i><i>★</i><i>★</i><i>★</i></span><span>Feedback on Trustpilot</span></div>
      ${shotRail(trustpilotShots, 'Trustpilot review')}
    </div>
    <div class="rv-block reveal">
      <div class="rv-brand rv-brand--wa"><span class="rv-wa-icon">${icon.whatsapp}</span><span>Feedback on WhatsApp</span></div>
      ${shotRail(whatsappShots, 'WhatsApp message')}
    </div>
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
