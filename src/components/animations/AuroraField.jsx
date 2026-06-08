"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * Slow-drifting glowing gradient clouds — an "aurora" layer that sits
 * fixed behind every page, well below the content. Pure ambient
 * atmosphere: large, heavily blurred, low-opacity blobs that creep
 * around on long loops so the site always feels quietly alive.
 *
 * Renders nothing for reduced-motion users — the static mesh gradient
 * in globals.css already gives the base atmosphere without motion.
 */
const blobs = [
  {
    background: "radial-gradient(circle, rgba(0,212,255,0.16) 0%, transparent 70%)",
    size: 620,
    start: { top: "-12%", left: "-8%" },
    move: { x: [0, 90, -30, 0], y: [0, 60, 110, 0] },
    duration: 46,
  },
  {
    background: "radial-gradient(circle, rgba(194,76,242,0.14) 0%, transparent 70%)",
    size: 540,
    start: { top: "55%", left: "62%" },
    move: { x: [0, -70, 40, 0], y: [0, -50, -100, 0] },
    duration: 52,
  },
  {
    background: "radial-gradient(circle, rgba(249,163,40,0.10) 0%, transparent 70%)",
    size: 480,
    start: { top: "68%", left: "6%" },
    move: { x: [0, 60, 20, 0], y: [0, -40, -90, 0] },
    duration: 60,
  },
  {
    background: "radial-gradient(circle, rgba(108,92,231,0.13) 0%, transparent 70%)",
    size: 560,
    start: { top: "4%", left: "58%" },
    move: { x: [0, -50, 70, 0], y: [0, 80, 30, 0] },
    duration: 54,
  },
];

export default function AuroraField() {
  const reducedMotion = useReducedMotion();
  // Filtered + blended full-viewport layers are costly to rasterize on
  // older/cheaper phones — halve the blob count below the sm breakpoint
  // (matches the throttling ParticleField already applies on mobile).
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (reducedMotion) return null;

  const visibleBlobs = isMobile ? blobs.slice(0, 2) : blobs;

  return (
    <div
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"
      style={{ filter: isMobile ? "blur(60px)" : "blur(90px)" }}
      aria-hidden="true"
    >
      {visibleBlobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            background: b.background,
            ...b.start,
            mixBlendMode: "screen",
          }}
          animate={{ x: b.move.x, y: b.move.y }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
