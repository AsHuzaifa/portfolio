# conventions.md — Portfolio Session Log
Last updated: June 27, 2026

Read this before doing anything. It restores full session context.

---

## Build Status

| Section | Status |
|---|---|
| Hero (`#opening`) | Approved, committed, live on Netlify |
| About (`#origin`) | Complete — React islands integrated, copy approved, committed, live |

---

## Current File Structure

```
d:\portfolio\
├── CLAUDE.md                        ← project-level Claude instructions
├── astro.config.mjs                 ← Tailwind v4 via @tailwindcss/vite + @astrojs/react
├── tsconfig.json                    ← strict: true, jsx: react-jsx
├── package.json
├── .claude/rules/
│   ├── personal.md                  ← Huzaifa's bio, projects, interests
│   ├── stack.md                     ← tech stack decisions
│   ├── style.md                     ← palette, typography, animation spec
│   ├── tone.md                      ← voice, section naming, what to avoid
│   ├── coding-style.md              ← code conventions, file structure rules
│   └── conventions.md               ← this file
└── src/
    ├── components/
    │   ├── AboutSection.astro       ← Origin section, imports all three React islands
    │   ├── CardSwap.tsx             ← React island — click-to-swap stacked project cards
    │   ├── Sketchbook.tsx           ← React island — GSAP page-turn book, 4 image slots
    │   └── SamsungCard.tsx          ← React island — credential card with per-course accordion
    ├── data/
    │   └── site.ts                  ← all page content (hero, about exports)
    ├── layouts/
    │   └── Layout.astro             ← base HTML shell, fonts, grain overlay div
    ├── pages/
    │   └── index.astro              ← single-page entry; calls animateHero, animateAbout, initAccordions
    ├── styles/
    │   └── global.css               ← @theme tokens, base layer, .grain-overlay styles
    └── utils/
        └── animations.ts            ← animateHero, animateAbout, initAccordions (no initCarousel)
```

---

## Design Decisions (with reasoning)

### Animation library: GSAP v3
Chosen over Motion One. Hero uses cinematic stagger with `skewY` on the name
arrival. ScrollTrigger registered in `animations.ts` drives all scroll reveals.

Rule: all GSAP logic stays in `src/utils/animations.ts`. Exception: React
components (CardSwap, Sketchbook) manage their own GSAP internally — this is
acceptable because they own their own DOM and lifecycle. Never inline GSAP in
component frontmatter or Astro `<script>` tags.

### React islands via @astrojs/react
All three interactive About components are React with `client:load`:
- **CardSwap** — GSAP `elastic.out(0.6, 0.9)`, click-only (no auto-cycle),
  cards `335 × 224px`, cursor-proximity sage green glow. Wrapper has
  `padding/margin: ±40px` so box-shadow glow isn't clipped by parent overflow.
- **Sketchbook** — GSAP `rotateY` two-phase page turn (`power2.in` fold,
  `power2.out` unfold). 4 image slots at `/assets/sketches/sketch-N.jpg`
  (placeholders — images not yet added). `BOOK_W=300, BOOK_H=380, SPINE_W=20`.
- **SamsungCard** — "Samsung Innovation Campus" header is the visual anchor.
  "27 / 350" at `1.15rem` supports rather than dominates. Per-course accordion
  via React `useState`, CSS `max-height` transition (`0.28s ease`). Desktop:
  `sticky top-8` in the right grid column. Mobile: `variant="inline"` single line.

### Font pairing: Fraunces + DM Sans
- Display/hero: **Fraunces** (variable opsz, weights 300/400/700 + italic 300).
  Loaded via Google Fonts. Tailwind token: `font-display`.
- Body/UI: **DM Sans** (opsz variable, weights 300/400/500). Tailwind token: `font-body`.
- Both loaded in `Layout.astro` via a single Google Fonts `<link>`.

### Color tokens (Tailwind v4 `@theme` in `global.css`)
```
--color-bg:          #F5F0E8   → warm cream base
--color-surface:     #EDE7D9   → Green Bengaluru callout background
--color-text:        #1A1714   → near-black, warm undertone
--color-muted:       #8C7E6E   → secondary text, labels, section markers
--color-accent:      #C94A2A   → terracotta — used on SamsungCard left border + CardSwap label
--color-accent-alt:  #2A4A3E   → deep green — Sketchbook spine, Green Bengaluru quote, glow color
```

### Grain texture overlay
SVG `feTurbulence` inline in `Layout.astro`, styled in `global.css`:
```css
.grain-overlay { position: fixed; inset: 0; pointer-events: none; z-index: 50; opacity: 0.10; }
```
Filter: `type="fractalNoise" baseFrequency="0.70" numOctaves="3" stitchTiles="stitch"`.
Static — no animation. Desaturated via `feColorMatrix saturate=0`.
SVG re-renders at each zoom level so grain stays fine-grained, not blocky.

### Section ID naming convention
Generic names (Hero, About, Skills, Contact) are banned per `tone.md`.
- `#opening` — Hero section
- `#origin`  — About section
- Remaining sections to be named at build time (see Open Decisions below)

Convention: section `id` is thematic, not functional.

