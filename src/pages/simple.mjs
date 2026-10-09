import { pageHero, ctaBand, waButton } from '../layout.mjs';
import { site } from '../site.mjs';
import { icon } from '../icons.mjs';
import { faqList, faqSchema } from '../blocks.mjs';

const referralFaqs = [
  ['How does the referral programme work?', 'Fill in the form with your details and your friend’s. When your friend buys any 12-month plan, we add a full year to your subscription as soon as their payment is verified.'],
  ['What counts as a valid referral?', 'A new customer who has never used MOJO 4K before and buys a 12-month plan (any number of devices).'],
  ['Is there a limit?', 'No limit at all. Every friend who subscribes for a year adds another 12 months to your account. Refer five mates, get five free years.'],
  ['When do I get my free year?', 'As soon as your friend’s payment is verified. We confirm it on WhatsApp and add the 12 months straight onto your current subscription, so you lose nothing.'],
  ['Can I just tell you on WhatsApp instead?', 'Please use the form. It sends us every detail we need in one go, so your referral is recorded properly and nothing gets missed.'],
];

const field = (name, label, type, placeholder, autocomplete) =>
  `<label class="field"><span>${label}</span><input name="${name}" type="${type}" placeholder="${placeholder}" autocomplete="${autocomplete}" required></label>`;

