# Changed files only

Seven files. Copy each over the same path in your repo, commit, push.

    index.html
    styles/tokens.css
    components/app.jsx
    components/globe.jsx
    components/home.jsx
    components/pages.jsx
    components/contact.jsx

Untouched: vercel.json, api/scope.js, the favicons, evara-social-card.png,
robots.txt, sitemap.xml, site.webmanifest, principal-portrait.webp, skyline.svg.

## What changed in this batch

index.html        Dropped the italic axes from the Google Fonts request; the
                  site no longer downloads faces it cannot use.
tokens.css        Italics removed site-wide. New .display-1 style for the
                  single-line page mastheads. Tweaks-panel CSS deleted.
app.jsx           Tweaks panel removed. Art direction is now pinned in an ART
                  constant and applied once on mount, so nothing looks
                  different. EDITMODE markers kept.
globe.jsx         Mirrored projection fixed: the camera looks down +y, so
                  screen-right is the -x axis. Continents and cities were
                  drawn back to front. Drag sign re-signed to match.
home.jsx          Renamed the tweaks prop to art. No visual change.
pages.jsx         Mastheads set on one line.
contact.jsx       Masthead set on one line.

## Push

    git add -A
    git commit -m "Remove tweaks panel and italics, fix globe orientation, single-line mastheads"
    git push origin main

Vercel deploys in about 60 seconds. No build step.

## Then

Hard-refresh (Cmd+Shift+R) before judging it, or you will get the old CSS
from cache. Check the globe: Sydney should sit right of Perth, and cities
should drift left to right as Earth spins eastward.

No favicon or social-card changes, so the LinkedIn and Facebook cache
purges are not needed this time.
