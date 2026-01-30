import { projectsData, projectDescriptions } from './project-descriptions.js';

// Organize projects by type
const projects = {
  narrative: projectsData.filter(p => p.type === 'narrative'),
  pwa: projectsData.filter(p => p.type === 'app'),
  psych: projectsData.filter(p => p.type === 'psychology')
};

// State
let activePillarId = null;

// Initialize
function init() {
  renderList('narrative', projects.narrative);
  renderList('pwa', projects.pwa);
  renderList('psych', projects.psych);
}

function renderList(key, items) {
  const container = document.getElementById(`list-${key}`);
  items.forEach((item) => {
    const card = document.createElement('div');
    card.className = "project-card group";
    card.style.setProperty('--accent-color', item.theme.primary);
    
    card.innerHTML = `
      <div class="project-card__media">
        <img src="${item.img}" 
             onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden'); this.nextElementSibling.classList.add('flex');"
             class="project-card__img" 
             alt="${item.alt}">
        <div class="project-card__fallback hidden absolute inset-0 items-center justify-center bg-zinc-800/50">
            <span class="text-white/40 font-display font-medium uppercase tracking-[0.2em] text-lg lg:text-xl group-hover:text-white/60 transition-colors text-center px-6">${item.title}</span>
        </div>
        <div class="project-card__fade"></div>
      </div>
      <div class="project-card__content">
        <div class="project-card__meta">
          <span class="project-card__tag">${item.tag}</span>
        </div>
        <h4 class="project-card__title">${item.title}</h4>
        <p class="project-card__desc">${item.desc}</p>
        
        <div class="project-card__cta">
          <span>View Project</span>
          <span class="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
        </div>
      </div>
    `;
    
    card.onclick = (e) => {
      e.stopPropagation();
      openModal(item);
    };
    
    container.appendChild(card);
  });
}

// Pillar Interaction
window.activatePillar = function(id) {
  if (activePillarId === id) return;

  const container = document.querySelector('.pillar-container');
  container.classList.add('has-active');

  const pillars = document.querySelectorAll('.pillar');
  const target = document.getElementById(`pillar-${id}`);
  const closeBtn = document.getElementById('close-btn');

  pillars.forEach(p => {
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

window.resetView = function() {
  if (!activePillarId) return;

  const container = document.querySelector('.pillar-container');
  container.classList.remove('has-active');

  const pillars = document.querySelectorAll('.pillar');
  const closeBtn = document.getElementById('close-btn');

  pillars.forEach(p => {
    p.classList.remove('active', 'inactive');
    p.setAttribute('aria-expanded', 'false');
  });

  activePillarId = null;

  closeBtn.classList.add('opacity-0');
  setTimeout(() => closeBtn.classList.add('hidden'), 300);
};

// Modal Logic
const modal = document.getElementById('modal');

window.openModal = function(item) {
  const projectKey = item.title.toLowerCase();
  const fullDesc = projectDescriptions[projectKey]?.full || item.desc;

  document.getElementById('m-title').textContent = item.title;
  document.getElementById('m-desc').textContent = fullDesc;
  document.getElementById('m-img').src = item.img;
  document.getElementById('m-img').alt = item.alt;
  document.getElementById('m-tag').textContent = item.tag;
  
  // Status styling
  const dot = document.getElementById('m-status-dot');
  const statusText = document.getElementById('m-status-text');
  
  if(item.status === 'green') {
    dot.className = "w-2 h-2 rounded-full bg-emerald-500 animate-pulse";
    statusText.className = "text-emerald-400";
    statusText.textContent = "Active Development";
  } else if(item.status === 'yellow') {
    dot.className = "w-2 h-2 rounded-full bg-yellow-500";
    statusText.className = "text-yellow-400";
    statusText.textContent = "Research Phase";
  } else {
    dot.className = "w-2 h-2 rounded-full bg-red-500";
    statusText.className = "text-red-400";
    statusText.textContent = "Concept / Archived";
  }

  const linkBtn = document.getElementById('m-link');
  if(item.href) {
    linkBtn.href = item.href;
    linkBtn.style.display = 'inline-flex';
  } else {
    linkBtn.style.display = 'none';
  }

  modal.classList.remove('hidden');
  void modal.offsetWidth;
  modal.classList.add('open');
};

window.closeModal = function() {
  modal.classList.remove('open');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 500);
};

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.classList.contains('open')) closeModal();
    else resetView();
  }
});

// Initialize on load
window.addEventListener('DOMContentLoaded', init);
