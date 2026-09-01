/* About, Services, Track Record */

const DOSSIER = [
  { y: '2019–22', r: 'Institutional Banking & Ventures', o: 'ANZ', n: 'M&A advisory and leveraged finance in the Institutional division, structuring and syndicating facilities for mid-market and corporate clients.' },
  { y: '2022–23', r: 'Corporate Ventures & Strategy', o: 'PEXA Group', n: 'Strategy and corporate venture work inside an ASX-listed property-technology operator.' },
  { y: '2023–26', r: 'Investment Manager, founding hire', o: 'XT Ventures', n: 'Managed the entire investment function at an institutional venture fund, sourcing, modelling and negotiating investments across healthtech, consumer, sportstech, enterprise software and medtech, and holding them through to close.' },
  { y: '2026–', r: 'Founder & Principal', o: 'Evara Advisory', n: 'Independent practice. Founders raising, operators scaling, allocators deploying.' },
];

function PageMast({ kicker, lines }) {
  return (
    <section className="sec-tight" style={{ paddingTop: 'clamp(36px,5vw,72px)', paddingBottom: 'clamp(30px,4vw,56px)' }}>
      <div className="wrap">
        <p className="label rise" style={{ marginBottom: 14, '--d': '60ms' }}>{kicker}</p>
        <hr className="rule-draw" />
        <div className="g12" style={{ marginTop: 'clamp(24px,3vw,40px)', rowGap: 32, alignItems: 'end' }}>
          <SplitLines tag="h1" className="display-1 c1-12" base={300} lines={lines} />
        </div>
      </div>
    </section>
  );
}

function AboutPage({ setPage }) {
  return (
    <div data-screen-label="About">
      <PageMast
        kicker="About the practice"
        lines={['Both sides of the table.']}
      />

      <section className="sec" style={{ paddingTop: 0, paddingBottom: 'clamp(34px,4.6vw,68px)' }}>
        <div className="wrap">
          <div className="g12" style={{ rowGap: 40, alignItems: 'start' }}>
            <figure className="c1-4 portrait" ref={useParallax(18)}>
              <div className="frame">
                <img src="principal-portrait.webp" alt="Amar Kashyap, Founder and Principal of Evara Advisory" loading="lazy" width="800" height="800" />
              </div>
              <figcaption className="label" style={{ marginTop: 14 }}>
                Amar Kashyap<br />
                <span style={{ color: 'var(--ink-4)' }}>Founder &amp; Principal</span>
              </figcaption>
            </figure>
            <div className="c6-12">
              <div className="sticky-label" style={{ marginBottom: 28 }}>
                <hr className="rule" />
                <p className="label" style={{ marginTop: 12 }}>Background</p>
              </div>
              <div className="prose" style={{ maxWidth: 620 }}>
                <p>
                  Evara is the independent practice of Amar Kashyap. He started at ANZ across
                  institutional banking and ventures, backing companies from Series A onward.
                </p>
                <p>
                  The range has run both directions since. Sell-side, building the models and
                  information memoranda that carry a business to market. Buy-side, on the other
                  end of the same documents, deciding what to believe. On the ventures side that
                  meant commercial modelling rather than financing structures: unit economics,
                  cohorts, the shape of a business before the accounts show it.
                </p>
                <p>
                  Then corporate ventures and strategy at PEXA Group, and XT Ventures as the
                  founding investment hire, running the whole investment function. Enough rooms
                  to learn that the hard part is rarely the model. It is getting a table of
                  intelligent people to agree on what it says.
                </p>
                <p>
                  Outside the work: training, too much sport, and travel that involves a decent
                  hike and a market worth getting up early for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-tight" style={{ paddingTop: 0, paddingBottom: 'clamp(46px,6.2vw,88px)' }}>
        <div className="wrap">
          <div className="g12">
            <figure className="lift c2-10">
              <div className="lift-body">
                <blockquote className="lift-quote">
                  I’ve sat on both sides of the table. The work is <i>translating fluently</i> between them.
                </blockquote>
                <div className="lift-foot">
                  <hr />
                  <span>Amar Kashyap · Founder &amp; Principal</span>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </section>

      <StripHead label="Dossier">
        <h2 className="h2">The route here.</h2>
      </StripHead>

      <section className="sec" style={{ paddingTop: 'clamp(30px,4vw,54px)', paddingBottom: 'clamp(16px,2vw,24px)' }}>
        <div className="wrap">
          <div className="g12">
            <ScrollRows className="c4-12 no-tail-rule">
            {DOSSIER.map(d => (
              <div className="dossier-row" key={d.y}>
                <span className="label tabular" style={{ paddingTop: 5 }}>{d.y}</span>
                <div>
                  <h3 className="h3">{d.r}</h3>
                  <p className="label label-accent" style={{ marginTop: 8 }}>{d.o}</p>
                  <p className="note" style={{ marginTop: 14, maxWidth: 560 }}>{d.n}</p>
                </div>
              </div>
            ))}
            </ScrollRows>
          </div>
        </div>
      </section>

      <div className="strip-rule strip-rule--foot"></div>
    </div>
  );
}

