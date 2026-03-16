# AGENTS.md

## Commands

```bash
npm run dev        # Start Vite dev server (port 5173)
npm run build      # TypeScript check + Vite production build (outputs to dist/)
npm run lint       # ESLint across all .ts/.tsx files
npm run preview    # Serve production build locally
```

There is no test runner configured. Verification is done via `build` (type-checking) and `lint`.

## Architecture

Single-page portfolio app built with **Vite 8 + React 19 + TypeScript 5.9**. Deployed to GitHub Pages at base path `/portfolio-2026/`.

### Data flow

All portfolio content (projects, timeline, skills, social links) lives in `src/data.ts` as exported constants. Components import from this single source of truth — there is no API, CMS, or build-time data fetching.

### Component structure

`App.tsx` renders a flat sequence of section components in order: `Nav → Hero → Work → Experience → Skills → Activity → Contact → Footer`. Each component has a co-located CSS Module (`ComponentName.module.css`). There are no shared/reusable UI components — each section is self-contained.

### Design language

The visual identity is a deliberate blend of three hardware/software design references:

- **FactoryAI** —  Modern, brutalist and minimalist design focused on clarity and professionalism. It uses clean typography, ample white space, and simple geometric icons to appeal to developers and engineering leaders. [factory.ai](https://factory.ai)
- **Teenage Engineering** — Industrial aluminum surfaces, monospace typography for labels and metadata, exposed-grid layouts, muted warm grays. Reference: [teenage.engineering/products/tx-6](https://teenage.engineering/products/tx-6)
- **Nothing** — Frosted glass panels with `backdrop-filter: blur()`, transparency layering, thin 1px borders on translucent surfaces, dot-grid patterns. Reference: [nothing.tech/products/phone-2a-plus](https://nothing.tech/products/phone-2a-plus)
- **Apple Liquid Glass (iOS 26)** — Generous whitespace, subtle depth through layered translucency, refined radius tokens, elegant serif display type contrasting with system sans-serif body text. Reference: [apple.com/ios](https://www.apple.com/ios/)

The contrast between `Instrument Serif` (warm, editorial) for headings and `Space Mono` (cold, industrial) for labels is intentional — it creates tension between the organic and mechanical. New components should maintain this duality and use the existing material classes (`.glass-panel`, `.aluminum-panel`) rather than inventing new surface treatments.

### Design system

Global tokens are defined as CSS custom properties in `src/index.css` (colors, typography scale, spacing, radii, transitions). Two material classes — `.glass-panel` (backdrop-filter blur) and `.aluminum-panel` / `.aluminum-panel-dark` (gradient backgrounds) — are applied as global utility classes, not through CSS Modules.

Three font families: `Instrument Serif` (display headings, loaded via Google Fonts in `index.html`), `Space Mono` (monospace labels), `Inter` (body text). The `@fontsource/*` packages in dependencies are installed but fonts are actually loaded via Google Fonts CDN links in `index.html`.

### Animations

All scroll-triggered animations use **Framer Motion** (`motion` components with `whileInView`). Random values (dot grid opacities in Hero, contribution levels in Activity) are pre-generated in `useMemo` to avoid React purity violations — do not use `Math.random()` in render.

## Conventions

- CSS Modules for component-scoped styles; global utility classes in `index.css`
- `as const` assertions on numeric tuple arrays passed to Framer Motion `ease` properties (required for type compatibility)
- Strict TypeScript: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax` are all enabled
- ESLint enforces `react-hooks` rules and `react-refresh` conventions — components must be pure
- Asset paths in data must include the base path prefix (`/portfolio-2026/`)
