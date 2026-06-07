# Design system

Single source of truth for visual decisions. Token changes go in `src/app/globals.css`; component patterns below must be reused, not reinvented.

## Tone

Clean, warm, liquid. Friendly without being playful. Less stark contrast than a typical developer portfolio — no pure white background, no pure black in dark mode.

## Color tokens

Defined in `:root` of `globals.css` and re-exposed to Tailwind via `@theme inline`. Use the Tailwind utility (e.g. `bg-surface`, `text-muted`) — never the raw `var()` in components.

| Token             | Light     | Dark      | Purpose                                    |
| ----------------- | --------- | --------- | ------------------------------------------ |
| `background`      | `#faf9f6` | `#0b0e14` | Page body. Warm off-white / deep navy.     |
| `surface`         | `#ffffff` | `#11151d` | Cards, panels, modals.                     |
| `surface-2`       | `#f3f1ea` | `#161b25` | Subtle elevation, code blocks, wells.      |
| `foreground`      | `#1a1815` | `#f0ede6` | Primary text.                              |
| `muted`           | `#6b6660` | `#8b8478` | Secondary text, labels, icons.             |
| `border`          | `#ece8de` | `#1f2530` | Use at 60% opacity for hairline borders.   |
| `accent`          | `#b8865b` | `#d4a574` | Amber/copper. Single accent — go sparingly.|
| `accent-soft`     | amber 12% | amber 16% | Pill backgrounds, hover wells.             |
| `accent-strong`   | `#9c6f49` | `#e8b889` | Hover state for accent surfaces.           |
| `ring`            | amber 40% | amber 40% | Focus ring color.                          |

**Don't** introduce a second accent. If a state needs emphasis, use `accent-strong` or `foreground`.

## Surface treatments

- **Body** uses `background`. Always.
- **Cards** use `surface` with `border-border/60` + `shadow-[var(--shadow-card)]` + `backdrop-blur-sm`. The shadow values are tokens — don't write custom shadows.
- **Hover** on interactive cards: `-translate-y-0.5` + swap to `shadow-elevated` + tighten border to `border-accent/40`.
- **Pill chips** (language pills, topic pills, live-demo badges) use `bg-surface-2 text-muted rounded-md`, hover `bg-accent-soft text-foreground`.

## Background — ambient layer

`globals.css` defines a `.ambient` container mounted once in `layout.tsx`. It renders three fixed, blurred radial blobs that drift slowly via `transform` keyframes. `prefers-reduced-motion: reduce` disables the animation.

- Light mode: blobs use `mix-blend-mode: multiply` over warm off-white.
- Dark mode: blobs use `mix-blend-mode: screen` over deep navy.

**Don't** add per-page backgrounds or new gradient layers. The ambient layer is global and is the only motion in the design.

## Radii

- `rounded-2xl` for cards and panels (`--radius-card` token = 1rem).
- `rounded-full` for buttons, pills, dots, and any small interactive element (`--radius-pill`).

## Shadows

| Token            | Use                                       |
| ---------------- | ----------------------------------------- |
| `shadow-card`    | Default card surface.                     |
| `shadow-elevated`| Hover state on cards, dropdowns, modals.  |

## Motion

- Use Tailwind transitions for color/transform/translate/opacity only. No `transition-all` unless the element truly animates every property — prefer explicit lists.
- Ambient drift is the only global animation. Anything else (carousel scroll, framer-motion reveals) is per-component and must respect `prefers-reduced-motion`.
- Hover transforms: max `scale-[1.02]` or `translate-y-0.5` — never bigger.

## Component patterns

### Primary button (CTA, e.g. "Download CV", "Back to Home")

```tsx
className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

### Pill link / CTA card (e.g. "View GitHub featured projects →")

```tsx
className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm transition-all hover:border-accent/40 hover:bg-surface hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

Icon inside the pill: `text-muted` by default, `text-accent` on `group-hover`.

### Card (project, contact, stat)

```tsx
className="rounded-2xl border border-border/60 bg-surface/80 p-5 shadow-[var(--shadow-card)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
```

### Header / Footer (chrome)

- Header: `sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/50`
- Footer: `border-t border-border/60 bg-surface-2/40 backdrop-blur-sm`

### Pill / badge (language, topic, live demo)

```tsx
className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted"
```

Hover variants swap to `bg-accent-soft text-foreground`.

## Typography

Inherits Geist (Geist Sans + Geist Mono) from `next/font/google`. No custom font sizes; use Tailwind defaults (`text-sm`, `text-base`, `text-xl`, `text-2xl`, etc.).

## Do / Don't

- **Do** use token utilities (`bg-surface`, `text-muted`, `border-border/60`).
- **Do** include `focus-visible:ring-2 focus-visible:ring-ring` on every interactive element.
- **Do** keep the ambient background layer — it is the design.
- **Don't** hardcode `gray-*`, `blue-*`, `dark:` colors in new components. If a token is missing, add it to `globals.css` first.
- **Don't** add a second accent color.
- **Don't** use `transition-all` on small elements with many properties.
- **Don't** use `border` at full opacity — always `border-border/60` or weaker.
