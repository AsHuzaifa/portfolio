# Coding Style — Portfolio (ashuzaifa)

## General Philosophy
Write code that is readable first, clever second.
Prefer clarity over brevity. Prefer explicit over implicit.
This is a portfolio — maintainability matters more than optimization.

## File & Folder Structure
src/
  components/    — reusable Astro components
  layouts/       — page layout wrappers
  pages/         — route-level Astro pages
  styles/        — global CSS / Tailwind config
  assets/        — images, fonts, static files
  data/          — content files (JSON or .md) for projects, skills, etc.

- One component per file, always
- File names: PascalCase for components, kebab-case for everything else
- No deeply nested folders — keep it flat where possible

## Astro-Specific Rules
- Use .astro components for all layout and structure
- Frontmatter stays clean — logic that's more than 3 lines goes
  into a separate utility file in src/utils/
- Props must be typed explicitly using TypeScript interfaces
- No inline styles — Tailwind classes only

## Tailwind Rules
- Utility classes only — no custom CSS unless Tailwind cannot do it
- Extract repeated class combinations into Astro components,
  not @apply (avoid @apply unless absolutely necessary)
- Responsive classes follow mobile-first convention (sm: md: lg:)
- Dark mode: not required for now — warm palette is light-mode only

## JavaScript / TypeScript
- TypeScript preferred over plain JS
- Use const by default, let only when reassignment is needed,
  never var
- Arrow functions for callbacks, named functions for anything
  with real logic
- No anonymous functions in JSX/Astro props

## Animation Code
- GSAP or Motion One (confirm library choice before first animation)
- All animation logic lives in its own file: src/utils/animations.ts
- Never inline animation logic inside component frontmatter
- Comment all animation blocks — timing, easing, and intent

## Comments
- Only for complex logic — not for self-explanatory code
- Comments explain WHY, not WHAT
- Animation blocks always get a comment
- Format: // [section] brief explanation

## Naming Conventions
- Components: PascalCase (ProjectCard.astro, HeroSection.astro)
- Variables/functions: camelCase
- CSS custom properties: kebab-case (--color-bg, --font-display)
- Data keys: camelCase

## What to Avoid
- No inline styles anywhere
- No unused imports left in files
- No console.log left in production code
- No component files longer than ~150 lines — split if needed
- No hardcoded content inside components — pull from src/data/

## Placeholders to Fill Later
- [ ] Confirm TypeScript strictness level (strict: true recommended)
- [ ] Confirm animation library before first motion component
- [ ] Add linting config (ESLint + Prettier) at project init