/* ============================================================ */

const SERVICES = [
  {
    t: 'Commercial strategy',
    k: 'Where the margin comes from',
    d: 'Pricing, packaging and mix. The decisions that determine whether a good product becomes a good business, answered with the numbers underneath them.',
    w: ['Pricing and packaging', 'Segment, channel and mix', 'Go-to-market economics', 'Board and ExCo strategy papers'],
  },
  {
    t: 'Unit economics',
    k: 'The engine, isolated',
    d: 'What one customer, one site, one cohort actually earns and what it costs to get. Contribution margin traced back to its drivers, so a growth plan can be argued about on evidence.',
    w: ['Contribution margin by segment', 'Acquisition cost and payback', 'Cohort, retention and expansion', 'Capacity and cost-to-serve'],
  },
  {
    t: 'Operating models',
    k: 'Built to be run weekly',
    d: 'The internal model the business is actually steered on: driver-based, reconciling to the accounts, updated monthly without a rebuild. Three-statement where the situation calls for it.',
    w: ['Driver-based operating models', 'Three-statement builds', 'Scenario and sensitivity analysis', 'Budget, forecast and variance'],
  },
  {
    t: 'Investor readiness',
    k: 'Legible from the other side',
    d: 'Narrative, model, deck and data room assembled to the standard an institutional investor expects before they will spend real diligence time on you. Written by someone who has run that diligence.',
    w: ['Equity story and investor narrative', 'Deck, model and data room', 'Diligence preparation and Q&A', 'Cap table, dilution and term sheets'],
  },
  {
    t: 'Commercial due diligence',
    k: 'The same rigour, pointed outward',
    d: 'For anyone about to buy, back or merge with a business: the target’s numbers taken apart properly. Where the earnings actually come from, which of them survive the transaction, and what the plan assumes that the market will not give it.',
    w: ['Revenue and margin quality', 'Market, demand and competitive position', 'Management case, tested', 'Post-deal value creation plan'],
  },
];

const AUDIENCES = [
  {
    n: 'For operators',
    d: 'Founders and chief executives who need the commercial engine understood and the plan defensible, and who would rather hear how an investor will read it before an investor does.',
  },
  {
    n: 'For investors and boards',
    d: 'Allocators, funds and family offices who need a target’s numbers taken apart properly, or a portfolio company’s operating model rebuilt into something the board can actually govern with.',
  },
];

const SHAPES = [
  { n: 'Project', d: 'Defined deliverable, fixed scope. A pricing review, a model build, a raise prepared. Four to eight weeks.' },
  { n: 'Retainer', d: 'Ongoing commercial capacity at a monthly cadence. The model kept live, the decisions worked through as they arrive.' },
  { n: 'Second opinion', d: 'A short, sharp read on a single model, price change, memo or investment decision.' },
  { n: 'Advisory board', d: 'A named seat on a company or fund advisory board.' },
];

