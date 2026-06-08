"use client";

import { motion } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * A faint horizontal light beam that occasionally sweeps down across
 * the page — the classic "high-tech / AI scanner" cue. Sits fixed,
 * far behind content, and pauses for long stretches between passes
 * so it reads as an occasional flourish rather than a loop you notice.
 *
 * Renders nothing for reduced-motion users.
 */
export default function ScanlineSweep() {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Faint static tech grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 75%)",
        }}
      />

      {/* Sweeping horizontal beam */}
      <motion.div
        className="absolute left-0 right-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,212,255,0.05) 45%, rgba(194,76,242,0.07) 55%, transparent 100%)",
        }}
        initial={{ top: "-20%" }}
        animate={{ top: ["-20%", "120%"] }}
        transition={{
          duration: 7,
          ease: [0.45, 0, 0.55, 1],
          repeat: Infinity,
          repeatDelay: 14,
        }}
      />
    </div>
  );
}
