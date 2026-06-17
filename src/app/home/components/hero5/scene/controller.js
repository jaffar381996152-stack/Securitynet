// Hero5 — scene controller.
// Phase 1: particle collapse.  Phase 2: photoreal coin.
// Phase 3 (this): seamless FUSION — particles target the real coin surface,
// fully tighten, then dissolve INTO the still coin, which then spins up.
import { createEngine } from "./engine.js";
import { createParticles } from "./particles.js";
import { createCoin } from "./coin.js";
import { createBackdrop } from "./backdrop.js";
import * as THREE from "three";

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Custom DARK studio environment: black surround + a few bright light panels.
// The metal reflects mostly black (dark gold) with controlled highlight streaks
// that travel as it spins — premium shine on a dark scene, no full-face blowout.
function buildStudioEnv(renderer) {
  const s = new THREE.Scene();
  s.background = new THREE.Color(0x04040a);
  const panel = (hex, intensity, pos, w, h) => {
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(intensity) });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.position.set(pos[0], pos[1], pos[2]);
    m.lookAt(0, 0, 0);
    s.add(m);
  };
  panel(0xffe0a8, 2.8, [6, 7, 5], 9, 9);    // key — warm gold so the metal reflects GOLD, not white
  panel(0xffe0b0, 1.4, [-7, 1, 3], 7, 12);  // warm fill
  panel(0xfff2da, 2.0, [0, -4, -7], 12, 7); // rim / back
  panel(0x9fb6ff, 0.5, [-3, 6, -5], 6, 6);  // cool accent
  panel(0xffe8c4, 0.7, [0, 1, 11], 22, 22); // broad front fill — keeps the tilted face warm gold, never pure black
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(s, 0.03).texture;
  pmrem.dispose();
  s.traverse((o) => {
    if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); }
  });
  return tex;
}

