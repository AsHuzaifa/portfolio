w# conventions.md — Portfolio Session Log
Last updated: September 15, 2026 (session 16)

Read this before doing anything. It restores full session context.

---

## Build Status

| Section | Status |
|---|---|
| Hero (`#opening`) | Complete — copy approved, committed, live. Resume envelope (`ResumeEnvelope.astro`, wrapped in `LiquidMetalFrame.tsx` for an animated chrome border) sits in-flow under the bio paragraph (session 16) |
| About (`#origin`) | Complete — React islands integrated, copy approved, committed, live |
| Skills (`#skills`) | Complete — 4 groups, confident/learning distinction, scroll-triggered stagger, translucent bg, bolder border |
| Field Work | Complete — CardSwap left, "Attended" seminars list right; flex layout, responsive. Green Bengaluru volunteering block now closes this section (moved from Origin, session 11) |
| Builds (`#builds`) | Complete for now (session 16) — new major-projects section, inserted between Origin and Skills. Tile grid (fluid-art backgrounds + glass panel, `aspect-[8/5]`, `lg:grid-cols-3`) links to standalone `/projects/[slug]/` detail pages. Four entries: Smart Home Hub, NetSim, PULSE, and Minor Works. PULSE's detail page also carries a fixed edge "pocket" linking to its research paper PDF (session 16). NeuroSync and Posture Detection still to come |
| Contact (`#reach`) | Complete — 4 links (GitHub, Email, Instructables, ORCID — LinkedIn removed session 11), scroll-triggered stagger |
| Navigation (StaggeredMenu) | Complete — `StaggeredMenu.tsx` mounted in `Layout.astro`; slides in from right, 4 nav items |
| GitHub Pages deployment | Complete — `astro.config.mjs` configured, Actions workflow at `.github/workflows/deploy.yml` |
| Marble background | Live — real JPEG at `public/assets/marble-bg.jpg`, cream overlay at 0.82 |
| Sketchbook | **Removed** — component deleted, import/usage stripped, scroll trigger removed |
| Lanyard / ID Card | Complete — `LanyardCard.tsx` + `Lanyard.tsx` mounted in hero; physics rope hangs from top-right; card face drawn via Canvas 2D API; blank cream back face added session 10 |
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
│       ├── marble-bg.jpg            ← marble background JPEG (user-provided)
│       ├── Mohammed_Huzaifa_Resume.pdf ← resume, copied from D:\resume\ (session 16), linked from ResumeEnvelope
│       └── projects/
│           ├── smart-home-hub.png   ← screenshot of its live Vercel deployment (session 14)
│           ├── netsim.png           ← its own public/og-image.png, copied over (session 14)
│           ├── pulse.png            ← screenshot of its live Vercel deployment (session 15)
│           └── pulse-paper.pdf      ← PULSE research paper, copied from D:\pulse\paper\pulse_paper_final.pdf (session 16)
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
    │   ├── ProjectsSection.astro    ← Builds section (id="builds"), tile grid driven by projects export, links to /projects/[slug]/
    │   ├── ResearchPaperPocket.astro ← fixed edge tab (session 16), used on PULSE's detail page only, links to its paper PDF
    │   ├── ResumeEnvelope.astro     ← deep green SVG envelope (session 16), in-flow in the hero under the bio, links to resume PDF
    │   ├── LiquidMetalFrame.tsx     ← React island (session 16) — animated chrome border via @paper-design/shaders, wraps ResumeEnvelope
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
    │   ├── index.astro              ← single-page entry; order: Opening → Origin → Builds → Skills → Field Work → Reach
    │   └── projects/
    │       └── [slug].astro         ← dynamic route, getStaticPaths over projects export; one static page per project
    ├── styles/
    │   └── global.css               ← @theme tokens, base layer, marble background on html
    └── utils/
        ├── animations.ts            ← animateHero, animateAbout, animateProjects, animateSkills, animateContact, initAccordions, initResearchPaperPocket
        ├── fluidArt.ts              ← buildFluidBackground(colors, seed), used by ProjectsSection.astro tiles
        └── basePath.ts              ← getBaseUrl(), normalizes import.meta.env.BASE_URL; used anywhere an absolute path needs the GitHub Pages base prefix
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
  via React `useState`, CSS `max-height` transition (`0.28s ease`). Component
  itself unchanged since session 10 — only its placement moved (see session 11
  note below).

