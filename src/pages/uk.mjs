// UK keyword pages: buying guides, apps, devices, cities and help guides.
// Copy is written for British readers. Prices come from src/site.mjs.
import { pageHero, ctaBand, waButton } from '../layout.mjs';
import { site, allPlans } from '../site.mjs';
import { faqList, faqSchema } from '../blocks.mjs';

const plans = allPlans();
const from = Math.min(...plans.map((p) => p.price));
const year1 = plans.find((p) => p.devices === 1 && p.months === 12).price;
const month1 = plans.find((p) => p.devices === 1 && p.months === 1).price;
const maxDevices = Math.max(...plans.map((p) => p.devices));

const crumbsSchema = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([path, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item: site.url + path })),
});

const crumbsHtml = (trail) =>
  `<nav class="crumbs" aria-label="Breadcrumb" style="justify-content:center">${trail
    .map(([path, name], i) => (i === trail.length - 1 ? `<span aria-current="page">${name}</span>` : `<a href="${path}">${name}</a><span aria-hidden="true">/</span>`))
    .join('')}</nav>`;

const cards = (items, heading = 'Keep reading') => `
<section class="section section--tight">
  <div class="container">
    <div class="section-head reveal"><h2 class="h2">${heading}</h2></div>
    <div class="grid grid-3">${items
      .map(([href, title, text], i) => `<a class="card card--hover reveal" style="--d:${(i % 3) * 0.06}s" href="${href}"><h3 class="h3">${title}</h3><p>${text}</p></a>`)
      .join('')}</div>
  </div>
</section>`;

const faqBlock = (items) => `
<section class="section section--tight" id="faq">
  <div class="container narrow">
    <div class="section-head reveal"><span class="kicker">FAQ</span><h2 class="h2">Questions people ask</h2></div>
    ${faqList(items)}
  </div>
</section>`;

const steps = (list) => `<ol class="num-list">${list.map((s) => `<li>${s}</li>`).join('')}</ol>`;

// One page from a spec. `sections` are [heading, html] pairs shown in a prose card.
function build({ path, title, description, kicker, h1, lead, trail, sections, faq = [], related = [], relatedHeading, cta }) {
  const crumbTrail = [['/uk/', 'Home'], ...trail];
  const schema = [crumbsSchema(crumbTrail)];
  if (faq.length) schema.push(faqSchema(faq));
  return {
    path,
    title,
    description,
    schema,
    body: `
${pageHero({
  kicker,
  title: h1,
  lead,
  actions: `<a class="btn btn--primary btn--lg" href="/pricing/">See plans from £${from}</a><a class="btn btn--ghost btn--lg" href="/free-iptv-trial-uk/">Ask for a free trial</a>`,
}).replace('<span class="kicker">', `${crumbsHtml(crumbTrail)}<span class="kicker">`)}
<section class="section section--tight"><div class="container narrow"><div class="prose-card prose reveal">
${sections.map(([h, html]) => `<h2>${h}</h2>\n${html}`).join('\n')}
</div></div></section>
${faq.length ? faqBlock(faq) : ''}
${related.length ? cards(related, relatedHeading) : ''}
${cta ? ctaBand(...cta) : ctaBand()}
`,
  };
}

// ------------------------------------------------------------------ shared links
const L = {
  sub: ['/iptv-subscription-uk/', 'IPTV subscription UK', `Plans from £${from} a month in pounds, with no contract and no auto-renewal.`],
  best: ['/best-uk-iptv/', 'How to choose the best UK IPTV', 'The checks that separate a good provider from a bad one.'],
  k4: ['/4k-iptv-uk/', '4K IPTV in the UK', 'What you need for a sharp 4K picture at home.'],
  trial: ['/free-iptv-trial-uk/', 'Free IPTV trial', 'Test the service on your own telly before you pay.'],
  apps: ['/iptv-apps-uk/', 'Best IPTV apps', 'Smarters, TiviMate, IBO Player and more, compared.'],
  devices: ['/iptv-devices-uk/', 'Best IPTV devices', 'Firestick, Smart TVs, Android boxes and Apple TV.'],
  cities: ['/uk-iptv-cities/', 'IPTV across the UK', 'Local guides for ten UK cities.'],
  what: ['/what-is-iptv-uk/', 'What is IPTV?', 'How TV over broadband works, in plain English.'],
  m3u: ['/m3u-playlist-guide-uk/', 'M3U playlist guide', 'What an M3U link is and how to add one.'],
  buffer: ['/iptv-buffering-fix/', 'Fix IPTV buffering', 'Ten checks that sort out most freezing.'],
  guides: ['/iptv-setup-guides/', 'Setup guides', 'Step-by-step installation for every device.'],
  channels: ['/uk-iptv-channels/', 'UK channels list', 'Browse the full channel lineup.'],
};

