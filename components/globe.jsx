/* Armillary globe.
   An engraved instrument, not a network diagram: graticule, coastlines, and the
   financial centres the practice actually deals across. Real coordinates on a
   real sphere. Drag to spin, hover a centre for its local time, click to bring
   it round and open a line from Sydney. */

const { useRef: gUseRef, useEffect: gUseEffect } = React;

/* major: larger dot, and eligible for the idle tracer links. */
const CITIES = [
  { n: 'Sydney',        lat: -33.87, lon: 151.21,  tz: 'Australia/Sydney',     home: true },
  { n: 'Melbourne',     lat: -37.81, lon: 144.96,  tz: 'Australia/Melbourne' },
  { n: 'Brisbane',      lat: -27.47, lon: 153.03,  tz: 'Australia/Brisbane' },
  { n: 'Perth',         lat: -31.95, lon: 115.86,  tz: 'Australia/Perth' },
  { n: 'Auckland',      lat: -36.85, lon: 174.76,  tz: 'Pacific/Auckland' },

  { n: 'Singapore',     lat: 1.35,   lon: 103.82,  tz: 'Asia/Singapore',       major: true },
  { n: 'Hong Kong',     lat: 22.32,  lon: 114.17,  tz: 'Asia/Hong_Kong',       major: true },
  { n: 'Tokyo',         lat: 35.68,  lon: 139.69,  tz: 'Asia/Tokyo',           major: true },
  { n: 'Shanghai',      lat: 31.23,  lon: 121.47,  tz: 'Asia/Shanghai' },
  { n: 'Shenzhen',      lat: 22.54,  lon: 114.06,  tz: 'Asia/Shanghai' },
  { n: 'Seoul',         lat: 37.57,  lon: 126.98,  tz: 'Asia/Seoul' },
  { n: 'Taipei',        lat: 25.03,  lon: 121.57,  tz: 'Asia/Taipei' },
  { n: 'Mumbai',        lat: 19.08,  lon: 72.88,   tz: 'Asia/Kolkata',         major: true },
  { n: 'Bengaluru',     lat: 12.97,  lon: 77.59,   tz: 'Asia/Kolkata' },
  { n: 'Bangkok',       lat: 13.76,  lon: 100.50,  tz: 'Asia/Bangkok' },
  { n: 'Kuala Lumpur',  lat: 3.14,   lon: 101.69,  tz: 'Asia/Kuala_Lumpur' },
  { n: 'Jakarta',       lat: -6.21,  lon: 106.85,  tz: 'Asia/Jakarta' },

  { n: 'Dubai',         lat: 25.20,  lon: 55.27,   tz: 'Asia/Dubai',           major: true },
  { n: 'Abu Dhabi',     lat: 24.45,  lon: 54.38,   tz: 'Asia/Dubai' },
  { n: 'Doha',          lat: 25.29,  lon: 51.53,   tz: 'Asia/Qatar' },
  { n: 'Riyadh',        lat: 24.71,  lon: 46.68,   tz: 'Asia/Riyadh' },
  { n: 'Tel Aviv',      lat: 32.09,  lon: 34.78,   tz: 'Asia/Jerusalem' },

  { n: 'London',        lat: 51.51,  lon: -0.13,   tz: 'Europe/London',        major: true },
  { n: 'Zurich',        lat: 47.38,  lon: 8.54,    tz: 'Europe/Zurich',        major: true },
  { n: 'Geneva',        lat: 46.20,  lon: 6.14,    tz: 'Europe/Zurich' },
  { n: 'Frankfurt',     lat: 50.11,  lon: 8.68,    tz: 'Europe/Berlin',        major: true },
  { n: 'Luxembourg',    lat: 49.61,  lon: 6.13,    tz: 'Europe/Luxembourg' },
  { n: 'Amsterdam',     lat: 52.37,  lon: 4.90,    tz: 'Europe/Amsterdam' },
  { n: 'Paris',         lat: 48.86,  lon: 2.35,    tz: 'Europe/Paris' },
  { n: 'Dublin',        lat: 53.35,  lon: -6.26,   tz: 'Europe/Dublin' },
  { n: 'Milan',         lat: 45.46,  lon: 9.19,    tz: 'Europe/Rome' },
  { n: 'Madrid',        lat: 40.42,  lon: -3.70,   tz: 'Europe/Madrid' },
  { n: 'Stockholm',     lat: 59.33,  lon: 18.07,   tz: 'Europe/Stockholm' },
  { n: 'Copenhagen',    lat: 55.68,  lon: 12.57,   tz: 'Europe/Copenhagen' },
  { n: 'Vienna',        lat: 48.21,  lon: 16.37,   tz: 'Europe/Vienna' },
  { n: 'Jersey',        lat: 49.19,  lon: -2.11,   tz: 'Europe/Jersey' },

  { n: 'New York',      lat: 40.71,  lon: -74.01,  tz: 'America/New_York',     major: true },
  { n: 'Boston',        lat: 42.36,  lon: -71.06,  tz: 'America/New_York' },
  { n: 'Chicago',       lat: 41.88,  lon: -87.63,  tz: 'America/Chicago' },
  { n: 'Toronto',       lat: 43.65,  lon: -79.38,  tz: 'America/Toronto' },
  { n: 'San Francisco', lat: 37.77,  lon: -122.42, tz: 'America/Los_Angeles',  major: true },
  { n: 'Los Angeles',   lat: 34.05,  lon: -118.24, tz: 'America/Los_Angeles' },
  { n: 'Cayman',        lat: 19.29,  lon: -81.38,  tz: 'America/Cayman' },
  { n: 'São Paulo',     lat: -23.55, lon: -46.63,  tz: 'America/Sao_Paulo' },
  { n: 'Santiago',      lat: -33.45, lon: -70.67,  tz: 'America/Santiago' },

  { n: 'Johannesburg',  lat: -26.20, lon: 28.05,   tz: 'Africa/Johannesburg' },
  { n: 'Cape Town',     lat: -33.92, lon: 18.42,   tz: 'Africa/Johannesburg' },
];

