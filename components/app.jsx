/* App entry */

const { useState: aUseState, useEffect: aUseEffect } = React;

const PAGES = [
  { name: 'Home' },
  { name: 'About' },
  { name: 'Services' },
  { name: 'Track Record' },
  { name: 'Contact' },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "ink",
  "density": "standard",
  "showTicker": true
}/*EDITMODE-END*/;

function TweaksPanel({ open, setOpen, tweaks, setTweaks }) {
  const set = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*'); } catch {}
  };
  return (
    <div className={`tweaks-panel ${open ? 'open' : ''}`}>
      <div className="tweaks-head">
        <span>Tweaks · v1.4</span>
        <button onClick={() => setOpen(false)} style={{ color: 'var(--text-3)' }}>×</button>
      </div>
      <div className="tweaks-body">
        <div className="tweak-row">
          <label>Palette</label>
          <div className="opts">
            {['ink', 'deep', 'paper'].map(v => (
              <button key={v} className={tweaks.palette === v ? 'on' : ''} onClick={() => set('palette', v)}>{v}</button>
            ))}
          </div>
        </div>
        <div className="tweak-row">
          <label>Density</label>
          <div className="opts">
            {['compact', 'standard', 'airy'].map(v => (
              <button key={v} className={tweaks.density === v ? 'on' : ''} onClick={() => set('density', v)}>{v}</button>
            ))}
          </div>
        </div>
        <div className="tweak-row">
          <label>Ticker</label>
          <div className="opts">
            <button className={tweaks.showTicker ? 'on' : ''} onClick={() => set('showTicker', true)}>on</button>
            <button className={!tweaks.showTicker ? 'on' : ''} onClick={() => set('showTicker', false)}>off</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function applyTweaks(tw) {
  const root = document.documentElement;
  if (tw.palette === 'deep') {
    root.style.setProperty('--ink', '#06090F');
    root.style.setProperty('--ink-2', '#0B101A');
    root.style.setProperty('--ink-3', '#111826');
  } else if (tw.palette === 'paper') {
    root.style.setProperty('--ink', '#F2EFE8');
    root.style.setProperty('--ink-2', '#E8E4D9');
    root.style.setProperty('--ink-3', '#DDD7C8');
    root.style.setProperty('--text', '#11161F');
    root.style.setProperty('--text-2', '#3A414D');
    root.style.setProperty('--text-3', '#5A5F68');
    root.style.setProperty('--text-4', '#8C909A');
    root.style.setProperty('--line', '#D3CDBE');
    root.style.setProperty('--line-2', '#BFB8A6');
    root.style.setProperty('--paper', '#11161F');
    root.style.setProperty('--paper-ink', '#F2EFE8');
    root.style.setProperty('--paper-muted', '#8C909A');
  } else {
    root.style.setProperty('--ink', '#0A0E14');
    root.style.setProperty('--ink-2', '#0F1520');
    root.style.setProperty('--ink-3', '#161D2B');
    root.style.setProperty('--text', '#E8EAED');
    root.style.setProperty('--text-2', '#B3BAC6');
    root.style.setProperty('--text-3', '#7B8594');
    root.style.setProperty('--text-4', '#4A5466');
    root.style.setProperty('--line', '#1F2939');
    root.style.setProperty('--line-2', '#2B3647');
    root.style.setProperty('--paper', '#C4BBA5');
    root.style.setProperty('--paper-ink', '#11161F');
    root.style.setProperty('--paper-muted', '#4A4636');
  }
  const densityPad = tw.density === 'compact' ? '44px 52px' : tw.density === 'airy' ? '96px 96px' : '64px 72px';
  document.querySelectorAll('.page-pad').forEach(el => { el.style.padding = densityPad; });
}

function NotFoundPage({ setPage, missing }) {
  const [blink, setBlink] = aUseState(true);
  aUseEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 560);
    return () => clearInterval(id);
  }, []);
  const ts = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const trace = [
    `  at Router.resolve (router.js:42:18)`,
    `  at App.render (app.jsx:134:9)`,
    `  at renderPage (app.jsx:128:14)`,
    `  at <anonymous>`,
  ];
  return (
    <section className="page-pad" style={{ minHeight: '78vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 80, paddingBottom: 80, borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 980 }}>
        <div className="t-mono" style={{ fontSize: 11, color: 'var(--warn, #C85A3F)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--warn, #C85A3F)', marginRight: 10, verticalAlign: 'middle' }} />
          ERR · ROUTE_NOT_FOUND · 404
        </div>
        <h1 className="t-display" style={{ fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 0.98, letterSpacing: '-0.035em' }}>
          That page <em className="t-display-it" style={{ color: 'var(--cream, #D9C9A3)' }}>didn't resolve.</em>
        </h1>
        <div style={{ marginTop: 36, border: '1px solid var(--line)', background: 'var(--ink-2)' }}>
          <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--line)', background: 'var(--ink-3)', display: 'flex', justifyContent: 'space-between' }}>
            <span className="t-mono" style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)' }}>evara-repl · stack trace</span>
            <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)' }}>{ts} UTC</span>
          </div>
          <div style={{ padding: '22px 24px', fontFamily: 'var(--ff-mono)', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.8 }}>
            <div><span style={{ color: 'var(--warn, #C85A3F)' }}>Error:</span> route <span style={{ color: 'var(--text)' }}>"{missing || '/unknown'}"</span> is not defined in this application.</div>
            <div style={{ color: 'var(--text-4)', marginTop: 12 }}>{trace.map((t, i) => <div key={i}>{t}</div>)}</div>
            <div style={{ marginTop: 18, color: 'var(--text-3)' }}>
              <span style={{ color: 'var(--live)' }}>›</span> <span style={{ color: 'var(--text-2)' }}>navigator.goto(</span>
              <span style={{ color: 'var(--cream, #D9C9A3)' }}>"Home"</span>
              <span style={{ color: 'var(--text-2)' }}>)</span>
              <span style={{ color: 'var(--live)', opacity: blink ? 1 : 0, marginLeft: 2 }}>▊</span>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--line)', padding: '16px 24px', display: 'flex', gap: 12, flexWrap: 'wrap', background: 'var(--ink)' }}>
            <button className="btn primary" onClick={() => setPage('Home')}>Return home<span className="arrow" /></button>
            <button className="btn" onClick={() => setPage('Contact')}>Or send a brief</button>
          </div>
        </div>
        <p className="t-mono" style={{ marginTop: 22, fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.08em' }}>
          // Every other surface on this site was built by hand — including this one.
        </p>
      </div>
    </section>
  );
}