// ------------------------------------------------------------------ core pages
const core = [
  build({
    path: '/best-uk-iptv/',
    title: 'Best IPTV in the UK (2026): How to Choose a Provider | MOJO 4K',
    description: 'How to choose the best IPTV provider in the UK: stability, picture quality, support, payment and refunds. A practical checklist for British households.',
    kicker: 'Buying guide',
    h1: 'How to choose the <span class="grad-text">best UK IPTV</span>',
    lead: 'Every provider says it is the best. These are the checks that actually tell you, whether you mainly watch football, soaps or box sets.',
    trail: [['/best-uk-iptv/', 'Best UK IPTV']],
    sections: [
      ['What “best” really means', '<p>Search “best IPTV UK” or read a Reddit thread and you will find the same names recommended and slated in equal measure. That is because the best service for you depends on what you watch, how many screens you need and how good your broadband is. A provider that is brilliant for one household can be frustrating for another.</p><p>Instead of trusting a ranking, test a provider against the points below. Most can be checked in a single evening with a free trial.</p>'],
      ['1. Stability at busy times', '<p>Any service looks good on a quiet Tuesday afternoon. The real test is Saturday at 3pm and big Sunday fixtures, when everyone in the country is streaming at once. Watch during a busy slot on your trial and see whether the picture stays smooth.</p>'],
      ['2. Picture quality you can actually receive', `<p>4K only matters if your connection and screen can show it. We recommend at least 10 Mbps for HD and 25 Mbps for 4K. Check that the provider offers HD versions of channels as well, so you can drop down when the Wi-Fi is struggling. Our <a href="/4k-iptv-uk/">4K guide</a> explains what you need.</p>`],
      ['3. Your devices and apps', `<p>A good provider works with the apps you already know: IPTV Smarters Pro, TiviMate, IBO Player and the rest. It should give you an Xtream Codes login and an M3U link, so you are not locked into one app. See our <a href="/iptv-apps-uk/">app comparison</a> and <a href="/iptv-devices-uk/">device guide</a>.</p>`],
      ['4. Support that replies', '<p>When something stops working mid-match you want an answer in minutes, not an email ticket next week. Message support during your trial and time the reply. MOJO 4K answers on WhatsApp and Telegram, day and night.</p>'],
      ['5. Clear prices in pounds and an honest refund policy', `<p>Look for prices in pounds sterling with no auto-renewal, so you are never charged without agreeing to it. MOJO 4K plans start at £${month1} for one month and £${year1} for a year on one device, and every plan has a 7-day money-back guarantee. Read the <a href="/refunds/">refund policy</a> before you buy, whoever you buy from.</p>`],
      ['Warning signs', '<ul><li>“Lifetime” subscriptions for a one-off payment. Running servers costs money every month, so these rarely last.</li><li>No way to contact anyone except a web form.</li><li>No trial and no refund policy.</li><li>Pressure to pay by gift card or crypto only.</li></ul>'],
    ],
    faq: [
      ['Which IPTV is best for sport in the UK?', 'The one that stays stable on your connection at busy kick-off times. Use a free trial during a Saturday or Sunday afternoon to find out before you pay.'],
      ['Is the cheapest IPTV in the UK worth it?', `Price alone tells you little. Check stability, support and refunds first. MOJO 4K starts at £${from} a month with a 7-day money-back guarantee, so you can judge it for yourself.`],
      ['Should I trust Reddit recommendations?', 'They are a useful starting point, but services change quickly. Always test on your own broadband and devices with a trial.'],
    ],
    related: [L.sub, L.trial, L.k4, L.apps, L.devices, L.buffer],
  }),
  build({
    path: '/iptv-subscription-uk/',
    title: `IPTV Subscription UK – Plans from £${from}, No Contract | MOJO 4K`,
    description: `Buy an IPTV subscription in the UK from £${from} a month. Pay in pounds, 1 to ${maxDevices} screens, no contract, no auto-renewal and a 7-day money-back guarantee.`,
    kicker: 'IPTV subscription',
    h1: `A UK IPTV subscription <span class="grad-text">from £${from}</span>`,
    lead: 'Pay in pounds, pick how many screens you need, and get your login within minutes. No 18-month contract, no engineer visit and no auto-renewal.',
    trail: [['/pricing/', 'Pricing'], ['/iptv-subscription-uk/', 'IPTV subscription UK']],
    sections: [
      ['How the plans work', `<p>Every MOJO 4K plan includes the same full lineup. You only choose two things: how long you want (1, 6 or 12 months) and how many screens can watch at the same time (1 to ${maxDevices}). A one-month plan for one screen costs £${month1}; a year for one screen costs £${year1}. See every price on the <a href="/pricing/">pricing page</a>.</p>`],
      ['What you pay, and what you don’t', '<ul><li>Prices are in pounds sterling. What you see is what you pay.</li><li>Each plan is a single payment. Nothing renews automatically.</li><li>Every plan comes with a 7-day money-back guarantee.</li><li>No installation fee, no box to rent and no contract.</li></ul>'],
      ['How to buy', steps(['Choose your plan on the <a href="/pricing/">pricing page</a>.', 'Fill in the order form or message us on WhatsApp.', 'Pay with your preferred method.', 'Receive your login by WhatsApp and email, usually within 5 minutes.', 'Add it to your IPTV app using our <a href="/iptv-setup-guides/">setup guides</a>.'])],
      ['Cheap IPTV vs good value', '<p>The cheapest offers often cut corners on servers and support. A slightly higher monthly price with a real refund policy and fast support usually costs you less in frustration. The 12-month plans give the lowest price per month if you already know the service works for you.</p>'],
    ],
    faq: [
      ['Does my IPTV subscription renew automatically?', 'No. Every plan is a one-off payment. When it ends you can renew if you want to, and your login stays the same.'],
      ['Can I upgrade to more screens later?', 'Yes. Message us on WhatsApp and we will move you to a plan with more connections.'],
      ['Which IPTV providers in the UK offer a refund?', 'Policies vary, so always read them before paying. MOJO 4K offers a 7-day money-back guarantee on every plan.'],
    ],
    related: [L.trial, L.best, L.k4],
  }),
  build({
    path: '/4k-iptv-uk/',
    title: '4K IPTV UK – What You Need for 4K Streaming at Home | MOJO 4K',
    description: '4K IPTV in the UK explained: the broadband speed, TV, device and app you need for a sharp 4K picture, and why 8K IPTV is mostly marketing.',
    kicker: '4K IPTV',
    h1: '4K IPTV in the UK, <span class="grad-text">done properly</span>',
    lead: 'A 4K picture is only as good as the weakest link between our server and your sofa. Here is what you need, and what to check if it looks soft.',
    trail: [['/4k-iptv-uk/', '4K IPTV UK']],
    sections: [
      ['What you need for 4K', '<ul><li><b>Broadband:</b> at least 25 Mbps available to the device, ideally more if others in the house are streaming too.</li><li><b>A 4K screen:</b> any 4K (UHD) Smart TV or monitor.</li><li><b>A 4K-capable device:</b> Fire TV Stick 4K or 4K Max, Nvidia Shield, a good Android TV box, Apple TV 4K or the TV’s own apps.</li><li><b>An app that plays 4K:</b> TiviMate, IPTV Smarters Pro and IBO Player all do.</li></ul>'],
      ['Wired beats wireless', '<p>Most 4K problems in British homes come from Wi-Fi, not the service. If your router is in the hallway and the telly is in the back room, try an Ethernet cable, a powerline adapter or a mesh system. It often makes the difference between stuttering and smooth.</p>'],
      ['What about 8K IPTV?', '<p>You may see “8K IPTV UK” advertised. Very little is broadcast in 8K, few homes have an 8K TV, and the broadband needed is far higher. For now, good 4K and stable HD matter much more than an 8K label.</p>'],
      ['When 4K looks blurry', `<p>Check your speed with the device itself (not your phone), restart the router, close other streams in the house and pick the 4K version of the channel rather than the HD one. Still not right? Our <a href="/iptv-buffering-fix/">buffering guide</a> covers the rest, or message us.</p>`],
    ],
    faq: [
      ['What internet speed do I need for 4K IPTV?', 'We recommend at least 25 Mbps for 4K and 10 Mbps for HD, measured on the device you watch on.'],
      ['Is every channel in 4K?', 'No. 4K is available where the source is in 4K. Every channel has an HD version, which is the best choice on slower connections.'],
      ['Which Firestick is best for 4K IPTV?', 'The Fire TV Stick 4K or 4K Max. The basic Fire TV Stick tops out at 1080p.'],
    ],
    related: [L.devices, L.buffer, L.sub],
  }),
];

