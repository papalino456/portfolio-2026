# Design System

## Theme

Light dithered editorial: engineering print on bright paper, set as one continuous page. The world of high-grade technical documentation (Siemens manuals, wind-tunnel plates, patent drawings) rendered with ordered-dither halftone graphics. Monochrome ink on paper with one cobalt "second ink" used like a risograph spot color. Surfaces are flat; structure comes from hairline rules, typographic scale, and generous vertical rhythm, never shadows, boxes, or blur.

## Color Palette (OKLCH)

| Token | Value | Role |
|---|---|---|
| `--paper` | `oklch(0.985 0.002 258)` | Page background, faintly cooled toward the spot hue |
| `--ink` | `oklch(0.20 0 0)` | Body text, drawings, rules |
| `--ink-soft` | `oklch(0.42 0 0)` | Secondary text (≥ 4.5:1 on paper) |
| `--spot` | `oklch(0.55 0.17 258)` | Second ink: graphic accents, dither pixels, marks |
| `--spot-deep` | `oklch(0.46 0.15 258)` | Spot for text-level use (links, labels, ≥ 4.5:1) and the contact band surface |
| `--hairline` | `oklch(0.84 0.005 258)` | Rules and borders, 1px only |

Strategy: committed monochrome + one spot color. The cobalt appears in figures, metadata, and marks at roughly 10% of the surface, then owns the closing contact band (drenched) with paper-white text. No other hue exists on the page.

## Typography

| Role | Family | Notes |
|---|---|---|
| Display | Libre Caslon Text 400 | Large serif headlines. Letter-spacing −0.01em, never tighter than −0.04em. Clamp max ≤ 6rem. |
| Body / UI | Archivo (variable) | 400/500/600. Body 16–17px, line-height 1.6, max 70ch. |
| Data | Fragment Mono 400 | Spec tables, captions, figure numbers. 12–13px, uppercase only for ≤4-word labels. |

Scale ratio ≥ 1.25 between steps. `text-wrap: balance` on headings.

## Components

- **Band**: a full-width section on the continuous page, separated from the previous one by a single hairline rule and `clamp()` breathing room. Content centers to a 1200px measure inside each band.
- **Spec table**: two-column Fragment Mono rows separated by hairlines (label left, value right), as in equipment datasheets.
- **Figure**: dithered canvas graphic + mono caption (`FIG. 03 · OCCUPANCY GRID, 2D SLAM`) led by a small cobalt square. Figures are procedurally drawn (flow fields, lidar scans, linkages) and dithered with an ordered Bayer matrix.
- **Index row**: project and record list rows with serif title, mono metadata, hairline separators. No cards.
- **Hypertext word**: the hero headline's cobalt keyword ("intelligence"), dotted-underlined like a print hyperlink. Letters decode through scramble noise (magicui hyper-text style) through one full pass on load: vision → planning → control → learning → back to intelligence, then rest. Hover restarts the pass and loops it for as long as the pointer stays. Static under reduced motion; screen readers always get the stable word.

## Layout

Continuous single-column page of full-width bands; 12-col fluid grid inside each band, content max-width 1200px. Generous separations between bands (`clamp(4rem, 9vw, 7.5rem)`), tight internal groupings. Asymmetry is welcome: alternating figure/text columns, off-axis text blocks. No panel/sheet framing; the page itself is the sheet. The hero leads broadsheet-style: the display headline ("Engineering intelligence into machines.", clamp max 5.5rem) spans the full measure above a two-column row of sub-copy and the live figure.

## Motion

Mechanical and damped: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out), 300–700ms. Hero dither field animates continuously but slowly; scroll reveals are opacity/transform only and enhance already-visible content. Full `prefers-reduced-motion: reduce` support: animated fields freeze to a static frame, reveals become instant.

## Imagery Rules

All imagery is generated in-page on `<canvas>`: ordered-dither (Bayer 8×8) renderings of procedural scenes drawn from Sebastian's actual work (Kármán vortex flow, occupancy-grid SLAM, IK reachability fields, 4-DoF linkage drawings, single-line diagrams with detection boxes). Ink on paper with an optional cobalt pass. No stock photography, no hand-drawn-style SVG.
