/* Contact: brief form + scope sketch */

const { useState: cUseState } = React;

const SCOPE_EXAMPLES = [
  'Seed-stage AI infrastructure startup. Pre-revenue, $500k pipeline. Raising $4M. Need a first model and deck.',
  'Franchise group, 22 sites, exploring a fund structure to roll up independent operators. Board is ready to engage.',
  'Family office with $40M to deploy into private credit. Need a structuring memo and waterfall model for a first fund.',
  'PE-backed SaaS platform, $12M ARR, considering a $25M bolt-on. Need a diligence model and synergy case.',
];

const SCOPE_PROMPT = (situation) => `You are a senior advisor at Evara Advisory (institutional advisory firm specialising in fund structuring, investor materials, and capital strategy). A prospect described their situation below. Respond with a crisp, one-page engagement scope in plain text only (no markdown).

Use this exact format with these headers on separate lines. Do NOT use markdown symbols like # or *. Use plain text only. Do not use em dashes anywhere in your response.

ENGAGEMENT HYPOTHESIS
[Two sentences: what they're trying to do and the key risk.]

LIKELY SEGMENT
[One of: Building Foundations / Raising Capital / Fund Operations Support / Scaling Operations]

TYPICAL SCOPE
- [4 bullet deliverables]

INDICATIVE TIMELINE
[e.g. 4–6 weeks]

FIRST QUESTION I'D ASK
[One sharp diagnostic question.]

Prospect situation: "${situation}"`;

const EMPTY = { name: '', email: '', company: '', stage: '', service: '', message: '' };