// ------------------------------------------------------------------ apps
const appPages = [
  ['iptv-smarters-pro-uk', 'IPTV Smarters Pro', 'Smarters Pro', 'IPTV Smarters Pro UK – Setup Guide for Firestick, Android & TV', 'Set up IPTV Smarters Pro in the UK on Firestick, Android, iPhone and Smart TV. Xtream Codes login, EPG, catch-up and common fixes, step by step.',
    'IPTV Smarters Pro is the app most UK customers start with. It is free, runs on almost everything and logs in with the Xtream Codes details we send you.',
    [['Where to get it', '<p>On Android phones, Android TVs and boxes, get it from the Google Play Store. On a Firestick, install it with the free Downloader app (our <a href="/iptv-firestick-uk/">Firestick guide</a> shows how). On iPhone and iPad, the App Store version is called <b>Smarters Player Lite</b>. Some Samsung and LG TVs list it in their app stores too.</p>'],
     ['Set it up', steps(['Open the app and choose <b>Login with Xtream Codes API</b>.', 'Type any name, for example MOJO 4K.', 'Enter the username, password and server URL from your welcome message.', 'Tap <b>Add user</b> and wait while channels, films and series load.', 'Open <b>Live TV</b>, then load the EPG from the settings for the TV guide.'])],
     ['Tips for UK viewers', '<ul><li>Set the time zone to <b>Europe/London</b> so the guide matches British time, including the clocks going forward and back.</li><li>Use <b>Favourites</b> for the channels you watch every day.</li><li>If a stream stutters, switch the player to <b>VLC</b> in the settings.</li></ul>']],
    [['Is IPTV Smarters Pro free?', 'The app itself is free to download. You add your own subscription, such as MOJO 4K, to watch.'], ['Why does Smarters say “invalid login”?', 'Usually a typo in the server URL. Copy it exactly, including http:// and the port number, then try again.']]],
  ['tivimate-uk', 'TiviMate', 'TiviMate', 'TiviMate UK – Setup and Premium Explained', 'How to set up TiviMate in the UK with Xtream Codes or an M3U link, what TiviMate Premium adds, and the best devices to run it on.',
    'TiviMate looks and feels like a proper set-top box guide. It runs on Android TV, Fire TV and Android boxes, and is a favourite with people who channel-hop a lot.',
    [['Free vs Premium', '<p>The free version plays one playlist with the full TV guide. <b>TiviMate Premium</b> is a paid upgrade from the developer that adds multiple playlists, recording, catch-up, favourites management and multi-view. You buy Premium from TiviMate itself; it is separate from your IPTV subscription.</p>'],
     ['Set it up', steps(['Install TiviMate from the Google Play Store, or on a Firestick through Downloader.', 'Choose <b>Add playlist → Xtream Codes</b>.', 'Enter the server URL, username and password we sent you.', 'Name the playlist and let the EPG load.', 'Long-press a channel to add it to Favourites.'])],
     ['Best devices for TiviMate', '<p>Fire TV Stick 4K Max, Nvidia Shield and Google TV devices run it smoothly. It does not run on iPhone, iPad or Apple TV.</p>']],
    [['Does TiviMate work on Samsung or LG TVs?', 'Not directly. Use a Firestick or Android box plugged into the TV, or use IBO Player on the TV itself.'], ['Do I need TiviMate Premium?', 'No. The free version works. Premium is worth it if you want recording, catch-up or several playlists.']]],
  ['smart-iptv-uk', 'Smart IPTV, SET IPTV and SS IPTV', 'Smart IPTV', 'Smart IPTV, SET IPTV & SS IPTV UK – Smart TV Setup', 'Set up Smart IPTV (SIPTV), SET IPTV or SS IPTV on a Samsung or LG Smart TV in the UK: activation, MAC address and uploading your playlist.',
    'Smart IPTV (SIPTV), SET IPTV and SS IPTV are apps that run directly on Samsung and LG Smart TVs, so you do not need an extra stick or box.',
    [['How these apps work', '<p>Instead of typing a login on the TV, you send your playlist to the app using the TV’s <b>MAC address</b>. Smart IPTV and SET IPTV charge a small one-off activation fee to their developers after a trial period; SS IPTV is free.</p>'],
     ['Set it up', steps(['Install the app from Samsung Apps or the LG Content Store.', 'Open it and write down the <b>MAC address</b> shown on screen.', 'Send us the MAC address on WhatsApp, or upload the M3U link we sent on the app’s website.', 'Restart the app. Your channels appear.'])],
     ['Which one to choose', '<p>If your TV supports it, <a href="/iptv-samsung-tv-uk/">IBO Player</a> is usually easier today. Smart IPTV and SET IPTV are still solid choices on older Samsung and LG models.</p>']],
    [['Is Smart IPTV free?', 'It has a free trial, after which the developer charges a one-off activation fee per TV.'], ['Where do I find the MAC address?', 'It is shown on the app’s start screen.']]],
  ['implayer-uk', 'iMPlayer', 'iMPlayer', 'iMPlayer UK – Setup Guide for Android, Fire TV & Apple', 'Set up iMPlayer in the UK on Android TV, Firestick, iPhone or Apple TV with your MOJO 4K login. Features, setup steps and tips.',
    'iMPlayer is a modern IPTV player with a clean interface, available on Android, Fire TV and Apple devices. It is a good alternative if you share one login across different kinds of device.',
    [['Set it up', steps(['Install iMPlayer from your device’s app store.', 'Choose <b>Xtream Codes</b> as the playlist type.', 'Enter the server URL, username and password we sent.', 'Wait for the guide and on-demand library to load.'])],
     ['Good to know', '<p>iMPlayer has a free tier and a paid upgrade from the developer for extra features. Your MOJO 4K subscription works with both.</p>']],
    [['Does iMPlayer work on iPhone?', 'Yes, it is available in the App Store as well as on Android and Fire TV.']]],
  ['xciptv-uk', 'XCIPTV', 'XCIPTV', 'XCIPTV UK – Xtream IPTV Player Setup', 'Set up XCIPTV, the Xtream Codes IPTV player, in the UK on Android and Firestick. Login steps, EPG and fixes.',
    'XCIPTV is a lightweight player built for Xtream Codes logins. It runs well on older Firesticks and budget Android boxes.',
    [['Set it up', steps(['Install XCIPTV on your Android device or, on a Firestick, through Downloader.', 'Enter the server URL, username and password we sent you.', 'Tap <b>Sign in</b> and let the channels load.', 'Open the TV guide once to download the EPG.'])],
     ['Why choose XCIPTV', '<p>It is simple, quick to start and gentle on low-memory devices. If Smarters feels slow on an older stick, try XCIPTV.</p>']],
    [['What is Xtream IPTV?', 'Xtream Codes is the login format most IPTV services use: a server URL, a username and a password. XCIPTV is built around it.']]],
  ['mytvonline-uk', 'MyTVOnline', 'MyTVOnline', 'MyTVOnline UK – Formuler Setup Guide', 'Set up MyTVOnline (MyTVOnline 2 and 3) on a Formuler box in the UK with a portal or Xtream Codes login. Step by step.',
    'MyTVOnline is the IPTV app built into Formuler boxes such as the Z11 Pro Max. It feels like a traditional satellite receiver guide.',
    [['Set it up', steps(['Open <b>MyTVOnline</b> on your Formuler.', 'Choose <b>Add portal</b>.', 'Enter a name and the portal URL we send you (we need your box’s MAC address when you order), or choose Xtream Codes and enter your login.', 'Connect and let the guide load.'])],
     ['Tips', '<p>Turn on catch-up and recording in the settings if your plan’s channels support them, and pin your favourite UK channels to the top of the list.</p>']],
    [['Where do I find my Formuler’s MAC address?', 'In MyTVOnline under Connections, or on the sticker on the box.']]],
];

