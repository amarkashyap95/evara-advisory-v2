/* App entry: routing and the transition between pages */

const { useState: aUseState, useEffect: aUseEffect, useRef: aUseRef } = React;

const PAGES = [
  { name: 'Home' },
  { name: 'About' },
  { name: 'Services' },
  { name: 'Track Record' },
  { name: 'Contact' },
];

/* Shipped art direction. Applied once on mount; no runtime switcher. */
const ART = /*EDITMODE-BEGIN*/{
  "register": "paper",
  "composure": "considered",
  "atmosphere": "engraved"
}/*EDITMODE-END*/;

const OUT_MS = 260;

function applyArt(t) {
  const r = document.documentElement;
  r.setAttribute('data-register', t.register);
  r.setAttribute('data-composure', t.composure);
  r.setAttribute('data-atmosphere', t.atmosphere);
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
            <button className="cta" onClick={() => setPage('Home')}><Swap>Back to the front</Swap></button>
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
  const first = aUseRef(true);

  aUseEffect(() => { applyArt(ART); }, []);

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
      case 'Home':         return <HomePage setPage={setPage} art={ART} />;
      case 'About':        return <AboutPage setPage={setPage} />;
      case 'Services':     return <ServicesPage setPage={setPage} />;
      case 'Track Record': return <TrackRecordPage setPage={setPage} />;
      case 'Contact':      return <ContactPage setPage={setPage} />;
      default:             return <NotFoundPage setPage={setPage} />;
    }
  };

  return (
    <>
      <Field />
      <Masthead page={page} setPage={setPage} pages={PAGES} />
      <main className={`stage ${entered ? 'is-in' : ''} ${leaving ? 'is-out' : ''}`}>
        {render()}
        <AutoReveal page={shown} />
      </main>
      <Colophon setPage={setPage} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
