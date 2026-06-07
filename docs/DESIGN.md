# Design system

Single source of truth for visual decisions. Token changes go in `src/app/globals.css`; component patterns below must be reused, not reinvented.

## Tone

**Transparent liquid glass** over a soft, drifting amber-and-sage backdrop. The page is built on a frosted-glass metaphor: the background is a living, merging goo; every surface that holds content is a translucent pane that lets the colors bleed through.

## Color tokens

Defined in `:root` of `globals.css` and re-exposed to Tailwind via `@theme inline`. Use the Tailwind utility (e.g. `bg-surface`, `text-muted`) — never the raw `var()` in components.

| Token             | Light                  | Dark                   | Purpose                                    |
| ----------------- | ---------------------- | ---------------------- | ------------------------------------------ |
| `background`      | `#f5f2ec`              | `#0a0d12`              | Page body. Warm off-white / deep navy.     |
| `surface`         | `rgba(255,255,255,.45)`| `rgba(255,255,255,.06)`| Glass card background. Always translucent. |
| `surface-2`       | `rgba(255,255,255,.65)`| `rgba(255,255,255,.09)`| Nested glass / pills / well surfaces.      |
| `surface-strong`  | `rgba(255,255,255,.85)`| `rgba(255,255,255,.14)`| Emphasized glass (active states).          |
| `foreground`      | `#1a1815`              | `#f0ede6`              | Primary text.                              |
| `muted`           | `#6b6660`              | `#8b8478`              | Secondary text, labels, icons.             |
| `border`          | `rgba(255,255,255,.6)` | `rgba(255,255,255,.12)`| Glass card hairline (light = white).       |
| `border-strong`   | `rgba(26,24,21,.08)`   | `rgba(255,255,255,.18)`| Non-glass borders (timeline, dividers).    |
| `accent`          | `#b8865b`              | `#d4a574`              | Amber/copper. Single accent.               |
| `accent-soft`     | amber 18%              | amber 20%              | Pill backgrounds, hover wells.             |
| `accent-strong`   | `#9c6f49`              | `#e8b889`              | Hover state for accent surfaces.           |
| `ring`            | amber 40%              | amber 40%              | Focus ring color.                          |

### Liquid blob palette *(no pink, no purple)*

| Token           | Light     | Dark     |
| --------------- | --------- | -------- |
| `--blob-amber`  | `#e8a85b` | `#e8a868`|
| `--blob-honey`  | `#d49545` | `#d49555`|
| `--blob-sage`   | `#8fb09e` | `#6b9586`|
| `--blob-moss`   | `#b0a85a` | `#9a9658`|

These four feed the goo filter in the background. Stay within this palette when adding any new tinted element. **Do not** introduce pink, peach, violet, or red.

## Liquid background

`layout.tsx` mounts two things once:

1. An inline `<svg>` with the `<filter id="liquid-goo">` definition (`feGaussianBlur` + `feColorMatrix` alpha-amplify).
2. A `<div class="liquid">` containing a `<div class="liquid__layer">` (which gets `filter: url(#liquid-goo)`) and 4 colored `.liquid__blob` circles that drift with `transform: translate()` keyframes.

The filter is the entire effect — the blobs are just round colored divs, the SVG merges them where they touch. `prefers-reduced-motion: reduce` stops the drift (the layout stays).

**Do not** add per-page backgrounds, gradient layers, or new blob colors. The ambient layer is global and is the only motion in the design.

## Glassmorphism rules

- **Every content surface** uses `bg-surface` (translucent) + `backdrop-blur-xl` + `border-border` + a shadow token. The blur is what makes it glass; the translucency is what lets the blob layer show through.
- **Stacking glass on glass** (e.g. a card inside a card) uses `bg-surface-2` (more opaque) for the inner element so the hierarchy reads.
- **Strong emphasis** (active nav tab, focused state) uses `bg-surface-strong`.
- **Pills / badges** use `bg-surface-2 text-muted`, hover `bg-accent-soft text-foreground`.

## Radii

- `rounded-2xl` for cards and panels (`--radius-card` token = 1.25rem).
- `rounded-full` for buttons, pills, dots, and any small interactive element (`--radius-pill`).

## Shadows

| Token            | Use                                       |
| ---------------- | ----------------------------------------- |
| `shadow-glass`   | Default glass card surface.               |
| `shadow-elevated`| Hover state on cards, dropdowns, modals.  |

## Motion

- Use Tailwind transitions for color/transform/translate/opacity only. No `transition-all` unless the element truly animates every property — prefer explicit lists.
- Liquid drift is the only global animation. Anything else (carousel scroll, framer-motion reveals) is per-component and must respect `prefers-reduced-motion`.
- Hover transforms: max `scale-[1.02]` or `translate-y-0.5` — never bigger.

## Component patterns

### Primary button (CTA, e.g. "Download CV", "Back to Home")

```tsx
className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:scale-[1.02] hover:shadow-[var(--shadow-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

### Pill link / CTA card (e.g. "View GitHub featured projects →")

```tsx
className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-glass)] backdrop-blur-xl transition-all hover:scale-[1.02] hover:border-accent/40 hover:shadow-[var(--shadow-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

Icon inside the pill: `text-muted` by default, `text-accent` on `group-hover`.

### Glass card (project, contact, stat)

```tsx
className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-glass)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
```

### Header / Footer (chrome)

```tsx
className="sticky top-0 z-50 w-full border-b border-border bg-surface backdrop-blur-xl"
className="border-t border-border bg-surface backdrop-blur-xl"
```

### Pill / badge (language, topic, live demo)

```tsx
className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted"
```

Hover variants swap to `bg-accent-soft text-foreground`.

## Typography

Inherits Geist (Geist Sans + Geist Mono) from `next/font/google`. No custom font sizes; use Tailwind defaults (`text-sm`, `text-base`, `text-xl`, `text-2xl`, etc.).

## Do / Don't

- **Do** use token utilities (`bg-surface`, `text-muted`, `border-border`).
- **Do** pair every translucent surface with `backdrop-blur-xl` — without the blur, the translucency looks broken.
- **Do** include `focus-visible:ring-2 focus-visible:ring-ring` on every interactive element.
- **Do** keep the ambient liquid layer — it is the design.
- **Don't** hardcode `gray-*`, `blue-*`, `dark:` colors in new components. If a token is missing, add it to `globals.css` first.
- **Don't** add new blob colors, gradient layers, or per-page backgrounds.
- **Don't** introduce pink / peach / violet / red — the palette is amber + sage.
- **Don't** use `transition-all` on small elements with many properties.
