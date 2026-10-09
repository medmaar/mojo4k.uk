import { pageHero, ctaBand, waButton } from '../layout.mjs';

const guides = [
  ['firestick', 'Amazon Firestick & Fire TV', [
    'From the home screen go to <b>Settings → My Fire TV → Developer options</b> and turn on <b>Apps from Unknown Sources</b> (on newer models, enable <b>Install unknown apps</b> for Downloader).',
    'Search for and install the free <b>Downloader</b> app from the Amazon Appstore.',
    'Open Downloader and enter the download link for your IPTV app (we send it with your login), or install <b>IPTV Smarters Pro</b> / <b>TiviMate</b>.',
    'Open the IPTV app, choose <b>Login with Xtream Codes API</b> and enter the username, password and server URL we sent you.',
    'Wait for channels, films and box sets to load, then start watching.',
  ]],
  ['smart-tv', 'Samsung, LG & Hisense Smart TV', [
    'Open your TV’s app store (Samsung Apps or LG Content Store).',
    'Install <b>IBO Player</b>, <b>Smart One</b> or <b>IPTV Smarters Pro</b> (where available).',
    'Open the app and note the <b>MAC address</b> and <b>device key</b> shown on screen.',
    'Send those details to us on WhatsApp, or add your playlist on the app’s website using the M3U link we sent.',
    'Restart the app. Your channels appear within a minute or two.',
  ]],
  ['android', 'Android TV, Android box & phone', [
    'Open the <b>Google Play Store</b>.',
    'Install <b>IPTV Smarters Pro</b>, <b>TiviMate</b> or <b>OTT Navigator</b> (works on Sony, Philips, TCL and Hisense Android TVs too).',
    'Open the app and choose <b>Xtream Codes</b> login (TiviMate: <b>Add playlist → Xtream Codes</b>).',
    'Enter the server URL, username and password from your welcome message.',
    'Channels, EPG and VOD load automatically.',
  ]],
  ['apple', 'iPhone, iPad & Apple TV', [
    'Open the <b>App Store</b>.',
    'Install <b>IPTV Smarters Player Lite</b>, <b>iPlayTV</b> or <b>GSE Smart IPTV</b>.',
    'Choose <b>Add user / Xtream Codes</b>.',
    'Enter the server URL, username and password we sent you.',
    'Save, and your channels and on-demand library will load.',
  ]],
  ['mag', 'MAG box & Formuler', [
    'Send us your box’s <b>MAC address</b> (on the sticker underneath, starting 00:1A:79) when you order.',
    'On the box go to <b>Settings → System settings → Servers → Portals</b>.',
    'Enter a portal name (e.g. MOJO 4K) and the <b>portal URL</b> we send you.',
    'Save and restart the box.',
    'The portal loads with your channels. Formuler users can add the same portal in <b>MyTVOnline</b>.',
  ]],
  ['pc', 'Windows, Mac & web browser', [
    'Download <b>IPTV Smarters Pro</b> for Windows or Mac, or use <b>VLC</b> with the M3U link we sent.',
    'In Smarters choose <b>Login with Xtream Codes API</b> and enter your details.',
    'In VLC choose <b>Media → Open Network Stream</b> and paste the M3U link.',
    'Prefer no install? Ask us for the web player link and watch in your browser.',
  ]],
];

export default () => ({
  path: '/iptv-setup-guides/',
  title: 'IPTV Setup Guides – Firestick, Smart TV, Android & MAG | MOJO 4K',
  description: 'Step-by-step MOJO 4K IPTV installation guides for Firestick, Samsung & LG Smart TV, Android, iPhone, Apple TV, MAG box, Windows and Mac. Watching in minutes.',
  schema: guides.map(([id, name, steps]) => ({
    '@type': 'HowTo',
    name: `How to set up MOJO 4K IPTV on ${name}`,
    step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s.replace(/<[^>]+>/g, '') })),
  })),
  body: `
${pageHero({
  kicker: 'Installation guides',
  title: 'Set up MOJO 4K <span class="grad-text">in minutes</span>',
  lead: 'Pick your device and follow the steps. Stuck? Give us a shout on WhatsApp and we’ll walk you through it, step by step.',
})}
<section class="section section--tight">
  <div class="container">
    <nav class="guide-nav reveal" aria-label="Devices">${guides.map(([id, name]) => `<a class="chip" href="#${id}">${name.replace('&', '&amp;')}</a>`).join('')}</nav>
    <div class="guides">${guides
      .map(([id, name, steps]) => `<article class="card guide reveal" id="${id}"><h2 class="h3">${name.replace('&', '&amp;')}</h2><ol class="num-list">${steps.map((s) => `<li>${s}</li>`).join('')}</ol></article>`)
      .join('')}</div>
    <div class="center" style="margin-top:32px">${waButton('Get setup help on WhatsApp', 'Hi MOJO 4K, can you help me set up my IPTV?')}</div>
  </div>
</section>
${ctaBand()}
`,
});
