// Everything a non-developer is likely to change lives in this file:
// contact details, prices, plan links and tracking IDs.

export const site = {
  name: 'MOJO 4K',
  url: 'https://mojo4k.uk',
  locale: 'en_GB',
  lang: 'en-GB',
  themeColor: '#07070c',
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

export const nav = [
  ['/', 'Home'],
  ['/pricing/', 'Pricing'],
  ['/channels-list/', 'Channels'],
  ['/installation-guides/', 'Setup guides'],
  ['/referral/', 'Referral'],
  ['/free-trial/', 'Free trial'],
  ['/contact-us/', 'Contact'],
];

// Plan pages keep the exact URLs the WordPress products used, so existing
// Google rankings and shared links keep working after the move.
// `checkout`: paste a payment link (Stripe, PayPal, Sellix…) to send buyers
// straight to payment. Leave it empty and the buy button opens WhatsApp with
// the plan pre-filled instead.
export const pricing = [
  { devices: 1, plans: [
    { months: 1, price: 7, original: 14, slug: '1-month-iptv-subscription-stream-live-tv-with-mojo4k', checkout: '' },
    { months: 6, price: 29, original: 58, slug: '6-month-iptv-subscription-unlimited-streaming', checkout: '' },
    { months: 12, price: 39, original: 78, slug: '12-month-iptv-subscription-unlimited-streaming-with-mojo4k', checkout: '' },
  ] },
  { devices: 2, plans: [
    { months: 1, price: 12, original: 24, slug: 'best-iptv-for-2-devices-monthly', checkout: '' },
    { months: 6, price: 49, original: 98, slug: '6-months-iptv-subscription', checkout: '' },
    { months: 12, price: 62, original: 124, slug: 'iptv-smarters-pro', checkout: '' },
  ] },
  { devices: 3, plans: [
    { months: 1, price: 17, original: 34, slug: 'smarters-player-lite-subscription', checkout: '' },
    { months: 6, price: 71, original: 142, slug: '6-months-iptv-subscription-for-3-devices', checkout: '' },
    { months: 12, price: 83, original: 166, slug: 'mojo-iptv', checkout: '' },
  ] },
  { devices: 4, plans: [
    { months: 1, price: 23, original: 46, slug: '1-month-iptv-subscription-for-4-devices', checkout: '' },
    { months: 6, price: 90, original: 180, slug: '6-months-iptv-subscription-for-4-devices', checkout: '' },
    { months: 12, price: 110, original: 220, slug: 'ip-tv-smarters-pro', checkout: '' },
  ] },
  { devices: 5, plans: [
    { months: 1, price: 27, original: 54, slug: 'iptv-subscription-2', checkout: '' },
    { months: 6, price: 117, original: 234, slug: '6-months-iptv-subscription-for-5-devices', checkout: '' },
    { months: 12, price: 138, original: 276, slug: '1-year-iptv-subscription', checkout: '' },
  ] },
];

export const planFeatures = [
  '4K Ultra HD quality',
  'PPV, UFC, boxing, F1 & Super Bowl',
  'Premier League, EFL & Champions League',
  'NBA, NHL & NFL packages',
  '50,000+ live channels',
  '120,000+ movies & series (VOD)',
  'Movies & series updated daily',
  'Catch-up & EPG TV guide',
  'Anti-freeze technology',
  'Works on all devices',
  '100% secure & private',
  '24/7 live chat support',
];

export const allPlans = () =>
  pricing.flatMap(({ devices, plans }) => plans.map((p) => ({ ...p, devices })));

export const faqs = [
  ['What is MOJO 4K?', 'MOJO 4K is a premium IPTV service that lets you stream live TV channels, sports, movies and series over the internet on all your devices, in HD and 4K.'],
  ['What currency are the prices in?', 'All prices are in British pounds (GBP). Paying from outside the UK? Your bank or card converts the amount automatically.'],
  ['Do you offer a money-back guarantee?', 'Yes. Every plan comes with a 7-day money-back guarantee. If you are not happy, contact us within 7 days of purchase for a full refund.'],
  ['How quickly will I get my login?', 'Most orders are activated within 5 minutes. We send your login details by WhatsApp and email, ready to enter in your IPTV app.'],
  ['How many channels and VOD titles do I get?', 'Every plan includes the full lineup: 50,000+ live channels (sports, entertainment, news and international) plus 120,000+ movies and series, in up to 4K. Browse it on the <a href="/channels-list/">channels list</a>.'],
  ['Can I watch on several devices at the same time?', 'Yes. Pick a plan with 1 to 5 connections. Each connection is one screen watching at the same time.'],
  ['Which devices are supported?', 'Firestick and Fire TV, Smart TVs (Samsung, LG, Android TV), Android boxes, Apple TV, iPhone and iPad, MAG boxes, Formuler, Windows, Mac and web browsers.'],
  ['Which app should I use?', 'Any popular IPTV app works, including IPTV Smarters Pro, TiviMate, IBO Player, Smart One, DuplexPlay, OTT Navigator and Kodi. See our <a href="/installation-guides/">setup guides</a>.'],
  ['What internet speed do I need?', 'We recommend at least 10 Mbps for HD and 25 Mbps for 4K. A wired connection or good Wi-Fi gives the smoothest picture.'],
  ['Can I try before I buy?', 'Yes. Ask for a <a href="/free-trial/">free trial</a> on WhatsApp and we will set you up so you can test the service on your own device.'],
  ['Can I change devices during my subscription?', 'Yes. You can switch devices whenever you like, as long as the number of screens watching at once matches your plan.'],
  ['What happens when my subscription ends?', 'You can renew any time on mojo4k.uk or by messaging us on WhatsApp. Your login stays the same.'],
];
