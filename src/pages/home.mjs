import { icon } from '../icons.mjs';
import { pricing } from '../site.mjs';
import { pricingSection, logoMarquee, posters, posterImg, devicesSection, reviewsSection, faqSection, faqSchema, sportsList } from '../blocks.mjs';
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
  title: 'MOJO 4K – Best UK IPTV Service 2026 | 4K Live TV, Sports & Movies',
  description: 'MOJO 4K: Britain’s best IPTV in 2026. 50,000+ live channels incl. Sky Sports, TNT Sports & Premier League, 120,000+ movies & series in 4K. From £7, no contract.',
  preload: `<link rel="preload" as="image" href="${posters[0]}">\n`,
  schema: [
    faqSchema(),
    {
      '@type': 'Product',
      name: 'MOJO 4K IPTV subscription',
      brand: { '@type': 'Brand', name: 'MOJO 4K' },
      image: 'https://mojo4k.uk/images/2024/12/Holiday-Gathering-iStock-1.webp',
      description: 'UK IPTV subscription with 50,000+ live channels and 120,000+ movies & series in 4K.',
      offers: { '@type': 'AggregateOffer', priceCurrency: 'GBP', lowPrice: Math.min(...prices), highPrice: Math.max(...prices), offerCount: prices.length },
    },
  ],
  body: `
<section class="hero">
  <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div><div class="grid-bg" aria-hidden="true"></div>
  <div class="container z">
    <div class="hero-copy">
      <span class="eyebrow"><b>50% OFF</b> IPTV for the Brits<span class="hide-sm"> · sharp, powerful, limitless</span> 🇬🇧</span>
      <h1 class="h1">Britain’s best IPTV service in <span class="grad-text">2026</span></h1>
      <p class="lead">50,000+ live channels and 120,000+ movies &amp; series in jaw-dropping 4K. From live sports thrills to binge-worthy dramas and epic blockbusters, it’s all here whenever you want it.</p>
      <div class="btn-row">
        <a class="btn btn--primary btn--lg" href="#pricing">See plans · 50% off ${icon.arrow}</a>
        <a class="btn btn--ghost btn--lg" href="/free-trial/">${icon.play} Ask for a free trial</a>
      </div>
      <div class="hero-trust">
        <span>${icon.refund} 7-day money-back</span>
        <span>${icon.bolt} Ready in 5 minutes</span>
        <span>${icon.chat} 24/7 support</span>
      </div>
    </div>
    <div class="hero-visual" aria-hidden="true">
      <div class="hero-badges">
        <div class="float-card float-card--live"><span class="ic">${icon.tv}</span><div><strong><span class="live-dot"></span>LIVE · Premier League in 4K</strong><small>Sports, PPV &amp; every big game</small></div></div>
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
      <div class="stat"><b>120K+</b><span>Movies &amp; series</span></div>
      <div class="stat"><b>4K</b><span>Ultra HD quality</span></div>
      <div class="stat"><b>24/7</b><span>Live support</span></div>
    </div>
  </div>
</section>

${logoMarquee()}

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="kicker">Everything in one place</span><h2 class="h2">Sports. Movies. Series. <span class="grad-text nowrap">All of it.</span></h2><p>Stop juggling apps and Sky bills. One MOJO 4K subscription brings live TV, sports and a huge on-demand library to every screen in your home.</p></div>
    <div class="grid grid-3">
      <a class="media-card reveal" href="#sports"><div class="media-img"><img src="/images/2024/12/Holiday-Gathering-iStock-1.webp" alt="" loading="lazy" width="960" height="540"></div><span class="tag">Live sports</span><h3>Live Sports</h3><p>Watch every major match, tournament and event in real time. Football, UFC, F1, boxing — all your favourite sports in one place.</p><span class="link-arrow">Explore</span></a>
      <a class="media-card reveal" style="--d:.08s" href="/pricing/"><div class="media-strip">${[posters[6], posters[13], posters[12]].map((p) => posterImg(p)).join('')}</div><span class="tag">4K movies</span><h3>Latest Movies</h3><p>Thousands of blockbuster hits and new releases in crystal-clear 4K. Movie nights have never looked this good.</p><span class="link-arrow">Explore</span></a>
      <a class="media-card reveal" style="--d:.16s" href="/channels-list/"><div class="media-strip">${[posters[4], posters[1], posters[5]].map((p) => posterImg(p)).join('')}</div><span class="tag">Series</span><h3>Latest TV Shows</h3><p>Popular series from around the world: drama, comedy, documentaries and more. Always something new to watch.</p><span class="link-arrow">Explore</span></a>
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="container"><div class="section-head reveal"><span class="kicker">On demand</span><h2 class="h2">Popular movies &amp; series</h2><p>Stream unlimited movies and TV shows on demand in HD &amp; 4K, updated every day.</p></div></div>
  <div class="marquee poster-rail reveal" style="--speed:80s"><div class="marquee-track">${posters.map((p) => posterImg(p, true, 'Movie or series poster')).join('')}${posters.map((p) => posterImg(p)).join('')}</div></div>
</section>

${pricingSection()}

${reviewsSection()}

<section class="section" id="sports">
  <div class="container sports">
    <div class="sports-visual reveal">
      <img class="sports-main" src="/images/2024/12/UFC.png" alt="UFC fights live on MOJO 4K IPTV" width="800" height="277" loading="lazy">
      <div class="sports-logos">
        <img src="/images/2024/12/sky-sport.png" alt="Sky Sports" loading="lazy" width="136" height="78">
        <img src="/images/2024/12/tnt-sports.png" alt="TNT Sports" loading="lazy" width="136" height="78">
        <img src="/images/2024/12/Logo_UEFA_Champions_League.png" alt="UEFA Champions League" loading="lazy" width="150" height="75">
        <img src="/images/2024/12/DAZN_Logo.svg.png" alt="DAZN" loading="lazy" width="78" height="78">
        <img src="/images/2024/12/espn.png" alt="ESPN" loading="lazy" width="136" height="78">
        <img src="/images/2024/12/bein-sports.png" alt="beIN Sports" loading="lazy" width="136" height="78">
      </div>
    </div>
    <div class="reveal">
      <span class="kicker">PPV &amp; live sports</span>
      <h2 class="h2">Feel the stadium <span class="grad-text">from your sofa</span></h2>
      <p class="lead">Cheer for your team with unlimited sports channels and live PPV events in 4K, freeze-free, anywhere in the world.</p>
      <ul class="league-list">${sportsList.map(([e, n, l]) => `<li><span class="emo" aria-hidden="true">${e}</span><span><b>${n}</b>${l}</span></li>`).join('')}</ul>
      <a class="btn btn--primary btn--lg" href="#pricing">Get every game · 50% off ${icon.arrow}</a>
    </div>
  </div>
</section>

${devicesSection()}

<section class="section" id="how">
  <div class="container">
    <div class="section-head reveal"><span class="kicker">Getting started</span><h2 class="h2">Watching in 3 easy steps</h2></div>
    <div class="steps">
      <div class="card step reveal"><h3>Choose your plan</h3><p>Pick the perfect plan for you, 1, 6 or 12 months, and get started right away.</p></div>
      <div class="card step reveal" style="--d:.08s"><h3>Get your login</h3><p>We send your login details by WhatsApp and email, ready for your IPTV player app.</p></div>
      <div class="card step reveal" style="--d:.16s"><h3>Start watching</h3><p>Connect on your TV, computer or phone and enjoy unlimited UK and international channels.</p></div>
    </div>
    <p class="center" style="margin-top:28px"><a class="link-arrow" href="/installation-guides/">See the setup guides for every device</a></p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="kicker">Why MOJO 4K</span><h2 class="h2">Why Brits choose our IPTV</h2></div>
    <div class="grid grid-3 why-grid">
      ${[
        [icon.fourk, '4K quality', 'Stunning 4K streaming that brings every detail to life with incredible clarity and colour.'],
        [icon.gear, 'Easy to set up', 'Quick, guided setup on any device. You’re watching within minutes of ordering.'],
        [icon.wave, 'No buffering', 'Anti-freeze servers keep live sports and movies smooth, even on Saturday at 3pm.'],
        [icon.shield, 'Safe & secure', 'Your privacy is our priority, with strict data protection and top-level security.'],
        [icon.chat, '24/7 support', 'Real people on WhatsApp, Telegram and email, with quick, reliable help whenever you need it.'],
        [icon.refund, '7-day money-back', 'Not completely satisfied? We offer a full refund within 7 days of purchase.'],
      ]
        .map(([ic, h, p], i) => `<div class="card card--hover feature reveal" style="--d:${(i * 0.06).toFixed(2)}s"><div class="icon">${ic}</div><h3>${h.replace('&', '&amp;')}</h3><p>${p}</p></div>`)
        .join('')}
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container network">
    <div class="reveal">
      <span class="kicker">Global network</span>
      <h2 class="h2">Over 2,000 servers in 198 countries</h2>
      <p class="lead">Enjoy uninterrupted MOJO 4K streaming with a fast, stable and reliable connection, ensuring premium performance across our global network.</p>
    </div>
    <img class="reveal" src="/images/2024/12/asset-6.png" alt="Map of the MOJO 4K IPTV server network" width="641" height="268" loading="lazy">
  </div>
</section>

<section class="section section--tight"><div class="container narrow"><div class="prose-card prose reveal">
<h2>UK IPTV that replaces your Sky and Virgin bill</h2>
<p>MOJO 4K is an <strong>IPTV service built for the UK</strong>. Instead of a satellite dish or a cable box, your TV channels arrive over your broadband, on the devices you already own. You get the big UK entertainment and sports channels, international channels from around the world and a huge on-demand library, all in one subscription with no contract.</p>
<ul>
<li><strong>Start:</strong> <a href="/pricing/">compare plans</a> or ask for a <a href="/free-trial/">free trial</a>.</li>
<li><strong>What’s included:</strong> browse the <a href="/channels-list/">channels list</a>.</li>
<li><strong>Your device:</strong> <a href="/installation-guides/#firestick">Firestick</a>, <a href="/installation-guides/#smart-tv">Smart TV</a>, <a href="/installation-guides/#android">Android</a>, <a href="/installation-guides/#apple">iPhone &amp; Apple TV</a>, <a href="/installation-guides/#mag">MAG box</a>.</li>
<li><strong>Save more:</strong> <a href="/referral/">refer a friend and get 1 year free</a>.</li>
</ul>
</div></div></section>

${faqSection()}

${ctaBand()}
`,
});
