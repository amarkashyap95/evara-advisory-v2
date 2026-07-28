/* Shell: masthead, colophon, motion primitives */

const { useEffect: sUseEffect, useState: sUseState, useRef: sUseRef, useLayoutEffect: sUseLayout } = React;

const REDUCED = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Line-masked headline. Pass an array of lines; each rises from its own mask. */
function SplitLines({ lines, className = '', tag: Tag = 'h1', base = 240, step = 95, ...rest }) {
  return (
    <Tag className={`lines ${className}`} {...rest}>
      {lines.map((l, i) => (
        <span className="line" key={i}>
          <span style={{ '--d': `${base + i * step}ms` }}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/* Scroll-linked parallax, rAF-throttled, transform-only. */
function useParallax(strength = 16) {
  const ref = sUseRef(null);
  sUseEffect(() => {
    const el = ref.current;
    if (!el || REDUCED()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (r.bottom < -200 || r.top > vh + 200) return;
      const p = (r.top + r.height / 2 - vh / 2) / vh; // -1 .. 1
      el.style.setProperty('--py', `${(-p * strength).toFixed(2)}px`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}

function Masthead({ page, setPage, pages }) {
  const [scrolled, setScrolled] = sUseState(false);
  const navRef = sUseRef(null);
  const indRef = sUseRef(null);
  const barRef = sUseRef(null);

  sUseEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* Slide the indicator to the active item. A shared element, not a cut. */
  sUseLayout(() => {
    const nav = navRef.current, ind = indRef.current;
    if (!nav || !ind) return;
    const move = () => {
      const active = nav.querySelector('button.on');
      if (!active) { ind.style.opacity = '0'; return; }
      ind.style.opacity = '1';
      ind.style.transform = `translateX(${active.offsetLeft}px) scaleX(${active.offsetWidth})`;
    };
    move();
    const ro = new ResizeObserver(move);
    ro.observe(nav);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(move).catch(() => {});
    return () => ro.disconnect();
  }, [page, pages]);

  return (
    <header className={`masthead ${scrolled ? 'scrolled' : ''}`}>
      <div className="masthead-in">
        <button className="wordmark" onClick={() => setPage('Home')} aria-label="Evara Advisory, home">
          Evara<i>Advisory</i>
        </button>
        <nav className="nav" ref={navRef}>
          {pages.filter(p => p.name !== 'Home').map(p => (
            <button key={p.name} className={page === p.name ? 'on' : ''} onClick={() => setPage(p.name)}>
              {p.name}
            </button>
          ))}
          <span className="nav-ind" ref={indRef} aria-hidden="true"></span>
        </nav>
      </div>
      <span className="progress" ref={barRef} aria-hidden="true"></span>
    </header>
  );
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

/* ScrollRows — rules each child row in as it enters, 70ms apart down the list.
   Children keep their own classes; this only adds .scroll-row and .is-in. */
function ScrollRows({ children, sel = ':scope > *', stagger = 70, className, style }) {
  const box = sUseRef(null);
  sUseEffect(() => {
    const el = box.current;
    if (!el) return;
    const rows = [...el.querySelectorAll(sel)];
    rows.forEach(r => r.classList.add('scroll-row'));
    if (REDUCED()) { rows.forEach(r => r.classList.add('is-in')); return; }
    let batch = [], flush = null;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        batch.push(e.target);
        clearTimeout(flush);
        /* Group entries that land in the same frame so the stagger reads as one
           sweep rather than each row timing from its own crossing. */
        flush = setTimeout(() => {
          batch.forEach((r, i) => setTimeout(() => r.classList.add('is-in'), i * stagger));
          batch = [];
        }, 40);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.01 });
    rows.forEach(r => io.observe(r));
    return () => { io.disconnect(); clearTimeout(flush); };
  }, [sel, stagger]);
  return <div ref={box} className={className} style={style}>{children}</div>;
}

/* RunningHead — pins the current section label under the masthead.
   Reads the labels already present on the strip heads, so nothing is duplicated. */
function RunningHead({ page }) {
  const box = sUseRef(null);
  const lab = sUseRef(null);
  sUseEffect(() => {
    const wrap = box.current, out = lab.current;
    if (!wrap || !out) return;
    const heads = [...document.querySelectorAll('.strip-dark, .band-slate, .sec-reverse')]
      .map(el => ({ el, text: (el.querySelector('.label')?.textContent || '').trim() }))
      .filter(h => h.text);
    if (!heads.length) return;
    let cur = '';
    const onScroll = () => {
      const y = wrap.getBoundingClientRect().bottom;
      let found = '';
      for (const h of heads) {
        const r = h.el.getBoundingClientRect();
        /* Show a label once its own strip has passed above the line, and drop it
           when the following strip arrives. */
        if (r.bottom <= y) found = h.text;
        if (r.top <= y && r.bottom > y) found = '';
      }
      const last = heads[heads.length - 1].el.getBoundingClientRect();
      if (last.bottom < -240) found = '';
      if (found !== cur) {
        cur = found;
        out.textContent = found;
        wrap.classList.toggle('show', !!found);
      }
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); };
  }, [page]);
  return (
    <div className="runhead" ref={box} aria-hidden="true">
      <div className="runhead-in"><span className="runhead-label" ref={lab}></span></div>
    </div>
  );
}

/* Section opener. The label behaves like a running head, holding while you read. */
function Opener({ label, children, className = '' }) {
  return (
    <div className={`g12 ${className}`}>
      <div className="c1-3">
        <div className="sticky-label">
          <hr className="rule" />
          <p className="label" style={{ marginTop: 12 }}>{label}</p>
        </div>
      </div>
      <div className="c4-12">{children}</div>
    </div>
  );
}

/* Dark heading strip. Breaks the paper run without competing with the spread. */
function StripHead({ label, children }) {
  return (
    <div className="strip-dark">
      <div className="wrap">
        <div className="g12" style={{ alignItems: 'baseline', rowGap: 8 }}>
          <div className="c1-3">
            <p className="label rise" style={{ '--d': '40ms' }}>{label}</p>
          </div>
          <div className="c4-12 rise" style={{ '--d': '150ms' }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

function Colophon({ setPage }) {
  return (
    <footer className="colophon">
      <div className="wrap">
        <div className="g12" style={{ rowGap: 40 }}>
          <div className="c1-5">
            <div className="wordmark" style={{ fontSize: 27 }}>Evara<i>Advisory</i></div>
            <p className="note" style={{ marginTop: 16, maxWidth: 300, color: 'var(--ink-3)' }}>
              Independent commercial advisory.<br />Sydney, Australia.
            </p>
          </div>
          <div className="c6-12">
            <div className="cols-3">
              <div>
                <h4>Sections</h4>
                <ul>
                  {['Home', 'About', 'Services', 'Track Record', 'Contact'].map(n => (
                    <li key={n}><button className="wipe" onClick={() => setPage(n)}>{n}</button></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Direct</h4>
                <ul>
                  <li><button className="wipe" onClick={() => setPage('Contact')}>Send a brief</button></li>
                  <li><a className="wipe" href="https://www.linkedin.com/in/amar-kashyap" target="_blank" rel="noreferrer">LinkedIn</a></li>
                </ul>
              </div>
              <div>
                <h4>Practice</h4>
                <ul>
                  <li>Sydney · AEST</li>
                  <li>By referral and introduction</li>
                  <li>Confidential by default</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <p className="colophon-note">
          Evara Advisory does not hold an Australian Financial Services Licence. All work is
          commercial in nature and is not financial product advice, investment advice, or a
          recommendation to deal in any financial product.
        </p>
        <div className="colophon-foot">
          <span>© {new Date().getFullYear()} Evara Advisory Pty Ltd</span>
          <span>Sydney, Australia</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { StripHead, Masthead, Colophon, Opener, ROMAN, SplitLines, useParallax, REDUCED, ScrollRows, RunningHead });
