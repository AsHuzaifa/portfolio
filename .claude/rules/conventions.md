# conventions.md — Portfolio Session Log
Last updated: June 28, 2026 (session 5)

Read this before doing anything. It restores full session context.

---

## Build Status

| Section | Status |
|---|---|
| Hero (`#opening`) | Complete — copy approved, committed, live |
| About (`#origin`) | Complete — React islands integrated, copy approved, committed, live |
| Skills (`#signal`) | Complete — 4 groups, confident/learning distinction, scroll-triggered stagger |
| Contact (`#reach`) | Complete — 5 links (GitHub, Email, Instructables, LinkedIn, ORCID), scroll-triggered stagger |
| Marble background | Live — real JPEG at `public/assets/marble-bg.jpg`, cream overlay at 0.82 |
| Sketchbook | **Removed** — component deleted, import/usage stripped, scroll trigger removed |
| Grain overlay | **Removed** — SVG feTurbulence div and all .grain-overlay CSS gone |
| Flower field | **Removed** — SVG and all @keyframes/.sw* CSS gone |
| StaggeredMenu | **Attempted, removed** — integration started, reverted at user request |

---

## Current File Structure

```
d:\portfolio\
├── CLAUDE.md                        ← project-level Claude instructions
├── astro.config.mjs                 ← Tailwind v4 via @tailwindcss/vite + @astrojs/react
├── tsconfig.json                    ← strict: true, jsx: react-jsx
├── package.json
├── public/
│   └── assets/
│       └── marble-bg.jpg            ← marble background JPEG (user-provided)
├── .claude/rules/
│   ├── personal.md                  ← Huzaifa's bio, projects, interests
│   ├── stack.md                     ← tech stack decisions
│   ├── style.md                     ← palette, typography, animation spec
│   ├── tone.md                      ← voice, section naming, what to avoid
│   ├── coding-style.md              ← code conventions, file structure rules
│   └── conventions.md               ← this file
└── src/
    ├── components/
    │   ├── AboutSection.astro       ← Origin section, imports CardSwap + SamsungCard
    │   ├── SkillsSection.astro      ← Signal section, driven by skills export in site.ts
    │   ├── ContactSection.astro     ← Reach section, driven by contact export in site.ts
    │   ├── CardSwap.tsx             ← React island — click-to-swap stacked project cards
    │   └── SamsungCard.tsx          ← React island — credential card with per-course accordion
    ├── data/
    │   └── site.ts                  ← all page content (contact, skills, about, hero exports)
    ├── layouts/
    │   └── Layout.astro             ← base HTML shell, fonts, no bg-bg on body
    ├── pages/
    │   └── index.astro              ← single-page entry; calls animateHero, animateAbout, animateSkills, animateContact, initAccordions
    ├── styles/
    │   └── global.css               ← @theme tokens, base layer, marble background on html
    └── utils/
        └── animations.ts            ← animateHero, animateAbout, animateSkills, animateContact, initAccordions
```

---

## Design Decisions (with reasoning)

### Animation library: GSAP v3
Chosen over Motion One. Hero uses cinematic stagger with `skewY` on the name
arrival. ScrollTrigger registered in `animations.ts` drives all scroll reveals.

Rule: all GSAP logic stays in `src/utils/animations.ts`. Exception: React
components (CardSwap, SamsungCard) manage their own GSAP internally — this is
acceptable because they own their own DOM and lifecycle. Never inline GSAP in
component frontmatter or Astro `<script>` tags.

### React islands via @astrojs/react
Two interactive About components, both React with `client:load`:
- **CardSwap** — GSAP `elastic.out(0.6, 0.9)`, click-only (no auto-cycle),
  cards `335 × 224px`, cursor-proximity sage green glow. Wrapper has
  `padding: 40px; margin: -40px; display: inline-block` (GLOW_PAD pattern) so
  box-shadow glow isn't clipped by parent overflow.
- **SamsungCard** — "Samsung Innovation Campus" header is the visual anchor.
  "27 / 350" at `1.15rem` supports rather than dominates. Per-course accordion
  via React `useState`, CSS `max-height` transition (`0.28s ease`). Desktop:
  `sticky top-8` in the right grid column. Mobile: `variant="inline"` single line.

