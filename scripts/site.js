(function(){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = matchMedia('(max-width: 860px)').matches;
  const hasG = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  if (hasG) gsap.registerPlugin(ScrollTrigger);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* Sydney clock: the browser handles AEST/AEDT */
  const clockFmt = new Intl.DateTimeFormat('en-AU', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Australia/Sydney', timeZoneName: 'short' });
  const tick = () => { const s = clockFmt.format(new Date()).replace('GMT+11', 'AEDT').replace('GMT+10', 'AEST'); $$('[data-clock]').forEach(e => e.textContent = s); };
  tick(); setInterval(tick, 15000);

  /* videos: right cut for the screen, play only while visible */
  function wireVideo(v) {
    if (!v) return;
    v.muted = true;
    if (reduce) { v.removeAttribute('autoplay'); return; }
    const src = small ? v.dataset.m : v.dataset.d;
    const ensure = () => { if (!v.getAttribute('src')) { v.preload = 'auto'; v.src = src; } };
    new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { ensure(); v.play().catch(() => {}); } else v.pause();
    }), { rootMargin: '400px' }).observe(v);
    v.addEventListener('playing', () => { const p = v.parentElement.querySelector('.poster'); if (p) p.style.opacity = 0; }, { once: true });
  }
  wireVideo($('#film-video')); wireVideo($('#close-video'));
  /* iPhone Low Power Mode blocks autoplay: start any visible loop on the first tap */
  const kick = () => $$('video').forEach(v => {
    if (!v.paused || !v.getAttribute('src')) return;
    const r = v.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) v.play().catch(() => {});
  });
  ['touchend', 'click'].forEach(t => addEventListener(t, kick, { passive: true }));

  /* track record: index jumps to each case */
  $$('.case-index .ix').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.getElementById(a.dataset.case);
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 70, behavior: reduce ? 'auto' : 'smooth' });
  }));

  /* services: sticky list follows your reading position */
  const svcLinks = $$('#svc-nav a');
  svcLinks.forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.getElementById(a.dataset.target);
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 96, behavior: reduce ? 'auto' : 'smooth' });
  }));
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) svcLinks.forEach(a => a.classList.toggle('on', a.dataset.target === e.target.id));
  }), { rootMargin: '-40% 0px -55% 0px' });
  $$('.svc').forEach(s => spy.observe(s));

  function splitWords(el) {
    if (el.dataset.split) return $$('.w', el);
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
    el.dataset.split = '1';
    return $$('.w', el);
  }

  /* per-page motion, started only once frames are flowing so nothing is left hidden */
  let ctx = null;
  function buildMotion(page) {
    if (!hasG || reduce) return;
    if (ctx) ctx.revert();
    ctx = gsap.context(() => {
      $$('.js-lines', page).forEach(h => gsap.from($$('.ln > span', h), { yPercent: 112, duration: 1.25, ease: 'expo.out', stagger: .1, delay: .15 }));
      const film = $('.film', page);
      if (film) {
        gsap.from($('video', film), { scale: 1.1, duration: 2.6, ease: 'expo.out' });
        gsap.from($('.kick', film), { opacity: 0, y: 12, duration: 1, ease: 'power3.out', delay: .05 });
        gsap.from($('.js-film-foot', film).children, { opacity: 0, y: 24, duration: 1.1, ease: 'power3.out', stagger: .08, delay: .55 });
        gsap.to($('.film-in', film), { yPercent: -16, opacity: .3, ease: 'none', scrollTrigger: { trigger: film, start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to([$('video', film), $('.poster', film)], { yPercent: 12, ease: 'none', scrollTrigger: { trigger: film, start: 'top top', end: 'bottom top', scrub: true } });
      }
      $$('.js-rule', page).forEach(r => gsap.from(r, { scaleX: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: r, start: 'top 92%' } }));
      $$('.js-rise', page).forEach(el => gsap.from(el, { y: 26, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));
      $$('.js-rows', page).forEach(list => gsap.from(list.children, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', stagger: .08, scrollTrigger: { trigger: list, start: 'top 85%' } }));
      $$('.js-scrub', page).forEach(p => gsap.fromTo(splitWords(p), { opacity: .16 }, { opacity: 1, ease: 'none', stagger: .05, scrollTrigger: { trigger: p, start: 'top 82%', end: 'bottom 45%', scrub: .6 } }));
      $$('.js-words', page).forEach(p => gsap.from(splitWords(p), { yPercent: 40, opacity: 0, duration: .9, ease: 'power3.out', stagger: .025, scrollTrigger: { trigger: p, start: 'top 80%' } }));
      $$('.js-panel', page).forEach((p, i) => gsap.from(p.children, { y: 34, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: .07, delay: i * .12, scrollTrigger: { trigger: p, start: 'top 75%' } }));
      $$('.js-process', page).forEach(pr => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: pr, start: 'top 78%' } });
        tl.from($('.track', pr), { [small ? 'scaleY' : 'scaleX']: 0, duration: 1.6, ease: 'expo.inOut' });
        tl.from($$('.step', pr), { y: 24, opacity: 0, duration: .9, ease: 'power3.out', stagger: .14 }, .3);
      });
      $$('.js-clip', page).forEach(fr => {
        const img = $('img', fr);
        gsap.from(fr, { clipPath: 'inset(100% 0 0 0)', duration: 1.5, ease: 'expo.inOut', delay: .3 });
        gsap.from(img, { scale: 1.2, duration: 2, ease: 'expo.out', delay: .3 });
        gsap.fromTo(img, { yPercent: -4 }, { yPercent: -12, ease: 'none', scrollTrigger: { trigger: fr, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      $$('.js-spine', page).forEach(s => gsap.from(s, { scaleY: 0, ease: 'none', scrollTrigger: { trigger: s.parentElement, start: 'top 70%', end: 'bottom 70%', scrub: .5 } }));
    }, page);
    ScrollTrigger.refresh();
  }

  if (hasG && !reduce) {
    const close = $('#close');
    if (close) {
    gsap.fromTo(close, { clipPath: 'inset(9% 5% 9% 5% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: close, start: 'top bottom', end: 'top 30%', scrub: true } });
    gsap.from($$('.ln > span', close), { yPercent: 112, duration: 1.2, ease: 'expo.out', stagger: .1, scrollTrigger: { trigger: close, start: 'top 55%' } });
    gsap.fromTo($('#close-video'), { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: close, start: 'top bottom', end: 'bottom top', scrub: true } });
    }
  }

  /* nav: clear over the film, solid elsewhere */
  const nav = $('#nav');
  function navState() {
    const film = $('.page:not([hidden]) .film');
    nav.classList.toggle('solid', scrollY > (film ? film.offsetHeight - 80 : -1));
  }
  addEventListener('scroll', navState, { passive: true });

  /* page transitions: cover, then load the next page; it lifts the cover on arrival */
  const curtain = $('.curtain');
  const page = $('.page');
  const root = document.documentElement;
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]'); if (!a) return;
    const url = new URL(a.getAttribute('href'), location.href);
    if (a.target === '_blank' || url.origin !== location.origin || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
    if (url.pathname === location.pathname) {
      if (!url.hash) { e.preventDefault(); closeSheet(); window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); }
      return;
    }
    if (!hasG || reduce) return;
    e.preventDefault(); closeSheet();
    try { sessionStorage.setItem('evara-nav', '1'); } catch (err) {}
    gsap.timeline().set(curtain, { transformOrigin: 'bottom' })
      .to(curtain, { scaleY: 1, duration: .5, ease: 'expo.inOut', onComplete: () => { location.href = url.href; } });
    setTimeout(() => { location.href = url.href; }, 900); // never strand a click if frames stall
  });
  addEventListener('pageshow', e => { if (e.persisted && hasG) gsap.set(curtain, { scaleY: 0 }); });

  /* mobile sheet */
  const sheet = $('#sheet'), openBtn = $('#menu-open');
  function closeSheet() { if (!sheet.hidden) { sheet.hidden = true; openBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; } }
  openBtn.addEventListener('click', () => {
    sheet.hidden = false; openBtn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden';
    if (hasG && !reduce) gsap.from($$('nav a', sheet), { yPercent: 60, opacity: 0, duration: .7, ease: 'expo.out', stagger: .05 });
  });
  $('#menu-close').addEventListener('click', closeSheet);

  /* contact */
  if ($('#brief')) {
  $('#copy-email').addEventListener('click', async e => {
    const b = e.currentTarget, addr = 'amar@evaraadvisory.com.au';
    try { await navigator.clipboard.writeText(addr); b.textContent = 'Copied'; }
    catch { const r = document.createRange(); r.selectNodeContents($('#email')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = 'Selected, press copy'; }
    setTimeout(() => b.textContent = 'Copy address', 2200);
  });
  const form = $('#brief'), send = $('#send'), status = $('#form-status');
  const ready = () => { send.disabled = !($('#f-name').value.trim() && /\S+@\S+\.\S+/.test($('#f-email').value) && $('#f-brief').value.trim()); };
  form.addEventListener('input', ready);
  form.addEventListener('submit', async e => {
    e.preventDefault(); if (send.disabled) return;
    const data = Object.fromEntries(new FormData(form));
    send.disabled = true; status.textContent = 'Sending…';
    try {
      const res = await fetch('https://formspree.io/f/xbdpvgwj', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: `Evara enquiry: ${data.name}${data.company ? ' · ' + data.company : ''}`, _replyto: data.email }) });
      if (!res.ok) throw 0;
      form.reset(); status.textContent = 'Brief received. Expect a reply within two business days.';
    } catch {
      status.textContent = 'This did not send. Email amar@evaraadvisory.com.au directly, or reach out on LinkedIn.';
      ready();
    }
  });

  }

  const boot = () => {
    navState(); setTimeout(navState, 400); addEventListener('load', navState);
    requestAnimationFrame(() => requestAnimationFrame(() => buildMotion(page)));
    if (root.classList.contains('arriving') && hasG && !reduce) {
      gsap.fromTo(curtain, { scaleY: 1, transformOrigin: 'top' }, { scaleY: 0, duration: .75, ease: 'expo.inOut', delay: .05, onComplete: () => root.classList.remove('arriving') });
      setTimeout(() => { gsap.set(curtain, { scaleY: 0 }); root.classList.remove('arriving'); }, 1600); // cover always lifts
    } else root.classList.remove('arriving');
  };
  if (document.fonts && document.fonts.ready) Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1200))]).then(boot); else boot();
})();
