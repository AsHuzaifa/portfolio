# conventions.md — Portfolio Session Log
Last updated: June 29, 2026 (session 9)

Read this before doing anything. It restores full session context.

---

## Build Status

| Section | Status |
|---|---|
| Hero (`#opening`) | Complete — copy approved, committed, live |
| About (`#origin`) | Complete — React islands integrated, copy approved, committed, live |
| Skills (`#skills`) | Complete — 4 groups, confident/learning distinction, scroll-triggered stagger, translucent bg, bolder border |
| Field Work | Complete — CardSwap left, "Attended" seminars list right; flex layout, responsive |
| Contact (`#reach`) | Complete — 5 links (GitHub, Email, Instructables, LinkedIn, ORCID), scroll-triggered stagger |
| Navigation (StaggeredMenu) | Complete — `StaggeredMenu.tsx` mounted in `Layout.astro`; slides in from right, 4 nav items |
| GitHub Pages deployment | Complete — `astro.config.mjs` configured, Actions workflow at `.github/workflows/deploy.yml` |
| Marble background | Live — real JPEG at `public/assets/marble-bg.jpg`, cream overlay at 0.82 |
| Sketchbook | **Removed** — component deleted, import/usage stripped, scroll trigger removed |
| Lanyard / ID Card | Complete — `LanyardCard.tsx` + `Lanyard.tsx` mounted in hero; physics rope hangs from top-right; card face drawn via Canvas 2D API |
| Grain overlay | **Removed** — SVG feTurbulence div and all .grain-overlay CSS gone |
| Flower field | **Removed** — SVG and all @keyframes/.sw* CSS gone |

---

## Current File Structure

```
d:\portfolio\
├── CLAUDE.md                        ← project-level Claude instructions
├── astro.config.mjs                 ← Tailwind v4 via @tailwindcss/vite + @astrojs/react; site + base set for GitHub Pages
├── tsconfig.json                    ← strict: true, jsx: react-jsx
├── package.json
├── public/
│   └── assets/
│       └── marble-bg.jpg            ← marble background JPEG (user-provided)
├── .github/
│   └── workflows/
│       └── deploy.yml               ← builds on push to main, deploys dist/ to gh-pages branch
├── .claude/rules/
│   ├── personal.md                  ← Huzaifa's bio, projects, interests
│   ├── stack.md                     ← tech stack decisions
│   ├── style.md                     ← palette, typography, animation spec
│   ├── tone.md                      ← voice, section naming, what to avoid
│   ├── coding-style.md              ← code conventions, file structure rules
│   └── conventions.md               ← this file
└── src/
    ├── components/
    │   ├── AboutSection.astro       ← Origin section; narrative, education, human, Samsung, volunteering
    │   ├── SkillsSection.astro      ← Skills section (id="skills"), driven by skills export in site.ts
    │   ├── FieldWork.astro          ← Field Work section; wraps CardSwap, driven by about.minorProjects
    │   ├── ContactSection.astro     ← Reach section, driven by contact export in site.ts
    │   ├── StaggeredMenu.tsx        ← React island — slide-in nav, mounted fixed in Layout.astro
    │   ├── CardSwap.tsx             ← React island — click-to-swap stacked project cards
    │   ├── SamsungCard.tsx          ← React island — credential card with per-course accordion
    │   ├── LanyardCard.tsx          ← React island — wrapper; generates Canvas 2D card face, passes to Lanyard
    │   ├── Lanyard.tsx              ← React island — Three.js physics lanyard (R3F + Rapier + meshline)
    │   ├── card.glb                 ← Card 3D model (imported with ?url to bypass Astro image transform)
    │   └── lanyard.png              ← Lanyard texture (imported with ?url)
    ├── data/
    │   └── site.ts                  ← all page content (nav, contact, skills, about, hero exports)
    ├── layouts/
    │   └── Layout.astro             ← base HTML shell, fonts, mounts StaggeredMenu client:load
    ├── pages/
    │   └── index.astro              ← single-page entry; order: Opening → Origin → Skills → Field Work → Reach
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
Generic names (Hero, About, Contact) are banned per `tone.md`. Skills is an
exception — the originally planned `#signal` was renamed to `#skills` at user
request for clarity.
- `#opening` — Hero section
- `#origin`  — About section
- `#skills`  — Skills section (renamed from `#signal` in session 6)
- `#reach`   — Contact section

