# mojo4k.uk

The MOJO 4K website as a fast static site, built for Cloudflare Pages. It replaces the old WordPress site on Hostinger.

## What's here

| Path | What it is |
| --- | --- |
| `src/site.mjs` | **Edit this first.** Contact details, prices, plan links, payment links and tracking IDs. |
| `src/pages/` | Page content (home, pricing, plans, channels, setup guides, referral, contact, legal…). |
| `public/` | Files copied as-is: CSS, JS, images, `_redirects`, `_headers`, favicon. |
| `build.mjs` | Builds every page into `dist/`, plus `sitemap.xml` and `robots.txt`. No dependencies. |
| `scripts/import-images.mjs` | Copies the site's images from the old WordPress media library into `public/images/`. |

Build and preview locally (Node 20+):

```sh
npm run build        # writes dist/
npm run dev          # builds, then serves dist/ on http://localhost:8788
```

## Deploy on Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick `medmaar/mojo4k.uk`.
2. Build settings: **Build command** `npm run build`, **Build output directory** `dist`. Framework preset: None.
3. Deploy. You get a `*.pages.dev` preview URL to check everything.
4. When ready, **Custom domains → Set up a domain → mojo4k.uk** (and `www.mojo4k.uk`). Moving the domain's DNS to Cloudflare makes this one click.

Every push to the production branch redeploys automatically; other branches get preview URLs.

The built site is also committed in `dist/` (the **Build site** GitHub Action rebuilds it on every push to `main`), so Cloudflare can deploy it even if the build command is left empty.

## Before switching off WordPress

- **Images:** the site uses the same images as WordPress, under `/images/…`. Run the **Import images from WordPress** action (GitHub → Actions → Run workflow) or `npm run import-images` while the old site is still online, so the images are saved in this repo. Old `/wp-content/uploads/…` links redirect to `/images/…`.
- **Payments:** WordPress handled checkout. Each plan now has an order page under `/plans/`. By default the buy button opens WhatsApp with the plan pre-filled. To take card payments directly, paste a payment link (Stripe Payment Link, PayPal, Sellix…) into that plan's `checkout` field in `src/site.mjs`.
- **Legal pages:** terms, privacy, refund and disclaimer were rewritten in plain English. Check they match how you operate.

## URL rules

- The homepage lives at **`/uk/`**. The bare domain `/` redirects there.
- The old WordPress URLs listed in `blacklistedPaths` in `src/site.mjs` are blacklisted for Google ranking. No page may be published at them, nothing may link to them, and they are not redirected. `npm run build` fails if any page or link breaks this rule.

## SEO

- Titles, descriptions, canonical URLs, Open Graph, hreflang en-GB, JSON-LD (Organization, WebSite, FAQ, Product, HowTo) and an automatic sitemap.
- Common WordPress/WooCommerce URLs (`/feed/`, `/cart/`, `/checkout/`, `/wp-admin/`…) redirect in `public/_redirects`.
- Google Analytics (`GT-K8D5J8QJ`, `G-JJR5ECP8RV`) and the Meta pixel from the old site are kept; change them in `src/site.mjs`.
