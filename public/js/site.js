(() => {
  const d = document;
  d.documentElement.classList.add('js');

  // Mobile menu
  const btn = d.querySelector('.menu-btn');
  if (btn) {
    const set = (open) => {
      d.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    d.querySelectorAll('.mobile-nav a').forEach((a) => a.addEventListener('click', () => set(false)));
    d.addEventListener('keydown', (e) => e.key === 'Escape' && set(false));
  }

  // Reveal on scroll
  const items = d.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  // Images that fail to load (e.g. not imported yet) show their label instead
  const fallback = (img) => {
    const label = img.dataset.fallback;
    if (!label) { img.style.visibility = 'hidden'; return; }
    const s = d.createElement('span');
    s.className = 'fallback-label';
    s.textContent = label;
    img.replaceWith(s);
  };
  d.querySelectorAll('img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0 && img.src) fallback(img);
    else img.addEventListener('error', () => fallback(img), { once: true });
  });

  // Pricing device switcher
  d.querySelectorAll('[data-pricing]').forEach((root) => {
    const data = JSON.parse(root.querySelector('script[type="application/json"]').textContent);
    const seg = root.querySelector('.seg');
    const plans = root.querySelector('.plans');
    const cards = plans.querySelectorAll('.plan');
    const buttons = seg.querySelectorAll('button');
    const show = (i) => {
      const group = data[i];
      seg.style.setProperty('--i', i);
      buttons.forEach((b, j) => b.setAttribute('aria-selected', String(j === i)));
      const n = group.devices;
      group.plans.forEach((p, k) => {
        const c = cards[k];
        if (!c) return;
        c.querySelector('.amt').textContent = p.price;
        c.querySelector('s').textContent = `£${p.original}`;
        const pm = c.querySelector('.per-month');
        if (pm) pm.textContent = p.months === 1 ? 'Billed monthly' : `≈ £${(p.price / p.months).toFixed(2)}/mo`;
        c.querySelector('.js-conn').textContent = `${n} device${n > 1 ? 's' : ''} at the same time`;
        c.querySelector('.js-sub').textContent = `${n} simultaneous connection${n > 1 ? 's' : ''}`;
        c.querySelector('a.btn').href = `/${p.slug}/`;
      });
      plans.classList.remove('is-swapping');
      void plans.offsetWidth;
      plans.classList.add('is-swapping');
    };
    buttons.forEach((b, i) => b.addEventListener('click', () => show(i)));
    seg.addEventListener('keydown', (e) => {
      const cur = [...buttons].findIndex((b) => b.getAttribute('aria-selected') === 'true');
      const next = e.key === 'ArrowRight' ? cur + 1 : e.key === 'ArrowLeft' ? cur - 1 : -1;
      if (next >= 0 && next < buttons.length) { show(next); buttons[next].focus(); }
    });
  });

  // Channel search
  const q = d.querySelector('[data-ch-search]');
  if (q) {
    const groups = d.querySelectorAll('[data-ch-group]');
    const empty = d.querySelector('[data-ch-empty]');
    q.addEventListener('input', () => {
      const term = q.value.trim().toLowerCase();
      let any = false;
      groups.forEach((g) => {
        const title = g.querySelector('h2').textContent.toLowerCase();
        let hits = 0;
        g.querySelectorAll('li').forEach((li) => {
          const hit = term && li.textContent.toLowerCase().includes(term);
          li.classList.toggle('hit', !!hit);
          if (hit) hits++;
        });
        const show = !term || hits > 0 || title.includes(term);
        g.hidden = !show;
        if (show) any = true;
      });
      empty.hidden = any;
    });
  }
  // Review sliders: dots, swipe (native scroll-snap) and autoplay
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.querySelectorAll('[data-slider]').forEach((root) => {
    const track = root.querySelector('.rv-track');
    const dots = root.querySelector('.rv-dots');
    const cards = track.children;
    let pages = 1, cur = 0, timer;
    const perView = () => Math.max(1, Math.round(track.clientWidth / cards[0].getBoundingClientRect().width));
    const go = (i, smooth = true) => {
      cur = (i + pages) % pages;
      const target = cards[Math.min(cur * perView(), cards.length - 1)];
      track.scrollTo({ left: target.offsetLeft - track.firstElementChild.offsetLeft, behavior: smooth ? 'smooth' : 'auto' });
    };
    const mark = () => dots.querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-selected', String(j === cur)));
    const build = () => {
      pages = Math.ceil(cards.length / perView());
      dots.innerHTML = '';
      for (let i = 0; i < pages; i++) {
        const b = d.createElement('button');
        b.type = 'button';
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', `Go to slide ${i + 1}`);
        b.addEventListener('click', () => { go(i); restart(); });
        dots.appendChild(b);
      }
      cur = Math.min(cur, pages - 1);
      mark();
    };
    track.addEventListener('scroll', () => {
      const w = track.clientWidth || 1;
      const i = Math.round(track.scrollLeft / w);
      if (i !== cur && i < pages) { cur = i; mark(); }
    }, { passive: true });
    const restart = () => {
      clearInterval(timer);
      if (!still && pages > 1) timer = setInterval(() => { if (!d.hidden) { go(cur + 1); mark(); } }, 6000);
    };
    track.addEventListener('pointerdown', restart);
    build();
    restart();
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { build(); go(cur, false); restart(); }, 150); });
  });

  // Referral form: builds the referral and sends it to us on WhatsApp or by email
  const ref = d.querySelector('[data-referral]');
  if (ref) {
    const done = d.querySelector('[data-referral-done]');
    const v = (n) => ref.elements[n].value.trim();
    const text = () => [
      'New MOJO 4K referral',
      '',
      'My details:',
      `Name: ${v('you_name')}`, `WhatsApp: ${v('you_phone')}`, `Email: ${v('you_email')}`,
      '',
      'My friend:',
      `Name: ${v('friend_name')}`, `WhatsApp: ${v('friend_phone')}`, `Email: ${v('friend_email')}`,
    ].join('\n');
    ref.addEventListener('submit', (e) => {
      e.preventDefault();
      if (v('website')) return;
      if (!ref.reportValidity()) return;
      const msg = text();
      const wa = `https://wa.me/${ref.dataset.wa}?text=${encodeURIComponent(msg)}`;
      const mail = `mailto:${ref.dataset.email}?subject=${encodeURIComponent('New MOJO 4K referral')}&body=${encodeURIComponent(msg)}`;
      done.querySelector('[data-wa]').href = wa;
      done.querySelector('[data-mail]').href = mail;
      ref.hidden = true;
      done.hidden = false;
      done.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.open(wa, '_blank', 'noopener');
    });
    done.querySelector('[data-again]').addEventListener('click', () => {
      ['friend_name', 'friend_phone', 'friend_email'].forEach((n) => { ref.elements[n].value = ''; });
      done.hidden = true;
      ref.hidden = false;
      ref.elements.friend_name.focus();
    });
  }
  // Reading progress bar
  const bar = d.querySelector('.progress');
  if (bar) {
    let ticking = false;
    const upd = () => { const h = d.documentElement; bar.style.setProperty('--p', (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)).toFixed(4)); ticking = false; };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  // Spotlight that follows the pointer on cards
  if (window.matchMedia('(hover: hover)').matches) {
    d.addEventListener('pointermove', (e) => {
      const c = e.target.closest && e.target.closest('.card, .plan, .rv-card, .media-card, .g-card');
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`);
      c.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
  }
  // Google reviews: long reviews show in full behind "Read more"
  d.querySelectorAll('[data-g-text]').forEach((t) => {
    const more = t.parentElement.querySelector('[data-g-more]');
    t.classList.add('is-clamped');
    if (t.scrollHeight <= t.clientHeight + 2) { t.classList.remove('is-clamped'); return; }
    more.hidden = false;
    more.setAttribute('aria-expanded', 'false');
    more.addEventListener('click', () => {
      const open = t.classList.toggle('is-clamped') === false;
      more.textContent = open ? 'Show less' : 'Read more';
      more.setAttribute('aria-expanded', String(open));
    });
  });
})();