const referral = () => ({
  path: '/referral/',
  title: 'Refer a Friend – Get 1 Year of IPTV Free | MOJO 4K UK',
  description: 'Refer a friend to MOJO 4K and get a full year of IPTV free when they buy a 12-month plan. No limit on referrals. Submit your referral in under a minute.',
  schema: [faqSchema(referralFaqs)],
  body: `
<section class="page-hero ref-hero">
  <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div><div class="grid-bg" aria-hidden="true"></div>
  <div class="container z">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/uk/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Referral</span></nav>
    <div class="ref-grid">
      <div class="ref-copy">
        <span class="kicker">Referral programme</span>
        <h1 class="h1">Refer a friend, <span class="grad-text">get 1 year free</span></h1>
        <p class="lead">Chuffed with MOJO 4K? Tell your mates, family or the lads at five-a-side. When one of them subscribes for a year, we add <strong>12 months free</strong> to your account. No limit, no catch.</p>
        <div class="ref-gift" aria-hidden="true">
          <div class="ref-gift-box">${icon.gift}</div>
          <div class="ref-gift-text"><b>1 friend = 1 free year</b><span>Worth up to £138, added straight to your subscription</span></div>
        </div>
        <ul class="ref-points">
          <li>${icon.check} Takes under a minute</li>
          <li>${icon.check} No limit on referrals</li>
          <li>${icon.check} Confirmed on WhatsApp</li>
        </ul>
      </div>
      <div class="ref-form-card">
        <form class="ref-form" data-referral data-wa="${site.whatsapp}" data-email="${site.email}" novalidate>
          <h2 class="h3">Submit a referral</h2>
          <p class="muted small">All fields are required.</p>
          <label class="hp" aria-hidden="true">Website <input name="website" tabindex="-1" autocomplete="off"></label>
          <fieldset><legend><b>1</b> Your details</legend>
            ${field('you_name', 'Your name', 'text', 'e.g. James Smith', 'name')}
            ${field('you_phone', 'Your phone (WhatsApp)', 'tel', 'e.g. 07700 900123', 'tel')}
            ${field('you_email', 'Your email', 'email', 'you@example.co.uk', 'email')}
          </fieldset>
          <fieldset><legend><b>2</b> Your friend’s details</legend>
            ${field('friend_name', 'Friend’s name', 'text', 'e.g. Sarah Jones', 'off')}
            ${field('friend_phone', 'Friend’s phone (WhatsApp)', 'tel', 'e.g. 07700 900456', 'off')}
            ${field('friend_email', 'Friend’s email', 'email', 'friend@example.co.uk', 'off')}
          </fieldset>
          <button class="btn btn--primary btn--lg btn--block" type="submit">${icon.gift} Submit referral</button>
          <p class="muted small center" style="margin:12px 0 0">Your referral is sent to our team on WhatsApp. We never contact your friend without telling you.</p>
        </form>
        <div class="ref-done" data-referral-done hidden>
          <div class="ref-done-icon">${icon.check}</div>
          <h2 class="h3">Nearly there!</h2>
          <p>We’ve opened WhatsApp with your referral filled in. <strong>Tap send</strong> and it’s recorded. Once your friend’s 12-month plan is paid, we add your free year and let you know on WhatsApp.</p>
          <div class="btn-row center-row">
            <a class="btn btn--wa" data-wa href="/go/wa" target="_blank" rel="noopener">${icon.whatsapp} Confirm on WhatsApp</a>
            <a class="btn btn--ghost" data-mail href="mailto:${site.email}">${icon.mail} Send by email instead</a>
          </div>
          <button class="ref-again" type="button" data-again>+ Refer another friend</button>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="section-head reveal"><span class="kicker">How it works</span><h2 class="h2">3 steps to your <span class="grad-text">free year</span></h2></div>
    <div class="steps">
      <div class="card step reveal"><h3>Fill in the form</h3><p>Pop in your details and your friend’s. It takes less than a minute.</p></div>
      <div class="card step reveal" style="--d:.08s"><h3>Your friend subscribes</h3><p>They buy any 12-month plan, for as many devices as they like.</p></div>
      <div class="card step reveal" style="--d:.16s"><h3>You get 1 year free</h3><p>We add 12 months to your subscription once their payment is verified.</p></div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container ref-info">
    <div class="card reveal">
      <h2 class="h3">The rules, in plain English</h2>
      <ul class="checks ref-rules">
        <li>Your friend must be new to MOJO 4K.</li>
        <li>They need to buy a 12-month plan (any number of devices).</li>
        <li>Your free year is added once their payment is verified.</li>
        <li>There’s no limit. Every new yearly customer you refer is another free year.</li>
      </ul>
    </div>
    <div class="card ref-new reveal" style="--d:.08s">
      <span class="ref-new-tag">🇬🇧 New to MOJO 4K?</span>
      <h2 class="h3">Not a customer yet?</h2>
      <p>The free year is added to a paid plan, so you’ll need one first. Not sure yet? Try it on your own telly before you buy.</p>
      <div class="btn-row">
        <a class="btn btn--primary" href="/pricing/">See plans · 50% off</a>
        <a class="btn btn--ghost" href="/free-iptv-trial-uk/">Free trial</a>
      </div>
      <p class="muted small" style="margin:16px 0 0">Questions? <a href="/contact/">Contact support</a> or read the <a href="/terms/">terms</a>.</p>
    </div>
  </div>
</section>

<section class="section section--tight" id="faq">
  <div class="container faq-layout">
    <div class="faq-aside reveal">
      <span class="kicker">FAQ</span>
      <h2 class="h2">Frequently asked questions</h2>
      <p class="muted">Anything else about referrals? Ask us, we reply in minutes.</p>
      <div class="btn-row" style="margin-top:22px"><a class="btn btn--wa" href="/go/wa" target="_blank" rel="noopener">${icon.whatsapp} Chat on WhatsApp</a></div>
    </div>
    <div class="reveal">${faqList(referralFaqs)}</div>
  </div>
</section>
${ctaBand('Not a customer yet? Start today', 'Every match, all your British telly and the latest films in 4K, for half what you pay Sky. Then refer a mate and your next year is on us.')}
`,
});

const contact = () => ({
  path: '/contact/',
  title: 'Contact MOJO 4K – 24/7 IPTV Support on WhatsApp & Email',
  description: 'Contact MOJO 4K, the UK IPTV service, 24/7 on WhatsApp, Telegram or email. Orders, free trials, setup help and renewals, usually answered within minutes.',
  body: `
${pageHero({ kicker: 'Contact us', title: 'We’re here <span class="grad-text">24/7</span>', lead: 'Orders, free trials, setup help or renewals: message us any time, day or night, UK time. Most messages are answered within minutes.' })}
<section class="section section--tight">
  <div class="container">
    <div class="grid grid-3">
      <a class="card card--hover contact-card reveal" href="/go/wa" target="_blank" rel="noopener"><div class="icon icon--wa">${icon.whatsapp}</div><h2 class="h3">WhatsApp</h2><p>The fastest way to reach us, for orders and support.</p><span class="link-arrow">Chat now</span></a>
      <a class="card card--hover contact-card reveal" style="--d:.06s" href="/go/telegram" target="_blank" rel="noopener"><div class="icon icon--tg">${icon.telegram}</div><h2 class="h3">Telegram</h2><p>Live support on Telegram, day and night.</p><span class="link-arrow">Open Telegram</span></a>
      <a class="card card--hover contact-card reveal" style="--d:.12s" href="mailto:${site.email}?subject=${encodeURIComponent('Interest in MOJO 4K service')}"><div class="icon">${icon.mail}</div><h2 class="h3">Email</h2><p>${site.email}</p><span class="link-arrow">Send an email</span></a>
    </div>
  </div>
</section>
${ctaBand()}
`,
});

