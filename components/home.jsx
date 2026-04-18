/* Evara Advisory — Home page (hero, live model, pipeline, credentials) */

const { useState: hUseState, useEffect: hUseEffect, useRef: hUseRef, useMemo: hUseMemo } = React;

/* Auto-calculated years in private markets — anchored to mid-2018 start.
   Updates with every page load; advances automatically every month. */
const CAREER_START = new Date(2018, 6, 1); // July 2018 (month is 0-indexed)
function yearsInMarkets() {
  const now = new Date();
  const ms = now - CAREER_START;
  return (ms / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);
}

/* ===========================================================
   Live Valuation Workbench — the single interactive artifact.
   Five inputs, three scenarios, a sensitivity matrix, a cap-table
   readout, and a 3Y projection. One slider moves the whole thing.
   =========================================================== */
function LiveValuation() {
  // Base inputs — all $k except percentages
  const [arr, setArr] = hUseState(4200);
  const [growth, setGrowth] = hUseState(85);
  const [mult, setMult] = hUseState(6.5);
  const [burn, setBurn] = hUseState(180);
  const [round, setRound] = hUseState(12000);
  const [scenario, setScenario] = hUseState('BASE'); // BEAR · BASE · BULL

  // Scenario multipliers applied to growth & multiple
  const scn = {
    BEAR: { g: 0.55, m: 0.70, label: 'Downside' },
    BASE: { g: 1.00, m: 1.00, label: 'Base case' },
    BULL: { g: 1.25, m: 1.25, label: 'Upside' },
  }[scenario];

  const g = growth * scn.g;
  const m = mult * scn.m;

  // Projection — growth tapers as business scales
  const yr1 = arr * (1 + g / 100);
  const yr2 = yr1 * (1 + (g * 0.85) / 100);
  const yr3 = yr2 * (1 + (g * 0.70) / 100);

  const preMoneyK = yr2 * m;                                      // implied pre-money $k
  const postMoneyK = preMoneyK + round;                           // post-money $k
  const preMoneyM = preMoneyK / 1000;
  const postMoneyM = postMoneyK / 1000;
  const runway = (round / burn);                                  // months
  const dilution = (round / postMoneyK) * 100;                    // % new investor
  const founderPct = 100 - dilution - 10;                         // assume 10% ESOP carve-out
  const esopPct = 10;
  const impliedArrMult = preMoneyK / arr;                         // current ARR multiple
  // Implied MOIC: what does a new investor get at Y3 exit vs Y2 entry
  const exitVal = yr3 * m;                                        // crude Y3 exit $k
  const investorStakeValue = exitVal * (dilution / 100);          // their slice at exit
  const impliedMoic = investorStakeValue / round;                 // MOIC multiple

  const fmt = n => Number(n).toLocaleString('en-AU', { maximumFractionDigits: 0 });
  const fmtM = n => Number(n).toLocaleString('en-AU', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const fmtPct = n => Number(n).toLocaleString('en-AU', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  const Slider = ({ label, value, setValue, min, max, step, suffix = '', prefix = '' }) => (
    <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</span>
        <span className="t-mono" style={{ fontSize: 13, color: 'var(--text)' }}>{prefix}{fmt(value)}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => setValue(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--live)', height: 4 }}
      />
    </div>
  );

  // Projection chart data (Y0..Y3)
  const chartData = [arr, yr1, yr2, yr3];
  const chartMax = Math.max(...chartData);
  const bar = v => (v / chartMax) * 100;

  // Sensitivity matrix: multiple (cols) × growth (rows) at Y2
  const growthAxis = [Math.max(20, growth - 30), growth - 15, growth, growth + 15, Math.min(200, growth + 30)];
  const multAxis = [Math.max(3, mult - 2), mult - 1, mult, mult + 1, Math.min(15, mult + 2)];
  const sensMatrix = growthAxis.map(gx => multAxis.map(mx => {
    const y1 = arr * (1 + gx / 100);
    const y2 = y1 * (1 + (gx * 0.85) / 100);
    return (y2 * mx) / 1000; // $m
  }));
  const sensMin = Math.min(...sensMatrix.flat());
  const sensMax = Math.max(...sensMatrix.flat());
  const sensHeat = v => {
    const t = (v - sensMin) / Math.max(0.01, (sensMax - sensMin));
    return `rgba(79,191,137,${0.06 + t * 0.42})`;
  };

  return (
    <div style={{ border: '1px solid var(--line)', background: 'var(--ink-2)' }} className="live-model">
      <style>{`
        input[type=range] { -webkit-appearance: none; appearance: none; background: var(--line); border-radius: 2px; }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px; height: 14px; border-radius: 50%;
          background: var(--live); border: 2px solid var(--ink-2); cursor: grab;
        }
        input[type=range]::-moz-range-thumb {
          width: 14px; height: 14px; border-radius: 50%;
          background: var(--live); border: 2px solid var(--ink-2); cursor: grab;
        }
        .lv-top { display: grid; grid-template-columns: 1fr 1.25fr; }
        .lv-bottom { display: grid; grid-template-columns: 1.2fr 1fr; border-top: 1px solid var(--line); }
        .lv-scen-tabs { display: grid; grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 1050px) {
          .lv-top, .lv-bottom { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Header bar */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', background: 'var(--ink-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span className="t-mono" style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
          <span className="dot live" style={{ display: 'inline-block', marginRight: 8, verticalAlign: 'middle' }} />
          Valuation Workbench · Draft 04 · LIVE
        </span>
        <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)' }}>/models/valuation.xlsx · Δ recalc 12ms</span>
      </div>

      {/* Scenario tabs */}
      <div className="lv-scen-tabs" style={{ borderBottom: '1px solid var(--line)' }}>
        {['BEAR', 'BASE', 'BULL'].map((s, i) => {
          const on = scenario === s;
          const lbl = { BEAR: 'Downside', BASE: 'Base case', BULL: 'Upside' }[s];
          const mult = { BEAR: '0.55× / 0.70×', BASE: '1.00× / 1.00×', BULL: '1.25× / 1.25×' }[s];
          return (
            <button key={s} onClick={() => setScenario(s)}
              style={{
                padding: '14px 18px', textAlign: 'left',
                background: on ? 'var(--ink)' : 'transparent',
                borderRight: i < 2 ? '1px solid var(--line)' : 'none',
                borderTop: on ? '2px solid var(--live)' : '2px solid transparent',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
              <div className="t-mono" style={{ fontSize: 9.5, color: on ? 'var(--live)' : 'var(--text-4)', letterSpacing: '0.14em', marginBottom: 4 }}>
                § {i + 1} · {s}
              </div>
              <div style={{ fontSize: 14, color: on ? 'var(--text)' : 'var(--text-3)', fontFamily: 'var(--ff-display)' }}>{lbl}</div>
              <div className="t-mono" style={{ fontSize: 9.5, color: 'var(--text-4)', letterSpacing: '0.08em', marginTop: 2 }}>
                g / m · {mult}
              </div>
            </button>
          );
        })}
      </div>

      {/* ---------- TOP: inputs (left) · headline valuation + cap table (right) ---------- */}
      <div className="lv-top">
        {/* Inputs */}
        <div style={{ borderRight: '1px solid var(--line)' }}>
          <div style={{ padding: '10px 18px', background: 'var(--ink-3)', borderBottom: '1px solid var(--line)' }}>
            <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Inputs · drag to explore</span>
          </div>
          <Slider label="Current ARR" value={arr} setValue={setArr} min={500} max={20000} step={100} prefix="$" suffix="k" />
          <Slider label="Growth Rate Y1 (base)" value={growth} setValue={setGrowth} min={20} max={200} step={5} suffix="%" />
          <Slider label="Revenue Multiple (base)" value={mult} setValue={setMult} min={3} max={15} step={0.5} suffix="×" />
          <Slider label="Monthly Burn" value={burn} setValue={setBurn} min={50} max={500} step={10} prefix="$" suffix="k" />
          <Slider label="Round Size" value={round} setValue={setRound} min={1000} max={30000} step={500} prefix="$" suffix="k" />
        </div>

        {/* Headline + cap table */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '22px 24px', borderBottom: '1px solid var(--line)' }}>
            <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
              Implied pre-money · {scn.label}
            </div>
            <div className="t-display" style={{ fontSize: 64, color: 'var(--text)', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.02em' }}>
              ${fmtM(preMoneyM)}<span style={{ fontSize: 26, color: 'var(--text-3)', marginLeft: 4 }}>m</span>
            </div>
            <div className="t-mono" style={{ marginTop: 6, fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em' }}>
              Post-money <span style={{ color: 'var(--text-2)' }}>${fmtM(postMoneyM)}m</span>
              <span style={{ color: 'var(--text-4)', margin: '0 10px' }}>·</span>
              Implied on current ARR <span style={{ color: 'var(--text-2)' }}>{fmtPct(impliedArrMult)}×</span>
            </div>
          </div>

          {/* KPI strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              ['RUNWAY', `${runway.toFixed(1)}mo`, runway >= 18 ? 'var(--live)' : runway >= 12 ? 'var(--text)' : 'var(--warn)'],
              ['DILUTION', `${fmtPct(dilution)}%`, dilution <= 20 ? 'var(--live)' : dilution <= 30 ? 'var(--text)' : 'var(--warn)'],
              ['Y3 ARR', `$${fmtM(yr3 / 1000)}m`, 'var(--text)'],
              ['MOIC·Y3', `${impliedMoic.toFixed(1)}×`, impliedMoic >= 3 ? 'var(--live)' : impliedMoic >= 2 ? 'var(--text)' : 'var(--warn)'],
            ].map(([k, v, c], i) => (
              <div key={k} style={{ padding: '16px 22px', borderRight: i < 3 ? '1px solid var(--line)' : 'none', borderBottom: '1px solid var(--line)' }}>
                <div className="t-mono" style={{ fontSize: 9.5, color: 'var(--text-4)', letterSpacing: '0.14em', marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: 19, color: c, fontFamily: 'var(--ff-display)', fontWeight: 400 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Post-round cap table strip */}
          <div style={{ padding: '18px 24px', flex: 1 }}>
            <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
              Post-round cap table · indicative
            </div>
            <div style={{ display: 'flex', height: 10, background: 'var(--line)', borderRadius: 1, overflow: 'hidden', marginBottom: 14 }}>
              <div style={{ width: `${founderPct}%`, background: 'var(--text-2)', transition: 'width 0.3s' }} />
              <div style={{ width: `${dilution}%`, background: 'var(--live)', opacity: 0.85, transition: 'width 0.3s' }} />
              <div style={{ width: `${esopPct}%`, background: 'var(--text-4)', transition: 'width 0.3s' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, fontFamily: 'var(--ff-mono)', fontSize: 11 }}>
              {[
                ['Founders + existing', founderPct, 'var(--text-2)'],
                ['New investor', dilution, 'var(--live)'],
                ['ESOP (reserved)', esopPct, 'var(--text-4)'],
              ].map(([l, p, c]) => (
                <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                    <span style={{ width: 8, height: 8, background: c, display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-3)', fontSize: 9.5, letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{l}</span>
                  </div>
                  <span style={{ color: 'var(--text)', fontSize: 14 }}>{fmtPct(Math.max(0, p))}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- BOTTOM: sensitivity matrix (left) · 3Y projection (right) ---------- */}
      <div className="lv-bottom">
        {/* Sensitivity */}
        <div style={{ borderRight: '1px solid var(--line)', padding: '20px 24px' }}>
          <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
            Sensitivity · Y2 pre-money $m · growth × multiple
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--ff-mono)', fontSize: 11 }}>
            <thead>
              <tr>
                <th style={{ padding: '6px 4px', textAlign: 'left', color: 'var(--text-4)', fontWeight: 400, fontSize: 10, letterSpacing: '0.08em', borderBottom: '1px solid var(--line)' }}>g \ m×</th>
                {multAxis.map(mx => (
                  <th key={mx} style={{ padding: '6px 4px', textAlign: 'right', color: 'var(--text-3)', fontWeight: 400, borderBottom: '1px solid var(--line)' }}>
                    {mx.toFixed(1)}×
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sensMatrix.map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '8px 4px', color: 'var(--text-3)', borderBottom: '1px solid var(--line)' }}>{growthAxis[i].toFixed(0)}%</td>
                  {row.map((v, j) => {
                    const isCenter = i === 2 && j === 2;
                    return (
                      <td key={j} style={{
                        padding: '8px 4px', textAlign: 'right',
                        background: sensHeat(v),
                        color: isCenter ? 'var(--live)' : 'var(--text)',
                        borderBottom: '1px solid var(--line)',
                        outline: isCenter ? '1px solid var(--live)' : 'none',
                        fontWeight: isCenter ? 500 : 400,
                      }}>${fmtM(v)}</td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="t-mono" style={{ marginTop: 10, fontSize: 9.5, color: 'var(--text-4)', letterSpacing: '0.08em' }}>
            // green = higher valuation · outlined cell = current inputs
          </div>
        </div>

        {/* 3Y projection chart */}
        <div style={{ padding: '20px 24px' }}>
          <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            ARR projection · 3Y · {scn.label.toLowerCase()}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, alignItems: 'end', height: 160 }}>
            {chartData.map((v, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                <span className="t-mono" style={{ fontSize: 10.5, color: 'var(--text-2)' }}>${fmtM(v / 1000)}m</span>
                <div style={{ width: '100%', height: `${bar(v)}%`, background: i === 0 ? 'var(--line-2)' : 'var(--live)', opacity: i === 0 ? 0.6 : 0.3 + i * 0.22, transition: 'height 0.3s ease', minHeight: 2 }} />
                <span className="t-mono" style={{ fontSize: 9.5, color: 'var(--text-4)', letterSpacing: '0.1em' }}>Y{i}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--ff-mono)', fontSize: 10.5, color: 'var(--text-3)' }}>
            <span>CAGR <span style={{ color: 'var(--text)' }}>{fmtPct((Math.pow(yr3 / arr, 1/3) - 1) * 100)}%</span></span>
            <span>Y2 × mult <span style={{ color: 'var(--text)' }}>{fmtPct(m)}×</span></span>
          </div>
        </div>
      </div>

      <div style={{ padding: '10px 18px', borderTop: '1px solid var(--line)', background: 'var(--ink-3)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--ff-mono)', fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.08em', flexWrap: 'wrap', gap: 8 }}>
        <span>// LIVE · SCENARIO {scenario} · DRAG INPUTS TO RECOMPUTE</span>
        <span>INDICATIVE · SIMPLIFIED FOR DEMONSTRATION</span>
      </div>
    </div>
  );
}


/* ===========================================================
   Deal Pipeline — animated small-multiples
   =========================================================== */
function DealPipeline() {
  const stages = [
    { name: 'Brief', count: 8, pct: 100 },
    { name: 'NDA', count: 6, pct: 75 },
    { name: 'Scoping', count: 5, pct: 62 },
    { name: 'Engaged', count: 3, pct: 38 },
    { name: 'Closed', count: 2, pct: 25 },
  ];
  return (
    <div style={{ border: '1px solid var(--line)', background: 'var(--ink-2)' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', background: 'var(--ink-3)', display: 'flex', justifyContent: 'space-between' }}>
        <span className="t-mono" style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
          Pipeline · Rolling 90d
        </span>
        <span className="t-mono" style={{ fontSize: 10, color: 'var(--live)' }}>● SYNC</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {stages.map((s, i) => (
          <div key={s.name} style={{ padding: 20, borderRight: i < stages.length - 1 ? '1px solid var(--line)' : 'none' }}>
            <div className="t-micro" style={{ color: 'var(--text-4)', marginBottom: 14 }}>{String(i + 1).padStart(2, '0')} · {s.name}</div>
            <div className="t-display" style={{ fontSize: 38, color: 'var(--text)' }}>{s.count}</div>
            <div style={{ height: 2, background: 'var(--line)', marginTop: 14, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, width: `${s.pct}%`, background: 'var(--live)', opacity: 0.7 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===========================================================
   Hero
   =========================================================== */
function Hero({ setPage }) {
  return (
    <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', paddingTop: 72, paddingBottom: 72 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', gap: 40, marginBottom: 44 }} className="hero-top">
        <div>
          <div className="reveal is-in" style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 28 }}>
            <span className="pill live"><span className="dot live" /> Three mandates live · Q2 2026</span>
            <span className="t-mono" style={{ fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.1em' }}>
              ENG-2026-03
            </span>
          </div>
          <h1 className="t-display" style={{ fontSize: 'clamp(56px, 8.4vw, 128px)', lineHeight: 0.94, letterSpacing: '-0.035em', color: 'var(--text)' }}>
            Capital, <em className="t-display-it" style={{ color: 'var(--text-2)' }}>carefully</em> <br />
            placed.<span style={{ color: 'var(--text-4)' }}>*</span>
          </h1>
          <p style={{ marginTop: 24, maxWidth: 600, color: 'var(--text-2)', fontSize: 17, lineHeight: 1.6 }}>
            Transaction support and strategic advisory — for founders raising,
            operators scaling, and allocators deploying. Seven years across
            institutional banking, corporate venture, venture capital, private
            equity, and investment advisory. I don't specialise by sector — I
            specialise in <em style={{ color: 'var(--cream)', fontStyle: 'italic' }}>capital questions</em>:
            how to raise it, price it, deploy it, and defend it.
          </p>
          <div style={{ marginTop: 34, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn primary" onClick={() => setPage('Contact')}>Book a call<span className="arrow" /></button>
            <button className="btn" onClick={() => setPage('Services')}>Capabilities</button>
            <button className="btn ghost" onClick={() => setPage('Track Record')}>See engagements →</button>
          </div>
        </div>

        {/* Right: principal card + mini proof-of-craft teaser */}
        <div style={{ minWidth: 300, display: 'flex', flexDirection: 'column', gap: 12 }} className="principal-card">
          <div className="readout" style={{ fontSize: 11.5 }}>
            <div className="readout-head">
              <span>Principal</span>
              <span style={{ color: 'var(--live)' }}>● ACTIVE</span>
            </div>
            <div className="readout-body" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className="readout-line"><span className="k">NAME</span><span className="v">Amar Kashyap</span></div>
              <div className="readout-line"><span className="k">TENURE</span><span className="v">{yearsInMarkets()}+ yrs</span></div>
              <div className="readout-line"><span className="k">HERITAGE</span><span className="v">Banking · CVC · VC/PE</span></div>
              <div className="readout-line"><span className="k">BASED</span><span className="v">Sydney · AU</span></div>
              <div className="readout-line"><span className="k">STACK</span><span className="v">Claude·GPT·Cursor</span></div>
            </div>
          </div>

          {/* Mini proof-of-craft teaser — static "sample deliverable" snapshot */}
          <a href="#workbench" onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('workbench');
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
            }} style={{ display: 'block', border: '1px solid var(--line)', background: 'var(--ink-2)', padding: 14, textDecoration: 'none', cursor: 'pointer', transition: 'border-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--live)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span className="t-mono" style={{ fontSize: 9.5, color: 'var(--text-4)', letterSpacing: '0.12em' }}>§ SAMPLE · VALUATION MODEL</span>
              <span className="t-mono" style={{ fontSize: 9, color: 'var(--live)' }}>● LIVE ↓</span>
            </div>
            {/* tiny bar chart teaser */}
            <div style={{ display: 'flex', alignItems: 'end', gap: 4, height: 42, marginBottom: 10 }}>
              {[22, 38, 56, 78].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--live)', opacity: 0.25 + i * 0.2 }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--ff-mono)', fontSize: 10, color: 'var(--text-3)' }}>
              <span>Y0 → Y3 ARR</span>
              <span style={{ color: 'var(--text-2)' }}>Drive it ↓</span>
            </div>
          </a>
        </div>
      </div>

      <p className="t-mono" style={{ fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.08em', marginBottom: 12 }}>
        * Patient on process. Rigorous on craft.
      </p>

      <style>{`
        @media (max-width: 1000px) {
          .hero-top { grid-template-columns: 1fr !important; }
          .principal-card { max-width: 100%; }
        }
      `}</style>
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
    ['3', 'Active mandates', 'live'],
    ['1', 'Principal on every brief', 'sig'],
  ];
  return (
    <div className="g4" style={{ borderBottom: '1px solid var(--line)' }}>
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
   Dilution × Valuation Heatmap — second proof-of-craft artifact.
   Shows implied founder ownership across a grid of (round size) × (pre-money).
   Editorial framing — "the geometry of a raise".
   =========================================================== */
function DilutionHeatmap() {
  const rounds = [1, 2, 3, 5, 8, 12, 20];           // $m
  const preMoneys = [8, 15, 25, 40, 60, 90, 140];   // $m

  const [esop, setEsop] = hUseState(10);            // % ESOP reserved pre-round
  // Pin a specific cell (row, col) for the readout. Hover also updates it transiently.
  const [pinned, setPinned] = hUseState({ r: 3, c: 3 });   // center-ish default
  const [hover, setHover] = hUseState(null);               // {r,c} or null
  const active = hover || pinned;

  // Founder % post-round, accounting for ESOP carve-out (taken from pre, diluting founders pre-new-investor)
  // Simplified mechanic: investor % = round / (pre + round). Remainder splits into founders + ESOP.
  const founderOf = (r, pre) => {
    const investorPct = (r / (pre + r)) * 100;
    return Math.max(0, 100 - investorPct - esop);
  };
  const investorOf = (r, pre) => (r / (pre + r)) * 100;
  const postMoneyOf = (r, pre) => pre + r;

  const grid = rounds.map(r => preMoneys.map(pre => founderOf(r, pre)));
  const allVals = grid.flat();
  const min = Math.min(...allVals);
  const max = Math.max(...allVals);
  const heat = v => {
    const t = (v - min) / Math.max(0.01, max - min);
    return `rgba(79,191,137,${0.06 + t * 0.42})`;
  };

  // Active cell metrics
  const aRound = rounds[active.r];
  const aPre = preMoneys[active.c];
  const aFounder = founderOf(aRound, aPre);
  const aInvestor = investorOf(aRound, aPre);
  const aPost = postMoneyOf(aRound, aPre);
  const aPricePerShareMult = aPre / 10;  // arbitrary "per $10m notional"; illustrative multiple

  const fmtM = n => Number(n).toLocaleString('en-AU', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div style={{ border: '1px solid var(--line)', background: 'var(--ink-2)' }} className="dilution-heatmap">
      <style>{`
        .dh-grid { display: grid; grid-template-columns: 1.6fr 1fr; }
        @media (max-width: 980px) { .dh-grid { grid-template-columns: 1fr !important; } }
        .dh-cell { transition: background 0.15s, outline 0.15s, transform 0.1s; cursor: pointer; position: relative; }
        .dh-cell:hover { outline: 1px solid var(--text-3); z-index: 1; }
        .dh-cell.pinned { outline: 2px solid var(--live) !important; z-index: 2; }
        .dh-cell.row-active, .dh-cell.col-active { outline: 1px dashed rgba(79,191,137,0.4); }
      `}</style>

      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', background: 'var(--ink-3)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span className="t-mono" style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
          <span className="dot live" style={{ display: 'inline-block', marginRight: 8, verticalAlign: 'middle' }} />
          The geometry of a raise · Dilution × Valuation · INTERACTIVE
        </span>
        <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)' }}>/models/dilution-matrix.xlsx · Δ recalc on ESOP</span>
      </div>

      {/* ESOP slider */}
      <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.12em', textTransform: 'uppercase', minWidth: 140 }}>ESOP carve-out · pre</span>
        <input type="range" min={0} max={20} step={1} value={esop} onChange={e => setEsop(Number(e.target.value))}
          style={{ flex: 1, minWidth: 200, accentColor: 'var(--live)', height: 4 }} />
        <span className="t-mono" style={{ fontSize: 13, color: 'var(--text)', minWidth: 40, textAlign: 'right' }}>{esop}%</span>
      </div>

      <div className="dh-grid">
        {/* ===== LEFT: the interactive matrix ===== */}
        <div style={{ padding: '20px 24px', borderRight: '1px solid var(--line)', minWidth: 0 }}>
          <div className="t-mono" style={{ fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.1em', marginBottom: 14 }}>
            Founder % post-round · rows: round ($m) · cols: pre-money ($m) · <span style={{ color: 'var(--live)' }}>click any cell</span>
          </div>
          <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--ff-mono)', fontSize: 11, width: '100%', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px 4px', textAlign: 'left', color: 'var(--text-4)', fontWeight: 400, fontSize: 9, letterSpacing: '0.06em', borderBottom: '1px solid var(--line)', width: '14%' }}>r↓/p→</th>
                {preMoneys.map((p, j) => (
                  <th key={p} style={{ padding: '8px 2px', textAlign: 'center', fontWeight: 400, borderBottom: '1px solid var(--line)', fontSize: 10,
                    color: active.c === j ? 'var(--live)' : 'var(--text-3)',
                  }}>${p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grid.map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '9px 4px', borderBottom: '1px solid var(--line)', fontSize: 10.5,
                    color: active.r === i ? 'var(--live)' : 'var(--text-3)',
                    fontWeight: active.r === i ? 500 : 400,
                  }}>${rounds[i]}m</td>
                  {row.map((v, j) => {
                    const isPinned = pinned.r === i && pinned.c === j;
                    const rowActive = active.r === i;
                    const colActive = active.c === j;
                    const cls = ['dh-cell', isPinned && 'pinned', rowActive && !isPinned && 'row-active', colActive && !isPinned && 'col-active'].filter(Boolean).join(' ');
                    return (
                      <td key={j} className={cls}
                        onClick={() => setPinned({ r: i, c: j })}
                        onMouseEnter={() => setHover({ r: i, c: j })}
                        onMouseLeave={() => setHover(null)}
                        style={{
                          padding: '9px 2px', textAlign: 'center',
                          background: heat(v),
                          color: isPinned ? 'var(--live)' : 'var(--text)',
                          borderBottom: '1px solid var(--line)',
                          fontWeight: isPinned ? 600 : 400,
                          fontSize: 11,
                        }}>{v.toFixed(0)}</td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="t-mono" style={{ marginTop: 14, fontSize: 9.5, color: 'var(--text-4)', letterSpacing: '0.08em', lineHeight: 1.7 }}>
            // green-shade intensity = founder retention · darker = more dilution<br/>
            // outlined cell = pinned · click to pin any cell · dashed = row/col of active
          </div>
        </div>

        {/* ===== RIGHT: live readout ===== */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column' }}>
          <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14, display: 'flex', justifyContent: 'space-between' }}>
            <span>§ Cell readout</span>
            <span style={{ color: 'var(--live)' }}>● {hover ? 'HOVER' : 'PINNED'}</span>
          </div>

          {/* Scenario title */}
          <div style={{ marginBottom: 20 }}>
            <div className="t-display" style={{ fontSize: 32, color: 'var(--text)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              ${aRound}m <span style={{ color: 'var(--text-3)' }}>into</span> ${aPre}m<span style={{ color: 'var(--text-3)' }}>.</span>
            </div>
            <div className="t-mono" style={{ fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.08em', marginTop: 4 }}>
              pre-money · round · esop {esop}%
            </div>
          </div>

          {/* Split bar */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', height: 14, border: '1px solid var(--line)', borderRadius: 1, overflow: 'hidden', marginBottom: 10 }}>
              <div style={{ width: `${aFounder}%`, background: 'var(--text-2)', transition: 'width 0.25s' }} />
              <div style={{ width: `${aInvestor}%`, background: 'var(--live)', transition: 'width 0.25s' }} />
              <div style={{ width: `${esop}%`, background: 'var(--text-4)', transition: 'width 0.25s' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, fontFamily: 'var(--ff-mono)', fontSize: 10.5 }}>
              <div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--text-3)', fontSize: 9.5 }}>
                  <span style={{ width: 7, height: 7, background: 'var(--text-2)' }} /> FOUNDERS
                </div>
                <div style={{ color: 'var(--text)', fontSize: 16, marginTop: 4 }}>{aFounder.toFixed(1)}%</div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--text-3)', fontSize: 9.5 }}>
                  <span style={{ width: 7, height: 7, background: 'var(--live)' }} /> INVESTOR
                </div>
                <div style={{ color: 'var(--live)', fontSize: 16, marginTop: 4 }}>{aInvestor.toFixed(1)}%</div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--text-3)', fontSize: 9.5 }}>
                  <span style={{ width: 7, height: 7, background: 'var(--text-4)' }} /> ESOP
                </div>
                <div style={{ color: 'var(--text-2)', fontSize: 16, marginTop: 4 }}>{esop}%</div>
              </div>
            </div>
          </div>

          {/* Math ledger */}
          <div style={{ border: '1px solid var(--line)', background: 'var(--ink)', padding: '14px 16px', fontFamily: 'var(--ff-mono)', fontSize: 11.5, lineHeight: 1.9, flex: 1 }}>
            <div className="t-mono" style={{ fontSize: 9.5, color: 'var(--text-4)', letterSpacing: '0.12em', marginBottom: 10 }}>// THE MATH</div>
            <div style={{ color: 'var(--text-3)' }}>
              <span style={{ color: 'var(--text-4)' }}>post_money</span> = pre + round<br />
              <span style={{ color: 'var(--live)' }}>  = ${aPre} + ${aRound} = <span style={{ color: 'var(--text)' }}>${aPost.toFixed(0)}m</span></span>
            </div>
            <div style={{ color: 'var(--text-3)', marginTop: 6 }}>
              <span style={{ color: 'var(--text-4)' }}>investor_pct</span> = round / post<br />
              <span style={{ color: 'var(--live)' }}>  = {aRound} / {aPost.toFixed(0)} = <span style={{ color: 'var(--text)' }}>{aInvestor.toFixed(2)}%</span></span>
            </div>
            <div style={{ color: 'var(--text-3)', marginTop: 6 }}>
              <span style={{ color: 'var(--text-4)' }}>founder_pct</span> = 100 − inv − esop<br />
              <span style={{ color: 'var(--live)' }}>  = 100 − {aInvestor.toFixed(2)} − {esop} = <span style={{ color: 'var(--text)' }}>{aFounder.toFixed(2)}%</span></span>
            </div>
          </div>

          {/* Verdict strip */}
          <div style={{ marginTop: 14, padding: '12px 14px', background: aFounder >= 75 ? 'rgba(79,191,137,0.08)' : aFounder >= 65 ? 'rgba(255,255,255,0.03)' : 'rgba(200,90,63,0.08)', border: `1px solid ${aFounder >= 75 ? 'rgba(79,191,137,0.3)' : aFounder >= 65 ? 'var(--line-2)' : 'rgba(200,90,63,0.3)'}` }}>
            <div className="t-mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', marginBottom: 4, color: aFounder >= 75 ? 'var(--live)' : aFounder >= 65 ? 'var(--text-3)' : 'var(--warn, #C85A3F)' }}>
              § VERDICT
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.55 }}>
              {aFounder >= 80 && <>Founders retain majority control — typical for a healthy Seed or Series A.</>}
              {aFounder >= 75 && aFounder < 80 && <>Dilution is in the expected Series A zone. Reasonable for the round size.</>}
              {aFounder >= 65 && aFounder < 75 && <>Meaningful dilution. Worth pressure-testing the pre-money before signing.</>}
              {aFounder < 65 && <>Heavy dilution. Either round is too large, pre-money too low, or ESOP overreserved.</>}
            </div>
          </div>
        </div>
      </div>
    </div>
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
                <span className="t-mono" style={{ fontSize: 9.5, color: 'var(--live)', letterSpacing: '0.1em', textAlign: 'right' }}>● {s.signal}</span>
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

      {/* ====================================================
           §04 · THE WORKBENCH — dedicated proof-of-craft section
           Consolidates the valuation workbench + dilution matrix
          ==================================================== */}
      <section id="workbench" className="page-pad" style={{ borderBottom: '1px solid var(--line)', background: 'var(--ink)' }}>
        <Reveal>
          <SectionHead
            num="04"
            eyebrow="THE WORKBENCH"
            title={<>Live from the <em className="t-display-it">bench.</em></>}
            kicker="The models below are interactive — move a slider, click a cell, watch the math redrive. Every engagement ships artifacts built with the same discipline."
          />
        </Reveal>

        {/* Artifact 01 — Valuation Workbench */}
        <Reveal delay={80}>
          <div className="t-mono" style={{ fontSize: 10, color: 'var(--live)', letterSpacing: '0.18em', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--line)', paddingTop: 20 }}>
            <span>▸ ARTIFACT 01 · Valuation &amp; round builder</span>
            <span style={{ color: 'var(--text-4)', letterSpacing: '0.08em' }}>/models/valuation-v3.xlsx</span>
          </div>
        </Reveal>
        <Reveal delay={100}><LiveValuation /></Reveal>
        <div style={{ marginTop: 12, marginBottom: 56, fontFamily: 'var(--ff-mono)', fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.08em' }}>
          // Indicative illustration · not investment advice · every engagement model is bespoke
        </div>

        {/* Artifact 02 — Dilution Heatmap */}
        <Reveal delay={60}>
          <div className="t-mono" style={{ fontSize: 10, color: 'var(--live)', letterSpacing: '0.18em', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--line)', paddingTop: 20 }}>
            <span>▸ ARTIFACT 02 · Dilution × valuation matrix</span>
            <span style={{ color: 'var(--text-4)', letterSpacing: '0.08em' }}>/models/dilution-matrix.xlsx</span>
          </div>
        </Reveal>
        <Reveal delay={80}><DilutionHeatmap /></Reveal>
        <div style={{ marginTop: 12, fontFamily: 'var(--ff-mono)', fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.08em' }}>
          // One of dozens of matrices built in every engagement
        </div>
      </section>

      {/* Pipeline */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)' }}>
        <Reveal><SectionHead num="05" eyebrow="OPERATIONS" title={<>Selective, by design.</>} kicker="A deliberately narrow client list. Every brief receives full attention; every deliverable is shaped end-to-end by the principal." /></Reveal>
        <Reveal><DealPipeline /></Reveal>
      </section>

      {/* Pull quote */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--paper-ink)' }}>
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

      {/* Heritage logo bar */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="t-micro" style={{ textAlign: 'center', marginBottom: 32, color: 'var(--text-4)' }}>
          Institutional heritage
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40, maxWidth: 980, margin: '0 auto' }}>
          {['Institutional Banking', 'Corporate Venture', 'Venture Capital', 'Private Equity', 'Investment Advisory', 'UNSW', 'UIUC'].map((n, i) => (
            <span key={n} className="t-display" style={{ fontSize: 22, color: 'var(--text-3)', letterSpacing: '-0.005em', opacity: 0.8 }}>{n}</span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="page-pad" style={{ paddingTop: 120, paddingBottom: 120, textAlign: 'center', borderBottom: '1px solid var(--line)' }}>
        <Reveal>
          <div className="t-mono" style={{ fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>→ Next step</div>
          <h2 className="t-display" style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 1, color: 'var(--text)', letterSpacing: '-0.03em' }}>
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

Object.assign(window, { HomePage, LiveValuation, DealPipeline, DilutionHeatmap });
