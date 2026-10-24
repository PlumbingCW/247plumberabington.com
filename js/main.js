(function () {
  var doc = document;
  var root = doc.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  var toggle = doc.getElementById('mob-toggle');
  var drawer = doc.getElementById('mob-drawer');
  var overlay = doc.getElementById('mob-overlay');
  var closeBtn = doc.getElementById('mob-close');

  function openMenu() {
    drawer.hidden = false;
    overlay.classList.add('visible');
    toggle.setAttribute('aria-expanded', 'true');
    root.style.overflow = 'hidden';
    if (closeBtn) { closeBtn.focus(); }
  }

  function closeMenu() {
    drawer.hidden = true;
    overlay.classList.remove('visible');
    toggle.setAttribute('aria-expanded', 'false');
    root.style.overflow = '';
  }

  if (toggle && drawer && overlay) {
    toggle.addEventListener('click', function () {
      if (drawer.hidden) { openMenu(); } else { closeMenu(); }
    });
    overlay.addEventListener('click', closeMenu);
    if (closeBtn) { closeBtn.addEventListener('click', function () { closeMenu(); toggle.focus(); }); }
    drawer.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.tagName === 'A') { closeMenu(); }
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.hidden) { closeMenu(); toggle.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && !drawer.hidden) { closeMenu(); }
    });
  }

  var items = doc.querySelectorAll('.faq-item');
  function setOpen(item, open) {
    var btn = item.querySelector('.faq-q');
    item.classList.toggle('open', open);
    if (btn) { btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  }
  Array.prototype.forEach.call(items, function (item, i) {
    var btn = item.querySelector('.faq-q');
    if (!btn) { return; }
    btn.addEventListener('click', function () {
      setOpen(item, !item.classList.contains('open'));
    });
    if (i === 0) { setOpen(item, true); }
  });
})();
