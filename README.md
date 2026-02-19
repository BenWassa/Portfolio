# Portfolio - Benjamin P. Haddon

Production-ready portfolio showcasing three throughlines: **Narrative** (mythic frameworks), **Systems** (Progressive Web Apps), and **Psyche** (psychological interfaces).

## Live Site

https://benwassa.github.io/Portfolio/

Built with React, TypeScript, Vite, and Tailwind CSS.

## Project Structure

```
src/
├── index.html                   # Vite HTML entry
├── main.tsx                     # React entry
├── App.tsx                      # App shell
├── components/                  # UI components
├── css/input.css                # Tailwind input CSS
├── data/projects.ts             # Typed data helpers
├── hooks/                       # Custom hooks
├── js/project-descriptions.ts   # Project data & descriptions
├── types.ts                     # Shared types
└── public/                      # Static assets (images, etc.)

docs/
├── index.html                   # Built HTML
└── assets/                      # Built assets
```

## Setup & Development

### Install Dependencies

```bash
npm install
```

### Development Mode

Watch for changes and serve locally:

```bash
npm run dev
```

- Vite dev server runs on `http://localhost:5173`
- Changes rebuild automatically

### Production Build

Generate optimized assets:

```bash
npm run build
```

- Builds optimized assets to `docs/`
- Ready for deployment

### Deploy

Push built files to GitHub Pages:

```bash
npm run deploy
```

The `docs/` folder is ready for static hosting.

## Features

✨ **Three-Pillar Interface**
- Narrative (mythic storytelling projects)
- Systems (digital tools & PWAs)
- Psyche (psychological explorations)

🎨 **Premium Design**
- Dark theme with accent colors per project
- Responsive (mobile → desktop)
- Smooth animations & transitions
- Modal detail views

⌨️ **Interactions**
- Click pillars to expand and explore
- ESC to close modal or reset view
- Keyboard support throughout
- Print-friendly export

🔧 **Developer-Friendly**
- Centralized project data layer
- Typed project metadata and props
- React components with reusable structure
- Utility-first CSS (Tailwind)

🚀 **Performance Optimized**
- Lazy loading for below-the-fold images
- Eager loading for above-the-fold content (modals)
- Progressive skeleton loaders with shimmer effects
- Async image decoding (non-blocking)
- Blur-up placeholder transitions
- Infrastructure ready for responsive images (srcset/sizes)

## Projects

### Narrative Throughline
- **Skywalker** - Mythic companion using Luke's journey for self-discovery
- **Sankofa** - Modern meaning crisis framework blending myth & research
- **Agoge** - Rites of passage research for authentic initiation
- **Dukkha** - Dopamine as cultural force; field guide & manifesto

### Systems Throughline
- **drop** - Mindful daily tracker (Sleep, Fitness, Mind, Spirit)
- **STARK** - Fitness data visualization & performance dashboard
- **Vox** - Offline-first language learning tracker

### Psyche Throughline
- **Orpheus** - Music listening patterns → emotional self-discovery
- **Dukkha** - (also crosses into narrative)

## Technology

- **HTML5** - Semantic structure
- **Tailwind CSS** - Utility-first, compiled to production-optimized CSS
- **React + TypeScript** - Component-based UI with type safety
- **PostCSS** - Autoprefixing & processing
- **GitHub Pages** - Static hosting from `docs/` folder

### Image Optimization

The portfolio includes comprehensive image loading optimizations:

- **Custom Hooks**: `useImageLoading` hook manages intersection observer and loading states
- **Utility Functions**: `imageUtils.ts` provides responsive image props and preloading
- **Skeleton Loaders**: Progressive reveal with shimmer animations during load
- **Smart Loading**: Lazy loading for cards, eager loading for modals
- **Async Decoding**: Non-blocking image decode with `decoding="async"`
- **Future-Ready**: Infrastructure for srcset/sizes when responsive images are generated

See `docs/IMAGE_OPTIMIZATION.md` for detailed implementation and best practices.

## Configuration

### Update Projects

Edit `src/js/project-descriptions.ts`:

```javascript
{
  title: "Project Name",
  tag: "Category",
  desc: "Short description for card",
  href: "https://...",
  img: "ProjectName.png",
  theme: {
    primary: "#3B82F6",      // Accent color on hover
    secondary: "#1F2937",
    tertiary: "#151720",
    bg: "#0A0B14"
  },
  status: "active",           // active | draft | prototype
  type: "narrative"          // narrative | app | psychology
}
```

### Keep Portfolio + LLM Contexts In Sync

Store project context files in `llm-project-contexts/` using the template:
- `llm-project-contexts/LLM_PROJECT_CONTEXT_TEMPLATE.md`

Run sync checks after updating projects or context docs:

```bash
npm run context:check
```

Strict mode (requires a context file for every portfolio project):

```bash
npm run context:check:all
```

The check validates:
- Context project names map to real portfolio projects.
- `Production app` links in context files match `href` in `src/js/project-descriptions.ts`.
- Required context sections exist.

### Multi-Repo LLM Context Rollout

Inventory file:
- `llm-project-contexts/repo-rollout.csv`

First pass dry run:

```bash
npm run context:rollout:dry
```

Execute first pass (clone missing repos, prefill `LLM_CONTEXT.md`, commit/push enabled where `commit_enabled=yes`):

```bash
npm run context:rollout:first
```

Validate first pass repos:

```bash
npm run context:validate:first
```

Optional edge-case generation pass (no commit by default):

```bash
npm run context:rollout:edge
```

### Project Statuses

Projects are categorized by development status, displayed as colored badges in the portfolio:

- **Active** (green): Fully developed, live projects with complete functionality
- **Draft** (yellow): Narrative projects in draft or development phase
- **Prototype** (red): Application/system projects in prototype or development phase

Status affects sorting order (Active first, then Draft, then Prototype) and visual presentation.

For commission/project management (in `commissions/` folder), separate statuses are used:

- **Not started**: Project planning phase, no assets verified
- **In progress**: Assets being audited or generated
- **Completed**: All required assets present and verified

Edit `tailwind.config.js`:
- Font families (Space Grotesk, Inter, Cormorant Garamond)
- Colors & spacing
- Animation timings

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT

## Contact

Benjamin P. Haddon - https://benwassa.github.io/
- Reuse or redistribution requires prior written permission. See `docs/LICENSE.md` for details and the permission request process.
