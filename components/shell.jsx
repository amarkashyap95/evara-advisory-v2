/* Shell: logo, masthead, footer, motion primitives */

const { useEffect: sUseEffect, useState: sUseState, useRef: sUseRef, useLayoutEffect: sUseLayout } = React;

const REDUCED = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Line-drawn mark placeholder removed; the framed Mark below is the one in use. */

/* Evara mark — framed square with the three-bar E. Inline so it inherits
   currentColor and lands exactly on the hairline grid at any size. */
function Mark({ className, ...rest }) {
  return (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...rest}>
      <rect x="1.65" y="1.65" width="96.7" height="96.7" fill="none" stroke="currentColor" strokeWidth="3.3" opacity=".55"></rect>
      <g fill="currentColor">
        <rect x="25.1" y="29.2" width="50" height="3.65"></rect>
        <rect x="25.1" y="48" width="37.4" height="3.65"></rect>
        <rect x="25.1" y="66.4" width="43.7" height="3.65"></rect>
      </g>
    </svg>
  );
}

/* Evara wordmark, from the supplied logo (solo). Renders at any size via CSS. */
const LOGO_D = [
  'M104.32,43.48c0,2.75-.17,4.98-.52,6.7H25.78c.46,8.02,3.27,14.38,8.42,19.08,5.16,4.7,11.74,7.05,19.76,7.05,6.42,0,12.06-1.52,16.93-4.55,4.87-3.04,7.88-7.02,9.02-11.94l23.03,1.55c-1.26,9.4-6.5,17.16-15.73,23.29-9.22,6.13-20.54,9.19-33.94,9.19-15.58,0-28.36-4.27-38.33-12.8C4.98,72.5,0,61.01,0,46.57S4.95,20.91,14.87,12.55C24.78,4.18,37.41,0,52.76,0s27.35,3.95,37.04,11.86c9.68,7.91,14.52,18.45,14.52,31.62ZM26.12,35.92h52.76c0-5.73-2.44-10.6-7.3-14.61-4.87-4.01-11.08-6.02-18.65-6.02s-13.26,1.86-18.13,5.59c-4.87,3.72-7.76,8.74-8.68,15.04Z',
  'M138.81,90.4L97.22,3.44h27.67l28.53,63.25L182.13,3.44h24.4l-39.53,86.96h-28.19Z',
  'M232.33,92.46c-10.65,0-19.08-2.18-25.26-6.53-6.19-4.35-9.28-10.37-9.28-18.05s3.35-14.66,10.05-19.94c6.7-5.27,15.9-8.36,27.58-9.28l20.45-2.23c8.36-.69,12.55-3.55,12.55-8.59,0-3.44-1.69-6.33-5.07-8.68-3.38-2.35-7.82-3.52-13.32-3.52-6.42,0-11.72,1.63-15.9,4.9-4.18,3.27-6.45,7.3-6.79,12.12h-25.26c1.14-9.62,6.07-17.41,14.78-23.37C225.57,3.33,236.85.34,250.72.34s23.72,2.87,31.62,8.59c7.91,5.73,11.86,14.26,11.86,25.61v30.08l3.61,25.78h-24.92l-1.55-15.81h-1.2c-2.87,5.39-7.59,9.71-14.18,12.98-6.59,3.27-14.47,4.9-23.63,4.9ZM241.61,76.48c8.25,0,14.84-2,19.76-6.01,4.92-4.01,7.39-9.45,7.39-16.33v-8.08h-1.2c-2.98,1.49-6.87,2.58-11.69,3.26l-15.12,1.89c-11.34,1.49-17.01,5.96-17.01,13.4,0,7.91,5.96,11.86,17.87,11.86Z',
  'M304.88,90.4V3.44h25.44l-.69,16.33h1.38c1.26-5.38,4.24-9.62,8.94-12.72,4.7-3.09,10.48-4.64,17.36-4.64,2.98,0,6.13.29,9.45.86v20.45c-7.11-.23-10.94-.34-11.51-.34-8.02,0-14.18,2.52-18.48,7.56-4.3,5.04-6.44,12.2-6.44,21.48v37.98h-25.44Z',
  'M401.3,92.12c-10.65,0-19.08-2.18-25.26-6.53-6.19-4.35-9.28-10.37-9.28-18.05s3.35-14.66,10.05-19.94c6.7-5.27,15.9-8.36,27.58-9.28l20.45-2.23c8.36-.69,12.55-3.55,12.55-8.59,0-3.44-1.69-6.33-5.07-8.68-3.38-2.35-7.82-3.52-13.32-3.52-6.42,0-11.72,1.63-15.9,4.9-4.18,3.27-6.45,7.3-6.79,12.12h-25.26c1.14-9.62,6.07-17.41,14.78-23.37C394.54,2.98,405.82,0,419.69,0s23.72,2.87,31.62,8.59c7.91,5.73,11.86,14.26,11.86,25.61v30.08l3.61,25.78h-24.92l-1.55-15.81h-1.2c-2.87,5.39-7.59,9.71-14.18,12.98-6.59,3.27-14.47,4.9-23.63,4.9ZM410.58,76.14c8.25,0,14.84-2,19.76-6.01,4.92-4.01,7.39-9.45,7.39-16.33v-8.08h-1.2c-2.98,1.49-6.87,2.58-11.69,3.26l-15.12,1.89c-11.34,1.49-17.01,5.96-17.01,13.4,0,7.91,5.96,11.86,17.87,11.86Z',
];