function ContactPage() {
  const [form, setForm] = cUseState(EMPTY);
  const [status, setStatus] = cUseState('idle');
  const [situation, setSituation] = cUseState('');
  const [loading, setLoading] = cUseState(false);
  const [result, setResult] = cUseState('');

  const bind = (k) => ({ value: form[k], onChange: e => setForm({ ...form, [k]: e.target.value }) });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xbdpvgwj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus('sent'); setForm(EMPTY); } else setStatus('error');
    } catch { setStatus('error'); }
  };

  const generateScope = async () => {
    const s = situation.trim();
    if (!s || loading) return;
    setLoading(true); setResult('');
    try {
      // Claude Design preview exposes window.claude.complete; production uses /api/scope.
      const preview = typeof window !== 'undefined' && window.claude && typeof window.claude.complete === 'function';
      if (preview) {
        setResult(await window.claude.complete(SCOPE_PROMPT(s)));
      } else {
        const res = await fetch('/api/scope', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ situation: s }),
        });
        const data = await res.json().catch(() => ({}));
        setResult(res.ok
          ? (data.text || 'Unable to generate right now. Please send the brief instead.')
          : (data?.error || 'Unable to generate right now. Please send the brief instead.'));
      }
    } catch {
      setResult('Unable to generate right now. Please send the brief instead.');
    } finally {
      setLoading(false);
    }
  };

  const useInBrief = () => {
    setForm(f => ({ ...f, message: (f.message ? f.message + '\n\n* * *\n\n' : '') + 'Situation:\n' + situation.trim() + '\n\nScope sketch:\n' + result.trim() }));
    setTimeout(() => {
      const el = document.querySelector('[data-brief]');
      if (el) {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
        el.focus({ preventScroll: true });
      }
    }, 60);
  };

  if (status === 'sent') {
    return (
      <div data-screen-label="Contact / sent">
        <section className="sec" style={{ paddingTop: 'clamp(80px,12vw,160px)', minHeight: '64vh' }}>
          <div className="wrap">
            <p className="label rise" style={{ marginBottom: 14, '--d': '60ms' }}>Received</p>
            <hr className="rule-draw" />
            <SplitLines tag="h1" className="display-m" base={300} style={{ marginTop: 48, maxWidth: '13ch' }}
              lines={['Brief received.', 'Back in touch shortly.']} />
            <p className="note rise" style={{ marginTop: 28, maxWidth: 380, '--d': '620ms' }}>
              Every enquiry is read personally. Expect a reply within two business days.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div data-screen-label="Contact">
      <PageMast
        kicker="Contact"
        lines={['Send a', 'brief.']}
        standfirst="Every enquiry reviewed directly. Mutual NDA before any sensitive exchange."
      />

      <section className="sec">
        <div className="wrap">
          <div className="g12" style={{ rowGap: 48, alignItems: 'start' }}>
            <div className="c1-3">
              <div className="sticky-label">
                <hr className="rule" />
                <p className="label" style={{ marginTop: 12, marginBottom: 22 }}>How it runs</p>
                <ol className="plain" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {['Intro call, no charge', 'Written proposal, fixed fee', 'Mutual NDA before materials', 'Milestone-based delivery'].map((l, i) => (
                    <li key={l} style={{ display: 'grid', gridTemplateColumns: '30px 1fr', fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                      <span className="index-num">{ROMAN[i]}</span>{l}
                    </li>
                  ))}
                </ol>
                <div style={{ marginTop: 32, paddingTop: 18, borderTop: '1px solid var(--rule-2)' }}>
                  <p className="label" style={{ marginBottom: 12 }}>Reach</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 15, alignItems: 'flex-start' }}>
                    <a className="wipe" href="https://www.linkedin.com/in/amar-kashyap" target="_blank" rel="noreferrer">LinkedIn</a>
                    <span style={{ color: 'var(--ink-3)' }}>Sydney, Australia · AEST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="c5-12">
              <form onSubmit={onSubmit}>
                <div className="cols-2" style={{ rowGap: 0 }}>
                  <label className="field"><span>Name *</span><input required placeholder="Your name" {...bind('name')} /></label>
                  <label className="field"><span>Email *</span><input required type="email" placeholder="you@company.com" {...bind('email')} /></label>
                  <label className="field"><span>Company</span><input placeholder="Company or venture" {...bind('company')} /></label>
                  <label className="field"><span>Stage</span>
                    <select {...bind('stage')}>
                      {['', 'Pre-seed / idea', 'Seed', 'Series A+', 'Established business', 'Angel investor', 'Fund manager / GP', 'Family office', 'Corporate', 'Other'].map(v => <option key={v} value={v}>{v || 'Select…'}</option>)}
                    </select>
                  </label>
                </div>
                <label className="field"><span>Area of interest</span>
                  <select {...bind('service')}>
                    {['', 'Investor readiness', 'Financial modelling', 'Transaction support', 'Fund structuring', 'Strategic advisory', 'Not sure yet'].map(v => <option key={v} value={v}>{v || 'Select…'}</option>)}
                  </select>
                </label>
                <label className="field"><span>Brief *</span>
                  <textarea required data-brief rows={7} placeholder="What are you trying to accomplish, and by when?" {...bind('message')} />
                </label>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', marginTop: 6 }}>
                  <button type="submit" className="cta" disabled={status === 'sending' || !form.name || !form.email || !form.message}>
                    {status === 'sending' ? 'Sending…' : 'Submit brief'}
                  </button>
                  {status === 'error' && <span className="note" style={{ color: 'var(--accent)' }}>Did not send. Try again, or reach out on LinkedIn.</span>}                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-band">
        <div className="wrap">
          <Opener label="Scope sketch">
            <h2 className="h2" style={{ maxWidth: '18ch', marginBottom: 16 }}>
              Unsure where you fit? Sketch a rough scope.
            </h2>
            <p className="note" style={{ maxWidth: 520, marginBottom: 40 }}>
              An indicative starting point, drafted from a short description. Real scope
              always comes from a call.
            </p>

            <div className="cols-2" style={{ alignItems: 'start' }}>
              <div>
                <label className="field">
                  <span>Your situation</span>
                  <textarea rows={8} value={situation} onChange={e => setSituation(e.target.value)}
                    placeholder="e.g. Series A consumer brand, $3M ARR, growing 80%. Raising $8M. Need a model, deck and investor plan." />
                </label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                  {SCOPE_EXAMPLES.map((ex, i) => (
                    <button key={i} type="button" className="chip" onClick={() => setSituation(ex)}>Example {i + 1}</button>
                  ))}
                </div>
                <button className="cta" onClick={generateScope} disabled={loading || !situation.trim()}>
                  {loading ? 'Drafting…' : 'Sketch a scope'}
                </button>
              </div>
              <div>
                <p className="label" style={{ marginBottom: 14 }}>Result</p>
                <div className="scope-out">
                  {loading && <span style={{ color: 'var(--ink-4)' }}>Parsing brief… matching segment… drafting scope…</span>}
                  {!loading && !result && <span style={{ color: 'var(--ink-4)' }}>An indicative sketch will appear here.</span>}
                  {!loading && result}
                </div>
                {!loading && result && (
                  <button type="button" className="cta-line" style={{ marginTop: 20 }} onClick={useInBrief}>
                    Use this in the brief above
                  </button>
                )}
              </div>
            </div>
          </Opener>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { ContactPage });
