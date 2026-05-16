# Copilot instructions

This is a Next.js 15 + TypeScript + Tailwind v4 + MDX portfolio statically
exported to GitHub Pages.

## Always

1. **Read [`DESIGN.md`](../DESIGN.md) before producing UI.** It is a
   `DESIGN.md`-spec file (Google Labs format, VoltAgent extended prose) that
   defines colors, typography, spacing, radii, components, and Do's/Don'ts.
   Map its tokens to Tailwind utilities using the *Agent Prompt Guide*
   section. Pair every `bg-*` / `text-*` / `border-*` with its `dark:`
   counterpart.
2. **Read [`AGENTS.md`](../AGENTS.md)** for project commands and conventions.
3. Use Tailwind utility classes only — no CSS Modules, no inline styles for
   design tokens.
4. Prefer Server Components; add `"use client"` only when needed.
5. Reuse existing components (`ProjectCard`, `ExperienceTimeline`, tag
   patterns) before creating new ones.
6. After non-trivial changes, run `npm run lint` and `npm run build`.

## Never

- Introduce a second accent color (blue is the only hue).
- Use gradients, glows, colored shadows, or pure-white page backgrounds.
- Add dependencies without justification.
- Commit or push on the user's behalf.

## Validating the design system

```bash
npx @google/design.md lint DESIGN.md
```
