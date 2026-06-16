// Hero5 — WebGL engine (renderer + camera + composer/bloom + tone mapping).
// Framework-agnostic; the React hook owns the loop, scroll, and lifecycle.
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

export function createEngine(canvas, { mobile = false } = {}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0e);

  const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  // Post-processing: render -> bloom -> output (tone map + sRGB)
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(1, 1),
    mobile ? 0.0 : 0.1, // strength — subtle rim sheen only
    0.5, // radius
    0.96 // threshold — only the brightest edge blooms
  );
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  // initial size; the hook calls setSize() with real dimensions
  setSize(1, 1);

  function setSize(w, h) {
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    bloom.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function render() {
    composer.render();
  }

  function dispose() {
    try { composer.dispose && composer.dispose(); } catch {}
    try { bloom.dispose && bloom.dispose(); } catch {}
    renderer.dispose();
    const gl = renderer.getContext && renderer.getContext();
    const lose = gl && gl.getExtension && gl.getExtension("WEBGL_lose_context");
    if (lose) try { lose.loseContext(); } catch {}
  }

  return { THREE, renderer, scene, camera, composer, bloom, setSize, render, dispose };
}
