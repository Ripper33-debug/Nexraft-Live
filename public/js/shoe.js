/* Nexraft — homepage shoe configurator tile (three.js r128, loaded by index) */
(function () {
  'use strict';

  var host = document.getElementById('shoeDemo');
  var canvas = document.getElementById('shoeCanvas');
  if (!host || !canvas || typeof THREE === 'undefined') return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var PARTS = [
    { key: 'sole',   label: 'Sole'   },
    { key: 'mid',    label: 'Mid'    },
    { key: 'upper',  label: 'Upper'  },
    { key: 'laces',  label: 'Laces'  },
    { key: 'accent', label: 'Accent' }
  ];
  var DEFAULTS = { sole: '#ff4d1c', mid: '#f2efe6', upper: '#e9e5db', laces: '#0b0b0e', accent: '#0b0b0e' };
  var PALETTE = ['#e9e5db', '#f2efe6', '#0b0b0e', '#ff4d1c', '#43d085', '#2b5bd7', '#d7263d', '#c9a86a', '#5a6b5f', '#7d8491'];

  /* ---------- scene ---------- */
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, 16 / 10, 0.1, 50);
  camera.position.set(0, 1.4, 5.6);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  var key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(4, 6, 4); scene.add(key);
  var rim = new THREE.DirectionalLight(0xffffff, 0.5); rim.position.set(-5, 3, -4); scene.add(rim);

  var mats = {};
  PARTS.forEach(function (p) {
    mats[p.key] = new THREE.MeshStandardMaterial({ color: new THREE.Color(DEFAULTS[p.key]), roughness: 0.85 });
  });

  var shoe = new THREE.Group();

  function add(geo, mat, x, y, z, sx, sy, sz, rx, ry, rz) {
    var m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    if (sx) m.scale.set(sx, sy, sz);
    if (rx || ry || rz) m.rotation.set(rx || 0, ry || 0, rz || 0);
    shoe.add(m);
    return m;
  }

  var sphere = new THREE.SphereGeometry(1, 48, 32);
  add(new THREE.BoxGeometry(3.4, 0.3, 1.35), mats.sole, 0, 0.15, 0);            // outsole
  add(new THREE.BoxGeometry(3.5, 0.36, 1.42), mats.mid, 0, 0.46, 0);            // midsole
  add(sphere, mats.upper, -0.28, 0.98, 0, 1.6, 0.62, 0.67);                     // upper body
  add(sphere, mats.accent, 1.08, 0.8, 0, 0.72, 0.42, 0.6);                      // toe cap
  add(sphere, mats.accent, -1.4, 1.0, 0, 0.48, 0.58, 0.6);                      // heel counter
  [0.66, -0.66].forEach(function (z) {                                          // side stripes
    add(new THREE.BoxGeometry(1.5, 0.16, 0.06), mats.accent, -0.35, 0.92, z, 0, 0, 0, 0, 0, -0.12);
  });
  add(new THREE.TorusGeometry(0.42, 0.14, 20, 40), mats.upper, -0.82, 1.42, 0, 0, 0, 0, Math.PI / 2, 0, 0); // collar
  add(new THREE.BoxGeometry(1.0, 0.16, 0.5), mats.upper, 0.42, 1.28, 0, 0, 0, 0, 0, 0, 0.55);               // tongue
  for (var i = 0; i < 4; i++) {                                                 // laces
    add(new THREE.CylinderGeometry(0.04, 0.04, 0.74, 16), mats.laces,
      0.78 - i * 0.34, 1.06 + i * 0.13, 0, 0, 0, 0, Math.PI / 2, 0, 0.1);
  }
  shoe.position.y = -0.75;
  scene.add(shoe);

  /* ---------- interaction ---------- */
  var rotY = -0.6, rotX = 0, targetY = -0.6, targetX = 0, dragging = false, px = 0, py = 0;
  canvas.addEventListener('pointerdown', function (e) {
    dragging = true; px = e.clientX; py = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    targetY += (e.clientX - px) * 0.008;
    targetX += (e.clientY - py) * 0.005;
    targetX = Math.max(-0.5, Math.min(0.6, targetX));
    px = e.clientX; py = e.clientY;
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) {
    canvas.addEventListener(ev, function () { dragging = false; });
  });

  /* ---------- ui ---------- */
  var active = 'upper';
  var partsBox = document.getElementById('shoeParts');
  var swatchBox = document.getElementById('shoeSwatches');

  PARTS.forEach(function (p) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = p.label;
    b.className = p.key === active ? 'active' : '';
    b.addEventListener('click', function () {
      active = p.key;
      Array.prototype.forEach.call(partsBox.children, function (c) { c.classList.remove('active'); });
      b.classList.add('active');
      markSwatches();
    });
    partsBox.appendChild(b);
  });

  PALETTE.forEach(function (hex) {
    var b = document.createElement('button');
    b.type = 'button';
    b.style.backgroundColor = hex;
    b.setAttribute('aria-label', 'Color ' + hex);
    b.dataset.hex = hex;
    b.addEventListener('click', function () {
      mats[active].color.set(hex);
      markSwatches();
    });
    swatchBox.appendChild(b);
  });

  function markSwatches() {
    var current = '#' + mats[active].color.getHexString();
    Array.prototype.forEach.call(swatchBox.children, function (c) {
      c.classList.toggle('active', c.dataset.hex === current);
    });
  }
  markSwatches();

  /* ---------- render loop (only while visible) ---------- */
  var visible = false, rafId = 0;
  function size() {
    var w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  size();
  if (window.ResizeObserver) new ResizeObserver(size).observe(host);
  else window.addEventListener('resize', size);

  function tick() {
    if (!visible) return;
    if (!dragging && !reduced) targetY += 0.004;
    rotY += (targetY - rotY) * 0.08;
    rotX += (targetX - rotX) * 0.08;
    shoe.rotation.y = rotY;
    shoe.rotation.x = rotX;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  }

  if (window.IntersectionObserver) {
    new IntersectionObserver(function (entries) {
      var on = entries[0].isIntersecting;
      if (on && !visible) { visible = true; tick(); }
      else if (!on) { visible = false; cancelAnimationFrame(rafId); }
    }, { threshold: 0.05 }).observe(host);
  } else {
    visible = true; tick();
  }
})();
