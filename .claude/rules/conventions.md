# conventions.md — Portfolio Session Log
Last updated: June 27, 2026

Read this before doing anything. It restores full session context.

---

## What Was Built This Session

| Section | Status |
|---|---|
| Hero (`#opening`) | Approved, committed, live on Netlify |
| About (`#origin`) | Built, layout revision in progress (see below) |

---

## Current File Structure

```
d:\portfolio\
├── CLAUDE.md                        ← project-level Claude instructions
├── astro.config.mjs                 ← Tailwind v4 via @tailwindcss/vite plugin
├── tsconfig.json
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
    │   └── AboutSection.astro       ← Origin section component
    ├── data/
    │   └── site.ts                  ← all page content (hero, about exports)
    ├── layouts/
    │   └── Layout.astro             ← base HTML shell, font imports
    ├── pages/
    │   └── index.astro              ← single-page entry, imports all sections
    ├── styles/
    │   └── global.css               ← @theme tokens, base layer
    └── utils/
        └── animations.ts            ← all GSAP logic (animateHero, animateAbout)
```

---

## Design Decisions (with reasoning)

### Animation library: GSAP v3
Chosen over Motion One. Reason: hero required cinematic stagger with `skewY` on
the name arrival and a count-up on the Samsung stat — GSAP's timeline API handles
this cleanly; Motion One would need workarounds. ScrollTrigger is registered in
`animations.ts` and used for all scroll-driven reveals.

Rule: all animation logic stays in `src/utils/animations.ts`. Never inline in
component frontmatter or `<script>` tags directly.

### Font pairing: Fraunces + DM Sans
- Display/hero: **Fraunces** (variable optical-size serif, loaded via Google Fonts,
  weights 300/400/700 + italic 300). Chosen for editorial gravity and optical-size
  axis that lets the same font scale from 8rem headings to 1.4rem callouts.
- Body/UI: **DM Sans** (opsz variable, weights 300/400/500). Clean, slightly warm,
  pairs with Fraunces without competing.
- Both loaded in `Layout.astro` via a single Google Fonts `<link>`.
- Tailwind tokens: `--font-display` → `font-display`, `--font-body` → `font-body`.

### Color tokens (Tailwind v4 `@theme` in `global.css`)
```
--color-bg:          #F5F0E8   → bg-bg, text-bg, etc.
--color-surface:     #EDE7D9   → used for the Green Bengaluru closing beat background
--color-text:        #1A1714   → near-black, warm undertone
--color-muted:       #8C7E6E   → secondary text, labels, section markers
--color-accent:      #C94A2A   → terracotta, NOT yet used (reserved for CTAs/hover)
--color-accent-alt:  #2A4A3E   → deep green, used on Green Bengaluru quote text
```

### Section ID naming convention
Generic names (Hero, About, Skills, Contact) are banned per `tone.md`.
- `#opening` — Hero section
- `#origin`  — About section
- Remaining sections to be named at build time (see Open Decisions below)

Convention: section `id` is thematic, not functional. Matches the "logbook from
someone mid-expedition" tone.

### Layout system
Tailwind's 12-column grid (`grid-cols-12`) with `col-span-*`. No Bootstrap, no
component library. Asymmetric layouts preferred over symmetric grids.

About section grid: left `col-span-7`, right `col-span-4 col-start-9` —
one-column structural gutter between them.

### Content architecture
No hardcoded strings in components. All copy lives in `src/data/site.ts` and is
imported per section. Current exports: `hero`, `about`. Add new exports here as
sections are built.

### Full-bleed elements
Pattern for breaking out of section padding (used in the Green Bengaluru callout):
```
-mx-8 md:-mx-20 lg:-mx-32 px-8 md:px-20 lg:px-32
```
This matches the section's outer padding exactly to produce a viewport-width
background band while keeping text aligned to the content column.

---

## Bugs Hit and Resolved

