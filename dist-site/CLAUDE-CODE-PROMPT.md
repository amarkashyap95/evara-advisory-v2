# Claude Code prompt — Evara Advisory visual redesign

Paste everything below the line into Claude Code, running in the `evara-advisory-v2` repo.

---

Redesign the Evara Advisory site's visual layer. Keep the architecture exactly as it is —
buildless static HTML + inline JSX via Babel CDN, no bundler, no npm install, deploy by
pushing to `main`. Do not add a build step.

## What must not change

- `api/scope.js` — leave the serverless function completely alone.
- `vercel.json` — no changes.
- The `window.claude.complete` fallback in the Scope Drafter. It must still detect the
  Claude Design preview and fall back to `/api/scope` in production.
- The `/*EDITMODE-BEGIN*/ ... /*EDITMODE-END*/` markers in `components/app.jsx`.
- The Formspree endpoint `https://formspree.io/f/xbdpvgwj`.
- `localStorage` key `evara-page`.
- The five-page structure: Home, About, Services, Track Record, Contact.

## Design direction — "The Quarterly"

The current site reads as machine-generated. The tells to remove: `§01`/`§02` section
labels repeated on every section, a monospace font used for every label, an identical
140px label gutter on every block, scroll-reveal fade-ins on every element, and pill-shaped
buttons. Replace all of that.

Target reference: institutional print. A fund's annual letter, an FT special report, a
Baillie Gifford or Ruffer publication. Sophisticated, quiet, warm, unmistakably financial,
with a modern editorial edge.

### Palette

```
--paper      #FAF8F4   warm near-white, primary background
--paper-band #F1EEE7   recessed band for alternate sections
--ink        #14181C   near-black, primary text
--ink-2      #3D444C   secondary text
--ink-3      #6C737C   labels, metadata
--ink-4      #9AA0A7   placeholders
--accent     #525839   deep olive, THE accent
--rule       rgba(20,24,28,.16)
--rule-2     rgba(20,24,28,.09)
```

The accent must occupy roughly one per cent of the visible surface. It appears only on: the
italic "Advisory" in the wordmark, the active nav underline, roman numerals in index rows,
organisation names in the dossier, and link hover. Nowhere else. No accent backgrounds,
no accent buttons, no accent borders on cards.

### Three devices that carry the identity

These are the things that make the site memorable. Build all three.

1. **Paper grain.** A fixed full-viewport overlay at `opacity: .05`,
   `mix-blend-mode: multiply`, `pointer-events: none`, tiling a 200px inline SVG
   `feTurbulence` (fractalNoise, baseFrequency .85, 3 octaves, desaturated). This is what
   stops the flat cream reading as a blank div and makes it read as stock. Hide it in print.
2. **Ruled column grid.** In the hero only, draw the underlying twelve columns as 1px
   hairlines at `--rule-2`, absolutely positioned behind the content, masked with a
   `linear-gradient` so they fade out by 92% down the block. The page then sits on ruled
   paper instead of floating. Hidden below 900px. Hero content needs `position: relative;
   z-index: 1` to sit above it.
3. **Rotating globe.** `components/globe.jsx`, a canvas sphere in the Home hero's right
   field, with `components/land.js` loaded before it as a plain script.

   The coastlines are real: Natural Earth 110m country outlines from
   `world-atlas@2.0.2/countries-110m.json`, meshed with `topojson.mesh` so shared borders are
   drawn once, simplified to 0.75 degrees and **baked into `land.js` at build time**. The
   shipped site therefore loads no d3, no topojson and makes no runtime fetch. If the
   outlines ever need regenerating, do it in a throwaway builder page and paste the result
   back; never hand-draw geography.

   Orthographic projection, 12 degrees of tilt, one rotation every two minutes. Back-facing
   points are dropped mid-path so the far hemisphere hides correctly. Graticule every 10
   degrees sits *under* the coastlines at roughly half their alpha, so land reads first.
   Sixteen financial centres are marked with small dots, and real great-circle arcs
   (spherical interpolation) run from Sydney to Singapore, Hong Kong, Dubai, London and New
   York, one at a time on a 3s slot: draw in, hold, fade. Whole thing at `opacity: .34`,
   radially masked, sitting right of the headline so it never runs under it. Under
   `prefers-reduced-motion` it paints one static frame with no animation loop.

