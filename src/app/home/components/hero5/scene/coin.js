// Hero5 — the photoreal solid coin.
// Loads gold_coin.glb, centers/scales it (radius ~2), retunes to premium gold
// PBR, adds bump-mapped XN (front) + shield (back) relief decals so the
// engraving catches raking light, and exposes idle spin/float, opacity fade,
// and surface sampling (for seamless particle fusion).
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

// Relief-only heightfield -> bumpMap. Pure shape, NO colour change: the glyph
// is raised proud of the coin surface (black field = low, white glyph = high)
// with a soft blurred bevel, so XN/shield stand out prominently while staying
// the same gold as the rest of the coin.
function makeBumpTexture(draw) {
  if (typeof document === "undefined") return null;
  const s = 512;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#000"; // coin surface (low)
  ctx.fillRect(0, 0, s, s);
  ctx.fillStyle = "#fff"; // glyph raised over the surface
  ctx.strokeStyle = "#fff";
  ctx.filter = "blur(2px)"; // smooth bevel walls (not a razor edge)
  draw(ctx, s);
  ctx.filter = "none";
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.NoColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function drawXN(ctx, s) {
  ctx.font = "800 300px 'Barlow Condensed', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("XN", s / 2, s / 2 + 12);
}

function drawShield(ctx, s) {
  const cx = s / 2, cy = s / 2, w = s * 0.52, h = s * 0.64;
  ctx.lineWidth = s * 0.045;
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(cx, cy - h / 2);
  ctx.lineTo(cx + w / 2, cy - h / 4);
  ctx.lineTo(cx + w / 2, cy + h / 8);
  ctx.quadraticCurveTo(cx + w / 2, cy + h / 2, cx, cy + h / 2 + s * 0.05);
  ctx.quadraticCurveTo(cx - w / 2, cy + h / 2, cx - w / 2, cy + h / 8);
  ctx.lineTo(cx - w / 2, cy - h / 4);
  ctx.closePath();
  ctx.stroke();
  ctx.lineWidth = s * 0.05;
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.09, cy);
  ctx.lineTo(cx - s * 0.02, cy + s * 0.09);
  ctx.lineTo(cx + s * 0.11, cy - s * 0.08);
  ctx.stroke();
}

export function createCoin({ onReady } = {}) {
  const group = new THREE.Group();   // spins on Y (after fusion)
  const orient = new THREE.Group();  // upright facing camera
  group.add(orient);
  group.visible = false;

  const materials = [];
  const disposables = [];
  let mainMesh = null;
  let loaded = false;

  const loader = new GLTFLoader();
  loader.load(
    "/coin/gold_coin.glb",
    (gltf) => {
      const model = gltf.scene;

      let box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);
      model.position.sub(center);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      model.scale.setScalar(4.0 / maxDim);

      model.traverse((o) => {
        if (o.isMesh && o.geometry) {
          if (!mainMesh || o.geometry.attributes.position.count > mainMesh.geometry.attributes.position.count) {
            mainMesh = o;
          }
          const list = Array.isArray(o.material) ? o.material : [o.material];
          list.forEach((m) => {
            if (!m) return;
            m.color = new THREE.Color(0xd4af6e);
            m.metalness = 0.88;
            m.roughness = 0.38;
            m.envMapIntensity = 1.0;
            if ("emissive" in m) {
              m.emissive = new THREE.Color(0x1a1206);
              m.emissiveIntensity = 0.08;
            }
            m.transparent = false;
            m.depthWrite = true;
            m.needsUpdate = true;
            materials.push(m);
          });
        }
      });

      orient.rotation.x = 0.22; // gentle tilt -> reads as a 3D coin, face stays lit
      orient.add(model);

      // ---- face relief decals (bump-mapped) ----
      box = new THREE.Box3().setFromObject(model);
      const faceR = Math.min(box.max.x, box.max.y) * 0.9;
      const frontZ = box.max.z;
      const backZ = box.min.z;

      const mkDecal = (bumpTex, z, facingBack) => {
        if (!bumpTex) return;
        disposables.push(bumpTex);
        const mat = new THREE.MeshStandardMaterial({
          color: 0xd4af6e, // SAME gold as the coin — relief only, no colour change
          metalness: 0.88,
          roughness: 0.38,
          envMapIntensity: 1.0,
          bumpMap: bumpTex,
          bumpScale: 0.4, // prominent raised relief
        });
        materials.push(mat);
        const mesh = new THREE.Mesh(new THREE.CircleGeometry(faceR, 64), mat);
        mesh.position.z = z;
        if (facingBack) mesh.rotation.y = Math.PI;
        orient.add(mesh);
      };
      mkDecal(makeBumpTexture(drawXN), frontZ + 0.004, false);
      mkDecal(makeBumpTexture(drawShield), backZ - 0.004, true);

      loaded = true;
      if (onReady) onReady();
    },
    undefined,
    (err) => console.error("[hero5] coin glb load failed", err)
  );

  function sampleSurface(count) {
    if (!mainMesh) return null;
    const savedY = group.rotation.y;
    const savedPY = group.position.y;
    group.rotation.y = 0;
    group.position.y = 0;
    group.updateMatrixWorld(true);
    const sampler = new MeshSurfaceSampler(mainMesh).build();
    const arr = new Float32Array(count * 3);
    const v = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      sampler.sample(v);
      v.applyMatrix4(mainMesh.matrixWorld);
      arr[i * 3] = v.x;
      arr[i * 3 + 1] = v.y;
      arr[i * 3 + 2] = v.z;
    }
    group.rotation.y = savedY;
    group.position.y = savedPY;
    return arr;
  }

  function update(dt, elapsed, spinFactor = 1) {
    if (!loaded) return;
    const k = Math.min(1, dt * 6);
    if (spinFactor > 0.001) {
      // settled at the end — free idle spin + gentle float
      group.rotation.y += dt * 0.32 * spinFactor;
      group.position.y = Math.sin(elapsed * 0.7) * 0.06 * spinFactor;
    } else {
      // during/before fusion — stay POSE-LOCKED to the particle targets
      // (front-facing, rotation 0). This is deterministic & reversible, so
      // scrubbing back into the fusion zone never shows a pre-spun coin.
      group.rotation.y += (0 - group.rotation.y) * k;
      group.position.y += (0 - group.position.y) * k;
    }
  }

  function setOpacity(v) {
    group.visible = v > 0.001;
    const transparent = v < 0.999;
    materials.forEach((m) => {
      m.transparent = transparent;
      m.opacity = v;
      m.depthWrite = !transparent;
    });
  }

  function dispose() {
    disposables.forEach((t) => t.dispose && t.dispose());
    group.traverse((o) => {
      if (o.isMesh) {
        o.geometry && o.geometry.dispose();
        const list = Array.isArray(o.material) ? o.material : [o.material];
        list.forEach((m) => {
          if (!m) return;
          for (const k in m) {
            const val = m[k];
            if (val && val.isTexture) val.dispose();
          }
          m.dispose();
        });
      }
    });
  }

  return { group, update, setOpacity, dispose, sampleSurface, isLoaded: () => loaded };
}
