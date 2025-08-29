/*
 * CircularGallery ES module
 * Exports default CircularGallery class and auto-mounts when a #circularGallery element exists
 * Props supported: bend (number), textColor (string), borderRadius (0-1), scrollEase (0-1)
 */

const projects = {
    project1: { title: 'Landing Page', url: 'https://yourusername.github.io/landing-page' },
    project2: { title: 'Dashboard', url: 'https://yourusername.github.io/dashboard' },
    project3: { title: 'Game', url: 'https://yourusername.github.io/game' },
    project4: { title: 'Mobile App', url: 'https://yourusername.github.io/mobile-app' },
    project5: { title: 'Art Gallery', url: 'https://yourusername.github.io/art-gallery' }
};

class CircularGallery {
    constructor(container, options = {}) {
        this.container = container;
        this.options = Object.assign({
            bend: 3,
            textColor: '#ffffff',
            borderRadius: 0.05,
            scrollEase: 0.02,
            items: Object.values(projects)
        }, options);

        this.state = {
            angle: 0,
            targetAngle: 0,
            dragging: false,
            lastX: 0,
        };

        this.init();
    }

    init() {
        this.container.classList.add('circular-gallery');
        this.track = document.createElement('div');
        this.track.className = 'cg-track';
        this.container.appendChild(this.track);

        this.createItems();
        this.attachEvents();
        this.raf();
    }

    createItems() {
        const { items } = this.options;
        this.items = items.map((it, i) => {
            const el = document.createElement('div');
            el.className = 'cg-item';
            el.dataset.index = i;

            const card = document.createElement('a');
            card.className = 'cg-card';
            card.href = it.url || '#';
            card.target = '_blank';
            card.textContent = it.title || `Item ${i + 1}`;
            card.style.color = this.options.textColor;
            card.style.borderRadius = `${this.options.borderRadius * 100}%`;

            el.appendChild(card);
            this.track.appendChild(el);
            return { el, card, data: it };
        });

        this.layoutItems();
    }

    layoutItems() {
        const rect = this.container.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const radius = Math.min(cx, cy) * 0.75;
        const bend = this.options.bend;
        const count = this.items.length;

        this.items.forEach((it, i) => {
            const t = (i / count) * Math.PI * 2;
            // bend influences the effective radius per item
            const bx = Math.cos(t) * radius * (1 + Math.sin(t) / bend);
            const by = Math.sin(t) * radius * (1 - Math.cos(t) / bend);

            it.angle = t;
            it.x = cx + bx;
            it.y = cy + by;
            it.el.style.transform = `translate(-50%, -50%) translate(${it.x}px, ${it.y}px)`;
        });
    }

    attachEvents() {
        this.container.addEventListener('mousedown', this.onDown.bind(this));
        window.addEventListener('mouseup', this.onUp.bind(this));
        window.addEventListener('mousemove', this.onMove.bind(this));

        // touch handlers
        this.container.addEventListener('touchstart', (e) => this.onDown(e.touches[0]));
        window.addEventListener('touchend', (e) => this.onUp(e.changedTouches ? e.changedTouches[0] : e));
        window.addEventListener('touchmove', (e) => this.onMove(e.touches[0]));

        // window resize
        window.addEventListener('resize', () => this.layoutItems());

        // wire buttons and modal
        const viewAll = document.getElementById('viewAllBtn');
        if (viewAll) viewAll.addEventListener('click', () => this.showAll());

        const closeBtn = document.getElementById('closeModalBtn');
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());

        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    onDown(e) {
        this.state.dragging = true;
        this.state.lastX = e.clientX;
    }

    onUp() {
        this.state.dragging = false;
    }

    onMove(e) {
        if (!this.state.dragging) return;
        const dx = e.clientX - this.state.lastX;
        this.state.lastX = e.clientX;
        // convert horizontal drag to target angle change
        this.state.targetAngle += dx * 0.01; // sensitivity
    }

    raf() {
        const ease = this.options.scrollEase;
        this.state.angle += (this.state.targetAngle - this.state.angle) * ease;
        this.track.style.transform = `rotate(${this.state.angle}rad)`;
        requestAnimationFrame(() => this.raf());
    }

    showAll() {
        const modal = document.getElementById('detailsModal');
        const title = document.getElementById('modalTitle');
        const content = document.getElementById('modalContent');
        if (!modal || !title || !content) return;
        title.textContent = 'All Projects';
        let html = '';
        this.items.forEach(it => {
            html += `<div style="margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
                <div style="font-weight:600">${it.data.title}</div>
                <a href="${it.data.url}" target="_blank" style="color:var(--accent)">Visit →</a>
            </div>`;
        });
        content.innerHTML = html;
        modal.style.display = 'flex';
    }

    closeModal() {
        const modal = document.getElementById('detailsModal');
        if (modal) modal.style.display = 'none';
    }

    toggleTheme() {
        const body = document.body;
        const current = body.getAttribute('data-theme');
        body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    }
}

export default CircularGallery;

// Auto-mount when #circularGallery exists
const mountPoint = document.getElementById('circularGallery');
if (mountPoint) {
    // default options mirror user's usage example
    const gallery = new CircularGallery(mountPoint, { bend: 3, textColor: '#ffffff', borderRadius: 0.05, scrollEase: 0.02 });
    // expose for debugging
    window.CircularGallery = CircularGallery;
}

