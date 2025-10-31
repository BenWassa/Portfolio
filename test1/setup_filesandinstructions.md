Here is the refactored code for your portfolio website:

### `index.html`

The HTML structure remains largely the same, but the `class` attributes have been updated with Tailwind CSS utility classes for a more maintainable and scalable design.

```html
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio of Benjamin P. Haddon</title>
    <meta name="description" content="Projects at the intersection of research, storytelling, and technology. A clean, circular-scrolling portfolio by Benjamin P. Haddon." />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Corinthia:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap" rel="stylesheet">
</head>
<body class="bg-gray-900 text-gray-100 font-sans antialiased">

    <div id="particles" class="fixed inset-0 z-0"></div>

    <main class="relative z-10">

        <section id="hero" class="min-h-screen flex items-center justify-center text-center px-4">
            <div class="max-w-4xl">
                <div class="eyebrow text-blue-400 uppercase tracking-widest text-sm font-semibold mb-4">Portfolio of Benjamin P. Haddon</div>
                <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-gray-100 to-blue-400 text-transparent bg-clip-text">Projects at the Intersection of Research, Storytelling, and Technology</h1>
                <p class="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                    Each project emerges from a deep curiosity about how stories shape understanding, how technology can serve wisdom rather than distraction, and how rigorous research might find its way into lived experience. These are experiments in meaning-making prototypes that bridge ancient insights with contemporary tools, transforming abstract concepts into tangible, interactive frameworks for growth and reflection.
                </p>
                <div class="hero-actions flex flex-col md:flex-row items-center justify-center gap-4">
                    <button id="viewNarrative" class="cta-btn group relative inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 w-full md:w-auto">
                        <span class="cta-label">Narrative Research</span>
                        <span id="countNarrative" class="cta-badge ml-2 inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-500 text-white rounded-full"></span>
                    </button>
                    <button id="viewApps" class="cta-btn group relative inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 w-full md:w-auto">
                        <span class="cta-label">Tools & PWAs</span>
                        <span id="countApps" class="cta-badge ml-2 inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded-full"></span>
                    </button>
                </div>
            </div>
        </section>

        <section id="narrative-projects" class="py-20 px-4">
            <div class="container mx-auto">
                <h2 class="section-title text-3xl md:text-4xl font-bold text-center mb-4 text-blue-400">Narrative Research Sites</h2>
                <p class="sub text-center text-gray-400 mb-12 max-w-2xl mx-auto">Exploring meaning, myth, and psychology through digital storytelling.</p>
                <div id="project-gallery-container-narrative" class="project-gallery-container">
                    <div class="project-gallery grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    </div>
                </div>
            </div>
        </section>

        <section id="apps-projects" class="py-20 px-4">
            <div class="container mx-auto">
                <h2 class="section-title text-3xl md:text-4xl font-bold text-center mb-4 text-green-400">Interactive Tools & PWAs</h2>
                <p class="sub text-center text-gray-400 mb-12 max-w-2xl mx-auto">Lightweight, offline-first tools for reflection, growth, and performance.</p>
                <div id="project-gallery-container-apps" class="project-gallery-container">
                    <div class="project-gallery grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    </div>
                </div>
            </div>
        </section>

    </main>

    <footer class="foot text-center py-8 px-4 border-t border-gray-800">
        <div class="signature-line mb-2">
            <a class="author-name text-blue-400 text-2xl font-serif" href="license.html" style="font-family: 'Corinthia', cursive;">Benjamin P. Haddon</a>
        </div>
        <div class="tagline text-sm text-gray-500 uppercase tracking-wider">
            Enhanced Portfolio Experience
        </div>
        <div class="copyright-line text-xs text-gray-600 mt-2">
            &copy; <span id="year"></span> All rights reserved
        </div>
    </footer>

    <button id="scrollToTop" class="scroll-to-top fixed bottom-8 right-8 bg-white text-gray-900 w-12 h-12 rounded-full shadow-lg flex items-center justify-center opacity-0 invisible transition-all duration-300">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
    </button>

    <script type="module" src="script.js"></script>
</body>
</html>
```

### `tailwind.config.js`

This new file configures Tailwind CSS. We can define our color palette, fonts, and other design tokens here to maintain a consistent aesthetic.

```javascript
module.exports = {
  content: [
    './index.html',
    './script.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          '900': '#0b0d12',
          '800': '#141924',
          '700': '#1a2233',
          '600': '#5a6b7a',
          '400': '#9aa3b2',
          '100': '#e8eaef',
        },
        blue: {
          '400': '#3b82f6',
        },
        green: {
            '400': '#2dd4bf',
            '500': '#10b981'
        },
        yellow: {
            '400': '#f59e0b'
        },
        red: {
            '400': '#ef4444'
        }
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', '"Helvetica Neue"', 'Arial'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}```

### `styles.css`

This file is now much simpler. It primarily serves to import the Tailwind CSS base styles, components, and utilities.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: #3b82f6;
    border-radius: 50%;
    animation: float 8s infinite ease-in-out;
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
    25% { transform: translateY(-20px) rotate(90deg); opacity: 0.7; }
    50% { transform: translateY(-40px) rotate(180deg); opacity: 0.4; }
    75% { transform: translateY(-20px) rotate(270deg); opacity: 0.6; }
}
```

### `script.js`

The JavaScript has been updated to generate the project cards and modals with the new Tailwind CSS classes. The core logic of the `ProjectLoader` class remains intact.

```javascript
import { projectsData } from './project-descriptions.js';

