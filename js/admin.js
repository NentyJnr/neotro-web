let projects = [];

function escapeHtml(s){
  return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function renderList(){
  const list = document.getElementById('list');
  if(!projects.length){
    list.innerHTML = '<p style="color:var(--steel);font-size:.9rem">No projects yet.</p>';
    return;
  }
  list.innerHTML = projects.map((p, i) => `
    <div class="list-item">
      <div class="meta">
        <b>${escapeHtml(p.name)}</b>
        <span>${escapeHtml(p.tag || 'No category')}${p.link ? ' · ' + escapeHtml(p.link) : ''}</span>
      </div>
      <div class="list-actions">
        <button class="danger" data-remove="${i}">Remove</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      projects.splice(Number(btn.dataset.remove), 1);
      renderList();
    });
  });
}

function showMsg(text, isErr){
  const el = document.getElementById('formMsg');
  el.textContent = text;
  el.className = 'msg ' + (isErr ? 'err' : 'ok');
}

async function loadDefault(){
  try{
    const res = await fetch('data/projects.json', {cache:'no-store'});
    projects = await res.json();
  }catch(e){
    projects = [];
  }
  renderList();
}

document.getElementById('projectForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const p = {
    name: document.getElementById('pName').value.trim(),
    tag: document.getElementById('pTag').value.trim(),
    desc: document.getElementById('pDesc').value.trim(),
    img: document.getElementById('pImg').value.trim(),
    link: document.getElementById('pLink').value.trim()
  };
  if(!p.name || !p.desc) return;
  projects.unshift(p);
  renderList();
  showMsg('Added — remember to export and redeploy to publish it.', false);
  e.target.reset();
});

document.getElementById('fileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if(!file) return;
  try{
    const text = await file.text();
    const parsed = JSON.parse(text);
    if(!Array.isArray(parsed)) throw new Error('not an array');
    projects = parsed;
    renderList();
    showMsg('Loaded ' + parsed.length + ' project(s) from file.', false);
  }catch(err){
    showMsg('Could not read that file — make sure it\'s a valid projects.json export.', true);
  }
});

document.getElementById('exportBtn').addEventListener('click', () => {
  downloadJson(projects, 'projects.json');
});

function downloadJson(data, filename){
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* --- testimonials --- */
let testimonials = [];

function renderTList(){
  const list = document.getElementById('tList');
  if(!testimonials.length){
    list.innerHTML = '<p style="color:var(--steel);font-size:.9rem">No testimonials yet.</p>';
    return;
  }
  list.innerHTML = testimonials.map((t, i) => `
    <div class="list-item">
      <div class="meta">
        <b>${escapeHtml(t.name)}</b>
        <span>${escapeHtml(t.role || '')} — "${escapeHtml((t.quote || '').slice(0, 60))}${(t.quote || '').length > 60 ? '…' : ''}"</span>
      </div>
      <div class="list-actions">
        <button class="danger" data-tremove="${i}">Remove</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('[data-tremove]').forEach(btn => {
    btn.addEventListener('click', () => {
      testimonials.splice(Number(btn.dataset.tremove), 1);
      renderTList();
    });
  });
}

function showTMsg(text, isErr){
  const el = document.getElementById('testimonialMsg');
  el.textContent = text;
  el.className = 'msg ' + (isErr ? 'err' : 'ok');
}

async function loadTDefault(){
  try{
    const res = await fetch('data/testimonials.json', {cache:'no-store'});
    testimonials = await res.json();
  }catch(e){
    testimonials = [];
  }
  renderTList();
}

document.getElementById('testimonialForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const t = {
    name: document.getElementById('tName').value.trim(),
    role: document.getElementById('tRole').value.trim(),
    quote: document.getElementById('tQuote').value.trim(),
    rating: Number(document.getElementById('tRating').value) || 5
  };
  if(!t.name || !t.quote) return;
  testimonials.unshift(t);
  renderTList();
  showTMsg('Added — remember to export and redeploy to publish it.', false);
  e.target.reset();
  document.getElementById('tRating').value = 5;
});

document.getElementById('tFileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if(!file) return;
  try{
    const text = await file.text();
    const parsed = JSON.parse(text);
    if(!Array.isArray(parsed)) throw new Error('not an array');
    testimonials = parsed;
    renderTList();
    showTMsg('Loaded ' + parsed.length + ' testimonial(s) from file.', false);
  }catch(err){
    showTMsg('Could not read that file — make sure it\'s a valid testimonials.json export.', true);
  }
});

document.getElementById('tExportBtn').addEventListener('click', () => {
  downloadJson(testimonials, 'testimonials.json');
});

loadDefault();
loadTDefault();