function Logo({ className, ...rest }) {
  return (
    <svg className={className} viewBox="0 0 466.78 93.84" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...rest}>
      {LOGO_D.map((d, i) => <path d={d} key={i}></path>)}
    </svg>
  );
}

/* Field — one fixed, page-wide colour field. Scroll drives --sp, so the
   composition evolves continuously instead of cutting off at section edges. */
function Field() {
  sUseEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      document.documentElement.style.setProperty('--sp', p.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    const iv = setInterval(update, 900);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearInterval(iv);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="bg" aria-hidden="true">
      <span className="bg-base"></span>
      <b className="b1"></b><b className="b2"></b><b className="b3"></b><b className="b4"></b><b className="b5"></b>
      <span className="bg-veil"></span>
      <span className="bg-grain"></span>
    </div>
  );
}

/* Label that swaps upward on hover. */
function Swap({ children }) {
  return <span className="swap"><i>{children}</i><i aria-hidden="true">{children}</i></span>;
}

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
      const p = (r.top + r.height / 2 - vh / 2) / vh;
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
  sUseEffect(() => {
    let raf = 0;
    const update = () => { raf = 0; setScrolled(window.scrollY > 8); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <header className={`masthead ${scrolled ? 'scrolled' : ''}`}>
      <div className="masthead-in">
        <button className="brand" onClick={() => setPage('Home')} aria-label="Evara Advisory, home">
          <Mark className="brand-glyph" />
          <Logo className="brand-mark" />
          <span className="brand-sub">Advisory</span>
        </button>
        <nav className="nav">
          {pages.filter(p => p.name !== 'Home' && p.name !== 'Contact').map(p => (
            <button key={p.name} className={page === p.name ? 'on' : ''} onClick={() => setPage(p.name)}>
              {p.name}
            </button>
          ))}
          <button className={`nav-cta ${page === 'Contact' ? 'on' : ''}`} onClick={() => setPage('Contact')}>Contact</button>
        </nav>
      </div>
      <span className="mast-bar" aria-hidden="true"></span>
    </header>
  );
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

/* ScrollRows — rows enter as they scroll in, 70ms apart down the list. */
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
        flush = setTimeout(() => {
          batch.forEach((r, i) => setTimeout(() => r.classList.add('is-in'), i * stagger));
          batch = [];
        }, 40);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.01 });
    rows.forEach(r => io.observe(r));
    /* Fallback: fast or restored scrolls can skip intersections entirely.
       Anything already at or above the fold gets revealed outright. */
    let raf = 0;
    const sweep = () => {
      raf = 0;
      rows.forEach(r => {
        if (r.classList.contains('is-in')) return;
        if (r.getBoundingClientRect().top < window.innerHeight * .92) { io.unobserve(r); r.classList.add('is-in'); }
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(sweep); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    const iv = setInterval(sweep, 600);
    return () => { io.disconnect(); clearTimeout(flush); clearInterval(iv); if (raf) cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [sel, stagger]);
  return <div ref={box} className={className} style={style}>{children}</div>;
}

/* Retained for compatibility with older markup. */
function RunningHead() { return null; }

/* AutoReveal — everything below the fold loads in as you scroll, sitewide.
   Tags section-level blocks with .rv and reveals them via one observer. */
function AutoReveal({ page }) {
  sUseLayout(() => {
    if (REDUCED()) return;
    const main = document.querySelector('main');
    if (!main) return;
    const els = [...main.querySelectorAll('.wrap > *, .wrap > .g12 > *')].filter(el =>
      !el.classList.contains('g12') &&
      !el.classList.contains('aurora') &&
      !el.matches('.rise,.lines,.rule-draw') &&
      !el.querySelector('.scroll-row,.rise,.lines'));
    els.forEach(el => el.classList.add('rv'));
    let batch = [], flush = null;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        batch.push(e.target);
        clearTimeout(flush);
        flush = setTimeout(() => {
          batch.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
          batch.forEach((el, i) => setTimeout(() => el.classList.add('is-in'), i * 80));
          batch = [];
        }, 40);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });
    els.forEach(el => io.observe(el));
    /* Same fallback as ScrollRows: never leave a skipped block hidden. */
    let raf = 0;
    const sweep = () => {
      raf = 0;
      els.forEach(el => {
        if (el.classList.contains('is-in')) return;
        if (el.getBoundingClientRect().top < window.innerHeight * .92) { io.unobserve(el); el.classList.add('is-in'); }
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(sweep); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    const iv = setInterval(sweep, 600);
    return () => {
      io.disconnect(); clearTimeout(flush); clearInterval(iv);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      els.forEach(el => el.classList.remove('rv', 'is-in'));
    };
  }, [page]);
  return null;
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

/* Sentence-style section head over a heavy hairline. */
function StripHead({ label, children, more, onMore }) {
  return (
    <div className="strip-dark">
      <div className="wrap">
        <div className="g12" style={{ rowGap: 14 }}>
          <div className="c1-3" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'stretch', gap: 14 }}>
            <p className="label">{label}</p>
            {more ? <span><button className="more-link" onClick={onMore}>{more}</button></span> : null}
          </div>
          <div className="c4-12">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* Live Sydney time, in the colophon. */
function Clock() {
  const [t, setT] = sUseState('');
  sUseEffect(() => {
    const tick = () => {
      try {
        setT(new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Sydney', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()));
      } catch { setT(''); }
    };
    tick();
    const iv = setInterval(tick, 20000);
    return () => clearInterval(iv);
  }, []);
  return <span className="clock">{t ? `${t} AEST` : 'AEST'}</span>;
}

function Colophon({ setPage }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-statement">
          <Mark className="foot-glyph" />
          <p className="label">Evara Advisory · Sydney, Australia</p>
          <p className="foot-big">Commercial clarity, custom-built.</p>
          <div style={{ marginTop: 'clamp(24px,3vw,44px)', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button className="cta" onClick={() => setPage('Contact')}><Swap>Start a conversation</Swap></button>
          </div>
        </div>
        <div className="foot-grid g12" style={{ rowGap: 36 }}>
          <div className="c1-5" style={{ gridColumn: '1/6' }}>
            <p className="note" style={{ maxWidth: 300, color: 'var(--ink-3)' }}>
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
                  <li>Sydney · <Clock /></li>
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

Object.assign(window, { Logo, Mark, Field, Swap, Clock, StripHead, Masthead, Colophon, Opener, ROMAN, SplitLines, useParallax, REDUCED, ScrollRows, RunningHead, AutoReveal });