const appHub = build({
  path: '/iptv-apps-uk/',
  title: 'Best IPTV Apps in the UK (2026) – Smarters, TiviMate & More | MOJO 4K',
  description: 'Compare the best IPTV apps and players in the UK: IPTV Smarters Pro, TiviMate, Smart IPTV, iMPlayer, XCIPTV and MyTVOnline. Which app suits which device.',
  kicker: 'IPTV apps',
  h1: 'The best IPTV apps <span class="grad-text">for UK viewers</span>',
  lead: 'Your subscription works in any popular IPTV player. The right app depends on the device you watch on and how you like to browse channels.',
  trail: [['/iptv-apps-uk/', 'IPTV apps']],
  sections: [
    ['Quick picks', '<ul><li><b>Firestick or Android TV:</b> <a href="/tivimate-uk/">TiviMate</a> or <a href="/iptv-smarters-pro-uk/">IPTV Smarters Pro</a>.</li><li><b>Samsung or LG TV without a stick:</b> IBO Player or <a href="/smart-iptv-uk/">Smart IPTV / SET IPTV</a>.</li><li><b>iPhone, iPad or Apple TV:</b> Smarters Player Lite or <a href="/implayer-uk/">iMPlayer</a>.</li><li><b>Older or budget sticks:</b> <a href="/xciptv-uk/">XCIPTV</a>.</li><li><b>Formuler boxes:</b> <a href="/mytvonline-uk/">MyTVOnline</a>.</li></ul>'],
    ['What makes a good IPTV player', '<p>A clear TV guide (EPG), quick channel switching, favourites, and support for both Xtream Codes and M3U links. Catch-up and recording are nice extras. None of the apps include channels themselves: you add your MOJO 4K login.</p>'],
  ],
  related: appPages.map(([slug, name, short]) => [`/${slug}/`, name, `Set up ${short} with your MOJO 4K login.`]),
  relatedHeading: 'App guides',
});