### Layout system
Tailwind's 12-column grid (`grid-cols-12`). About section: left `col-span-7`
(all content), right `col-span-4 col-start-9` (sticky SamsungCard). One-column
structural gutter between them.

### Content architecture
No hardcoded strings in components. All copy lives in `src/data/site.ts`.
Current exports: `hero`, `about`. `about.samsung.courses` is now an array of
`{ title: string; detail: string }` objects (not plain strings) to support the
per-course accordion in SamsungCard.

### Cursor-proximity glow
Pattern used on CardSwap cards, Sketchbook book border, and SamsungCard:
`mousemove` computes distance-to-center → scales `box-shadow` spread + opacity.
Sage green: `rgba(42,74,62,…)`. CSS `transition: box-shadow 0.3s ease` on the
element handles the fade. Rest state: `0 0 0 1px rgba(42,74,62,0.08–0.10)`.

### Full-bleed elements
Pattern for breaking out of section padding (Green Bengaluru callout):
```
-mx-8 md:-mx-20 lg:-mx-32 px-8 md:px-20 lg:px-32
```

### Accordions
Two separate accordion systems:
1. **Volunteering** (`initAccordions` in `animations.ts`) — GSAP `height:'auto'`
   expand/collapse, chevron `rotation: 180`. Triggered by `[data-accordion-trigger]`.
2. **SamsungCard courses** — React `useState`, CSS `max-height` transition. Fully
   self-contained inside the React component.

---

## Copy State

### Hero bio (final, approved)
> "IoT sits at a rare intersection — not purely hardware, not purely software.
> It's the domain where a single person can take an idea from concept to working
> device. That's what drew me in."

### About opening (final, approved)
> "My entry into IoT wasn't self-initiated — the field earned its hold. Third
> year at Presidency now, and the problems have gotten harder: the interesting
> kind, where the question takes longer to name than to solve. I'm in the middle
> of a few of them."

All other About copy (education line, human note, Green Bengaluru statement,
Samsung card content, project card descriptions) unchanged from last session.

---

## Bugs Hit and Resolved

**CardSwap glow clipping on left side**
Cause: parent `.about-projects` had `overflow-x-auto` which clipped `box-shadow`.
Fix: removed `overflow-x-auto` from the wrapper; added `padding: 40px; margin: -40px`
to CardSwap's outer div so the glow has room without affecting layout.

**GitHub remote not connected (prior session)**
Status: resolved. Remote is `https://github.com/AsHuzaifa/portfolio.git`.
Commits are pushing to `main` via `git push origin main`. Netlify auto-deploys.

**Netlify showing default Astro placeholder after first deploy**
Cause: initial commit had no real page content.
Fix: resolved in a prior session — live content has been deployed since.

**`git commit` heredoc syntax fails in PowerShell**
Cause: PowerShell 5.1 does not support bash heredocs (`<<'EOF'`).
Fix: use Bash tool for git commits, not PowerShell.

---

## What's Next (in order)

1. **Projects section** (`#fieldwork` or similar) — 5 projects from `personal.md`,
   project cards with scroll reveal. NeuroSync and Posture Detection are in progress;
   repo links/photos still pending for most.
2. **Skills section** — Edge computing, TinyML, Digital Twins, IoT security.
   Avoid skills-bar clichés. Format TBD.
3. **Contact section** — tone.md suggests `Signal` as a possible name; keep short.

---

## Open Decisions / Pending Placeholders

| Item | Status |
|---|---|
| Section names for Projects, Skills, Contact | Not decided |
| Custom cursor (yes/no) | Pending — style.md lists it as optional |
| Final font confirmation (Google Fonts vs self-hosted) | Currently Google Fonts; self-hosting deferred |
| Sketchbook images | Placeholders — drop JPGs at `/public/assets/sketches/sketch-1.jpg` through `sketch-4.jpg` |
| NeuroSync: component list, repo link | Placeholder in personal.md |
| Posture Detection: Edge Impulse project link | Placeholder in personal.md |
| Smart Attendance: stack details, teammate files | Placeholder in personal.md |
| Ocean Pollution Sensor: photos, stack | Placeholder in personal.md |
| ESLint + Prettier config | Not yet set up |
| Three.js packages (`@react-three/fiber` etc.) | Not installed — no Lanyard component in current spec; confirm before adding |

---

## Package Versions

```
astro:          ^7.0.3
@astrojs/react: installed (exact version in package.json)
react:          19 (peer dep via @astrojs/react)
tailwindcss:    ^4.3.1   (via @tailwindcss/vite, NOT the Astro integration)
gsap:           ^3.15.0
```

---

## Node / Environment

- Node: v24.17.0 at `D:\Node.js`
- npm: 11.13.0
- OS: Windows 11
- Shell: PowerShell (primary) — prefix any `npx`/`npm` commands with
  `$env:PATH = "D:\Node.js;$env:PATH"` if Node is not on PATH in that session
- Git identity: `ashuzaifa` / `mutahar.mo@northeastern.edu` (repo-scoped)
- GitHub remote: `https://github.com/AsHuzaifa/portfolio.git` — push to `main`
- Netlify: https://ashuzaifa.netlify.app — auto-deploys on push to `main`
