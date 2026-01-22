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
    card.className = "project-card snap-center shrink-0 w-[80vw] md:w-[400px] h-[55vh] md:h-[500px] bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden relative group cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/5";
    card.style.setProperty('--accent-color', item.theme.primary);
    
    card.innerHTML = `
      <div class="h-1/2 w-full overflow-hidden relative">
        <img src="${item.img}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" alt="${item.alt}">
        <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
      </div>
      <div class="h-1/2 p-6 md:p-8 flex flex-col relative bg-[#1a1a1a]">
        <div class="mb-4">
          <span class="text-[10px] font-mono uppercase tracking-widest text-white/50 border border-white/10 px-2 py-1 rounded">${item.tag}</span>
        </div>
        <h4 class="text-3xl font-display font-bold text-white mb-3 transition-colors">${item.title}</h4>
        <p class="text-sm text-gray-400 leading-relaxed line-clamp-3 font-light">${item.desc}</p>
        
        <div class="mt-auto pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white opacity-60 group-hover:opacity-100 transition-opacity">
          View Project <span class="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
        </div>
      </div>
    `;
    
    card.onclick = (e) => {
      e.stopPropagation();
      openModal(item);
    };
    
    container.appendChild(card);
  });
  
  // Add spacer
  const spacer = document.createElement('div');
  spacer.className = "shrink-0 w-12";
  container.appendChild(spacer);
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

// Export Portfolio
window.exportPortfolio = function() {
  window.print();
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