### Samsung card relocation (session 11, revised session 12)
Session 11 pulled `SamsungCard` out of Origin's 12-col grid into a standalone
`max-w-xl` block below the narrative — this left a large dead-space gap to the
right of both the narrative (capped `max-w-3xl`) and the card (capped `max-w-xl`)
on wide viewports. Session 12 restored a 12-col grid (`gap-x-10 lg:gap-x-16
items-start`): narrative `col-span-12 lg:col-span-7` left, `SamsungCard` in
`.about-samsung col-span-12 lg:col-span-5` right (`lg:sticky lg:top-24`), so both
columns fill the section's full width with no leftover gap. Stacks full-width on
mobile/tablet (`lg:` breakpoint, not `md:`, so it doesn't stack too early).

### Samsung course selector redesign (session 12)
The per-course accordion (chevron + `max-height` expand under each title) left a
lot of empty space beside the collapsed rows once the card widened. Replaced with
an indexed pill selector: `courses.map` renders rounded-full buttons (`0{i+1}` +
title) in a `flex flex-wrap` row; the active pill gets `bg-accent-alt/8
border-accent-alt/35`, inactive pills are muted with a hover border. A single
detail panel below cross-fades (`opacity` transition, stacked via `absolute
inset-0` on inactive panels) to show the selected course's text — no dropdown,
no per-item height animation. State is a single `activeIndex` (default `0`)
instead of the old `openIndex | null`.

### Marble background
Real JPEG (`public/assets/marble-bg.jpg`) set on `html` in `global.css` as a
two-layer `background-image`:
```css
html {
  background-image:
    linear-gradient(rgba(245, 240, 232, 0.82), rgba(245, 240, 232, 0.82)),
    var(--marble-bg-url);
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
}
```
The linear-gradient layer acts as a semi-transparent cream overlay — no pseudo-element,
no z-index manipulation. The `body` element has no `background-color` so the marble
on `html` shows through.

**Why `var(--marble-bg-url)` instead of a literal `url('/assets/marble-bg.jpg')`
(fixed session 14):** a plain CSS file has no way to know the site's `base`
(`/portfolio` on GitHub Pages) — a literal absolute path always resolves from
the domain root, 404ing on every page once `base` is non-empty (this had been
broken site-wide, not just on the new project pages, since the marble background
was introduced). Fixed by setting the custom property inline on `<html>` in
`Layout.astro`: `style={{ '--marble-bg-url': \`url(${base}assets/marble-bg.jpg)\` }}`,
using the same `getBaseUrl()` helper (`src/utils/basePath.ts`) as the nav links
and project pages. The favicon `<link>` in `Layout.astro` had the identical bug
(`href="/favicon.svg"`) and got the same fix (`href={\`${base}favicon.svg\`}`).

`getBaseUrl()` replaces what had been the same base-normalizing ternary
duplicated in `site.ts`, `ProjectsSection.astro`, and `[slug].astro` — all three
were refactored to import it instead once a fourth call site (`Layout.astro`)
made the duplication worth collapsing.

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
- `#builds`  — Projects section (added session 14)
- `#skills`  — Skills section (renamed from `#signal` in session 6)
- `#reach`   — Contact section

Field Work has no `id` — it is a visual block, not a nav target. Builds does have
an `id` and a nav entry — unlike Field Work's minor/attended items, it's a primary
content section with its own dedicated sub-pages.

Section number badges (top-right of each section header) reflect page order and
were bumped when Builds was inserted: Origin `01`, Builds `02`, Skills `03`,
Reach `04`.

Convention: section `id` is thematic where possible, functional if clearer.
Visible label in the section header matches the ID.

### Layout system
Tailwind's 12-column grid (`grid-cols-12`). About section: left `col-span-7`
(all content), right `col-span-4 col-start-9` (sticky SamsungCard). One-column
structural gutter between them.

### Content architecture
No hardcoded strings in components. All copy lives in `src/data/site.ts`.
Current exports (in file order): `nav`, `about`, `projects`, `contact`, `skills`, `hero`.

- `nav` — `items[]`, each with `label`, `link`, `ariaLabel`. Used by StaggeredMenu in Layout.astro.
  `link` values are `${base}#id` (BASE_URL-prefixed, trailing slash normalized) rather than
  bare `#id` — see "Nav links from sub-pages" below.
- `hero` — label, name, bio
- `about` — narrative, education, samsung (context/stat/subtext/courses), human, volunteering, minorProjects, seminars
- `projects: Project[]` — array of major-project entries (added session 14). `Project` is now an
  explicit interface (added session 15, in `site.ts` above the array): `slug`, `name`, `tagline`,
  `stack: string[]`, `repo`, `demo: string | null`, `image: string | null` (path under `public/`
  starting with `/`), `fluid: string[]` (2–4 hex colors driving the tile's fluid-art background,
  see "Builds tile design" below), `overview`, `features: { title, detail }[]`, `scope`,
  `gallery: { src: string; caption?: string }[] | null` (added session 15, see "PULSE project"
  below), `paper: { src: string; label: string } | null` (added session 16, see "Research paper
  pocket" below). Consumed by `ProjectsSection.astro` (tile grid, fluid art + glass panel, ignores
  `image`/`stack`/`gallery`/`paper`) and `pages/projects/[slug].astro` (detail page, one per array
  entry via `getStaticPaths`; renders `image` full-width above the overview, `gallery` as a photo
  grid between features and scope, and `paper` as a fixed `ResearchPaperPocket`, all only when present).

  **Why the explicit `Project` interface (session 15):** with every entry's `gallery` set to
  `null` (none had real gallery data yet), TypeScript inferred the array's `gallery` type as
  always-`null`, so `project.gallery && project.gallery.map(...)` in `[slug].astro` narrowed to
  `never` and failed to typecheck. An explicit interface with `gallery: {...}[] | null` fixes the
  inferred type regardless of what any single entry currently holds.

  Entries so far: Smart Home Hub (`image` from a Playwright screenshot of its live Vercel
  deployment), NetSim (`image` copied from the source repo's own `og-image.png`), PULSE
  (`image` from a Playwright screenshot of its live Vercel deployment; `gallery` still `null`
  pending hardware photos). `demo`/`image`/`gallery` use `null` rather than being omitted so
  every entry stays structurally identical.
- `skills` — `groups[]`, each with `label`, `number`, `rows[]`. Each row: `category?`, `items: string[]`, `learning?: boolean`, `note?: string`
- `contact` — `links[]`, each with `label`, `handle`, `url`

### Builds tile design — fluid art + glass panel (session 14)
User-directed departure from the site's normal flat/bordered tile treatment
(reference: phone mockups with abstract marbled-swirl backgrounds and a frosted
glass panel holding text). Confirmed with the user before building: (1) colors
intentionally break from the site's cream/terracotta/deep-green palette —
vivid, saturated per-project hues, matching the reference rather than staying
in-brand; (2) each project gets its own distinct color combo rather than one
shared treatment.

Each `projects` entry has a `fluid: string[]` field (2–3 hex colors). Both
projects' palettes are pulled from their own live deployment rather than
invented: NetSim reuses the pink/purple/blue of its own in-app Windows-98
desktop wallpaper (visible in its screenshot). Smart Home Hub's first pass
was an invented gold/orange/rust guess — corrected once the live Vercel
deployment (`https://smarthome-delta-ten.vercel.app`, found via `gh repo view
--json homepageUrl`) was actually screenshotted: the real UI is a dark
navy/charcoal 3D scene with warm amber interior-lighting glow, not a flat warm
palette. Colors were extracted with a small Playwright script that draws the
screenshot to a canvas and histograms quantized pixel colors (`dominant-colors.mjs`
in the session's scratchpad, not committed) — picking a representative dark
navy (`#233642`), warm amber (`#D98A3F`), and ember (`#8A3A12`) from the top
results rather than eyeballing them, since the raw histogram is dominated by
near-black background and the useful accent colors are a small percentage of
total pixels.

Implementation is pure CSS, no generated images: `src/utils/fluidArt.ts`
exports `buildFluidBackground(colors, seed)`, which lays out two elliptical
`radial-gradient` blobs per color at varied positions/sizes (`BLOBS` array) with
a `transparent 62%` falloff — tight enough to keep visible color variation, wide
enough that blobs overlap and cover most of the tile rather than leaving flat
base-color gaps. `ProjectsSection.astro` renders this on an absolutely
positioned `-inset-[6%] blur-2xl` layer (slight oversize + blur to soften the
gradient edges into something that reads as marbled rather than circular), with
an alternating `rotate-3` / `-rotate-2` per tile index so the swirl isn't
axis-aligned. A `bg-white/12 backdrop-blur-lg border border-white/25` glass
panel sits at the bottom holding the project name and tagline in white text —
white text is safe here regardless of a project's fluid colors, since the panel
carries its own frosted-white tint.

Tuning history: first pass used one blob per color with heavy `blur-3xl` and
`-inset-[15%]` oversize, which smoothed everything into a flat 2-tone diagonal
gradient — no visible swirl. Fixed by halving the blur, tightening the oversize,
and doubling blob count with a smaller per-blob falloff (48% initially, then
widened to 62% once two blobs per color still left visible flat corners).
Verified visually via Playwright screenshots against the running dev server
(desktop, mobile, hover state) — see "Local screenshot verification" below.

Tile grid was `sm:grid-cols-2` while there were only two projects (a 3-column
grid would've left a large empty gap); bumped to `lg:grid-cols-3` session 15
once PULSE became the third entry. Tile aspect started at
`aspect-[4/5]` (portrait, matching the reference's phone-like proportions) but
that read as too tall in practice; cut to `aspect-[8/5]` (exactly half the
height-to-width ratio) at user request. Still visually distinct from the rest
of the site's tiles, just landscape instead of portrait now.

### PULSE project (session 15)
Third Builds entry. Sourced from `D:\pulse`'s `README.md` and `CONVENTIONS.md`
(a team project under Samsung Innovation Campus at Presidency University; per
`CONVENTIONS.md` §1, "the dashboard work in this repo is being driven by
Mohammed Huzaifa"). `demo` (`https://pulse-jet-two.vercel.app`) and `repo`
found the same way as NetSim and Smart Home Hub, via `gh repo view --json`.

**Copy honesty on team credit:** PULSE was built by a 4-person team (Kevin
Immanuel, Mohammed Huzaifa, Harshit W., Sinan Ali), unlike Smart Home Hub and
NetSim which are solo. The `scope` field names the other three teammates and
states plainly that the dashboard and classification pipeline are the parts
that are Huzaifa's, rather than letting the first-person portfolio voice
imply solo authorship of the whole project.

**Colors sourced from documented design tokens, not sampled pixels.** Unlike
Smart Home Hub's fluid palette (extracted by histogramming a screenshot,
session 14), PULSE's `CONVENTIONS.md` §11 ("Colour architecture") documents
exact hex values for a "mood glow" token set: `--glow-calm: #4fd1c5`,
`--glow-focused: #e8b04b`, `--glow-energized: #b48ce0`, confirmed present in
`dashboard/src/styles/tokens.css`. These are described in the source project's
own docs as "v1's luminous originals," kept vivid on purpose after the
in-app accent colors were desaturated slightly for accessibility contrast
(WCAG-driven, documented in the same section). Used the glow tokens, not the
accent tokens, since they're the more saturated/vivid set and this site's
Builds tiles are meant to be vivid. Added the app's dark surface color
(`#0e1119`) as a fourth fluid color so the tile's gaps read as the same
near-black void the real dashboard uses behind its glowing mood orb, rather
than blending into a flat 3-color gradient. `buildFluidBackground` in
`fluidArt.ts` already generalized to N colors, so a 4-color entry needed no
code changes.

**Hardware gallery.** Three photos of the physical glove (wiring close-up,
battery-pack annotation, sensor-labeled overview) went into the detail page.
They were first pasted directly into chat, which didn't work: the harness has
no accessible filesystem path for a pasted image in this environment (checked
`%TEMP%` — the only matching files were small recompressed thumbnails, not
source quality). Asked the user to save them to disk instead; they landed at
`D:\pulse\hardware\` (one `.jpg.jpeg` camera photo, two PenUp-annotated
`.png`s). Resized and re-encoded with `ffmpeg` before copying into
`public/assets/projects/` (`pulse-hardware-{1,2,3}.jpg`, `scale=1600:-1`/
`1200:-1` + `-q:v 4`): the source camera photo was 4.8 MB, more than either
existing project screenshot, not worth serving at full size for a detail-page
photo. `PULSE.gallery` in `site.ts` is `{ src, caption }[]`; `[slug].astro`
renders it as a `sm:grid-cols-2` photo grid with an `<figcaption>` per image,
between Features and Scope.

### Research paper pocket (session 16)
PULSE has an accompanying research paper (`D:\pulse\paper\pulse_paper_final.pdf`,
9 pages), copied into `public/assets/projects/pulse-paper.pdf`. Rather than a plain
link in the body copy, it's surfaced as a fixed tab on the right edge of the
viewport, `ResearchPaperPocket.astro`, mounted only on `[slug].astro` when
`project.paper` is set (only PULSE has one; every other entry's `paper` is `null`).

First pass used a native `<details>`/`<summary>` disclosure with the tab mostly
translated off-screen at rest. User feedback after seeing it: too tiny/barely
visible, the tab looked disconnected ("hanging in the air") from the panel once
opened, the reveal was too abrupt, and it needed a more visible glow. Root
cause of the disconnect: `<details>`'s children default to block layout, and
the auto-sized fixed-position container shrinks-to-fit its *widest* child (the
panel), leaving the narrower `<summary>` tab left-aligned inside that wider
box instead of pinned to the shared right edge — so the tab floated away from
where the panel actually sat.

Second pass fixed the disconnect by stacking tab-above-panel in one
`flex flex-col items-end` container (GSAP `height: 'auto'`, matching
`initAccordions`) and sized the tab up. That resolved the floating-tab bug,
but the user's next note reframed the whole interaction: it should look like
*pulling a paper streamer out of a party popper*, not a dropdown unfurling
downward — the tab stays clipped to the edge, and the paper itself elongates
out sideways from behind it.

Final layout: tab and panel are side by side (`flex flex-row-reverse` on the
fixed container), DOM order `[button, panel-div]` so the tab visually lands on
the right (pinned to the edge) while the panel appears to its left — a plain
`flex-row` would've put the DOM-first tab on the left instead, which is why
`row-reverse` is there. The GSAP animation in `initResearchPaperPocket()`
(`animations.ts`) now tweens `width` (`0 → 'auto'`, 0.6s `power2.inOut`)
instead of `height`, so opening it reads as the panel being pulled out
horizontally from behind the tab rather than dropping down. The inner content
div keeps a fixed `w-72` so text doesn't reflow while the outer
`overflow-hidden` wrapper's width animates — same clip-not-reflow trick as the
height version, just rotated 90°.

The tab (`<button data-paper-toggle>`) is always fully visible at rest — no
peek state — sized up (`w-16 py-12`, `text-[0.82rem]`, full "Research Paper"
label instead of just "Paper") with a persistent glowing green ring
(`shadow-[0_0_0_1px_...,0_0_28px_8px_rgba(42,74,62,0.45)]`, intensifying on
`hover:`/`aria-expanded:`) so it reads clearly against the cream background
without needing interaction first. Hover only nudges it `-translate-x-2` as a
small "come out a bit" hint; the actual open/close does the heavy lifting.
The panel (`data-paper-panel`) sits directly to the tab's left with
`border-r-0` so its border continues the tab's outline with no seam; its
border/glow are `peer-aria-expanded:` conditional (via `peer` on the button,
which must precede the panel in DOM order for the sibling selector to reach
it) so a collapsed (`w-0`) panel doesn't leave a stray colored line poking out
from under the tab.

Last tweak: the hover "pop" was originally `hover:-translate-x-2`, which
translated the whole tab left and away from the viewport edge, leaving a
visible gap between the tab's right edge and the scrollbar/edge — reads as
the tab detaching and floating rather than popping. Fixed by swapping it for
`origin-right hover:scale-x-110`: scaling from a right-anchored transform
origin grows the tab leftward only, so its right edge stays glued to the
viewport edge at every point in the hover transition, no gap.

### Resume envelope (session 16)
First pass put a small cream envelope in the hero's left gutter (`hidden
lg:block`, pure CSS `group-hover` flap-lift + rising "paper" reveal, no GSAP
needed since there's no click-to-toggle state — the `<a target="_blank">`
just opens the PDF directly). Superseded once the user shared a reference
image: a deep green stationery mockup with botanical line art, asking for
that exact look, moved to the very end of the page below Reach, centered.

Couldn't reuse the reference image's artwork directly — it's a branded stock
mockup (visible "PLANIS SPHERE" wordmark, notebook/business-card props), not
something either of us has rights to embed. Matched its deep green exactly
(`#1B2E24`, a one-off hex local to this component, not added to the sitewide
`@theme` palette since nothing else uses it) and hand-built original
botanical line art in the same spirit instead of copying pixels: two
six-petal blossoms (`<use>`-free — six `<path>` copies of one petal curve,
`rotate(0/60/120/180/240/300)` around a shared center) plus two stem
curves, all `stroke="#F5F0E8"` at low opacity, `fill="none"`, matching the
reference's thin-cream-line-on-dark-green aesthetic without reproducing its
specific flowers.

Also asked, separately, whether this should be flat/front-facing (matching
the rest of the site) or tilted like the reference photo's mockup angle —
picked flat, so `ResumeEnvelope.astro` is a single SVG at `viewBox="0 0 480
240"` with no 3D transforms: a rounded rect body, an X of thin fold-seam
lines (flap triangle from the top corners + side folds from the bottom
corners, all converging on one point — this is the *back* of a sealed
envelope, which is the conventional envelope-icon view and matches what the
reference itself shows), and a `text-bg/60` "resume" label absolutely
positioned at the bottom-right corner. Sized `w-full max-w-[460px]
aspect-[2/1]`, no `lg:`-only breakpoint gate, so it scales at any viewport
without special-casing mobile. Hover is a simple `-translate-y-1` lift with a
drop-shadow, not the old flap-opening peel — no longer asked for once the
piece became a static signature rather than a small interactive hero accent.

Placement moved twice more after that: first centered below `<ContactSection
/>` at the very end of the page, then back into the hero at the user's
request, in-flow directly under the bio paragraph (`<div class="mt-14">`
inside the hero's existing text column, right after `.hero-bio` in
`index.astro`) rather than absolutely positioned — so it's left-aligned with
the rest of the hero text and pushes later hero content down instead of
overlapping it, and (unlike the very first hero attempt, which was `hidden
lg:block` in the gutter) it's visible at every viewport since it now lives in
the same normal-flow column as the name and bio, which already reflow fine
on mobile.

### Liquid metal envelope border (session 16)
User asked for an animated chrome/liquid-metal border around the resume
envelope, referencing a `@paper-design/shaders` React button component
(21st.dev) that renders `liquidMetalFragmentShader` via `ShaderMount` into a
canvas, then overlays opaque content on top leaving a thin rim uncovered so
the shader reads as a border rather than a fill. Explicitly framed as a
trial ("if I don't like it we'll get rid of it").

New package: `@paper-design/shaders@^0.0.80` (no peer deps, `ShaderMount` is
plain WebGL/JS, not React-specific). Its actual API differs slightly from
the reference snippet — `dispose()` not `destroy()` — checked against the
installed package's own `.d.ts` rather than trusting the snippet. It also
auto-injects a `[data-paper-shader]` stylesheet that gives the mounted div
`position: relative` and its canvas `position: absolute; inset: 0;
border-radius: inherit; z-index: -1` automatically, so none of the manual
canvas-sizing CSS the reference component injected by hand was needed here.

`LiquidMetalFrame.tsx` (new, generic wrapper, not PULSE/envelope-specific)
implements the border-via-occlusion technique directly: outer relative div,
a shader-mounted div at `inset-0` with the requested `borderRadius`, and a
second div inset by `borderWidth` (radius reduced to match) stacked on top
in normal DOM order — later sibling wins the stacking without needing
explicit z-index. `ResumeEnvelope.astro` now imports it and wraps its
existing `<a>` (unchanged) as the frame's slotted children, passing
`client:load` since the envelope sits in the hero and is visible on first
paint. Kept as a separate wrapper specifically so the effect can be dropped
by deleting the `<LiquidMetalFrame>` tags around the `<a>` without touching
the envelope's own markup, per the "trial" framing above.

First-look feedback: kept the effect, but wanted it thinner and slower.
`LiquidMetalFrame`'s defaults changed `borderWidth` 4→2 and added a `speed`
prop defaulting to `0.3` (was hardcoded `0.6`) — `ResumeEnvelope.astro`'s call
site updated its explicit `borderWidth={4}` to `{2}` to match. `speed` isn't
wired to anything dynamic yet (single call site, static value), so it's a
plain prop rather than a `useEffect` dependency for now.

Second round: thinner again (`borderWidth` 2→1.5) plus a color request — keep
the silver base, but recolor the shimmer, which defaulted to a neutral
rainbow (visible as yellow/blue/purple fringing) since neither `u_colorTint`
nor `u_colorBack` were being set at all (GLSL uniforms default to zero, so
`u_colorTint.a = 0` and the color-burn tint mix in `getColorChanges` was a
no-op — the base metal stripes are hardcoded near-white/near-black in the
shader source, and the rainbow comes entirely from `u_shiftRed`/`u_shiftBlue`
phase-shifting the R/B channels' stripe pattern relative to G). Added
`u_colorTint: [0.788, 0.29, 0.165, 0.55]` (terracotta `#C94A2A`, the site's
existing accent color, at 0.55 alpha) to color-burn-tint the metal warm
instead of neutral, and dropped `u_shiftBlue` from `0.22` to `0.1` (kept
`u_shiftRed` closer to its original `0.22`, now `0.24`) since the blue
channel's dispersion was the main source of the cool blue/purple fringe
fighting the new warm tint. Net look: silver base, warm copper/terracotta
shimmer instead of a generic rainbow — ties the effect back into the site's
own accent color rather than an arbitrary hue. Untried alternative if this
still doesn't feel right: tint toward `accent-alt` (deep green `#2A4A3E`)
instead, for a tone-on-tone match with the envelope itself rather than a
warm contrast.

Third round: user reported the border reading visibly thicker on the right
side than top/left/bottom. First two hypotheses tried and ruled out: (1) a
right-shifted `u_offsetX: 0.1` inherited unchanged from the reference
button's tuning (set for a near-square 142x46 pill, not our 2:1 rectangle) —
zeroed both offsets, no change; (2) missing explicit `u_originX`/`u_originY`
(GLSL uniforms default to 0 when unset, not the JS-side library default of
0.5) — set both to `0.5`, still no change. Traced it into
`vertex-shader.js`: the circle shape's UV (`v_objectUV`) is computed with a
hardcoded `boxRatio = 1.` (`getBoxSize(1., ...)`, always square), independent
of `u_originX`/`u_originY`/`u_offsetX`/`u_offsetY` — so none of those explain
directional bias, and confirmed the shape math itself is left-right
symmetric once offsets are centered. The actual cause is the fragment
shader's flow simulation: `direction`/`dispersionRed`/`dispersionBlue` are
built from diagonal terms (`diagBLtoTR`, `diagTLtoBR`) that are not
mirror-symmetric under a left-right flip by design — it's meant to look like
liquid flowing in one diagonal direction, not a static symmetric pattern, so
perfect left/right symmetry was never really on the table at the original
`u_angle: 45`.

Fix was empirical rather than derived: tried `u_angle` at a few values and
screenshotted each (`0`, `45`, `90`) across multiple animation frames since
the imbalance could itself shift over time. `u_angle: 90` came out
noticeably more even left/right/bottom across all sampled frames, so that's
what shipped. Verification method worth reusing: screenshot the same
element 2-3 times a second or so apart (the shader is continuously
animating) before judging left/right balance from a single frame, since a
single snapshot can catch the pattern mid-cycle looking lopsided in a way
that doesn't hold up over the full loop.

### Local screenshot verification (session 14)
`conventions.md` previously noted local dev + tooling as unreliable for
verification (see Testing workflow, below) — that was revisited this session at
user request ("let's work on localhost for now"). Playwright isn't a project
dependency; it was installed ad hoc into the scratchpad directory (`npm install
playwright` in a scratch folder, then `npx playwright install chromium`) and
driven with a small throwaway script rather than added to `package.json`. Used
to confirm the Builds tile redesign actually renders (desktop, mobile, hover)
and that the console has no errors, without adding a permanent test dependency
to the project.

### Nav links from sub-pages (session 14)
Before Builds, the site was a true single page — `nav.items[].link` was a bare
`#id` anchor, which only works when the link and its target share the same
document. Adding standalone `/projects/[slug]/` pages broke that assumption:
StaggeredMenu mounts in `Layout.astro` on every page, so a project detail page
also renders the same nav, and a bare `#origin` there tries to scroll to an
anchor that doesn't exist on that page.

Fix: nav links are now built as `` `${base}#id` `` where `base` comes from the
`getBaseUrl()` util (see "Marble background" above for why that util exists and
what it normalizes). From the homepage this still resolves to the same document
(anchor-scrolls, no reload); from a sub-page it navigates back to the homepage
and then jumps to the anchor. `ProjectsSection.astro`'s tile links and
`[slug].astro`'s "back to Builds" link use the same `getBaseUrl()` pattern for
their `/projects/...` and `#builds` URLs.

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

**Font sizes bumped ~7% (session 10)** — text felt too small at the original sizes:
- Group label `0.58rem` → `0.62rem`, group number `0.65rem` → `0.7rem`
- Category label `0.58rem` → `0.62rem`
- Skill items `text-sm` (0.875rem) → `text-[0.94rem]`
- "learning" badge `0.5rem` → `0.54rem`
- Note text `0.68rem` → `0.73rem`

### Contact section design
Four links in a stacked list (was five — LinkedIn removed session 11, user request).
Each row: small-caps label left, handle + `↗` right. On hover: handle and arrow shift
to `accent-alt` (#2A4A3E), separator darkens, label lifts opacity. All via CSS
transitions. Email uses `mailto:`, all others open `_blank`.

### Navigation — StaggeredMenu
`src/components/StaggeredMenu.tsx` — adapted from React Bits source (session 6).
- Mounted `client:load` in `Layout.astro` before `<slot />`, so it overlays all pages
- `isFixed={true}` — creates its own `fixed top-0 left-0 z-50` stacking context; `pointer-events-none` on wrapper, `pointer-events-auto` on toggle + panel
- Toggle button: top-right, `px-8 md:px-20 lg:px-32 py-8`, colour `#8C7E6E` at rest, shifts to `#1A1714` when open (via GSAP tween; was `#EDE7D9` until session 10 — see Bugs Hit and Resolved)
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

**Back face (added session 10):** `LanyardCard.tsx` now also generates a `backImage` —
a plain `512×756` canvas filled solid `#F5F0E8` (cream, no text/graphics), via a
`generateBackTexture()` helper called in the same `useEffect` as the front face.
Passed to `Lanyard` as `backImage`; `Band`'s `cardMap` composite (in `Lanyard.tsx`)
draws it into `BACK_UV_RECT` same as the front. This was changed in isolation this
time (no scale/collider change alongside it) — see Bugs Hit and Resolved below.

**Props used from `LanyardCard`:**
```tsx
<Lanyard
  frontImage={frontImage}
  backImage={backImage}
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

**Volunteering block relocated here (session 11):** the Green Bengaluru full-bleed
statement + accordion (`about.volunteering`) moved from the bottom of `AboutSection.astro`
to the bottom of `FieldWork.astro`, directly below the two-column flex. Markup and
classes (`about-volunteer`, `data-accordion-trigger="volunteering"`) are unchanged —
only the file it lives in moved. `animateAbout()` in `animations.ts` still targets
`.about-volunteer` by class, so no animation code changes were needed; the comment
above it in `animations.ts` was updated to note the block now lives in Field Work.
Right column: `<ul>` of seminar items, each with title (`text-text/75 text-[0.77rem]`), source
(`text-muted/60 text-[0.66rem]`), and detail (`text-muted/45 text-[0.66rem]`). Rows separated
by `border-t border-muted/10`, first row has no top border. (Session 10: bumped from
`0.72rem`/`0.62rem` — see font size note below.)

Section label convention: "Field work" left, "Attended" right — both `text-muted text-xs tracking-[0.2em] uppercase`.
Padding matches other sections (`px-8 md:px-20 lg:px-32`). Page order: Opening → Origin → Skills → Field Work → Reach.

**Font sizes bumped ~7% (session 10)**, same reasoning as Skills — applied to seminar
list text above and to the `CardSwap` cards it wraps: "Field work" label `0.5rem` →
`0.54rem`, card name `text-sm` → `text-[0.94rem]`, card description `0.72rem` → `0.77rem`.

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

### Hero scroll indicator (session 10)
`.hero-scroll` div (vertical rule + "Scroll" label, bottom-left of hero) removed
from `index.astro`. Its `animateHero()` tween in `animations.ts` removed too.
Purely a visual simplification call — no bug involved.

---

## Copy State

### Hero label (session 10)
Changed from "IoT Engineering — Presidency University, Bangalore" to just
"IoT Engineer" — shorter, less redundant with the bio directly below it.
Lives in `hero.label` in `site.ts`.

### Hero bio (final, approved)
> "IoT sits at a rare intersection — not purely hardware, not purely software.
> It's the domain where a single person can take an idea from concept to working
> device. That's what drew me in."

### About opening (session 13, approved — formal register)
> "My trajectory into the Internet of Things was not self-initiated; however,
> the field proved captivating due to its equilibrium between the abstract
> digital and tangible physical worlds. IoT functions as a multidisciplinary
> sweet spot, contrasting with the hardware-centric nature of electrical
> engineering and the software-confined paradigm of machine learning. It
> affords a unique operational autonomy, allowing one to manifest complex
> devices entirely within the purview of a single, integrated domain."

Session 11 had rewritten this into plainer language (three claims: unchosen
origin → disciplinary middle ground → autonomy). Session 13 reverted to the
user's original formal/academic phrasing verbatim — the plainer rewrite is no
longer used.

All other About copy (education line, human note, Green Bengaluru statement,
Samsung card content, minor project card descriptions) live in `src/data/site.ts`
and are final.

### Builds copy cleanup (session 14)
The Smart Home Hub and NetSim copy (tagline, overview, features, scope in
`projects` in `site.ts`) was written by Claude this session and read as
AI-generated on a pass: heavy em dash use, and a recurring "X, not Y" /
"not just A, it's B" contrastive setup-and-punchline structure (e.g. "Most
home-automation demos stop at devices behaving prettily. This one also
models..."). User asked for a cleanup pass across the whole site plus
specifically the two project pages. Rewrote both entries: em dashes replaced
with commas, colons, or parentheses depending on what reads most natural in
context (never a hyphen standing in for an em dash), and the contrastive
strawman sentences either cut or folded into a plainer statement of what the
thing does. Also caught and fixed a stray em dash in `[slug].astro`'s `<title>`
template literal (`${project.name} — Huzaifa`) — changed to a plain hyphen to
match the hyphen already used in `Layout.astro`'s default title
(`'Huzaifa - IoT Engineering'`).

Checked the rest of the site's copy (hero, About, Skills, Field Work, Contact)
for the same issues and found none — no em dashes, no buzzword-y AI tells
(`seamless`, `robust`, `leverage`, etc.). That copy predates this session and
was already user-written/approved, so it wasn't touched beyond confirming it
was already clean.

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

**Marble background + favicon 404 under GitHub Pages base path (session 14)**
Cause: `global.css`'s `url('/assets/marble-bg.jpg')` and `Layout.astro`'s
`href="/favicon.svg"` were literal absolute paths, which resolve from the
domain root and ignore `astro.config.mjs`'s `base: '/portfolio'` entirely.
Broke site-wide (not just on the pages added this session) — a bug that had
been live since the marble background was introduced but only surfaced now
because local dev testing was reinstated this session (see Testing workflow).
Fix: see "Marble background" above — CSS custom property set from
`Layout.astro` via the new `getBaseUrl()` util, and the favicon `href` built
the same way.

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
(`scale=2.25`, no `backImage`).

**Resolved (session 10):** re-added just the back face (plain cream `#F5F0E8`,
no scale/collider change alongside it, unlike session 9's bundled attempt) and
it deployed cleanly. This suggests the session 9 breakage was actually caused
by the `scale` change (2.25→2.85 with an untouched collider, likely a physics/
visual mismatch), not the back face texture itself. Scale is still untouched at
`2.25` — has not been retested since.

**StaggeredMenu toggle button invisible once panel fully opens (session 10)**
Cause: `MUTED_OPEN` (the toggle's open-state text/icon color) was `#EDE7D9` —
the exact same hex as the slide-in panel's own background (`.sm-panel`). Once the
panel finished sliding in behind the header, the "Close" text and icon blended
invisibly into it (both header z-20 and panel are on top of each other, same color).
Fix: changed `MUTED_OPEN` to `#1A1714` (site text color) in `StaggeredMenu.tsx`.

**Nav/tile links broken on GitHub Pages base path (session 14)**
Cause: `import.meta.env.BASE_URL` doesn't reliably include a trailing slash;
concatenating `${base}#opening` / `${base}projects/...` directly produced
`/portfolio#opening` and `/portfolioprojects/...`. See "Nav links from
sub-pages" above for the full fix.

**`git commit` heredoc syntax fails in PowerShell**
Cause: PowerShell 5.1 does not support bash heredocs (`<<'EOF'`).
Fix: use Bash tool for git commits, not PowerShell.

**GitHub remote not connected (session 1)**
Status: resolved. Remote is `https://github.com/AsHuzaifa/portfolio.git`.
Commits push to `main`. Netlify auto-deploys.

---

## What's Next (in order)

1. **Card face editing** — front face content is final; blank cream back face added
   and deployed successfully in session 10. Scale increase (2.25→2.85) still unresolved/
   untested since session 9 — likely culprit for that session's breakage, not the back face.
2. **Builds section — add remaining projects** — Smart Home Hub, NetSim (session 14), and PULSE
   (session 15) are in; NeuroSync and Posture Detection are next once their repos/demos are
   ready. Add each as a new object in the `projects` array in `site.ts` following the `Project`
   interface (`slug`, `name`, `tagline`, `stack`, `repo`, `demo`, `image`, `fluid`, `overview`,
   `features[]`, `scope`, `gallery`) — no component changes needed, the tile grid and
   `[slug].astro` detail page both iterate the array. The smaller minor-projects (Smart
   Attendance, Ocean Sensor, Temp/Humidity) stay in Field Work's `CardSwap`, not Builds — Builds
   is for the larger, individually-documented projects.

Session 14's Builds work (Smart Home Hub, NetSim, fluid-art tiles, base-path fixes, copy cleanup),
session 15's PULSE addition (including its hardware gallery) and Minor Works, and session 16's
work (PULSE research paper pocket, the resume envelope, and its liquid-metal border) are all
pushed to `main` as of commit `186c3e1` ("Add PULSE paper pocket and hero resume envelope with
liquid metal border") — nothing local-only remains.

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
astro:                  ^7.0.3
@astrojs/react:         ^6.0.0
react:                  ^19.2.7
tailwindcss:            ^4.3.1   (via @tailwindcss/vite, NOT the Astro integration)
gsap:                   ^3.15.0
three:                  ^0.185.0
@react-three/fiber:     ^9.6.1
@react-three/drei:      ^10.7.7
@react-three/rapier:    ^2.2.0
meshline:               ^3.3.1
@paper-design/shaders:  ^0.0.80  (added session 16, LiquidMetalFrame.tsx)
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

### Testing workflow (changed session 10, revised session 14)
Session 10's finding was that `astro dev` was unreliable for verification in this
environment. Session 14 revisited this at user request ("let's work on localhost
for now") and it worked fine: `astro dev --background` (per `CLAUDE.md`) serves
reliably, and Playwright (installed ad hoc into a scratch folder, not a project
dependency — see "Local screenshot verification") can drive it for real
screenshots and console-error checks. This is how the session-14 base-path bug
(marble background + favicon 404ing under `/portfolio`) was actually caught —
it wouldn't have surfaced from a build-only check.

Current guidance: local dev + Playwright verification is fine and worth doing
for visual changes. Still commit and push when the user says to; don't treat a
clean local screenshot as a substitute for asking before pushing.
