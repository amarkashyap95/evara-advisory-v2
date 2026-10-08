# Evara Advisory website: notes for editing

Static multi-page site, hosted on Vercel, auto-deploys from `main`. Domain `www.evaraadvisory.com.au`.

## Rules

- Do not add a build step or framework. Every page is a hand-editable `index.html`.
- Shared chrome (nav, mobile menu, closing band, footer) is duplicated in each page. Keep all copies identical.
- All styling lives in `styles/site.css`; all behaviour in `scripts/site.js`. No inline styles beyond small layout tweaks.
- Page motion uses GSAP + ScrollTrigger from cdnjs. Animations start from a visible resting state; nothing should depend on JS to be readable.
- Voice: plain, specific, no em dashes. Third person for the practice ("Evara", "Amar"), first person only in "What I am hired to do" and "Work I can talk about".
- Evara Advisory is a sole trader business. Never write "Pty Ltd".
- No stock photography beyond the hero and closing video loops.

## Design tokens (styles/site.css :root)

- Paper `#F5F3EE`, paper-2 `#ECE8DF`, white `#FBFAF7`, ink `#14161A`
- Night `#0F1216` (footer), harbour blue `#1F3A4D` (accent bands), sun `#E2B985` (small marks only)
- Display: Newsreader 300. Body/UI: Archivo 400/500.

## Pages

- Home: hero video, practice statement + background, practice areas, selected engagements (harbour band), client quote.
- About: bio with portrait, career timeline.
- Services: who it is for (two lenses), five practice areas, how an engagement runs, engagement shapes.
- Track record: index + four case chapters (Mandate, Built, Where it landed).
- Contact: what happens next, contact details, brief form (Formspree).
