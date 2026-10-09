// Google Reviews section: a separate component from the Trustpilot and
// WhatsApp reviews. Data lives in src/google-reviews.mjs, the review link in site.mjs.
import { site } from './site.mjs';
import { icon } from './icons.mjs';
import { googleReviews } from './google-reviews.mjs';

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const gMark = (size = 28) => `<svg class="g-mark" width="${size}" height="${size}" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>`;

const wordmark = `<span class="g-word" aria-label="Google"><i style="color:#4285F4">G</i><i style="color:#EA4335">o</i><i style="color:#FBBC05">o</i><i style="color:#4285F4">g</i><i style="color:#34A853">l</i><i style="color:#EA4335">e</i></span>`;

const stars = (n) => `<span class="g-stars" role="img" aria-label="Rated ${n} out of 5">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= n ? 'on' : ''}">★</i>`).join('')}</span>`;

const avatarColours = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8a3fd0', '#e4223a'];
const initials = (name) => name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

const card = (r, i) => {
  const rating = Math.max(1, Math.min(5, Math.round(Number(r.rating) || 5)));
  return `<article class="g-card reveal" style="--d:${((i % 3) * 0.06).toFixed(2)}s">
  <header class="g-card-head">
    <span class="g-avatar" style="background:${avatarColours[i % avatarColours.length]}" aria-hidden="true">${esc(initials(r.name))}</span>
    <span class="g-who"><b>${esc(r.name)}</b>${r.date ? `<small>${esc(r.date)}</small>` : ''}</span>
    ${gMark(22)}
  </header>
  ${stars(rating)}
  <div class="g-text" data-g-text><p>${esc(r.text).replace(/\n+/g, '</p><p>')}</p></div>
  <button class="g-more" type="button" data-g-more hidden>Read more</button>
  ${r.url ? `<a class="g-source" href="${esc(r.url)}" target="_blank" rel="noopener">View on Google ${icon.arrow}</a>` : '<span class="g-source g-source--plain">Posted on Google</span>'}
</article>`;
};

const reviewButton = (cls = 'btn--lg') =>
  site.googleReviewUrl
    ? `<a class="btn g-btn ${cls}" href="${esc(site.googleReviewUrl)}" target="_blank" rel="noopener">${gMark(20)} Review us on Google</a>`
    : '';

export const googleReviewsSection = (reviews = googleReviews) => {
  const count = reviews.length;
  const avg = count ? reviews.reduce((s, r) => s + (Number(r.rating) || 5), 0) / count : 0;
  const head = `<div class="g-head reveal">
      <div class="g-brand">${gMark(44)}<div><div class="g-brand-line">${wordmark}<span>Reviews</span></div>
      ${count ? `<div class="g-score"><b>${avg.toFixed(1)}</b>${stars(Math.round(avg))}<span>${count} review${count > 1 ? 's' : ''}</span></div>` : '<p class="g-sub">What our customers say on Google</p>'}</div></div>
      ${count ? reviewButton('') : ''}
    </div>`;
  const body = count
    ? `<div class="g-grid">${reviews.map(card).join('')}</div>`
    : `<div class="g-empty reveal">
        <div class="g-empty-icon">${gMark(56)}<span class="g-empty-stars" aria-hidden="true">★★★★★</span></div>
        <h3 class="h3">Watching with MOJO 4K? Tell people on Google</h3>
        <p>Your review helps other British families find telly that just works. It takes less than a minute.</p>
        <div class="btn-row center-row">${reviewButton()}<a class="btn btn--ghost btn--lg" href="/go/wa" target="_blank" rel="noopener">${icon.whatsapp} Send us feedback</a></div>
      </div>`;
  return `<section class="section g-section" id="google-reviews" aria-labelledby="g-title">
  <div class="container">
    <h2 class="sr-only" id="g-title">Google reviews</h2>
    ${head}
    ${body}
  </div>
</section>`;
};
