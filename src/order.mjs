// The order page used by every plan page and the free trial page:
// plan and price on top, then one short form that is emailed to us via EmailJS.
import { site } from './site.mjs';
import { esc } from './layout.mjs';
import { icon } from './icons.mjs';
import { dialOptions } from './dial.mjs';

export const orderBody = ({ kicker = 'Your order', title, price, meta, change = { href: '/pricing/', label: 'Change plan' }, type, plan, amount, button, success, notesPlaceholder }) => `
<section class="order-page">
  <div class="order-bg" aria-hidden="true" style="position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none"><div class="order-bg-img" style="position:absolute;inset:0;background:url('/images/hero/mojo4k-uk.webp') 50% 20% / cover no-repeat;opacity:.22"></div></div>
  <div class="container order-wrap">
    <div class="order-summary reveal">
      <span class="kicker">${kicker}</span>
      <h1 class="order-title">${esc(title)}</h1>
      <div class="order-price">${price}</div>
      <p class="order-meta">${meta}</p>
      ${change ? `<a class="order-change" href="${change.href}">${change.label}</a>` : ''}
    </div>

    <form class="order-form reveal" data-order-form novalidate
      data-type="${esc(type)}" data-plan="${esc(plan)}" data-price="${esc(amount)}"
      data-service="${site.emailjs.serviceId}" data-template="${site.emailjs.templateId}" data-key="${site.emailjs.publicKey}">
      <div class="of-row">
        <label class="of-field"><span>First name</span>
          <input type="text" name="first_name" autocomplete="given-name" maxlength="60" required>
          <em class="of-err">Please enter your first name.</em>
        </label>
        <label class="of-field"><span>Email</span>
          <input type="email" name="email" autocomplete="email" inputmode="email" maxlength="120" required>
          <em class="of-err">Please enter a valid email address.</em>
        </label>
      </div>
      <div class="of-row of-row--phone">
        <label class="of-field"><span>Country code</span>
          <select name="dial_code" autocomplete="tel-country-code" required>${dialOptions('GB')}</select>
        </label>
        <label class="of-field"><span>WhatsApp number</span>
          <input type="tel" name="phone" autocomplete="tel-national" inputmode="tel" maxlength="20" placeholder="7700 900123" pattern="[0-9 ()\\-]{6,20}" required>
          <em class="of-err">Please enter your mobile number.</em>
        </label>
      </div>
      <label class="of-field"><span>Notes <small>(optional)</small></span>
        <textarea name="notes" rows="4" maxlength="1000" placeholder="${esc(notesPlaceholder)}"></textarea>
      </label>
      <label class="of-hp" aria-hidden="true">Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label>
      <p class="of-error" data-order-error role="alert" hidden></p>
      <button type="submit" class="btn btn--primary btn--lg btn--block of-submit"><span>${button}</span>${icon.arrow}</button>
      <p class="of-legal">By sending this you agree that we use your details to handle your ${type === 'Free trial' ? 'trial' : 'order'}. See our <a href="/privacy/">privacy policy</a>.</p>
    </form>

    <div class="order-success" data-order-success hidden tabindex="-1">
      <div class="success-check" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M14 27l8 8 16-17"/></svg></div>
      <h2 class="h2">${success}</h2>
      <p>Thank you<span data-success-name></span>! Please check your email at <b data-success-email></b> and your WhatsApp. We’ll send your login details there, usually within minutes.</p>
      <p class="muted">Nothing arrived? Check your spam folder too, or message us on <a href="/go/wa" target="_blank" rel="noopener">WhatsApp</a>.</p>
    </div>
  </div>
</section>`;
