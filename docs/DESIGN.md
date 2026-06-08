# Design system

This is the source of truth. Token changes go in `src/app/globals.css`. The component patterns below are the only patterns — when you need a card, button, or panel, copy the class string and adjust content. Don't reinvent.

## Tone

**Warm, calm, barely-there.** The page should feel like the content is floating on the surface — panels are 97% transparent; structure is implied, not drawn. No color blobs, no gradients, no goo filters, no pink. Reference: the slidedude editor's slide-list sidebar (subtle dot-grid bg + barely-visible cards).

If it looks "decorative", we've gone too far. If a card has to be searched for, the design is working.

## Color tokens

Defined in `:root` of `globals.css`, exposed to Tailwind via `@theme inline`. Use the utility (`bg-surface`, `text-muted`, `border-border/60`) — never the raw `var()` in components.

| Token             | Light                    | Dark                      | Purpose                                  |
| ----------------- | ------------------------ | ------------------------- | ---------------------------------------- |
| `background`      | `#f5f2ec`                | `#0a0d12`                 | Page body. Warm cream / deep navy.       |
| `surface`         | `rgba(26,24,21,0.025)`   | `rgba(255,255,255,0.025)` | Panel background. ~97% transparent.      |
| `surface-2`       | `rgba(26,24,21,0.05)`    | `rgba(255,255,255,0.05)`  | Nested panel / pill background.          |
| `surface-glass`   | `rgba(255,255,255,0.65)` | `rgba(255,255,255,0.05)`  | True glass (header/footer). Blurs behind.|
| `foreground`      | `#1a1815`                | `#f0ede6`                 | Primary text.                            |
| `muted`           | `#6b6660`                | `#8b8478`                 | Secondary text, labels, icons.           |
| `border`          | `rgba(26,24,21,0.08)`    | `rgba(255,255,255,0.08)`  | Default hairline. Always 60% or less.    |
| `border-strong`   | `rgba(26,24,21,0.14)`    | `rgba(255,255,255,0.14)`  | Hover state on borders.                  |
| `accent`          | `#a87a4a`                | `#d4a574`                 | Warm amber. Single accent, sparingly.    |
| `accent-soft`     | amber 12%                | amber 18%                 | Hover well, focus well.                  |
| `ring`            | amber 40%                | amber 40%                 | Focus ring color.                        |

**Do not introduce a second accent. Do not use pink, peach, violet, or red.**

## Surface — the dot grid

A single `background-image` applied to the body — `radial-gradient(circle, var(--dot-color) 1px, transparent 1px)` at 24px spacing. On light, dots are warm-gray at ~12% alpha. On dark, white at ~6%.

This is the entire background treatment. **No gradients, no animated blobs, no filters.** The dot grid is static and is the only background image in the design.

## Surface rules

- **Panels (cards, list items, pills)**: `bg-surface` (3% alpha) + `border-border` (8% alpha). That's it. No shadow by default.
- **Hover**: `bg-surface-2` (5% alpha) + `border-border-strong` (14% alpha) + a small `-translate-y-0.5` lift. Still no shadow.
- **Glass (header, footer)**: `bg-surface-glass backdrop-blur-xl border-b border-border` (or `border-t` for footer). This is the only place backdrop-blur is used.
- **Active state**: a tint of `bg-accent-soft` is fine for selected nav tabs and active project pills.
- **Strong emphasis (download CV, 404 button)**: `bg-foreground text-background` solid pill. Only when you need a real CTA.

## Radii

- `rounded-2xl` for cards and panels (`--radius-card` token = 1rem).
- `rounded-full` for buttons, pills, dots, and any small interactive element.

## Shadows

There is one shadow: a very soft contact shadow used only on glass surfaces (header/footer). Panels don't get shadows — the border + bg tint is the structure. If you find yourself adding `shadow-*` to a card, stop.

## Motion

- Panels: hover only. `transition-colors`, `transition-transform`. No `transition-all`.
- Carousel scroll and framer-motion reveals are per-component. Respect `prefers-reduced-motion`.
- **There is no background motion.** The dot grid is static.

## Component patterns

Copy these. Don't re-derive.

### Panel (project card, contact item, stat card, project detail, sidebar nav item)

```tsx
className="rounded-2xl border border-border bg-surface p-5 transition-colors transition-transform hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-2"
```

That's the entire pattern. No shadow. No backdrop-blur. No special padding override.

### Glass header / footer

```tsx
className="sticky top-0 z-50 w-full border-b border-border bg-surface-glass backdrop-blur-xl"
// footer:
className="border-t border-border bg-surface-glass backdrop-blur-xl"
```

### Primary button (CTA — "Download CV", "Back to Home", 404)

Solid pill, only when you need a real CTA. Use sparingly.

```tsx
className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

### Pill link / CTA (e.g. "View GitHub featured projects →")

A transparent panel rendered as a pill, NOT a solid CTA. The icon shifts on hover.

```tsx
className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

Icons inside: `text-muted` by default, `text-accent` on `group-hover`.

### Pill / badge (language, topic, live demo, tag)

```tsx
className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted"
```

Hover variants swap to `bg-accent-soft text-foreground`.

## Typography

Inherits Geist (Geist Sans + Geist Mono) from `next/font/google`. No custom font sizes; use Tailwind defaults (`text-sm`, `text-base`, `text-xl`, `text-2xl`, etc.).

## Do / Don't

- **Do** use token utilities. `bg-surface`, `text-muted`, `border-border`, `bg-accent-soft`.
- **Do** use `border-border` directly — it already includes the 8% alpha. Don't write `border-border/60` on top.
- **Do** keep panels at 2–5% alpha. If the alpha is higher than 10%, the bg dot grid disappears under the card and we lose the "floating" effect.
- **Do** use the dot grid bg. It is the design.
- **Don't** add `backdrop-blur-*` to panels. Only header and footer.
- **Don't** add `shadow-*` to panels. Only the glass chrome may carry the soft contact shadow.
- **Don't** use `gray-*`, `blue-*`, `dark:` literals in new code. If a token is missing, add it to `globals.css` first.
- **Don't** introduce pink, peach, violet, or red. The palette is warm cream + amber.
- **Don't** add per-page backgrounds, gradients, or animated layers.
