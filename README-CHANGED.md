# Changed files only

Six files. Copy each over the same path in your repo, commit, push.

    styles/tokens.css
    components/app.jsx
    components/shell.jsx
    components/globe.jsx
    components/home.jsx
    components/pages.jsx

Untouched this batch: index.html, vercel.json, api/scope.js, the favicons,
evara-social-card.png, robots.txt, sitemap.xml, site.webmanifest,
principal-portrait.webp, skyline.svg.

## What changed

tokens.css     Scroll-reveal styles for ruled rows, sticky running-head
               styles, globe opacity now multiplied by scroll depth.
app.jsx        Mounts the running head.
shell.jsx      New ScrollRows and RunningHead components.
globe.jsx      Rotation and opacity ease with reading depth, read from a
               passive listener so the render loop never measures layout.
home.jsx       Practice index rows reveal on scroll.
pages.jsx      Engagement notes and About dossier reveal on scroll.
               Services method note rewritten (AI scoped to admin work).
               Duplicate AFSL disclaimer removed; it remains in the colophon.

## Push

    git add -A
    git commit -m "Scroll reveals, running heads, globe scroll depth, copy edits"
    git push origin main

Vercel deploys in about 60 seconds. No build step.

## Then

Hard-refresh (Cmd+Shift+R) or you will get cached CSS. Scroll the home page:
section labels should pin under the masthead, list hairlines should draw in as
you reach them, and the globe should ease as the hero leaves.

No favicon or social-card changes, so no LinkedIn or Facebook cache purge.