const trial = () => ({
  path: '/free-iptv-trial-uk/',
  title: 'Free IPTV Trial UK – Try MOJO 4K Before You Buy',
  description: 'Ask for a free MOJO 4K IPTV trial and test British TV, live sport and films in 4K on your own telly before you buy. Set up on WhatsApp in minutes.',
  body: `
${pageHero({
  kicker: 'Free trial',
  title: 'Try MOJO 4K <span class="grad-text">before you buy</span>',
  lead: 'Check the picture, the channels and the speed on your own telly before you spend a penny. Message us on WhatsApp and we’ll get you set up.',
  actions: waButton('Ask for a free trial', "Hi MOJO 4K, I'd like a free trial please."),
})}
<section class="section section--tight">
  <div class="container">
    <div class="steps">
      <div class="card step reveal"><h3>Message us</h3><p>Tap the button and tell us which device you’ll watch on.</p></div>
      <div class="card step reveal" style="--d:.08s"><h3>Get your trial login</h3><p>We send trial details and the right setup guide for your device.</p></div>
      <div class="card step reveal" style="--d:.16s"><h3>Like it? Upgrade</h3><p>Pick a plan and keep watching. Every plan also has a 7-day money-back guarantee.</p></div>
    </div>
  </div>
</section>
${ctaBand('Prefer to jump straight in?', 'Every paid plan comes with a 7-day money-back guarantee, so there is no risk either way.')}
`,
});

const about = () => ({
  path: '/about/',
  title: 'About MOJO 4K – IPTV Made in the UK for British Homes',
  description: 'About MOJO 4K: a UK IPTV service built for British households, with live telly, every match, films and box sets in 4K, 24/7 support and a 7-day money-back guarantee.',
  body: `
${pageHero({ kicker: 'About us', title: 'TV the way <span class="grad-text">it should be</span>', lead: 'MOJO 4K started with a simple, very British grumble: why does decent telly need a dish, an engineer, an 18-month contract and a £100 monthly bill?' })}
<section class="section section--tight"><div class="container narrow"><div class="prose-card prose reveal">
<h2>Who we are</h2>
<p>MOJO 4K is a UK IPTV service, made in Britain for British homes. We bring the channels you grew up with, every match that matters and a huge on-demand library to the devices you already own, in up to 4K, over your normal broadband. We serve households right across England, Scotland, Wales and Northern Ireland.</p>
<h2>What we care about</h2>
<ul>
<li><strong>Quality:</strong> stable servers and anti-freeze technology, so the 3pm kick-off doesn’t buffer.</li>
<li><strong>Simplicity:</strong> one subscription, every channel, no add-ons to chase.</li>
<li><strong>People:</strong> real humans on WhatsApp, Telegram and email, 24 hours a day.</li>
<li><strong>Fairness:</strong> no contracts, clear prices in pounds and a 7-day money-back guarantee.</li>
</ul>
<p>Questions? <a href="/contact/">Get in touch</a>. We’re always happy to have a chat.</p>
</div></div></section>
${ctaBand()}
`,
});

const legal = (path, title, description, html) => ({
  path,
  title: `${title} | MOJO 4K`,
  description,
  body: `
${pageHero({ kicker: 'Legal', title })}
<section class="section section--tight"><div class="container narrow"><div class="prose-card prose">${html}<p class="muted small">Last updated: October 2026. Questions about this page? Email <a href="mailto:${site.email}">${site.email}</a>.</p></div></div></section>
`,
});

