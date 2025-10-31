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
 * PortfolioCarousel Class
 * Manages all aspects of the project carousel, including
 * DOM manipulation, state, navigation, themes, and autoplay.
 */
class PortfolioCarousel {
  constructor(projectsData, carouselId) {
    this.carouselId = carouselId;
    const container = document.getElementById(carouselId);
    
    if (!container) {
      console.error(`PortfolioCarousel: Container with id "${carouselId}" not found. Initialization aborted.`);
      return;
    }

    // Store references to critical DOM elements within this carousel's container
    this.elements = {
      container: container,
      track: container.querySelector('.track'),
      dotsWrap: container.querySelector('.dots'),
      year: document.getElementById('year'),
      progressBar: document.getElementById('progressBar'),
      particlesContainer: document.getElementById('particles'),
      carouselSection: container,
      prevBtn: container.querySelector('.nav-arrow.prev'),
      nextBtn: container.querySelector('.nav-arrow.next'),
      root: document.documentElement,
      hero: document.getElementById('hero')
    };

    // --- Robustness: Check for critical DOM elements ---
    const requiredElements = ['track', 'dotsWrap', 'carouselSection', 'prevBtn', 'nextBtn'];
    for (const key of requiredElements) {
      if (!this.elements[key]) {
        console.error(`PortfolioCarousel (${carouselId}): Missing required DOM element for key "${key}". Initialization aborted.`);
        // Stop execution if a critical element is missing
        return; 
      }
    }

    this.projects = projectsData;
    // Ensure projects are shown in order: green (active) -> yellow (draft) -> red (in progress)
    // Keep stable ordering within the same status by using the original index as tiebreaker
    const statusOrder = { green: 0, yellow: 1, red: 2 };
    this.projects = this.projects
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
      slideEls: [], // Array of generated card DOM elements
      dotsEls: [],  // Array of generated dot navigation DOM elements
      currentIndex: 0, // Current active project index (0 to projects.length - 1)
      cardWidth: 0,
      gap: 0,
      isTransitioningTheme: false, // Prevents rapid theme changes
      touchStartX: 0,
      touchEndX: 0,
      themeMode: 'dark', // Default theme mode
      isProgrammaticScroll: false, // Flag to prevent scroll handler conflicts
      scrollTimeout: null, // To manage the programmatic scroll flag
      displayMode: 'default'
    };

    // --- Performance: Debounce resize events ---
    this._debouncedResize = debounce(this._updateCarouselDimensions.bind(this), 250);
    // Bind scroll handler to ensure 'this' context is correct
    this._handleScroll = this._handleScroll.bind(this); 

