// One order page per plan: the plan and its price, then the order form.
import { allPlans, site } from '../site.mjs';
import { orderBody } from '../order.mjs';

const label = (p) => `${p.months === 1 ? '1 Month' : `${p.months} Months`} · ${p.devices} Device${p.devices > 1 ? 's' : ''}`;

export default () =>
  allPlans().map((p) => {
    const name = `MOJO 4K IPTV ${label(p)}`;
    const perMonth = (p.price / p.months).toFixed(2).replace(/\.00$/, '');
    return {
      path: `/${p.slug}/`,
      title: `${p.months === 12 ? '12 Month' : p.months === 6 ? '6 Month' : '1 Month'} IPTV Subscription for ${p.devices} Device${p.devices > 1 ? 's' : ''} – £${p.price} | MOJO 4K`,
      description: `${label(p)} MOJO 4K IPTV subscription for £${p.price} (was £${p.original}). British TV, every Premier League match and 300,000+ films & box sets in 4K. Priced in £, activated within 5 minutes.`,
      schema: [
        {
          '@type': 'Product',
          name,
          brand: { '@type': 'Brand', name: 'MOJO 4K' },
          image: `${site.url}${site.ogImage}`,
          description: `${label(p)} UK IPTV subscription with British TV, live sport and 300,000+ films & box sets in 4K.`,
          areaServed: { '@type': 'Country', name: 'United Kingdom' },
          offers: { '@type': 'Offer', price: p.price, priceCurrency: 'GBP', areaServed: 'GB', availability: 'https://schema.org/InStock', url: `${site.url}/${p.slug}/` },
        },
      ],
      body: orderBody({
        title: label(p),
        price: `<span class="cur">£</span><b>${p.price}</b>`,
        meta: p.months === 1 ? 'One-off payment · no auto-renewal' : `Just £${perMonth} a month · one-off payment, no auto-renewal`,
        type: 'Order',
        plan: label(p),
        amount: `£${p.price}`,
        button: 'Place my order',
        success: 'Order received!',
        notesPlaceholder: 'e.g. your device (Firestick, Smart TV…), your IPTV app or a question about payment',
      }),
    };
  });
