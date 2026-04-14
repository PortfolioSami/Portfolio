/* ============================================
   Portfolio Website — JavaScript
   Handles navbar scroll effect, animations,
   and form behavior.
   ============================================ */

// --- Navbar: add shadow on scroll ---
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// --- Scroll fade-in animation ---
// Elements with class "fade-in" become visible when scrolled into view
document.addEventListener('DOMContentLoaded', function () {
  const faders = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // only animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  faders.forEach(function (el) {
    observer.observe(el);
  });
});

// --- Contact form handler (UI only — does not actually submit) ---
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('formToast');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // prevent real submission

      // Show a Bootstrap toast as confirmation
      if (toast) {
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
      }

      form.reset();
    });
  }
});

// --- Active nav link highlighting based on current page ---
document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
});
