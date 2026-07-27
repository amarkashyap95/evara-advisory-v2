# Ship this to evaraadvisory.com.au

Everything here mirrors your repo structure. Copy in, overwrite, push.

## 1. Copy into your repo

    index.html
    vercel.json
    site.webmanifest            <- new
    robots.txt                  <- new
    sitemap.xml                 <- new
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
    evara-social-card.png       <- REPLACED (was the old dark card)
    favicon.ico                 <- REPLACED
    favicon-16x16.png           <- REPLACED
    favicon-32x32.png           <- REPLACED
    favicon-180x180.png         <- REPLACED
    favicon-512x512.png         <- REPLACED
    CLAUDE-CODE-PROMPT.md       design brief, keep in repo

All icon and card files must sit at the repo ROOT, not in a subfolder.
The metadata references them as /favicon.ico etc.

## 2. Delete from your repo

    components/hero-bg.jsx
    components/workbench.jsx
    logo-kit/favicon/            old dark-palette icons, now stale

## 3. Do not touch

    api/scope.js                 your Anthropic key and rate limiting

## 4. Push

    git add -A
    git commit -m "Redesign: editorial identity, globe, metadata and icons"
    git push origin main

Vercel deploys in about 60 seconds. No build step.

## 5. Refresh the caches that will not refresh themselves

The site itself updates on a hard refresh (Cmd+Shift+R). Three things cache
externally and need a manual nudge, otherwise they keep showing the old dark
branding for days or weeks.

LinkedIn
  https://www.linkedin.com/post-inspector/
  Paste https://www.evaraadvisory.com.au/ and hit Inspect. Run it twice: the
  first pass often returns the cached version, the second returns fresh.

Facebook and WhatsApp
  https://developers.facebook.com/tools/debug/
  Paste the URL, click Scrape Again.

X / Twitter
  No manual purge any more. It picks up the new card within a day or so.
  The ?v=2 on the image URL is what forces it.

Google
  https://search.google.com/search-console
  If the domain is not verified yet, add it (DNS TXT record via VentraIP).
  Then URL Inspection > paste the URL > Request Indexing.
  The favicon in search results updates on Google's own schedule, typically
  a few days to a few weeks after the next crawl. Nothing speeds that up.
  Also submit https://www.evaraadvisory.com.au/sitemap.xml under Sitemaps.

Slack
  Caches for about 30 minutes. Wait it out.

## 6. Verify on production

- Hard-refresh, then check the tab icon is the light mark, not the dark tile
- Home: headline reveals line by line, globe rotates with tracers firing
- Nav: the olive rule slides between items
- Contact: submit a test brief, confirm it reaches Formspree
- Scope Drafter: enter a situation, confirm a scope returns
  (this proves ANTHROPIC_API_KEY is live; it always fails locally)
- Paste the URL into a LinkedIn message box and confirm the new card appears

## Rollback

Vercel keeps every deployment. Deployments > last good one > Promote to
Production. Instant, no rebuild.
