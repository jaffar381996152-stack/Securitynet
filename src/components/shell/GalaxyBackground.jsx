"use client";
import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

// Site-wide animated background: the same galaxy as the homepage hero — radial
// gold glow + shining stars + shooting stars. One WebGL context, created once and
// kept across route changes (no dispose/recreate churn). Hidden + paused on the
// homepage, where the hero renders its own galaxy.
export default function GalaxyBackground() {
  const pathname = usePathname();
  const canvasRef = useRef(null);
  const hiddenRef = useRef(false);

  // keep the render loop aware of the current route without re-running the effect
  hiddenRef.current = pathname === "/";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctrl;
    let raf = 0;
    let disposed = false;
    let cancelled = false;

    import("@/app/home/components/hero5/scene/galaxy.js")
      .then(({ createGalaxy }) => {
        if (cancelled || disposed) return;
        const mobile = window.innerWidth < 768;
        try {
          ctrl = createGalaxy(canvas, { mobile });
        } catch (e) {
          console.error("[galaxy] init failed", e);
          return;
        }

        const resize = () => {
          const w = canvas.clientWidth;
          const h = canvas.clientHeight;
          if (w && h) ctrl.setSize(w, h);
        };
        resize();
        window.addEventListener("resize", resize);

        let last = performance.now();
        let elapsed = 0;
        const loop = () => {
          const now = performance.now();
          const dt = Math.min((now - last) / 1000, 0.05);
          last = now;
          if (!hiddenRef.current) {
            elapsed += dt;
            ctrl.update(dt, elapsed); // paused on the homepage
          }
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        ctrl.__cleanup = () => window.removeEventListener("resize", resize);
      })
      .catch((e) => console.error("[galaxy] import failed", e));

    return () => {
      disposed = true;
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      if (ctrl) {
        try { ctrl.__cleanup && ctrl.__cleanup(); } catch {}
        try { ctrl.dispose(); } catch {}
      }
    };
  }, []); // created once; persists across route changes

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
        opacity: pathname === "/" ? 0 : 1, // homepage hero has its own galaxy
        transition: "opacity 0.4s ease",
      }}
    />
  );
}
