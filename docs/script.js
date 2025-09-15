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
  constructor(projectsData) {
    // Store references to critical DOM elements
    this.elements = {
      track: document.getElementById('track'),
      dotsWrap: document.getElementById('dots'),
      year: document.getElementById('year'),
      progressBar: document.getElementById('progressBar'),
      particlesContainer: document.getElementById('particles'),
      carouselSection: document.querySelector('.carousel'),
      prevBtn: document.getElementById('prevBtn'),
      nextBtn: document.getElementById('nextBtn'),
      themeToggle: document.getElementById('themeToggle'),
      root: document.documentElement,
      hero: document.getElementById('hero')
    };

    // --- Robustness: Check for critical DOM elements ---
    const requiredElements = ['track', 'dotsWrap', 'progressBar', 'particlesContainer', 'carouselSection', 'prevBtn', 'nextBtn', 'hero'];
    for (const key of requiredElements) {
      if (!this.elements[key]) {
        console.error(`PortfolioCarousel: Missing required DOM element for key "${key}". Initialization aborted.`);
        // Stop execution if a critical element is missing
        return; 
      }
    }

    this.projects = projectsData;
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
      scrollTimeout: null // To manage the programmatic scroll flag
    };

    // --- Performance: Debounce resize events ---
    this._debouncedResize = debounce(this._updateCarouselDimensions.bind(this), 250);
    // Bind scroll handler to ensure 'this' context is correct
    this._handleScroll = this._handleScroll.bind(this); 

    // Debounced check for vertical fit
    this._debouncedFitCheck = debounce(this._ensureFitsViewport.bind(this), 200);

    this._initialize();
  }

  /**
   * Checks if the document fits within the viewport vertically. If not, toggles a compact mode
   * which reduces paddings and spacing to try to fit content without vertical scrolling.
   */
  _ensureFitsViewport() {
    // Temporarily remove compact class to measure true content height without its influence
    document.documentElement.classList.remove('compact');
    
    const contentHeight = document.documentElement.scrollHeight;
    const viewHeight = window.innerHeight;
    const needsCompact = contentHeight > viewHeight;
    
    if (needsCompact) {
      document.documentElement.classList.add('compact');
    }
    // No 'else' needed as it was removed above.
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
   * Initializes the carousel: builds elements, sets up events, and initial state.
   */
  _initialize() {
    this.elements.year.textContent = new Date().getFullYear();
    this._checkReducedMotion(); // Check user preference for motion
    this._createParticles();
    this._buildCarousel();
    this._addEventListeners();
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

    // --- Theme toggle: initialize from localStorage or default to dark ---
    const saved = localStorage.getItem('bp_theme_mode');
    this.state.themeMode = saved === 'light' ? 'light' : 'dark';
    this._applyBaseTheme(this.state.themeMode);
    if (this.elements.themeToggle) {
      this.elements.themeToggle.setAttribute('aria-pressed', this.state.themeMode === 'light' ? 'true' : 'false');
      this.elements.themeToggle.setAttribute('aria-label', this.state.themeMode === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
      // update icon (simple sun for light, moon for dark)
      this._updateThemeToggleIcon();
    }
    // Ensure page fits viewport (may toggle compact mode)
    this._ensureFitsViewport();
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

    art.innerHTML = `
      <div class="thumb">
        <img loading="lazy" src="${p.img}" alt="${p.alt}">
      </div>
      <div class="body">
        <div class="title">
          <span class="dot ${p.status}"></span>
          <span class="status-badge ${p.status}" data-tooltip="" tabindex="0" role="img" aria-label="status"></span>
          ${p.title}
        </div>
        <p class="desc">${p.desc}</p>
        <div class="meta">
          <span class="tag">${p.tag}</span>
          ${p.href ? 
            // --- Robustness: Add rel="noopener noreferrer" for security on external links ---
            `<a class="link" href="${p.href}" target="_blank" rel="noopener noreferrer" aria-label="Open ${p.title} project">
              <span>Explore →</span>
            </a>` : 
            `<span class="link" aria-disabled="true"><span>Coming Soon</span></span>`
          }
        </div>
      </div>`;
    
    // Enhanced click handling: Only navigate carousel if a link within the card wasn't clicked
    art.addEventListener('click', (e) => {
      if (!e.target.closest('.link')) {
        this._scrollToSlide(index);
      }
    });
    
    // Set tooltip text and accessible label based on status
    const badge = art.querySelector('.status-badge');
    if (badge) {
      const map = { green: 'Live', yellow: 'Draft', red: 'In Progress' };
      const label = map[p.status] || 'Status';
      badge.setAttribute('data-tooltip', label);
      badge.setAttribute('aria-label', label);

      // Prevent badge interactions from bubbling and centering the card
      const stop = (e) => { e.stopPropagation(); };
      ['click','mousedown','pointerdown'].forEach(evt => badge.addEventListener(evt, stop));

      // Show floating tooltip on hover/focus; hide on leave/blur
      badge.addEventListener('mouseenter', (ev) => {
        this._showFloatingTooltip(label, ev.currentTarget);
      });
      badge.addEventListener('mouseleave', () => {
        this._hideFloatingTooltip();
      });
      badge.addEventListener('focus', (ev) => this._showFloatingTooltip(label, ev.currentTarget));
      badge.addEventListener('blur', () => this._hideFloatingTooltip());

      // For touch devices, toggle tooltip on tap (coarse pointers)
      badge.addEventListener('click', (ev) => {
        if (window.matchMedia('(pointer: coarse)').matches) {
          ev.stopPropagation();
          // If already visible for this element, hide it
          if (this._visibleBadge === badge) {
            this._hideFloatingTooltip();
          } else {
            this._showFloatingTooltip(label, badge);
          }
        }
      });
    }
    
    return art;
  }

  /**
   * Position and show the floating tooltip near a target element.
   * @param {string} text
   * @param {HTMLElement} target
   */
  _showFloatingTooltip(text, target) {
    if (!this._floatingTooltip || !target) return;
    this._floatingTooltip.textContent = text;
    const rect = target.getBoundingClientRect();
    const tip = this._floatingTooltip;
    // Position above the target, centered horizontally
    const left = rect.left + rect.width / 2;
    const top = rect.top - 8; // slight offset
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
    tip.style.transform = 'translate(-50%, 0)';
    tip.style.opacity = '1';
    tip.style.pointerEvents = 'none';
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
    window.addEventListener('resize', this._debouncedFitCheck);
    this.elements.track.addEventListener('scroll', this._handleScroll);
    this.elements.prevBtn.addEventListener('click', () => this._navigateCarousel(-1));
    this.elements.nextBtn.addEventListener('click', () => this._navigateCarousel(1));
    if (this.elements.themeToggle) {
      this.elements.themeToggle.addEventListener('click', () => {
        this.state.themeMode = this.state.themeMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('bp_theme_mode', this.state.themeMode);
        this._applyBaseTheme(this.state.themeMode);
        this.elements.themeToggle.setAttribute('aria-pressed', this.state.themeMode === 'light' ? 'true' : 'false');
        this.elements.themeToggle.setAttribute('aria-label', this.state.themeMode === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
        this._updateThemeToggleIcon();
      });
    }

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
  // Trigger hero animation with slight delay for smoother entrance
  setTimeout(() => {
    document.getElementById('hero').classList.add('loaded');
  }, 200);

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
  
  // Instantiate the carousel and attach to window for testing
  window.portfolioCarousel = new PortfolioCarousel(projectsData);
});
