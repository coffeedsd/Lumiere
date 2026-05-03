/* ─── THEME TOGGLE ───────────────────────────────────────── */
const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

const saved = localStorage.getItem('lumiere-theme') || 'light';
html.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('lumiere-theme', next);
});

/* ─── NAV SCROLL ─────────────────────────────────────────── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── MOBILE MENU ────────────────────────────────────────── */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose  = document.getElementById('menuClose');

function openMenu() {
  mobileMenu.classList.add('open');
  burger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  burger.classList.remove('open');
  document.body.style.overflow = '';
}

burger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);

mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ─── REVEAL ON SCROLL ───────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => observer.observe(el));

/* ─── SMOOTH SCROLL ──────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + 16;
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: 'smooth'
    });
  });
});
