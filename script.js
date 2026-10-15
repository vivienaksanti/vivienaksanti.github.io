(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.sh, .profil p, dl div, .job, .cell, .group, .lang-row, .cta-band > div');
  els.forEach(function (e) {
    e.classList.add('rv');
    var i = Array.prototype.indexOf.call(e.parentNode.children, e);
    e.style.setProperty('--d', (i % 6) * 0.08 + 's');
  });
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (x) {
        if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }
  var bar = document.createElement('div');
  bar.id = 'bar';
  document.body.appendChild(bar);
  var header = document.querySelector('header');
  var links = document.querySelectorAll('nav a');
  var sections = document.querySelectorAll('section[id]');
  var mb = document.querySelector('.menu-btn');
  function closeMenu() { header.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); mb.textContent = '☰'; }
  if (mb) {
    mb.addEventListener('click', function () {
      var o = header.classList.toggle('open');
      mb.setAttribute('aria-expanded', o ? 'true' : 'false');
      mb.textContent = o ? '✕' : '☰';
    });
    links.forEach(function (a) { a.addEventListener('click', closeMenu); });
  }
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    header.classList.toggle('scrolled', h.scrollTop > 10);
    var current = '';
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top <= 160) current = s.id;
    });
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
