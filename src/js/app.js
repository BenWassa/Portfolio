import '../css/input.css';
import { projectsData, projectDescriptions } from './project-descriptions.ts';

const DEBUG = false;
const logger = window.console;
const log = (...args) => {
  if (DEBUG) logger.log(...args);
};
const warn = (...args) => {
  if (DEBUG) logger.warn(...args);
};
const error = (...args) => {
  if (DEBUG) logger.error(...args);
};

// Version tracking
const APP_VERSION = '1.2.0';
log(
  `%c📱 Portfolio App v${APP_VERSION} loaded`,
  'color: #d4af37; font-weight: bold; font-size: 14px;',
);
log(`📍 Built at: ${new Date().toLocaleString()}`);

// Cache busting: Force refresh if version changes
if (typeof window !== 'undefined' && window.localStorage) {
  const cachedVersion = window.localStorage.getItem('portfolio_version');
  if (cachedVersion && cachedVersion !== APP_VERSION) {
    warn(
      `⚠️  Version change detected (${cachedVersion} → ${APP_VERSION}). Clearing cache...`,
    );
    // Clear old caches if available
    if ('caches' in window) {
      window.caches.keys().then((names) => {
        names.forEach((name) => {
          log(`🗑️  Clearing cache: ${name}`);
          window.caches.delete(name);
        });
      });
    }
  }
  window.localStorage.setItem('portfolio_version', APP_VERSION);
}

// Organize projects by type
const projects = {
  narrative: projectsData.filter((p) => p.type === 'narrative'),
  pwa: projectsData.filter((p) => p.type === 'app'),
  psych: projectsData.filter((p) => p.type === 'psychology'),
};

// State
let activePillarId = null;

// Sort projects by status
const statusOrder = { active: 1, draft: 2, prototype: 3 };
Object.keys(projects).forEach((key) => {
  projects[key].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
});

// Initialize
function init() {
  log('🚀 Initializing app...');

  // Diagnostic: Check if CSS is loaded
  const sampleCard = document.querySelector('.project-card');
  if (sampleCard) {
    const computedStyle = window.getComputedStyle(sampleCard);
    const minHeight = computedStyle.minHeight;
    log(`✅ CSS loaded. Card min-height: ${minHeight}`);
  }

  renderList('narrative', projects.narrative);
  renderList('pwa', projects.pwa);
  renderList('psych', projects.psych);

  log('✅ App initialization complete');
}

function renderList(key, items) {
  const container = document.getElementById(`list-${key}`);

  if (!container) {
    error(`❌ Container not found for key: ${key}`);
    return;
  }

  log(`📦 Rendering ${items.length} items for "${key}"`);

  items.forEach((item, _index) => {
    const card = document.createElement('div');
    card.className = 'project-card group';
    card.setAttribute('data-type', item.type);
    // Set the CSS variable for the accent color
    card.style.setProperty('--accent-color', item.theme.primary);

    // Determine Status Color & Label
    let statusColorClass = 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    let statusLabel = 'Unknown';

    if (item.status === 'active') {
      statusColorClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      statusLabel = 'Active';
    } else if (item.status === 'draft') {
      statusColorClass = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      statusLabel = 'Draft';
    } else if (item.status === 'prototype') {
      statusColorClass = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      statusLabel = 'Prototype';
    }

    card.innerHTML = `
      <div class="project-card__media">
        <img src="${item.img}" 
             onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden'); this.nextElementSibling.classList.add('flex');"
             class="project-card__img" 
             alt="${item.alt}"
             loading="lazy">
        
        <div class="hidden absolute inset-0 items-center justify-center bg-zinc-900 border-b border-white/5">
            <span class="text-white/20 font-display font-bold uppercase tracking-widest text-lg">${item.title}</span>
        </div>
      </div>

      <div class="project-card__content">
        <div class="project-card__meta">
          <span class="project-card__tag">${item.tag}</span>
          <div class="flex items-center gap-2 px-2 py-1 rounded-sm border ${statusColorClass}">
            <div class="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]"></div>
            <span class="text-[10px] font-mono uppercase tracking-wider font-bold">${statusLabel}</span>
          </div>
        </div>
        
        <h4 class="project-card__title">${item.title}</h4>
        <p class="project-card__desc">${item.desc}</p>
        
        <div class="project-card__cta mt-auto pt-5 flex items-center text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
          <span class="mr-2">View Details</span>
          <span class="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
        </div>
      </div>
    `;

    // Mouse Move Effect for the "Flashlight" gradient
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      card.style.setProperty('--mouse-x', `${x}px`);
    });

    card.onclick = (e) => {
      e.stopPropagation();
      window.openModal(item);
    };

    container.appendChild(card);
  });
}

