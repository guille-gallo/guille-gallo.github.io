# Design system

Source of truth. Token changes go in `src/app/globals.css`. The component patterns below are the only patterns — copy the class strings; don't reinvent.

## Tone

**Neutral, calm, barely-there.** The page is monochrome: pure neutral grays and a single cool blue for the accent. No warm tones, no copper, no amber, no peach, no pink, no off-white cream — strictly neutral.

Panels are ~98% transparent. Structure is implied, not drawn. The dot grid is the only background decoration. Reference: the slidedude editor's slide-list sidebar.

If a panel has to be searched for, the design is working. If the bg looks "warm" or "creamy", we've gone too far.

## Color tokens

Defined in `:root` of `globals.css`, exposed to Tailwind via `@theme inline`. Use the utility (`bg-surface`, `text-muted`, `border-border`) — never the raw `var()` in components.

| Token             | Light                    | Dark                      | Purpose                                  |
| ----------------- | ------------------------ | ------------------------- | ---------------------------------------- |
| `background`      | `#f5f5f5`                | `#0a0a0a`                 | Page body. Pure neutral gray.            |
| `surface`         | `rgba(0,0,0,0.02)`       | `rgba(255,255,255,0.02)`  | Panel background. ~98% transparent.      |
| `surface-2`       | `rgba(0,0,0,0.045)`      | `rgba(255,255,255,0.045)` | Nested panel / pill background.          |
| `surface-glass`   | `rgba(255,255,255,0.7)`  | `rgba(10,10,10,0.65)`     | True glass (header/footer). Blurs behind.|
| `foreground`      | `#111111`                | `#ededed`                 | Primary text.                            |
| `muted`           | `#6b6b6b`                | `#8a8a8a`                 | Secondary text, labels, icons.           |
| `border`          | `rgba(0,0,0,0.08)`       | `rgba(255,255,255,0.08)`  | Default hairline.                        |
| `border-strong`   | `rgba(0,0,0,0.14)`       | `rgba(255,255,255,0.14)`  | Hover state on borders.                  |
| `accent`          | `#2563eb`                | `#60a5fa`                 | Cool blue. Single accent, sparingly.     |
| `accent-soft`     | blue 10%                 | blue 14%                  | Hover well, focus well.                  |
| `ring`            | blue 40%                 | blue 40%                  | Focus ring color.                        |

**No warm colors. No second accent. No pink, peach, amber, copper, or red.**

## Surface — the dot grid

A single `background-image` on the body — `radial-gradient(circle, var(--dot) 1px, transparent 1px)` at 24px spacing. On light, dots are black at ~10% alpha. On dark, white at ~6%.

Static. No animation, no gradients, no filters. The dot grid is the entire background treatment.

## Surface rules

- **Panels (cards, list items, pills)**: `bg-surface` (2% alpha) + `border-border` (8% alpha). No shadow.
- **Hover**: `bg-surface-2` (4.5% alpha) + `border-border-strong` (14% alpha) + small `-translate-y-0.5` lift. Still no shadow.
- **Glass (header, footer)**: `bg-surface-glass backdrop-blur-xl border-b border-border` (or `border-t` for footer). Only place backdrop-blur is used.
- **Active state**: `bg-accent-soft` tint for selected nav tabs and active project pills.
- **Strong emphasis (download CV, 404 button)**: `bg-foreground text-background` solid pill. Only when a real CTA is needed.

## Radii

- `rounded-2xl` for cards and panels.
- `rounded-full` for buttons, pills, dots, small interactive elements.

## Shadows

One shadow: a very soft contact shadow used only on glass surfaces (header/footer). Panels get no shadow.

## Motion

- Panels: hover only. `transition-colors`, `transition-transform`. No `transition-all`.
- Carousel scroll and framer-motion reveals are per-component. Respect `prefers-reduced-motion`.
- **No background motion.** The dot grid is static.

## Component patterns

### Panel (project card, contact item, stat card, project detail, sidebar nav)

```tsx
className="rounded-2xl border border-border bg-surface p-5 transition-colors transition-transform hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-2"
```

### Glass header / footer

```tsx
className="sticky top-0 z-50 w-full border-b border-border bg-surface-glass backdrop-blur-xl"
// footer:
className="border-t border-border bg-surface-glass backdrop-blur-xl"
```

### Primary button (CTA — "Download CV", "Back to Home", 404)

```tsx
className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

### Pill link / CTA (e.g. "View GitHub featured projects →")

```tsx
className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

Icons inside: `text-muted` by default, `text-accent` on `group-hover`.

### Pill / badge (language, topic, tag)

```tsx
className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted"
```

Hover variants swap to `bg-accent-soft text-foreground`.

## Typography

Inherits Geist (Geist Sans + Geist Mono) from `next/font/google`. No custom font sizes; use Tailwind defaults.

## Do / Don't

- **Do** use token utilities.
- **Do** keep panels at 2–5% alpha. If the alpha is higher than 10%, the dot grid disappears under the card and we lose the "floating" effect.
- **Don't** add `backdrop-blur-*` to panels. Only header and footer.
- **Don't** add `shadow-*` to panels. Only the glass chrome may carry the soft contact shadow.
- **Don't** use `gray-*`, `blue-*`, `dark:` literals in new code (the Tailwind `blue-*` etc. are fine for the *one* accent if you really need an arbitrary shade, but prefer `bg-accent-soft`).
- **Don't** introduce warm tones. The palette is strictly neutral gray + a single cool blue accent.
- **Don't** add per-page backgrounds, gradients, or animated layers.
