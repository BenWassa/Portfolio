# Portfolio - Benjamin P. Haddon

Production-ready portfolio showcasing three throughlines: **Narrative** (mythic frameworks), **Systems** (Progressive Web Apps), and **Psyche** (psychological interfaces).

## Live Site

https://benwassa.github.io/Portfolio/

Built with Tailwind CSS, vanilla JavaScript (ES6 modules), and optimized for production.

## Project Structure

```
src/
├── html/index.html              # Main HTML template
├── css/input.css                # Tailwind input CSS (compiled → docs/)
├── js/
│   ├── app.js                   # Application logic & interactions
│   └── project-descriptions.js  # Project data & metadata
└── public/                      # Static assets (images, etc.)

docs/
├── index.html                   # Built HTML
├── css/output.css               # Minified Tailwind CSS
└── js/                          # Built JavaScript
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

- Tailwind CSS compiler runs in watch mode
- Local server starts on `http://localhost:8080`
- Changes rebuild automatically

### Production Build

Generate optimized assets:

```bash
npm run build
```

- Minifies Tailwind CSS
- Copies assets to `docs/`
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
- Dynamic theme colors from metadata
- ES6 modules with clean separation
- Utility-first CSS (Tailwind)

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
- **Vanilla JavaScript** - ES6 modules, no frameworks
- **PostCSS** - Autoprefixing & processing
- **GitHub Pages** - Static hosting from `docs/` folder

## Configuration

### Update Projects

Edit `src/js/project-descriptions.js`:

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
  status: "green",           // green | yellow | red
  type: "narrative"          // narrative | app
}
```

### Customize Theme

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