Object.assign(window, { NotFoundPage });

function App() {
  const [page, setPage] = aUseState(() => {
    try { return localStorage.getItem('evara-page') || 'Home'; } catch { return 'Home'; }
  });
  const [tweaksOpen, setTweaksOpen] = aUseState(false);
  const [tweaks, setTweaks] = aUseState(TWEAK_DEFAULTS);

  aUseEffect(() => {
    try { localStorage.setItem('evara-page', page); } catch {}
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  aUseEffect(() => {
    applyTweaks(tweaks);
  }, [tweaks]);

  // Tweaks protocol
  aUseEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      else if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const nav = (p) => setPage(p);

  // Allow #404 hash to trigger the not-found page (easter egg / real 404)
  aUseEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#404' || window.location.hash === '#/404') {
        setPage('__404');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const validPages = PAGES.map(p => p.name);
  let pageEl;
  if (page === 'Home') pageEl = <HomePage setPage={nav} />;
  else if (page === 'About') pageEl = <AboutPage setPage={nav} />;
  else if (page === 'Services') pageEl = <ServicesPage setPage={nav} />;
  else if (page === 'Track Record') pageEl = <TrackRecordPage setPage={nav} />;
  else if (page === 'Contact') pageEl = <ContactPage setPage={nav} />;
  else pageEl = <NotFoundPage setPage={nav} missing={page === '__404' ? window.location.hash : page} />;

  return (
    <div className="shell" data-screen-label={page}>
      <Sidebar page={page} setPage={nav} pages={PAGES} />
      <main className="main">
        <div key={page} style={{ animation: 'fadeIn 0.4s ease' }}>
          {pageEl}
        </div>
        <Footer setPage={nav} pages={PAGES} />
      </main>
      <TweaksPanel open={tweaksOpen} setOpen={setTweaksOpen} tweaks={tweaks} setTweaks={setTweaks} />
      <BackToTop />
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