    this._initialize();
  }

  /**
   * Applies a base light or dark theme by adjusting foundational CSS vars.
   * This does not override per-project accent colors which are applied by _applyTheme.
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
   * Updates the theme toggle SVG icon to reflect current state.
   */
  _updateThemeToggleIcon() {
    if (!this.elements.themeToggle) return;
    const svg = this.elements.themeToggle.querySelector('svg');
    if (!svg) return;
    if (this.state.themeMode === 'light') {
      // sun icon
      svg.innerHTML = `
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <g stroke="currentColor" stroke-width="2">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
          <line x1="18.4" y1="18.4" x2="19.8" y2="19.8" />
          <line x1="4.2" y1="19.8" x2="5.6" y2="18.4" />
          <line x1="18.4" y1="5.6" x2="19.8" y2="4.2" />
        </g>`;
    } else {
      // moon icon
      svg.innerHTML = `
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
      `;
    }
  }

  /**
   * Updates a data attribute on <html> to let CSS adjust layout for medium/small viewports.
   * Keeps track of last applied mode to avoid unnecessary DOM writes.
   */
  _updateDisplayMode() {
    if (!this.elements.root) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    let mode = 'default';
    if (width <= 1400 || height <= 820) {
      mode = 'small';
    } else if (width <= 1680 || height <= 950) {
      mode = 'medium';
    }

    if (this.state.displayMode === mode) return;

    this.state.displayMode = mode;
    if (mode === 'default') {
      delete this.elements.root.dataset.displayMode;
    } else {
      this.elements.root.dataset.displayMode = mode;
    }
  }

  /**
   * Initializes the carousel: builds elements, sets up events, and initial state.
   */
  _initialize() {
    this.elements.year.textContent = new Date().getFullYear();
    this._checkReducedMotion(); // Check user preference for motion
    this._createParticles();
    this._buildCarousel();
    this._addEventListeners();
    this._updateDisplayMode(); // Apply responsive display mode before measurements
    this._updateCarouselDimensions(); // Initial dimension setup

    // Scroll to the first slide immediately, without smooth behavior for initial load
    this._scrollToSlide(this.state.currentIndex, true); 
    this._updateActiveState(); // Set initial active dot and theme

    // --- Entry Animation: Add 'loaded' class after initialization ---
    // Use requestAnimationFrame for smooth DOM updates after painting
    requestAnimationFrame(() => {
      this.elements.carouselSection.classList.add('loaded');
      this.elements.hero.classList.add('loaded'); 
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
    if (prefersReducedMotion) {
      // Disable smooth transitions and particle animations
      this.elements.particlesContainer.querySelectorAll('.particle').forEach(p => {
        p.style.animation = 'none';
      });
      // Set scroll-behavior to 'auto' for reduced motion
      this.elements.track.style.scrollBehavior = 'auto';
    }
  }

  /**
   * Creates and appends animated background particles to the DOM.
   */
  _createParticles() {
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
   * Applies the given theme (colors) to the document's CSS variables.
   * @param {object} theme - An object containing primary, secondary, tertiary, and background colors.
   * @param {boolean} [immediate=false] - If true, theme changes without transition.
   */
  _applyTheme(theme, immediate = false) {
    // Prevent theme changes if another transition is already active, unless immediate is true
    if (this.state.isTransitioningTheme && !immediate) return;
    
    this.state.isTransitioningTheme = true;
    
    // Update CSS custom properties
    this.elements.root.style.setProperty('--theme-primary', theme.primary);
    this.elements.root.style.setProperty('--gradient-1', theme.secondary);
    this.elements.root.style.setProperty('--gradient-2', theme.tertiary);
    this.elements.root.style.setProperty('--bg', theme.bg);
    this.elements.root.style.setProperty('--brand', theme.primary); // Ensure brand variable is also updated
    this.elements.root.style.setProperty('--focus', `0 0 0 3px ${theme.primary}35`);
    this.elements.root.style.setProperty('--ring', `${theme.primary}28`);
    
    // Update particles color to match the new theme
    this.elements.particlesContainer.querySelectorAll('.particle').forEach(particle => {
      particle.style.background = theme.primary;
    });
    
    // Reset the transition flag after the CSS transition duration
    setTimeout(() => {
      this.state.isTransitioningTheme = false;
    }, immediate ? 0 : 1500); // Matches CSS `body` background transition
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
    art.role = 'option'; // ARIA role for listbox items
    art.id = `project-card-${index}`; // Unique ID for aria-activedescendant
    art.setAttribute('aria-label', `${p.title} project`);
    art.setAttribute('aria-roledescription', 'slide'); // Describes the role of the item
    art.setAttribute('aria-posinset', index + 1); // 1-based position in set
    art.setAttribute('aria-setsize', this.projects.length); // Total number of items

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

    // New image-focused layout with bottom overlay
    art.innerHTML = `
      <div class="thumb">
        <img loading="lazy" src="${p.img}" alt="${p.alt}">
      </div>
      <div class="card-overlay">
        <span class="dot ${p.status}"></span>
        <div class="title">${p.title}</div>
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
    const dot = modal.querySelector('.dot');

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
    const modal = document.createElement('div');
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
   * Creates a single navigation dot button.
   * @param {number} index - The index of the project associated with this dot.
   * @returns {HTMLButtonElement} The created button element for the dot.
   */
  _createDot(index) {
    const button = document.createElement('button');
    button.className = 'dotnav';
    button.setAttribute('aria-label', `Go to project ${index + 1}`);
    button.setAttribute('role', 'tab'); // ARIA role for tab-like navigation
    button.addEventListener('click', () => this._scrollToSlide(index));
    return button;
  }

  /**
   * Populates the carousel track with project cards and the dots navigation.
   */
  _buildCarousel() {
    this.elements.track.innerHTML = '';
    this.elements.dotsWrap.innerHTML = '';
    this.state.slideEls = [];
    this.state.dotsEls = [];

    this.projects.forEach((p, i) => {
      const card = this._createCard(p, i);
      this.elements.track.appendChild(card);
      this.state.slideEls.push(card);

      const dot = this._createDot(i);
      this.elements.dotsWrap.appendChild(dot);
      this.state.dotsEls.push(dot);
    });

    // Set aria-setsize on the track for overall list context
    this.elements.track.setAttribute('aria-setsize', this.projects.length);
  }

  /**
   * Updates carousel dimensions (card width, gap) and can adjust scroll if needed.
   * Called on initialization and window resize.
   */
  _updateCarouselDimensions() {
    this._updateDisplayMode();

    if (this.state.slideEls.length === 0) return;

    // Recalculate dimensions based on the first card and track's computed style
    const firstCard = this.state.slideEls[0];
    const computedTrackStyle = getComputedStyle(this.elements.track);
    this.state.cardWidth = firstCard.offsetWidth;
    // Get gap value from CSS
    this.state.gap = parseFloat(computedTrackStyle.gap || '0px'); 

    // Re-scroll to current index to correct position after resize if necessary
    // Use immediate scroll to avoid jarring animations during resize
    this._scrollToSlide(this.state.currentIndex, true); 
  }

  /**
   * Scrolls the carousel to a specific project index.
   * Handles circular looping.
   * @param {number} index - The target project index.
   * @param {boolean} [immediate=false] - If true, scrolls instantly without smooth animation.
   */
  _scrollToSlide(index, immediate = false) {
    // --- Circular Looping Logic ---
    if (index < 0) {
      index = this.projects.length - 1; // Loop to the last project
    } else if (index >= this.projects.length) {
      index = 0; // Loop to the first project
    }

    this.state.currentIndex = index;

    // Use scrollIntoView for more reliable centering
    if (this.state.slideEls[index]) {
      this.state.isProgrammaticScroll = true; // Set flag before scrolling
      clearTimeout(this.state.scrollTimeout); // Clear any existing timeout

      this.state.slideEls[index].scrollIntoView({
        behavior: immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'center'
      });

      // Reset the flag after the scroll is likely complete
      this.state.scrollTimeout = setTimeout(() => {
        this.state.isProgrammaticScroll = false;
      }, 800); // A bit longer than the smooth scroll transition
    }

    this._updateActiveState(); // Update active dot and theme
  }

  /**
   * Navigates the carousel by a relative direction (-1 for previous, 1 for next).
   * @param {number} direction - -1 or 1.
   */
  _navigateCarousel(direction) {
    const newIndex = this.state.currentIndex + direction;
    this._scrollToSlide(newIndex);
  }

  /**
   * Updates the active state of navigation dots and applies the theme of the current project.
   */
  _updateActiveState() {
    // Update active dot
    this.state.dotsEls.forEach((dot, i) => {
      const isActive = (i === this.state.currentIndex);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false'); // ARIA state for current tab/dot
      // Update aria-label for improved context on active dots
      dot.setAttribute('aria-label', `Go to project ${i + 1}${isActive ? ', current project' : ''}`);
    });

    // Update active card styling
    this.state.slideEls.forEach((card, i) => {
      const isActive = (i === this.state.currentIndex);
      if (isActive) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Update aria-activedescendant on the track to point to the current active card
    const currentCardId = `project-card-${this.state.currentIndex}`;
    this.elements.track.setAttribute('aria-activedescendant', currentCardId);

    // Keep global palette stable; no per-card theme changes.
  }

  /**
   * Updates the visual progress bar based on the carousel's scroll position.
   */
  _updateProgressBar() {
    const { scrollWidth, scrollLeft, clientWidth } = this.elements.track;
    const scrollableWidth = scrollWidth - clientWidth; // Total width that can be scrolled
    
    // Prevent division by zero if content doesn't overflow
    if (scrollableWidth <= 0) {
      this.elements.progressBar.style.transform = 'scaleX(0)';
      return;
    }
    const progress = scrollLeft / scrollableWidth;
    this.elements.progressBar.style.transform = `scaleX(${progress})`;
  }

  /**
   * Handles the 'scroll' event of the track, updating progress bar and active slide.
   */
  _handleScroll() {
    if (this.state.isProgrammaticScroll) return; // Ignore scroll events during programmatic scroll

    this._updateProgressBar();

    // Determine current slide based on which card is most visible in the viewport
    const trackRect = this.elements.track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    this.state.slideEls.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - trackCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    // Update state only if the active slide has changed
    if (closestIndex !== this.state.currentIndex && closestIndex >= 0 && closestIndex < this.projects.length) {
      this.state.currentIndex = closestIndex;
      this._updateActiveState();
    }
  }

  /**
   * Handles the 'touchstart' event for swipe gestures.
   * @param {TouchEvent} e
   */
  _handleTouchStart(e) {
    this.state.touchStartX = e.touches[0].clientX;
  }

  /**
   * Handles the 'touchmove' event to track swipe movement.
   * @param {TouchEvent} e
   */
  _handleTouchMove(e) {
    this.state.touchEndX = e.touches[0].clientX;
  }

  /**
   * Handles the 'touchend' event to determine if a swipe occurred and navigate.
   */
  _handleTouchEnd() {
    const swipeThreshold = 50; // Minimum pixels for a swipe to be registered
    const deltaX = this.state.touchEndX - this.state.touchStartX;

    if (deltaX > swipeThreshold) {
      this._navigateCarousel(-1); // Swiped right, go previous
    } else if (deltaX < -swipeThreshold) {
      this._navigateCarousel(1); // Swiped left, go next
    }
    // Reset touch coordinates
    this.state.touchStartX = 0;
    this.state.touchEndX = 0;
  }

  /**
   * Adds all necessary event listeners to DOM elements.
   */
  _addEventListeners() {
    window.addEventListener('resize', this._debouncedResize);
    this.elements.track.addEventListener('scroll', this._handleScroll);
    this.elements.prevBtn.addEventListener('click', () => this._navigateCarousel(-1));
    this.elements.nextBtn.addEventListener('click', () => this._navigateCarousel(1));

    // --- Touch events for swipe navigation ---
    this.elements.track.addEventListener('touchstart', this._handleTouchStart.bind(this));
    this.elements.track.addEventListener('touchmove', this._handleTouchMove.bind(this));
    this.elements.track.addEventListener('touchend', this._handleTouchEnd.bind(this));

    // --- Keyboard navigation for accessibility ---
    this.elements.track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault(); // Prevent default browser scroll
            this._navigateCarousel(1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault(); // Prevent default browser scroll
            this._navigateCarousel(-1);
        }
    });
  }
}

// --- Global Initialization ---
// Ensure the DOM is fully loaded before attempting to initialize the carousel.
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
  
  // Instantiate both carousels
  window.portfolioNarrative = new PortfolioCarousel(narrativeProjects, 'carousel-narrative');
  window.portfolioApps = new PortfolioCarousel(appProjects, 'carousel-apps');
  
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
  
  function smoothScrollTo(targetPosition, duration = 800) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    
    // If distance is very small, don't animate
    if (Math.abs(distance) < 10) {
      console.log('Distance too small, skipping animation');
      return;
    }
    
    const startTime = Date.now();
    const fps = 60;
    const frameDuration = 1000 / fps;
    
    console.log(`Starting smooth scroll from ${startPosition} to ${targetPosition} over ${duration}ms, distance: ${distance}`);
    
    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth ease-in-out cubic easing
      const easeInOut = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      const currentPosition = startPosition + distance * easeInOut;
      
      // Use direct scroll assignment for better compatibility
      window.scrollTo(0, currentPosition);
      document.documentElement.scrollTop = currentPosition;
      document.body.scrollTop = currentPosition;
      
      console.log(`Scroll progress: ${progress.toFixed(2)}, target: ${currentPosition}, actual: ${window.pageYOffset}`);
      
      if (progress < 1) {
        setTimeout(animate, frameDuration);
      } else {
        console.log('Smooth scroll completed at', window.pageYOffset);
      }
    }
    
    animate();
  }
  
  function jumpToSection(sectionId, offset = 0) {
    const section = document.getElementById(sectionId);
    if (!section) {
      console.error(`Section ${sectionId} not found`);
      return;
    }

    // Use browser's native smooth scroll for better reliability
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'center'  // Changed from 'start' to 'center' for better framing
    });
    
    // Focus management after scroll completes
    setTimeout(() => {
      const focusTarget = section.querySelector('.dotnav, .track');
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
      jumpToSection('narrative-projects', 100); // Scroll to just above the section
    });
  } else {
    console.error('Narrative button not found');
  }
  
  if (viewAppsBtn) {
    console.log('Apps button found, adding listener');
    viewAppsBtn.addEventListener('click', (e) => {
      console.log('Apps button clicked!');
      e.preventDefault();
      jumpToSection('apps-projects', 100); // Scroll to just above the section
    });
  } else {
    console.error('Apps button not found');
  }
  
  // --- Scroll to Top Button ---
  function createScrollToTopButton() {
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


