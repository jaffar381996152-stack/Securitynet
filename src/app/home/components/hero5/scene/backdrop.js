// Hero5 — ambient backdrop.
// A soft radial GOLD GLOW (galactic core) + a deep field of SHINING GOLD STARS
// that twinkle and slowly drift, for a premium galaxy feel. Everything lives
// BEHIND the coin in z with depthTest ON, so the coin always occludes it and the
// backdrop never affects coin visibility. Fades in with scroll, then holds.
import * as THREE from "three";

function makeGlowTexture() {
  if (typeof document === "undefined") return null;
  const s = 512;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0.0, "rgba(212, 175, 110, 0.5)"); // core — matches coin gold #d4af6e
  g.addColorStop(0.35, "rgba(150, 120, 70, 0.24)");
  g.addColorStop(0.7, "rgba(70, 54, 30, 0.07)");
  g.addColorStop(1.0, "rgba(0, 0, 0, 0.0)"); // fades into the dark bg
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const STAR_VERT = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uIntensity;
  uniform float uStarScale;
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aBright;
  attribute vec3  aColor;
  varying float vBright;
  varying vec3  vColor;
  void main() {
    float tw = 0.55 + 0.45 * sin(uTime * aSpeed + aPhase); // 0.1 .. 1.0 twinkle
    vBright = aBright * tw * uIntensity;
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (uStarScale / -mv.z) * (0.8 + 0.4 * tw);
  }
`;

const STAR_FRAG = /* glsl */ `
  precision highp float;
  varying float vBright;
  varying vec3  vColor;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    core = pow(core, 1.7); // bright tight core + soft halo -> "shining"
    gl_FragColor = vec4(vColor * vBright, core);
  }
