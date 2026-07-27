/* Armillary globe.
   Graticule only, no landmasses: an engraved instrument rather than a network diagram.
   City positions and the arcs between them are real coordinates on a real sphere. */

const { useRef: gUseRef, useEffect: gUseEffect } = React;

const CITIES = [
  { n: 'Sydney',    lat: -33.87, lon: 151.21, link: false },
  { n: 'Singapore', lat: 1.35,   lon: 103.82, link: true },
  { n: 'Hong Kong', lat: 22.32,  lon: 114.17, link: true },
  { n: 'Dubai',     lat: 25.20,  lon: 55.27,  link: true },
  { n: 'London',    lat: 51.51,  lon: -0.13,  link: true },
  { n: 'New York',  lat: 40.71,  lon: -74.01, link: true },
  { n: 'Tokyo',     lat: 35.68,  lon: 139.69 },
  { n: 'Shanghai',  lat: 31.23,  lon: 121.47 },
  { n: 'Mumbai',    lat: 19.08,  lon: 72.88 },
  { n: 'Zurich',    lat: 47.38,  lon: 8.54 },
  { n: 'Frankfurt', lat: 50.11,  lon: 8.68 },
  { n: 'Toronto',   lat: 43.65,  lon: -79.38 },
  { n: 'San Francisco', lat: 37.77, lon: -122.42 },
  { n: 'Sao Paulo', lat: -23.55, lon: -46.63 },
  { n: 'Johannesburg', lat: -26.20, lon: 28.05 },
  { n: 'Auckland',  lat: -36.85, lon: 174.76 },
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

function toVec(lat, lon) {
  const p = lat * RAD, l = lon * RAD;
  return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)];
}

/* Great-circle interpolation between two points on the sphere. */
function slerp(a, b, t) {
  let d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  d = Math.max(-1, Math.min(1, d));
  const o = Math.acos(d);
  if (o < 1e-6) return a;
  const s = Math.sin(o), k1 = Math.sin((1 - t) * o) / s, k2 = Math.sin(t * o) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

function Globe({ detail = 'dense', speed = 52, showArcs = true }) {
  const wrapRef = gUseRef(null);
  const cvsRef = gUseRef(null);

  gUseEffect(() => {
    const wrap = wrapRef.current, cvs = cvsRef.current;
    if (!wrap || !cvs) return;
    const ctx = cvs.getContext('2d');
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const STEP = detail === 'dense' ? 10 : detail === 'fine' ? 15 : 20;
    const SAMPLE = detail === 'dense' ? 2 : 3;

    let w = 0, h = 0, dpr = 1, raf = 0, start = performance.now();

    const size = () => {
      const r = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      cvs.width = Math.round(w * dpr); cvs.height = Math.round(h * dpr);
      cvs.style.width = w + 'px'; cvs.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const HUBV = CITIES.map(c => toVec(c.lat, c.lon));
    const respawn = (tr, t) => {
      tr.a = Math.floor(Math.random() * HUBV.length);
      do { tr.b = Math.floor(Math.random() * HUBV.length); } while (tr.b === tr.a);
      tr.t0 = t + Math.random() * 1600;
      tr.dur = 2400 + Math.random() * 1800;
    };
    const tracers = [];
    for (let i = 0; i < 5; i++) { const tr = {}; respawn(tr, performance.now() - Math.random() * 2600); tracers.push(tr); }

    /* Orthographic projection with a fixed tilt and an animated spin. */
    const TILT = -12 * RAD;
    const project = (v, spin, R, cx, cy) => {
      const cs = Math.cos(spin), sn = Math.sin(spin);
      const x1 = v[0] * cs - v[1] * sn;
      const y1 = v[0] * sn + v[1] * cs;
      const z1 = v[2];
      const ct = Math.cos(TILT), st = Math.sin(TILT);
      const y2 = y1 * ct - z1 * st;
      const z2 = y1 * st + z1 * ct;
      return { x: cx + x1 * R, y: cy - z2 * R, front: y2 > 0 };
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

    const draw = (now) => {
      const t = (now - start) / 1000;
      const spin = reduced ? 0.9 : t * (speed / 1000);
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.44;
      const cx = w / 2, cy = h / 2;
      ctx.strokeStyle = getComputedStyle(wrap).color;
      ctx.fillStyle = ctx.strokeStyle;
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';

      /* Limb */
      ctx.globalAlpha = 0.6; ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      /* Parallels, with the tropics and polar circles when dense */
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
      /* Meridians */
      for (let lon = 0; lon < 180; lon += STEP) {
        const pts = [];
        for (let lat = -90; lat <= 90; lat += SAMPLE) pts.push(project(toVec(lat, lon), spin, R, cx, cy));
        stroke(pts, lon === 0 ? 0.28 : 0.18, lon === 0 ? 0.95 : 0.85);
      }

      /* Coastlines */
      if (detail !== 'plain') {
        for (const ring of land()) {
          const pts = ring.map(c => project(toVec(c[1], c[0]), spin, R, cx, cy));
          stroke(pts, 0.6, 1);
        }
      }

      /* Financial centres */
      {
        for (const c of CITIES) {
          const p = project(toVec(c.lat, c.lon), spin, R, cx, cy);
          if (!p.front) continue;
          ctx.globalAlpha = 0.55;
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill();
        }
      }

      /* Shooting links: tracers travelling the great circle between centres. */
      if (showArcs) {
        for (const tr of tracers) {
          const p = (now - tr.t0) / tr.dur;
          if (p >= 1) { respawn(tr, now); continue; }
          if (p < 0) continue;
          const a = HUBV[tr.a], b = HUBV[tr.b];
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
            ctx.beginPath(); ctx.arc(hp2.x, hp2.y, 1.9, 0, Math.PI * 2); ctx.fill();
          }
        }
      }

      /* Sydney sits permanently on the sphere. */
      const hp = project(HUBV[0], spin, R, cx, cy);
      if (hp.front) {
        ctx.globalAlpha = 0.85;
        ctx.beginPath(); ctx.arc(hp.x, hp.y, 2.6, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 0.35; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(hp.x, hp.y, 7, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    size();
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(() => { size(); if (reduced) draw(performance.now()); });
    ro.observe(wrap);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [detail, speed, showArcs]);

  return (
    <div className="globe" ref={wrapRef} aria-hidden="true">
      <canvas ref={cvsRef}></canvas>
    </div>
  );
}

Object.assign(window, { Globe });
