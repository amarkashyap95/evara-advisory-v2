/* Evara Advisory — About, Services, Track Record, Contact pages */

const { useState: pUseState, useEffect: pUseEffect, useRef: pUseRef } = React;

/* ===========================================================
   About Page
   =========================================================== */
function AboutPage({ setPage }) {
  const timeline = [
    { year: '2019', role: 'Institutional Banking & Ventures', org: 'ANZ', desc: 'M&A advisory and leveraged finance in the bank\'s Institutional division — structuring and syndicating facilities for PE sponsors across Australian and Asia-Pacific transactions. Transitioned into the bank\'s ventures arm, deploying capital into growth-stage fintech from Series A through pre-IPO.' },
    { year: '2022', role: 'Corporate Ventures & Strategy', org: 'PEXA Group', desc: 'Proptech venture investments and corporate development strategy for a major ASX-listed technology platform. Sourced and assessed minority investments across Australian proptech; supported platform partnerships and M&A pipeline for the executive team.' },
    { year: '2023', role: 'Investment Manager & Founding Hire', org: <>Institutional Venture Fund<br />(XT Ventures)</>, desc: 'Founding investment hire at an institutional venture fund backed by one of Australia\'s largest health insurance groups. Managed the entire investment function — led due diligence and built investment committee cases on seven IC-approved investments across healthtech, consumer, sportstech, enterprise software, medtech, and others.' },
    { year: '2026', role: 'Founder & Principal', org: 'Evara Advisory', desc: 'Independent commercial advisory practice. Three mandates in the first quarter spanning structuring analysis, investor readiness, and strategic advisory for founders and allocators.' },
  ];

  return (
    <>
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'end' }} className="about-hero">
          <div>
            <div className="t-micro" style={{ marginBottom: 28 }}>§ The Principal · About</div>
            <h1 className="t-display" style={{ fontSize: 'clamp(35px, 5.4vw, 82px)', lineHeight: 0.95, letterSpacing: '-0.035em' }}>
              Seven years <em className="t-display-it t-muted">inside</em><br /> private markets.
            </h1>
          </div>
          <div className="readout">
            <div className="readout-head"><span>Bio · compressed</span><span style={{ color: 'var(--live)' }}>● PUB</span></div>
            <div className="readout-body" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className="readout-line"><span className="k">NAME</span><span className="v">Amar Kashyap</span></div>
              <div className="readout-line"><span className="k">ROLE</span><span className="v">Founder · Principal</span></div>
              <div className="readout-line"><span className="k">BASED</span><span className="v">Sydney, AU</span></div>
              <div className="readout-line"><span className="k">EDU</span><span className="v">UNSW · UIUC</span></div>
              <div className="readout-line"><span className="k">FOCUS</span><span className="v">Transactions · Strategy</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Principal portrait — image paired with bio + quote */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 440px) 1.4fr', gap: 64, alignItems: 'start' }} className="about-portrait">
          <div style={{ width: '100%', maxWidth: 440 }}>
            <img
              src="/principal-portrait.webp"
              alt="Amar Kashyap, Principal — Evara Advisory"
              loading="lazy"
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                objectFit: 'cover',
                objectPosition: 'center top',
                filter: 'grayscale(100%)',
                border: '1px solid var(--line)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                display: 'block',
              }}
            />
            <div className="t-mono" style={{ marginTop: 16, fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Amar Kashyap · Principal · Sydney
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div className="t-mono" style={{ fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>§ Heritage · Trajectory</div>
            <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 620 }}>
              Seven years across institutional banking, corporate ventures, and institutional venture capital — deploying capital, structuring transactions, and building investment cases inside three different sides of the same market. Now independent.
            </p>
            <p style={{ fontSize: 22, lineHeight: 1.35, color: 'var(--text)', fontFamily: 'var(--ff-display)', fontStyle: 'italic', paddingLeft: 22, borderLeft: '2px solid var(--cream)', margin: '12px 0 0', maxWidth: 640 }}>
              "I've sat on both sides of the table. The work is translating <em style={{ color: 'var(--cream)' }}>fluently</em> between them."
            </p>
          </div>
        </div>
        <style>{`
          .about-portrait { grid-template-columns: 1fr !important; }
          @media (min-width: 900px) {
            .about-portrait { grid-template-columns: minmax(0, 440px) 1.4fr !important; gap: 64px !important; }
          }
        `}</style>
      </section>

      {/* Thesis */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', background: 'linear-gradient(180deg, var(--paper-top) 0%, var(--paper-bot) 100%)', color: 'var(--paper-ink)', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.03)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }} className="about-thesis">
          <div>
            <div className="t-mono" style={{ fontSize: 11, color: 'var(--paper-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>§02 · Operating thesis</div>
            <div className="t-display" style={{ fontSize: 36, lineHeight: 1.15, color: 'var(--paper-ink)', letterSpacing: '-0.02em' }}>
              Institutional rigour.<br /><em className="t-display-it">Boutique delivery.</em>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, fontSize: 16, lineHeight: 1.75, color: 'var(--paper-ink)' }}>
            <p>
              Evara Advisory was founded to deliver institutional-quality commercial and strategic advisory directly to founders and operating businesses — <em>without</em> the overhead of a large firm.
            </p>
            <p style={{ fontSize: 20, lineHeight: 1.4, color: 'var(--paper-ink)', fontFamily: 'var(--ff-display)', fontStyle: 'italic', paddingLeft: 20, borderLeft: '2px solid #C7A05A', margin: '8px 0' }}>
              Every engagement starts with the same question: <em style={{ color: 'var(--cream)' }}>what is this capital actually for?</em>
            </p>
            <p style={{ color: 'var(--text-2)' }}>
              The practice is led by Amar Kashyap, drawing on seven years across institutional banking, corporate ventures, and institutional venture capital. Transaction support, capital strategy, modelling, document preparation, and investor-readiness work — scoped as commercial services to the business itself.
            </p>
            <p style={{ color: 'var(--text-2)' }}>
              Based in Sydney and operating with limited capacity by design. Every engagement is shaped end-to-end by the principal and delivered alongside the client's licensed legal, tax, and financial advisors where relevant.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline — ledger style */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)' }}>
        <SectionHead num="03" eyebrow="Track · Ledger" title={<>Career, by <em className="t-display-it">entry</em>.</>} />
        <div style={{ border: '1px solid var(--line)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 200px 240px 1fr', padding: '14px 24px', borderBottom: '1px solid var(--line)', background: 'var(--ink-3)', fontFamily: 'var(--ff-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-4)' }} className="ledger-head">
            <span>YR</span><span>ROLE</span><span>ORG</span><span>DETAIL</span>
          </div>
          {timeline.map((t, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 200px 240px 1fr', padding: '26px 24px', borderBottom: i < timeline.length - 1 ? '1px solid var(--line)' : 'none', alignItems: 'start', background: i === timeline.length - 1 ? 'rgba(79,191,137,0.03)' : 'transparent' }} className="ledger-row">
              <span className="t-display" style={{ fontSize: 28, color: i === timeline.length - 1 ? 'var(--live)' : 'var(--text-2)', lineHeight: 1 }}>{t.year}</span>
              <span className="t-mono" style={{ fontSize: 11.5, color: 'var(--text-2)', letterSpacing: '0.06em' }}>{t.role}</span>
              <span style={{ fontSize: 16, color: 'var(--text)', fontFamily: 'var(--ff-display)' }}>{t.org}</span>
              <span style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.6 }}>{t.desc}</span>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 900px) {
            .ledger-head, .ledger-row { grid-template-columns: 1fr !important; gap: 8px; }
            .ledger-head { display: none !important; }
          }
          .about-hero, .about-thesis { grid-template-columns: 1fr !important; }
          @media (min-width: 900px) {
            .about-hero { grid-template-columns: 1.4fr 1fr !important; }
            .about-thesis { grid-template-columns: 1fr 1.4fr !important; }
          }
        `}</style>
      </section>

      {/* Credentials grid */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="g2" style={{ borderTop: '1px solid var(--line)', borderLeft: '1px solid var(--line)' }}>
          <div style={{ padding: 36, borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
            <div className="t-micro" style={{ marginBottom: 18 }}>Heritage</div>
            {['Institutional Banking — M&A & Leveraged Finance', 'Corporate Ventures — ASX-listed proptech platform', 'Institutional VC Fund — Founding investment hire', 'Independent Advisory — Evara Advisory'].map((l, i, arr) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none', fontFamily: 'var(--ff-mono)', fontSize: 12, color: 'var(--text-2)' }}>
                <span style={{ color: 'var(--text-4)' }}>0{i + 1}</span>{l}
              </div>
            ))}
          </div>
          <div style={{ padding: 36, borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
            <div className="t-micro" style={{ marginBottom: 18 }}>Education</div>
            <div style={{ marginBottom: 24 }}>
              <div className="t-display" style={{ fontSize: 22, color: 'var(--text)' }}>UNSW Sydney</div>
              <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>B.Commerce / B.Information Systems · Distinction</div>
            </div>
            <div>
              <div className="t-display" style={{ fontSize: 22, color: 'var(--text)' }}>UIUC · University of Illinois</div>
              <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>12-month international exchange · 4.0 GPA</div>
            </div>
          </div>
          <div style={{ padding: 36, borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
            <div className="t-micro" style={{ marginBottom: 18 }}>Who I Work With</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Family offices', 'PE-backed platforms', 'Seed/A founders', 'Franchise groups', 'SMB operators'].map(t => (
                <span key={t} style={{ padding: '6px 12px', border: '1px solid var(--line)', fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.04em' }}>{t}</span>
              ))}
            </div>
            <div className="t-micro" style={{ marginTop: 28, marginBottom: 14 }}>Sector exposure</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Health & Fitness', 'Beauty & Medical', 'Legal Technology', 'Sportstech', 'Healthtech', 'Consumer', 'Enterprise Software', 'Medtech'].map(t => (
                <span key={t} style={{ padding: '6px 12px', border: '1px solid var(--line)', fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.04em' }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ padding: 36, borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
            <div className="t-micro" style={{ marginBottom: 18 }}>Operating Principles</div>
            {[['01', 'Outcome-scoped.', 'Deliverables over hours.'], ['02', 'NDA-first.', 'Before any sensitive exchange.'], ['03', 'Commercial services only.', 'No financial product advice; no AFSL held.'], ['04', 'Institutional output.', 'Boutique delivery.']].map(([n, h, d], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: 10, padding: '14px 0', borderBottom: i < 3 ? '1px solid var(--line)' : 'none' }}>
                <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.1em' }}>{n}</span>
                <div>
                  <div style={{ fontSize: 15, color: 'var(--text)', marginBottom: 2 }}>{h}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Scope of services — clear disclaimer */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', background: 'var(--ink-2)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, alignItems: 'start' }} className="scope-disc">
          <div>
            <div className="t-mono" style={{ fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>§05 · Scope of services</div>
            <h3 className="t-display" style={{ fontSize: 36, lineHeight: 1.05, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              What Evara is,<br /><em className="t-display-it t-muted">and is not.</em>
            </h3>
          </div>
          <div style={{ border: '1px solid var(--line)', background: 'var(--ink)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ padding: 28, borderRight: '1px solid var(--line)' }}>
                <div className="t-mono" style={{ fontSize: 10, color: 'var(--live)', letterSpacing: '0.14em', marginBottom: 16 }}>▸ IS</div>
                <ul style={{ listStyle: 'none', fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.75 }}>
                  {['Commercial & strategic advisory', 'Financial modelling & valuation work', 'Document preparation (IMs, decks, agreements)', 'Transaction workstream coordination', 'Operational tooling & reporting design'].map(l => (
                    <li key={l} style={{ padding: '6px 0', borderBottom: '1px solid var(--line)', display: 'flex', gap: 10 }}>
                      <span style={{ color: 'var(--live)' }}>+</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: 28 }}>
                <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.14em', marginBottom: 16 }}>▸ IS NOT</div>
                <ul style={{ listStyle: 'none', fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.75 }}>
                  {['Financial product advice (no AFSL held)', 'Dealing or arranging in financial products', 'Authorised representative of any AFSL', 'Investment recommendations to retail clients', 'Legal, tax, or accounting advice'].map(l => (
                    <li key={l} style={{ padding: '6px 0', borderBottom: '1px solid var(--line)', display: 'flex', gap: 10 }}>
                      <span style={{ color: 'var(--text-4)' }}>−</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{ padding: '16px 28px', borderTop: '1px solid var(--line)', background: 'var(--ink-3)', fontFamily: 'var(--ff-mono)', fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.08em', lineHeight: 1.7 }}>
              // Engagements are delivered as commercial and strategic services to the engaging business. Clients retain their own licensed legal, tax, and financial advisors for regulated matters. Investment decisions rest with the client.
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .scope-disc { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </>
  );
}

/* ===========================================================
   Services Page — terminal-style segment browser
   =========================================================== */
function ServicesPage({ setPage }) {
  const segments = [
    { id: 'FND', label: 'Building Foundations', sub: 'For early-stage founders getting the structure right before going to market.', items: [
      { t: 'Equity Structuring & Co-Founder Alignment', d: 'Defensible splits and vesting frameworks that hold up as the business scales.' },
      { t: 'Shareholder & Commercial Agreements', d: 'ESOP frameworks, key contracts, and partnership terms — founder-protective, investor-friendly.' },
      { t: 'First Financial Model & Business Plan', d: 'Clean model of unit economics, cash runway, and revenue logic — the baseline every serious conversation references.' },
      { t: 'Entity Structuring', d: 'Company setup, holding structures, and jurisdictional considerations for future raises.' },
      { t: 'Product Prototyping & MVPs', d: 'Functional prototypes and demos to validate with early customers or support initial investor conversations.' },
    ]},
    { id: 'RSE', label: 'Raising Capital', sub: 'For founders preparing to raise from institutional or private capital — Seed through Series B.', items: [
      { t: 'Financial Models & Valuation', d: 'Unit economics, scenario analysis, valuation frameworks — built to withstand investor due diligence.' },
      { t: 'Pitch Decks & Investor Materials', d: 'Decks, IMs, one-pagers, teasers — built from scratch around your numbers, not a template.' },
      { t: 'Data Room & Process Support', d: 'Full DocSend build-out, model stress-testing, narrative refinement. Founder leads investor contact and decisions.' },
      { t: 'Investor Readiness & Coaching', d: 'Sharpen the narrative, pressure-test assumptions, rehearse the tough questions.' },
      { t: 'Investor-list Research & Preparation', d: 'Curated longlist research, stage/sector mapping, background on partners and precedents. Outreach and decisions remain with the founder.' },
    ]},
    { id: 'DPL', label: 'Fund Operations Support', sub: 'For operators of fund-like vehicles — structuring, documentation, and back-office work delivered under instruction. Investment decisions remain with licensed parties.', items: [
      { t: 'Structuring & Waterfall Modelling', d: 'Vehicle design options, GP/LP economics, distribution waterfalls, cross-border structuring — delivered as analysis alongside your legal and tax advisors.' },
      { t: 'Transaction Workstream Support', d: 'Commercial DD coordination, management presentation prep, memo drafting. Support for the process; investment recommendations remain with the IC.' },
      { t: 'Deal Documentation', d: 'Information memoranda, teasers, process letters, data room structuring — document preparation only.' },
      { t: 'LP Reporting Support', d: 'Template and format design for quarterly reports, capital-call notices, distribution statements. Administrative preparation, not fund operation.' },
      { t: 'Portfolio Analysis & M&A Screening', d: 'Revenue diversification, sector landscaping, bolt-on candidate research for operating businesses considering acquisitions.' },
    ]},
    { id: 'SCL', label: 'Scaling Operations', sub: 'For operators and CEOs professionalising commercial tooling, reporting, and exit readiness.', items: [
      { t: 'Strategic & Commercial Advisory', d: 'Market entry, revenue model design, pricing, and growth planning for established operators.' },
      { t: 'Board Packs & Stakeholder Reporting', d: 'Decision-oriented documents that build confidence with investors and partners.' },
      { t: 'Financial Systems & Dashboards', d: 'Custom models, KPI dashboards, operational reporting — at a fraction of enterprise cost.' },
      { t: 'Operational Tooling', d: 'Pricing, estimating, forecasting, workflow systems for businesses outgrowing spreadsheets.' },
      { t: 'Exit & Partner Readiness', d: 'Getting financials, story, and data room to the standard buyers expect.' },
    ]},
  ];
  const [active, setActive] = pUseState('FND');
  const seg = segments.find(s => s.id === active);

  const process = [
    { step: '01', t: 'Scoping call', d: '30-min intro to understand your situation. No charge.' },
    { step: '02', t: 'Proposal & scope', d: 'Written scope, deliverables, timeline, fixed fee or retainer.' },
    { step: '03', t: 'NDA & kickoff', d: 'Mutual NDA. Access to materials. Structured kickoff.' },
    { step: '04', t: 'Delivery & review', d: 'Iterative delivery with milestone check-ins.' },
  ];

  return (
    <>
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', paddingTop: 80 }}>
        <div className="t-micro" style={{ marginBottom: 28 }}>§ Capabilities</div>
        <h1 className="t-display" style={{ fontSize: 'clamp(35px, 5.4vw, 82px)', lineHeight: 1.02, letterSpacing: '-0.035em', maxWidth: 980, paddingBottom: '0.08em' }}>
          Every phase of the <em className="t-display-it t-muted">capital life-cycle</em>.
        </h1>
        <p style={{ marginTop: 40, maxWidth: 620, fontSize: 17, color: 'var(--text-2)', lineHeight: 1.6 }}>
          Four distinct segments, each scoped around the outcome rather than the hour. Every deliverable is shaped end-to-end by the principal.
        </p>
        <div style={{ marginTop: 64, maxWidth: 1100 }}>
          <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>§ Principle</div>
          <div className="t-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.3, letterSpacing: '-0.015em', color: 'var(--text-2)', fontStyle: 'italic', fontFamily: 'var(--ff-display)', borderTop: '1px solid var(--line)', paddingTop: 28 }}>
            Good capital work is <em style={{ color: 'var(--cream)' }}>boring on purpose</em>. Documented. Defensible. Ready for the harder question that comes next.
          </div>
        </div>
      </section>

      {/* Segment tabs */}
      <section style={{ borderBottom: '1px solid var(--line)', background: 'var(--ink-2)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="seg-tabs">
          {segments.map((s, i) => {
            const on = active === s.id;
            return (
              <button key={s.id} onClick={() => setActive(s.id)}
                style={{
                  padding: '28px 28px',
                  textAlign: 'left',
                  background: on ? 'var(--ink)' : 'transparent',
                  borderRight: i < 3 ? '1px solid var(--line)' : 'none',
                  borderTop: on ? '2px solid var(--live)' : '2px solid transparent',
                  color: on ? 'var(--text)' : 'var(--text-3)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}>
                <div className="t-mono" style={{ fontSize: 10, color: on ? 'var(--live)' : 'var(--text-4)', letterSpacing: '0.16em', marginBottom: 10 }}>
                  § {String(i + 1).padStart(2, '0')} · {s.id}
                </div>
                <div style={{ fontSize: 18, fontFamily: 'var(--ff-display)' }}>{s.label}</div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, alignItems: 'start' }} className="svc-body">
          <div style={{ position: 'sticky', top: 40 }}>
            <div className="t-mono" style={{ fontSize: 10, color: 'var(--live)', letterSpacing: '0.14em', marginBottom: 14 }}>
              ▸ ACTIVE · {seg.id}
            </div>
            <h2 className="t-display" style={{ fontSize: 44, color: 'var(--text)', lineHeight: 1.05, marginBottom: 16 }}>{seg.label}</h2>
            <p style={{ fontSize: 15, color: 'var(--text-3)', lineHeight: 1.7, marginBottom: 24 }}>{seg.sub}</p>
            {seg.id === 'DPL' && (
              <div style={{ border: '1px solid var(--line)', padding: 14, background: 'var(--ink-3)', fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.6, letterSpacing: '0.02em' }}>
                <span style={{ color: 'var(--text-4)' }}>// NOTE</span><br />
                Evara provides commercial and administrative support only. Structuring, documents, and analysis are delivered alongside your licensed legal, tax, and financial advisors. Investment decisions rest with the client and their AFSL-licensed intermediaries.
              </div>
            )}
          </div>
          <div>
            {seg.items.map((it, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 20, padding: '28px 0', borderTop: '1px solid var(--line)', borderBottom: i === seg.items.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.1em', paddingTop: 4 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 style={{ fontSize: 20, color: 'var(--text)', fontFamily: 'var(--ff-display)', fontWeight: 400, marginBottom: 6 }}>{it.t}</h4>
                  <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.65 }}>{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .svc-body { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Methodology — finance-forward, AI as ambient tool */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', background: 'linear-gradient(180deg, var(--paper-top) 0%, var(--paper-bot) 100%)', color: 'var(--paper-ink)', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.03)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60 }} className="ai-band">
          <div>
            <div className="t-mono" style={{ fontSize: 11, color: 'var(--paper-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>§04 · Methodology</div>
            <h2 className="t-display" style={{ fontSize: 52, lineHeight: 1, letterSpacing: '-0.03em' }}>
              How the work<br /><em className="t-display-it">gets done.</em>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.7, marginTop: 20, maxWidth: 480 }}>
              Every engagement runs on the same four-phase spine — scoping, building, reviewing, shipping. Institutional-grade output from a boutique operator, scaled by modern tooling the way prior decades scaled on Bloomberg and Excel.
            </p>
            <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.7, marginTop: 16, maxWidth: 480 }}>
              The thinking is mine. The craft is mine. The sign-off is mine.
            </p>
          </div>
          <div>
            <div style={{ border: '1px solid var(--line)', padding: 28, background: 'linear-gradient(180deg, var(--ink-3) 0%, var(--ink-2) 100%)', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.03)' }}>
              <div className="t-mono" style={{ fontSize: 10.5, color: 'var(--paper-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 22 }}>Engagement spine · four phases</div>
              {[
                ['01', 'Scope', 'Thesis, question set, and model architecture built by hand. Nothing begins until the shape of the work is clear.'],
                ['02', 'Build', 'Models, memos, and decks developed against the thesis. Claude, GPT, and Cursor deployed as leverage — the way Bloomberg and Capital IQ have been for decades.'],
                ['03', 'Review', 'Every number traced, every assumption stress-tested, every sentence rewritten until it would hold up in front of an IC.'],
                ['04', 'Ship', 'Delivered only once I would stake my name on it. Because I am.'],
              ].map(([n, h, d], i, arr) => (
                <div key={n} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16, padding: '18px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  <span className="t-mono" style={{ fontSize: 10.5, color: 'var(--paper-muted)', letterSpacing: '0.1em' }}>{n}</span>
                  <div>
                    <div style={{ fontSize: 16, color: 'var(--paper-ink)', fontFamily: 'var(--ff-display)', marginBottom: 4 }}>{h}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="t-mono" style={{ marginTop: 14, fontSize: 10.5, color: 'var(--paper-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Stack · Excel · Python · Claude · GPT · Cursor · Capital IQ
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .ai-band { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* Onboarding protocol — concrete next-step steps, distinct from methodology */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)' }}>
        <SectionHead num="05" eyebrow="Onboarding" title={<>From first call <em className="t-display-it">to kickoff.</em></>} />
        <div className="g4" style={{ borderTop: '1px solid var(--line)', borderLeft: '1px solid var(--line)' }}>
          {process.map((p, i) => (
            <div key={i} style={{ padding: 32, borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)', minHeight: 200 }}>
              <div className="t-mono" style={{ fontSize: 11, color: 'var(--live)', letterSpacing: '0.14em', marginBottom: 20 }}>▸ {p.step}</div>
              <div style={{ fontSize: 22, color: 'var(--text)', fontFamily: 'var(--ff-display)', marginBottom: 10 }}>{p.t}</div>
              <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.65 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-pad" style={{ paddingTop: 100, paddingBottom: 100, borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <h3 className="t-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1, color: 'var(--text)' }}>
            Right segment <em className="t-display-it t-muted">— unsure?</em>
          </h3>
          <button className="btn primary" onClick={() => setPage('Contact')}>Tell me what you need<span className="arrow" /></button>
        </div>
      </section>
    </>
  );
}

/* ===========================================================
   Track Record
   =========================================================== */
function TrackRecordPage({ setPage }) {
  const engagements = [
    { id: 'ENG-2026-01', sector: 'Health & Fitness', persona: 'BOARD · FRANCHISE', client: 'Franchise Group · Board Engagement', type: ['Structuring Analysis', 'Financial Modelling', 'Investor Materials'], detail: 'Supported the board on structuring analysis and document preparation alongside external counsel. Developed the full financial model — vehicle architecture, deployment logic, waterfall mechanics, scenario analysis. Produced the Information Memorandum and board-level presentation materials. Investment decisions and licensed dealings remain with the board and their AFSL-licensed advisors.' },
    { id: 'ENG-2026-02', sector: 'Beauty & Medical', persona: 'FOUNDER · SERIES A', client: 'Consumer Business · Founder & CEO', type: ['Commercial Agreements', 'Financial Model', 'Investor Deck'], detail: 'Engaged by the founder to prepare materials ahead of their first capital raise. Drafting key commercial agreements, building the financial model, developing the full investor deck. Narrative refinement, data room build-out, and investor-list research — each deliverable stress-tested before it leaves the desk. Investor contact and decisions led by the founder.' },
    { id: 'ENG-2026-03', sector: 'Legal Technology', persona: 'FOUNDER · EARLY-STAGE', client: 'Legaltech Platform · Founder', type: ['Strategic Advisory', 'Financial Modelling', 'Investor Readiness'], detail: 'Strategic advisor to the founder of an early-stage platform. Ongoing coaching, investor deck and multi-scenario model, end-to-end fundraising preparation. Supporting the founder on commercial positioning and capital strategy toward first institutional raise.' },
  ];

  return (
    <>
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', paddingTop: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'end' }} className="tr-hero">
          <div>
            <div className="t-micro" style={{ marginBottom: 28 }}>§ Track Record</div>
            <h1 className="t-display" style={{ fontSize: 'clamp(35px, 5.4vw, 82px)', lineHeight: 1.02, letterSpacing: '-0.035em' }}>
              The engagement <em className="t-display-it t-muted">ledger.</em>
            </h1>
          </div>
          <div>
            <div className="t-mono" style={{ fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.1em', marginBottom: 10 }}>ENGAGEMENT SCOPE</div>
            <div style={{ display: 'flex', gap: 32 }}>
              <div>
                <div className="t-display" style={{ fontSize: 48, color: 'var(--text-2)' }}>3</div>
                <div className="t-mono" style={{ fontSize: 10.5, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sectors</div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .tr-hero { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Flagship case-study pull-quote — editorial, full-bleed */}
      <section style={{ borderBottom: '1px solid var(--line)', background: 'var(--ink-2)', padding: '96px 72px' }} className="flagship-quote">
        <style>{`
          @media (max-width: 900px) {
            .flagship-quote { padding: 64px 28px !important; }
            .flagship-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 60, alignItems: 'start', maxWidth: 1280 }} className="flagship-grid">
          <div>
            <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>§ Flagship</div>
            <div className="t-mono" style={{ fontSize: 10.5, color: 'var(--live)', letterSpacing: '0.1em' }}>ENG-2026-03</div>
            <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.08em', marginTop: 4 }}>FOUNDER · EARLY-STAGE</div>
          </div>
          <div>
            <div className="t-display flagship-body" style={{ fontSize: 'clamp(22px, 2.94vw, 39px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text)', textWrap: 'pretty' }}>
              <style>{`.flagship-body em { display: inline !important; font-style: italic; color: var(--cream); }`}</style>
              "His knowledge across commercial agreements and financial modelling gave us a real sense of confidence. He understood our business quickly and delivered exactly what we needed to <em>move forward</em>."
            </div>
            <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 1, background: 'var(--line-2)' }} />
              <div>
                <div style={{ fontSize: 14, color: 'var(--text-2)' }}>Founder</div>
                <div className="t-mono" style={{ fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.08em' }}>Legaltech Platform</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement ledger */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ border: '1px solid var(--line)', background: 'var(--ink-2)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '130px 180px 1fr', padding: '14px 24px', background: 'var(--ink-3)', borderBottom: '1px solid var(--line)', fontFamily: 'var(--ff-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-4)' }} className="ledger-head">
            <span>ID</span><span>SECTOR</span><span>CLIENT · PERSONA · SCOPE</span>
          </div>
          {engagements.map((e, i) => (
            <details key={e.id} style={{ borderBottom: i < engagements.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <summary style={{ display: 'grid', gridTemplateColumns: '130px 180px 1fr', padding: '22px 24px', cursor: 'pointer', alignItems: 'center', listStyle: 'none' }} className="ledger-row">
                <span className="t-mono" style={{ fontSize: 11, color: 'var(--live)', letterSpacing: '0.06em' }}>{e.id}</span>
                <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.06em' }}>{e.sector}</span>
                <span>
                  <div style={{ fontSize: 17, color: 'var(--text)', fontFamily: 'var(--ff-display)', marginBottom: 4 }}>{e.client}</div>
                  <div className="t-mono" style={{ fontSize: 10, color: 'var(--live)', letterSpacing: '0.12em', marginBottom: 8 }}>{e.persona}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {e.type.map(t => <span key={t} style={{ padding: '3px 8px', border: '1px solid var(--line-2)', fontFamily: 'var(--ff-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.04em' }}>{t}</span>)}
                  </div>
                </span>
              </summary>
              <div className="tr-detail" style={{ padding: '4px 24px 26px' }}>
                <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.7, maxWidth: 820 }}>{e.detail}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', background: 'linear-gradient(180deg, var(--paper-top) 0%, var(--paper-bot) 100%)', color: 'var(--paper-ink)', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.03)' }}>
        <div className="t-mono" style={{ fontSize: 11, color: 'var(--paper-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>§03 · Client feedback</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40, maxWidth: 820 }} className="tm-grid">
          {[
            { q: 'Amar built a robust set of key company agreements, financial model, and investor deck. He was a key part of our team feeling confident approaching investors and being fully prepared.', a: 'Founder & CEO', s: 'Consumer · Beauty & Medical' },
          ].map((t, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--line)', paddingTop: 28 }}>
              <div className="t-display" style={{ fontSize: 26, lineHeight: 1.35, color: 'var(--paper-ink)', letterSpacing: '-0.01em' }}>
                "{t.q}"
              </div>
              <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 32, height: 1, background: 'var(--paper-ink)', opacity: 0.4 }} />
                <div>
                  <div style={{ fontSize: 14, color: 'var(--paper-ink)' }}>{t.a}</div>
                  <div className="t-mono" style={{ fontSize: 10.5, color: 'var(--paper-muted)', letterSpacing: '0.08em' }}>{t.s}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media (max-width: 900px) { .tm-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* NDA closing */}
      <section className="page-pad" style={{ paddingTop: 80, paddingBottom: 80, borderBottom: '1px solid var(--line)', textAlign: 'center' }}>
        <div className="t-micro" style={{ marginBottom: 16 }}>⎔ Under NDA</div>
        <h3 className="t-display" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.05, color: 'var(--text)', maxWidth: 860, margin: '0 auto 28px' }}>
          Detailed case studies, model samples, and client references available under <em className="t-display-it t-muted">mutual non-disclosure.</em>
        </h3>
        <button className="btn primary" onClick={() => setPage('Contact')}>Request access<span className="arrow" /></button>
      </section>
    </>
  );
}