/* Coastlines, parsed once from the baked Natural Earth data. */
let LAND = null;
function land() {
  if (LAND) return LAND;
  const src = typeof window !== 'undefined' && window.__LAND ? window.__LAND : '';
  LAND = src.split(';').map(ring => {
    const pts = ring.split(' ').map(p => {
      const c = p.split(',');
      return [parseFloat(c[0]), parseFloat(c[1])];
    }).filter(p => isFinite(p[0]) && isFinite(p[1]));
    return pts;
  }).filter(r => r.length > 2);
  return LAND;
}

const RAD = Math.PI / 180;
const TAU = Math.PI * 2;

function toVec(lat, lon) {
  const p = lat * RAD, l = lon * RAD;
  return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)];
}

function slerp(a, b, t) {
  let d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  d = Math.max(-1, Math.min(1, d));
  const o = Math.acos(d);
  if (o < 1e-6) return a;
  const s = Math.sin(o), k1 = Math.sin((1 - t) * o) / s, k2 = Math.sin(t * o) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

/* Local clock in a centre, formatted once a minute at most. */
const timeCache = new Map();
function localTime(tz) {
  const key = tz + '|' + Math.floor(Date.now() / 30000);
  if (timeCache.has(key)) return timeCache.get(key);
  let out = '';
  try {
    out = new Intl.DateTimeFormat('en-AU', {
      timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(new Date());
  } catch (e) { out = ''; }
  timeCache.set(key, out);
  return out;
}

function Globe({ detail = 'dense', speed = 52, showArcs = true }) {
  const wrapRef = gUseRef(null);
  const cvsRef = gUseRef(null);

  gUseEffect(() => {
    const wrap = wrapRef.current, cvs = cvsRef.current;
    if (!wrap || !cvs) return;
    const ctx = cvs.getContext('2d');
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interactive = window.matchMedia && window.matchMedia('(min-width: 901px) and (pointer: fine)').matches;

    const STEP = detail === 'dense' ? 10 : detail === 'fine' ? 15 : 20;
    const SAMPLE = detail === 'dense' ? 2 : 3;

    let w = 0, h = 0, dpr = 1, raf = 0;
    let last = performance.now();

    const size = () => {
      const r = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      cvs.width = Math.round(w * dpr); cvs.height = Math.round(h * dpr);
      cvs.style.width = w + 'px'; cvs.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const V = CITIES.map(c => toVec(c.lat, c.lon));
    const HOME = CITIES.findIndex(c => c.home);
    const MAJOR = CITIES.map((c, i) => (c.major ? i : -1)).filter(i => i >= 0);

    /* --- motion state --- */
    let spin = 0;              // radians
    let vel = 0;               // rad/s, from a throw
    let dragging = false;
    let dragMoved = 0;
    let lastX = 0;
    let holdUntil = 0;         // auto-spin paused while a centre is focused
    let overDisc = false;      // pointer is within the sphere
    const geo = { R: 1, cx: 0, cy: 0 };
    let target = null;         // eased spin target after a click
    let focus = -1;            // focused city index
    let hover = -1;            // hovered city index
    const projected = new Array(CITIES.length);

    const respawn = (tr, t) => {
      tr.a = MAJOR[Math.floor(Math.random() * MAJOR.length)];
      do { tr.b = MAJOR[Math.floor(Math.random() * MAJOR.length)]; } while (tr.b === tr.a);
      tr.t0 = t + Math.random() * 1600;
      tr.dur = 2400 + Math.random() * 1800;
    };
    const tracers = [];
    for (let i = 0; i < 5; i++) { const tr = {}; respawn(tr, performance.now() - Math.random() * 2600); tracers.push(tr); }
    /* A click opens its own line from Sydney. */
    let link = null;

    const TILT = -12 * RAD;
    const project = (v, sp, R, cx, cy) => {
      const cs = Math.cos(sp), sn = Math.sin(sp);
      const x1 = v[0] * cs - v[1] * sn;
      const y1 = v[0] * sn + v[1] * cs;
      const z1 = v[2];
      const ct = Math.cos(TILT), st = Math.sin(TILT);
      const y2 = y1 * ct - z1 * st;
      const z2 = y1 * st + z1 * ct;
      return { x: cx + x1 * R, y: cy - z2 * R, front: y2 > 0, depth: y2 };
    };

    const stroke = (pts, alpha, lw) => {
      ctx.lineWidth = lw;
      let open = false;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (!p.front) { if (open) { ctx.stroke(); open = false; } continue; }
        if (!open) { ctx.beginPath(); ctx.globalAlpha = alpha; ctx.moveTo(p.x, p.y); open = true; }
        else ctx.lineTo(p.x, p.y);
      }
      if (open) ctx.stroke();
    };

    const drawLabel = (p, city, strong) => {
      const t = localTime(city.tz);
      const text = city.n.toUpperCase();
      ctx.save();
      ctx.font = '500 10.5px "Instrument Sans", system-ui, sans-serif';
      if ('letterSpacing' in ctx) ctx.letterSpacing = '1.4px';
      const wName = ctx.measureText(text).width;
      ctx.font = '400 10.5px "IBM Plex Mono", ui-monospace, monospace';
      const wTime = t ? ctx.measureText(t).width + 10 : 0;
      const boxW = wName + wTime + 18;
      let lx = p.x + 12, ly = p.y - 9;
      if (lx + boxW > w - 6) lx = p.x - boxW - 12;     // flip inward near the edge
      if (ly < 4) ly = p.y + 6;

      ctx.globalAlpha = strong ? 0.14 : 0.10;
      ctx.fillRect(lx - 7, ly - 11, boxW, 20);
      ctx.globalAlpha = strong ? 1 : 0.82;
      ctx.font = '500 10.5px "Instrument Sans", system-ui, sans-serif';
      if ('letterSpacing' in ctx) ctx.letterSpacing = '1.4px';
      ctx.fillText(text, lx, ly + 3);
      if (t) {
        ctx.font = '400 10.5px "IBM Plex Mono", ui-monospace, monospace';
        if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
        ctx.globalAlpha = strong ? 0.72 : 0.5;
        ctx.fillText(t, lx + wName + 10, ly + 3);
      }
      ctx.restore();
    };

    const draw = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      /* --- advance rotation --- */
      if (target !== null) {
        let d = target - spin;
        while (d > Math.PI) d -= TAU;
        while (d < -Math.PI) d += TAU;
        if (Math.abs(d) < 0.002) { spin = target; target = null; }
        else spin += d * Math.min(1, dt * 5.5);
      } else if (dragging) {
        /* pointer drives it directly */
      } else if (Math.abs(vel) > 0.0008) {
        spin += vel * dt;
        vel *= Math.pow(0.05, dt);          // inertia decay
      } else if (!reduced && now > holdUntil && hover < 0) {
        /* Slow right down while the pointer is on the sphere so a centre can be
           caught, and stop entirely once one is under the cursor. */
        spin += (speed / 1000) * dt * (overDisc ? 0.22 : 1);
      }
      spin = ((spin % TAU) + TAU) % TAU;

      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.44;
      const cx = w / 2, cy = h / 2;
      geo.R = R; geo.cx = cx; geo.cy = cy;
      ctx.strokeStyle = getComputedStyle(wrap).color;
      ctx.fillStyle = ctx.strokeStyle;
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';

      ctx.globalAlpha = 0.6; ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();

      const lats = [];
      for (let lat = -80; lat <= 80; lat += STEP) lats.push(lat);
      if (detail === 'dense') lats.push(23.44, -23.44, 66.56, -66.56);
      for (const lat of lats) {
        const pts = [];
        for (let lon = -180; lon <= 180; lon += SAMPLE) pts.push(project(toVec(lat, lon), spin, R, cx, cy));
        const major = Math.abs(lat) < 0.01;
        const trop = Math.abs(Math.abs(lat) - 23.44) < 0.01 || Math.abs(Math.abs(lat) - 66.56) < 0.01;
        stroke(pts, major ? 0.34 : trop ? 0.12 : 0.18, major ? 1 : 0.85);
      }
      for (let lon = 0; lon < 180; lon += STEP) {
        const pts = [];
        for (let lat = -90; lat <= 90; lat += SAMPLE) pts.push(project(toVec(lat, lon), spin, R, cx, cy));
        stroke(pts, lon === 0 ? 0.28 : 0.18, lon === 0 ? 0.95 : 0.85);
      }

      if (detail !== 'plain') {
        for (const ring of land()) {
          const pts = ring.map(c => project(toVec(c[1], c[0]), spin, R, cx, cy));
          stroke(pts, 0.6, 1);
        }
      }

      /* Financial centres */
      for (let i = 0; i < CITIES.length; i++) {
        const p = project(V[i], spin, R, cx, cy);
        projected[i] = p;
        if (!p.front) continue;
        const c = CITIES[i];
        const on = i === hover || i === focus;
        ctx.globalAlpha = on ? 0.95 : c.major ? 0.6 : 0.4;
        ctx.beginPath(); ctx.arc(p.x, p.y, on ? 2.8 : c.major ? 1.9 : 1.4, 0, TAU); ctx.fill();
        if (on) {
          ctx.globalAlpha = 0.4; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(p.x, p.y, 7.5, 0, TAU); ctx.stroke();
        }
      }

      /* Idle tracers between the majors */
      if (showArcs) {
        for (const tr of tracers) {
          const p = (now - tr.t0) / tr.dur;
          if (p >= 1) { respawn(tr, now); continue; }
          if (p < 0) continue;
          const a = V[tr.a], b = V[tr.b];
          const head = p, tail = Math.max(0, p - 0.34);
          const fade = Math.min(1, p * 4) * Math.min(1, (1 - p) * 4);
          const K = 16;
          ctx.lineWidth = 1.2;
          for (let k = 0; k < K; k++) {
            const q0 = project(slerp(a, b, tail + (head - tail) * (k / K)), spin, R, cx, cy);
            const q1 = project(slerp(a, b, tail + (head - tail) * ((k + 1) / K)), spin, R, cx, cy);
            if (!q0.front || !q1.front) continue;
            ctx.globalAlpha = Math.pow((k + 1) / K, 2.2) * 0.9 * fade;
            ctx.beginPath(); ctx.moveTo(q0.x, q0.y); ctx.lineTo(q1.x, q1.y); ctx.stroke();
          }
          const hp2 = project(slerp(a, b, head), spin, R, cx, cy);
          if (hp2.front) {
            ctx.globalAlpha = 0.95 * fade;
            ctx.beginPath(); ctx.arc(hp2.x, hp2.y, 1.9, 0, TAU); ctx.fill();
          }
        }
      }

      /* A clicked centre draws a standing line back to Sydney */
      if (link) {
        const p = Math.min(1, (now - link.t0) / 900);
        const a = V[HOME], b = V[link.i];
        const K = 40;
        ctx.lineWidth = 1.1;
        for (let k = 0; k < K * p; k++) {
          const q0 = project(slerp(a, b, k / K), spin, R, cx, cy);
          const q1 = project(slerp(a, b, (k + 1) / K), spin, R, cx, cy);
          if (!q0.front || !q1.front) continue;
          ctx.globalAlpha = 0.5;
          ctx.beginPath(); ctx.moveTo(q0.x, q0.y); ctx.lineTo(q1.x, q1.y); ctx.stroke();
        }
        if (now > link.t0 + 7000) link = null;
      }

      /* Sydney always reads */
      const hp = projected[HOME];
      if (hp && hp.front) {
        ctx.globalAlpha = 0.9;
        ctx.beginPath(); ctx.arc(hp.x, hp.y, 2.8, 0, TAU); ctx.fill();
        ctx.globalAlpha = 0.35; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(hp.x, hp.y, 7.5, 0, TAU); ctx.stroke();
        if (hover !== HOME && focus !== HOME) drawLabel(hp, CITIES[HOME], false);
      }
      if (focus >= 0 && projected[focus] && projected[focus].front) drawLabel(projected[focus], CITIES[focus], true);
      if (hover >= 0 && hover !== focus && projected[hover] && projected[hover].front) drawLabel(projected[hover], CITIES[hover], true);

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    /* --- interaction --- */
    const pick = (ev) => {
      const r = cvs.getBoundingClientRect();
      const mx = ev.clientX - r.left, my = ev.clientY - r.top;
      let best = -1, bd = 20 * 20;
      for (let i = 0; i < CITIES.length; i++) {
        const p = projected[i];
        if (!p || !p.front) continue;
        const dx = p.x - mx, dy = p.y - my, d = dx * dx + dy * dy;
        if (d < bd) { bd = d; best = i; }
      }
      return best;
    };

    const onLeave = () => {
      wrap.classList.remove('is-live');
      hover = -1; overDisc = false;
      cvs.style.cursor = 'grab';
    };
    const onDown = (ev) => {
      dragging = true; dragMoved = 0; lastX = ev.clientX; vel = 0; target = null;
      cvs.style.cursor = 'grabbing';
      try { cvs.setPointerCapture(ev.pointerId); } catch (e) {}
    };
    const onMove = (ev) => {
      if (dragging) {
        const dx = ev.clientX - lastX;
        lastX = ev.clientX;
        dragMoved += Math.abs(dx);
        const k = 0.0055;
        spin -= dx * k;
        vel = -dx * k / Math.max(0.008, 1 / 60);
        return;
      }
      const r = cvs.getBoundingClientRect();
      const ox = ev.clientX - r.left - geo.cx, oy = ev.clientY - r.top - geo.cy;
      overDisc = (ox * ox + oy * oy) <= geo.R * geo.R * 1.04;
      wrap.classList.toggle('is-live', overDisc);
      const i = pick(ev);
      if (i !== hover) {
        hover = i;
        cvs.style.cursor = i >= 0 ? 'pointer' : overDisc ? 'grab' : 'default';
        if (i < 0) holdUntil = performance.now() + 260;
      }
    };
    const onUp = (ev) => {
      if (!dragging) return;
      dragging = false;
      cvs.style.cursor = 'grab';
      try { cvs.releasePointerCapture(ev.pointerId); } catch (e) {}
      if (dragMoved < 4) {
        const i = pick(ev);
        if (i >= 0) {
          focus = i;
          target = Math.PI / 2 - CITIES[i].lon * RAD;   // bring it to face front
          holdUntil = performance.now() + 5200;
          vel = 0;
          if (i !== HOME) link = { i, t0: performance.now() + 320 };
        } else {
          focus = -1; link = null;
        }
      }
    };

    size();
    last = performance.now();
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(size);
    ro.observe(wrap);

    if (interactive) {
      wrap.classList.add('is-interactive');
      cvs.style.cursor = 'grab';
      cvs.addEventListener('pointerleave', onLeave);
      cvs.addEventListener('pointerdown', onDown);
      cvs.addEventListener('pointermove', onMove);
      cvs.addEventListener('pointerup', onUp);
      cvs.addEventListener('pointercancel', onUp);
    }

    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      cvs.removeEventListener('pointerleave', onLeave);
      cvs.removeEventListener('pointerdown', onDown);
      cvs.removeEventListener('pointermove', onMove);
      cvs.removeEventListener('pointerup', onUp);
      cvs.removeEventListener('pointercancel', onUp);
    };
  }, [detail, speed, showArcs]);

  return (
    <div className="globe" ref={wrapRef} role="img"
      aria-label="Rotating globe marking the financial centres the practice works across, from Sydney.">
      <canvas ref={cvsRef}></canvas>
    </div>
  );
}

Object.assign(window, { Globe });