const apps = appPages.map(([slug, name, short, title, description, lead, sections, faq]) =>
  build({
    path: `/${slug}/`,
    title: `${title} | MOJO 4K`,
    description,
    kicker: 'App guide',
    h1: `${name} <span class="grad-text">in the UK</span>`,
    lead,
    trail: [['/iptv-apps-uk/', 'IPTV apps'], [`/${slug}/`, short]],
    sections,
    faq,
    related: [L.apps, L.devices, L.guides],
  }));

// ------------------------------------------------------------------ devices
const devicePages = [
  ['iptv-firestick-uk', 'Amazon Firestick', 'Firestick', 'IPTV on Firestick UK – Best Apps & Setup Guide', 'Set up IPTV on an Amazon Fire TV Stick in the UK: which Firestick to buy, the best IPTV apps for Firestick and a step-by-step install with Downloader.',
    'The Fire TV Stick is the most popular way to watch IPTV in the UK. It plugs into any HDMI port and turns an old telly into a smart one.',
    [['Which Firestick?', '<ul><li><b>Fire TV Stick 4K Max:</b> the quickest, with Wi-Fi 6. Best choice.</li><li><b>Fire TV Stick 4K:</b> great value for a 4K TV.</li><li><b>Fire TV Stick (HD):</b> fine for HD sets, but slower with big channel lists.</li></ul>'],
     ['Install your IPTV app', steps(['Go to <b>Settings → My Fire TV → Developer options</b> and allow apps from unknown sources (newer models: enable <b>Install unknown apps</b> for Downloader).', 'Install <b>Downloader</b> from the Amazon Appstore.', 'In Downloader, enter the download link for your app (we send it with your login).', 'Open <a href="/tivimate-uk/">TiviMate</a> or <a href="/iptv-smarters-pro-uk/">IPTV Smarters Pro</a> and log in with the details we sent.'])],
     ['Keep it running smoothly', '<p>Clear the app cache now and then, keep the stick off USB-port power (use the mains adapter), and if Wi-Fi is weak use Amazon’s Ethernet adapter.</p>']],
    [['What is the best IPTV app for Firestick in the UK?', 'TiviMate for a set-top-box feel, IPTV Smarters Pro for simplicity. Both are free to start.'], ['Why is my Firestick buffering?', 'Usually Wi-Fi or a full cache. See our <a href="/iptv-buffering-fix/">buffering guide</a>.']]],
  ['iptv-samsung-tv-uk', 'Samsung Smart TV', 'Samsung TV', 'IPTV on Samsung Smart TV UK – Apps & Setup', 'Watch IPTV on a Samsung Smart TV in the UK without a box: the best apps (IBO Player, Smart IPTV, SET IPTV) and how to set them up.',
    'Most Samsung Smart TVs sold in the UK since 2016 can run an IPTV app directly, so you may not need a stick at all.',
    [['Best apps for Samsung', '<p><b>IBO Player</b> is the easiest on recent models. <a href="/smart-iptv-uk/">Smart IPTV</a> and SET IPTV work well on older ones. On some models IPTV Smarters is listed too.</p>'],
     ['Set it up', steps(['Press the Home button and open <b>Apps</b>.', 'Search for IBO Player (or Smart IPTV) and install it.', 'Open the app and note the <b>MAC address</b> and <b>device key</b>.', 'Send them to us on WhatsApp, or add your M3U link on the app’s website.', 'Restart the app.'])],
     ['If your TV is too old', '<p>Plug in a <a href="/iptv-firestick-uk/">Firestick</a>. It is often quicker than the TV’s own processor anyway.</p>']],
    [['Can I watch IPTV on a Samsung Smart TV without a box?', 'Yes, with an app such as IBO Player or Smart IPTV installed from Samsung Apps.']]],
  ['iptv-lg-tv-uk', 'LG Smart TV', 'LG TV', 'IPTV on LG Smart TV UK – webOS Apps & Setup', 'Watch IPTV on an LG Smart TV (webOS) in the UK: the best apps and a step-by-step setup with your MOJO 4K login.',
    'LG TVs run webOS, which supports several IPTV players from the LG Content Store.',
    [['Best apps for LG', '<p>IBO Player, <a href="/smart-iptv-uk/">Smart IPTV and SET IPTV</a> and SS IPTV are all available on most webOS versions.</p>'],
     ['Set it up', steps(['Open the <b>LG Content Store</b>.', 'Install IBO Player or Smart IPTV.', 'Note the MAC address shown in the app.', 'Send it to us, or upload your M3U link on the app’s website.', 'Restart the app and your channels appear.'])]],
    [['Does TiviMate work on LG TVs?', 'No, TiviMate is Android-only. Use IBO Player on the TV, or plug in a Firestick.']]],
  ['iptv-android-box-uk', 'Android TV box', 'Android box', 'Best Android TV Box for IPTV in the UK (2026)', 'The best Android TV boxes for IPTV in the UK, from Nvidia Shield to Formuler Z11 Pro Max and Google TV Streamer, and how to set them up.',
    'A dedicated Android box gives you more power and storage than a stick, which helps with big channel lists, 4K and recording.',
    [['Boxes worth considering', '<ul><li><b>Nvidia Shield TV / Pro:</b> the long-standing favourite for TiviMate and 4K.</li><li><b>Formuler Z11 Pro Max:</b> built for IPTV, with the <a href="/mytvonline-uk/">MyTVOnline</a> app and a proper remote.</li><li><b>Google TV Streamer:</b> modern, simple and quick.</li></ul><p>Avoid unbranded boxes with “fully loaded” promises. They are often slow, never updated and sometimes unsafe.</p>'],
     ['Set it up', steps(['Connect the box by Ethernet if you can.', 'Install TiviMate or IPTV Smarters Pro from the Play Store.', 'Log in with your Xtream Codes details.'])]],
    [['Is the Formuler Z11 Pro Max worth it in the UK?', 'If you want a traditional set-top-box experience with a built-in IPTV app, yes. For most people a Fire TV Stick 4K Max does the job for less.']]],
  ['iptv-apple-tv-uk', 'Apple TV, iPhone & iPad', 'Apple TV', 'IPTV on Apple TV UK – Best Apps & Setup', 'Watch IPTV on Apple TV, iPhone and iPad in the UK: the best App Store players and how to add your MOJO 4K login.',
    'Apple TV 4K is one of the smoothest IPTV devices you can buy, and the same apps work on iPhone and iPad.',
    [['Best apps on Apple', '<p>Smarters Player Lite, <a href="/implayer-uk/">iMPlayer</a>, iPlayTV and GSE Smart IPTV are all in the App Store. TiviMate is not available on Apple devices.</p>'],
     ['Set it up', steps(['Open the App Store and install your chosen player.', 'Choose <b>Xtream Codes</b> as the login type.', 'Enter your server URL, username and password.', 'Save and let the guide load.'])]],
    [['Can I AirPlay IPTV from my iPhone to the TV?', 'Many players support AirPlay, but running the app on an Apple TV gives a steadier picture.']]],
];

