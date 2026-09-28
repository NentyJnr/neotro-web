function initials(name){
  return name.split(/\s+/).slice(0,2).map(w => w[0]).join('').toUpperCase();
}

function escapeHtml(s){
  return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function renderGrid(items){
  const grid = document.getElementById('projectGrid');
  if(!grid) return;
  if(!items.length){
    grid.innerHTML = '<div class="empty">No projects yet.</div>';
    return;
  }
  const statEl = document.getElementById('statCount');
  if(statEl) statEl.textContent = items.length + '+';

  grid.innerHTML = items.map(p => `
    <div class="card">
      ${p.img ? `<img class="img" src="${escapeHtml(p.img)}" alt="${escapeHtml(p.name)}" loading="lazy"/>` : `<div class="ph">${escapeHtml(initials(p.name))}</div>`}
      <div class="body">
        <h3>${escapeHtml(p.name)}</h3>
        <p>${escapeHtml(p.desc)}</p>
        <div class="row">
          <span class="tag">${escapeHtml(p.tag || '')}</span>
          ${p.link ? `<a class="go" href="${escapeHtml(p.link)}" target="_blank" rel="noopener noreferrer">View ↗</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

async function loadProjects(){
  try{
    const res = await fetch('data/projects.json', {cache:'no-store'});
    const items = await res.json();
    renderGrid(items);
  }catch(e){
    renderGrid([]);
  }
}

function renderTestimonials(items){
  const grid = document.getElementById('testimonialGrid');
  if(!grid) return;
  if(!items.length){
    grid.innerHTML = '<div class="empty">Reviews are on their way — check back soon.</div>';
    return;
  }
  grid.innerHTML = items.map(t => `
    <div class="tcard">
      <div class="stars">${'★'.repeat(Math.max(1, Math.min(5, t.rating || 5)))}</div>
      <p>"${escapeHtml(t.quote)}"</p>
      <div class="who"><b>${escapeHtml(t.name)}</b>${t.role ? ' · ' + escapeHtml(t.role) : ''}</div>
    </div>
  `).join('');
}

async function loadTestimonials(){
  try{
    const res = await fetch('data/testimonials.json', {cache:'no-store'});
    const items = await res.json();
    renderTestimonials(items);
  }catch(e){
    renderTestimonials([]);
  }
}

const menuBtn = document.getElementById('menuBtn');
if(menuBtn){
  menuBtn.addEventListener('click', function(){
    const m = document.getElementById('mnav');
    const open = m.classList.toggle('open');
    this.setAttribute('aria-expanded', open);
  });
}

loadProjects();
loadTestimonials();
