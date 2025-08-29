// Simple modular circular gallery script
(function(){
  const projects = [
    { id: 'p1', title: 'Project One', url: '#', desc: 'Placeholder project one description.' },
    { id: 'p2', title: 'Project Two', url: '#', desc: 'Placeholder project two description.' },
    { id: 'p3', title: 'Project Three', url: '#', desc: 'Placeholder project three description.' },
    { id: 'p4', title: 'Project Four', url: '#', desc: 'Placeholder project four description.' }
  ];

  const container = document.getElementById('gallery');
  const modal = document.getElementById('detailsModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const viewAllBtn = document.getElementById('viewAllBtn');
  const themeToggle = document.getElementById('themeToggle');

  if (!container) return;

  // create horizontal track
  const track = document.createElement('div'); track.className = 'cg-track';
  container.appendChild(track);

  // create items
  const items = projects.map((p) => {
    const el = document.createElement('div'); el.className = 'cg-item';
    const a = document.createElement('a'); a.className = 'cg-card'; a.href = p.url; a.textContent = p.title; a.target = '_blank';
    el.appendChild(a); track.appendChild(el);
    // context menu to open details
    el.addEventListener('contextmenu', (e) => { e.preventDefault(); showDetails(p); });
    // shift+click to show details
    el.addEventListener('click', (e) => { if (e.shiftKey) showDetails(p); });
    return { el, data: p };
  });

  // pointer drag to scroll
  let isDown = false, startX = 0, scrollLeft = 0;
  track.addEventListener('pointerdown', (e) => {
    isDown = true;
    track.setPointerCapture(e.pointerId);
    startX = e.clientX;
    scrollLeft = track.scrollLeft;
    track.classList.add('dragging');
  });
  track.addEventListener('pointerup', (e) => {
    isDown = false;
    try { track.releasePointerCapture(e.pointerId); } catch (err) {}
    track.classList.remove('dragging');
  });
  track.addEventListener('pointercancel', () => { isDown = false; track.classList.remove('dragging'); });
  track.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    track.scrollLeft = scrollLeft - dx;
  });

  // simple keyboard focus: arrow keys to scroll
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') track.scrollBy({ left: 200, behavior: 'smooth' });
    if (e.key === 'ArrowLeft') track.scrollBy({ left: -200, behavior: 'smooth' });
  });

  // modal functions
  function showDetails(p){
    modalTitle.textContent = p.title;
    modalContent.innerHTML = `<p>${p.desc}</p><p><a href="${p.url}" target="_blank">Visit site →</a></p>`;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){ modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); }

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  viewAllBtn.addEventListener('click', () => {
    modalTitle.textContent = 'All Projects';
    modalContent.innerHTML = projects.map(p => `<div style="margin-bottom:10px"><strong>${p.title}</strong><div>${p.desc}</div><a href="${p.url}" target="_blank">Visit →</a></div>`).join('');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
  });

  themeToggle.addEventListener('click', ()=>{ document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light'; });

})();
