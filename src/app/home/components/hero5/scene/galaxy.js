// Standalone galaxy background (no coin). Reuses the hero engine + the galaxy
// backdrop (radial gold glow + shining stars + shooting stars) so the site-wide
// background matches the homepage hero exactly. Used by components/shell/GalaxyBackground.
import { createEngine } from "./engine.js";
import { createBackdrop } from "./backdrop.js";

export function createGalaxy(canvas, opts = {}) {
  const engine = createEngine(canvas, opts);
  const backdrop = createBackdrop({ mobile: opts.mobile });
  backdrop.setPixelRatio(engine.renderer.getPixelRatio());
  backdrop.setIntensity(1); // always fully visible (no scroll-gather here)
  engine.scene.add(backdrop.group);

  function update(dt, elapsed) {
    backdrop.update(dt, elapsed);
    engine.render();
  }

  function setSize(w, h) {
    engine.setSize(w, h);
    backdrop.setPixelRatio(engine.renderer.getPixelRatio());
  }

  function dispose() {
    engine.scene.remove(backdrop.group);
    backdrop.dispose();
    engine.dispose();
  }

  return { update, setSize, dispose };
}
