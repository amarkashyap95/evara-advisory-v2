# Evara Advisory — website

Independent advisory firm site. Institutional-finance aesthetic with AI substrate.

## Tech stack

- **Static HTML + inline JSX** (React 18 via Babel CDN — no build step, no `npm install` required for the site itself)
- **One serverless function** at `api/scope.js` (Node runtime, Vercel)
- **Hosted on Vercel**, auto-deploys from `main` branch
- **Domain** `www.evaraadvisory.com.au` (DNS via VentraIP → Vercel)

## File structure

```
index.html              Entry point. Loads React/Babel from CDN, then the JSX files in order.
vercel.json             Function config (max 30s) + cache headers. Do not add a build command.
README.md               Quick project overview.
DEPLOY.md               Deploy runbook (env vars, verification, rate limiting).

api/
  scope.js              Serverless function — called by Scope Drafter on Contact page.
                        Calls Anthropic API (claude-haiku-4-5). Has per-IP rate limit (5/hr).

components/             All React components. Loaded as <script type="text/babel">.
  app.jsx               Top-level App, page routing, localStorage persistence, TweaksPanel.
  shell.jsx             Sidebar, Footer, Ticker, Logo, Clock, SectionHead, Reveal/useReveal.
  home.jsx              Home page + Workbench artifacts (DCF model, dilution heatmap, waterfall).
  pages.jsx             About, Services, Track Record, Contact pages + Scope Drafter UI.

styles/
  tokens.css            Design tokens — colors, typography, spacing, utility classes.
                        Palette switching (ink/deep/paper) happens in app.jsx applyTweaks().
```

## How the JSX files talk to each other

No module system. Each JSX file is a `<script type="text/babel">` that runs in global scope.
Components defined in earlier files are attached to `window` (e.g. `Object.assign(window, {Sidebar, Footer, ...})`)
so later files can reference them. Loading order in `index.html` is: shell → home → pages → app.

When editing: if you need a helper from another file, confirm it's already exported to `window`.

## Design system

- **Colors** (dark/"ink" default — Anthropic-inspired warm palette): `--ink: #141413` (warm near-black), `--text: #E8E6DC` (warm white), `--cream: #EDE5CC`, `--live: #7B9B8E` (muted teal — functional accent only; lifted variant `--live-bright: #8FB5A6` for small dots)
- **Fonts**: Newsreader (display serif), Inter Tight (UI sans), IBM Plex Mono (numerical/technical)
- **Voice**: institutional finance + AI substrate. Numbered sections (§02, §03...). Mono for data, serif for headers.
- **No stock photography.** Proof via working artifacts, not decorative imagery.

## Deploying changes

1. Push to `main` on GitHub → Vercel auto-deploys in ~60s
2. No build step. No tests. Just push.
3. For trivial edits: edit directly on github.com (pencil icon → commit) — fastest path.

## Environment variables

| Name | Set in | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | Vercel → Settings → Environment Variables | Powers the Scope Drafter. Without it, only that one feature fails; rest of site is fine. |

Changes to env vars require a redeploy to take effect.

## Things to NOT change without thinking

- Do not add a build step (Vite, Next.js, webpack). The whole site is intentionally buildless — changes go live in 60s. Converting to a build system breaks this property.
- Do not remove the `window.claude.complete` fallback in `pages.jsx` ContactPage — it's how the Scope Drafter still works inside Claude Design preview. In production it auto-switches to `/api/scope`.
- Do not delete `/*EDITMODE-BEGIN*/ ... /*EDITMODE-END*/` markers in `app.jsx` — they're used by Claude Design's edit mode.
- Do not commit the Anthropic API key to the repo. It lives in Vercel env vars only.

## Local preview

No build needed. Any static server works:

```sh
cd evara-advisory-v2
python3 -m http.server 8000
# → http://localhost:8000
```

The `/api/scope` serverless function will NOT run under a plain static server —
the Scope Drafter will show its fallback error locally. This is expected.
To test the serverless function locally, use `vercel dev` (requires Vercel CLI).

## Common change recipes

- **Copy edits**: find text in `components/home.jsx` or `components/pages.jsx`, edit, push.
- **Color change**: edit `styles/tokens.css` CSS variables at `:root`. For palette switching, also update `applyTweaks()` in `app.jsx`.
- **Add a section**: follow `SectionHead` pattern in existing pages. Number sequentially (§0X).
- **Change Scope Drafter prompt**: edit the prompt string in `api/scope.js` (the `const prompt = ...` block).
- **Rate limit tuning**: `RATE_LIMIT` and `RATE_WINDOW_MS` constants at top of `api/scope.js`.

## Known quirks

- Babel in-browser transpiles every page load in dev. Slow in dev, fine in production (minified on Vercel's edge).
- Sidebar collapses to top bar below 1100px — checked in `styles/tokens.css` `@media` queries.
- `localStorage` key `evara-page` persists last viewed page across reloads.

## Context on the operator

Single-principal advisory. Sydney, AU. Clients span institutional capital allocators
(LPs, family offices, funds) AND operators (founders, CEOs). Site positioning should
work for both — do not drift into founder-only or institution-only voice.
