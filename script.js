// year in footer
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

// contact form "fake send"
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('status');
    status.textContent = 'Thanks! Your message was sent.';
    form.reset();
  });
}
// header shadow on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 4) {
    header.style.boxShadow = '0 1px 12px rgba(0,0,0,.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});
// === Dark mode toggle with persistence ===
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');

// apply saved theme on load (light/dark)
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  root.classList.add('dark');
}

if (toggle) {
  // set initial icon text based on current state
  toggle.textContent = root.classList.contains('dark') ? '🌞' : '🌓';

  toggle.addEventListener('click', () => {
    root.classList.toggle('dark');
    const mode = root.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
    toggle.textContent = mode === 'dark' ? '🌞' : '🌓';

    // optional: update theme-color meta (for mobile address bar color)
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', mode === 'dark' ? '#0f1115' : '#2e7dff');
    }
  });
}

// === Mobile hamburger menu ===
const menuBtn = document.getElementById('menuToggle');
const nav = document.querySelector('.site-nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    // optional: change icon
    menuBtn.textContent = isOpen ? '✕' : '☰';
  });
}
// === Project details modal ===
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(title, body) {
  if (!modal) return;
  modalTitle.textContent = title || 'Details';
  modalBody.textContent = body || '';
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// open buttons
document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(btn.dataset.title, btn.dataset.body);
  });
});

// close on X or backdrop or ESC
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
  });
}
// === Nav active link (aria-current + class) ===
const currentPath = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a').forEach(a => {
  const href = a.getAttribute('href');
  // normalize relative paths to filename only
  const file = href.split('/').pop();
  if (file === currentPath) {
    a.classList.add('active');
    a.setAttribute('aria-current', 'page');
  } else {
    a.classList.remove('active');
    a.removeAttribute('aria-current');
  }
});

// after successful fake send
if (status) {
  status.textContent = 'Thanks! Your message was sent.';
  // optional redirect after a short delay
  setTimeout(() => { window.location.href = 'thanks.html'; }, 800);
}
