// Hero5 — particle collapse system.
// ~5,000 additive gold points that drift in chaos and collapse into the coin
// silhouette as uProgress 0->1. Edge collapses first (ring), then faces fill,
// with the "XN" emerging from denser particles. One THREE.Points, one draw call.
import * as THREE from "three";

const R = 2.0;            // coin radius
const THICK = 0.22;       // coin thickness
const CHAOS_R = 6.0;      // chaos sphere radius

const VERT = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2  uMouse;
  uniform float uMouseStrength;
  uniform float uFlash;

  attribute vec3  aCoinPos;
  attribute vec3  aOffset;
  attribute float aSize;
  attribute float aDelay;

  varying float vProgress;
  varying float vSeed;

  float easeInOut(float t){ return t < 0.5 ? 2.0*t*t : 1.0 - pow(-2.0*t + 2.0, 2.0) * 0.5; }

  void main() {
    // per-particle staggered + eased progress
    float p = clamp((uProgress - aDelay) / max(1.0 - aDelay, 0.0001), 0.0, 1.0);
    p = easeInOut(p);
    vProgress = p;
    vSeed = aSize;

    // chaos drift (Brownian-ish), fades out as it collapses
    vec3 chaos = position;
    float drift = (1.0 - p);
    chaos.x += sin(aOffset.x + uTime * 0.30) * 0.6 * drift;
    chaos.y += cos(aOffset.y + uTime * 0.22) * 0.5 * drift;
    chaos.z += sin(aOffset.z + uTime * 0.17) * 0.5 * drift;

    vec3 pos = mix(chaos, aCoinPos, p);

    // mouse gravity well (only matters before collapse)
    float pull = drift * uMouseStrength;
    vec2 toMouse = uMouse - pos.xy;
    float d = length(toMouse);
    pos.xy += normalize(toMouse + 0.0001) * pull * smoothstep(4.5, 0.0, d);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // small specks so the coin reads as *made of particles* (XN density shows);
    // they swell at the fuse moment so the dust visually merges into a solid sheet
    float size = mix(0.15, 0.10, p) * aSize * uPixelRatio;
    size *= 1.0 + uFlash * 0.9;
    gl_PointSize = size * (300.0 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uAlphaMultiplier;
  uniform float uFlash;
  varying float vProgress;
  varying float vSeed;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, dist);

    // Vibrant, lively gold dust while SPREAD OUT, settling to the EXACT coin gold.
    vec3 chaosGold = vec3(0.55, 0.33, 0.13);   // brighter saturated gold (sparse phase)
    vec3 gold      = vec3(0.44, 0.232, 0.078); // settled = coin face #c2984d (unchanged)
    vec3 col = mix(chaosGold, gold, vProgress);

    // Per-particle shimmer — ACTIVE ONLY while spread out (chaos), fully gone by
    // 85% collapse. So the dense fusion, the ring and the matched coin colour
    // (all at high vProgress) are never affected; sparse gold on black can't cream.
    float chaos = 1.0 - smoothstep(0.5, 0.85, vProgress);
    float tw = 1.0 + chaos * 0.6 * sin(uTime * (1.5 + vSeed * 2.5) + vSeed * 40.0);
    col *= tw;

    float alpha = mix(0.85, 1.0, vProgress) * soft * uAlphaMultiplier;
    alpha = min(1.0, alpha + uFlash * 0.25 * soft);
    gl_FragColor = vec4(col, alpha);
  }