### Marble background
Real JPEG (`public/assets/marble-bg.jpg`) set on `html` in `global.css` as a
two-layer `background-image`:
```css
html {
  background-image:
    linear-gradient(rgba(245, 240, 232, 0.82), rgba(245, 240, 232, 0.82)),
    url('/assets/marble-bg.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
}
```
The linear-gradient layer acts as a semi-transparent cream overlay — no pseudo-element,
no z-index manipulation. The `body` element has no `background-color` so the marble
on `html` shows through.

**Why no bg-bg on body**: Tailwind's `bg-bg` class sets an opaque `background-color`
on body which covers the html background entirely. Removed from Layout.astro. The cream
base is owned by `html`'s `background-color: var(--color-bg)` in global.css.

**Why background on html, not body**: A fixed `background-attachment` on `body` can
behave inconsistently — the html element is the true scroll root, so the parallax effect
is reliable there.

### Font pairing: Fraunces + DM Sans
- Display/hero: **Fraunces** (variable opsz, weights 300/400/700 + italic 300).
  Loaded via Google Fonts. Tailwind token: `font-display`.
- Body/UI: **DM Sans** (opsz variable, weights 300/400/500). Tailwind token: `font-body`.
- Both loaded in `Layout.astro` via a single Google Fonts `<link>`.

### Color tokens (Tailwind v4 `@theme` in `global.css`)
```
--color-bg:          #F5F0E8   → warm cream base
--color-surface:     #EDE7D9   → Green Bengaluru callout background, CardSwap card fill
--color-text:        #1A1714   → near-black, warm undertone
--color-muted:       #8C7E6E   → secondary text, labels, section markers
--color-accent:      #C94A2A   → terracotta — SamsungCard left border, CardSwap "Field work" label
--color-accent-alt:  #2A4A3E   → deep green — Green Bengaluru quote, cursor-proximity glow color
```

### Section ID naming convention
Generic names (Hero, About, Skills, Contact) are banned per `tone.md`.
- `#opening` — Hero section
- `#origin`  — About section
- `#signal`  — Skills section (IoT/transmission theme)
- `#reach`   — Contact section

Convention: section `id` is thematic, not functional. Visible label in the
section header matches the ID (e.g. id="signal" → label "Signal").

### Layout system
Tailwind's 12-column grid (`grid-cols-12`). About section: left `col-span-7`
(all content), right `col-span-4 col-start-9` (sticky SamsungCard). One-column
structural gutter between them.

### Content architecture
No hardcoded strings in components. All copy lives in `src/data/site.ts`.
Current exports (in file order): `contact`, `skills`, `about`, `hero`.

- `hero` — label, name, bio
- `about` — narrative, education, samsung (context/stat/subtext/courses), human, volunteering, minorProjects
- `skills` — `groups[]`, each with `label`, `number`, `rows[]`. Each row: `category?`, `items: string[]`, `learning?: boolean`, `note?: string`
- `contact` — `links[]`, each with `label`, `handle`, `url`

`about.samsung.courses` is `{ title: string; detail: string }[]` — per-course accordion in SamsungCard.
`about.minorProjects` is `{ name: string; description: string }[]` — consumed by CardSwap.

### Cursor-proximity glow
Pattern used on CardSwap cards and SamsungCard:
`mousemove` computes distance-to-center → scales `box-shadow` spread + opacity.
Color: sage green `rgba(42,74,62,…)`. CSS `transition: box-shadow 0.3s ease` on
the element handles the fade. Rest state: `0 0 0 1px rgba(42,74,62,0.08–0.10)`.

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

### Skills section design
No skill bars or percentage meters — these are arbitrary and banned. Confident vs
learning distinction is communicated by:
- Confident: `text-text` (full opacity)
- Learning: `text-muted/55` (softened) + a small `border border-muted/20` badge
  with text "learning" in `text-[0.5rem] tracking-[0.15em] uppercase`

Group containers: `border border-muted/10` with hover
`shadow-[0_0_28px_rgba(42,74,62,0.09)]` (sage green glow, `transition-shadow duration-500`).

