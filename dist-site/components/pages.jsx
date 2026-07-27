/* About, Services, Track Record */

const DOSSIER = [
  { y: '2019–22', r: 'Institutional Banking & Ventures', o: 'ANZ', n: 'M&A advisory and leveraged finance in the Institutional division, structuring and syndicating facilities for mid-market and corporate clients.' },
  { y: '2022–23', r: 'Corporate Ventures & Strategy', o: 'PEXA Group', n: 'Strategy and corporate venture work inside an ASX-listed property-technology operator.' },
  { y: '2023–26', r: 'Investment Manager, founding hire', o: 'XT Ventures', n: 'Managed the entire investment function at an institutional venture fund, sourcing, modelling and negotiating investments across healthtech, consumer, sportstech, enterprise software and medtech, and holding them through to close.' },
  { y: '2026–', r: 'Founder & Principal', o: 'Evara Advisory', n: 'Independent practice. Founders raising, operators scaling, allocators deploying.' },
];

function PageMast({ kicker, lines }) {
  return (
    <section className="sec-tight" style={{ paddingTop: 'clamp(36px,5vw,72px)', paddingBottom: 'clamp(20px,3vw,36px)' }}>
      <div className="wrap">
        <p className="label rise" style={{ marginBottom: 14, '--d': '60ms' }}>{kicker}</p>
        <hr className="rule-draw" />
        <div className="g12" style={{ marginTop: 'clamp(24px,3vw,40px)', rowGap: 32, alignItems: 'end' }}>
          <SplitLines tag="h1" className="display-m c1-7" base={300} lines={lines} />
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
        lines={['Both sides of', 'the table.']}
      />

      <section className="sec">
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

      <section className="sec-tight">
        <div className="wrap">
          <div className="g12">
            <blockquote className="pull c2-8" style={{ margin: 0, fontSize: 'clamp(24px,3.2vw,42px)' }}>
              “I’ve sat on both sides of the table. The work is <i>translating fluently</i> between them.”
            </blockquote>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Opener label="Dossier">
            <h2 className="h2" style={{ maxWidth: '14ch', marginBottom: 'clamp(32px,4vw,56px)' }}>
              The route here.
            </h2>
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
          </Opener>
        </div>
      </section>

      <Closer setPage={setPage} title={<>Worth a<br />conversation?</>} note="An intro call costs nothing and usually clarifies more than a brief does." />
    </div>
  );
}

/* ============================================================ */

const SERVICES = [
  { t: 'Investor readiness', d: 'Narrative, model, deck and data room, assembled to the standard an institutional investor expects before they will spend real diligence time on you.' },
  { t: 'Financial modelling', d: 'Operating models, three-statement builds, cap tables and dilution. Constructed to reconcile to the accounts and survive a hostile question.' },
  { t: 'Transaction support', d: 'Capital raises, secondaries and selective M&A. Senior cover from first conversation through term sheet to close, including the awkward parts.' },
  { t: 'Fund structuring', d: 'For emerging managers, family offices and corporate venture programmes: vehicle design, economics, LP materials and IC process.' },
  { t: 'Strategic advisory', d: 'Standing counsel to a small number of founders, chief executives and allocators on the decisions that move capital.' },
];

const SHAPES = [
  { n: 'Project', d: 'Defined deliverable, fixed scope. Four to eight weeks.' },
  { n: 'Retainer', d: 'Ongoing capacity at a monthly cadence, reviewed quarterly.' },
  { n: 'Second opinion', d: 'A short, sharp read on a single model, memo or decision.' },
  { n: 'Advisory board', d: 'A named seat on a company or fund advisory board.' },
];

function ServicesPage({ setPage }) {
  return (
    <div data-screen-label="Services">
      <PageMast
        kicker="Services"
        lines={['The work, and', <>the <i>shape</i> it takes.</>]}
      />

      <section className="sec">
        <div className="wrap">
          <Opener label="Areas of work">
            <h2 className="h2" style={{ maxWidth: '15ch', marginBottom: 'clamp(32px,4vw,56px)' }}>
              What I am hired to do.
            </h2>
          </Opener>
          <div className="g12" style={{ marginTop: 8 }}>
            <div className="c1-12">
              {SERVICES.map((s, i) => (
                <div className="index-row" key={s.t}>
                  <span className="index-num">{ROMAN[i]}</span>
                  <h3 className="h3">{s.t}</h3>
                  <p className="note index-body">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-band">
        <div className="wrap">
          <Opener label="Engagement shapes">
            <h2 className="h2" style={{ maxWidth: '14ch', marginBottom: 'clamp(32px,4vw,56px)' }}>
              Four ways in.
            </h2>
            <div className="cols-2">
              {SHAPES.map(s => (
                <div key={s.n} style={{ borderTop: '1px solid var(--ink)', paddingTop: 16 }}>
                  <h3 className="h3" style={{ marginBottom: 10 }}>{s.n}</h3>
                  <p className="note">{s.d}</p>
                </div>
              ))}
            </div>
          </Opener>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Opener label="A note on method">
            <p className="standfirst" style={{ maxWidth: '36ch' }}>
              AI tools sit underneath most of what I do. They take the grind out of research,
              first drafts and document work. What they do not do is decide anything, and
              nothing leaves here without me having gone through it line by line.
            </p>
          </Opener>
        </div>
      </section>

      <Closer setPage={setPage} title={<>Something<br /><i>specific</i> in mind?</>} note="Describe the situation and I will come back with an indicative scope." cta="Send a brief" />
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
        lines={['Work I can', 'talk about.']}
      />

      <section className="sec">
        <div className="wrap">
          <Opener label="Engagement notes">
            <h2 className="h2" style={{ maxWidth: '16ch', marginBottom: 'clamp(32px,4vw,56px)' }}>
              A selection.
            </h2>
          </Opener>
          <div className="g12" style={{ marginTop: 8 }}>
            <div className="c1-12">
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
            </div>
          </div>
          <div className="g12" style={{ marginTop: 32 }}>
            <p className="note c1-6" style={{ color: 'var(--ink-3)' }}>
              These are examples rather than a full list. Client identities and engagement
              documents are held in confidence. Anonymised work samples and references are
              available under NDA.
            </p>
          </div>
        </div>
      </section>

      <Closer setPage={setPage} title={<>Want the<br />long version?</>} note="References and anonymised work samples are available under NDA." />
    </div>
  );
}

/* ============================================================ */

function Closer({ setPage, title, note, cta = 'Start a conversation' }) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="g12" style={{ rowGap: 32, alignItems: 'end' }}>
          <h2 className="display-m c1-7">{title}</h2>
          <div className="c9-12">
            <p className="note" style={{ maxWidth: 300, marginBottom: 24 }}>{note}</p>
            <button className="cta" onClick={() => setPage('Contact')}>{cta}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AboutPage, ServicesPage, TrackRecordPage, PageMast, Closer });
