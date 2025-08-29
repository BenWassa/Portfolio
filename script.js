/* Simple CircularGallery: minimal, centered, functional */

const DEFAULT_ITEMS = [
    { title: 'Landing Page', url: '#' },
    { title: 'Dashboard', url: '#' },
    { title: 'Game', url: '#' },
    { title: 'Mobile App', url: '#' },
    { title: 'Art Gallery', url: '#' }
];

export default class CircularGallery {
    constructor(container, opts = {}) {
        this.container = container;
        this.opts = Object.assign({ bend: 3, textColor: '#fff', borderRadius: 0.05, scrollEase: 0.08, items: DEFAULT_ITEMS }, opts);
        this.items = [];
        this._angle = 0;
        this._target = 0;
        this._drag = false;
        this._lastX = 0;
        this._init();
    }

    _init() {
        this.container.innerHTML = '';
        this.track = document.createElement('div');
        this.track.className = 'cg-track';
        this.container.appendChild(this.track);

        this._create();
        this._bind();
        this._resize();
        requestAnimationFrame(() => this._tick());
    }

    _create() {
        const items = this.opts.items;
        items.forEach((it, i) => {
            const item = document.createElement('div');
            item.className = 'cg-item';
            const card = document.createElement('a');
            card.className = 'cg-card';
            card.textContent = it.title;
            card.href = it.url || '#';
            card.target = '_blank';
            card.style.color = this.opts.textColor;
            card.style.borderRadius = `${this.opts.borderRadius * 100}%`;
            item.appendChild(card);
            this.track.appendChild(item);
            this.items.push(item);
        });
    }

    _bind() {
        this.container.addEventListener('mousedown', (e) => this._down(e));
        window.addEventListener('mouseup', () => this._up());
        window.addEventListener('mousemove', (e) => this._move(e));
        // touch
        this.container.addEventListener('touchstart', (e) => this._down(e.touches[0]));
        window.addEventListener('touchend', () => this._up());
        window.addEventListener('touchmove', (e) => this._move(e.touches[0]));

        window.addEventListener('resize', () => this._resize());

        const viewAll = document.getElementById('viewAllBtn');
        if (viewAll) viewAll.addEventListener('click', () => this._showAll());

        const closeBtn = document.getElementById('closeModalBtn');
        if (closeBtn) closeBtn.addEventListener('click', () => this._closeModal());

        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.addEventListener('click', () => this._toggleTheme());
    }

    _down(e) {
        this._drag = true;
        this._lastX = e.clientX;
    }

    _up() { this._drag = false; }

    _move(e) {
        if (!this._drag) return;
        const dx = e.clientX - this._lastX;
        this._lastX = e.clientX;
        this._target += dx * 0.01; // sensitivity
    }

    _resize() {
        const r = this.container.getBoundingClientRect();
        this.cx = r.width / 2;
        this.cy = r.height / 2;
        this.radius = Math.min(this.cx, this.cy) * 0.6;
        this._layout();
    }

    _layout() {
        const count = this.items.length;
        for (let i = 0; i < count; i++) {
            const t = (i / count) * Math.PI * 2;
            const x = this.cx + Math.cos(t) * this.radius;
            const y = this.cy + Math.sin(t) * this.radius;
            const el = this.items[i];
            el.style.position = 'absolute';
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
            el.style.transform = 'translate(-50%, -50%)';
        }
    }

    _tick() {
        const ease = this.opts.scrollEase;
        this._angle += (this._target - this._angle) * ease;
        this.track.style.transform = `translate(-50%, -50%) translate(${this.cx}px, ${this.cy}px) rotate(${this._angle}rad)`;
        this.track.style.transformOrigin = 'center center';
        requestAnimationFrame(() => this._tick());
    }

    _showAll() {
        const modal = document.getElementById('detailsModal');
        const title = document.getElementById('modalTitle');
        const content = document.getElementById('modalContent');
        if (!modal || !title || !content) return;
        title.textContent = 'All Projects';
        content.innerHTML = '';
        this.items.forEach(it => {
            const a = it.querySelector('a');
            const div = document.createElement('div');
            div.innerHTML = `<div style="margin-bottom:8px"><strong>${a.textContent}</strong> — <a href="${a.href}" target="_blank">Visit</a></div>`;
            content.appendChild(div);
        });
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
    }

    _closeModal() {
        const modal = document.getElementById('detailsModal');
        if (!modal) return;
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }

    _toggleTheme() {
        const b = document.body;
        b.setAttribute('data-theme', b.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    }
}

// Auto-mount
const mount = document.getElementById('circularGallery');
if (mount) new CircularGallery(mount, { bend: 3, textColor: '#fff', borderRadius: 0.05, scrollEase: 0.08 });


