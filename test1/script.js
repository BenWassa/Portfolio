import { projectsData } from './project-descriptions.js';

class ProjectLoader {
  constructor(projectsData, containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

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
    this.projects.forEach(p => {
      const card = this._createCard(p);
      this.gallery.appendChild(card);
    });
  }

  _createCard(p) {
    const article = document.createElement('article');
    article.className = 'card group relative bg-slate-800/40 rounded-xl overflow-hidden shadow-lg border border-slate-700/50 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/40 hover:-translate-y-2 cursor-pointer';
    
    article.innerHTML = `
      <div class="thumb relative h-56 overflow-hidden">
        <img loading="lazy" src="${p.img}" alt="${p.alt}" class="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
      </div>
      <div class="p-6">
        <div class="flex items-center gap-3 mb-2">
            <span class="dot w-2.5 h-2.5 rounded-full ${this._getStatusColor(p.status)}"></span>
            <h3 class="title text-lg font-bold text-slate-200 uppercase tracking-wider">${p.title}</h3>
        </div>
        <p class="text-slate-400 text-sm font-light leading-relaxed">${p.desc.substring(0, 100)}...</p>
      </div>
    `;
    article.addEventListener('click', () => this._openModal(p));
    return article;
  }

  _getStatusColor(status) {
    switch (status) {
      case 'green': return 'bg-green-400';
      case 'yellow': return 'bg-yellow-400';
      case 'red': return 'bg-red-400';
      default: return 'bg-slate-500';
    }
  }

  _setupModal() {
    if (document.getElementById('project-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'project-modal';
    modal.className = 'fixed inset-0 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4 z-50 opacity-0 invisible transition-opacity duration-300';
    modal.innerHTML = `
      <div class="modal-content bg-slate-800/80 border border-slate-700 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col transform scale-95 transition-transform duration-300">
        <div class="modal-header relative">
          <img src="" alt="" class="w-full h-auto object-cover rounded-t-xl max-h-80">
          <button class="modal-close absolute top-4 right-4 text-slate-300 bg-slate-900/50 rounded-full p-2 hover:bg-slate-700/70 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="modal-body p-8 overflow-y-auto">
          <h2 class="modal-title text-3xl font-bold text-slate-100 mb-2"></h2>
          <p class="modal-desc text-slate-400 leading-relaxed mb-6"></p>
          <div class="modal-meta border-t border-slate-700 pt-6"></div>
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
      <span class="tag inline-block bg-blue-500/20 text-blue-300 text-sm font-medium px-4 py-1 rounded-full mr-4">${project.tag}</span>
      ${project.href ?
        `<a href="${project.href}" target="_blank" rel="noopener noreferrer" class="link inline-flex items-center text-green-400 hover:text-green-300 font-semibold transition-colors">Explore Project <span class="ml-2">&rarr;</span></a>` :
        `<span class="text-slate-500">Coming Soon</span>`
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

    document.getElementById('countNarrative').textContent = narrativeProjects.length;
    document.getElementById('countApps').textContent = appProjects.length;

    document.getElementById('viewNarrative').addEventListener('click', () => {
        document.getElementById('narrative-projects').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('viewApps').addEventListener('click', () => {
        document.getElementById('apps-projects').scrollIntoView({ behavior: 'smooth' });
    });

    const scrollToTopBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize Particles.js
    particlesJS('particles-js', {
        "particles": { "number": { "value": 50 }, "color": { "value": "#475569" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true }, "size": { "value": 2, "random": true }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out" } },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false } }, "modes": {} }, "retina_detect": true
    });
});