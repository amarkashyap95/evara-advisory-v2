# Deploy — Services rewrite, Home practice index, About page close

Three files changed. Nothing else in the repo is touched: no new dependencies,
no build step, no config changes.

```
components/pages.jsx
components/home.jsx
styles/tokens.css
```

Copy all three over the versions in your repo, keeping the same paths, and
push to `main`. Vercel redeploys in ~60s.

---

## What changed

**components/pages.jsx** — Services and About

- Services rewritten around five practice areas: Commercial strategy, Unit
  economics, Operating models, Investor readiness, Commercial due diligence.
  Each carries a kicker line and four named workstreams.
- New full-width intro paragraph under the Services title.
- New "Both ends of the same table" block splitting operators from investors
  and boards.
- Removed: the old five-service list, the "A note on method" AI section, the
  fund-structuring adjacent line.
- Closing call-to-action removed from About, Services and Track Record. The
  `Closer` component is still defined and exported, just unused.
- About now ends on a full-bleed navy band with no rule under the dossier.

**components/home.jsx** — Home practice index

- The five home practice areas now match the Services page, same names and
  same order, each cut to one summary sentence.

**styles/tokens.css**

- `.svc-list` — workstream lists under each Services practice area.
- `.strip-rule` — the navy band closing the About page. Height derived from
  the same clamps as `.strip-dark` so the two always match.
- `main:has(.strip-rule--foot) + .colophon` — suppresses the footer hairline
  on pages ending with the band.
- `.no-tail-rule` — removes the closing rules under the About dossier list.
- `.index-row` alignment changed from `baseline` to `center`. Affects the
  practice lists on Home and Services and the engagement list on Track Record.
- `.lines .line` bottom padding raised from `.1em` to `.24em`. Fixes clipped
  descenders in masked headlines, which the word "capital" in the new Services
  title exposed. Affects every page, line spacing unchanged.

## Verify after deploy

1. Home and Services show the same five practice areas in the same order
2. Services title "and the capital behind them." — the "p" descender is not clipped
3. About ends with the navy band, no hairline above the footer, no rule under the last role
4. No closing call-to-action on About, Services or Track Record
5. Track Record rows still read well with centred alignment
6. Contact unchanged, Scope Drafter still works