**Netlify showing default Astro placeholder after deploy**
Cause: initial commit had no real page content; Netlify deployed the stock
`index.astro` from Astro's minimal template.
Fix: committing the built Hero section and pushing to `main` triggered a
redeploy with real content.

**`npm create astro` refused to init in non-empty directory**
Cause: `.claude/` and `CLAUDE.md` already existed in `d:\portfolio\`.
Fix: initialized in a temp subdirectory (`d:\portfolio\astro-init\`), moved
all files to root manually, deleted the temp dir, then ran `git init`.

**`npm create astro` flags parsed incorrectly via `npm create` double-dash**
Cause: `npm create astro@latest . -- --template minimal` passes flags as positional
args in some npm versions.
Fix: switched to `npx create-astro@latest <path> --template minimal` directly.

**`git commit` failed: Author identity unknown**
Cause: fresh git init with no global identity configured.
Fix: `git config user.email "mutahar.mo@northeastern.edu"` and
`git config user.name "ashuzaifa"` scoped to the repo (not global).

**`gh` CLI not installed**
Cause: GitHub CLI not present on this machine.
Status: GitHub remote not yet added. To complete:
```
git remote add origin https://github.com/ashuzaifa/portfolio.git
git push -u origin main
```
Or install via `winget install GitHub.cli` then `gh auth login` + `gh repo create`.

---

## About Section — Current Revision State

First layout pass had problems: elements scattered, stat floating without
compositional anchor, no visual hierarchy.

Redesign applied (layout only, no copy changes):
- Thin `<hr>` + `ORIGIN` label + `01` index at section entry
- 12-col grid: narrative/education/human-note in left col, Samsung stat in right
- Stat uses `self-start` so it anchors to the top of the left column's text
- Green Bengaluru uses full-bleed `bg-surface` band, large italic Fraunces in
  `accent-alt`, attribution in near-invisible small caps
- Education line separated from narrative by a thin muted rule (gear-change visual)

Status as of last save: **revised, not yet approved by user**.

---

## What's Next (in order)

1. User approves About layout revision → commit
2. **Projects section** (`#fieldwork` or similar) — 5 projects from `personal.md`,
   project cards with scroll reveal, no repo links yet for some
3. **Skills section** — Edge computing, TinyML, Digital Twins, IoT security;
   possibly formatted as a list or tag-style, avoid "skills bar" clichés
4. **Contact section** — tone.md suggests `Signal` as a possible name; keep short

---

## Open Decisions / Pending Placeholders

| Item | Status |
|---|---|
| Section names for Projects, Skills, Contact | Not decided |
| Custom cursor (yes/no) | Pending — style.md lists it as optional |
| Final font confirmation (Google Fonts vs self-hosted) | Currently Google Fonts; self-hosting deferred |
| Accent color locked? | Terracotta `#C94A2A` is in tokens but not yet used visually |
| NeuroSync: component list, repo link | Placeholder in personal.md |
| Posture Detection: Edge Impulse project link | Placeholder in personal.md |
| Smart Attendance: stack details, teammate files | Placeholder in personal.md |
| Ocean Pollution Sensor: photos, stack | Placeholder in personal.md |
| ESLint + Prettier config | Not yet set up |
| TypeScript strictness level | `tsconfig.json` uses `"strict": true` via Astro's template |
| Netlify site URL confirmed | https://ashuzaifa.netlify.app (from stack.md) |
| GitHub remote added | Not yet — see bug note above |

---

## Package Versions

```
astro:       ^7.0.3
tailwindcss: ^4.3.1   (via @tailwindcss/vite, NOT the Astro integration)
gsap:        ^3.15.0
```

---

## Node / Environment

- Node: v24.17.0 at `D:\Node.js`
- npm: 11.13.0
- OS: Windows 11
- Shell: PowerShell (primary) — prefix any `npx`/`npm` commands with
  `$env:PATH = "D:\Node.js;$env:PATH"` if Node is not on PATH in that session
- Git identity: `ashuzaifa` / `mutahar.mo@northeastern.edu` (repo-scoped)
