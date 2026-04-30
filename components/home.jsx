/* Evara Advisory — Home page (hero, capabilities, engagement shapes, credentials) */

const { useState: hUseState, useEffect: hUseEffect, useRef: hUseRef, useMemo: hUseMemo } = React;

/* Auto-calculated years in private markets — anchored to the first dated
   entry on the About timeline (January 2019, Institutional Banking at ANZ).
   Updates with every page load; advances automatically every month. */
const CAREER_START = new Date(2019, 0, 1); // January 2019 (month is 0-indexed)
function yearsInMarkets() {
  const now = new Date();
  const ms = now - CAREER_START;
  return (ms / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);
}

/* ===========================================================
   Hero
   =========================================================== */
function Hero({ setPage }) {
  return (
    <section className="page-pad page-hero-bg" style={{ borderBottom: '1px solid var(--line)', paddingTop: 72, paddingBottom: 72 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', gap: 40, marginBottom: 44 }} className="hero-top">
        <div>
          <div className="reveal is-in" style={{ marginBottom: 28 }}>
            <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              § Sydney · Est. 2026
            </span>
          </div>
          <h1 className="t-display" style={{ fontSize: 'clamp(35px, 5.4vw, 82px)', lineHeight: 0.94, letterSpacing: '-0.035em', color: 'var(--text)' }}>
            Commercial clarity, <br />
            <em className="t-display-it" style={{ color: 'var(--text-2)' }}>custom-built</em>.<span style={{ color: 'var(--text-4)' }}>*</span>
          </h1>
          <p style={{ marginTop: 24, maxWidth: 620, color: 'var(--text)', fontSize: 22, lineHeight: 1.35, fontFamily: 'var(--ff-display)', letterSpacing: '-0.01em' }}>
            Clarity on the decisions that move capital.
          </p>
          <p style={{ marginTop: 14, maxWidth: 600, color: 'var(--text-2)', fontSize: 16, lineHeight: 1.6 }}>
            Independent advisory built on institutional rigour — for founders raising,
            operators scaling, and allocators deploying.
          </p>
          <div style={{ marginTop: 34, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn primary" onClick={() => setPage('Contact')}>Book a call<span className="arrow" /></button>
            <button className="btn" onClick={() => setPage('Services')}>Capabilities</button>
            <button className="btn ghost" onClick={() => setPage('Track Record')}>See engagements →</button>
          </div>
        </div>

        {/* Right: principal card */}
        <div className="principal-card">
          <div className="readout" style={{ fontSize: 11.5 }}>
            <div className="readout-head">
              <span>Principal</span>
            </div>
            <div className="readout-body" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className="readout-line"><span className="k">NAME</span><span className="v">Amar Kashyap</span></div>
              <div className="readout-line"><span className="k">TENURE</span><span className="v">{yearsInMarkets()}+ yrs</span></div>
              <div className="readout-line"><span className="k">HERITAGE</span><span className="v">Banking · CVC · VC</span></div>
              <div className="readout-line"><span className="k">BASED</span><span className="v">Sydney · AU</span></div>
              <div className="readout-line"><span className="k">STACK</span><span className="v">Claude·GPT·Cursor</span></div>
            </div>
          </div>
        </div>
      </div>

      <p className="t-mono" style={{ fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.08em', marginBottom: 12 }}>
        * Patient on process. Rigorous on craft.
      </p>

    </section>
  );
}

/* ===========================================================
   Stats strip
   =========================================================== */
function StatsStrip() {
  const stats = [
    [`${yearsInMarkets()}+`, 'Years in private markets', '+yrs'],
    ['$10M+', 'Capital decisions supported prior to Evara', ''],
    ['1', 'Principal on every brief', 'sig'],
  ];
  return (
    <div className="g3" style={{ borderBottom: '1px solid var(--line)' }}>
      {stats.map(([v, l, tag], i) => (
        <div key={i} className="cell" style={{ padding: '36px 32px' }}>
          <div className="t-display" style={{ fontSize: 48, color: 'var(--text)', lineHeight: 1 }}>{v}</div>
          <div style={{ marginTop: 12, fontSize: 13, color: 'var(--text-3)', lineHeight: 1.5 }}>{l}</div>
          {tag && (
            <div className="t-mono" style={{ marginTop: 12, fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              <span className={tag === 'live' ? 'dot live' : 'dot'} style={{ display: 'inline-block', marginRight: 6, verticalAlign: 'middle' }} /> {tag}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ===========================================================
   Service segments — terminal-style readouts
   =========================================================== */
function ServiceSegments({ setPage }) {
  const segs = [
    { id: 'FND', label: 'Building Foundations', note: 'Early-stage founders', items: ['Equity & vesting', 'Shareholder agreements', 'First financial model', 'Entity structuring'] },
    { id: 'RSE', label: 'Raising Capital', note: 'Seed → Series B', items: ['Models · valuation', 'Investor materials', 'Data room build', 'Process management'] },
    { id: 'DPL', label: 'Fund Operations Support', note: 'GPs · LPs · Family offices', items: ['Structuring analysis', 'Transaction workstreams', 'Waterfall modelling', 'LP reporting support'] },
    { id: 'SCL', label: 'Scaling Operations', note: 'Operators & CEOs', items: ['Board packs', 'KPI dashboards', 'Operational tooling', 'Exit readiness'] },
  ];
  return (
    <section className="page-pad" style={{ borderBottom: '1px solid var(--line)' }}>
      <Reveal><SectionHead num="02" eyebrow="CAPABILITIES" title={<>Four phases. <em className="t-display-it">One operator.</em></>} kicker="Scoped around outcomes, not hours. From the first term sheet to the eventual exit." /></Reveal>

      <div className="g4 svc-seg-grid" style={{ borderTop: '1px solid var(--line)', borderLeft: '1px solid var(--line)' }}>
        {segs.map((s, i) => (
          <div key={s.id} style={{ borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: 28, background: 'var(--ink-2)', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'background 0.2s', height: '100%' }}
            onClick={() => setPage('Services')}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--ink-3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--ink-2)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, gap: 12 }}>
              <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.16em' }}>§{String(i + 1).padStart(2, '0')} · {s.id}</span>
              <span className="t-mono" style={{ fontSize: 9.5, color: 'var(--live)', letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'right' }}>{s.note}</span>
            </div>
            <h3 className="t-display" style={{ fontSize: 26, color: 'var(--text)', lineHeight: 1.15, marginBottom: 18 }}>{s.label}</h3>
            <ul style={{ listStyle: 'none', marginTop: 'auto' }}>
              {s.items.map(it => (
                <li key={it} style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, color: 'var(--text-2)', padding: '4px 0', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--text-4)' }}>▸</span>{it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <style>{`
        .svc-seg-grid { display: grid; grid-template-columns: repeat(4, 1fr); align-items: stretch; }
        .svc-seg-grid > div { min-height: 280px; }
        @media (max-width: 1100px) { .svc-seg-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .svc-seg-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ===========================================================
   Home page
   =========================================================== */
function HomePage({ setPage }) {
  return (
    <>
      <Ticker />
      <Hero setPage={setPage} />
      <StatsStrip />

      <ServiceSegments setPage={setPage} />

      {/* Engagement shapes — how clients typically engage */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', background: 'var(--ink-2)' }}>
        <Reveal><SectionHead num="03" eyebrow="ENGAGEMENT SHAPES" title={<>Three ways the <em className="t-display-it">work</em> typically arrives.</>} kicker="Every brief is bespoke — but patterns emerge. Most engagements fit one of these shapes." /></Reveal>
        <div className="shapes-grid" style={{ borderTop: '1px solid var(--line)', borderLeft: '1px solid var(--line)' }}>
          <style>{`
            .shapes-grid { display: grid; grid-template-columns: repeat(3, 1fr); align-items: stretch; }
            .shapes-grid > div { min-height: 260px; }
            @media (max-width: 900px) { .shapes-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          {[
            { num: '01', label: 'The Single Workstream', sub: 'Defined scope · finite', desc: 'A model, a deck, a memo. Scoped against one deliverable with a clear definition of done. Engagement closes when the artifact is signed off.', signal: 'Scoped · Delivered · Closed' },
            { num: '02', label: 'The Transaction', sub: 'Pre-round → signing', desc: 'Working alongside the client and their advisors through a raise, a sale, or a restructure. Parallel workstreams: model, materials, diligence, negotiation support.', signal: 'Active · Multi-stream' },
            { num: '03', label: 'The Standing Seat', sub: 'Retained · quarterly', desc: 'A rolling engagement with a board or founder — attending key meetings, stress-testing decisions, preparing materials as they arise. Capital-strategy function, fractional.', signal: 'Retained · Selective' },
          ].map((s, i) => (
            <div key={s.num} style={{ padding: '32px 28px', borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22, gap: 12 }}>
                <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.14em' }}>§ {s.num}</span>
                <span className="t-mono" style={{ fontSize: 9.5, color: 'var(--text-3)', letterSpacing: '0.1em', textAlign: 'right' }}>{s.signal}</span>
              </div>
              <div className="t-display" style={{ fontSize: 26, color: 'var(--text)', letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: 6 }}>{s.label}</div>
              <div className="t-mono" style={{ fontSize: 10.5, color: 'var(--text-3)', letterSpacing: '0.06em', marginBottom: 22 }}>{s.sub}</div>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65, flex: 1 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, fontFamily: 'var(--ff-mono)', fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.08em' }}>
          // Commercial terms discussed privately · always shaped to the engagement
        </div>
      </section>

      {/* Pull quote */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', background: 'linear-gradient(180deg, var(--paper-top) 0%, var(--paper-bot) 100%)', color: 'var(--paper-ink)', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.03)' }}>
        <div style={{ maxWidth: 1040 }}>
          <div className="t-mono" style={{ fontSize: 11, color: 'var(--paper-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 24 }}>
            Client · Consumer · Medical
          </div>
          <blockquote className="t-display" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.1, color: 'var(--paper-ink)', letterSpacing: '-0.015em' }}>
            "A key part of our team feeling <em className="t-display-it">confident</em> approaching investors and being fully prepared."
          </blockquote>
          <div style={{ marginTop: 32, display: 'flex', gap: 28, alignItems: 'center' }}>
            <div style={{ width: 56, height: 1, background: 'var(--paper-ink)', opacity: 0.4 }} />
            <div>
              <div style={{ fontSize: 14, color: 'var(--paper-ink)' }}>Founder & CEO</div>
              <div className="t-mono" style={{ fontSize: 11, color: 'var(--paper-muted)', letterSpacing: '0.08em' }}>Consumer business · Beauty & medical</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-pad" style={{ paddingTop: 120, paddingBottom: 120, textAlign: 'center', borderBottom: '1px solid var(--line)' }}>
        <Reveal>
          <div className="t-mono" style={{ fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>→ Next step</div>
          <h2 className="t-display" style={{ fontSize: 'clamp(20px, 3vw, 42px)', lineHeight: 1, color: 'var(--text)', letterSpacing: '-0.03em' }}>
            Send a brief.<br /><em className="t-display-it t-muted">The conversation starts there.</em>
          </h2>
          <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', gap: 12 }}>
            <button className="btn primary" onClick={() => setPage('Contact')}>Start a conversation<span className="arrow" /></button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

Object.assign(window, { HomePage });