Field Work has no `id` — it is a visual block, not a nav target.

Convention: section `id` is thematic where possible, functional if clearer.
Visible label in the section header matches the ID.

### Layout system
Tailwind's 12-column grid (`grid-cols-12`). About section: left `col-span-7`
(all content), right `col-span-4 col-start-9` (sticky SamsungCard). One-column
structural gutter between them.

### Content architecture
No hardcoded strings in components. All copy lives in `src/data/site.ts`.
Current exports (in file order): `nav`, `about`, `contact`, `skills`, `hero`.

- `nav` — `items[]`, each with `label`, `link`, `ariaLabel`. Used by StaggeredMenu in Layout.astro.
- `hero` — label, name, bio
- `about` — narrative, education, samsung (context/stat/subtext/courses), human, volunteering, minorProjects, seminars
- `skills` — `groups[]`, each with `label`, `number`, `rows[]`. Each row: `category?`, `items: string[]`, `learning?: boolean`, `note?: string`
- `contact` — `links[]`, each with `label`, `handle`, `url`

`about.samsung.courses` is `{ title: string; detail: string }[]` — per-course accordion in SamsungCard.
`about.minorProjects` is `{ name: string; description: string }[]` — consumed by CardSwap.
`about.seminars` is `{ title: string; source: string; detail: string }[]` — consumed by FieldWork.astro.
Three entries: Principles of Game Design (Macquarie Uni), BOHRAI/NVIDIA inauguration, AI & IoT in Precision Agriculture.

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

Group containers: `bg-surface/30` translucent fill, `border border-muted/25` (session 6:
bumped from `/10` for stronger definition), hover
`shadow-[0_0_28px_rgba(42,74,62,0.09)]` (sage green glow, `transition-shadow duration-500`).

Skill item words are title-cased consistently. Category labels are title-cased too.

