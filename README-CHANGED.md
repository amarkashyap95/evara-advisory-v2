# Changed files only

Copy each over the same path in your repo, commit, push.

    styles/tokens.css
    components/globe.jsx
    components/home.jsx
    components/pages.jsx
    components/contact.jsx

Nothing else changed. index.html, vercel.json, api/scope.js, the favicons,
the social card, robots.txt, sitemap.xml and site.webmanifest are untouched
since the last full package.

## What is in them

tokens.css        Slate strip and band styles, lift-out quote panel, grid
                  spans c1-10 / c2-10 / c2-9, globe pointer-events fix,
                  compacted section spacing, AA-contrast disclaimer colour.
globe.jsx         47 financial centres, drag-to-spin with inertia, hover
                  labels with live local time, click-to-focus with a line
                  back to Sydney. Projection un-mirrored: the camera sits on
                  +y looking at the origin with +z up, so screen-right is the
                  -x axis. Continents and cities now render the correct way
                  round and the globe spins eastward like the real Earth.
home.jsx          Tightened strip-to-list gaps, even closing block spacing.
pages.jsx         About / Services / Track Record restyle: strip heads,
                  slate bands, lift-out quote, equalised masthead gaps.
contact.jsx       Masthead gap matched to the other pages.

## Push

    git add -A
    git commit -m "Globe orientation fix, editorial restyle, spacing pass"
    git push origin main

Vercel deploys in about 60 seconds. No build step.

## Then

Hard-refresh (Cmd+Shift+R) before judging it, or you will get the old CSS
from cache. The Scope Drafter fails on a local static server and works on
Vercel; that is expected.

Spot-check the globe: drag it and confirm Australia's east coast, with the
Sydney dot, sits on the right-hand side.

No social-card or favicon changes in this batch, so the LinkedIn and
Facebook cache purges are NOT needed this time.