### Contact section design
Five links in a stacked list. Each row: small-caps label left, handle + `↗` right.
On hover: handle and arrow shift to `accent-alt` (#2A4A3E), separator darkens, label
lifts opacity. All via CSS transitions. Email uses `mailto:`, all others open `_blank`.

---

## What Was Removed (and Why)

### Sketchbook component
`src/components/Sketchbook.tsx` deleted. Import and `<Sketchbook client:load />`
wrapper removed from `AboutSection.astro`. `.about-sketchbook` ScrollTrigger block
removed from `animations.ts`. Reason: placeholder images were never filled in;
decision was made to cut the component rather than ship empty slots.

### Grain overlay
SVG `feTurbulence` div removed from `Layout.astro`. `.grain-overlay` block removed
from `global.css`. Tried at `opacity: 0.03–0.06`, bumped to `0.10` — ultimately
removed in favour of the marble JPEG which carries the textural weight instead.

### Flower field
Inline SVG removed from `index.astro`. All `@keyframes swy*` and `.sw*` animation
classes removed from `global.css`. Removed for visual simplification — the marble
background provides the environmental quality that the flower field was trying to add.

### SVG marble watermark (session 2 attempt)
Base64 data URI SVG using `feTurbulence type="turbulence"` — generated as a
programmatic marble pattern. Removed in favour of the real JPEG provided by the
user, which has far more naturalistic depth and tone.

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
Samsung card content, minor project card descriptions) live in `src/data/site.ts`
and are final.

---

## Bugs Hit and Resolved

**CardSwap glow clipping on left side**
Cause: parent `.about-projects` had `overflow-x-auto` which clipped `box-shadow`.
Fix: removed `overflow-x-auto` from the wrapper; added GLOW_PAD=40 wrapper div
with `padding: 40px; margin: -40px` so the glow has room without affecting layout.

**Marble background not visible (session 4)**
Cause: `<body class="bg-bg ...">` in Layout.astro applied an opaque `background-color`
on body, which painted over the `html` element's `background-image` entirely.
Fix: removed `bg-bg` from body. The `html` rule in `global.css` owns the background color.

**SVG marble watermark not visible (session 2)**
Cause: `z-index: -1` on a fixed child paints behind `html`'s background canvas
when `html` has `background-color`. The child is below root background paint,
invisible under the cream fill.
Fix: switched to `background-image` data URI on `html` (then later replaced with JPEG).

**Flower field plays once then disappears (session 2)**
Cause 1: CSS `<style>` inside inline SVG in `.astro` gets processed by Vite —
`@keyframes` names get scoped/renamed, breaking `animation-name` references.
Cause 2: Bare `<use>` elements have inconsistent `transform-box: fill-box` support.
Fix: moved all keyframes + classes to `global.css`; wrapped all `<use>` in `<g>`.
(Component subsequently removed entirely.)

**`git commit` heredoc syntax fails in PowerShell**
Cause: PowerShell 5.1 does not support bash heredocs (`<<'EOF'`).
Fix: use Bash tool for git commits, not PowerShell.

**GitHub remote not connected (session 1)**
Status: resolved. Remote is `https://github.com/AsHuzaifa/portfolio.git`.
Commits push to `main`. Netlify auto-deploys.

---

## What's Next (in order)

1. **Navigation** — No nav yet. StaggeredMenu from React Bits was attempted and
   reverted (session 5) — the component loaded but was not visible on screen; debugging
   not pursued. A navigation solution is still needed. Options open.
2. **Projects section** — NeuroSync and Posture Detection (in progress); smaller
   projects (Smart Attendance, Ocean Sensor, Temp/Humidity) already have copy in `site.ts`.
   Hold until asset placeholders below are resolved.

---

## Open Placeholders

| Item | Status |
|---|---|
| Navigation solution | Needed — StaggeredMenu attempted + reverted; approach TBD |
| NeuroSync: component list, repo link, demo | Missing — add to `personal.md` and `site.ts` when ready |
| Posture Detection: Edge Impulse project link | Missing — add when ready |
| Smart Attendance: stack details, screenshots from teammates | Missing |
| Ocean Pollution Sensor: photos, stack, teammate files | Missing |
| SIC Course 2 syllabus (`Fundamentals of IoT & Embedded Circuit Systems`) | Current detail text is incorrect (copy-paste of course 1 detail) — replace with real syllabus |
| Sketchbook / drawing images | Removed component; if revived, drop JPGs at `/public/assets/sketches/sketch-1.jpg` through `sketch-4.jpg` |
| Custom cursor (yes/no) | Pending — style.md lists it as optional |
| Final font confirmation (Google Fonts vs self-hosted) | Currently Google Fonts; self-hosting deferred |
| ESLint + Prettier config | Not yet set up |

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
