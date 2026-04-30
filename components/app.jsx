/* App entry */

const { useState: aUseState, useEffect: aUseEffect } = React;

const PAGES = [
  { name: 'Home' },
  { name: 'About' },
  { name: 'Services' },
  { name: 'Track Record' },
  { name: 'Workbench' },
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
        <span>Tweaks</span>
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
    root.style.setProperty('--ink', '#0E0E0D');
    root.style.setProperty('--ink-2', '#161614');
    root.style.setProperty('--ink-3', '#1F1F1C');
    root.style.setProperty('--paper', '#252523');
    root.style.setProperty('--paper-top', '#2A2A27');
    root.style.setProperty('--paper-bot', '#1F1F1C');
    root.style.setProperty('--paper-ink', '#F5F4EE');
    root.style.setProperty('--paper-muted', '#847D6E');
  } else if (tw.palette === 'paper') {
    root.style.setProperty('--ink', '#FAF9F5');
    root.style.setProperty('--ink-2', '#F0EEE3');
    root.style.setProperty('--ink-3', '#E5E2D2');
    root.style.setProperty('--text', '#1A1A18');
    root.style.setProperty('--text-2', '#4A463D');
    root.style.setProperty('--text-3', '#6B6759');
    root.style.setProperty('--text-4', '#95907F');
    root.style.setProperty('--line', '#DAD5C4');
    root.style.setProperty('--line-2', '#C5BFA8');
    root.style.setProperty('--paper', '#1A1A18');
    root.style.setProperty('--paper-top', '#1A1A18');
    root.style.setProperty('--paper-bot', '#1A1A18');
    root.style.setProperty('--paper-ink', '#FAF9F5');
    root.style.setProperty('--paper-muted', '#95907F');
  } else {
    root.style.setProperty('--ink', '#141413');
    root.style.setProperty('--ink-2', '#1C1C1A');
    root.style.setProperty('--ink-3', '#252523');
    root.style.setProperty('--text', '#F5F4EE');
    root.style.setProperty('--text-2', '#C5C1B1');
    root.style.setProperty('--text-3', '#847D6E');
    root.style.setProperty('--text-4', '#565148');
    root.style.setProperty('--line', '#2C2C29');
    root.style.setProperty('--line-2', '#3A3A36');
    root.style.setProperty('--paper', '#1F1F1D');
    root.style.setProperty('--paper-top', '#2A2A27');
    root.style.setProperty('--paper-bot', '#1F1F1D');
    root.style.setProperty('--paper-ink', '#F5F4EE');
    root.style.setProperty('--paper-muted', '#847D6E');
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
          That page <em className="t-display-it" style={{ color: 'var(--cream, #EDE5CC)' }}>didn't resolve.</em>
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
              <span style={{ color: 'var(--cream, #EDE5CC)' }}>"Home"</span>
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
  else if (page === 'Workbench') pageEl = <WorkbenchPage setPage={nav} />;
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
