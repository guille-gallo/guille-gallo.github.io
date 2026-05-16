# AGENTS.md

Instructions for AI coding agents working in this repository.

## Project

Personal portfolio for Guille Gallo. **Next.js 15 (App Router) + TypeScript +
Tailwind CSS v4 + MDX**. Statically exported to GitHub Pages.

## Commands

| Task         | Command         |
|--------------|-----------------|
| Install      | `npm install`   |
| Dev server   | `npm run dev`   |
| Production   | `npm run build` |
| Lint         | `npm run lint`  |
| Start        | `npm start`     |

After any non-trivial change, run `npm run lint` and `npm run build` before
declaring done.

## Code conventions

- **TypeScript strict.** No `any` unless unavoidable; explain when used.
- **Components:** function components, default-exported from
  `src/components/*.tsx`, re-exported via `src/components/index.ts`.
- **Styling:** Tailwind utility classes only. **No** CSS Modules,
  styled-components, or inline `style` props for design tokens.
- **Imports:** use the `@/` alias for `src/`.
- **Content:** project pages live in `src/content/projects/*.mdx` and are
  surfaced through `src/lib/projects.ts`.
- **Server vs client:** prefer Server Components; add `"use client"` only when
  state, effects, or browser APIs are required.

## Design system — read `DESIGN.md`

This repo ships a [`DESIGN.md`](./DESIGN.md) that follows the
[Google `DESIGN.md` specification](https://github.com/google-labs-code/design.md)
and the
[VoltAgent `awesome-design-md` extended-prose conventions](https://github.com/VoltAgent/awesome-design-md).

**Before generating or modifying any UI**, read `DESIGN.md` and follow it:

- Use the documented color, typography, spacing, and radius tokens — and only
  those.
- Map tokens to Tailwind utilities exactly as listed in the *Agent Prompt
  Guide* section.
- Always pair light + `dark:` classes.
- Reserve the blue accent for interaction or technology tagging; never for
  decoration.
- Reuse existing components (`ProjectCard`, `ExperienceTimeline`, tag
  patterns) before creating new ones.

If a requested change conflicts with `DESIGN.md`, surface the conflict in your
reply rather than silently breaking the system.

## Validating `DESIGN.md`

The Google CLI can lint the file:

```bash
npx @google/design.md lint DESIGN.md
npx @google/design.md spec --rules        # full spec + rules
npx @google/design.md export --format tailwind DESIGN.md
```

Run `lint` after editing `DESIGN.md`.

## Out of scope for agents

- Do not add new dependencies without justification.
- Do not change `next.config.mjs`, `eslint.config.mjs`, `tsconfig.json`, or
  CI workflows unless the task explicitly requires it.
- Do not commit or push; leave that to the human.
