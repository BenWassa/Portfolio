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