"use client";
import { useEffect } from "react";

// Drives the Hero5 WebGL controller: native sticky-pin scroll progress (Lenis
// updates window scroll, so this stays in sync), manual scrub-smoothing, a RAF
// render loop, and strict disposal on unmount (StrictMode / route-change safe).
export function useParticleHero({ sectionRef, canvasRef, onProgress }) {
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    let controller;
    let raf = 0;
    let disposed = false;

    let importCancelled = false;
    import("./scene/controller.js")
      .then(({ createController }) => {
        if (importCancelled || disposed) return;
        const mobile = window.innerWidth < 768;
        try {
          controller = createController(canvas, { mobile });
        } catch (e) {
          console.error("[hero5] init failed", e);
          return;
        }

        const resize = () => {
          const w = canvas.clientWidth;
          const h = canvas.clientHeight;
          if (w && h) controller.setSize(w, h);
        };
        resize();
        window.addEventListener("resize", resize);

        let targetP = 0;
        const onScroll = () => {
          const rect = section.getBoundingClientRect();
          const scrollable = section.offsetHeight - window.innerHeight;
          const scrolled = Math.max(0, -rect.top);
          targetP = scrollable > 0 ? Math.min(scrolled / scrollable, 1) : 0;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        const onPointer = (e) => {
          const rect = canvas.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
          controller.setMouse(nx, ny);
        };
        window.addEventListener("pointermove", onPointer, { passive: true });

        let last = performance.now();
        let elapsed = 0;
        let currentP = 0;
        const loop = () => {
          const now = performance.now();
          const dt = Math.min((now - last) / 1000, 0.05);
          last = now;
          elapsed += dt;
          // scrub smoothing — ease current toward scroll target
          currentP += (targetP - currentP) * Math.min(1, dt * 6);
          controller.setProgress(currentP);
          if (onProgress) onProgress(currentP);
          controller.update(dt, elapsed);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        // stash cleanup for the outer return
        controller.__cleanup = () => {
          window.removeEventListener("resize", resize);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("pointermove", onPointer);
        };
      })
      .catch((e) => console.error("[hero5] import failed", e));

    return () => {
      disposed = true;
      importCancelled = true;
      if (raf) cancelAnimationFrame(raf);
      if (controller) {
        try { controller.__cleanup && controller.__cleanup(); } catch {}
        try { controller.dispose(); } catch {}
      }
    };
  }, [sectionRef, canvasRef, onProgress]);
}
