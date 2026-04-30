/* Evara Advisory — Workbench page (interactive artifacts: valuation + dilution) */

const { useState: wUseState } = React;

/* ===========================================================
   Live Valuation Workbench — interactive DCF / round builder.
   Five inputs, three scenarios, a sensitivity matrix, a cap-table
   readout, and a 3Y projection. One slider moves the whole thing.
   =========================================================== */
function LiveValuation() {
  // Base inputs — all $k except percentages
  const [arr, setArr] = wUseState(4200);
  const [growth, setGrowth] = wUseState(85);
  const [mult, setMult] = wUseState(6.5);
  const [burn, setBurn] = wUseState(180);
  const [round, setRound] = wUseState(12000);
  const [scenario, setScenario] = wUseState('BASE'); // BEAR · BASE · BULL

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
    return `rgba(217,119,87,${0.06 + t * 0.42})`;
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
          <Slider label="Current ARR" value={arr} setValue={setArr} min={100} max={20000} step={50} prefix="$" suffix="k" />
          <Slider label="Growth Rate Y1 (base)" value={growth} setValue={setGrowth} min={20} max={200} step={5} suffix="%" />
          <Slider label="Revenue Multiple (base)" value={mult} setValue={setMult} min={3} max={15} step={0.5} suffix="×" />
          <Slider label="Monthly Burn" value={burn} setValue={setBurn} min={50} max={500} step={10} prefix="$" suffix="k" />
          <Slider label="Round Size" value={round} setValue={setRound} min={50} max={30000} step={50} prefix="$" suffix="k" />
        </div>

        {/* Headline + cap table */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '22px 24px', borderBottom: '1px solid var(--line)' }}>
            <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
              Implied pre-money · {scn.label}
            </div>
            <div className="t-display" style={{ fontSize: 'clamp(40px, 9vw, 64px)', color: 'var(--text)', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.02em' }}>
              ${fmtM(preMoneyM)}<span style={{ fontSize: 'clamp(18px, 3.5vw, 26px)', color: 'var(--text-3)', marginLeft: 4 }}>m</span>
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
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -4px' }}>
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
          </div>
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
   Dilution Calculator — user-driven.
   Four inputs drive a live 7×7 heatmap whose axes sweep ±60% around
   the user's chosen pre-money and round. Editorial framing —
   "the geometry of a raise".
   =========================================================== */
function DilutionHeatmap() {
  // User inputs
  const [preMoney, setPreMoney] = wUseState(40);           // $m
  const [round, setRound] = wUseState(5);                  // $m
  const [esop, setEsop] = wUseState(10);                   // % post-round
  const [founderStart, setFounderStart] = wUseState(100);  // % pre-round (existing founder ownership)

  // Pin a specific cell; hover overrides transiently. Center cell (r=3,c=3) = user's inputs.
  const [pinned, setPinned] = wUseState({ r: 3, c: 3 });
  const [hover, setHover] = wUseState(null);
  const active = hover || pinned;

  // Axes sweep ±60% around the user's inputs (7 values).
  const axisMul = [0.4, 0.6, 0.8, 1.0, 1.25, 1.5, 2.0];
  const rounds = axisMul.map(m => round * m);
  const preMoneys = axisMul.map(m => preMoney * m);

  // Core math. Investor = round / post. ESOP is target post-round pool.
  // Founder_post = existingFounder% × (100 − investor − esop) / 100.
  const investorOf = (r, pre) => (r / (pre + r)) * 100;
  const founderOf = (r, pre) => {
    const remaining = Math.max(0, 100 - investorOf(r, pre) - esop);
    return (founderStart / 100) * remaining;
  };
  const otherExistingOf = (r, pre) => {
    const remaining = Math.max(0, 100 - investorOf(r, pre) - esop);
    return ((100 - founderStart) / 100) * remaining;
  };
  const postMoneyOf = (r, pre) => pre + r;

  const grid = rounds.map(r => preMoneys.map(pre => founderOf(r, pre)));
  const allVals = grid.flat();
  const min = Math.min(...allVals);
  const max = Math.max(...allVals);
  const heat = v => {
    const t = (v - min) / Math.max(0.01, max - min);
    return `rgba(217,119,87,${0.06 + t * 0.42})`;
  };

  // Active cell metrics
  const aRound = rounds[active.r];
  const aPre = preMoneys[active.c];
  const aFounder = founderOf(aRound, aPre);
  const aInvestor = investorOf(aRound, aPre);
  const aOther = otherExistingOf(aRound, aPre);
  const aPost = postMoneyOf(aRound, aPre);
  const aRemaining = Math.max(0, 100 - aInvestor - esop);
  const retention = founderStart > 0 ? (aFounder / founderStart) * 100 : 0;

  // Moving pre-money or round slides the whole grid; re-centre the pin so the readout
  // reflects the newly-chosen scenario rather than an orphan what-if cell.
  const onPreMoney = v => { setPreMoney(v); setPinned({ r: 3, c: 3 }); };
  const onRound = v => { setRound(v); setPinned({ r: 3, c: 3 }); };

  // Axis/math formatter — 2 decimals below $1m, 1 decimal up to $10m, 0 above.
  const fmtAxis = n => n < 1 ? n.toFixed(2) : n < 10 ? n.toFixed(1) : n.toFixed(0);
  // Friendly $ display — uses $k below $1m, $m above.
  const fmtDollars = v => v < 1 ? `$${Math.round(v * 1000)}k` : v < 10 ? `$${v.toFixed(1)}m` : `$${v.toFixed(0)}m`;
  const fmtM = n => Number(n).toLocaleString('en-AU', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  // Variable-step slider mappings. Finer granularity at the low end so pre-seed
  // scenarios ($500k pre × $50k round) are representable without shrinking the top end.
  // Pre-money $0.5m–$5m step $0.1m (46 ticks), $5m–$200m step $1m (195 ticks). 240 positions.
  const PM_MAX_POS = 240;
  const preMoneyToPos = v => v <= 5 ? Math.round((v - 0.5) / 0.1) : 45 + Math.round(v - 5);
  const posToPreMoney = p => p <= 45 ? +(0.5 + p * 0.1).toFixed(1) : 5 + (p - 45);
  // Round $0.05m–$2m step $0.05m (40 ticks), $2m–$30m step $0.5m (56 ticks). 95 positions.
  const R_MAX_POS = 95;
  const roundToPos = v => v <= 2 ? Math.round((v - 0.05) / 0.05) : 39 + Math.round((v - 2) / 0.5);
  const posToRound = p => p <= 39 ? +(0.05 + p * 0.05).toFixed(2) : +(2 + (p - 39) * 0.5).toFixed(1);

  const Slider = ({ label, value, setValue, min, max, step, suffix = '', prefix = '' }) => (
    <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</span>
        <span className="t-mono" style={{ fontSize: 13, color: 'var(--text)' }}>{prefix}{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => setValue(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--live)', height: 4 }}
      />
    </div>
  );

  const StagedSlider = ({ label, value, setValue, posMax, toPos, fromPos, display }) => (
    <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</span>
        <span className="t-mono" style={{ fontSize: 13, color: 'var(--text)' }}>{display(value)}</span>
      </div>
      <input type="range" min={0} max={posMax} step={1} value={toPos(value)}
        onChange={e => setValue(fromPos(Number(e.target.value)))}
        style={{ width: '100%', accentColor: 'var(--live)', height: 4 }}
      />
    </div>
  );

  return (
    <div style={{ border: '1px solid var(--line)', background: 'var(--ink-2)' }} className="dilution-heatmap">
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
        .dh-top { display: grid; grid-template-columns: 1fr 1.25fr; }
        @media (max-width: 900px) {
          .dh-top { grid-template-columns: 1fr !important; }
          .dh-top > div:first-child { border-right: 0 !important; border-bottom: 1px solid var(--line); }
        }
        .dh-readout-split { display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 640px) { .dh-readout-split { grid-template-columns: 1fr !important; }
          .dh-readout-split > div:first-child { border-right: 0 !important; border-bottom: 1px solid var(--line); }
        }
        .dh-cell { transition: background 0.15s, outline 0.15s; cursor: pointer; position: relative; }
        .dh-cell:hover { outline: 1px solid var(--text-3); z-index: 1; }
        .dh-cell.pinned { outline: 2px solid var(--live) !important; z-index: 2; }
        .dh-cell.row-active, .dh-cell.col-active { outline: 1px dashed rgba(217,119,87,0.4); }
        .dh-math { word-break: break-word; }
        @media (max-width: 640px) { .dh-math { font-size: 10.5px !important; line-height: 1.75 !important; } }
      `}</style>

      {/* Header bar */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', background: 'var(--ink-3)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span className="t-mono" style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
          <span className="dot live" style={{ display: 'inline-block', marginRight: 8, verticalAlign: 'middle' }} />
          The geometry of a raise · Dilution Calculator · LIVE
        </span>
        <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)' }}>/models/dilution-matrix.xlsx · Δ recalc on inputs</span>
      </div>

      {/* ===== TOP: inputs (left) · readout (right) ===== */}
      <div className="dh-top">
        {/* Inputs */}
        <div style={{ borderRight: '1px solid var(--line)' }}>
          <div style={{ padding: '10px 18px', background: 'var(--ink-3)', borderBottom: '1px solid var(--line)' }}>
            <span className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Inputs · drag to explore</span>
          </div>
          <StagedSlider label="Pre-money valuation" value={preMoney} setValue={onPreMoney} posMax={PM_MAX_POS} toPos={preMoneyToPos} fromPos={posToPreMoney} display={fmtDollars} />
          <StagedSlider label="Round size" value={round} setValue={onRound} posMax={R_MAX_POS} toPos={roundToPos} fromPos={posToRound} display={fmtDollars} />
          <Slider label="ESOP pool · post-round" value={esop} setValue={setEsop} min={0} max={20} step={1} suffix="%" />
          <Slider label="Existing founder ownership · pre" value={founderStart} setValue={setFounderStart} min={40} max={100} step={1} suffix="%" />
        </div>

        {/* Readout */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '18px 24px 14px' }}>
            <div className="t-mono" style={{ fontSize: 10, color: 'var(--text-4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
              <span>§ Cell readout</span>
              <span style={{ color: 'var(--live)' }}>● {hover ? 'HOVER' : 'PINNED'}</span>
            </div>
            <div className="t-display" style={{ fontSize: 32, color: 'var(--text)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              {fmtDollars(aRound)} <span style={{ color: 'var(--text-3)' }}>into</span> {fmtDollars(aPre)}<span style={{ color: 'var(--text-3)' }}>.</span>
            </div>
            <div className="t-mono" style={{ fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.08em', marginTop: 4 }}>
              round · pre-money · esop {esop}% · founder start {founderStart}%
            </div>
          </div>

          {/* Split bar */}
          <div style={{ padding: '4px 24px 18px', borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', height: 14, border: '1px solid var(--line)', borderRadius: 1, overflow: 'hidden', marginBottom: 10 }}>
              <div style={{ width: `${aFounder}%`, background: 'var(--text-2)', transition: 'width 0.25s' }} />
              {aOther > 0.1 && <div style={{ width: `${aOther}%`, background: 'var(--text-3)', opacity: 0.55, transition: 'width 0.25s' }} />}
              <div style={{ width: `${aInvestor}%`, background: 'var(--live)', transition: 'width 0.25s' }} />
              <div style={{ width: `${esop}%`, background: 'var(--text-4)', transition: 'width 0.25s' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: founderStart < 100 ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)', gap: 10, fontFamily: 'var(--ff-mono)', fontSize: 10.5 }}>
              <div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--text-3)', fontSize: 9.5 }}>
                  <span style={{ width: 7, height: 7, background: 'var(--text-2)' }} /> FOUNDERS
                </div>
                <div style={{ color: 'var(--text)', fontSize: 16, marginTop: 4 }}>{aFounder.toFixed(1)}%</div>
              </div>
              {founderStart < 100 && (
                <div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--text-3)', fontSize: 9.5 }}>
                    <span style={{ width: 7, height: 7, background: 'var(--text-3)', opacity: 0.55 }} /> OTHER EXISTING
                  </div>
                  <div style={{ color: 'var(--text)', fontSize: 16, marginTop: 4 }}>{aOther.toFixed(1)}%</div>
                </div>
              )}
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

          {/* Math ledger + verdict */}
          <div className="dh-readout-split" style={{ flex: 1 }}>
            <div className="dh-math" style={{ padding: '14px 18px', fontFamily: 'var(--ff-mono)', fontSize: 11.5, lineHeight: 1.9, borderRight: '1px solid var(--line)' }}>
              <div className="t-mono" style={{ fontSize: 9.5, color: 'var(--text-4)', letterSpacing: '0.12em', marginBottom: 10 }}>// THE MATH</div>
              <div style={{ color: 'var(--text-3)' }}>
                <span style={{ color: 'var(--text-4)' }}>post_money</span> = pre + round<br />
                <span style={{ color: 'var(--live)' }}>  = ${fmtAxis(aPre)} + ${fmtAxis(aRound)} = <span style={{ color: 'var(--text)' }}>${fmtAxis(aPost)}m</span></span>
              </div>
              <div style={{ color: 'var(--text-3)', marginTop: 6 }}>
                <span style={{ color: 'var(--text-4)' }}>investor</span> = round / post<br />
                <span style={{ color: 'var(--live)' }}>  = <span style={{ color: 'var(--text)' }}>{aInvestor.toFixed(2)}%</span></span>
              </div>
              <div style={{ color: 'var(--text-3)', marginTop: 6 }}>
                <span style={{ color: 'var(--text-4)' }}>remaining</span> = 100 − inv − esop<br />
                <span style={{ color: 'var(--live)' }}>  = <span style={{ color: 'var(--text)' }}>{aRemaining.toFixed(2)}%</span></span>
              </div>
              <div style={{ color: 'var(--text-3)', marginTop: 6 }}>
                <span style={{ color: 'var(--text-4)' }}>founder</span> = start × remaining<br />
                <span style={{ color: 'var(--live)' }}>  = {founderStart}% × {aRemaining.toFixed(1)}% = <span style={{ color: 'var(--text)' }}>{aFounder.toFixed(2)}%</span></span>
              </div>
            </div>

            <div style={{ padding: '14px 18px' }}>
              <div className="t-mono" style={{ fontSize: 9.5, color: 'var(--text-4)', letterSpacing: '0.12em', marginBottom: 10 }}>
                // RETENTION · {retention.toFixed(0)}% OF START
              </div>
              <div style={{ padding: '10px 12px', background: retention >= 80 ? 'rgba(217,119,87,0.10)' : retention >= 70 ? 'rgba(255,255,255,0.03)' : 'rgba(184,74,62,0.10)', border: `1px solid ${retention >= 80 ? 'rgba(217,119,87,0.35)' : retention >= 70 ? 'var(--line-2)' : 'rgba(184,74,62,0.35)'}` }}>
                <div className="t-mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', marginBottom: 4, color: retention >= 80 ? 'var(--live)' : retention >= 70 ? 'var(--text-3)' : 'var(--warn, #C85A3F)' }}>
                  § VERDICT
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.55 }}>
                  {retention >= 85 && <>Clean dilution — founders retain strong control relative to starting position.</>}
                  {retention >= 78 && retention < 85 && <>Dilution in the expected zone for this round shape.</>}
                  {retention >= 70 && retention < 78 && <>Meaningful dilution. Worth pressure-testing pre-money before signing.</>}
                  {retention < 70 && <>Heavy dilution. Round too large, pre-money too low, or ESOP overreserved.</>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM: heatmap full-width ===== */}
      <div style={{ padding: '20px 24px', borderTop: '1px solid var(--line)' }}>
        <div className="t-mono" style={{ fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.1em', marginBottom: 14, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span>Founder % post-round · rows: round ($m) · cols: pre-money ($m) · <span style={{ color: 'var(--live)' }}>click any cell</span></span>
          <span style={{ color: 'var(--text-4)' }}>// axes sweep ±60% around your inputs</span>
        </div>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--ff-mono)', fontSize: 11, width: '100%', tableLayout: 'fixed', minWidth: 520 }}>
            <thead>
              <tr>
                <th style={{ padding: '8px 4px', textAlign: 'left', color: 'var(--text-4)', fontWeight: 400, fontSize: 9, letterSpacing: '0.06em', borderBottom: '1px solid var(--line)', width: '12%' }}>r↓/p→</th>
                {preMoneys.map((p, j) => (
                  <th key={j} style={{ padding: '8px 2px', textAlign: 'center', fontWeight: 400, borderBottom: '1px solid var(--line)', fontSize: 10,
                    color: active.c === j ? 'var(--live)' : 'var(--text-3)',
                  }}>${fmtAxis(p)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grid.map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '9px 4px', borderBottom: '1px solid var(--line)', fontSize: 10.5,
                    color: active.r === i ? 'var(--live)' : 'var(--text-3)',
                    fontWeight: active.r === i ? 500 : 400,
                  }}>${fmtAxis(rounds[i])}m</td>
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
                          padding: '10px 2px', textAlign: 'center',
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
        </div>
        <div className="t-mono" style={{ marginTop: 12, fontSize: 9.5, color: 'var(--text-4)', letterSpacing: '0.08em', lineHeight: 1.7 }}>
          // green-shade intensity = founder retention · darker = more dilution<br/>
          // outlined cell = your inputs · click any cell to pin a what-if · dashed = row/col of active
        </div>
      </div>
    </div>
  );
}


/* ===========================================================
   Workbench page — both interactive artifacts on a dedicated page.
   =========================================================== */
function WorkbenchPage({ setPage }) {
  return (
    <>
      <section className="page-pad page-hero-bg" style={{ borderBottom: '1px solid var(--line)', paddingTop: 80, paddingBottom: 56 }}>
        <Reveal>
          <div className="t-micro" style={{ marginBottom: 28 }}>§ Workbench</div>
          <h1 className="t-display" style={{ fontSize: 'clamp(35px, 5.4vw, 82px)', lineHeight: 1.02, letterSpacing: '-0.035em' }}>
            Live from the <em className="t-display-it">bench.</em>
          </h1>
          <p className="t-serif" style={{ fontSize: 16, color: 'var(--text-3)', marginTop: 16, maxWidth: 600, fontStyle: 'italic' }}>
            Two of the interactive artifacts behind a typical engagement — built to be moved, not read. Drag a slider, click a cell, watch the math redrive.
          </p>
        </Reveal>
      </section>

      {/* Artifact 01 — Valuation Workbench */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', background: 'var(--ink)' }}>
        <Reveal>
          <div className="t-mono" style={{ fontSize: 10, color: 'var(--live)', letterSpacing: '0.18em', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
            <span>▸ ARTIFACT 01 · Valuation &amp; round builder</span>
            <span style={{ color: 'var(--text-4)', letterSpacing: '0.08em', overflowWrap: 'anywhere' }}>/models/valuation-v3.xlsx</span>
          </div>
        </Reveal>
        <Reveal delay={40}>
          <p style={{ maxWidth: 720, color: 'var(--text-2)', fontSize: 15, lineHeight: 1.65, marginBottom: 22 }}>
            A simplified DCF / round builder. Move the five inputs to see implied pre-money,
            runway, dilution, and a Y3 MOIC re-compute against three scenarios in real time.
          </p>
        </Reveal>
        <Reveal delay={80}><LiveValuation /></Reveal>
        <div style={{ marginTop: 12, fontFamily: 'var(--ff-mono)', fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.08em' }}>
          // Indicative illustration · not investment advice · every engagement model is bespoke
        </div>
      </section>

      {/* Artifact 02 — Dilution Heatmap */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', background: 'var(--ink-2)' }}>
        <Reveal>
          <div className="t-mono" style={{ fontSize: 10, color: 'var(--live)', letterSpacing: '0.18em', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
            <span>▸ ARTIFACT 02 · Dilution × valuation matrix</span>
            <span style={{ color: 'var(--text-4)', letterSpacing: '0.08em', overflowWrap: 'anywhere' }}>/models/dilution-matrix.xlsx</span>
          </div>
        </Reveal>
        <Reveal delay={40}>
          <p style={{ maxWidth: 720, color: 'var(--text-2)', fontSize: 15, lineHeight: 1.65, marginBottom: 22 }}>
            Four inputs, one heatmap. Set a pre-money, round size, ESOP, and starting founder
            ownership — then click any cell on the grid to see how the post-round split changes.
          </p>
        </Reveal>
        <Reveal delay={80}><DilutionHeatmap /></Reveal>
        <div style={{ marginTop: 12, fontFamily: 'var(--ff-mono)', fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.08em' }}>
          // One of dozens of matrices built in every engagement
        </div>
      </section>

      {/* Closing note */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', paddingTop: 56, paddingBottom: 56 }}>
        <div style={{ maxWidth: 720, fontFamily: 'var(--ff-mono)', fontSize: 12, color: 'var(--text-3)', lineHeight: 1.75, letterSpacing: '0.02em' }}>
          // Simplified for illustration. Engagement-grade models include scenario analysis,
          sensitivity tables, and full audit trails.
        </div>
        <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn primary" onClick={() => setPage('Contact')}>Send a brief<span className="arrow" /></button>
          <button className="btn" onClick={() => setPage('Services')}>See capabilities</button>
        </div>
      </section>

      {/* Closing aphorism — sign-off */}
      <section className="page-pad" style={{ borderBottom: '1px solid var(--line)', paddingTop: 80, paddingBottom: 80 }}>
        <div className="t-display" style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--text)' }}>
          The work is <em className="t-display-it" style={{ color: 'var(--cream)' }}>the proof.</em>
        </div>
        <div className="t-mono" style={{ marginTop: 24, fontSize: 11, color: 'var(--text-4)', letterSpacing: '0.14em' }}>
          — EVARA ADVISORY · ONE PRINCIPAL · EVERY ENGAGEMENT
        </div>
      </section>
    </>
  );
}

Object.assign(window, { WorkbenchPage });
