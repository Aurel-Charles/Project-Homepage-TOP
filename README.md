# Personal Portfolio — The Odin Project

A responsive one-page portfolio built from scratch as part of The Odin Project's
Advanced HTML & CSS course. The whole page is generated from a single data file
by vanilla JavaScript, bundled with Webpack 5.

**Live demo:** https://aurel-charles.github.io/Project-Homepage-TOP/

---

## Features

- **Three distinct layouts** — mobile, tablet and desktop, each rebuilt rather than
  merely reflowed (see the breakpoint table below).
- **Data-driven markup** — every section is generated from `src/data.js`. Adding a
  project means adding one object, not writing HTML.
- **WebP with JPEG fallback** — served through `<picture>` so browsers negotiate the
  format before downloading.
- **Hashed asset URLs** — images are imported as ES modules, so Webpack emits them
  with content hashes and rewrites the paths at build time.
- **Semantic and accessible** — one `<h1>` per page, `<article>` for project cards,
  `<address>` for contact details, `tel:` and `mailto:` links, `alt` on every image.

---

## Tech stack

| | |
|---|---|
| Bundler | Webpack 5 (`webpack-merge`, split dev/prod configs) |
| Language | Vanilla JavaScript, ES modules |
| Styling | Plain CSS with custom properties |
| Fonts | Playfair Display (headings), system sans-serif (body) |
| Icons | Devicon, Material Symbols |
| Images | `cwebp` for WebP conversion |

No framework, no CSS library.

---

## Getting started

```bash
git clone git@github.com:Aurel-Charles/Project-Homepage-TOP.git
cd Project-Homepage-TOP
npm install
npm run dev
```

The dev server opens on `http://localhost:8080` with hot reload.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production bundle into `/dist` |
| `npm run deploy` | Build and publish `/dist` to the `gh-pages` branch |

> `npm run build` and `npm run dev` both pass an explicit `--config` flag. Running
> bare `npx webpack` loads no config at all — there is no `webpack.config.js` in
> this repo — and fails with "no loaders are configured".

---

## Project structure

```
src/
├── homepage.html    page shell — empty <header>, <main>, <footer>
├── index.js         DOM construction, one populate* function per section
├── data.js          all content: portrait, projects, contact
├── style.css        reset, base styles, three breakpoints
└── img/
    ├── portrait.jpg / .webp
    ├── work.jpg / .webp
    └── project/     one .jpg + .webp pair per project
```

`index.js` builds the DOM through small factories rather than repeating
`createElement` chains:

| Factory | Returns |
|---|---|
| `makePicture(jpeg, webp, alt, className)` | a `<picture>` with WebP source and JPEG fallback |
| `makeSocials(className)` | the GitHub / LinkedIn / X icon row |
| `makeIcon(iconClass, link)` | a single linked icon |
| `makeContactLine(className, icon, text, href)` | an icon + link row for phone and email |

---

## Responsive layouts

| Breakpoint | Photo | Name | Project grid |
|---|---|---|---|
| Mobile (base) | full width, centred | overlaid on the photo | 1 column |
| `≥ 660px` | floated left, text wraps around it | on the banner, top right | 2 columns |
| `≥ 1000px` | absolutely positioned left of the card | back inside the photo | 3 columns |

The stylesheet is mobile-first: the base rules describe the phone layout and each
`min-width` query only adds to it.

### Techniques worth noting

- **Grid stacking** — `grid-template-areas: "stack"` with every child on the same
  area overlays the name on the photo while the container still gets a real height,
  unlike absolute positioning.
- **`clip-path`** — the angled bottom edge of the blue banner. Note that `clip-path`
  creates a stacking context, which is why the photo needs an explicit `z-index`.
- **`right: 100%`** — on desktop this pins the photo's right edge to the card's left
  edge with no hard-coded offsets, so the two stay joined at any width.
- **Shared custom properties** — `--card-width` and `--card-max` are used by both the
  card and the name, keeping them on the same axis as the viewport widens.

---

## Adding a project

1. Drop `name.jpg` into `src/img/project/`.
2. Convert and resize it:

   ```bash
   cwebp -q 80 -resize 600 0 src/img/project/name.jpg -o src/img/project/name.webp
   ```

3. Import both files at the top of `src/data.js` — plain path strings are not
   followed by Webpack, only `import` statements are.
4. Append an object to the `projects` array:

   ```js
   {
     jpeg: nameJPG,
     webp: nameWEBP,
     name: 'Project name',
     description: 'Short description.',
     githubLink: 'https://github.com/…',
     websiteLink: ''            // empty hides the external-link icon
   }
   ```

The grid picks up the new card automatically.

---

