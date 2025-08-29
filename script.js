// Project data - customize this with your actual projects
const projects = {
    project1: {
        title: "Landing Page",
        url: "https://yourusername.github.io/landing-page",
        inspiration: "Modern SaaS landing pages with clean typography and bold gradients",
        purpose: "To create a compelling first impression for a fictional startup",
        audience: "Tech-savvy professionals and potential investors",
        tech: "HTML, CSS, JavaScript with animations"
    },
    project2: {
        title: "Dashboard",
        url: "https://yourusername.github.io/dashboard",
        inspiration: "Data visualization platforms like Tableau and modern admin panels",
        purpose: "Demonstrate data visualization and UI component skills",
        audience: "Data analysts and business users",
        tech: "React, Chart.js, responsive design"
    },
    project3: {
        title: "Game",
        url: "https://yourusername.github.io/game",
        inspiration: "Classic arcade games with modern web technologies",
        purpose: "Explore game development and interactive animations",
        audience: "Casual gamers and developers",
        tech: "JavaScript, Canvas API, game loops"
    },
    project4: {
        title: "Mobile App",
        url: "https://yourusername.github.io/mobile-app",
        inspiration: "iOS and Android design systems",
        purpose: "Practice responsive design and mobile-first approach",
        audience: "Mobile users and app enthusiasts",
        tech: "Progressive Web App, Touch interactions"
    },
    project5: {
        title: "Art Gallery",
        url: "https://yourusername.github.io/art-gallery",
        inspiration: "Museum websites and photography portfolios",
        purpose: "Showcase visual content with elegant presentation",
        audience: "Artists, designers, and art enthusiasts",
        tech: "CSS Grid, Image optimization, Lazy loading"
    }
};

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);

    // Add a subtle animation to the lightbulb
    const lightbulb = document.querySelector('.lightbulb');
    if (lightbulb) {
        lightbulb.style.transform = 'scale(1.2)';
        setTimeout(() => {
            lightbulb.style.transform = 'scale(1)';
        }, 200);
    }
}

// Site item click handlers
document.addEventListener('DOMContentLoaded', function() {
    const siteItems = document.querySelectorAll('.site-item');
    
    siteItems.forEach(item => {
        item.addEventListener('click', function() {
            const siteId = this.getAttribute('data-site');
            const project = projects[siteId];
            
            if (project) {
                // Open the actual site
                window.open(project.url, '_blank');
            }
        });

        // Add right-click for details
        item.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            const siteId = this.getAttribute('data-site');
            showProjectDetails(siteId);
        });

        // Add double-click for details on mobile
        let tapCount = 0;
        item.addEventListener('touchend', function(e) {
            tapCount++;
            if (tapCount === 1) {
                setTimeout(() => {
                    if (tapCount === 1) {
                        // Single tap - open site
                        const siteId = this.getAttribute('data-site');
                        const project = projects[siteId];
                        if (project) {
                            window.open(project.url, '_blank');
                        }
                    } else {
                        // Double tap - show details
                        const siteId = this.getAttribute('data-site');
                        showProjectDetails(siteId);
                    }
                    tapCount = 0;
                }, 300);
            }
        });
    });
});

function showProjectDetails(projectId) {
    const project = projects[projectId];
    if (!project) return;

    const modal = document.getElementById('detailsModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');

    title.textContent = project.title;
    content.innerHTML = `
        <div class="details-section">
            <div class="section-title">Inspiration</div>
            <div class="section-content">${project.inspiration}</div>
        </div>
        <div class="details-section">
            <div class="section-title">Purpose</div>
            <div class="section-content">${project.purpose}</div>
        </div>
        <div class="details-section">
            <div class="section-title">Target Audience</div>
            <div class="section-content">${project.audience}</div>
        </div>
        <div class="details-section">
            <div class="section-title">Technologies</div>
            <div class="section-content">${project.tech}</div>
        </div>
        <div class="details-section">
            <a href="${project.url}" target="_blank" class="btn" style="margin-top: 1rem;">
                Visit Site →
            </a>
        </div>
    `;

    modal.style.display = 'flex';
}

function showAllDetails() {
    const modal = document.getElementById('detailsModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');

    title.textContent = 'All Projects';
    
    let allProjectsHTML = '';
    Object.entries(projects).forEach(([id, project]) => {
        allProjectsHTML += `
            <div class="details-section" style="border-bottom: 1px solid var(--border); padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
                <div class="section-title">${project.title}</div>
                <div class="section-content" style="margin-bottom: 0.5rem;">${project.purpose}</div>
                <a href="${project.url}" target="_blank" class="btn" style="font-size: 0.8rem; padding: 0.5rem 1rem;">
                    Visit →
                </a>
            </div>
        `;
    });

    content.innerHTML = allProjectsHTML;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
document.addEventListener('click', function (e) {
    const modal = document.getElementById('detailsModal');
    if (!modal) return;
    if (e.target === modal) closeModal();
});

// Add smooth entrance animations
window.addEventListener('load', function() {
    const siteItems = document.querySelectorAll('.site-item');
    siteItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform += ' scale(0.8)';
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = item.style.transform.replace('scale(0.8)', 'scale(1)');
        }, 200 + (index * 100));
    });
});

// Export projects for potential use in other scripts or tests
if (typeof module !== 'undefined') module.exports = { projects };
