import { pricing, faqs } from '../site.mjs';
import { pricingSection, faqSection, faqSchema, reviewsSection } from '../blocks.mjs';
import { pageHero, ctaBand } from '../layout.mjs';
import { icon } from '../icons.mjs';

const priceFaqs = faqs.filter(([q]) => /currency|money-back|login|several devices|change devices|ends/.test(q));
const prices = pricing.flatMap((g) => g.plans.map((p) => p.price));

const table = `<section class="section section--tight">
  <div class="container narrow">
    <div class="section-head reveal"><span class="kicker">All prices</span><h2 class="h2">Every plan at a glance</h2></div>
    <div class="table-wrap reveal"><table class="price-table">
      <thead><tr><th scope="col">Devices</th><th scope="col">1 month</th><th scope="col">6 months</th><th scope="col">12 months</th></tr></thead>
      <tbody>${pricing
        .map(({ devices, plans }) => `<tr><th scope="row">${devices} device${devices > 1 ? 's' : ''}</th>${plans.map((p) => `<td><a href="/${p.slug}/"><b>£${p.price}</b> <s>£${p.original}</s></a></td>`).join('')}</tr>`)
        .join('')}</tbody>
    </table></div>
  </div>
</section>`;

export default () => ({
  path: '/pricing/',
  title: 'IPTV Subscription UK Prices – Plans from £7 | MOJO 4K',
  description: `MOJO 4K IPTV subscription prices for the UK: 1, 6 or 12 months on 1 to 5 devices, from £${Math.min(...prices)}. 50% off today, 7-day money-back guarantee.`,
  schema: [faqSchema(priceFaqs)],
  body: `
${pageHero({
  kicker: 'Pricing',
  title: 'IPTV subscription UK: <span class="grad-text">half the price</span>',
  lead: 'Every plan includes every channel, every movie and every feature. Choose how many screens you need and how long you want to save.',
})}
${pricingSection({ heading: false, id: 'plans' })}
${table}
<section class="section section--tight">
  <div class="container">
    <div class="grid grid-3">
      <div class="card feature reveal"><div class="icon">${icon.refund}</div><h3>7-day money-back</h3><p>Try it on your own TV. If it isn’t right for you, ask for a full refund within 7 days.</p></div>
      <div class="card feature reveal" style="--d:.06s"><div class="icon">${icon.bolt}</div><h3>Ready in 5 minutes</h3><p>Your login arrives by WhatsApp and email, usually within minutes of ordering.</p></div>
      <div class="card feature reveal" style="--d:.12s"><div class="icon">${icon.gift}</div><h3>Refer &amp; get a year free</h3><p>Bring a friend who subscribes and we add a free year to your account. <a href="/referral/">How it works</a>.</p></div>
    </div>
  </div>
</section>
${reviewsSection()}
${faqSection(priceFaqs)}
${ctaBand('Still deciding?', 'Message us on WhatsApp and we will help you pick the right plan for your home.')}
`,
});