4. **The reversal spread.** Exactly one dark surface on the whole site: the Home pull
   quote, on `#12161B` with `clamp(88px, 13vw, 180px)` of vertical padding. Do not style its
   children individually. Redefine the tokens inside the section (`--ink: #F4F1EA`,
   `--ink-2: #C2BFB6`, `--ink-3: #928F87`, `--ink-4: #6F6C65`, `--accent: #9EA878`, rules at
   24% and 12% white) so every child inverts automatically. Used once, it is a moment and it
   gives the page rhythm. Used twice, it is a theme and the effect dies.

5. **Axonometric skyline.** `skyline.svg` in the repo root, sunk into the dark spread at
   `opacity: .24`, bleeding off the bottom-right, masked with a `linear-gradient` so it
   dissolves upward. It is generated geometry, not a drawing: ~62 cuboids on an isometric
   projection, each drawn as three faces filled with the band colour and stroked in a 1.15px
   hairline, sorted back to front so nearer forms occlude farther ones. That painter's-order
   occlusion is what makes it read as a considered technical drawing rather than clip art.
   Regenerate it deterministically from a seed if it ever needs changing; never hand-edit
   the path data.

**No stock photography, ever.** No harbour shots, no glass towers, no handshakes. In this
category design restraint is read as a proxy for operational quality, and a stock hero reads
as a template. Imagery is either the client's own material, or geometry constructed in the
site's own line weight.

### Typography

