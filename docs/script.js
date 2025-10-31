/* script.js */

import { projectsData } from './project-descriptions.js';

/**
 * Utility function for debouncing
 */
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

/**
 * ProjectLoader Class
 * Manages all aspects of loading projects into a gallery,
 * including DOM manipulation, themes, and modal popups.
 */
class ProjectLoader {
  constructor(projectsData, containerId) {
    this.containerId = containerId;
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`ProjectLoader: Container with id "${containerId}" not found. Initialization aborted.`);
      return;
    }

    // Store references to critical DOM elements within this container
    this.elements = {
      container: container,
      gallery: container.querySelector('.project-gallery'),
      year: document.getElementById('year'),
      particlesContainer: document.getElementById('particles'),
      carouselSection: container, // Kept for consistency, refers to the gallery container
      root: document.documentElement,
      hero: document.getElementById('hero')
    };

    // --- Robustness: Check for critical DOM elements ---
    const requiredElements = ['gallery', 'carouselSection'];
    for (const key of requiredElements) {
      if (!this.elements[key]) {
        console.error(`ProjectLoader (${containerId}): Missing required DOM element for key "${key}". Initialization aborted.`);
        // Stop execution if a critical element is missing
        return; 
      }
    }

    // Ensure projects are shown in order: green (active) -> yellow (draft) -> red (in progress)
    // Keep stable ordering within the same status by using the original index as tiebreaker
    const statusOrder = { green: 0, yellow: 1, red: 2 };
    this.projects = projectsData
      .map((p, i) => ({ p, i }))
      .sort((a, b) => {
        const sa = statusOrder[a.p.status] ?? 3;
        const sb = statusOrder[b.p.status] ?? 3;
        if (sa !== sb) return sa - sb;
        return a.i - b.i;
      })
      .map(({ p }) => p);

    // --- Centralized State Management ---
    this.state = {
      isTransitioningTheme: false, // Prevents rapid theme changes
      themeMode: 'dark', // Default theme mode
      displayMode: 'default'
    };

    this._initialize();
  }

  /**
   * Applies a base light or dark theme by adjusting foundational CSS vars.
   * @param {'light'|'dark'} mode
   */
  _applyBaseTheme(mode) {
    if (mode === 'light') {
      this.elements.root.style.setProperty('--bg', '#fafbfd');
      this.elements.root.style.setProperty('--fg', '#0b1220');
      this.elements.root.style.setProperty('--muted', '#5a6b7a');
      this.elements.root.style.setProperty('--card', '#ffffff');
      this.elements.root.style.setProperty('--theme-secondary', '#eef3fb');
      this.elements.root.style.setProperty('--theme-tertiary', '#f7f9fc');
    } else {
      // dark
      this.elements.root.style.setProperty('--bg', '#0b0d12');
      this.elements.root.style.setProperty('--fg', '#e8eaef');
      this.elements.root.style.setProperty('--muted', '#9aa3b2');
      this.elements.root.style.setProperty('--card', '#141924');
      this.elements.root.style.setProperty('--theme-secondary', '#1a2233');
      this.elements.root.style.setProperty('--theme-tertiary', '#1c1423');
    }
  }

  /**
   * Initializes the gallery: builds elements, sets up events, and initial state.
   */
  _initialize() {
    if(this.elements.year) {
        this.elements.year.textContent = new Date().getFullYear();
    }
    this._checkReducedMotion(); // Check user preference for motion
    this._createParticles();
    this._buildGallery();

    // --- Entry Animation: Add 'loaded' class after initialization ---
    // Use requestAnimationFrame for smooth DOM updates after painting
    requestAnimationFrame(() => {
      this.elements.carouselSection.classList.add('loaded');
      if (this.elements.hero) {
        this.elements.hero.classList.add('loaded');
      }
    });

    // --- Theme: force dark mode only ---
    this.state.themeMode = 'dark';
    this._applyBaseTheme(this.state.themeMode);
    // Create a single floating tooltip node for status badges to avoid interfering with card clicks
    this._createFloatingTooltip();
  }

  /**
   * Creates a single floating tooltip element and appends it to the document.
   * The tooltip will be positioned and shown/hidden by badge event handlers.
   */
  _createFloatingTooltip() {
    if (this._floatingTooltip) return; // already created
    // Check if another instance already created one
    const existingTip = document.querySelector('.floating-status-tooltip');
    if(existingTip) {
        this._floatingTooltip = existingTip;
        return;
    }

    const tip = document.createElement('div');
    tip.className = 'floating-status-tooltip';
    tip.setAttribute('role', 'status');
    tip.style.position = 'fixed';
    tip.style.zIndex = '9999';
    tip.style.pointerEvents = 'none';
    tip.style.opacity = '0';
    tip.style.transition = 'opacity .12s ease, transform .12s ease';
    tip.style.transform = 'translateY(6px)';
    tip.style.background = 'rgba(12,12,12,0.92)';
    tip.style.color = '#fff';
    tip.style.padding = '6px 8px';
    tip.style.borderRadius = '6px';
    tip.style.fontSize = '12px';
    tip.style.whiteSpace = 'nowrap';
    document.body.appendChild(tip);
    this._floatingTooltip = tip;
  }

  /**
   * Checks for user's prefers-reduced-motion setting.
   */
  _checkReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && this.elements.particlesContainer) {
      // Disable particle animations
      this.elements.particlesContainer.querySelectorAll('.particle').forEach(p => {
        p.style.animation = 'none';
      });
    }
  }

  /**
   * Creates and appends animated background particles to the DOM.
   */
  _createParticles() {
    if (!this.elements.particlesContainer) return;
    // Clear existing particles to prevent duplicates on re-initialization
    this.elements.particlesContainer.innerHTML = '';
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (8 + Math.random() * 4) + 's';
      this.elements.particlesContainer.appendChild(particle);
    }
  }

  /**
   * Creates a single project card DOM element.
   * @param {object} p - Project data.
   * @param {number} index - The index of the project in the `projects` array.
   * @returns {HTMLElement} The created article element for the card.
   */
  _createCard(p, index) {
    const art = document.createElement('article');
    art.className = 'card';
    art.setAttribute('aria-label', `${p.title} project`);
    
    // Add data-project attribute for dynamic sizing
    art.setAttribute('data-project', p.title.toLowerCase());

    // Set per-card accent variable for outline/button styling
    if (p.theme && p.theme.primary) {
      art.style.setProperty('--card-accent', p.theme.primary);
    }

    // Set section-based border color (narrative vs app)
    const sectionColorMap = {
      narrative: { color: '#d4af37', glow: '0 20px 60px rgba(212,175,55,0.08)' },
      app: { color: '#3b82f6', glow: '0 20px 60px rgba(59,130,246,0.08)' }
    };
    
    if (p.type && sectionColorMap[p.type]) {
      art.style.setProperty('--status-color', sectionColorMap[p.type].color);
      art.style.setProperty('--status-glow', sectionColorMap[p.type].glow);
    }

    // Create terse taglines from descriptions
    const taglines = {
      'skywalker': 'A mythic mirror for self-discovery',
      'sankofa': 'Stories of purpose and moral compass',
      'dukkha': 'Understanding dopamine and temptation',
      'vox': 'Focused vocabulary tracking',
      'agoge': 'Reimagining rites of passage',
      'orpheus': 'Decoding emotion through music',
      'drop': 'Mindful tracking of daily domains',
  'stark': 'Tracking Fitness metrics in an interactive dashboard'
    };
    
    const tagline = taglines[p.title.toLowerCase()] || '';

    // New image-focused layout with bottom overlay + tagline
    art.innerHTML = `
      <div class="thumb">
        <img loading="lazy" src="${p.img}" alt="${p.alt}">
      </div>
      <div class="card-overlay">
        <div class="card-overlay-header">
          <span class="dot ${p.status}"></span>
          <div class="title">${p.title}</div>
        </div>
        ${tagline ? `<p class="card-tagline">${tagline}</p>` : ''}
      </div>`;
    
    // Click opens modal with full details
    art.addEventListener('click', () => {
      this._openProjectModal(p, index);
    });
    
    // Attach tooltip handlers to the colored dot
    const dotEl = art.querySelector('.dot');
    if (dotEl && (p.status === 'green' || p.status === 'yellow' || p.status === 'red')) {
      const map = { green: 'Active', yellow: 'Draft', red: 'In Progress' };
      const label = map[p.status] || 'Status';
      dotEl.setAttribute('role', 'img');
      dotEl.setAttribute('aria-label', label);

      const stop = (e) => { e.stopPropagation(); };
      ['click','mousedown','pointerdown'].forEach(evt => dotEl.addEventListener(evt, stop));

      dotEl.addEventListener('mouseenter', (ev) => this._showFloatingTooltip(label, ev.currentTarget));
      dotEl.addEventListener('mouseleave', () => this._hideFloatingTooltip());
      dotEl.setAttribute('tabindex', '0');
      dotEl.addEventListener('focus', (ev) => this._showFloatingTooltip(label, ev.currentTarget));
      dotEl.addEventListener('blur', () => this._hideFloatingTooltip());

      dotEl.addEventListener('click', (ev) => {
        if (window.matchMedia('(pointer: coarse)').matches) {
          ev.stopPropagation();
          if (this._visibleBadge === dotEl) {
            this._hideFloatingTooltip();
          } else {
            this._showFloatingTooltip(label, dotEl);
          }
        }
      });
    }
    
    return art;
  }

  /**
   * Opens modal with full project details
   */
  _openProjectModal(project, index) {
    // Create modal if it doesn't exist
    if (!this._projectModal) {
      this._createProjectModal();
    }

    // Populate modal content
    const modal = this._projectModal;
    const img = modal.querySelector('.modal-header img');
    const title = modal.querySelector('.modal-title');
    const desc = modal.querySelector('.modal-desc');
    const metaContainer = modal.querySelector('.modal-meta');

    img.src = project.img;
    img.alt = project.alt;
    title.innerHTML = `<span class="dot ${project.status}"></span>${project.title}`;
    desc.textContent = project.desc;

    // Build meta section
    metaContainer.innerHTML = `
      <span class="tag">${project.tag}</span>
      ${project.href ? 
        `<a class="link" href="${project.href}" target="_blank" rel="noopener noreferrer" aria-label="Open ${project.title} project">
          <span>Explore &rarr;</span>
        </a>` : 
        `<span class="link" aria-disabled="true"><span>Coming Soon</span></span>`
      }`;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Creates the project detail modal
   */
  _createProjectModal() {
    // Check if modal already exists anywhere in DOM
    let modal = document.querySelector('.project-modal');
    if (modal) {
        this._projectModal = modal;
        return;
    }

    modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <img src="" alt="">
          <button class="modal-close" aria-label="Close modal">&times;</button>
        </div>
        <div class="modal-body">
          <h2 class="modal-title"></h2>
          <p class="modal-desc"></p>
          <div class="modal-meta"></div>
        </div>
      </div>`;

    document.body.appendChild(modal);
    this._projectModal = modal;

    // Close handlers
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => this._closeProjectModal());

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this._closeProjectModal();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        this._closeProjectModal();
      }
    });
  }

  /**
   * Closes the project modal
   */
  _closeProjectModal() {
    if (this._projectModal) {
      this._projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /**
   * Position and show the floating tooltip near a target element.
   * @param {string} text
   * @param {HTMLElement} target
   */
  _showFloatingTooltip(text, target) {
    if (!this._floatingTooltip || !target) return;
    const tip = this._floatingTooltip;
    tip.textContent = text;
    // Ensure it's rendered to measure size
    tip.style.opacity = '0';
    tip.style.pointerEvents = 'none';
    tip.style.transform = 'translate(-50%, 6px)';
    tip.style.left = '0px';
    tip.style.top = '0px';

    // Measure target and tooltip sizes
    const rect = target.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();

    // Calculate centered horizontal position
    const left = rect.left + rect.width / 2;
    // Position tooltip above the target with a small gap (10px)
    const gap = 10;
    const top = rect.top - tipRect.height - gap;

    tip.style.left = `${left}px`;
    // If top would be off-screen, clamp it to a small offset
    tip.style.top = `${Math.max(8, top)}px`;
    tip.style.transform = 'translateX(-50%) translateY(0)';
    tip.style.opacity = '1';
    this._visibleBadge = target;
  }

  _hideFloatingTooltip() {
    if (!this._floatingTooltip) return;
    this._floatingTooltip.style.opacity = '0';
    this._visibleBadge = null;
  }

  /**
   * Populates the gallery with project cards.
   */
  _buildGallery() {
    this.elements.gallery.innerHTML = '';
    
    // Reorder projects for grid layout: Skywalker, Agoge, Sankofa, Dukkha, Orpheus,
    // PWAs: drop and STARK on the top row (squares), then Vox as the wide card below.
    const gridOrder = ['skywalker', 'agoge', 'sankofa', 'dukkha', 'orpheus', 'drop', 'stark', 'vox'];
    const orderedProjects = [];
    
    // Debug: log what projects we're starting with
    console.log('Building gallery with projects:', this.projects.map(p => p.title));
    
    // Sort projects by the desired grid order
    gridOrder.forEach(name => {
      const project = this.projects.find(p => p.title.toLowerCase() === name);
      if (project) {
        orderedProjects.push(project);
        console.log(`Added ${project.title} to ordered list`);
      }
    });
    
    // Add any remaining projects not in the order list
    this.projects.forEach(p => {
      if (!orderedProjects.includes(p)) {
        orderedProjects.push(p);
        console.log(`Added remaining project ${p.title} to ordered list`);
      }
    });
    
    console.log('Final ordered projects:', orderedProjects.map(p => p.title));
    
    // Build cards in the correct order
    orderedProjects.forEach((p, i) => {
      const card = this._createCard(p, i);
      this.elements.gallery.appendChild(card);
    });
  }
}

// --- Global Initialization ---
// Ensure the DOM is fully loaded before attempting to initialize.
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded - Initial scroll position:', window.scrollY);
  
  // Disable browser scroll restoration to ensure page always loads at top
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  // Force scroll to top immediately and aggressively
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  
  console.log('After force scroll to top:', window.scrollY);
  
  // Trigger hero animation and show content
  setTimeout(() => {
    console.log('Adding loaded class to body and hero');
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      heroElement.classList.add('loaded');
    } else {
      console.log('Hero element not found');
    }
    document.body.classList.add('loaded');
    console.log('Body classes after adding loaded:', document.body.className);
    
    // Create scroll-to-top button after content is visible
    setTimeout(() => {
      createScrollToTopButton();
      console.log('Scroll-to-top button should now be created');
    }, 50);
  }, 200);
  
  // Fallback: ensure body becomes visible even if something goes wrong
  setTimeout(() => {
    if (!document.body.classList.contains('loaded')) {
      console.log('Fallback: forcing body to be visible');
      document.body.classList.add('loaded');
      document.getElementById('hero')?.classList.add('loaded');
      createScrollToTopButton();
    }
  }, 2000);

  // Set up scroll button functionality
  const scrollCta = document.getElementById('scrollCta');
  if (scrollCta) {
    scrollCta.addEventListener('click', () => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'  // Changed from 'start' to 'center' for lower positioning
        });
      }
    });
  }
  
  // Filter projects by type
  const narrativeProjects = projectsData.filter(p => p.type === 'narrative');
  const appProjects = projectsData.filter(p => p.type === 'app');
  
  // Instantiate both gallery loaders
  window.portfolioNarrative = new ProjectLoader(narrativeProjects, 'project-gallery-container-narrative');
  window.portfolioApps = new ProjectLoader(appProjects, 'project-gallery-container-apps');
  
  // --- Update badge counts and wire up hero CTA buttons ---
  const viewNarrativeBtn = document.getElementById('viewNarrative');
  const viewAppsBtn = document.getElementById('viewApps');
  const countNarrativeBadge = document.getElementById('countNarrative');
  const countAppsBadge = document.getElementById('countApps');
  
  console.log('DOM elements found:', {
    viewNarrativeBtn: !!viewNarrativeBtn,
    viewAppsBtn: !!viewAppsBtn,
    countNarrativeBadge: !!countNarrativeBadge,
    countAppsBadge: !!countAppsBadge
  });
  
  if (countNarrativeBadge) countNarrativeBadge.textContent = narrativeProjects.length;
  if (countAppsBadge) countAppsBadge.textContent = appProjects.length;
  
  function jumpToSection(sectionId, offsetOrOptions = 0) {
    const section = document.getElementById(sectionId);
    if (!section) {
      console.error(`Section ${sectionId} not found`);
      return;
    }

    // Normalize options: allow passing a number (pixels) or an object like
    // { alignTo: 'heading', spacing: 8 } or { offset: 120 }.
    let options = {};
    if (typeof offsetOrOptions === 'object' && offsetOrOptions !== null) {
      options = offsetOrOptions;
    } else if (typeof offsetOrOptions === 'number') {
      options.offset = offsetOrOptions;
    }

    // If the caller requested aligning to the section heading, find the
    // heading (prefer .section-title, then h2, then first heading) and
    // scroll so the heading sits `spacing` px from the top of the viewport.
    if (options.alignTo === 'heading') {
      const spacing = Number.isFinite(options.spacing) ? options.spacing : 8; // few px by default
      const heading = section.querySelector('.section-title, h2, h1');
      if (heading) {
        const rect = heading.getBoundingClientRect();
        const targetTop = window.scrollY + rect.top - spacing;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
      } else {
        // Fallback to section top if no heading found
        const rect = section.getBoundingClientRect();
        const targetTop = window.scrollY + rect.top - spacing;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
      }

      // Focus management after scroll completes
      setTimeout(() => {
        const focusTarget = section.querySelector('.card'); // Focus the first card
        if (focusTarget) focusTarget.focus({ preventScroll: true });
      }, 600);

      return;
    }

    // Read CSS scroll-margin-top if set on the section. This lets designers
    // control the landing offset from CSS (so changing scroll-margin-top in
    // `test/styles.css` will actually move where the section lands).
    const computed = window.getComputedStyle(section);
    const cssScrollMargin = computed && computed.scrollMarginTop
      ? parseInt(computed.scrollMarginTop, 15)
      : 0;

    // Decide which offset to use: prefer CSS value if present, otherwise
    // fall back to the numeric offset passed to the function.
    const effectiveOffset = (Number.isFinite(cssScrollMargin) && cssScrollMargin > 0)
      ? cssScrollMargin
      : (typeof options.offset === 'number' && options.offset > 0 ? options.offset : 0);

    if (effectiveOffset > 0) {
      // Compute exact scroll position so the section's top lands
      // `effectiveOffset` pixels below the viewport top.
      const rect = section.getBoundingClientRect();
      const targetTop = window.scrollY + rect.top - effectiveOffset;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    } else {
      // No offset available — use native scroll which respects
      // CSS `scroll-margin-top` (when block:'start') for anchor behaviour.
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Focus management after scroll completes
    setTimeout(() => {
      const focusTarget = section.querySelector('.card'); // Focus the first card
      if (focusTarget) {
        focusTarget.focus({ preventScroll: true });
      }
    }, 600);
  }
  
  if (viewNarrativeBtn) {
    console.log('Narrative button found, adding listener');
    viewNarrativeBtn.addEventListener('click', (e) => {
      console.log('Narrative button clicked!');
      e.preventDefault();
  // Align the section heading to the top of the viewport with a few
  // pixels of spacing so the H2 sits visibly at the top.
  jumpToSection('narrative-projects', { alignTo: 'heading', spacing: 8 });
    });
  } else {
    console.error('Narrative button not found');
  }
  
  if (viewAppsBtn) {
    console.log('Apps button found, adding listener');
    viewAppsBtn.addEventListener('click', (e) => {
      console.log('Apps button clicked!');
      e.preventDefault();
  // Align the apps section heading to the top as well
  jumpToSection('apps-projects', { alignTo: 'heading', spacing: 8 });
    });
  } else {
    console.error('Apps button not found');
  }
  
  // --- Scroll to Top Button ---
  function createScrollToTopButton() {
    // Check if button already exists
    if(document.getElementById('scrollToTop')) return;

    console.log('Creating scroll to top button...');
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTop';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    `;
    document.body.appendChild(scrollToTopBtn);
    console.log('Scroll to top button created and appended to DOM');
    
    // Show/hide button based on scroll position
    function toggleScrollToTopButton() {
      // Get hero section height as threshold
      const heroSection = document.querySelector('.hero-section');
      const heroHeight = heroSection ? heroSection.offsetHeight : 400;
      const currentScroll = window.scrollY;
      const shouldShow = currentScroll > heroHeight;
      
      if (shouldShow) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
    
    window.addEventListener('scroll', debounce(toggleScrollToTopButton, 100));
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
      // Use smooth scroll to top like the section buttons
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Initial check to set correct visibility state
    toggleScrollToTopButton();
  }
});

// Additional safeguard: ensure page stays at top after all resources load
window.addEventListener('load', () => {
  console.log('Window load event - scroll position:', window.scrollY);
  
  // Only force scroll to top if we're not at the top (browser restoration might have kicked in)
  if (window.scrollY > 0) {
    console.log('Browser restored scroll position, resetting to top');
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
  
  // Remove the aggressive scroll checking that prevents normal scrolling
  console.log('Page load complete, normal scrolling enabled');
});
