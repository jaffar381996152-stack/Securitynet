"use client";

import { motion } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * A tiny spinning XN coin used as the icon inside toast notifications —
 * replaces react-hot-toast's generic check/cross glyphs with a small
 * piece of brand identity that spins into place when an action succeeds.
 *
 * Deliberately minimal (no glow rings, no SVG gradients) so it stays
 * crisp at icon size and never distracts from the toast message.
 */
export default function ToastCoin({ tone = "brand" }) {
  const reducedMotion = useReducedMotion();
  const palette = {
    brand: ["#F9A328", "#C24CF2"],
    success: ["#22C55E", "#00D4FF"],
    error: ["#F43F5E", "#C24CF2"],
  }[tone] || ["#F9A328", "#C24CF2"];

  return (
    <motion.span
      className="inline-flex items-center justify-center rounded-full shrink-0"
      style={{
        width: 20,
        height: 20,
        background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 100%)`,
        boxShadow: `0 0 10px ${palette[0]}66`,
        fontSize: 9,
        fontWeight: 800,
        color: "rgba(8,11,20,0.85)",
        fontFamily: "Sora, sans-serif",
      }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 16 }}
    >
      <motion.span
        animate={reducedMotion ? undefined : { rotateY: [0, 360] }}
        transition={reducedMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "linear" }}
        style={{ display: "inline-block" }}
      >
        XN
      </motion.span>
    </motion.span>
  );
}
