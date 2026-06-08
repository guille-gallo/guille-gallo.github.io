# Design system — Air

Source of truth. Token changes go in `src/app/globals.css`. Component patterns below are the only patterns — copy the class strings; don't reinvent.

## Tone

**Sky canvas, frosted glass.** The page sits on a deep blue sky background (`#426188`). Content surfaces are white (`#ffffff`) or haze-grey (`#f5f5f5`) panels floating over the sky. A single vivid blue (`#2b7fff`) is the only chromatic accent and is reserved for interactive elements — links, outlined CTAs, focus.

Imagery feels airy, sparse, and depth-driven. The dominant blue does the heavy lifting; everything else is monochromatic and quiet. Avoid drop shadows — depth comes from surface color and `backdrop-filter: blur(12px)`.

## Color tokens

| Token            | Value     | Role                                                    |
| ---------------- | --------- | ------------------------------------------------------- |
| `sky-canvas`     | `#426188` | Page background. The dominant surface.                  |
| `action-blue`    | `#2b7fff` | Single accent. Links, outlined CTAs, focus rings only.  |
| `midnight-ink`   | `#000000` | Primary text on light surfaces; selected borders.       |
| `cloud-white`    | `#ffffff` | Primary card/header surface. White text on sky.         |
| `charcoal-text`  | `#1b1b1b` | Body text on light surfaces; nav ghost-button text.     |
| `haze-grey`      | `#f5f5f5` | Subtle card surface, input fields.                      |
| `surface`        | `#ffffff` | Primary UI surface (cards, header, modals).             |
| `surface-2`      | `#f5f5f5` | Subtle / input / less-prominent card.                   |
| `border`         | `rgba(0,0,0,0.1)` | Default hairline on light surfaces.            |
| `border-strong`  | `rgba(0,0,0,0.2)`  | Hover border.                              |
| `ring`           | `rgba(43,127,255,0.5)` | Focus ring.                           |
| `shadow-glass`   | `0 1px 2px rgba(0,0,0,0.05), 0 8px 24px -12px rgba(0,0,0,0.1)` | Glass surface lift. |

**Single accent only.** Do not introduce a second chromatic color. Body text must not sit directly on `sky-canvas` — use white/haze panels.

## Surfaces (elevation via color, not shadow)

| Level | Surface       | When                                                   |
| ----- | ------------- | ------------------------------------------------------ |
| 1     | `sky-canvas`  | Page background. The atmospheric base.                 |
| 2     | `haze-grey`   | Inputs, subtle feature cards, secondary surfaces.      |
| 3     | `cloud-white` | Primary cards, header, modals — clean contrast.        |
| Glass | `rgba(255,255,255,0.65)` + `backdrop-blur-xl` | Sticky header, modals, overlays over the sky. |

## Typography

Inherits Geist (Geist Sans + Geist Mono) from `next/font/google` as a substitute for the Inter system font. Use Tailwind defaults. We don't ship custom display fonts here — the spec's display/headline sizes are reserved for future content.

## Spacing & shapes

- Base unit: 4px. Use Tailwind's spacing scale (`p-5`, `gap-4`, `mb-12`).
- Card padding: 20px (`p-5`).
- Section gap: 48px (`mb-12` or larger).
- Element gap: 8px (`gap-2`).

### Radii

- Cards: `rounded-2xl` (14px on the system spec, Tailwind's `rounded-2xl` = 1rem = 16px — close enough).
- Buttons / links: `rounded-lg` (8px).
- Pills (CTAs, tags): `rounded-full`.

## Motion

- Use Tailwind transitions for color/transform/translate/opacity. No `transition-all` unless explicitly needed.
- Respect `prefers-reduced-motion`.

## Component patterns

### Card (project, contact, stat, project detail, sidebar nav)

```tsx
className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
```

The "transparent content card" variant (no bg) is also valid for grouping content where elevation is unnecessary:

```tsx
className="rounded-2xl p-5"
```

### Glass header / footer

```tsx
className="sticky top-0 z-50 w-full border-b border-border bg-white/65 backdrop-blur-xl"
// footer:
className="border-t border-border bg-white/65 backdrop-blur-xl"
```

Glass is the only place `backdrop-blur-*` is used.

### Primary CTA — outlined, not filled (e.g. "Download CV", 404, "View GitHub featured projects")

The Air spec explicitly uses **outlined primary buttons** with the action-blue accent. Filled buttons are reserved for the most emphatic moments (use sparingly).

```tsx
className="inline-flex items-center gap-2 rounded-lg border border-action-blue px-5 py-2.5 text-sm font-medium text-action-blue transition-colors hover:bg-action-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sky-canvas"
```

Variant: pill shape (use for the "View GitHub featured projects" CTA — matches its container/glass feel):

```tsx
className="group inline-flex items-center gap-2 rounded-full border border-action-blue px-4 py-2 text-sm font-medium text-action-blue transition-colors hover:bg-action-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sky-canvas"
```

### Ghost nav button (header navigation)

```tsx
className="rounded-lg px-3 py-2 text-sm font-medium text-charcoal-text transition-colors hover:bg-haze-grey"
```

### Pill / badge (language, topic, tag)

```tsx
className="rounded-md bg-haze-grey px-2 py-0.5 text-xs text-charcoal-text"
```

### Input field

Not used in this site currently, but when needed:

```tsx
className="rounded-md border border-border bg-haze-grey px-3 py-2 text-sm text-charcoal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
```

## Do / Don't

- **Do** use `sky-canvas` as the page bg. Always.
- **Do** put body text on white/haze surfaces, not directly on sky-canvas (contrast is too low).
- **Do** use `action-blue` exclusively for outlined interactive elements and focus.
- **Do** use `backdrop-blur-xl` only on glass chrome (header, modals).
- **Do** let surface color carry hierarchy. No drop shadows on cards.
- **Don't** introduce a second accent color.
- **Don't** place text on the sky canvas without a contrasting surface.
- **Don't** use filled colored buttons as the default CTA — the Air spec is outlined.
- **Don't** use warm tones (amber, copper, pink, peach).
