// transition.js - controla transiciones entre páginas, menú móvil y reveal on scroll

// MENU TOGGLE (mobile)
const toggleBtn = document.querySelector('.menu-toggle');
const navEl = document.querySelector('nav');
if (toggleBtn && navEl) {
  toggleBtn.addEventListener('click', () => navEl.classList.toggle('active'));
}

// PAGE TRANSITIONS: intercept internal links and fade out current page before navigating
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');

  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href') || '';
    // only intercept same-origin (internal) links, and ignore anchor links
    if (href && !href.startsWith('#') && (a.hostname === window.location.hostname || href.endsWith('.html'))) {
      a.addEventListener('click', (e) => {
        // allow external target="_blank"
        if (a.target && a.target === '_blank') return;
        e.preventDefault();
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');
        setTimeout(() => { window.location.href = a.href; }, 380);
      });
    }
  });

  // scroll reveal
  const revealItems = document.querySelectorAll('section, .social-section, .bloque, .project, .skills-section');
  const revealOnScroll = () => {
    revealItems.forEach(el => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('section-visible');
        el.classList.remove('section-hidden');
      }
    });
  };
  // init hidden
  revealItems.forEach(el => el.classList.add('section-hidden'));
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('resize', revealOnScroll);
});