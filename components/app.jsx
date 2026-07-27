/* App entry: routing, the transition between pages, and the tweaks panel */

const { useState: aUseState, useEffect: aUseEffect, useRef: aUseRef } = React;

const PAGES = [
  { name: 'Home' },
  { name: 'About' },
  { name: 'Services' },
  { name: 'Track Record' },
  { name: 'Contact' },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "register": "paper",
  "composure": "considered",
  "atmosphere": "engraved"
}/*EDITMODE-END*/;

const OUT_MS = 260;

function applyTweaks(t) {
  const r = document.documentElement;
  r.setAttribute('data-register', t.register);
  r.setAttribute('data-composure', t.composure);
  r.setAttribute('data-atmosphere', t.atmosphere);
}

const TWEAKS = [
  { k: 'register', label: 'Register', opts: ['paper', 'bone', 'ink'],
    note: 'The surface the whole site is printed on. Ink flips every page dark and turns the quote spread into the light one.' },
  { k: 'composure', label: 'Composure', opts: ['quiet', 'considered', 'assertive'],
    note: 'How loudly the type speaks and how much air it is given. Retunes display scale and section rhythm together.' },
  { k: 'atmosphere', label: 'Atmosphere', opts: ['bare', 'engraved', 'instrument'],
    note: 'How present the constructed geometry is. Bare is typography alone; instrument brings the globe forward and sharpens the grid.' },
];

function TweaksPanel({ open, setOpen, tweaks, set }) {
  return (
    <>
      <button className="tw-toggle" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Tweaks'}</button>
      <aside className={`tw-panel ${open ? 'open' : ''}`}>
        <div className="tw-head">Art direction</div>
        {TWEAKS.map(t => (
          <div className="tw-row" key={t.k}>
            <label>{t.label}</label>
            <div className="tw-ctl">
              {t.opts.map(v => (
                <button key={v} className={tweaks[t.k] === v ? 'on' : ''} onClick={() => set(t.k, v)}>{v}</button>
              ))}
            </div>
            <p className="tw-note">{t.note}</p>
          </div>
        ))}
      </aside>
    </>
  );
}

function NotFoundPage({ setPage }) {
  return (
    <div data-screen-label="Not found">
      <section className="sec" style={{ paddingTop: 'clamp(80px,12vw,160px)', minHeight: '64vh' }}>
        <div className="wrap">
          <p className="label rise" style={{ marginBottom: 14, '--d': '60ms' }}>404</p>
          <hr className="rule-draw" />
          <SplitLines tag="h1" className="display-m" style={{ marginTop: 48, maxWidth: '12ch' }}
            lines={['That page is', 'not here.']} />
          <div className="rise" style={{ marginTop: 36, '--d': '560ms' }}>
            <button className="cta" onClick={() => setPage('Home')}>Back to the front</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [page, setPage] = aUseState(() => {
    try { return localStorage.getItem('evara-page') || 'Home'; } catch { return 'Home'; }
  });
  const [shown, setShown] = aUseState(page);
  const [entered, setEntered] = aUseState(false);
  const [leaving, setLeaving] = aUseState(false);
  const [tweaks, setTweaks] = aUseState(TWEAK_DEFAULTS);
  const [twOpen, setTwOpen] = aUseState(false);
  const first = aUseRef(true);

  const set = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*'); } catch {}
  };

  aUseEffect(() => { applyTweaks(tweaks); }, [tweaks]);

  /* First paint: wait for webfonts so the headline masks reveal real letterforms. */
  aUseEffect(() => {
    let done = false;
    const go = () => { if (!done) { done = true; requestAnimationFrame(() => setEntered(true)); } };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(go).catch(go);
      setTimeout(go, 1200);
    } else go();
  }, []);

  /* Page change: lift the current surface away, swap, then play the new one in. */
  aUseEffect(() => {
    if (first.current) { first.current = false; return; }
    try { localStorage.setItem('evara-page', page); } catch {}
    if (page === shown) return;

    if (REDUCED()) {
      setShown(page);
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    setLeaving(true);
    setEntered(false);
    const t = setTimeout(() => {
      setShown(page);
      window.scrollTo({ top: 0, behavior: 'auto' });
      setLeaving(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    }, OUT_MS);
    return () => clearTimeout(t);
  }, [page, shown]);

  const render = () => {
    switch (shown) {
      case 'Home':         return <HomePage setPage={setPage} tweaks={tweaks} />;
      case 'About':        return <AboutPage setPage={setPage} />;
      case 'Services':     return <ServicesPage setPage={setPage} />;
      case 'Track Record': return <TrackRecordPage setPage={setPage} />;
      case 'Contact':      return <ContactPage setPage={setPage} />;
      default:             return <NotFoundPage setPage={setPage} />;
    }
  };

  return (
    <>
      <Masthead page={page} setPage={setPage} pages={PAGES} />
      <main className={`stage ${entered ? 'is-in' : ''} ${leaving ? 'is-out' : ''}`}>
        {render()}
      </main>
      <Colophon setPage={setPage} />
      <TweaksPanel open={twOpen} setOpen={setTwOpen} tweaks={tweaks} set={set} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
