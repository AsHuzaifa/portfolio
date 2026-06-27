# Style — Portfolio (ashuzaifa)

## Color Palette

Direction: Warm & editorial — creams, tans, soft contrast.
Not sterile white. Not dark-mode default. Warm paper tones with
deliberate, restrained accent usage.

### Palette Tokens (confirm exact values with Claude Code at build time)

--color-bg: #F5F0E8 /_ warm cream base _/
--color-surface: #EDE7D9 /_ slightly darker for cards/panels _/
--color-text: #1A1714 /_ near-black, warm undertone _/
--color-muted: #8C7E6E /_ secondary text, labels _/
--color-accent: #C94A2A /_ one bold accent — deep terracotta _/
--color-accent-alt: #2A4A3E /_ optional second accent — deep green _/

## Typography

Direction: Editorial — serif + sans pairing. Hierarchy through contrast,
not size alone.

### Type Scale

- Display / Hero: Serif (e.g. Playfair Display, Fraunces, or Cormorant)
- Body / UI: Sans-serif (e.g. Inter, DM Sans, or Satoshi)
- Code / Labels: Monospace (e.g. JetBrains Mono) — sparingly

### Rules

- Never use more than 2 typefaces simultaneously
- Serif for big statements, sans for everything functional
- Tight tracking on large headings (-0.02em to -0.04em)
- Generous line height on body (1.6–1.75)
- Confirm final font choices with Claude Code at build time

## Animation & Motion

Direction: Cinematic — full drama, but purposeful. Every animation
should feel like it's revealing something, not just decorating.

### Principles

- Scroll-triggered reveals are the primary mechanic
- Elements enter with intent — not just fade in, but arrive
- Smooth, slightly slow easing (ease-out, ~0.6–1s duration)
- Parallax on hero and section transitions
- No looping animations unless they carry meaning
- Performance first — if an animation tanks mobile, cut it

### Motion Vocabulary

- Hero: cinematic entrance, large type animating in staggered
- Project cards: reveal on scroll, subtle lift on hover
- Section transitions: horizontal or masked reveals preferred over fades
- Cursor: custom cursor if feasible (adds to immersive feel)

### Libraries to consider (decide at build time)

- GSAP (most powerful, pairs well with Astro)
- Motion One (lighter, good for simpler scroll triggers)
- Avoid CSS-only for anything complex

## Layout

- Single page preferred, sections scroll into view
- Wide margins, generous whitespace — breathing room is intentional
- Asymmetric layouts encouraged over rigid grid symmetry
- Max content width: ~1200px, centered
- Mobile: graceful degradation — reduce motion, maintain warmth

## General Rules

- No box shadows that look like Bootstrap defaults
- No gradients unless they feel hand-crafted
- Borders used sparingly — prefer spacing to define regions
- Every visual decision should feel like it belongs to THIS site

## Placeholders to Fill Later

- [ ] Confirm final font selections (Google Fonts vs self-hosted)
- [ ] Confirm accent color — terracotta is a suggestion, not locked
- [ ] Decide on custom cursor (yes/no)
- [ ] Choose animation library (GSAP vs Motion One)
- [ ] Test palette on mobile before locking