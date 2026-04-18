// Vercel serverless function — /api/scope
// Calls Anthropic's API to generate an engagement scope from a prospect description.
// Requires ANTHROPIC_API_KEY environment variable to be set in Vercel project settings.

// --- Simple in-memory rate limiter (per-IP) ---
// NOTE: this is per-function-instance. On Vercel, cold starts reset it, and
// different regions have different instances. That's fine for abuse prevention
// at low-moderate traffic. For hard enforcement, move to Upstash Redis.
const RATE_LIMIT = 5;                // requests allowed
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour
const hits = new Map();              // ip -> [timestamps]

function checkRate(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_LIMIT) return false;
  arr.push(now);
  hits.set(ip, arr);
  // garbage-collect occasionally
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every(t => now - t > RATE_WINDOW_MS)) hits.delete(k);
    }
  }
  return true;
}

// --- Basic input hygiene ---
function sanitize(text) {
  if (typeof text !== 'string') return '';
  // trim, strip control chars, cap length
  return text.replace(/[\x00-\x1F\x7F]/g, ' ').trim().slice(0, 2000);
}

export default async function handler(req, res) {
  // CORS — same-origin only in production; permissive in case you test from other hosts
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // API key check
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not set');
    return res.status(500).json({ error: 'Server misconfigured.' });
  }

  // Rate limit
  const ip = (req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown').toString().split(',')[0].trim();
  if (!checkRate(ip)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Try again in an hour, or send the form below.' });
  }

  // Parse + validate
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid JSON.' }); }
  }
  const situation = sanitize(body?.situation || '');
  if (situation.length < 20) {
    return res.status(400).json({ error: 'Please describe the situation in a sentence or two.' });
  }

  // Build the prompt (same spec as before, now server-side)
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

Prospect situation: "${situation}"`;

  // Call Anthropic
  try {
    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.error('Anthropic API error:', apiRes.status, errText);
      return res.status(502).json({ error: 'Upstream unavailable. Please send the form below instead.' });
    }

    const data = await apiRes.json();
    const text = data?.content?.[0]?.text || '';
    if (!text) return res.status(502).json({ error: 'Empty response. Please send the form below instead.' });

    return res.status(200).json({ text });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Unable to generate right now. Please send the form below instead.' });
  }
}
