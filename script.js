// Theme toggle with persistence
(function () {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const icon = document.querySelector('.theme-icon');

  const saved = localStorage.getItem('rd-theme');
  if (saved) root.setAttribute('data-theme', saved);
  updateIcon();

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('rd-theme', next);
    updateIcon();
  });

  function updateIcon() {
    icon.textContent = root.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  }

  // Smooth-scroll active nav highlight
  const links = document.querySelectorAll('.nav-links a');
  const sections = [...links].map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.style.color = 'var(--accent-a)';
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => obs.observe(s));

  // Fade-in on scroll
  const fade = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'none'; }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.card, .tl-item, .stat').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    fade.observe(el);
  });
})();
