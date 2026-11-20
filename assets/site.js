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
  /* Share row: copy link and the phone's share sheet; the other buttons are plain links. */
  document.querySelectorAll('.share').forEach(function (box) {
    var base = box.getAttribute('data-share-url'), title = box.getAttribute('data-share-title');
    var status = box.querySelector('.share-status');
    var link = function (src) { return base + '?utm_source=' + src + '&utm_medium=share'; };
    var copy = box.querySelector('[data-share-copy]');
    if (copy) copy.addEventListener('click', function () {
      var url = link('copy');
      var done = function () { status.textContent = copy.getAttribute('data-copied'); };
      var manual = function () { status.textContent = copy.getAttribute('data-fail') + url; };
      try { navigator.clipboard.writeText(title + ' ' + url).then(done, manual); } catch (e) { manual(); }
    });
    var nat = box.querySelector('[data-share-native]');
    if (nat && navigator.share) {
      nat.hidden = false;
      nat.addEventListener('click', function () { navigator.share({ title: title, url: link('share') }).catch(function () {}); });
    }
  });
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