// Sharp GOLD spark — a bright radial burst (additive) that masks the dust->coin
// swap (hides the forming disc rim), then fades to reveal the coin.
function makeSparkTexture() {
  if (typeof document === "undefined") return null;
  const s = 256;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0.0, "rgba(255, 208, 124, 1.0)"); // bright gold core (kept gold, not white)
  g.addColorStop(0.22, "rgba(255, 192, 104, 0.9)");
  g.addColorStop(0.5, "rgba(230, 162, 78, 0.4)");
  g.addColorStop(1.0, "rgba(120, 80, 30, 0.0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createController(canvas, opts = {}) {
  const engine = createEngine(canvas, opts);
  const { scene, camera, renderer } = engine;

  // dark studio IBL — real metal reflections without blowing out on dark bg
  const envTex = buildStudioEnv(renderer);
  scene.environment = envTex;

  // shaping lights
  const key = new THREE.DirectionalLight(0xfff2d8, 1.5);
  key.position.set(3, 4, 6);
  const rim = new THREE.DirectionalLight(0xd4af6e, 0.9);
  rim.position.set(-4, -1, -3);
  const ambient = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(key, rim, ambient);

  const count = opts.mobile ? 4000 : 12000;
  const baseBloom = engine.bloom.strength;
  const baseThreshold = engine.bloom.threshold;
  const FORM_END = 0.66; // formation finishes (coin settled+spinning) by this scroll fraction

  // ambient backdrop: radial gold glow + shining gold star field (behind coin)
  const backdrop = createBackdrop({ mobile: opts.mobile });
  backdrop.setPixelRatio(renderer.getPixelRatio());
  scene.add(backdrop.group);
  const particles = createParticles({ count, pixelRatio: renderer.getPixelRatio() });
  scene.add(particles.object);

  // coin — once loaded, retarget the particles onto its real surface.
  // Slightly smaller on mobile so the (smaller) radial glow shows as a halo
  // instead of being fully covered by the front-facing coin.
  const coin = createCoin({
    targetSize: opts.mobile ? 3.2 : 4.0,
    onReady: () => {
      const pts = coin.sampleSurface(count);
      if (!pts) return;
      const delays = new Float32Array(count);
      let rmax = 0.0001;
      for (let i = 0; i < count; i++) {
        const r = Math.hypot(pts[i * 3], pts[i * 3 + 1]);
        if (r > rmax) rmax = r;
      }
      // CENTER fills first, edge last (+ organic jitter) so it forms as a solid
      // growing disc — never the hollow bright ring that edge-first produced.
      for (let i = 0; i < count; i++) {
        const r = Math.hypot(pts[i * 3], pts[i * 3 + 1]);
        const rn = Math.min(r / rmax, 1);
        delays[i] = rn * 0.18 + Math.random() * 0.14;
      }
      particles.setCoinTargets(pts, delays);
    },
  });
  scene.add(coin.group);
  coin.setOpacity(0);

  // fuse spark — drawn on top, in front of the coin, hidden until the fusion
  const sparkTex = makeSparkTexture();
  const sparkMat = new THREE.MeshBasicMaterial({
    map: sparkTex,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    opacity: 0,
  });
  const spark = new THREE.Mesh(new THREE.PlaneGeometry(13, 13), sparkMat);
  spark.position.set(0, 0, 2);
  spark.renderOrder = 6;
  scene.add(spark);

  let progress = 0;
  const mouseNdc = new THREE.Vector2(0, 0);
  const worldMouse = new THREE.Vector2(0, 0);

  function setProgress(p) { progress = p; }
  function setMouse(nx, ny) { mouseNdc.set(nx, ny); }

  function update(dt, elapsed) {
    // ambient backdrop — fades in as the dust gathers, then stays constant
    backdrop.setIntensity(smoothstep(0.1, 0.45, progress));
    backdrop.update(dt, elapsed);

    // FORMATION occupies the first FORM_END of scroll; re-scale progress so the
    // whole fusion sequence completes (coin settled + spinning) by FORM_END,
    // leaving the rest of the scroll for the title choreography.
    const formP = Math.min(progress / FORM_END, 1);

    // particles fully collapse into a dense solid disc by 80% of formation
    particles.uniforms.uProgress.value = Math.min(formP / 0.80, 1);
    particles.uniforms.uTime.value = elapsed;

    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * camera.position.z;
    const halfW = halfH * camera.aspect;
    worldMouse.set(mouseNdc.x * halfW, mouseNdc.y * halfH);
    particles.uniforms.uMouse.value.copy(worldMouse);

    // FUSION with a SHARP GOLD SPARK that masks the swap (all driven by formP):
    //  - the dust packs into a dense ball (~0.66-0.74) -> spark flares & reaches
    //    FULL right as the ball finishes, so the disc/rim never shows bare
    //  - UNDER the full spark (0.74->0.80) the dust dissolves + the coin fills in
    //  - the spark fades (0.80->0.88) -> the solid coin is revealed instantly
    const spark = smoothstep(0.66, 0.74, formP) * (1 - smoothstep(0.80, 0.88, formP));
    sparkMat.opacity = spark;

    // dust glows gold into the spark as it packs
    const dustFlash = smoothstep(0.64, 0.74, formP) * (1 - smoothstep(0.74, 0.82, formP));
    particles.uniforms.uFlash.value = dustFlash;
    engine.bloom.threshold = baseThreshold - spark * 0.5;
    engine.bloom.strength = baseBloom + spark * (opts.mobile ? 0.5 : 0.85);

    // dust dissolves + coin reaches full UNDER the spark (rim hidden the whole time)
    particles.uniforms.uAlphaMultiplier.value = 1 - smoothstep(0.76, 0.80, formP);
    coin.setOpacity(smoothstep(0.75, 0.80, formP));
    const spinFactor = smoothstep(0.93, 1.0, formP);
    coin.update(dt, elapsed, spinFactor);

    // (the post-formation phase, progress > FORM_END, drives the DOM CTA buttons
    // imperatively from the React hook's onProgress — see ParticleCollapseHero)

    engine.render();
  }

  function setSize(w, h) {
    engine.setSize(w, h);
    particles.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    backdrop.setPixelRatio(renderer.getPixelRatio());
  }

  function dispose() {
    scene.remove(backdrop.group);
    backdrop.dispose();
    scene.remove(particles.object);
    particles.dispose();
    scene.remove(coin.group);
    coin.dispose();
    scene.remove(spark);
    spark.geometry.dispose();
    sparkMat.dispose();
    sparkTex && sparkTex.dispose();
    scene.remove(key, rim, ambient);
    scene.environment = null;
    envTex.dispose();
    engine.dispose();
  }

  return { setProgress, setMouse, update, setSize, dispose, engine };
}
