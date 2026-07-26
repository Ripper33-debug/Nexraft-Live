gsap.registerPlugin(ScrollTrigger);
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================= site config =================
   BOOKING_URL: paste your Google Calendar appointment-schedule or Cal.com
   link here and every "Book a call" button will use it automatically.
   CONTACT_EMAIL: where the inquiry form sends. */
const BOOKING_URL = '';
const CONTACT_EMAIL = 'barry@nexraft.com';

/* ================= WebGL backbone ================= */
let scene, camera, renderer, particles, mono, uniforms, scrollProg = 0;
(function initGL(){
  const canvas = document.getElementById('gl');
  renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(innerWidth, innerHeight);
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x08080b, 0.055);
  camera = new THREE.PerspectiveCamera(55, innerWidth/innerHeight, .1, 100);
  camera.position.set(0, 1.2, 8);

  // particle field — "the raft grid": an engineered lattice flowing beneath everything
  const COUNT = innerWidth < 760 ? 4500 : 9000;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(COUNT*3);
  const seed = new Float32Array(COUNT);
  const GRID = Math.ceil(Math.sqrt(COUNT));
  for(let i=0;i<COUNT;i++){
    const gx = (i % GRID)/GRID - .5, gz = Math.floor(i/GRID)/GRID - .5;
    pos[i*3]   = gx * 42;
    pos[i*3+1] = 0;
    pos[i*3+2] = gz * 42;
    seed[i] = Math.random();
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed,1));

  uniforms = {
    uTime:{value:0},
    uScroll:{value:0},
    uColorA:{value:new THREE.Color(0xe9e5db)},
    uColorB:{value:new THREE.Color(0xff4d1c)},
  };
  const mat = new THREE.ShaderMaterial({
    uniforms, transparent:true, depthWrite:false,
    blending:THREE.AdditiveBlending,
    vertexShader:`
      uniform float uTime; uniform float uScroll;
      attribute float aSeed; varying float vGlow;
      float n(vec2 p){ return sin(p.x)*cos(p.y); }
      void main(){
        vec3 p = position;
        float t = uTime*.35;
        // layered pseudo-noise waves, amplitude grows with scroll
        float amp = 0.7 + uScroll*2.6;
        p.y += n(p.xz*.28 + t) * amp;
        p.y += n(p.xz*.75 - t*1.4) * amp*.35;
        p.y += sin(p.x*.12 + t*.7) * amp*.5;
        // swirl at deep scroll
        float ang = uScroll * .9;
        float c = cos(ang), s = sin(ang);
        p.xz = mat2(c,-s,s,c) * p.xz;
        vGlow = smoothstep(0.0, 2.2, p.y + 1.0) * (0.35 + aSeed*.65);
        vec4 mv = modelViewMatrix * vec4(p,1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (1.4 + aSeed*2.2) * (140.0 / -mv.z) * 0.055 * (100.0);
        gl_PointSize = clamp(gl_PointSize, 1.0, 4.5);
      }`,
    fragmentShader:`
      uniform vec3 uColorA; uniform vec3 uColorB; uniform float uScroll;
      varying float vGlow;
      void main(){
        vec2 uv = gl_PointCoord - .5;
        float d = length(uv);
        if(d > .5) discard;
        float a = smoothstep(.5,.05,d);
        vec3 col = mix(uColorA, uColorB, clamp(vGlow*.85 + uScroll*.3, 0.0, 1.0));
        gl_FragColor = vec4(col, a * (0.16 + vGlow*.5));
      }`
  });
  particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // signature object — refractive "raft" monolith that shatters into the lattice on scroll
  const monoUniforms = {
    uTime:uniforms.uTime, uScroll:uniforms.uScroll,
    uSignal:{value:new THREE.Color(0xff4d1c)},
    uBone:{value:new THREE.Color(0xe9e5db)},
  };
  mono = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.1, 5),
    new THREE.ShaderMaterial({
      uniforms:monoUniforms, transparent:true, depthWrite:false,
      blending:THREE.AdditiveBlending,
      vertexShader:`
        uniform float uTime; uniform float uScroll;
        varying vec3 vN; varying vec3 vP; varying float vShatter;
        float hash(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7)))*43758.5453); }
        void main(){
          vec3 p = position;
          vec3 n = normal;
          float t = uTime;
          // liquid glass ripple across the surface
          float ripple = sin(p.y*4.0 + t*1.2)*cos(p.x*3.0 - t*.8)*0.08
                       + sin(p.z*6.0 - t*1.7)*0.04;
          // shatter: faces explode outward with per-cell randomness as you scroll
          float sh = smoothstep(0.04, 0.45, uScroll);
          float rnd = hash(floor(position*3.0));
          p += n * (ripple + sh * (1.5 + rnd*4.5));
          p += (vec3(rnd, hash(position.zyx), hash(position.yxz)) - .5) * sh * 3.5;
          vShatter = sh;
          vN = normalize(normalMatrix * n);
          vec4 mv = modelViewMatrix * vec4(p,1.0);
          vP = mv.xyz;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader:`
        uniform float uTime; uniform vec3 uSignal; uniform vec3 uBone;
        varying vec3 vN; varying vec3 vP; varying float vShatter;
        void main(){
          vec3 V = normalize(-vP);
          vec3 N = normalize(vN);
          float fres = pow(1.0 - abs(dot(N,V)), 2.5);
          // iridescent bands sliding across the surface — faked refraction
          float band = sin(vP.y*9.0 + vP.x*5.0 + uTime*1.4)*.5+.5;
          vec3 col = mix(vec3(0.06,0.06,0.08), uBone, fres);
          col += uSignal * band * fres * 1.6;
          col += uSignal * pow(fres, 4.0) * 1.2;
          float alpha = (0.12 + fres*.85) * (1.0 - vShatter*.9);
          gl_FragColor = vec4(col, alpha);
        }`
    })
  );
  mono.position.set(2.9, 1.6, -1.5);
  scene.add(mono);

  addEventListener('resize', ()=>{
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
})();

let mx = 0, my = 0;
addEventListener('mousemove', e=>{
  mx = (e.clientX/innerWidth - .5);
  my = (e.clientY/innerHeight - .5);
});

const clock = new THREE.Clock();
let glPaused = false, glFrames = 0;
(function tick(){
  requestAnimationFrame(tick);
  if(glPaused) return;                    // tab hidden: skip work
  if(reduced && glFrames++ > 3) return;   // reduced motion: settle on a static frame
  const t = clock.getElapsedTime();
  uniforms.uTime.value = t;
  uniforms.uScroll.value += (scrollProg - uniforms.uScroll.value)*.05;
  const sp = uniforms.uScroll.value;
  // scroll-driven camera: descend and pitch into the lattice
  camera.position.y = 1.2 + sp*-2.4 + Math.sin(t*.3)*.06;
  camera.position.z = 8 - sp*3.2;
  camera.position.x += ((mx*1.2) - camera.position.x)*.04;
  camera.lookAt(0, sp*-1.2 + my*-.6, 0);
  // monolith reacts to mouse, drifts, then shatters as the shader takes over
  mono.rotation.y = t*.15 + mx*.7;
  mono.rotation.x = Math.sin(t*.2)*.15 + my*.5;
  mono.position.y = 1.6 + Math.sin(t*.5)*.2 - sp*3.0;
  mono.scale.setScalar(1 + sp*.6);
  renderer.render(scene, camera);
})();

// global scroll progress drives the scene
ScrollTrigger.create({
  trigger: document.body, start:"top top", end:"bottom bottom",
  onUpdate: self => scrollProg = self.progress
});

/* ================= preloader = opening scene ================= */
const pct = {v:0};
const loaderTl = gsap.timeline();
loaderTl
  .to('#loaderWord', {y:0, duration:.9, ease:'power4.out', delay:.15})
  .to(pct, {v:100, duration:1.6, ease:'power2.inOut',
      onUpdate(){
        document.getElementById('loaderPct').textContent = String(Math.round(pct.v)).padStart(3,'0');
        document.getElementById('loaderFill').style.transform = `scaleX(${pct.v/100})`;
      }}, '-=.4')
  .to('#loader', {yPercent:-100, duration:.9, ease:'power4.inOut'})
  .set('#loader',{display:'none'})
  .add(heroIn, '-=.55');

function heroIn(){
  gsap.to('.hero .line > span', {yPercent:0, duration:1.1, stagger:.09, ease:'power4.out'});
  gsap.to('.hero .reveal', {opacity:1, y:0, duration:1, stagger:.08, ease:'power3.out', delay:.3});
}
gsap.set('.hero .line > span',{yPercent:110});

/* ================= scroll reveals ================= */
document.querySelectorAll('section:not(.hero) .reveal, footer .reveal').forEach(el=>{
  gsap.to(el, {
    opacity:1, y:0, duration:1, ease:'power3.out',
    scrollTrigger:{trigger:el, start:'top 88%'}
  });
});
/* ================= character-level typography ================= */
function splitChars(el){
  const walk = node => {
    [...node.childNodes].forEach(child=>{
      if(child.nodeType === 3){
        const frag = document.createDocumentFragment();
        [...child.textContent].forEach(ch=>{
          if(ch.trim() === ''){ frag.appendChild(document.createTextNode(ch)); }
          else{ const s = document.createElement('span'); s.className='char'; s.textContent=ch; frag.appendChild(s); }
        });
        node.replaceChild(frag, child);
      } else if(child.nodeType === 1 && child.tagName !== 'BR'){ walk(child); }
    });
  };
  walk(el);
  return el.querySelectorAll('.char');
}

// headlines outside hero: per-letter 3D cascade
document.querySelectorAll('section:not(.hero) h2').forEach(h=>{
  if(reduced){ return; }
  const chars = splitChars(h);
  gsap.from(chars, {yPercent:120, opacity:0, rotationX:-50, transformOrigin:'center bottom',
    duration:.9, stagger:.02, ease:'power4.out',
    scrollTrigger:{trigger:h, start:'top 85%'}});
});

// kickers: terminal-style scramble decode
const GLYPHS = '█▓▒░<>/\\|=+*#NEXRAFT01';
if(!reduced) document.querySelectorAll('.kicker').forEach(k=>{
  const tn = [...k.childNodes].find(n=>n.nodeType===3 && n.textContent.trim());
  if(!tn) return;
  const finalText = tn.textContent;
  ScrollTrigger.create({trigger:k, start:'top 92%', once:true, onEnter(){
    let frame = 0; const total = 32;
    const iv = setInterval(()=>{
      frame++;
      const prog = frame/total;
      tn.textContent = [...finalText].map((ch,i)=>
        (i/finalText.length < prog || ch===' ') ? ch : GLYPHS[Math.floor(Math.random()*GLYPHS.length)]
      ).join('');
      if(frame >= total){ tn.textContent = finalText; clearInterval(iv); }
    }, 28);
  }});
});

// giant footer logo: hover wave
const giant = document.querySelector('.foot-giant');
const giantChars = splitChars(giant);
if(!reduced) giant.addEventListener('mouseenter', ()=>{
  gsap.fromTo(giantChars, {y:0}, {y:-20, duration:.32, stagger:{each:.028}, ease:'power2.out', yoyo:true, repeat:1});
});

/* ================= cinematic section transitions ================= */
// services: pinned horizontal scroll chapter (desktop only)
ScrollTrigger.matchMedia({
  "(min-width: 901px)": function(){
    const list = document.querySelector('.svc-list');
    const sec = document.getElementById('services');
    gsap.to(list, {
      x: () => -(list.scrollWidth - sec.clientWidth + 140),
      ease:'none',
      scrollTrigger:{trigger:sec, start:'top top', end:'+=1700', pin:true, scrub:1, invalidateOnRefresh:true}
    });
  }
});

// case studies: full-bleed wipe reveals
document.querySelectorAll('.work-visual').forEach((v,i)=>{
  gsap.from(v, {clipPath: i%2 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
    duration:1.2, ease:'power4.inOut',
    scrollTrigger:{trigger:v, start:'top 82%'}});
});

// pricing: 3D perspective fly-in
gsap.from('.plan', {rotationX:38, z:-90, transformPerspective:900, transformOrigin:'center bottom',
  duration:1.2, stagger:.12, ease:'power3.out',
  scrollTrigger:{trigger:'.price-grid', start:'top 82%'}});

/* ================= marquee ================= */
if(!reduced){
  const track = document.getElementById('marquee');
  gsap.to(track, {xPercent:-50, duration:26, ease:'none', repeat:-1});
}

/* ================= magnetic buttons ================= */
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('mousemove', e=>{
    const r = btn.getBoundingClientRect();
    gsap.to(btn, {x:(e.clientX-r.left-r.width/2)*.25, y:(e.clientY-r.top-r.height/2)*.35, duration:.4});
  });
  btn.addEventListener('mouseleave', ()=> gsap.to(btn,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'}));
});

/* ================= FAQ accordion (accessible) ================= */
document.querySelectorAll('.faq-item').forEach((item,i)=>{
  const q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
  a.id = 'faq-panel-'+i;
  q.setAttribute('aria-expanded','false');
  q.setAttribute('aria-controls', a.id);
  q.addEventListener('click', ()=>{
    const open = item.classList.toggle('open');
    q.setAttribute('aria-expanded', String(open));
    a.style.maxHeight = open ? a.scrollHeight+'px' : 0;
  });
});

/* ================= booking + contact form ================= */
if(BOOKING_URL){
  document.querySelectorAll('a.btn').forEach(a=>{
    if(/book a call/i.test(a.textContent)) { a.href = BOOKING_URL; a.target = '_blank'; a.rel = 'noopener'; }
  });
}
const cform = document.getElementById('contactForm');
if(cform){
  const planSel = document.getElementById('f-plan');
  planSel.addEventListener('change', ()=> planSel.classList.add('has'));
  cform.addEventListener('submit', async e=>{
    e.preventDefault();
    const note = cform.querySelector('.form-note');
    const sendBtn = cform.querySelector('.btn');
    if(!cform.reportValidity()) return;
    const d = Object.fromEntries(new FormData(cform).entries());
    sendBtn.textContent = 'Sending…';
    sendBtn.disabled = true;
    try{
      const res = await fetch('/api/contact', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(d)
      });
      const out = await res.json().catch(()=>({ok:false}));
      if(res.ok && out.ok){
        note.textContent = 'Received — we reply within one business day.';
        sendBtn.textContent = 'Sent — talk soon.';
        return;
      }
      throw new Error(out.error || 'send failed');
    }catch(err){
      // fallback: open the visitor's email client with everything pre-filled
      const subject = encodeURIComponent(`Nexraft inquiry — ${d.name}${d.company ? ' ('+d.company+')' : ''}`);
      const body = encodeURIComponent(
        `Name: ${d.name}\nEmail: ${d.email}\nWebsite: ${d.website||'—'}\nCompany: ${d.company||'—'}\nPlan interest: ${d.plan||'—'}\n\nBrief:\n${d.brief||'—'}`
      );
      location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      note.textContent = 'Could not send automatically — opening your email client, or write us directly at ' + CONTACT_EMAIL;
      sendBtn.textContent = 'Send inquiry';
      sendBtn.disabled = false;
    }
  });
}
document.querySelectorAll('.plan-cta').forEach(cta=>{
  cta.addEventListener('click', ()=>{
    const sel = document.getElementById('f-plan');
    const want = cta.getAttribute('data-plan');
    if(sel && want){
      [...sel.options].forEach(o=>{ if(o.text === want) sel.value = o.text; });
      sel.classList.add('has');
    }
  });
});
const startBtn = document.getElementById('startInquiry');
if(startBtn){
  startBtn.addEventListener('click', ()=>{
    setTimeout(()=>{ const f = document.getElementById('f-name'); if(f) f.focus({preventScroll:true}); }, reduced ? 50 : 650);
  });
}

/* ================= performance: pause GL when hidden ================= */
document.addEventListener('visibilitychange', ()=>{ glPaused = document.hidden; });

/* ================= smooth anchor scroll ================= */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior: reduced ? 'auto' : 'smooth'}); }
  });
});

/* ================= header: surface on scroll ================= */
(() => {
  const hdr = document.querySelector('header');
  if (!hdr) return;
  const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ================= recede particle field after hero =================
   Full intensity in the hero, then fades back so content stays readable. */
(() => {
  const glCanvas = document.getElementById('gl');
  if(!glCanvas) return;
  glCanvas.style.transition = 'opacity .3s linear';
  const glFade = () => {
    const vh = innerHeight;
    const t = Math.min(Math.max((scrollY - vh*0.55)/(vh*0.9), 0), 1);
    glCanvas.style.opacity = String(1 - t*0.72);
  };
  addEventListener('scroll', glFade, {passive:true});
  glFade();
})();