// Pillar Interaction
window.activatePillar = function (id) {
  if (activePillarId === id) return;

  const container = document.querySelector('.pillar-container');
  container.classList.add('has-active');

  const pillars = document.querySelectorAll('.pillar');
  const target = document.getElementById(`pillar-${id}`);
  const closeBtn = document.getElementById('close-btn');

  pillars.forEach((p) => {
    if (p === target) {
      p.classList.remove('inactive');
      p.classList.add('active');
      p.setAttribute('aria-expanded', 'true');
    } else {
      p.classList.remove('active');
      p.classList.add('inactive');
      p.setAttribute('aria-expanded', 'false');
    }
  });

  activePillarId = id;

  closeBtn.classList.remove('hidden');
  setTimeout(() => closeBtn.classList.remove('opacity-0'), 100);
};

window.resetView = function () {
  if (!activePillarId) return;

  const container = document.querySelector('.pillar-container');
  container.classList.remove('has-active');

  const pillars = document.querySelectorAll('.pillar');
  const closeBtn = document.getElementById('close-btn');

  pillars.forEach((p) => {
    p.classList.remove('active', 'inactive');
    p.setAttribute('aria-expanded', 'false');
  });

  activePillarId = null;

  closeBtn.classList.add('opacity-0');
  setTimeout(() => closeBtn.classList.add('hidden'), 300);
};

// Modal Logic
const modal = document.getElementById('modal');

window.openModal = function (item) {
  const projectKey = item.title.toLowerCase();
  const fullDesc = projectDescriptions[projectKey]?.full || item.desc;
  const modalContent = document.getElementById('modal-content');

  document.getElementById('m-title').textContent = item.title;
  document.getElementById('m-desc').textContent = fullDesc;
  document.getElementById('m-img').src = item.img;
  document.getElementById('m-img').alt = item.alt;
  document.getElementById('m-tag').textContent = item.tag;
  if (modalContent) modalContent.setAttribute('data-type', item.type);

  // Status styling
  const dot = document.getElementById('m-status-dot');
  const statusText = document.getElementById('m-status-text');

  if (item.status === 'green') {
    dot.className = 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse';
    statusText.className = 'text-emerald-400';
    statusText.textContent = 'Active Development';
  } else if (item.status === 'yellow') {
    dot.className = 'w-2 h-2 rounded-full bg-yellow-500';
    statusText.className = 'text-yellow-400';
    statusText.textContent = 'Research Phase';
  } else {
    dot.className = 'w-2 h-2 rounded-full bg-red-500';
    statusText.className = 'text-red-400';
    statusText.textContent = 'Concept / Archived';
  }

  const linkBtn = document.getElementById('m-link');
  const linkBtnText = document.getElementById('m-link-text');

  if (item.href) {
    linkBtn.href = item.href;
    linkBtn.style.display = 'inline-flex';
    linkBtnText.textContent = item.type === 'app' ? 'Open App' : 'Open Narrative';
  } else {
    linkBtn.style.display = 'none';
  }

  modal.classList.remove('hidden');
  void modal.offsetWidth;
  modal.classList.add('open');
};

window.closeModal = function () {
  modal.classList.remove('open');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 500);
};

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.classList.contains('open')) window.closeModal();
    else window.resetView();
  }
});

// Initialize on load
window.addEventListener('DOMContentLoaded', init);
