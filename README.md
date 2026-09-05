# guille-gallo portfolio

Personal site built with [SolidStart 2](https://docs.solidjs.com/solid-start/v2), Tailwind CSS 4 and MDX, running on [Bun](https://bun.sh) and deployed to Vercel.

## Develop

```bash
bun install
bun run dev        # http://localhost:3000
bun run build      # production build into .output/
bun run typecheck
bun run lint
```

Copy `.env.example` to `.env` and set `GITHUB_TOKEN` to avoid anonymous GitHub API rate limits during development.

## Content

- Featured projects: `src/lib/projects.ts` (GitHub metadata is fetched server-side and cached for an hour).
- Project deep dives: `src/content/projects/*.mdx`, rendered with the `<Feature>` component from `src/components/mdx/Feature.tsx`.
- CV/contact data: `src/lib/cv-data.ts`.

## Deploy

`vercel.json` installs Bun 1.4.2 (Vercel ships Bun 1.3, which cannot read the v2 lockfile) and runs `bun install --frozen-lockfile` + `bun run build`; the Nitro Vercel preset is auto-detected and emits `/` and `/github-featured-projects` as ISR functions (revalidated hourly) plus a catch-all server function. Set `VITE_SITE_URL` (public origin) and optionally `GITHUB_TOKEN` in the Vercel project.

To reproduce the Vercel output locally: `NITRO_PRESET=vercel bun run build` (writes `.vercel/output`). Running the build as `bun --bun run build` makes Nitro target the Bun runtime instead of Node.
