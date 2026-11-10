/* ============================================================
   Samuel Tassew — Portfolio scripts
   - navbar border on scroll
   - active nav link
   - scroll reveal
   - screenshot lightbox (click to enlarge)
   - footer year
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  // --- Navbar: hairline border once the page is scrolled ---
  var nav = document.querySelector('.site-nav');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Highlight the nav link for the current page ---
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav .nav-link').forEach(function (link) {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // --- Close the mobile menu after tapping a link ---
  var collapseEl = document.getElementById('navMenu');
  if (collapseEl && window.bootstrap) {
    collapseEl.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (collapseEl.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
        }
      });
    });
  }

  // --- Scroll reveal ---
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // --- Lightbox for screenshots ---
  var triggers = document.querySelectorAll('[data-lightbox]');
  if (triggers.length) {
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Enlarged screenshot');
    box.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close enlarged image">&times;</button>' +
      '<img alt="" />';
    document.body.appendChild(box);
    var boxImg = box.querySelector('img');
    var closeBtn = box.querySelector('.lightbox-close');
    var lastTrigger = null;

    function open(trigger) {
      lastTrigger = trigger;
      var inner = trigger.querySelector('img');
      boxImg.src = trigger.getAttribute('data-lightbox');
      boxImg.alt = inner ? inner.alt : '';
      box.classList.add('open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }
    function close() {
      box.classList.remove('open');
      document.body.style.overflow = '';
      if (lastTrigger) lastTrigger.focus();
    }

    triggers.forEach(function (t) {
      t.addEventListener('click', function () { open(t); });
    });
    closeBtn.addEventListener('click', close);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && box.classList.contains('open')) close();
      if (e.key === 'Tab' && box.classList.contains('open')) { e.preventDefault(); closeBtn.focus(); }
    });
  }

  // --- Footer year ---
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