class ProjectLoader {
  constructor(projectsData, containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with id "${containerId}" not found.`);
      return;
    }

    this.gallery = this.container.querySelector('.project-gallery');
    this.projects = projectsData;
    this._initialize();
  }

  _initialize() {
    this._buildGallery();
    this._setupModal();
  }

  _buildGallery() {
    this.gallery.innerHTML = '';
    this.projects.forEach((p, i) => {
      const card = this._createCard(p, i);
      this.gallery.appendChild(card);
    });
  }

  _createCard(p, index) {
    const article = document.createElement('article');
    article.className = 'card bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer';
    article.innerHTML = `
      <div class="thumb relative h-48">
        <img loading="lazy" src="${p.img}" alt="${p.alt}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div class="p-6">
        <div class="flex items-center mb-2">
            <span class="dot w-3 h-3 rounded-full mr-2 ${this._getStatusColor(p.status)}"></span>
            <h3 class="title text-xl font-bold uppercase tracking-wider">${p.title}</h3>
        </div>
        <p class="text-gray-400 text-sm">${p.desc.substring(0, 100)}...</p>
      </div>
    `;
    article.addEventListener('click', () => this._openModal(p));
    return article;
  }

  _getStatusColor(status) {
    switch (status) {
        case 'green': return 'bg-green-500';
        case 'yellow': return 'bg-yellow-400';
        case 'red': return 'bg-red-400';
        default: return 'bg-gray-500';
    }
  }

  _setupModal() {
    const modal = document.createElement('div');
    modal.id = 'project-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 opacity-0 invisible transition-opacity duration-300';
    modal.innerHTML = `
      <div class="modal-content bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-full overflow-y-auto transform scale-95 transition-transform duration-300">
        <div class="modal-header relative">
          <img src="" alt="" class="w-full h-auto rounded-t-lg">
          <button class="modal-close absolute top-4 right-4 text-white bg-gray-900 rounded-full p-2 hover:bg-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="modal-body p-8">
          <h2 class="modal-title text-3xl font-bold mb-2"></h2>
          <p class="modal-desc text-gray-400 mb-6"></p>
          <div class="modal-meta"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    this.modal = modal;

    modal.addEventListener('click', (e) => {
      if (e.target === modal) this._closeModal();
    });
    modal.querySelector('.modal-close').addEventListener('click', () => this._closeModal());
  }

  _openModal(project) {
    this.modal.querySelector('img').src = project.img;
    this.modal.querySelector('img').alt = project.alt;
    this.modal.querySelector('.modal-title').textContent = project.title;
    this.modal.querySelector('.modal-desc').textContent = project.desc;

    const metaContainer = this.modal.querySelector('.modal-meta');
    metaContainer.innerHTML = `
      <span class="tag inline-block bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full mr-2">${project.tag}</span>
      ${project.href ?
        `<a href="${project.href}" target="_blank" rel="noopener noreferrer" class="link inline-block mt-4 text-green-400 hover:text-green-300 font-semibold">Explore Project &rarr;</a>` :
        `<span class="inline-block mt-4 text-gray-500">Coming Soon</span>`
      }
    `;

    this.modal.classList.remove('invisible', 'opacity-0');
    this.modal.querySelector('.modal-content').classList.remove('scale-95');
    document.body.style.overflow = 'hidden';
  }

  _closeModal() {
    this.modal.classList.add('opacity-0');
    this.modal.querySelector('.modal-content').classList.add('scale-95');
    setTimeout(() => {
        this.modal.classList.add('invisible');
    }, 300);
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const narrativeProjects = projectsData.filter(p => p.type === 'narrative');
    const appProjects = projectsData.filter(p => p.type === 'app');

    new ProjectLoader(narrativeProjects, 'project-gallery-container-narrative');
    new ProjectLoader(appProjects, 'project-gallery-container-apps');

    document.getElementById('year').textContent = new Date().getFullYear();

    const viewNarrativeBtn = document.getElementById('viewNarrative');
    const viewAppsBtn = document.getElementById('viewApps');
    document.getElementById('countNarrative').textContent = narrativeProjects.length;
    document.getElementById('countApps').textContent = appProjects.length;

    const scrollToTopBtn = document.getElementById('scrollToTop');

    viewNarrativeBtn.addEventListener('click', () => {
        document.getElementById('narrative-projects').scrollIntoView({ behavior: 'smooth' });
    });

    viewAppsBtn.addEventListener('click', () => {
        document.getElementById('apps-projects').scrollIntoView({ behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'invisible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (8 + Math.random() * 4) + 's';
      document.getElementById('particles').appendChild(particle);
    }
});
```

### How to Set Up the Project

1.  **Initialize a Node.js project:**
    ```bash
    npm init -y
    ```

2.  **Install Tailwind CSS and its dependencies:**
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    ```

3.  **Create the Tailwind CSS configuration file:**
    ```bash
    npx tailwindcss init
    ```
    This will create the `tailwind.config.js` file. Copy the content from the example above into this file.

4.  **Create a `postcss.config.js` file:**
    ```javascript
    module.exports = {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    }
    ```

5.  **Add a build script to your `package.json`:**
    ```json
    "scripts": {
      "build": "tailwindcss -i ./styles.css -o ./dist/styles.css --watch"
    }
    ```

6.  **Create the `styles.css` file** with the `@tailwind` directives as shown above.

7.  **Run the build script:**
    ```bash
    npm run build
    ```

8.  **Link the compiled CSS in your `index.html`:**
    Make sure your `<link>` tag in `index.html` points to the compiled CSS file:
    ```html
    <link rel="stylesheet" href="dist/styles.css">
    ```
