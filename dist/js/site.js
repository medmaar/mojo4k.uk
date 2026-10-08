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
})();