const deviceHub = build({
  path: '/iptv-devices-uk/',
  title: 'Best IPTV Box & Devices in the UK (2026) | MOJO 4K',
  description: 'The best IPTV box and devices for UK homes: Firestick, Samsung and LG Smart TVs, Android boxes and Apple TV. What to buy and how to set it up.',
  kicker: 'Devices',
  h1: 'The best IPTV box <span class="grad-text">for your telly</span>',
  lead: 'You probably already own something that runs IPTV. If not, a Fire TV Stick 4K Max is the simplest upgrade for most British homes.',
  trail: [['/iptv-devices-uk/', 'IPTV devices']],
  sections: [
    ['Quick answer', '<ul><li><b>Best for most people:</b> <a href="/iptv-firestick-uk/">Fire TV Stick 4K Max</a>.</li><li><b>No extra box:</b> <a href="/iptv-samsung-tv-uk/">Samsung</a> or <a href="/iptv-lg-tv-uk/">LG</a> Smart TV apps.</li><li><b>Most power:</b> an <a href="/iptv-android-box-uk/">Nvidia Shield or Formuler</a>.</li><li><b>Apple household:</b> <a href="/iptv-apple-tv-uk/">Apple TV 4K</a>.</li></ul>'],
    ['What matters', `<p>Processor speed (for big channel lists), 4K support, a good remote and a wired network port. You can use up to ${maxDevices} devices at once, depending on your plan.</p>`],
  ],
  related: devicePages.map(([slug, name]) => [`/${slug}/`, name, `Set up MOJO 4K on ${name}.`]),
  relatedHeading: 'Device guides',
});

const devices = devicePages.map(([slug, name, short, title, description, lead, sections, faq]) =>
  build({
    path: `/${slug}/`,
    title: `${title} | MOJO 4K`,
    description,
    kicker: 'Device guide',
    h1: `IPTV on ${name} <span class="grad-text">in the UK</span>`,
    lead,
    trail: [['/iptv-devices-uk/', 'IPTV devices'], [`/${slug}/`, short]],
    sections,
    faq,
    related: [L.devices, L.apps, L.buffer],
  }));

// ------------------------------------------------------------------ cities
// Local details: nation, regional BBC and ITV news, and something about how people watch there.
const cityData = [
  ['london', 'London', 'England', 'BBC London', 'ITV London', 'Flats and shared houses are the norm, so Wi-Fi often has to fight through thick walls and dozens of neighbouring networks. A wired connection or a mesh system pays off. Full-fibre is widely available, and many Londoners stream on several screens at once in shared homes.', 'With Premier League clubs right across the capital, from north to south London, match days mean busy broadband in every borough. A plan with enough screens stops arguments in shared houses.'],
  ['manchester', 'Manchester', 'England', 'BBC North West Tonight', 'ITV Granada Reports', 'Manchester’s converted mills and new-build towers in the city centre often have full-fibre, while terraced streets in the suburbs can still rely on older lines. Check the speed on the device you watch on.', 'A two-club city: whichever side of Manchester you are on, a stable stream on derby day matters more than anything.'],
  ['birmingham', 'Birmingham', 'England', 'BBC Midlands Today', 'ITV Central', 'Birmingham is one of the youngest cities in Europe, with lots of shared student and young-professional households. Multi-screen plans make sense when several people watch at once.', 'From Villa Park to St Andrew’s, and county cricket at Edgbaston, the Midlands is a sporting region all year round.'],
  ['glasgow', 'Glasgow', 'Scotland', 'BBC Reporting Scotland', 'STV News (Central)', 'Glasgow’s traditional tenements have thick sandstone walls that block Wi-Fi between rooms. A powerline adapter or a mesh system is often the quickest fix.', 'Scottish football is a way of life here. Set your app’s guide to Europe/London time and add your local channels to Favourites.'],
  ['liverpool', 'Liverpool', 'England', 'BBC North West Tonight', 'ITV Granada Reports', 'Many Liverpool homes are Victorian terraces with the router at the front and the telly at the back. Move the router, or run a cable, before blaming the stream.', 'Two big clubs either side of Stanley Park mean match days are busy for broadband across Merseyside.'],
  ['leeds', 'Leeds', 'England', 'BBC Look North (Yorkshire)', 'ITV Calendar', 'Leeds has a big student population around Headingley and Hyde Park, where several people often share one connection. A plan with two or three screens avoids fighting over the stream.', 'Football at Elland Road, rugby league at Headingley and Yorkshire cricket keep the sport coming all year.'],
  ['edinburgh', 'Edinburgh', 'Scotland', 'BBC Reporting Scotland', 'STV News (East)', 'Edinburgh’s New Town flats and stone tenements look lovely but can be hard on Wi-Fi. A wired connection to the TV makes 4K far more reliable.', 'Hearts and Hibs, Six Nations weekends at Murrayfield and the summer festivals: Edinburgh never runs short of things to watch.'],
  ['cardiff', 'Cardiff', 'Wales', 'BBC Wales Today', 'ITV Wales', 'Cardiff has good full-fibre coverage in much of the city, but older terraced streets in areas like Cathays and Canton can vary. Test your speed on the device you watch on.', 'Rugby is the national sport, and S4C is part of the Welsh TV lineup, so set up your Favourites with both English- and Welsh-language channels.'],
  ['belfast', 'Belfast', 'Northern Ireland', 'BBC Newsline', 'UTV', 'Northern Ireland has some of the best full-fibre coverage in the UK, so many Belfast homes can comfortably stream 4K on several screens.', 'Watch local news on UTV and BBC Newsline alongside channels from across the UK, and use catch-up for anything you miss.'],
  ['bristol', 'Bristol', 'England', 'BBC Points West', 'ITV West Country', 'Bristol’s hilly streets and older Georgian and Victorian homes can make Wi-Fi patchy between floors. A mesh system or powerline adapter helps.', 'City at Ashton Gate, Rovers at the Memorial Stadium and rugby with the Bears: Bristol is busy every weekend.'],
];