/* ===========================================================
   Contact Page — with live AI-powered "scope my engagement"
   =========================================================== */
function ContactPage() {
  const [form, setForm] = pUseState({ name: '', email: '', company: '', stage: '', service: '', budget: '', timeline: '', message: '' });
  const [status, setStatus] = pUseState('idle');
  const [aiScope, setAiScope] = pUseState('');
  const [aiLoading, setAiLoading] = pUseState(false);
  const [aiResult, setAiResult] = pUseState('');

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
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', company: '', stage: '', service: '', budget: '', timeline: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  const generateScope = async () => {
    if (!aiScope.trim() || aiLoading) return;
    setAiLoading(true);
    setAiResult('');
    try {
      // In the Claude Design preview, window.claude.complete exists as a sandbox helper.
      // In production (Vercel), we call our own serverless function at /api/scope,
      // which proxies to the Anthropic API with the server-side API key + rate limiting.
      const useLocalPreview = typeof window !== 'undefined' && window.claude && typeof window.claude.complete === 'function';

      if (useLocalPreview) {
        const prompt = `You are a senior advisor at Evara Advisory (institutional advisory firm specialising in fund structuring, investor materials, and capital strategy). A prospect described their situation below. Respond with a crisp, one-page engagement scope in plain text only (no markdown).

Use this exact format with these headers on separate lines — do NOT use markdown symbols like # or *. Use plain text only.

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

Prospect situation: "${aiScope.trim()}"`;
        const text = await window.claude.complete(prompt);
        setAiResult(text);
      } else {
        const res = await fetch('/api/scope', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ situation: aiScope.trim() }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setAiResult(data?.error || 'Unable to generate right now. Please send the form below instead.');
        } else {
          setAiResult(data.text || 'Unable to generate right now. Please send the form below instead.');
        }
      }
    } catch (err) {
      setAiResult('Unable to generate right now. Please send the form below instead.');
    } finally {
      setAiLoading(false);
    }
  };

  const inputProps = (k) => ({ className: 'input', value: form[k], onChange: e => setForm({ ...form, [k]: e.target.value }) });

  if (status === 'sent') {
    return (
      <section className="page-pad" style={{ paddingTop: 140, paddingBottom: 140, textAlign: 'center', borderBottom: '1px solid var(--line)', minHeight: '70vh' }}>
        <div className="t-micro t-live" style={{ marginBottom: 20 }}>● Received</div>
        <h2 className="t-display" style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1 }}>
          Brief received.<br /><em className="t-display-it t-muted">Back in touch shortly.</em>
        </h2>
        <div className="t-mono" style={{ marginTop: 24, fontSize: 11.5, color: 'var(--text-4)', letterSpacing: '0.1em' }}>CONF-2026-{Math.floor(Math.random() * 900 + 100)}</div>
      </section>
    );
  }

  return (
    <>
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', paddingTop: 80 }}>
        <div className="t-micro" style={{ marginBottom: 28 }}>§ Contact</div>
        <h1 className="t-display" style={{ fontSize: 'clamp(35px, 5.4vw, 82px)', lineHeight: 0.95, letterSpacing: '-0.035em' }}>
          Send a <em className="t-display-it t-muted">brief.</em>
        </h1>
        <p style={{ marginTop: 28, maxWidth: 540, fontSize: 17, color: 'var(--text-2)', lineHeight: 1.6 }}>
          Every enquiry reviewed directly. NDA before any sensitive exchange. All correspondence treated as confidential.
        </p>
      </section>

      {/* Standard form — now the primary entry point */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 60, alignItems: 'start' }} className="form-wrap">
          <div>
            <div className="t-micro" style={{ marginBottom: 14 }}>§ Full brief · structured</div>
            <h3 className="t-display" style={{ fontSize: 32, lineHeight: 1.1, marginBottom: 24 }}>Send the full form.</h3>
            <div className="readout">
              <div className="readout-head"><span>Protocol</span></div>
              <div className="readout-body" style={{ padding: 16 }}>
                {['Intro call — no charge', 'Written proposal + fixed fee', 'Mutual NDA before materials', 'Milestone-based delivery'].map((l, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', padding: '6px 0', fontSize: 12.5, color: 'var(--text-2)' }}>
                    <span style={{ color: 'var(--text-4)' }}>0{i + 1}</span>{l}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <div className="t-micro" style={{ marginBottom: 10 }}>Reach</div>
              <a href="https://www.linkedin.com/in/amar-kashyap" target="_blank" rel="noreferrer" style={{ display: 'block', fontSize: 14, color: 'var(--text)' }}>LinkedIn ↗</a>
              <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>Sydney, Australia · AEST</div>
            </div>
          </div>

          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="fg">
              <div><label className="label">Name *</label><input required className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></div>
              <div><label className="label">Email *</label><input required type="email" className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="fg">
              <div><label className="label">Company</label><input className="input" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company / venture" /></div>
              <div><label className="label">Stage</label>
                <select className="input" value={form.stage} onChange={e => setForm({ ...form, stage: e.target.value })}>
                  {['', 'Pre-seed / Idea', 'Seed', 'Series A+', 'Established business', 'Franchise / multi-site', 'Angel investor', 'Fund manager / GP', 'Family office', 'Corporate / corp dev', 'Other'].map(v => <option key={v} value={v}>{v || 'Select…'}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="fg">
              <div><label className="label">Service of interest</label>
                <select className="input" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                  {['', 'Building Foundations', 'Raising Capital', 'Fund Operations Support', 'Scaling Operations', 'AI adoption', 'Not sure'].map(v => <option key={v} value={v}>{v || 'Select…'}</option>)}
                </select>
              </div>
              <div><label className="label">Indicative budget</label>
                <select className="input" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                  {['', 'Under $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+', 'Retainer', 'Not sure'].map(v => <option key={v} value={v}>{v || 'Select…'}</option>)}
                </select>
              </div>
            </div>
            <div><label className="label">Timeline</label>
              <select className="input" value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })}>
                {['', 'Urgent — this week', 'Within 2 weeks', 'Within a month', 'Flexible'].map(v => <option key={v} value={v}>{v || 'Select…'}</option>)}
              </select>
            </div>
            <div><label className="label">Brief *</label>
              <textarea required data-brief-textarea className="input" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="What are you trying to accomplish?" rows={5} />
              <p style={{ marginTop: 8, fontSize: 12.5, color: 'var(--text-3)', fontStyle: 'italic', lineHeight: 1.5 }}>
                Not sure how to articulate it? Sketch a rough scope below and paste it back in here.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <button type="submit" className="btn primary" disabled={status === 'sending' || !form.name || !form.email || !form.message}>
                {status === 'sending' ? 'Transmitting…' : 'Submit brief'}<span className="arrow" />
              </button>
              {status === 'error' && <span className="t-mono" style={{ fontSize: 11, color: '#D47056' }}>// TX FAILED — try again or reach via LinkedIn</span>}
              <span className="t-mono" style={{ fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.08em' }}>// ENCRYPTED IN TRANSIT</span>
            </div>
          </form>
          <style>{`
            @media (max-width: 900px) {
              .form-wrap { grid-template-columns: 1fr !important; }
              .fg { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* Bridge — plain copy invitation to the Scope Drafter below */}
      <section className="page-pad" style={{ paddingTop: 32, paddingBottom: 16 }}>
        <p style={{ fontSize: 15, color: 'var(--text-3)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.5, maxWidth: 620 }}>
          Unsure of scope? Use the AI-powered scope sketcher below to draft a starting point.
        </p>
      </section>

      {/* Scope drafter — AI as exploratory tool, not final proposal */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', background: 'var(--ink-2)', paddingTop: 48 }}>
        <div style={{ marginBottom: 24 }}>
          <div className="t-mono" style={{ fontSize: 11, color: 'var(--live)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
            <span className="dot live" style={{ display: 'inline-block', marginRight: 8, verticalAlign: 'middle' }} />
            Scope sketch
          </div>
          <h2 className="t-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: 780 }}>
            Unsure where you fit?<br /><em className="t-display-it t-muted">Sketch a rough scope.</em>
          </h2>
          <p style={{ marginTop: 12, fontSize: 14, color: 'var(--text-3)', maxWidth: 620 }}>
            A starting point to frame the conversation. Real scope comes from a call.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'stretch' }} className="ai-grid">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label className="label">Your situation</label>
            <textarea className="input" placeholder="e.g. Series A consumer brand, $3M ARR, 80% growth. Thinking of raising $8M. Need model, deck, and investor plan."
              value={aiScope} onChange={e => setAiScope(e.target.value)} rows={8} style={{ flex: 1, minHeight: 180 }} />
            <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="t-mono" style={{ fontSize: 9.5, color: 'var(--text-4)', letterSpacing: '0.1em', alignSelf: 'center', marginRight: 4 }}>EXAMPLES</span>
              {[
                'Seed-stage AI infra startup. Pre-revenue, $500k MRR pipeline. Raising $4M. Need to build first model + deck.',
                'Franchise group (22 sites) exploring a fund structure to roll up independent operators. Board is ready to engage.',
                'Family office with $40M deploying into private credit. Need a structuring memo and waterfall model for a first fund.',
                'PE-backed SaaS platform. $12M ARR, considering a $25M bolt-on. Need a diligence model + synergy case.',
              ].map((ex, i) => (
                <button key={i} type="button" onClick={() => setAiScope(ex)} style={{
                  padding: '5px 10px', fontFamily: 'var(--ff-mono)', fontSize: 10, color: 'var(--text-3)',
                  background: 'transparent', border: '1px solid var(--line)', cursor: 'pointer', letterSpacing: '0.04em',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--live)'; e.currentTarget.style.color = 'var(--live)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-3)'; }}>
                  · Ex {i + 1}
                </button>
              ))}
            </div>
            <button className="btn primary" onClick={generateScope} disabled={aiLoading || !aiScope.trim()} style={{ marginTop: 14 }}>
              {aiLoading ? 'Drafting…' : 'Sketch a scope'}<span className="arrow" />
            </button>
            <div className="t-mono" style={{ marginTop: 12, fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.08em' }}>
              // INDICATIVE SKETCH · REAL SCOPE COMES FROM A CALL
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label className="label">Scope sketch</label>
            <div style={{ background: 'var(--ink)', border: '1px solid var(--line)', padding: 20, flex: 1, minHeight: 240, maxHeight: 440, overflow: 'auto', fontFamily: 'var(--ff-mono)', fontSize: 12.5, lineHeight: 1.8, color: 'var(--text-2)', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
              {aiLoading && <span style={{ color: 'var(--live)' }}>▸ parsing brief…<br />▸ matching segment…<br />▸ drafting scope…</span>}
              {!aiLoading && !aiResult && <span style={{ color: 'var(--text-4)' }}>{'// Indicative sketch will appear here.'}</span>}
              {!aiLoading && aiResult && aiResult}
            </div>
            {!aiLoading && aiResult && (
              <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <button type="button" className="btn" onClick={() => {
                  setForm(f => ({ ...f, message: (f.message ? f.message + '\n\n— — —\n\n' : '') + 'Situation:\n' + aiScope.trim() + '\n\nScope sketch:\n' + aiResult.trim() }));
                  setTimeout(() => {
                    const el = document.querySelector('[data-brief-textarea]');
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 120;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                      el.focus({ preventScroll: true });
                    }
                  }, 60);
                }}>
                  Use sketch in brief above<span className="arrow" />
                </button>
                <span className="t-mono" style={{ fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.08em' }}>
                  // optional — edit freely before sending
                </span>
              </div>
            )}
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .ai-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </>
  );
}

Object.assign(window, { AboutPage, ServicesPage, TrackRecordPage, ContactPage });
