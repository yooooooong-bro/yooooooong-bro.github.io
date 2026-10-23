/* ============================================================
   Yibo Sun — personal site
   Vanilla JS, no dependencies. Handles:
   - mobile menu
   - smooth scrolling for in-page links
   - scroll-spy for nav highlight
   - reveal-on-scroll animations
   - project filtering
   - copy-email button
   - footer year
   ============================================================ */
(() => {
  'use strict';

  const doc = document;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- 1. mobile menu ---------- */
  const menuBtn = doc.querySelector('.menu-btn');
  const mobileNav = doc.getElementById('mobile-nav');

  const closeMenu = () => {
    if (!mobileNav) return;
    mobileNav.hidden = true;
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  };
  const openMenu = () => {
    if (!mobileNav) return;
    mobileNav.hidden = false;
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
  };

  menuBtn?.addEventListener('click', () => {
    if (mobileNav && mobileNav.hidden) openMenu();
    else closeMenu();
  });
  mobileNav?.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu();
  });
  doc.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && !mobileNav.hidden) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 920) closeMenu();
  });

  /* ---------- 2. smooth scrolling for in-page links ---------- */
  doc.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      let target;
      try { target = doc.querySelector(href); } catch { return; }
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReduced.matches ? 'auto' : 'smooth',
        block: 'start',
      });
      try { history.pushState(null, '', href); } catch { /* file:// fallback */ }
    });
  });

  /* ---------- 3. scroll-spy for nav highlight ---------- */
  const navLinks = [...doc.querySelectorAll('.site-nav a[href^="#"]')];
  const spyTargets = [...doc.querySelectorAll('main section[id]')];
  if (navLinks.length && spyTargets.length) {
    const spy = () => {
      const threshold = 110;
      let current = spyTargets[0];
      for (const s of spyTargets) {
        if (s.getBoundingClientRect().top <= threshold) current = s;
      }
      navLinks.forEach((a) => {
        const active = a.getAttribute('href') === '#' + current.id;
        a.classList.toggle('is-active', active);
        if (active) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    };
    let tick = false;
    window.addEventListener('scroll', () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(() => { spy(); tick = false; });
      }
    }, { passive: true });
    spy();
  }

  /* ---------- 4. reveal on scroll ---------- */
  const revealEls = doc.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    if ('IntersectionObserver' in window && !prefersReduced.matches) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-in'));
    }
  }

  /* ---------- 5. project filtering ---------- */
  const chips = [...doc.querySelectorAll('.filter-bar .chip')];
  const cards = [...doc.querySelectorAll('#project-grid .project-card')];
  const applyFilter = (filter) => {
    chips.forEach((c) => {
      const on = c.dataset.filter === filter;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-pressed', String(on));
    });
    cards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !show);
    });
  };
  chips.forEach((c) => c.addEventListener('click', () => applyFilter(c.dataset.filter)));

  /* ---------- 6. copy email ---------- */
  const copyBtn = doc.getElementById('copy-email');
  copyBtn?.addEventListener('click', async () => {
    const email = copyBtn.dataset.email || '';
    const original = copyBtn.textContent;
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = 'Copied ✓';
    } catch {
      copyBtn.textContent = 'Select the email above';
    }
    setTimeout(() => { copyBtn.textContent = original; }, 1800);
  });

  /* ---------- 7. footer year ---------- */
  const yearEl = doc.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
