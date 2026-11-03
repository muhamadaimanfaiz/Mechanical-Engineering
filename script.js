// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Mobile menu ----------
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('is-open')));

// ---------- Photo placeholders ----------
// If an <img data-placeholder="..."> file doesn't exist yet, show a friendly placeholder box instead.
function makePlaceholder(img) {
  const ph = document.createElement('div');
  ph.className = 'ph ' + img.className;
  ph.textContent = img.dataset.placeholder || 'Add a photo';
  img.replaceWith(ph);
}
document.querySelectorAll('img[data-placeholder]').forEach(img => {
  if (img.complete && img.naturalWidth === 0) makePlaceholder(img);
  else img.addEventListener('error', () => makePlaceholder(img));
});

// ---------- Experience tabs ----------
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('is-active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('is-active'));
    tab.classList.add('is-active');
    document.getElementById('panel-' + tab.dataset.tab).classList.add('is-active');
  });
});

// ---------- Gallery: clicking a thumbnail swaps it with the main image ----------
document.querySelectorAll('.gallery').forEach(g => {
  const main = g.querySelector('.gallery__main');
  g.querySelectorAll('.gallery__thumbs img').forEach(t => {
    t.addEventListener('click', () => {
      const [src, alt] = [main.src, main.alt];
      main.src = t.src; main.alt = t.alt;
      t.src = src; t.alt = alt;
    });
  });
});

// ---------- Lightbox ----------
const lb = document.querySelector('.lightbox');
const lbImg = lb.querySelector('img');
const lbCap = lb.querySelector('.lightbox__cap');
document.addEventListener('click', e => {
  const img = e.target.closest('.gallery__main, .card > img, .exp__photos img, .tl--photo img, .story__photos img, .hero__collage img');
  if (!img) return;
  lbImg.src = img.src; lbImg.alt = img.alt; lbCap.textContent = img.alt;
  lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
});
function closeLb() { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); }
lb.addEventListener('click', e => { if (e.target !== lbImg) closeLb(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
