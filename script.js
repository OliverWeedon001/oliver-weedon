// Scroll-triggered reveal for sections and cards.
// Respects prefers-reduced-motion — if set, everything is shown immediately.

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealTargets = document.querySelectorAll('.reveal');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach(el => el.classList.add('in'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => observer.observe(el));
}

// Highlight the active nav link based on scroll position.
const sections = document.querySelectorAll('main section[id], header[id]');
const navLinks = document.querySelectorAll('.ruler-links a');

if ('IntersectionObserver' in window && sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.ruler-links a[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.style.color = '');
        link.style.color = 'var(--orange)';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));
}
