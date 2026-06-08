"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

const HALO_BASE = 40;
const CORE_BASE = 7;

/**
 * A soft glowing trail that follows the mouse on desktop — a small,
 * premium detail that makes the site feel alive without calling
 * attention to itself. Two layers (a tight core + a slower-trailing
 * halo) glide toward the pointer on spring physics, gently swelling
 * over interactive elements.
 *
 * Perf note: position and hover-grow are driven entirely by `transform`
 * (translate + scale) on fixed-size elements — never `left`/`top`/
 * `width`/`height` — so 60fps mouse tracking never triggers layout or
 * paint, only compositing.
 *
 * Self-disables on touch devices, coarse pointers, and for users who
 * prefer reduced motion — they get the plain native cursor.
 */
export default function CursorGlow() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const coreX = useSpring(x, { damping: 35, stiffness: 700, mass: 0.4 });
  const coreY = useSpring(y, { damping: 35, stiffness: 700, mass: 0.4 });
  const haloX = useSpring(x, { damping: 28, stiffness: 160, mass: 0.7 });
  const haloY = useSpring(y, { damping: 28, stiffness: 160, mass: 0.7 });
  const scale = useSpring(1, { damping: 20, stiffness: 260 });

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mql.matches);
    const handler = (e) => setEnabled(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotion) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const isInteractive = !!e.target.closest?.("a, button, input, textarea, select, [role='button']");
      setHovering(isInteractive);
      scale.set(isInteractive ? 1.6 : 1);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, reducedMotion, x, y, scale]);

  if (!enabled || reducedMotion) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
      {/* Slow trailing halo — translate + scale only, GPU-composited */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: 0,
          top: 0,
          width: HALO_BASE,
          height: HALO_BASE,
          marginLeft: -HALO_BASE / 2,
          marginTop: -HALO_BASE / 2,
          x: haloX,
          y: haloY,
          scale,
          background:
            "radial-gradient(circle, rgba(0,212,255,0.16) 0%, rgba(194,76,242,0.10) 50%, transparent 75%)",
          filter: "blur(6px)",
        }}
      />
      {/* Tight glowing core */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: 0,
          top: 0,
          width: CORE_BASE,
          height: CORE_BASE,
          marginLeft: -CORE_BASE / 2,
          marginTop: -CORE_BASE / 2,
          x: coreX,
          y: coreY,
          scale,
          opacity: hovering ? 0.9 : 0.7,
          background: "var(--accent-cyan)",
          boxShadow: "0 0 12px var(--accent-cyan), 0 0 24px rgba(0,212,255,0.45)",
        }}
      />
    </div>
  );
}
