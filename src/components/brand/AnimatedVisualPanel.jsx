"use client";

import { motion } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * Code-drawn abstract visual panel — replaces static photography in
 * hero/feature/about sections. Draws a glowing grid, an animated icon
 * badge with pulsing rings, and drifting ambient particles. Fully
 * themeable via `accent` and respects the glass-frame layout it sits in.
 */
export default function AnimatedVisualPanel({
  icon: Icon,
  accent = "#00D4FF",
  accent2 = "#6C5CE7",
  label,
  className = "",
}) {
  const reducedMotion = useReducedMotion();
  // Drops every continuous loop to its resting frame for reduced-motion users —
  // the panel stays a calm static gradient/grid instead of a wall of motion.
  const loop = (animate, transition) =>
    reducedMotion ? {} : { animate, transition };

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${accent2}1f 0%, transparent 70%), var(--bg-glass)`,
      }}
      aria-hidden="true"
    >
      {/* Animated perspective grid */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `linear-gradient(${accent}55 1px, transparent 1px), linear-gradient(90deg, ${accent}55 1px, transparent 1px)`,
          backgroundSize: "42px 42px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 80%)",
        }}
      />

      {/* Drifting glow orbs */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "55%",
          height: "55%",
          left: "8%",
          top: "12%",
          background: `radial-gradient(circle, ${accent}33 0%, transparent 70%)`,
          filter: "blur(36px)",
        }}
        {...loop({ x: [0, 20, 0], y: [0, -14, 0] }, { duration: 13, repeat: Infinity, ease: "easeInOut" })}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "45%",
          height: "45%",
          right: "6%",
          bottom: "10%",
          background: `radial-gradient(circle, ${accent2}33 0%, transparent 70%)`,
          filter: "blur(32px)",
        }}
        {...loop({ x: [0, -16, 0], y: [0, 12, 0] }, { duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1.5 })}
      />

      {/* Floating ambient dots — skipped for reduced-motion (would be 10 simultaneous loops) */}
      {!reducedMotion && [...Array(10)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            left: `${(i * 37) % 92}%`,
            top: `${(i * 53) % 88}%`,
            background: i % 2 === 0 ? accent : accent2,
            opacity: 0.45,
          }}
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        />
      ))}

      {/* Central icon badge with pulsing rings */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          {[0, 1, 2].map((ring) => (
            <motion.span
              key={ring}
              className="absolute rounded-full border"
              style={{
                width: 88 + ring * 36,
                height: 88 + ring * 36,
                borderColor: `${accent}2e`,
              }}
              {...loop(
                { scale: [1, 1.08, 1], opacity: [0.5, 0.15, 0.5] },
                { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: ring * 0.6 }
              )}
            />
          ))}
          <motion.div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: 88,
              height: 88,
              background: `linear-gradient(135deg, ${accent}30 0%, ${accent2}30 100%)`,
              border: `1px solid ${accent}55`,
              boxShadow: `0 0 50px ${accent}40`,
            }}
            {...loop({ y: [0, -6, 0] }, { duration: 5, repeat: Infinity, ease: "easeInOut" })}
          >
            {Icon && <Icon size={36} color={accent} strokeWidth={1.6} />}
          </motion.div>
        </div>

        {label && (
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--text-secondary)" }}
          >
            {label}
          </span>
        )}
      </div>

      {/* Slow scan-line sweep */}
      <motion.div
        className="absolute inset-x-0 h-1/4 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${accent}14, transparent)` }}
        {...loop({ top: ["-25%", "100%"] }, { duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 3 })}
      />
    </div>
  );
}