Two families, both from the same foundry so the pairing looks deliberate:

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
```

- **Instrument Serif** — all display type and headings. Its italic is the signature; use it
  for the second line of two-line headlines and for emphasis inside prose.
- **Instrument Sans** — body copy, labels, UI, form fields.
- **No monospace anywhere.** Delete IBM Plex Mono entirely. For figures, use
  `font-variant-numeric: tabular-nums lining-nums` on Instrument Sans or Instrument Serif.
- Labels are Instrument Sans, 11.5px, weight 500, `letter-spacing: .15em`, uppercase,
  colour `--ink-3`.
- Headline tracking is tight: `-.028em` on the largest display, `-.02em` on h2.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.

### Layout

A real twelve-column grid, `max-width: 1320px`, `gap: 24px`, gutter
`clamp(20px, 4.5vw, 64px)`. Use it **asymmetrically** — this is the single most important
instruction. Never centre everything, never repeat the same column split twice in a row.

Concrete placements:

- Hero: headline spans columns 1–8; a short author's note sits in columns 9–12, bottom-aligned
  to the headline (`align-items: end` on the grid row).
- Standfirst below the hero is indented to columns 5–12, not full width.
- Section openers: a hairline rule plus a label in columns 1–3, content in columns 4–12.
- Pull quotes sit in columns 2–8 with the attribution in columns 9–12, bottom-aligned.
- Below 900px every column class collapses to full width.

### Motion — directed, not decorative

The governing principle: award-level craft lives *between states* — page-to-page,
hover-to-active, first paint. Cheap sites cut; good ones move. But scroll-triggered reveals
on every element are the loudest AI tell — **delete every one of them**, along with the
`useReveal` / `Reveal` components. Nothing on this site animates because it scrolled into
view. The static frames must already be strong; the motion only paces them.

Two easing curves, used everywhere:

```
--ease-out: cubic-bezier(.16,1,.3,1)
--ease-io:  cubic-bezier(.65,0,.35,1)
```

Build these eight things and nothing else:

1. **Font-gated first paint.** Wait on `document.fonts.ready` (with a 1200ms timeout
   fallback) before playing the intro, so the masked headline reveals real letterforms and
   never swaps mid-animation. Then add `is-in` to `<main class="stage">`.
2. **Line-masked headline reveal.** A `SplitLines` component takes an array of lines and
   wraps each in `overflow: hidden`, with the inner span at `translateY(112%)` rising to 0
   over 1s, staggered ~95ms per line. Used on the hero and every page masthead — nowhere
   else. Compensate the mask padding so descenders and italic overhangs are not clipped.
3. **Staged rise.** A `.rise` utility — `opacity 0 → 1`, `translateY(14px) → 0`, 800ms, with
   a per-element `--d` delay. Used to pace the kicker, the standfirst, and the buttons
   behind the headline. Roughly: kicker 60ms, rule 140ms, headline 300ms, right column
   620ms, standfirst 760ms, buttons 860ms.
4. **Directed page transitions.** Not a crossfade. On navigation the outgoing surface lifts
   and fades (`translateY(-10px)`, 260ms), *then* the content swaps, scroll resets, and the
   incoming page replays its full intro choreography. Keep the requested page and the
   painted page in separate state so the swap happens at the midpoint.
5. **Sliding nav indicator.** A single 1px claret bar positioned with
   `translateX(offsetLeft) scaleX(offsetWidth)`, transitioning 520ms. It slides between nav
   items — a shared element, not a cut. Re-measure on resize (`ResizeObserver`) and after
   `document.fonts.ready`.
6. **Reading progress.** A 1px claret hairline along the masthead's bottom edge,
   `transform: scaleX(scrollProgress)`. rAF-throttled, transform-only.
7. **Sticky running heads.** Section labels in the left column use `position: sticky;
   top: 104px` so they hold while their section is read and release at its end — like a
   running head in a book. Static below 900px.
8. **Hover craft.** Index rows nudge the title `translateX(7px)` and the numeral `4px` on
   500ms `--ease-out`. Text links use a two-pseudo-element wipe: the underline retracts to
   the right, then redraws from the left after a 180ms beat. The filled button fills with
   claret from the bottom via animated `background-size` (no markup change needed).
   Suppress the row nudge under `@media (hover: none)`.

Also: a subtle scroll parallax on the About portrait (`±18px`, image pre-scaled 1.1 inside
an `overflow: hidden` frame) and a greyscale-to-partial-colour filter on hover.

**Performance and accessibility are part of the brief, not a footnote.** Every animation is
transform or opacity only. All scroll listeners are `passive` and rAF-throttled. Under
`prefers-reduced-motion: reduce` every transition is disabled and every element renders in
its final state — including the page transition, which becomes an instant swap. Test it by
toggling the media query; a broken or jarring reduced-motion path is the tell of an amateur.

### Components to build

- **Masthead** — sticky, wordmark left, text nav right, no border until scrolled. Active
  page marked with a 1px claret underline. Sharp corners. No hamburger; below 560px the
  wordmark stacks above a wrapping nav row.
- **Practice index** — replaces the old card grid. A table-of-contents row per item:
  roman numeral (I–V, Instrument Serif, claret, 17px) in a 64px column, then the title as
  an h3, then the description. Hairline between rows, heavier rule top and bottom.
  This replaces `§01`-style numbering everywhere.
**No portrait on Home.** The hero right column is the statement, then a hairline, then the
name and role. The portrait appears on About only.

- **Pull quote section** on Home is the reversal spread described above, opened by an
  "In their words" label spanning the full width.
- **Dossier** — the About timeline. Year range in a 110px column, role as h3, organisation
  in claret label type, note beneath.
- **"Selected engagements"** — a Home section listing the four real engagements, each row
  showing the work on the left and the client type / jurisdiction on the right, ending in a
  text link through to Track Record. No availability or capacity language anywhere on the
  site.
- **Portrait** — `principal-portrait.webp` (already in the repo root) appears once, on About:
  full width in columns 1–4 with the biography in columns 6–12. Sharp corners, a 1px solid
  ink rule along the top edge only, `filter: grayscale(1) contrast(1.04)` easing toward
  colour on hover, and a slow ±18px scroll parallax inside an `overflow: hidden` frame.
  Caption beneath in label type: name, then role in `--ink-4`. Not on Home, not anywhere
  else.
- **Colophon** — footer with a 1px ink top rule, wordmark plus three link columns, and a
  bottom line reading "Set in Instrument Serif & Instrument Sans".

### Buttons

Two only. A sharp-cornered filled ink rectangle (`padding: 14px 26px`, `border-radius: 0`,
hover to claret), and a text link with a 1px underline. No pills, no ghost buttons, no icons,
no arrow glyphs.

### Forms

Underline-only fields — transparent background, 1px bottom border, no box, no radius, no
focus ring beyond the border darkening to ink. Labels in the uppercase label style.
Selects get a small CSS caret drawn with two linear-gradients.

## File-by-file

- `index.html` — swap the Google Fonts link for Instrument Serif + Instrument Sans. Replace
  the inline data-URI favicon with real files: `favicon.ico` (`sizes="any"`),
  `favicon-32x32.png`, `favicon-16x16.png` and `favicon-180x180.png` as the apple-touch-icon.
  Add script tags for `components/globe.jsx` (after `shell.jsx`) and `components/contact.jsx`
  (after `pages.jsx`). Remove `components/hero-bg.jsx` and `components/workbench.jsx` if they
  are still referenced.

### Favicons

Do NOT reuse `logo-kit/favicon/*`. Those were generated for the old dark `#0A0E14` identity
and ship the previous brand. Regenerate the same mark in the current palette: paper `#FAF8F4`
ground, ink rules, the third rule in the olive accent. Simplify at small sizes — 16px and 32px
carry the three rules alone, because the surrounding frame turns to mush below about 48px;
180px and 512px keep the frame. Root-level files, not in a subfolder.
- `styles/tokens.css` — full rewrite against the tokens above.
- `components/shell.jsx` — export `Masthead`, `Colophon`, `Opener`, `ROMAN`, `SplitLines`,
  `useParallax`, `REDUCED`. Delete `Sidebar`, `Ticker`, `Clock`, `Logo`, `SectionHead`,
  `Reveal`, `useReveal`.
- `components/home.jsx` — five sections: hero, practice index, selected engagements, pull
  quote, ledger plus closing call to action. Delete every workbench artifact (DCF model,
  dilution heatmap, waterfall) — proof now comes from the engagement list, the pull quote
  and the ledger.
- `components/pages.jsx` — About, Services, Track Record. Export a shared `PageMast`
  (kicker, drawn rule, display headline in columns 1–7, standfirst in 9–12) and a shared
  `Closer`.
- `components/land.js` — new file, plain `<script>` (not Babel), loaded first. Baked
  coastline coordinates only.
- `components/globe.jsx` — new file, loaded after `shell.jsx` and before `home.jsx`. Owns
  the globe canvas.
- `components/contact.jsx` — new file. Move `ContactPage` and the Scope Drafter here so no
  file exceeds roughly 400 lines.
- `components/app.jsx` — strip the entire tweaks system (palette, density, ticker, hero
  background, global background) and `applyTweaks`. Keep `PAGES`, the `localStorage`
  routing, `NotFoundPage`, and the EDITMODE markers wrapping an empty object. This file now
  also owns the transition orchestration described in Motion (4).
- Delete `components/hero-bg.jsx`.

## Copy notes

Keep the biographical facts: seven years across ANZ, PEXA Group, XT Ventures; Sydney.
Do NOT state how many investments went through investment committee, and do not mention
"IC-approved" counts at all. Describe sector breadth instead of numbers. Keep the "both sides of the table" line and the
family-office pull quote (Home only — do not repeat it on Track Record).

### Track record — use these four engagements and nothing else

Client names are confidential; describe by type and sector only.

1. **European private equity fund formation** — franchise group and family office,
   Australia / Europe. Structuring of a European private equity vehicle for one of
   Australia's largest franchise groups and its associated family office, delivered with the
   full financial model and the complete investor documentation suite.
2. **Group commercial strategy** — franchise group and family office, Australia / Europe.
   A wider commercial strategy mandate across the group, with the supporting financial
   modelling and the board strategy papers that carried it. Label this engagement with the
   same client descriptor as the one above; never write "same client" on the site.
3. **Financial modelling and investor materials** — beauty technology, consumer. Operating
   and fundraising model built from the ground up, with the investor materials to match.
4. **Investor materials preparation** — LegalTech, enterprise software. Financial model,
   investor pitch deck and supporting documentation prepared ahead of an institutional raise.

Delete any invented case study (the "healthtech Series A" narrative and the "Series A
healthtech CEO" quote must both go).

### Contact details — important

**No email address anywhere on the site.** No `mailto:` links, in the colophon, on Contact,
or in error copy. The only two routes are the brief form on the Contact page and
`https://www.linkedin.com/in/amar-kashyap`. In the colophon, the "Direct" column links to
"Send a brief" (routes to Contact) and LinkedIn. On the Contact page the sidebar column is
headed "Reach" and lists LinkedIn plus "Sydney, Australia · AEST".

### Avoid the other AI writing tics

Beyond em dashes and trailing italics, these read as machine-written and should not appear:

- **Staccato fragment triads** as a closer. Not "One principal. A small number of
  engagements. No layers." Write the full sentence instead.
- **"Deliberately", "intentionally", "carefully"** used to signal intent. Show the intent,
  do not label it. "The practice is deliberately single-principal" becomes "There is no
  associate pool here, and no capability deck."
- **"Quietly"** and similar knowing adverbs, especially in headings.
- **"Which is the point"** and other self-commentary on the sentence just written.
- **Everything arriving in threes.** Rule-of-three parallel lists are the strongest rhythmic
  tell there is. Vary the length of list items and break the parallelism.
- **"Actually"** as an intensifier.

When in doubt, read the sentence aloud. If it sounds balanced and pleased with itself,
rewrite it plainer.

### Never italicise the end of a sentence

Closing a headline or sentence with an italic clause is a recognisable AI writing tic and it
must not appear anywhere on the site. No "Commercial clarity, *custom-built.*", no "Send a
*brief.*", no "Want the *long version?*".

The serif italic stays in the system, but only in two places: the word "Advisory" in the
wordmark, and a genuine single-word or short-phrase emphasis sitting *mid*-sentence, where
the sentence continues afterwards. "The work, and the *shape* it takes." is fine because the
italic is not the tail. "on the *record.*" is not.

### No em dashes. This is a hard rule.

There must be no em dash (—) anywhere in the rendered site copy. Not in headings, body,
labels, alt text, aria-labels, placeholders, error messages, or the Scope Drafter's system
prompt (add an explicit instruction there telling the model not to use them either).
Rewrite each one properly rather than swapping in a hyphen: use a comma, a full stop, a
colon, or the word "and", whichever the sentence actually wants. En dashes in numeric date
ranges (2019–22) are correct and should stay.

### No counts of engagements

Remove the ledger/statistics block from both Home and Track Record entirely. The site must
not state how many engagements have been delivered, how many mandates are active, or how
many deals went through investment committee. Track record is framed as "a few examples of
the work" and "a selection", with a closing line making clear these are examples rather
than a full list. The reader should assume there is more, not count what is shown.

### Things never to say

No availability, capacity, or scarcity language. Nothing like "capacity for one further
engagement this quarter". No invented clients, metrics, or outcomes. No engagement counts.

Voice should read as written by one person, not a firm. Prefer plain British/Australian
English: "eighty per cent", not "80%". Avoid words like leverage, unlock, seamless,
bespoke, cutting-edge. No emoji. No stock photography.

## Tweaks panel

Three controls, no more, each retuning many values at once rather than pushing one property.
Store them in the `TWEAK_DEFAULTS` object inside the EDITMODE markers, write each change back
with `postMessage({ type: '__edit_mode_set_keys', edits })`, and apply them as data attributes
on `<html>` so CSS does the cascading:

- **Register** (`paper` / `bone` / `ink`) redefines the whole palette. `ink` flips every page
  dark, and the reversal spread inverts with it so it stays the one contrasting surface.
- **Composure** (`quiet` / `considered` / `assertive`) retunes `--disp-vw`, `--disp-max` and
  `--sec-pad` together, so display scale and section rhythm move as one.
- **Atmosphere** (`bare` / `engraved` / `instrument`) controls how present the constructed
  geometry is: `bare` hides the globe, ruled grid and skyline and drops the grain to 2%;
  `instrument` brings the globe forward, densens its graticule and sharpens the column rules.

Give each control a one-line note in the panel explaining what it retunes. Keep the panel
hidden until the Tweaks button is pressed.

## Responsive behaviour

Verified at 390px and 768px. The rules that matter:

- Every twelve-column class collapses to full width below 900px. Do not rely on inline
  `gridTemplateColumns` for anything that needs to collapse, because an inline style cannot
  be overridden by a media query. Use the `.cols-2` / `.cols-3` utilities instead: `.cols-3`
  goes to two columns at 860px, both go to one column at 640px.
- Display type has to shrink far enough that a headline line never wraps inside its reveal
  mask. `clamp(34px, 8.6vw, 124px)` for `.display` and `clamp(31px, 5.6vw, 72px)` for
  `.display-m`.
- The ruled column grid and the sticky running heads switch off below 900px. The watermark
  stays but sits lower and fainter.
- The masthead stacks to a column below 560px, with nav buttons padded to a 44px tap target.
  Buttons are 46px minimum, chips 44px.
- Form fields are 16.5px so iOS does not zoom the page on focus. Never drop them below 16px.
- `body { overflow-x: clip }` guards against the watermark bleed. Use `clip`, not `hidden`,
  because `hidden` creates a scroll container and breaks the sticky masthead.

Test by loading the page in an iframe at a real 390px width. Resizing an element does not
fire viewport media queries, so it will show you a false result.

## Definition of done

`python3 -m http.server 8000` serves the site with no console errors, all five pages
navigate, the contact form posts to Formspree, and the Scope Drafter falls back correctly.

Then run the juror's checklist before pushing:

1. Screenshot the hero with motion disabled. The static frame must still look composed — if
   it does not, the motion is covering weak art direction.
2. DevTools → Performance → 4× CPU slowdown. Navigation and scroll must stay smooth.
3. Watch the transitions rather than the pages. Nothing should hard-cut.
4. Toggle `prefers-reduced-motion` and confirm every page still reads correctly with all
   content visible.
5. Search the built site for the em dash character. There must be zero matches.

Then push to `main`.
