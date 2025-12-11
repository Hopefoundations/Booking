// Data (JSON-style) with image paths
const slides = [
  { id:'hamnet', title:'Hamnet', tag:'Now Playing', meta:'Now playing in select theaters', desc:'A moving reimagining of the story behind Shakespeare\'s most famous play.', img:'images/hamnet.png', primaryLabel:'Get Tickets' },
  { id:'song-sung-blue', title:'Song Sung Blue', tag:'Coming Soon', meta:'In theaters December 25', desc:'A heartfelt musical journey about love, loss, and second chances.', img:'images/song_sung_blue.png', primaryLabel:'Get Tickets' },
  { id:'bugonia', title:'Bugonia', tag:'In Theaters & At Home', meta:'Now playing and streaming', desc:'Darkly funny and thrilling, a story of power, privilege, and resistance.', img:'images/bugonia.png', primaryLabel:'Watch Now' }
];

const newsItems = [
  { tag:'Spotlight', title:'Winners of the Focus Features Student Short Film Showcase', meta:'Five emerging filmmakers honored at the Gotham Awards.', img:'images/song_sung_blue.png' },
  { tag:'Music', title:'Connecting to the Musical Pulse of Hamnet', meta:'Composer Max Richter discusses crafting the film\'s emotional soundscape.', img:'images/bugonia.png' },
  { tag:'Behind the Scenes', title:'From Page to Screen: Adapting the Beloved Novel', meta:'Author and screenwriter share the journey from idea to premiere.', img:'images/hamnet.png' }
];

const films = [
  { title:'Hamnet', status:'Now playing · Get tickets', img:'images/hamnet.png' },
  { title:'Song Sung Blue', status:'In theaters December 25', img:'images/song_sung_blue.png' },
  { title:'Bugonia', status:'Now playing · Watch at home', img:'images/bugonia.png' },
  { title:'Obsession', status:'In theaters May 15', img:'images/obsession.png' },
  { title:'Sense and Sensibility', status:'In theaters September 11', img:'images/sense_and_sensibility.png' }
];

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  // Intersection observer for reveal + nav active (home)
  const sections = document.querySelectorAll('[data-section]');
  const navLinks = document.querySelectorAll('header nav a');
  const observerOptions = { threshold: 0.35 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        if(id && page === 'home'){
          navLinks.forEach(link=>{ const href = link.getAttribute('href'); if(!href.startsWith('#')) return; const hrefId = href.replace('#',''); link.classList.toggle('active', hrefId === id); });
        }
      }
    });
  }, observerOptions);
  sections.forEach(s=>observer.observe(s));

  // set active nav per page (multi-page)
  navLinks.forEach(link=>{ const href = link.getAttribute('href'); if(href.endsWith(page + '.html')){ navLinks.forEach(l=>l.classList.remove('active')); link.classList.add('active'); } });

  if(page === 'home'){ setupHero(); renderNews(); renderFilms(); }
  if(page === 'news') renderNews();
  if(page === 'films') renderFilms();
});

// Hero slider
function setupHero(){
  let current = 0;
  const title = document.getElementById('heroTitle');
  const tag = document.getElementById('heroTag');
  const meta = document.getElementById('heroMeta');
  const desc = document.getElementById('heroDesc');
  const posterImg = document.getElementById('heroPosterImg');
  const label = document.getElementById('heroLabel');
  const primaryBtn = document.getElementById('heroPrimaryBtn');
  const dots = document.querySelectorAll('.dot');
  if(!title) return;

  function render(i){
    const s = slides[i];
    title.textContent = s.title;
    tag.textContent = s.tag;
    meta.textContent = s.meta;
    desc.textContent = s.desc;
    label.textContent = (i+1) + ' / ' + slides.length;
    primaryBtn.textContent = s.primaryLabel;
    posterImg.src = s.img;
    dots.forEach((d, idx)=>d.classList.toggle('active', idx===i));
  }

  dots.forEach(d=>{ d.addEventListener('click', ()=>{ current = Number(d.dataset.index); render(current); }); });

  setInterval(()=>{ current = (current+1) % slides.length; render(current); }, 6000);
  render(current);
}

// Render news
function renderNews(){
  const grid = document.getElementById('newsGrid');
  if(!grid) return;
  grid.innerHTML = '';
  newsItems.forEach(it=>{
    const card = document.createElement('article');
    card.className = 'news-card';
    card.innerHTML = `<img src="${it.img}" alt="" /><div class="news-body"><div class="news-tag">${it.tag}</div><h3 class="news-title">${it.title}</h3><p class="news-meta">${it.meta}</p></div>`;
    grid.appendChild(card);
  });
}

// Render films
function renderFilms(){
  const row = document.getElementById('filmRow');
  if(!row) return;
  row.innerHTML = '';
  films.forEach(f=>{
    const card = document.createElement('article');
    card.className = 'film-card';
    card.innerHTML = `<img src="${f.img}" alt="" /><div class="film-body"><h3 class="film-title">${f.title}</h3><p class="film-meta">${f.status}</p></div>`;
    row.appendChild(card);
  });
}
