import { icon } from '../icons.mjs';
import { pricing } from '../site.mjs';
import { pricingSection, logoMarquee, posters, posterImg, devicesSection, reviewsSection, faqSection, faqSchema, sportsList, marquee, ticker } from '../blocks.mjs';
import { ctaBand } from '../layout.mjs';

const col = (list, eager) => list.map((s, i) => posterImg(s, !(eager && i < 3))).join('');
const cols = [
  [posters[0], posters[3], posters[6], posters[9], posters[12]],
  [posters[1], posters[4], posters[7], posters[10], posters[13]],
  [posters[2], posters[5], posters[8], posters[11]],
];

const prices = pricing.flatMap((g) => g.plans.map((p) => p.price));

export default () => ({
  path: '/',
  title: 'MOJO 4K – Best UK IPTV Service 2026 | British TV, Live Sport & Films in 4K',
  description: 'MOJO 4K is the UK IPTV service for British homes: every Premier League match, Sky Sports, TNT Sports, BBC, ITV and 120,000+ films & box sets in 4K. From £7, no contract.',
  preload: `<link rel="preload" as="image" href="${posters[0]}">\n`,
  schema: [
    faqSchema(),
    {
      '@type': 'Product',
      name: 'MOJO 4K IPTV subscription',
      brand: { '@type': 'Brand', name: 'MOJO 4K' },
      image: 'https://mojo4k.uk/images/2024/12/Holiday-Gathering-iStock-1.webp',
      description: 'UK IPTV subscription with British TV, live sport and 120,000+ films & box sets in 4K.',
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
      offers: { '@type': 'AggregateOffer', priceCurrency: 'GBP', areaServed: 'GB', lowPrice: Math.min(...prices), highPrice: Math.max(...prices), offerCount: prices.length },
    },
  ],
  body: `
<section class="hero">
  <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div><div class="grid-bg" aria-hidden="true"></div>
  <div class="container z">
    <div class="hero-copy">
      <span class="eyebrow"><b>50% OFF</b> Made for British homes<span class="hide-sm"> · England, Scotland, Wales &amp; NI</span> 🇬🇧</span>
      <h1 class="h1">Proper British telly. <span class="grad-text">All of it, in 4K.</span></h1>
      <p class="lead">Every Premier League match, Sky Sports, TNT Sports, the BBC and ITV, plus 120,000+ films and box sets. One subscription, every screen in the house, and a fraction of your Sky bill.</p>
      <div class="btn-row">
        <a class="btn btn--primary btn--lg" href="#pricing">See plans · 50% off ${icon.arrow}</a>
        <a class="btn btn--ghost btn--lg" href="/free-trial/">${icon.play} Try it free first</a>
      </div>
      <div class="hero-trust">
        <span>${icon.refund} 7-day money-back</span>
        <span>${icon.bolt} Ready in 5 minutes</span>
        <span>${icon.chat} 24/7 support</span>
        <span>£ Priced in pounds</span>
      </div>
    </div>
    <div class="hero-visual" aria-hidden="true">
      <div class="hero-badges">
        <div class="float-card float-card--live"><span class="ic">${icon.tv}</span><div><strong><span class="live-dot"></span>LIVE · Saturday 3pm kick-offs</strong><small>Every Premier League match in 4K</small></div></div>
        <div class="float-card float-card--ready"><span class="ic">${icon.bolt}</span><div><strong>Activated in 5 minutes</strong><small>Your login, ready to watch</small></div></div>
      </div>
      <div class="poster-wall"><div class="cols">${cols.map((c, i) => `<div class="poster-col">${col(c, true)}${col(c)}</div>`).join('')}</div></div>
    </div>
  </div>
</section>

<section class="section--tight" style="padding-top:0">
  <div class="container">
    <div class="stats reveal">
      <div class="stat"><b>50K+</b><span>Live TV channels</span></div>
      <div class="stat"><b>120K+</b><span>Films &amp; box sets</span></div>
      <div class="stat"><b>£7</b><span>Plans from, per month</span></div>
      <div class="stat"><b>24/7</b><span>Live support</span></div>
    </div>
  </div>
</section>

${ticker()}

${logoMarquee()}

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="kicker">Everything in one place</span><h2 class="h2">Sport. Films. Box sets. <span class="grad-text nowrap">Sorted.</span></h2><p>Stop juggling Sky, Virgin Media, NOW and a drawer full of streaming logins. One MOJO 4K subscription brings live telly, sport and a huge on-demand library to every screen in your home.</p></div>
    <div class="grid grid-3">
      <a class="media-card reveal" href="#sports"><div class="media-img kenburns"><img src="/images/2024/12/Holiday-Gathering-iStock-1.webp" alt="" loading="lazy" width="960" height="540"><span class="live-pill"><span class="live-dot"></span>LIVE</span></div><span class="tag">Live sport</span><h3>Live sport</h3><p>Every Premier League match, the EFL, Champions League, F1, boxing, cricket and rugby, live and in real time.</p><span class="link-arrow">Explore</span></a>
      <a class="media-card reveal" style="--d:.08s" href="/pricing/"><div class="media-strip">${marquee([6, 13, 12, 8, 9, 10].map((i) => posterImg(posters[i])), { speed: 18 })}</div><span class="tag">4K films</span><h3>The latest films</h3><p>Thousands of blockbusters and new releases in crystal-clear 4K. Film night on the sofa has never looked this good.</p><span class="link-arrow">Explore</span></a>
      <a class="media-card reveal" style="--d:.16s" href="/channels-list/"><div class="media-strip">${marquee([4, 1, 5, 0, 2, 3].map((i) => posterImg(posters[i])), { speed: 20, reverse: true })}</div><span class="tag">Box sets</span><h3>Box sets &amp; British telly</h3><p>Soaps, dramas, comedy, quiz shows and documentaries, plus catch-up on the shows you missed last night.</p><span class="link-arrow">Explore</span></a>
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="container"><div class="section-head reveal"><span class="kicker">On demand</span><h2 class="h2">Popular films &amp; box sets</h2><p>Stream films and box sets on demand in HD &amp; 4K, with new titles added every day.</p></div></div>
  <div class="reveal">
    ${marquee(posters.slice(0, 7).map((p) => posterImg(p, true, 'Film or box set poster')), { speed: 40, cls: 'poster-rail' })}
    <div style="height:14px"></div>
    ${marquee(posters.slice(7).map((p) => posterImg(p, true, 'Film or box set poster')), { speed: 46, reverse: true, cls: 'poster-rail' })}
  </div>
</section>

${pricingSection()}

${reviewsSection()}

<section class="section" id="sports">
  <div class="container sports">
    <div class="sports-visual reveal">
      <img class="sports-main" src="/images/2024/12/UFC.png" alt="UFC and boxing PPV live on MOJO 4K IPTV" width="800" height="277" loading="lazy">
      ${marquee([['sky-sport.png', 'Sky Sports'], ['tnt-sports.png', 'TNT Sports'], ['Logo_UEFA_Champions_League.png', 'UEFA Champions League'], ['DAZN_Logo.svg.png', 'DAZN'], ['bein-sports.png', 'beIN Sports'], ['espn.png', 'ESPN'], ['sky-max.png', 'Sky Max']].map(([f, a]) => `<div class="sport-logo"><img src="/images/2024/12/${f}" alt="${a}" loading="lazy" height="56" data-fallback="${a}"></div>`), { speed: 26, cls: 'sports-logos' })}
    </div>
    <div class="reveal">
      <span class="kicker">Live sport &amp; PPV</span>
      <h2 class="h2">Feel the stadium <span class="grad-text">from your sofa</span></h2>
      <p class="lead">From the 3pm Saturday kick-offs to the big fight night, every match and every PPV event in 4K, freeze-free. No more paying Sky, TNT and DAZN separately.</p>
      <ul class="league-list">${sportsList.map(([e, n, l]) => `<li><span class="emo" aria-hidden="true">${e}</span><span><b>${n}</b>${l}</span></li>`).join('')}</ul>
      <a class="btn btn--primary btn--lg" href="#pricing">Get every match · 50% off ${icon.arrow}</a>
    </div>
  </div>
</section>

${devicesSection()}

<section class="section" id="how">
  <div class="container">
    <div class="section-head reveal"><span class="kicker">Getting started</span><h2 class="h2">Watching in 3 easy steps</h2></div>
    <div class="steps">
      <div class="card step reveal"><h3>Choose your plan</h3><p>Pick 1, 6 or 12 months for up to 5 screens. Paid in pounds, no contract.</p></div>
      <div class="card step reveal" style="--d:.08s"><h3>Get your login</h3><p>We send your login details by WhatsApp and email, ready for your IPTV player app.</p></div>
      <div class="card step reveal" style="--d:.16s"><h3>Put the kettle on</h3><p>Pop your login into your TV, Firestick or phone and you’re watching before it’s boiled.</p></div>
    </div>
    <p class="center" style="margin-top:28px"><a class="link-arrow" href="/installation-guides/">See the setup guides for every device</a></p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="kicker">Why MOJO 4K</span><h2 class="h2">Why British households switch to us</h2></div>
    <div class="grid grid-3 why-grid">
      ${[
        [icon.fourk, 'Proper 4K picture', 'Sharp, vibrant 4K on the big matches and the big films, with colour that does your new telly justice.'],
        [icon.gear, 'No engineer, no dish', 'Works on the Firestick, Smart TV or box you already own. Set up in minutes, no one round the house.'],
        [icon.wave, 'No buffering', 'Anti-freeze servers keep things smooth when the whole country tunes in, even on Saturday at 3pm.'],
        [icon.shield, 'Safe & secure', 'Your privacy is our priority, with strict data protection and top-level security.'],
        [icon.chat, 'Friendly 24/7 support', 'Real people on WhatsApp, Telegram and email, any hour of the day, in plain English.'],
        [icon.refund, 'Pay in pounds, no contract', 'Clear prices in £, no 18-month lock-in, and a full refund within 7 days if it’s not for you.'],
      ]
        .map(([ic, h, p], i) => `<div class="card card--hover feature reveal" style="--d:${(i * 0.06).toFixed(2)}s"><div class="icon">${ic}</div><h3>${h.replace('&', '&amp;')}</h3><p>${p}</p></div>`)
        .join('')}
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container network">
    <div class="reveal">
      <span class="kicker">Built to stay on</span>
      <h2 class="h2">Over 2,000 servers in 198 countries</h2>
      <p class="lead">A fast, stable network keeps MOJO 4K smooth at home in the UK and wherever you take it, from a caravan in Cornwall to a villa in Spain.</p>
    </div>
    <img class="reveal" src="/images/2024/12/asset-6.png" alt="Map of the MOJO 4K IPTV server network" width="641" height="268" loading="lazy">
  </div>
</section>

<section class="section section--tight"><div class="container narrow"><div class="prose-card prose reveal">
<h2>UK IPTV that replaces your Sky and Virgin bill</h2>
<p>MOJO 4K is an <strong>IPTV service built for the UK</strong>. Instead of a satellite dish, a Virgin Media box or an 18-month contract, your channels arrive over the broadband you already pay for, on the devices you already own. You get the BBC, ITV, Channel 4 and Channel 5, every Sky and TNT Sports channel, the films and box sets everyone’s talking about, and channels from home for families with roots overseas. All in one subscription, priced in pounds.</p>
<ul>
<li><strong>Start:</strong> <a href="/pricing/">compare plans</a> or ask for a <a href="/free-trial/">free trial</a>.</li>
<li><strong>Everywhere in the UK:</strong> England, Scotland, Wales and Northern Ireland, with your regional BBC and ITV.</li>
<li><strong>What’s included:</strong> browse the <a href="/channels-list/">channels list</a>.</li>
<li><strong>Your device:</strong> <a href="/installation-guides/#firestick">Firestick</a>, <a href="/installation-guides/#smart-tv">Smart TV</a>, <a href="/installation-guides/#android">Android</a>, <a href="/installation-guides/#apple">iPhone &amp; Apple TV</a>, <a href="/installation-guides/#mag">MAG box</a>.</li>
<li><strong>Save more:</strong> <a href="/referral/">refer a friend and get 1 year free</a>.</li>
</ul>
</div></div></section>

${faqSection()}

${ctaBand()}
`,
});
