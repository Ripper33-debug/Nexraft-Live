/* Nexraft — homepage shoe configurator tile (three.js r128 + GLTFLoader)
   Model: "Materials Variants Shoe" © Shopify, CC BY 4.0, via Khronos glTF-Sample-Assets */
(function () {
  'use strict';

  var host = document.getElementById('shoeDemo');
  var canvas = document.getElementById('shoeCanvas');
  if (!host || !canvas || typeof THREE === 'undefined') return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- scene ---------- */
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  if (THREE.sRGBEncoding !== undefined) renderer.outputEncoding = THREE.sRGBEncoding;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, 16 / 10, 0.1, 50);
  camera.position.set(0, 1.2, 5.4);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  var hemi = new THREE.HemisphereLight(0xfff4ec, 0x1a1a20, 0.6); scene.add(hemi);
  var key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(4, 6, 4); scene.add(key);
  var rim = new THREE.DirectionalLight(0xffe0d0, 0.7); rim.position.set(-5, 3, -4); scene.add(rim);

  var pivot = new THREE.Group();
  scene.add(pivot);

  /* ---------- load the real shoe ---------- */
  var uiBox = host.querySelector('.shoe-ui');
  var chipBox = document.getElementById('shoeParts');
  var swatchBox = document.getElementById('shoeSwatches');
  if (swatchBox) swatchBox.style.display = 'none';

  function fit(obj, targetSize) {
    var box = new THREE.Box3().setFromObject(obj);
    var size = box.getSize(new THREE.Vector3());
    var center = box.getCenter(new THREE.Vector3());
    var s = targetSize / Math.max(size.x, size.y, size.z);
    obj.scale.setScalar(s);
    obj.position.sub(center.multiplyScalar(s));
  }

  function buildFallback() {
    if (uiBox) uiBox.style.display = 'none';
    var mat = function (hex, rough) {
      return new THREE.MeshStandardMaterial({ color: new THREE.Color(hex), roughness: rough || 0.85 });
    };
    var sole = mat('#ff4d1c'), mid = mat('#f2efe6'), upper = mat('#e9e5db'), dark = mat('#0b0b0e', 0.6);
    var g = new THREE.Group();
    var sphere = new THREE.SphereGeometry(1, 48, 32);
    function add(geo, m, x, y, z, sx, sy, sz, rx, ry, rz) {
      var mesh = new THREE.Mesh(geo, m);
      mesh.position.set(x, y, z);
      if (sx) mesh.scale.set(sx, sy, sz);
      if (rx || ry || rz) mesh.rotation.set(rx || 0, ry || 0, rz || 0);
      g.add(mesh);
    }
    add(new THREE.BoxGeometry(3.4, 0.3, 1.35), sole, 0, 0.15, 0);
    add(new THREE.BoxGeometry(3.5, 0.36, 1.42), mid, 0, 0.46, 0);
    add(sphere, upper, -0.28, 0.98, 0, 1.6, 0.62, 0.67);
    add(sphere, dark, 1.08, 0.8, 0, 0.72, 0.42, 0.6);
    add(sphere, dark, -1.4, 1.0, 0, 0.48, 0.58, 0.6);
    g.position.y = -0.75;
    pivot.add(g);
  }

  if (THREE.GLTFLoader) {
    new THREE.GLTFLoader().load(
      '/models/shoe.glb',
      function (gltf) {
        var parser = gltf.parser;
        var json = parser.json;
        var mesh = null;
        gltf.scene.traverse(function (o) { if (o.isMesh && !mesh) mesh = o; });
        fit(gltf.scene, 3.1);
        gltf.scene.rotation.y = 0.4;
        pivot.add(gltf.scene);

        /* colorway chips from KHR_materials_variants */
        try {
          var variants = json.extensions.KHR_materials_variants.variants;
          var mappings = json.meshes[0].primitives[0].extensions.KHR_materials_variants.mappings;
          var setVariant = function (idx) {
            for (var i = 0; i < mappings.length; i++) {
              if (mappings[i].variants.indexOf(idx) !== -1) {
                parser.getDependency('material', mappings[i].material).then(function (m) {
                  mesh.material = m;
                  m.needsUpdate = true;
                });
                break;
              }
            }
          };
          variants.forEach(function (v, idx) {
            var b = document.createElement('button');
            b.type = 'button';
            b.textContent = v.name;
            if (idx === 0) b.className = 'active';
            b.addEventListener('click', function () {
              Array.prototype.forEach.call(chipBox.children, function (c) { c.classList.remove('active'); });
              b.classList.add('active');
              setVariant(idx);
            });
            chipBox.appendChild(b);
          });
          setVariant(0);
        } catch (e) { if (uiBox) uiBox.style.display = 'none'; }
      },
      undefined,
      function () { buildFallback(); }
    );
  } else {
    buildFallback();
  }

  /* ---------- drag + auto-rotate ---------- */
  var rotY = 0, rotX = 0, targetY = 0, targetX = 0, dragging = false, px = 0, py = 0;
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
    pivot.rotation.y = rotY;
    pivot.rotation.x = rotX;
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
