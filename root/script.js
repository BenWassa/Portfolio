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

  const track = document.createElement('div'); track.className = 'cg-track';
  container.appendChild(track);

  // create items
  const items = projects.map((p,i) => {
    const el = document.createElement('div'); el.className = 'cg-item';
    const a = document.createElement('a'); a.className = 'cg-card'; a.href = p.url; a.textContent = p.title; a.target = '_blank';
    el.appendChild(a); track.appendChild(el);
    return { el, data: p };
  });

  function layout(){
    const r = container.getBoundingClientRect();
    const cx = r.width/2, cy = r.height/2; const radius = Math.min(cx,cy)*0.65;
    items.forEach((it, idx) =>{
      const t = (idx / items.length) * Math.PI * 2;
      const x = Math.cos(t)*radius; const y = Math.sin(t)*radius;
      it.el.style.left = (cx + x) + 'px';
      it.el.style.top = (cy + y) + 'px';
      it.el.style.transform = 'translate(-50%,-50%)';
    });
  }

  // simple drag to rotate (adjusts track rotation)
  let dragging=false,lastX=0,target=0,angle=0;
  container.addEventListener('mousedown',(e)=>{ dragging=true; lastX=e.clientX; });
  window.addEventListener('mouseup',()=>dragging=false);
  window.addEventListener('mousemove',(e)=>{ if(!dragging) return; const dx=e.clientX-lastX; lastX=e.clientX; target+=dx*0.01; });

  function raf(){ angle += (target-angle)*0.08; track.style.transform = `translate(-50%,-50%) rotate(${angle}rad)`; requestAnimationFrame(raf); }
  raf();

  window.addEventListener('resize', layout); layout();

  // click handlers for details
  items.forEach(it => {
    it.el.addEventListener('contextmenu', (e)=>{ e.preventDefault(); showDetails(it.data); });
    it.el.addEventListener('click',(e)=>{ if(e.shiftKey) showDetails(it.data); });
  });

  function showDetails(p){ modalTitle.textContent = p.title; modalContent.innerHTML = `<p>${p.desc}</p><p><a href="${p.url}" target="_blank">Visit site →</a></p>`; modal.style.display='flex'; modal.setAttribute('aria-hidden','false'); }
  function closeModal(){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
  viewAllBtn.addEventListener('click', ()=>{
    modalTitle.textContent = 'All Projects'; modalContent.innerHTML = projects.map(p=>`<div style="margin-bottom:10px"><strong>${p.title}</strong><div>${p.desc}</div><a href="${p.url}" target="_blank">Visit →</a></div>`).join(''); modal.style.display='flex'; modal.setAttribute('aria-hidden','false');
  });

  themeToggle.addEventListener('click', ()=>{ document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light'; });

})();