`;

export function createBackdrop({ mobile = false } = {}) {
  const group = new THREE.Group();

  // --- radial gold glow (far behind; coin occludes it -> never washes coin) ---
  const glowTex = makeGlowTexture();
  const glowMat = new THREE.MeshBasicMaterial({
    map: glowTex,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
  });
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(48, 34), glowMat);
  glow.position.set(0, 0, -16);
  glow.renderOrder = -2;
  group.add(glow);

  // --- shining gold star field ----------------------------------------------
  const N = mobile ? 320 : 680;
  const BX = 30, BY = 20, ZMIN = -34, ZMAX = -6; // wide, deep volume behind coin
  const pos = new Float32Array(N * 3);
  const aSize = new Float32Array(N);
  const aPhase = new Float32Array(N);
  const aSpeed = new Float32Array(N);
  const aBright = new Float32Array(N);
  const aColor = new Float32Array(N * 3);

  // gold palette: deep amber -> gold -> near-white gold (rare, brightest)
  const amber = new THREE.Color(0xb8863c);
  const gold = new THREE.Color(0xe6bd76);
  const whiteGold = new THREE.Color(0xfff4d8);
  const tmp = new THREE.Color();

  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() * 2 - 1) * BX;
    pos[i * 3 + 1] = (Math.random() * 2 - 1) * BY;
    pos[i * 3 + 2] = ZMIN + Math.random() * (ZMAX - ZMIN);

    // mostly small specks, a few big shining stars (cubic falloff)
    const big = Math.pow(Math.random(), 3);
    aSize[i] = 0.6 + big * 3.4;
    aBright[i] = 0.45 + big * 0.55 + Math.random() * 0.15;
    aPhase[i] = Math.random() * 6.283;
    aSpeed[i] = 0.4 + Math.random() * 1.8;

    const t = Math.random();
    if (t < 0.6) tmp.copy(gold).lerp(amber, Math.random());
    else if (t < 0.92) tmp.copy(gold);
    else tmp.copy(gold).lerp(whiteGold, 0.4 + Math.random() * 0.6); // rare bright
    aColor[i * 3] = tmp.r; aColor[i * 3 + 1] = tmp.g; aColor[i * 3 + 2] = tmp.b;
  }

  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  starGeo.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
  starGeo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
  starGeo.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
  starGeo.setAttribute("aBright", new THREE.BufferAttribute(aBright, 1));
  starGeo.setAttribute("aColor", new THREE.BufferAttribute(aColor, 3));

  const starMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uIntensity: { value: 1 },
      uStarScale: { value: 90 },
    },
    vertexShader: STAR_VERT,
    fragmentShader: STAR_FRAG,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
  });
  const stars = new THREE.Points(starGeo, starMat);
  stars.renderOrder = -1;
  stars.frustumCulled = false;
  group.add(stars);

  // --- falling / shooting stars (occasional streaks for a real galaxy feel) ---
  let intensity = 1;
  const SS = mobile ? 2 : 4;
  const ssPos = new Float32Array(SS * 2 * 3);
  const ssCol = new Float32Array(SS * 2 * 3);
  const ssGeo = new THREE.BufferGeometry();
  ssGeo.setAttribute("position", new THREE.BufferAttribute(ssPos, 3));
  ssGeo.setAttribute("color", new THREE.BufferAttribute(ssCol, 3));
  const ssMat = new THREE.LineBasicMaterial({
    vertexColors: true, transparent: true, depthWrite: false, depthTest: true,
    blending: THREE.AdditiveBlending,
  });
  const meteorLines = new THREE.LineSegments(ssGeo, ssMat);
  meteorLines.renderOrder = -1;
  meteorLines.frustumCulled = false;
  group.add(meteorLines);

  const METEOR_HEAD = new THREE.Color(0xfff2d0); // warm white-gold head
  const meteors = [];
  for (let i = 0; i < SS; i++) meteors.push({ active: false, delay: 1 + Math.random() * 7 });

  function spawnMeteor(m) {
    m.active = true;
    m.life = 0;
    m.dur = 0.7 + Math.random() * 0.7;            // seconds to streak across
    m.x = (Math.random() * 2 - 1) * BX * 0.9;     // start somewhere up high
    m.y = BY * 0.7 + Math.random() * 5;
    m.z = ZMIN + Math.random() * (ZMAX - ZMIN);
    const ang = -(0.5 + Math.random() * 0.7);     // fall downward, varied steepness
    const sx = Math.random() < 0.5 ? 1 : -1;      // drift left or right
    m.dx = Math.cos(ang) * sx;
    m.dy = Math.sin(ang);                         // negative -> downward
    m.speed = 26 + Math.random() * 20;
    m.trail = 2.5 + Math.random() * 3;            // streak length (world units)
    m.bright = 0.85 + Math.random() * 0.6;
  }

  function updateMeteors(dt) {
    for (let i = 0; i < SS; i++) {
      const m = meteors[i];
      const o = i * 6;
      if (!m.active) {
        m.delay -= dt;
        if (m.delay <= 0) spawnMeteor(m);
        else { for (let k = 0; k < 6; k++) ssCol[o + k] = 0; continue; }
      }
      m.life += dt / m.dur;
      if (m.life >= 1) {
        m.active = false;
        m.delay = 2.5 + Math.random() * 8;        // random gap before the next one
        for (let k = 0; k < 6; k++) ssCol[o + k] = 0;
        continue;
      }
      m.x += m.dx * m.speed * dt;
      m.y += m.dy * m.speed * dt;
      const a = Math.sin(m.life * Math.PI) * m.bright * intensity; // fade in then out
      // bright head
      ssPos[o] = m.x; ssPos[o + 1] = m.y; ssPos[o + 2] = m.z;
      ssCol[o] = METEOR_HEAD.r * a; ssCol[o + 1] = METEOR_HEAD.g * a; ssCol[o + 2] = METEOR_HEAD.b * a;
      // tail trailing behind, fading to nothing
      ssPos[o + 3] = m.x - m.dx * m.trail; ssPos[o + 4] = m.y - m.dy * m.trail; ssPos[o + 5] = m.z;
      ssCol[o + 3] = 0; ssCol[o + 4] = 0; ssCol[o + 5] = 0;
    }
    ssGeo.attributes.position.needsUpdate = true;
    ssGeo.attributes.color.needsUpdate = true;
  }

  function setPixelRatio(pr) {
    starMat.uniforms.uPixelRatio.value = pr;
  }

  function update(dt, elapsed) {
    starMat.uniforms.uTime.value = elapsed;
    group.rotation.z += dt * 0.012; // slow galactic drift
    updateMeteors(dt);
  }

  // 0..1 — fades the whole backdrop in as the particles gather, then holds
  function setIntensity(v) {
    intensity = v;
    glowMat.opacity = v;
    starMat.uniforms.uIntensity.value = v;
  }

  function dispose() {
    glowTex && glowTex.dispose();
    glowMat.dispose();
    glow.geometry.dispose();
    starGeo.dispose();
    starMat.dispose();
    ssGeo.dispose();
    ssMat.dispose();
  }

  return { group, update, setIntensity, setPixelRatio, dispose };
}
