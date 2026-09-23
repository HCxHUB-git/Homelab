// Minimal enhancement only: highlight the active section in the sidebar.
// The site is fully usable without JavaScript.
(function () {
  'use strict';
  var links = Array.prototype.slice.call(document.querySelectorAll('.sidebar nav a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });

  var current = null;
  function setActive(id) {
    if (id === current) return;
    if (current && map[current]) map[current].classList.remove('active');
    current = id;
    if (id && map[id]) map[id].classList.add('active');
  }

  var visible = {};
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
    for (var i = 0; i < links.length; i++) {
      var id = links[i].getAttribute('href').slice(1);
      if (visible[id]) { setActive(id); return; }
    }
  }, { rootMargin: '-10% 0px -70% 0px' });

  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
