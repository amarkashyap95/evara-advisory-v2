/* Home */

const PRACTICE = [
  { t: 'Commercial strategy', d: 'Pricing, packaging and mix. The decisions that determine whether a good product becomes a good business.' },
  { t: 'Unit economics', d: 'What one customer, one site, one cohort actually earns, and what it costs to get.' },
  { t: 'Operating models', d: 'The internal model the business is steered on. Driver-based, reconciling to the accounts, updated monthly.' },
  { t: 'Investor readiness', d: 'Narrative, model, deck and data room, built to the standard an institutional investor expects.' },
  { t: 'Commercial due diligence', d: 'For anyone about to buy, back or merge with a business: the target’s numbers taken apart properly.' },
];

const SELECTED = [
  { w: 'European private equity fund formation', s: 'Franchise group and family office · AU / EU' },
  { w: 'Group commercial strategy and board papers', s: 'Franchise group and family office · AU / EU' },
  { w: 'Financial modelling and investor materials', s: 'Beauty technology · AU' },
  { w: 'Investor materials and pitch deck', s: 'LegalTech · AU' },
];

function Hero({ setPage }) {
  return (
    <section className="sec" style={{ paddingTop: 'clamp(44px,6.5vw,100px)', paddingBottom: 'clamp(56px,8vw,130px)' }}>
      <div className="wrap">
        <p className="label rise" style={{ marginBottom: 14, '--d': '60ms' }}>
          Independent commercial advisory &nbsp;·&nbsp; Sydney &nbsp;·&nbsp; Est. 2026
        </p>
        <hr className="rule-draw" />
        <div className="g12" style={{ marginTop: 'clamp(36px,5vw,72px)', rowGap: 32, alignItems: 'center' }}>
          <SplitLines tag="h1" className="display c1-9" base={280}
            lines={['Commercial clarity,', 'custom-built.']} />
        </div>
        <div className="g12" style={{ marginTop: 'clamp(28px,4vw,56px)', rowGap: 28, alignItems: 'end' }}>
          <p className="standfirst c1-7 rise" style={{ '--d': '700ms' }}>
            Clarity on the decisions that move capital, for founders raising,
            operators scaling, and allocators deploying.
          </p>
          <div className="c9-12 rise" style={{ '--d': '820ms', display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' }}>
            <button className="cta" onClick={() => setPage('Contact')}><Swap>Start a conversation</Swap></button>
            <button className="cta-line" onClick={() => setPage('Services')}><Swap>See the practice areas</Swap></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Static rail of the practice areas. Hairline-divided, no motion. */
function Rail() {
  return (
    <div className="wrap">
      <div className="rail">
        {PRACTICE.map((p, i) => (
          <span key={p.t}><span className="rail-num">{ROMAN[i]}</span>{p.t}</span>
        ))}
      </div>
    </div>
  );
}

function PracticeIndex({ setPage }) {
  return (
    <>
      <StripHead label="Practice areas" more="See all" onMore={() => setPage('Services')}>
        <h2 className="h2">Five lines of work, one operator behind each.</h2>
      </StripHead>
      <section className="sec-tight" style={{ paddingTop: 'clamp(19px,2.4vw,35px)' }}>
        <div className="wrap">
          <div className="g12">
            <ScrollRows className="c1-12">
              {PRACTICE.map((p, i) => (
                <div className="index-row" key={p.t}>
                  <span className="index-num">{ROMAN[i]}</span>
                  <h3 className="h3">{p.t}</h3>
                  <p className="note index-body">{p.d}</p>
                </div>
              ))}
            </ScrollRows>
          </div>
        </div>
      </section>
    </>
  );
}

function SelectedWork({ setPage }) {
  return (
    <>
      <StripHead label="Selected engagements" more="Engagement notes" onMore={() => setPage('Track Record')}>
        <h2 className="h2">Client names are held in confidence.</h2>
      </StripHead>
      <section className="sec-tight" style={{ paddingTop: 'clamp(30px,3.8vw,54px)' }}>
        <div className="wrap">
          <ScrollRows>
            {SELECTED.map(d => (
              <button className="work-row" key={d.w} onClick={() => setPage('Track Record')}>
                <span className="work-title">{d.w}</span>
                <span className="label" style={{ letterSpacing: '.1em', flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 14 }}>
                  {d.s}<span className="work-arrow" aria-hidden="true">→</span>
                </span>
              </button>
            ))}
          </ScrollRows>
        </div>
      </section>
    </>
  );
}

function PullQuote() {
  return (
    <section className="stack">
      <div className="stack-panel band-slate">
        <div className="wrap" style={{ width: '100%' }}>
          <div className="g12" style={{ rowGap: 28 }}>
            <p className="label c1-12" style={{ marginBottom: 'clamp(18px,2.4vw,30px)' }}>In their words</p>
            <blockquote className="pull c1-8" style={{ margin: 0 }}>
              “The model behaves less like a spreadsheet and more like a live tool.
              It has given the board more clarity on the decisions in front of us than
              anything we have worked with before.”
            </blockquote>
            <div className="c9-12" style={{ alignSelf: 'end' }}>
              <hr className="rule" />
              <p className="label" style={{ marginTop: 12 }}>
                Group Managing Director<br />
                <span style={{ color: 'var(--ink-4)' }}>Australian franchise group</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ setPage }) {
  return (
    <div data-screen-label="Home">
      <Hero setPage={setPage} />
      <Rail />
      <PracticeIndex setPage={setPage} />
      <SelectedWork setPage={setPage} />
      <PullQuote />
    </div>
  );
}

Object.assign(window, { HomePage });
