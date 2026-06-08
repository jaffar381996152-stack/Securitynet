"use client";

import { motion } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * A soft glowing seam dropped between major sections so the page never
 * "cuts" from one block of content to the next — instead a thin holo
 * gradient line blooms softly into view as you scroll past it, then
 * settles into a slow ambient pulse.
 */
export default function SectionGlowDivider({ className = "" }) {
  const reducedMotion = useReducedMotion();
  return (
    <div className={`relative h-px w-full overflow-visible ${className}`} aria-hidden="true">
      {/* Soft radial bloom behind the line */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "min(720px, 90%)",
          height: 120,
          background:
            "radial-gradient(ellipse 50% 100% at 50% 50%, rgba(194,76,242,0.16) 0%, rgba(0,212,255,0.08) 45%, transparent 75%)",
          filter: "blur(28px)",
        }}
        initial={{ opacity: 0, scaleX: 0.6 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Thin holo gradient seam */}
      <motion.div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
        style={{ background: "var(--gradient-holo-soft)", backgroundSize: "200% 100%" }}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      {!reducedMotion && (
        <motion.div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
          style={{ background: "var(--gradient-holo-soft)", backgroundSize: "200% 100%" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
