# Evara Advisory — website

Institutional advisory site. Static HTML + inline-JSX (React via Babel) + one Vercel serverless function for the Scope Drafter on the Contact page.

## Structure

```
index.html           entry point (Vercel serves this at /)
vercel.json          function + caching config
DEPLOY.md            deployment runbook (read this before pushing to Vercel)

api/
  scope.js           serverless function — calls Anthropic API for scope drafter

components/
  app.jsx            top-level React app + page routing
  shell.jsx          chrome: header, footer, ticker, tweaks panel
  home.jsx           home page + Workbench artifacts (valuation, dilution, waterfall)
  pages.jsx          About, Services, Track Record, Contact pages

styles/
  tokens.css         color / typography / spacing design tokens
```

## Local dev

Any static file server works — no build step needed:

```sh
# pick whichever you have:
python3 -m http.server 8000
# or
npx serve .
```

Note: the `/api/scope` serverless function only runs on Vercel (or with `vercel dev` locally). When testing locally via a plain file server, the Scope Drafter will fall back to its "unable to generate" state — this is expected. It works in production.

## Deploying

See `DEPLOY.md` for the full runbook. Short version:
1. Push to your GitHub repo → Vercel auto-deploys
2. Add `ANTHROPIC_API_KEY` env var in Vercel Settings → Environment Variables
3. Redeploy (env changes need a fresh deploy to take effect)

## Required env vars

| Name | Where | Why |
|---|---|---|
| `ANTHROPIC_API_KEY` | Vercel → Settings → Environment Variables | Powers the Contact-page Scope Drafter. Without it, that one feature silently fails; the rest of the site works fine. |