### Contact section design
Five links in a stacked list. Each row: small-caps label left, handle + `↗` right.
On hover: handle and arrow shift to `accent-alt` (#2A4A3E), separator darkens, label
lifts opacity. All via CSS transitions. Email uses `mailto:`, all others open `_blank`.

### Navigation — StaggeredMenu
`src/components/StaggeredMenu.tsx` — adapted from React Bits source (session 6).
- Mounted `client:load` in `Layout.astro` before `<slot />`, so it overlays all pages
- `isFixed={true}` — creates its own `fixed top-0 left-0 z-50` stacking context; `pointer-events-none` on wrapper, `pointer-events-auto` on toggle + panel
- Toggle button: top-right, `px-8 md:px-20 lg:px-32 py-8`, colour `#8C7E6E` at rest, shifts to `#EDE7D9` when open (via GSAP tween)
- Pre-layers: two divs sliding in before the panel — colours `#C94A2A` then `#2A4A3E`
- Panel: `#EDE7D9` background, `clamp(280px, 40vw, 460px)` wide; full-width on mobile
- Items: Fraunces font, `text-[3.5rem] md:text-[4.5rem]`, colour `#1A1714`, hover → `#C94A2A`
- Clicking a nav item calls `closeMenu()` then follows the anchor link
- Click-away (outside panel + toggle) also calls `closeMenu()`
- Text toggle "Menu ↔ Close": two static spans always in DOM (`TEXT_ITEMS = ['Menu', 'Close'] as const`);
  `animateText(true)` tweens `yPercent: -50` (shows Close), `animateText(false)` tweens back to 0 (shows Menu).
  No React state updates — avoids DOM/GSAP race condition where `setTextLines()` re-render conflicted with in-flight tweens.
- Items driven by `nav` export in `site.ts`; 4 items: Opening, Origin, Skills, Reach

### Lanyard / ID Card — hero right column
`src/components/LanyardCard.tsx` + `src/components/Lanyard.tsx` — React island pair mounted `client:load` in `index.astro`.

**Architecture:**
- `LanyardCard.tsx` — generates a `512×756` canvas card face (via Canvas 2D API), waits for `document.fonts.ready` so Google Fonts (Fraunces, DM Sans) are loaded before drawing, then passes the data URL as `frontImage` to `Lanyard`.
- `Lanyard.tsx` — full Three.js/R3F scene: physics rope (Rapier `useRopeJoint`/`useSphericalJoint`), card GLB model, draggable interaction, `meshline` rope rendering.

**Card face content (current, committed):**
- Top strip: `#C94A2A` (accent), 84px tall, strip label "IOT  ENGINEERING   ·   PORTFOLIO"
- Monogram circle: `#2A4A3E` (green), 42px radius, "H" in Fraunces 300 38px
- Name: "Mohammed Huzaifa" — Fraunces 300 44px
- Title: "IoT Engineering Student" — DM Sans 400 17px
- Skills row (single line): `['ESP32', 'TinyML', 'Arduino', 'Edge ML']` — DM Sans 400 14px, 30px tall pills, 16px h-padding, 8px gap, centered
- University footer: "Presidency University, Bangalore" — DM Sans 400 12px

**Props used from `LanyardCard`:**
```tsx
<Lanyard
  frontImage={frontImage}
  height="100%"
  transparent={true}
  gravity={[0, -40, 0]}
  fov={20}
  lanyardWidth={0.9}
/>
```

**Rope anchor at top of canvas:** `<group position={[0, 5.5, 0]}>` — with fov=20, camera z=30, top visible edge ≈ `tan(10°)×30 ≈ 5.29` world units; y=5.5 places the anchor just above the visible frame so the rope appears to emerge from the top edge.

**Asset imports use `?url` suffix:**
```ts
import cardGLB from './card.glb?url';
import lanyardPNG from './lanyard.png?url';
```
Without `?url`, Astro's image metadata transform returns `{ src, width, height, format }` instead of a URL string — Three.js's `useTexture` would then try to fetch `width`, `height`, and `format` as URLs (404s).

**Hero layout for lanyard:** Text column gets `lg:pr-[420px] xl:pr-[480px]` right padding. Lanyard sits in `absolute right-0 top-0 bottom-0 w-[420px] xl:w-[480px]` (full section height, hidden on mobile/tablet). Hero name reduced from `clamp(4.5rem, 13vw, 11rem)` to `clamp(4.5rem, 10vw, 9rem)` for the two-column layout.

**Known issue — rope/card clips at canvas right edge:** Three.js always clips rendering at the canvas element boundaries. The 420px column doesn't give the rope room to swing fully right without clipping. This is a fundamental limitation; accepted for now.

**`astro.config.mjs` addition:** `assetsInclude: ['**/*.glb']` so Vite treats GLB imports as URL assets rather than processing them as modules.

**TypeScript module augmentation** in `Lanyard.tsx` for custom R3F elements `meshLineGeometry` and `meshLineMaterial`.

### Field Work section
`src/components/FieldWork.astro` — extracted from `AboutSection.astro` in session 6.
Two-column flex layout: CardSwap on the left (`shrink-0`), "Attended" seminars list on the right (`flex-1`).
Responsive: `flex-col` on mobile, `flex-row md:gap-20 lg:gap-28` on desktop.

Left column keeps `about-projects` class so `animateAbout()` ScrollTrigger works unchanged.
Right column: `<ul>` of seminar items, each with title (`text-text/75 text-[0.72rem]`), source
(`text-muted/60 text-[0.62rem]`), and detail (`text-muted/45 text-[0.62rem]`). Rows separated
by `border-t border-muted/10`, first row has no top border.

Section label convention: "Field work" left, "Attended" right — both `text-muted text-xs tracking-[0.2em] uppercase`.
Padding matches other sections (`px-8 md:px-20 lg:px-32`). Page order: Opening → Origin → Skills → Field Work → Reach.

### Deployment — GitHub Pages
Migrated from Netlify in session 6. `astro.config.mjs` sets:
- `site: 'https://ashuzaifa.github.io'`
- `base: '/portfolio'`

No Astro adapter needed — static output is the default.
Workflow at `.github/workflows/deploy.yml` triggers on push to `main`:
installs deps → `npm run build` → deploys `dist/` to `gh-pages` branch via
`peaceiris/actions-gh-pages@v4`. GitHub Pages source must be set to the
`gh-pages` branch in repo Settings → Pages.

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

**StaggeredMenu "Menu" not transitioning to "Close" (session 7)**
Cause: original `animateText` called `setTextLines(seq)` (React state update, async re-render) then
immediately ran `gsap.set` + `gsap.to` on the same element's children. React reconciliation rebuilt
the span list mid-animation, so GSAP ran against stale DOM and the visible text never moved.
Fix: removed state entirely. `TEXT_ITEMS = ['Menu', 'Close'] as const` is always rendered static.
`animateText(true)` → `gsap.to(inner, { yPercent: -50 })` (shows Close); `animateText(false)` → `yPercent: 0` (shows Menu).

**Astro image metadata transform causes 404s in Three.js (session 8)**
Cause: PNG/image imports from `src/` are processed by Astro's image pipeline and return `{ src, width, height, format }` objects. Three.js's `useTexture` received the object and tried to load `width` (e.g. 1025), `height` (250), and `"png"` as URL strings — all 404.
Fix: append `?url` to all asset imports consumed by Three.js (`import cardGLB from './card.glb?url'`, `import lanyardPNG from './lanyard.png?url'`). The `?url` suffix bypasses Astro's transform and returns a plain URL string.

**GLB import not treated as URL asset (session 8)**
Cause: Vite didn't know how to handle `.glb` binary imports by default.
Fix: `assetsInclude: ['**/*.glb']` in `astro.config.mjs` `vite` block.

**Rope anchor appears mid-screen (session 8)**
Cause: original group position `[0, 4, 0]` was below the top of the visible canvas with fov=20, camera z=30 (top edge ≈ 5.29 world units).
Fix: moved to `[0, 5.5, 0]` and set lanyard column to `absolute right-0 top-0 bottom-0` (full section height).

**Lanyard card breaks on any scale or back face change (session 9)**
Cause: unknown — both `scale` increase (2.25→2.85, collider untouched) and back face
canvas injection each independently caused card misposition/misshaping on the deployed site.
Local dev was not tested before pushing; root cause not yet diagnosed.
Status: all session 9 changes fully reverted. Card is back to its session 8 committed state
(`scale=2.25`, no `backImage`). Investigate before attempting again:
- Check whether `useMemo` on `cardMap` re-runs correctly when `backImage` changes
- Check whether any scale value other than the original causes physics joint misalignment
- Consider testing on local dev server before committing

**`git commit` heredoc syntax fails in PowerShell**
Cause: PowerShell 5.1 does not support bash heredocs (`<<'EOF'`).
Fix: use Bash tool for git commits, not PowerShell.

**GitHub remote not connected (session 1)**
Status: resolved. Remote is `https://github.com/AsHuzaifa/portfolio.git`.
Commits push to `main`. Netlify auto-deploys.

---

## What's Next (in order)

1. **Card face editing** — front face content is final; size increase and back face styling both attempted and reverted in session 9 (broke card). Investigate root cause before retrying. Test on local dev first.
2. **Projects section** — NeuroSync and Posture Detection (in progress); smaller
   projects (Smart Attendance, Ocean Sensor, Temp/Humidity) already have copy in `site.ts`.
   Hold until asset placeholders below are resolved.

---

## Open Placeholders

| Item | Status |
|---|---|
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
astro:               ^7.0.3
@astrojs/react:      ^6.0.0
react:               ^19.2.7
tailwindcss:         ^4.3.1   (via @tailwindcss/vite, NOT the Astro integration)
gsap:                ^3.15.0
three:               ^0.185.0
@react-three/fiber:  ^9.6.1
@react-three/drei:   ^10.7.7
@react-three/rapier: ^2.2.0
meshline:            ^3.3.1
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