const cityHub = build({
  path: '/uk-iptv-cities/',
  title: 'IPTV Near Me – MOJO 4K Across UK Cities | MOJO 4K',
  description: 'MOJO 4K IPTV works anywhere in the UK with broadband. Local guides for London, Manchester, Birmingham, Glasgow, Liverpool, Leeds, Edinburgh, Cardiff, Belfast and Bristol.',
  kicker: 'Across the UK',
  h1: 'IPTV near you, <span class="grad-text">anywhere in the UK</span>',
  lead: 'There is no local shop or engineer to wait for. If you have broadband, MOJO 4K works in your home, from Cornwall to Shetland.',
  trail: [['/uk-iptv-cities/', 'UK cities']],
  sections: [
    ['How it works where you live', '<p>IPTV comes over your normal internet connection, so “IPTV near me” is wherever your router is. What changes from place to place is your regional news, the type of homes (and how well Wi-Fi gets through the walls) and the kind of broadband available. Our city guides cover those local details.</p>'],
    ['Nations and regions', '<p>The lineup includes the BBC nations and regions, ITV and STV regions, UTV and S4C, so you can keep up with local news wherever you are in England, Scotland, Wales or Northern Ireland.</p>'],
  ],
  related: cityData.map(([slug, name, nation]) => [`/iptv-${slug}/`, `IPTV in ${name}`, `Local guide for ${name}, ${nation}.`]),
  relatedHeading: 'City guides',
});

const cities = cityData.map(([slug, name, nation, bbc, itv, homes, sport]) =>
  build({
    path: `/iptv-${slug}/`,
    title: `IPTV ${name} – Provider for ${name} Homes | MOJO 4K`,
    description: `IPTV in ${name}: watch British TV, sport and films over your broadband. Local news from ${bbc} and ${itv}, setup tips for ${name} homes, prices in pounds.`,
    kicker: `${name}, ${nation}`,
    h1: `IPTV in <span class="grad-text">${name}</span>`,
    lead: `An IPTV provider for ${name} homes: live British TV, sport and box sets over your existing broadband, with support on WhatsApp whenever you need it.`,
    trail: [['/uk-iptv-cities/', 'UK cities'], [`/iptv-${slug}/`, name]],
    sections: [
      [`Watching in ${name}`, `<p>${homes}</p>`],
      ['Your local news', `<p>Keep up with ${bbc} and ${itv} alongside the national channels, with catch-up and a full TV guide set to UK time.</p>`],
      ['Sport', `<p>${sport}</p>`],
      ['Getting started', steps([`Pick a plan on the <a href="/pricing/">pricing page</a> (from £${from}).`, 'Receive your login by WhatsApp and email, usually within 5 minutes.', 'Follow the <a href="/iptv-setup-guides/">setup guide</a> for your device.'])],
    ],
    faq: [
      [`Does MOJO 4K work in ${name}?`, `Yes. It works anywhere in ${nation} and the rest of the UK with a broadband or 4G/5G connection.`],
      [`Is there an IPTV provider near me in ${name}?`, 'IPTV is delivered over the internet, so there is nothing to collect and no engineer visit. You order online and get your login by WhatsApp and email.'],
      [`Will I get ${bbc} and ${itv}?`, 'Yes. The lineup includes the BBC nations and regions and the ITV and STV regions.'],
    ],
    related: [L.cities, L.devices, L.buffer],
  }));