const terms = () =>
  legal('/terms/', 'Terms and conditions', 'The terms and conditions for using the MOJO 4K website and IPTV subscription service.', `
<p>By buying a MOJO 4K subscription or using this website you agree to these terms.</p>
<h2>1. The service</h2><p>MOJO 4K provides access to an IPTV service for the length and number of connections of the plan you buy. We do not host, produce or own any of the content available through the service, which is supplied by third parties.</p>
<h2>2. Your account</h2><p>Your login is for your household’s personal use. Watching on more screens at the same time than your plan allows, or sharing or reselling your login, may lead to suspension without refund.</p>
<h2>3. Payment and activation</h2><p>Prices are shown in pounds sterling (GBP). Subscriptions are activated once payment is confirmed, usually within 5 minutes. Subscriptions do not renew automatically.</p>
<h2>4. Availability</h2><p>We work hard to keep the service running 24/7, but we cannot guarantee that every channel or title will always be available, as content depends on third-party sources and your internet connection.</p>
<h2>5. Your responsibility</h2><p>You are responsible for making sure you have the rights to view content in your country, and for having a suitable device and internet connection.</p>
<h2>6. Refunds</h2><p>Refunds are covered by our <a href="/refunds/">refund policy</a>.</p>
<h2>7. Changes</h2><p>We may update these terms from time to time. The latest version is always on this page.</p>
<h2>8. Governing law</h2><p>These terms are governed by the laws of England and Wales. If you live in Scotland or Northern Ireland, you can also bring proceedings in your local courts.</p>`);

const privacy = () =>
  legal('/privacy/', 'Privacy policy', 'How MOJO 4K collects, uses and protects your personal information.', `
<p>Your privacy matters to us. This policy explains what we collect and why.</p>
<h2>What we collect</h2><p>When you order or contact us we collect the details you give us, such as your name, email address, phone number and the device you use, plus payment confirmation from our payment provider. We never see or store your full card details.</p>
<h2>How we use it</h2><p>We use your details to set up and support your subscription, answer your messages and, if you agree, tell you about offers. We do not sell your data.</p>
<h2>Cookies and analytics</h2><p>This website uses Google Analytics and the Meta pixel to understand how visitors use the site and to measure our advertising. You can block these cookies in your browser settings.</p>
<h2>How long we keep it</h2><p>We keep your details for as long as you are a customer and for a reasonable time afterwards to meet legal and accounting obligations.</p>
<h2>Your rights</h2><p>Under UK GDPR and the Data Protection Act 2018 you can ask to see, correct or delete the personal data we hold about you. Email us and we will respond within one month. You can also complain to the Information Commissioner’s Office (ico.org.uk).</p>`);

const refund = () =>
  legal('/refunds/', 'Refund policy', 'MOJO 4K offers a 7-day money-back guarantee on every IPTV subscription. Here is how refunds work.', `
<h2>7-day money-back guarantee</h2><p>If you are not completely satisfied, contact us within 7 days of purchase and we will refund your payment in full.</p>
<h2>How to ask for a refund</h2><p>Message us on <a href="/go/wa" target="_blank" rel="noopener">WhatsApp</a> or email <a href="mailto:${site.email}">${site.email}</a> with your order details. We will usually try to fix any problem first, but the choice is yours.</p>
<h2>When refunds don’t apply</h2><ul><li>Requests made more than 7 days after purchase.</li><li>Accounts suspended for sharing or reselling logins.</li></ul>
<h2>How long it takes</h2><p>Approved refunds go back to your original payment method, normally within 5 to 10 working days depending on your bank.</p>`);

const disclaimer = () =>
  legal('/disclaimer/', 'Disclaimer', 'MOJO 4K disclaimer and DMCA notice.', `
<p>MOJO 4K does not host, upload or stream any copyrighted content on its servers. All content available through the service is provided by third-party providers.</p>
<p>Users are responsible for ensuring they have the rights to view content in their jurisdiction. Logos and channel names on this website are the property of their respective owners and are shown for information only; their use does not imply endorsement.</p>
<h2>Copyright notices</h2><p>If you believe content linked to this website infringes your rights, email <a href="mailto:${site.email}">${site.email}</a> with the details and we will respond promptly.</p>`);

const notFound = () => ({
  path: '/404.html',
  title: 'Page not found | MOJO 4K',
  description: 'This page could not be found.',
  noindex: true,
  body: `
${pageHero({
  kicker: '404',
  title: 'This page <span class="grad-text">went off air</span>',
  lead: 'The page you are looking for has moved or no longer exists.',
  actions: `<a class="btn btn--primary btn--lg" href="/uk/">Back to home</a><a class="btn btn--ghost btn--lg" href="/pricing/">See plans</a>`,
})}`,
});

export default () => [referral(), contact(), trial(), about(), terms(), privacy(), refund(), disclaimer(), notFound()];