function ServicesPage({ setPage }) {
  return (
    <div data-screen-label="Services">
      <PageMast
        kicker="Services"
        lines={[<>Commercial decisions,</>, <>and the <i>capital</i> behind them.</>]}
      />

      <section className="sec" style={{ paddingTop: 0, paddingBottom: 'clamp(26px,3.4vw,48px)' }}>
        <div className="wrap">
          <hr className="rule" />
          <p className="standfirst" style={{ marginTop: 'clamp(20px,2.6vw,32px)', maxWidth: 'none' }}>
            Commercial consulting, done by someone who has spent years in direct investment as
            well. The unit economics that decide how a business should be priced are the same ones
            an investment committee interrogates before it writes a cheque.
          </p>
        </div>
      </section>

      <StripHead label="Practice areas">
        <h2 className="h2">What I am hired to do.</h2>
      </StripHead>

      <section className="sec" style={{ paddingTop: 'clamp(26px,3.4vw,48px)', paddingBottom: 'clamp(34px,4.6vw,68px)' }}>
        <div className="wrap">
          <div className="g12">
            <ScrollRows className="c1-12">
              {SERVICES.map((s, i) => (
                <div className="index-row" key={s.t}>
                  <span className="index-num">{ROMAN[i]}</span>
                  <div>
                    <h3 className="h3">{s.t}</h3>
                    <p className="label label-accent" style={{ marginTop: 10 }}>{s.k}</p>
                  </div>
                  <div className="index-body">
                    <p className="note">{s.d}</p>
                    <ul className="svc-list">
                      {s.w.map(w => <li key={w}>{w}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </ScrollRows>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0, paddingBottom: 'clamp(40px,5.4vw,76px)' }}>
        <div className="wrap">
          <div className="g12" style={{ alignItems: 'baseline', rowGap: 8, marginBottom: 'clamp(22px,3vw,38px)' }}>
            <div className="c1-3"><p className="label">Who it is for</p></div>
            <div className="c4-12"><h2 className="h2">Both ends of the same table.</h2></div>
          </div>
          <div className="g12">
            <div className="c4-12">
              <div className="cols-2">
                {AUDIENCES.map(a => (
                  <div key={a.n} style={{ borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
                    <h3 className="h3" style={{ marginBottom: 10 }}>{a.n}</h3>
                    <p className="note">{a.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band-slate">
        <div className="wrap">
          <div className="g12" style={{ alignItems: 'baseline', rowGap: 8, marginBottom: 'clamp(26px,3.4vw,44px)' }}>
            <div className="c1-3">
              <p className="label">Engagement shapes</p>
            </div>
            <div className="c4-12">
              <h2 className="h2">Four ways in.</h2>
            </div>
          </div>
          <div className="g12">
            <div className="c4-12">
              <div className="cols-2">
                {SHAPES.map(s => (
                  <div key={s.n} style={{ borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
                    <h3 className="h3" style={{ marginBottom: 10 }}>{s.n}</h3>
                    <p className="note">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================ */

const ENGAGEMENTS = [
  {
    t: 'European private equity fund formation',
    m: 'Franchise group and family office · Australia / Europe',
    d: 'Structuring of a European private equity vehicle for one of Australia’s largest franchise groups and its associated family office, delivered with the full financial model and the complete investor documentation suite.',
  },
  {
    t: 'Group commercial strategy',
    m: 'Franchise group and family office · Australia / Europe',
    d: 'A wider commercial strategy mandate across the group, with the supporting financial modelling and the board strategy papers that carried it.',
  },
  {
    t: 'Financial modelling and investor materials',
    m: 'Beauty technology · Consumer',
    d: 'Operating and fundraising model built from the ground up, with the investor materials to match, for a consumer beauty-technology business.',
  },
  {
    t: 'Investor materials preparation',
    m: 'LegalTech · Enterprise software',
    d: 'Financial model, investor pitch deck and supporting documentation prepared ahead of an institutional raise.',
  },
];

function TrackRecordPage({ setPage }) {
  return (
    <div data-screen-label="Track Record">
      <PageMast
        kicker="Track record"
        lines={['Work I can talk about.']}
      />

      <StripHead label="Engagement notes">
        <h2 className="h2">A selection.</h2>
      </StripHead>

      <section className="sec" style={{ paddingTop: 'clamp(26px,3.4vw,48px)', paddingBottom: 'clamp(34px,4.6vw,68px)' }}>
        <div className="wrap">
          <div className="g12">
            <ScrollRows className="c1-12">
              {ENGAGEMENTS.map((e, i) => (
                <div className="index-row" key={e.t}>
                  <span className="index-num">{ROMAN[i]}</span>
                  <div>
                    <h3 className="h3">{e.t}</h3>
                    <p className="label label-accent" style={{ marginTop: 10 }}>{e.m}</p>
                  </div>
                  <p className="note index-body">{e.d}</p>
                </div>
              ))}
            </ScrollRows>
          </div>
        </div>
      </section>

      <section className="band-slate">
        <div className="wrap">
          <div className="g12" style={{ alignItems: 'baseline', rowGap: 8 }}>
            <div className="c1-3">
              <p className="label">On confidentiality</p>
            </div>
            <div className="c4-12">
              <p className="standfirst" style={{ maxWidth: '44ch', margin: 0 }}>
                These are examples rather than a full list. Client identities and engagement
                documents are held in confidence.
              </p>
              <p className="note" style={{ marginTop: 18, maxWidth: '48ch' }}>
                Anonymised work samples and references are available under NDA.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================ */

function Closer({ setPage, title, note, cta = 'Start a conversation' }) {
  return (
    <section className="sec" style={{ paddingTop: 'clamp(48px,6.5vw,88px)', paddingBottom: 'clamp(48px,6.5vw,88px)' }}>
      <div className="wrap">
        <div className="g12" style={{ rowGap: 24, alignItems: 'end' }}>
          <h2 className="display-m c1-7">{title}</h2>
          <div className="c9-12">
            <p className="note" style={{ maxWidth: 300, marginBottom: 18 }}>{note}</p>
            <button className="cta" onClick={() => setPage('Contact')}>{cta}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AboutPage, ServicesPage, TrackRecordPage, PageMast, Closer });