// ------------------------------------------------------------------ guides
const guidesUk = [
  build({
    path: '/what-is-iptv-uk/',
    title: 'What Is IPTV? A Plain-English Guide for the UK | MOJO 4K',
    description: 'What is IPTV (internet protocol television)? How it works in UK homes, what you need, how it compares with Sky, Virgin and Freeview, and how to get started.',
    kicker: 'Guide',
    h1: 'What is IPTV? <span class="grad-text">A plain-English guide</span>',
    lead: 'IPTV, or internet protocol television, is live TV and on-demand video delivered over your broadband instead of a dish, aerial or cable.',
    trail: [['/what-is-iptv-uk/', 'What is IPTV?']],
    sections: [
      ['How it works', '<p>The TV signal is sent as data over the internet to an app on your TV, stick or phone. The app shows a familiar TV guide, lets you flick between channels and plays films and series on demand. BT TV, Virgin Media Stream and Sky Glass all use internet delivery too; an IPTV subscription simply lets you use your own apps and devices.</p>'],
      ['What you need', '<ul><li>Broadband of at least 10 Mbps for HD, 25 Mbps for 4K.</li><li>A device: Smart TV, Firestick, Android box, Apple TV, phone or computer.</li><li>An IPTV app, such as IPTV Smarters Pro or TiviMate.</li><li>A subscription with a login.</li></ul>'],
      ['IPTV vs Freeview, Sky and Virgin', '<p>Freeview needs an aerial and has a fixed set of free channels. Sky and Virgin need a dish or cable, a box and usually a long contract. IPTV needs only broadband, works on devices you already own and, with MOJO 4K, is paid month by month or by the year with no contract.</p>'],
      ['A note on the TV licence', '<p>In the UK you need a TV licence to watch or record live TV on any channel or device, including over the internet, and to use BBC iPlayer. That applies to IPTV just as it does to an aerial.</p>'],
    ],
    faq: [
      ['What does IPTV stand for?', 'Internet protocol television: TV delivered over an internet connection.'],
      ['Do I need a TV licence for IPTV in the UK?', 'Yes, if you watch or record live TV as it is broadcast, or use BBC iPlayer.'],
    ],
    related: [L.sub, L.devices, L.m3u],
  }),
  build({
    path: '/m3u-playlist-guide-uk/',
    title: 'M3U Playlist UK – What It Is and How to Use It | MOJO 4K',
    description: 'What is an M3U playlist, how is it different from an Xtream Codes login, and how do you add an IPTV M3U link to VLC, Smart TV apps and Kodi in the UK?',
    kicker: 'Guide',
    h1: 'M3U playlists, <span class="grad-text">explained</span>',
    lead: 'An M3U link is a web address that lists every channel in your subscription. Most apps can read it, which makes it the universal way to load IPTV.',
    trail: [['/m3u-playlist-guide-uk/', 'M3U playlist guide']],
    sections: [
      ['M3U vs Xtream Codes', '<p>Both give your app the same channels. <b>Xtream Codes</b> (server URL, username, password) is usually quicker and loads films, series and the TV guide automatically. <b>M3U</b> is a single link that almost every player understands, including VLC and Smart TV apps that cannot take an Xtream login.</p>'],
      ['Add an M3U link', '<ul><li><b>VLC (Windows, Mac):</b> Media → Open Network Stream, paste the link.</li><li><b>IBO Player, Smart IPTV, SET IPTV:</b> upload the link on the app’s website using your TV’s MAC address.</li><li><b>TiviMate, OTT Navigator:</b> Add playlist → M3U, paste the link.</li><li><b>Kodi:</b> install the PVR IPTV Simple Client add-on and paste the link in its settings.</li></ul>'],
      ['Keep your link private', '<p>Your M3U link contains your login. Do not post it online or share it outside your household, or it may be blocked for overuse.</p>'],
      ['About free UK M3U playlists', '<p>Free “UK M3U playlists” shared online are usually broken within days, can contain unsafe links and often carry content without permission. A proper subscription with support is the reliable route.</p>'],
    ],
    faq: [
      ['Where do I find my M3U link?', 'We send it with your login details by WhatsApp and email. Ask us any time if you need it again.'],
      ['Why does my M3U playlist not load?', 'Check the full link was copied, including the http:// at the start, and that your subscription is active.'],
    ],
    related: [L.apps, L.guides, L.buffer],
  }),
  build({
    path: '/iptv-buffering-fix/',
    title: 'IPTV Buffering or Not Working? 10 Fixes for UK Homes | MOJO 4K',
    description: 'IPTV buffering, freezing or not working in the UK? Ten practical fixes, from Wi-Fi and router checks to app settings, cache and DNS, plus when to contact support.',
    kicker: 'Troubleshooting',
    h1: 'IPTV buffering? <span class="grad-text">Try these fixes</span>',
    lead: 'Most buffering is caused by something between the router and the TV. Work down this list; most people are sorted by step four.',
    trail: [['/iptv-buffering-fix/', 'Fix IPTV buffering']],
    sections: [
      ['Quick fixes', steps(['<b>Restart everything:</b> router first, then the device, then the app.', '<b>Test the speed on the TV device</b>, not your phone. You want 10 Mbps for HD and 25 Mbps for 4K.', '<b>Use a cable</b> or powerline adapter if the router is in another room.', '<b>Switch to the HD version</b> of the channel if 4K stutters.', '<b>Clear the app cache</b> (Firestick: Settings → Applications → Manage installed applications).', '<b>Change the player</b> in the app settings (for example to VLC or ExoPlayer).', '<b>Pause other big downloads</b> such as game updates or cloud backups.', '<b>Power the Firestick from the mains</b>, not the TV’s USB port.', '<b>Try a different DNS</b> on the device or router.', '<b>Update the app</b> to the latest version.'])],
      ['IPTV not working at all?', '<p>If nothing loads, check your subscription has not expired, re-enter the login carefully (the server URL must be exact), and make sure you are not watching on more screens than your plan allows.</p>'],
      ['Still stuck?', `<p>Message us on WhatsApp with your device, app and what you see on screen. We reply in minutes, day and night.</p><p>${waButton('Get help on WhatsApp', 'Hi MOJO 4K, my IPTV is buffering. Can you help?')}</p>`],
    ],
    faq: [
      ['Why does IPTV buffer at weekends?', 'Everyone streams at once, so home Wi-Fi and broadband are under more pressure. A wired connection helps most.'],
      ['Does a VPN fix buffering?', 'Sometimes, if your broadband provider slows video traffic, but a VPN can also slow things down. Try the steps above first.'],
    ],
    related: [L.k4, L.devices, L.m3u],
  }),
];

export default () => [...core, appHub, ...apps, deviceHub, ...devices, cityHub, ...cities, ...guidesUk];