`;

function buildChaos(n) {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = CHAOS_R * Math.cbrt(Math.random());
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    const i3 = i * 3;
    a[i3] = r * Math.sin(ph) * Math.cos(th);
    a[i3 + 1] = r * Math.sin(ph) * Math.sin(th);
    a[i3 + 2] = r * Math.cos(ph);
  }
  return a;
}

function sampleText(text) {
  if (typeof document === "undefined") return [];
  const s = 200;
  const c = document.createElement("canvas");
  c.width = s; c.height = s;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#000"; ctx.fillRect(0, 0, s, s);
  ctx.fillStyle = "#fff";
  ctx.font = "800 130px 'Barlow Condensed', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, s / 2, s / 2 + 6);
  const data = ctx.getImageData(0, 0, s, s).data;
  const pts = [];
  for (let y = 0; y < s; y += 2) {
    for (let x = 0; x < s; x += 2) {
      if (data[(y * s + x) * 4] > 128) pts.push([(x / s - 0.5) * 2, -(y / s - 0.5) * 2]);
    }
  }
  return pts;
}

function buildCoin(n) {
  const coin = new Float32Array(n * 3);
  const delay = new Float32Array(n);
  const xn = sampleText("XN");
  for (let i = 0; i < n; i++) {
    const i3 = i * 3;
    const region = Math.random();
    let x, y, z, d;
    if (region < 0.45) {
      // front face — bias half onto the XN glyphs
      if (xn.length && Math.random() < 0.5) {
        const pt = xn[(Math.random() * xn.length) | 0];
        x = pt[0] * R * 0.8; y = pt[1] * R * 0.8;
        z = THICK * 0.5 + (Math.random() - 0.5) * 0.02;
        d = 0.12 + Math.random() * 0.14; // XN forms a touch later
      } else {
        const a = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random()) * R;
        x = Math.cos(a) * rr; y = Math.sin(a) * rr; z = THICK * 0.5;
        d = 0.08 + Math.random() * 0.2;
      }
    } else if (region < 0.75) {
      const a = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random()) * R;
      x = Math.cos(a) * rr; y = Math.sin(a) * rr; z = -THICK * 0.5;
      d = 0.1 + Math.random() * 0.2;
    } else {
      // edge rim — collapses first (ring forms early)
      const a = Math.random() * Math.PI * 2;
      x = Math.cos(a) * R; y = Math.sin(a) * R; z = (Math.random() - 0.5) * THICK;
      d = Math.random() * 0.05;
    }
    coin[i3] = x; coin[i3 + 1] = y; coin[i3 + 2] = z;
    delay[i] = d;
  }
  return { coin, delay };
}

export function createParticles({ count = 5000, pixelRatio = 1 } = {}) {
  const geo = new THREE.BufferGeometry();
  const chaos = buildChaos(count);
  const { coin, delay } = buildCoin(count);
  const offset = new Float32Array(count * 3);
  const size = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    offset[i * 3] = Math.random() * 6.283;
    offset[i * 3 + 1] = Math.random() * 6.283;
    offset[i * 3 + 2] = Math.random() * 6.283;
    size[i] = 0.5 + Math.random();
  }
  geo.setAttribute("position", new THREE.BufferAttribute(chaos, 3));
  geo.setAttribute("aCoinPos", new THREE.BufferAttribute(coin, 3));
  geo.setAttribute("aOffset", new THREE.BufferAttribute(offset, 3));
  geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
  geo.setAttribute("aDelay", new THREE.BufferAttribute(delay, 1));

  const uniforms = {
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uPixelRatio: { value: pixelRatio },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uMouseStrength: { value: 1.1 },
    uAlphaMultiplier: { value: 1 },
    uFlash: { value: 0 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.NormalBlending,
  });

  const object = new THREE.Points(geo, material);
  object.frustumCulled = false;

  // Retarget the collapse onto real coin-surface points (+ matching delays) so
  // the particles wrap the actual coin for a seamless fusion.
  function setCoinTargets(coinArr, delayArr) {
    if (coinArr) {
      geo.attributes.aCoinPos.array.set(coinArr);
      geo.attributes.aCoinPos.needsUpdate = true;
    }
    if (delayArr) {
      geo.attributes.aDelay.array.set(delayArr);
      geo.attributes.aDelay.needsUpdate = true;
    }
  }

  function dispose() {
    geo.dispose();
    material.dispose();
  }

  return { object, uniforms, dispose, setCoinTargets, count };
}
