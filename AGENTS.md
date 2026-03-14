# Sebastian Barrio Portfolio 2026

## Project Overview

This is a personal portfolio website for Sebastian Barrio, a Mechatronics and Software Engineer specializing in Robotics and AI. The site follows a "Steel & Silicon" design aesthetic — a dark, terminal-inspired HUD (Heads-Up Display) interface with electric blue accents and monospace typography.

The portfolio is built as a single-page application (SPA) showcasing professional experience, technical skills, GitHub activity, and robotics/AI projects.

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 15.1.0 |
| Language | TypeScript | 5.x |
| React | React / React DOM | 19.0.0 |
| Styling | Tailwind CSS | 3.4.19 |
| Icons | Lucide React | 0.468.0 |
| Animations | Framer Motion | 11.15.0 |
| GitHub Widget | react-github-calendar | 5.0.5 |
| Build Output | Static Export | - |

## Project Structure

```
portfolio-2026/
├── src/
│   └── app/                     # Next.js App Router
│       ├── components/
│       │   └── GitHubActivity.tsx    # GitHub contribution graph component
│       ├── globals.css              # Tailwind directives + global styles
│       ├── layout.tsx               # Root layout with metadata
│       └── page.tsx                 # Main portfolio page (SPA)
├── public/
│   └── projects/               # Static project images
│       ├── agv.png
│       ├── ciencia.jpg
│       ├── isa.png
│       ├── robomop.png
│       ├── robotarm.png
│       └── robotarm_draw.png
├── scripts/
│   └── monitor_deploy.sh       # GitHub Actions deployment monitor
├── .github/workflows/
│   └── deploy.yml              # CI/CD pipeline for GitHub Pages
├── next.config.mjs             # Next.js config (static export, basePath)
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Build and Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (static export)
npm run build

# Start production server (for testing)
npm run start

# Run ESLint
npm run lint
```

## Deployment Configuration

### GitHub Pages Deployment

The project is automatically deployed to GitHub Pages via GitHub Actions:

- **Trigger**: Push to `master` branch or manual workflow dispatch
- **Workflow**: `.github/workflows/deploy.yml`
- **Node Version**: 20
- **Output Directory**: `./out`

### Next.js Configuration

The `next.config.mjs` is configured for static export:

```javascript
{
  output: 'export',           // Static HTML export
  images: {
    unoptimized: true,        // Required for static export
  },
  basePath: '/portfolio-2026', // GitHub Pages repository path
}
```

### Monitoring Deployment

Use the provided script to monitor deployment status:

```bash
# Requires GitHub CLI (gh) authentication
bash scripts/monitor_deploy.sh
```

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0a0a0a` | Page background |
| Foreground | `#d4d4d4` | Primary text |
| Border | `#1f1f1f` | Card borders, dividers |
| Accent | `#3b82f6` (blue-500) | Links, highlights, CTAs |
| Muted | `#666` | Secondary text |

### Typography

- **Primary Font**: System monospace stack (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`)
- **Style**: Uppercase tracking for labels and navigation

### Layout Sections

The single-page portfolio includes:

1. **HUD Header** - Sticky navigation with system status indicator
2. **Hero Section** - Main headline and CTAs
3. **System Stats** - 3-column dashboard grid (Compute, Neural, Physical)
4. **GitHub Activity** - Contribution graph with custom "Steel & Silicon" theme
5. **Tech Stack** - Skill radar grids + technology constellation visualization
6. **Timeline** - Work history and education trajectory
7. **Projects** - 4 featured repositories with image previews
8. **Terminal Log** - Session log component with scrollable activity feed
9. **Footer** - System version info

## Key Dependencies Notes

### Tailwind CSS Configuration

The project uses Tailwind CSS v3.4.19 with content paths configured for the App Router:

```typescript
content: [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
]
```

### GitHub Activity Component

The `GitHubActivity` component uses `react-github-calendar` with a custom theme matching the Steel & Silicon aesthetic:

```typescript
const customTheme = {
  dark: ['#0a0a0a', '#1f1f1f', '#333333', '#3b82f6', '#60a5fa'],
};
```

## Git Ignored Files

```
node_modules/
.next/
out/
build/
.env*
npm-debug.log*
yarn-*.log
.DS_Store
.vscode/
```

## External Links

- **Live Site**: https://papalino456.github.io/portfolio-2026/
- **GitHub Profile**: https://github.com/papalino456
- **Masters Dashboard**: Referenced at `/masters-research-2027` (separate page)

## Development Notes

1. **Strict TypeScript is disabled** (`"strict": false` in tsconfig.json) - the project uses a lenient TypeScript configuration
2. **Images are unoptimized** - Required for static export; all images in `public/` are served as-is
3. **Client Components**: The main page and GitHubActivity component use `'use client'` directive for React hooks
4. **No Tests**: The project does not include a testing framework
5. **No ESLint Config**: Uses Next.js built-in ESLint configuration

## File Paths Reference

When adding new project images, place them in:
```
public/projects/<filename>.png
```

And reference them in the page component as:
```typescript
src="/portfolio-2026/projects/<filename>.png"
```

The `basePath` configuration requires all static assets to include the `/portfolio-2026` prefix.
