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

function Hero({ setPage, art = {} }) {
  return (
    <section className="sec" style={{ paddingTop: 'clamp(40px,6vw,84px)', paddingBottom: 'clamp(84px,12vw,190px)', overflow: 'hidden' }}>
      <div className="wrap ruled">
        <Globe detail={art.atmosphere === 'instrument' ? 'dense' : 'fine'} showArcs={art.atmosphere !== 'bare'} />
        <div className="colrules" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => <span key={i}></span>)}
        </div>
        <p className="label rise over" style={{ marginBottom: 14, '--d': '60ms' }}>
          Independent commercial advisory &nbsp;·&nbsp; Sydney &nbsp;·&nbsp; Est. 2026
        </p>
        <hr className="rule-draw over" />

        <div className="g12 over" style={{ marginTop: 'clamp(40px,6vw,80px)', alignItems: 'end', rowGap: 40 }}>
          <SplitLines tag="h1" className="display c1-8" base={300}
            lines={['Commercial clarity,', 'custom-built.']} />
        </div>

        <div className="g12 over" style={{ marginTop: 'clamp(17px,3vw,33px)', rowGap: 28 }}>
          <p className="standfirst c1-6 rise" style={{ '--d': '760ms' }}>
            Clarity on the decisions that move capital, for founders raising,
            operators scaling, and allocators deploying.
          </p>
          <div className="c1-6 rise" style={{ '--d': '860ms', display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center', marginTop: 8 }}>
            <button className="cta" onClick={() => setPage('Contact')}>Start a conversation</button>
            <button className="cta-line" onClick={() => setPage('Services')}>See the practice areas</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PracticeIndex({ setPage }) {
  return (
    <>
      <StripHead label="Practice areas">
        <h2 className="h2">Five lines of work, <i>one operator</i> behind each.</h2>
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

        <div className="g12" style={{ marginTop: 36 }}>
          <div className="c1-12">
            <button className="cta-line" onClick={() => setPage('Services')}>How engagements are structured</button>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

function SelectedWork({ setPage }) {
  return (
    <>
      <StripHead label="Selected engagements">
        <h2 className="h2">Client names are <i>held in confidence.</i></h2>
      </StripHead>
      <section className="sec-tight" style={{ paddingTop: 'clamp(19px,2.4vw,35px)' }}>
      <div className="wrap">
        <div className="g12" style={{ rowGap: 32, alignItems: 'start' }}>
          <div className="c1-12">
            {SELECTED.map(d => (
              <div className="desk-row" key={d.w}>
                <span style={{ fontSize: 17, color: 'var(--ink)' }}>{d.w}</span>
                <span className="label" style={{ letterSpacing: '.1em' }}>{d.s}</span>
              </div>
            ))}
            <button className="cta-line" style={{ marginTop: 26 }} onClick={() => setPage('Track Record')}>
              Read the engagement notes
            </button>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

function PullQuote() {
  return (
    <section className="sec-reverse">
      <img className="skyline" src="skyline.svg" alt="" aria-hidden="true" loading="lazy" />
      <div className="wrap">
        <div className="g12" style={{ rowGap: 28 }}>
          <p className="label c1-12" style={{ marginBottom: 'clamp(18px,2.4vw,30px)' }}>In their words</p>
          <blockquote className="pull c2-9" style={{ margin: 0 }}>
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
    </section>
  );
}

function Closing({ setPage }) {
  return (
    <section className="sec" style={{ paddingTop: 'clamp(48px,6.5vw,88px)', paddingBottom: 'clamp(48px,6.5vw,88px)' }}>
      <div className="wrap">
        <div className="g12" style={{ rowGap: 24, alignItems: 'end' }}>
          <h2 className="display-m c1-7">
            Worth a<br />conversation?
          </h2>
          <div className="c9-12">
            <p className="note" style={{ maxWidth: 300, marginBottom: 18 }}>
              An intro call costs nothing and usually clarifies more than a brief does.
              Every enquiry is read personally.
            </p>
            <button className="cta" onClick={() => setPage('Contact')}>Send a brief</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ setPage, art = {} }) {
  return (
    <div data-screen-label="Home">
      <Hero setPage={setPage} art={art} />
      <PracticeIndex setPage={setPage} />
      <SelectedWork setPage={setPage} />
      <PullQuote />
      <Closing setPage={setPage} />
    </div>
  );
}

Object.assign(window, { HomePage });
