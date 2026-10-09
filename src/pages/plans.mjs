// One order page per plan, at the same URL the WordPress product used.
import { allPlans, planFeatures, site, waLink } from '../site.mjs';
import { pageHero, esc } from '../layout.mjs';
import { icon } from '../icons.mjs';

const label = (p) => `${p.months === 1 ? '1 Month' : `${p.months} Months`} · ${p.devices} Device${p.devices > 1 ? 's' : ''}`;

export default () =>
  allPlans().map((p) => {
    const name = `MOJO 4K IPTV ${label(p)}`;
    const orderText = `Hi MOJO 4K, I'd like to order the ${label(p)} plan (£${p.price}).`;
    const buy = p.checkout
      ? `<a class="btn btn--primary btn--lg btn--block" href="${esc(p.checkout)}" rel="noopener">${icon.lock} Pay £${p.price} securely</a>
         <a class="btn btn--wa btn--lg btn--block" href="${waLink(orderText)}" target="_blank" rel="noopener">${icon.whatsapp} Order on WhatsApp</a>`
      : `<a class="btn btn--wa btn--lg btn--block" href="${waLink(orderText)}" target="_blank" rel="noopener">${icon.whatsapp} Order on WhatsApp</a>
         <a class="btn btn--ghost btn--lg btn--block" href="mailto:${site.email}?subject=${encodeURIComponent(`Order: ${label(p)}`)}&body=${encodeURIComponent(orderText)}">${icon.mail} Order by email</a>`;
    return {
      path: `/${p.slug}/`,
      title: `${p.months === 12 ? '12 Month' : p.months === 6 ? '6 Month' : '1 Month'} IPTV Subscription for ${p.devices} Device${p.devices > 1 ? 's' : ''} – £${p.price} | MOJO 4K`,
      description: `${label(p)} MOJO 4K IPTV subscription for £${p.price} (was £${p.original}). British TV, every Premier League match and 120,000+ films & box sets in 4K. Priced in £, activated within 5 minutes.`,
      schema: [
        {
          '@type': 'Product',
          name,
          brand: { '@type': 'Brand', name: 'MOJO 4K' },
          image: `${site.url}${site.ogImage}`,
          description: `${label(p)} UK IPTV subscription with British TV, live sport and 120,000+ films & box sets in 4K.`,
          areaServed: { '@type': 'Country', name: 'United Kingdom' },
          offers: { '@type': 'Offer', price: p.price, priceCurrency: 'GBP', areaServed: 'GB', availability: 'https://schema.org/InStock', url: `${site.url}/${p.slug}/` },
        },
      ],
      body: `
${pageHero({ kicker: 'Your plan', title: `${label(p)}`, lead: 'Everything included: every channel, every match, every film and box set, in up to 4K.' })}
<section class="section section--tight">
  <div class="container order">
    <div class="card order-card reveal">
      <div class="plan-name">${name}</div>
      <div class="price"><span class="cur">£</span><span class="amt">${p.price}</span><span class="per">/ ${p.months === 1 ? '1 month' : `${p.months} months`}</span></div>
      <div class="price-meta"><s>£${p.original}</s><span class="save">Save 50%</span></div>
      <div class="order-actions">${buy}</div>
      <ul class="trust-list">
        <li>${icon.refund} 7-day money-back guarantee</li>
        <li>${icon.bolt} Login sent within 5 minutes</li>
        <li>${icon.chat} 24/7 support on WhatsApp</li>
      </ul>
    </div>
    <div class="reveal">
      <h2 class="h3">What’s included</h2>
      <ul class="checks checks--lg"><li>${p.devices} device${p.devices > 1 ? 's' : ''} watching at the same time</li><li>${p.months === 1 ? '1 month' : `${p.months} months`} of access</li>${planFeatures.map((f) => `<li>${f.replace(/&/g, '&amp;')}</li>`).join('')}</ul>
      <h2 class="h3" style="margin-top:32px">How ordering works</h2>
      <ol class="num-list">
        <li>Tap <b>Order</b> and send us the pre-filled message.</li>
        <li>We confirm payment and send your login details, usually within 5 minutes.</li>
        <li>Enter them in your IPTV app. Our <a href="/iptv-setup-guides/">setup guides</a> cover every device.</li>
      </ol>
      <p class="muted" style="margin-top:20px">Need more screens or a different length? <a href="/pricing/">See all plans</a>.</p>
    </div>
  </div>
</section>
`,
    };
  });
