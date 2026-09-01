# Deploy — Services rewrite + About page close

Two files changed. Nothing else in the repo is touched: no new dependencies,
no build step, no config changes.

```
components/pages.jsx
styles/tokens.css
```

Copy both over the versions in your repo, keeping the same paths, and push to
`main`. Vercel redeploys in ~60s.

---

## What changed

**components/pages.jsx**

- Services page rewritten around five practice areas: Commercial strategy,
  Unit economics, Operating models, Investor readiness, Commercial due
  diligence. Each carries a kicker line and four named workstreams.
- New full-width intro paragraph under the Services title.
- New "Both ends of the same table" block splitting operators from investors
  and boards.
- Removed: the old five-service list, the "A note on method" AI section, the
  fund-structuring adjacent line.
- Removed the closing call-to-action from About, Services and Track Record.
  The `Closer` component is still defined and exported, just unused.
- About page now ends on a full-bleed navy band.

**styles/tokens.css**

- `.svc-list` — the workstream lists under each Services practice area.
- `.strip-rule` — the navy band closing the About page. Height derived from
  the same clamps as `.strip-dark` so the two always match.
- `main:has(.strip-rule--foot) + .colophon` — suppresses the footer hairline
  on pages that end with the band.
- `.no-tail-rule` — removes the closing rule under the About dossier list.
- `.lines .line` bottom padding raised from `.1em` to `.24em`. This fixes
  descenders being clipped in masked headlines, which the word "capital" in
  the new Services title exposed. Affects every page, spacing unchanged.

## Verify after deploy

1. Services page loads and shows five practice areas
2. Services title "and the capital behind them." — the "p" descender is not clipped
3. About page ends with the navy band, no hairline above the footer
4. No closing call-to-action on About, Services or Track Record
5. Home and Contact unchanged, Scope Drafter still works
