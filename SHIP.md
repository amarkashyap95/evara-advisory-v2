# Ship this to evaraadvisory.com.au

Everything in this folder mirrors your repo's structure. Copy it in, overwrite, push.

## 1. Copy files into your repo

Overwrite the matching paths:

    index.html
    vercel.json
    styles/tokens.css
    components/app.jsx
    components/shell.jsx
    components/globe.jsx        <- new
    components/land.js          <- new (plain script, NOT babel)
    components/home.jsx
    components/pages.jsx
    components/contact.jsx      <- new
    principal-portrait.webp     <- new
    skyline.svg                 <- new
    favicon.ico                 <- new
    favicon-16x16.png           <- new
    favicon-32x32.png           <- new
    favicon-180x180.png         <- new
    favicon-512x512.png         <- new
    evara-social-card.png
    CLAUDE-CODE-PROMPT.md       <- design brief, keep in repo

## 2. Delete these from your repo

They belong to the old design and nothing loads them any more:

    components/hero-bg.jsx
    components/workbench.jsx
    logo-kit/favicon/            (old dark-palette icons, now stale)

## 3. Do NOT touch

    api/scope.js                 your Anthropic key + rate limiting
    .gitignore

`vercel.json` is included because cache headers changed, but if you have edited
yours since, diff before overwriting rather than replacing it wholesale.

## 4. Check locally

    cd your-repo
    python3 -m http.server 8000
    # http://localhost:8000

The Scope Drafter will show its fallback error locally. That is expected:
/api/scope does not run under a plain static server. It works once deployed.

## 5. Push

    git add -A
    git commit -m "Redesign: editorial identity, globe, contact rebuild"
    git push origin main

Vercel deploys in about 60 seconds. No build step.

## 6. Verify on production

- Hard-refresh (Cmd+Shift+R) so the old CSS is not cached
- Home: headline reveals line by line, globe rotates with tracers firing between cities
- Nav: the olive rule slides between items
- Contact: submit a test brief, confirm it lands in Formspree
- Scope Drafter: enter a situation, confirm it returns a scope (proves ANTHROPIC_API_KEY is live)
- Tab icon shows the new light mark, not the old dark tile

## If something looks wrong

Vercel keeps every previous deployment. Deployments > pick the last good one >
Promote to Production. That is an instant rollback while you sort the issue.
