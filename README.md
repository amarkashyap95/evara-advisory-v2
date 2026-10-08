# Evara Advisory website

Static site for [evaraadvisory.com.au](https://www.evaraadvisory.com.au). Plain HTML, CSS and JavaScript: no build step, no framework, no serverless functions. Vercel serves the files as they are.

## Structure

```
index.html                 Home
about/index.html           About
services/index.html        Services
track-record/index.html    Track record
contact/index.html         Contact (brief form posts to Formspree)
404.html                   Not-found page

styles/site.css            All styles (design tokens at the top, in :root)
scripts/site.js            Motion (GSAP), video loading, nav state, page transitions, contact form
media/                     Hero loop (Sydney harbour), closing loop (water), poster images
principal-portrait.webp    About page portrait
evara-social-card-2026.jpg Link preview image (1200x630)
favicon-*, favicon.ico     Icons
site.webmanifest, robots.txt, sitemap.xml, vercel.json
```

## Editing

- **Copy:** edit the text directly in the relevant `index.html`. The header, footer and closing band are repeated in each page, so a change there needs making in all five pages (and `404.html`).
- **Colours and type:** the tokens at the top of `styles/site.css`.
- **Hero video:** replace `media/hero-1920.mp4` (desktop) and `media/hero-m-v2.mp4` (phone, portrait 720x1280) and `media/hero-poster.jpg`. Keep files under about 8 MB.
- **Contact form:** posts to Formspree form `xbdpvgwj`. Change the URL in `scripts/site.js` if the Formspree form changes.

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploying

Push to `main`. Vercel redeploys automatically in about a minute.

## Credits

- Hero footage: Pexels video 10741255 (Sydney Opera House and Harbour Bridge at sunset), free under the Pexels licence.
- Closing loop: original render.
- Fonts: Newsreader and Archivo, via Google Fonts.
- Motion: GSAP 3.12.5, loaded from cdnjs.
