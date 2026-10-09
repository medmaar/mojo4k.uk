// Everything a non-developer is likely to change lives in this file:
// contact details, prices, plan links and tracking IDs.

export const site = {
  name: 'MOJO 4K',
  url: 'https://mojo4k.uk',
  locale: 'en_GB',
  lang: 'en-GB',
  themeColor: '#060914',
  email: 'help@mojo4k.uk',
  whatsapp: '17828026280',
  telegram: 'https://t.me/LiveSupportIPTV',
  ogImage: '/images/2024/12/Holiday-Gathering-iStock-1.webp',
  // Analytics carried over from the WordPress site. Empty string disables one.
  gtag: ['GT-K8D5J8QJ', 'G-JJR5ECP8RV'],
  facebookPixel: '418151830809670',
  googleSiteVerification: '',
};

export const waLink = (text = "Hi, I'm interested in your MOJO 4K service") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

// URLs from the old WordPress site that are blacklisted for Google ranking.
// No page may ever be published at these paths (build.mjs enforces this).
// The homepage lives at /uk/ and the bare domain redirects there.
export const blacklistedPaths = [
  '/', '/privacy-policy', '/channels-list', '/mojo-iptv', '/free-trial', '/installation-guides',
  '/refund-policy', '/contact-us', '/iptv-subscription-2', '/terms-and-conditions', '/best-iptv-service',
  '/about-us-mojo4k', '/ip-tv-smarters-pro', '/6-months-iptv-subscription', '/smarters-player-lite-subscription',
  '/1-year-iptv-subscription', '/best-iptv-for-2-devices-monthly', '/6-months-iptv-subscription-for-5-devices',
  '/1-month-iptv-subscription-for-4-devices', '/1-month-iptv-subscription-stream-live-tv-with-mojo4k',
];

export const nav = [
  ['/uk/', 'Home'],
  ['/pricing/', 'Pricing'],
  ['/uk-iptv-channels/', 'Channels'],
  ['/iptv-setup-guides/', 'Setup guides'],
  ['/referral/', 'Referral'],
  ['/free-iptv-trial-uk/', 'Free trial'],
  ['/contact/', 'Contact'],
];

// Each plan has its own order page at /<slug>/.
// `checkout`: paste a payment link (Stripe, PayPal, Sellix…) to send buyers
// straight to payment. Leave it empty and the buy button opens WhatsApp with
// the plan pre-filled instead.
export const pricing = [
  { devices: 1, plans: [
    { months: 1, price: 7, original: 14, slug: 'plans/1-month-1-device', checkout: '' },
    { months: 6, price: 29, original: 58, slug: 'plans/6-months-1-device', checkout: '' },
    { months: 12, price: 39, original: 78, slug: 'plans/12-months-1-device', checkout: '' },
  ] },
  { devices: 2, plans: [
    { months: 1, price: 12, original: 24, slug: 'plans/1-month-2-devices', checkout: '' },
    { months: 6, price: 49, original: 98, slug: 'plans/6-months-2-devices', checkout: '' },
    { months: 12, price: 62, original: 124, slug: 'plans/12-months-2-devices', checkout: '' },
  ] },
  { devices: 3, plans: [
    { months: 1, price: 17, original: 34, slug: 'plans/1-month-3-devices', checkout: '' },
    { months: 6, price: 71, original: 142, slug: 'plans/6-months-3-devices', checkout: '' },
    { months: 12, price: 83, original: 166, slug: 'plans/12-months-3-devices', checkout: '' },
  ] },
  { devices: 4, plans: [
    { months: 1, price: 23, original: 46, slug: 'plans/1-month-4-devices', checkout: '' },
    { months: 6, price: 90, original: 180, slug: 'plans/6-months-4-devices', checkout: '' },
    { months: 12, price: 110, original: 220, slug: 'plans/12-months-4-devices', checkout: '' },
  ] },
  { devices: 5, plans: [
    { months: 1, price: 27, original: 54, slug: 'plans/1-month-5-devices', checkout: '' },
    { months: 6, price: 117, original: 234, slug: 'plans/6-months-5-devices', checkout: '' },
    { months: 12, price: 138, original: 276, slug: 'plans/12-months-5-devices', checkout: '' },
  ] },
];

export const planFeatures = [
  '4K Ultra HD quality',
  'Every Premier League & EFL match',
  'Sky Sports, TNT Sports & Premier Sports',
  'Boxing & UFC PPV, F1, cricket & rugby',
  '50,000+ live channels',
  '120,000+ films & box sets on demand',
  'New films & series added daily',
  'Catch-up & EPG TV guide',
  'Anti-freeze technology',
  'Works on all devices',
  '100% secure & private',
  '24/7 support on WhatsApp',
];

export const allPlans = () =>
  pricing.flatMap(({ devices, plans }) => plans.map((p) => ({ ...p, devices })));

export const faqs = [
  ['What is MOJO 4K?', 'MOJO 4K is a premium IPTV service that brings British TV, live sport, films and box sets to every screen in your home over your normal broadband, in HD and 4K. No dish, no engineer visit, no 18-month contract.'],
  ['What currency are the prices in?', 'Everything is priced in pounds sterling (£). What you see is what you pay: no hidden fees and no auto-renewal.'],
  ['Does it work everywhere in the UK?', 'Yes. MOJO 4K works across England, Scotland, Wales and Northern Ireland on any decent broadband or 4G/5G connection, and you can take it with you on holiday too.'],
  ['Do I get my regional BBC and ITV?', 'Yes. The lineup includes the BBC nations and regions, ITV and STV regions, UTV and S4C, plus catch-up and a full TV guide.'],
  ['Do you offer a money-back guarantee?', 'Yes. Every plan comes with a 7-day money-back guarantee. If you are not happy, contact us within 7 days of purchase for a full refund.'],
  ['How quickly will I get my login?', 'Most orders are activated within 5 minutes. We send your login details by WhatsApp and email, ready to enter in your IPTV app.'],
  ['How many channels and VOD titles do I get?', 'Every plan includes the full lineup: 50,000+ live channels (sports, entertainment, news and international) plus 120,000+ films and box sets, in up to 4K. Browse it on the <a href="/uk-iptv-channels/">channels list</a>.'],
  ['Can I watch on several devices at the same time?', 'Yes. Pick a plan with 1 to 5 connections. Each connection is one screen watching at the same time.'],
  ['Which devices are supported?', 'Amazon Firestick and Fire TV, Samsung, LG, Sony, Hisense and TCL Smart TVs, Android boxes, Nvidia Shield, Apple TV, iPhone and iPad, MAG boxes, Formuler, Windows, Mac and web browsers.'],
  ['Which app should I use?', 'Any popular IPTV app works, including IPTV Smarters Pro, TiviMate, IBO Player, Smart One, DuplexPlay, OTT Navigator and Kodi. See our <a href="/iptv-setup-guides/">setup guides</a>.'],
  ['What internet speed do I need?', 'We recommend at least 10 Mbps for HD and 25 Mbps for 4K. Any UK fibre package from BT, Sky, Virgin Media, TalkTalk or Vodafone is plenty. A wired connection or good Wi-Fi gives the smoothest picture.'],
  ['Can I try before I buy?', 'Yes. Ask for a <a href="/free-iptv-trial-uk/">free trial</a> on WhatsApp and we will set you up so you can test the service on your own device.'],
  ['Can I change devices during my subscription?', 'Yes. You can switch devices whenever you like, as long as the number of screens watching at once matches your plan.'],
  ['What happens when my subscription ends?', 'You can renew any time on mojo4k.uk or by messaging us on WhatsApp. Your login stays the same.'],
];
