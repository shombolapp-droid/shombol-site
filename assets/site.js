/* Shombol shared page script: menu, back to top, remembered language. */
(function () {
  'use strict';
  var menuBtn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); }
    });
  }
  var toTop = document.getElementById('toTop');
  if (toTop) {
    var onScroll = function () { toTop.classList.toggle('show', (window.scrollY || window.pageYOffset) > 900); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }
  /* The language switch is a plain link; remember the choice so the home page opens in the same language. */
  document.querySelectorAll('.lang a[hreflang]').forEach(function (a) {
    a.addEventListener('click', function () { try { localStorage.setItem('shombol-lang', a.getAttribute('hreflang')); } catch (e) {} });
  });
  try { localStorage.setItem('shombol-lang', document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'bn'); } catch (e) {}
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
