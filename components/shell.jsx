/* Evara Advisory — shared React components (global scope via window) */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ---------- Hooks ----------
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, as = 'div', className = '', style = {} }) {
  const ref = useReveal();
  const El = as;
  return React.createElement(El, {
    ref,
    className: `reveal ${className}`,
    style: { ...style, transitionDelay: `${delay}ms` },
  }, children);
}

function useTick(ms = 1000) {
  const [, set] = useState(0);
  useEffect(() => {
    const id = setInterval(() => set(x => x + 1), ms);
    return () => clearInterval(id);
  }, [ms]);
}

// ---------- Logo ----------
function Logo({ size = 28 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'block' }}>
        <rect x="0.5" y="0.5" width="31" height="31" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="8" y1="10" x2="24" y2="10" stroke="currentColor" strokeWidth="1.2" />
        <line x1="8" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1.2" />
        <line x1="8" y1="22" x2="22" y2="22" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span style={{ fontFamily: 'var(--ff-display)', fontSize: size > 28 ? 17 : 16, letterSpacing: -0.005, lineHeight: 1 }}>
        Evara<span style={{ color: 'var(--cream)', marginLeft: 4, fontStyle: 'italic', opacity: 0.85 }}>Advisory</span>
      </span>
    </div>
  );
}

// ---------- Clock (Sydney local) ----------
function Clock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  // Format Sydney time via toLocaleString
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).formatToParts(t);
  const hms = parts.filter(p => p.type !== 'literal').map(p => p.value).join(':');
  return (
    <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.06em' }}>
      SYD · {hms}
    </span>
  );
}

// ---------- Sidebar ----------
function Sidebar({ page, setPage, pages }) {
  return (
    <aside className="sidebar">
      <a onClick={() => setPage('Home')} style={{ cursor: 'pointer', color: 'var(--text)', marginBottom: 48, display: 'block' }}>
        <Logo size={30} />
        <div className="t-mono" style={{ marginTop: 10, fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-4)' }}>
          Advisory · Est. 2026
        </div>
      </a>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {pages.map((p, i) => {
          const active = page === p.name;
          return (
            <button key={p.name} onClick={() => setPage(p.name)}
              style={{
                textAlign: 'left',
                padding: '10px 0',
                display: 'grid',
                gridTemplateColumns: '28px 1fr auto',
                alignItems: 'center',
                gap: 8,
                color: active ? 'var(--text)' : 'var(--text-3)',
                borderTop: i === 0 ? '1px solid var(--line)' : 'none',
                borderBottom: '1px solid var(--line)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-2)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-3)'; }}
            >
              <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)' }}>
                0{i + 1}
              </span>
              <span style={{ fontSize: 13.5, letterSpacing: '-0.005em' }}>
                {p.name}
              </span>
              {active && <span className="dot live" style={{ width: 5, height: 5 }} />}
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center' }}>
        <Clock />
      </div>
    </aside>
  );
}

// ---------- Ticker ----------
function Ticker() {
  const items = [
    ['WORKING WITH', 'FOUNDERS · OPERATORS · INVESTORS', '', ''],
    ['RESPONSE', 'WITHIN DAYS · NDA-FIRST', '', ''],
    ['SECTORS', 'FINTECH · PROPTECH · HEALTH · LEGAL', '', ''],
    ['BASED', 'SYDNEY', 'AEST', ''],
    ['NDA', 'FIRST', '', ''],
    ['EST.', '2026', '', ''],
    ['TENURE', `${yearsInMarkets()}+ YRS PRIVATE MKTS`, '', ''],
  ];
  const row = (
    <>
      {items.map((it, i) => (
        <span key={i}>
          <span style={{ color: 'var(--text-4)' }}>{it[0]}</span>
          <span style={{ color: 'var(--text-2)' }}>{it[1]}</span>
          {it[2] && <span className={it[3] || ''}>{it[2]}</span>}
        </span>
      ))}
    </>
  );
  return (
    <div className="ticker">
      <div className="ticker-inner">{row}{row}{row}</div>
    </div>
  );
}

// ---------- Footer ----------
function Footer({ setPage, pages }) {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--ink)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', padding: '48px 72px 32px', gap: 40 }} className="footer-grid">
        <div>
          <Logo size={30} />
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text-3)', lineHeight: 1.7, maxWidth: 280 }}>
            Independent advisory and transaction support. Institutional rigour, boutique delivery. Sydney, Australia.
          </p>
        </div>
        <div>
          <div className="t-micro" style={{ marginBottom: 14 }}>Site</div>
          {pages.map(p => (
            <div key={p.name} onClick={() => setPage(p.name)} style={{ cursor: 'pointer', fontSize: 13, color: 'var(--text-2)', padding: '4px 0' }}>
              {p.name}
            </div>
          ))}
        </div>
        <div>
          <div className="t-micro" style={{ marginBottom: 14 }}>Reach</div>
          <a href="https://www.linkedin.com/in/amar-kashyap" target="_blank" rel="noreferrer" style={{ display: 'block', fontSize: 13, color: 'var(--text-2)', padding: '4px 0' }}>
            LinkedIn ↗
          </a>
          <div style={{ fontSize: 13, color: 'var(--text-2)', padding: '4px 0' }}>Sydney, AU</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', padding: '4px 0' }}>AEST · UTC+11</div>
        </div>
        <div>
          <div className="t-micro" style={{ marginBottom: 14 }}>Engagement</div>
          <button className="btn primary" onClick={() => setPage('Contact')}>
            Request call <span className="arrow" />
          </button>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--line)', padding: '20px 72px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: 'var(--ff-mono)', fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.06em' }}>
        <span>© 2026 EVARA ADVISORY PTY LTD</span>
        <span>COMMERCIAL & STRATEGIC ADVISORY ONLY · NOT FINANCIAL PRODUCT ADVICE · NO AFSL HELD OR REPRESENTED</span>
      </div>
    </footer>
  );
}

// ---------- Back to top ----------
function BackToTop() {
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ink)',
        border: '1px solid var(--line)',
        borderColor: hover ? 'var(--text-3)' : 'var(--line)',
        borderRadius: 'var(--radius)',
        color: hover ? 'var(--text)' : 'var(--text-3)',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        transition: 'opacity 0.25s ease, color 0.2s ease, border-color 0.2s ease',
        zIndex: 40,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <polyline points="3,6 6,3 9,6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
        <line x1="6" y1="3" x2="6" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      </svg>
    </button>
  );
}

// ---------- Section heading (numbered IC-memo style) ----------
function SectionHead({ num, eyebrow, title, kicker, align = 'left' }) {
  return (
    <div style={{ textAlign: align, marginBottom: 40 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.14em' }}>§{num}</span>
        <span className="t-micro" style={{ color: 'var(--text-2)' }}>{eyebrow}</span>
      </div>
      <h2 className="t-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginTop: 14, color: 'var(--text)', maxWidth: align === 'center' ? 760 : 720, marginInline: align === 'center' ? 'auto' : 0 }}>
        {title}
      </h2>
      {kicker && (
        <p className="t-serif" style={{ fontSize: 16, color: 'var(--text-3)', marginTop: 12, maxWidth: 600, fontStyle: 'italic', marginInline: align === 'center' ? 'auto' : 0 }}>
          {kicker}
        </p>
      )}
    </div>
  );
}

// ---------- Export to window so other modules can see them ----------
Object.assign(window, {
  useReveal, Reveal, Logo, Clock, Sidebar, Ticker, Footer, SectionHead, useTick, BackToTop,
});
