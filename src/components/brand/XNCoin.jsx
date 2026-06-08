"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * The XN Coin — SecurityNet's signature animated brand mark. One
 * SVG-drawn, glowing, gently spinning coin reused everywhere: hero,
 * presale widget, ambient background motion, and (via CoinBurst)
 * the "purchase successful" celebration.
 *
 * Drawn live with code (gradients + real CSS 3D transforms) — no
 * image/3D-model file, so it's instant to load and infinitely reusable.
 *
 * @param {number}  size       Pixel diameter of the coin
 * @param {boolean} spin       Continuous gentle 3D rotation (hero/ambient)
 * @param {boolean} float      Subtle vertical bobbing (for background use)
 * @param {boolean} glow       Pulsing halo rings behind the coin
 * @param {number}  spinDuration  Seconds per full rotation loop
 * @param {string}  className
 */
export default function XNCoin({
  size = 120,
  spin = true,
  float = false,
  glow = true,
  spinDuration = 9,
  className = "",
}) {
  const reducedMotion = useReducedMotion();
  const spinning = spin && !reducedMotion;
  const floating = float && !reducedMotion;
  const glowing = glow && !reducedMotion;

  const id = useId().replace(/:/g, "");
  const faceId = `xn-coin-face-${id}`;
  const rimId = `xn-coin-rim-${id}`;
  const glowId = `xn-coin-glow-${id}`;

  const coin = (
    <div style={{ perspective: 1000, width: size, height: size }} className="relative">
      <motion.div
        style={{ width: size, height: size, transformStyle: "preserve-3d" }}
        animate={spinning ? { rotateY: [0, 360] } : undefined}
        transition={
          spinning
            ? { duration: spinDuration, repeat: Infinity, ease: "linear" }
            : undefined
        }
      >
        <svg width={size} height={size} viewBox="0 0 120 120">
          <defs>
            <radialGradient id={faceId} cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#FDF6E3" />
              <stop offset="30%" stopColor="#F9A328" />
              <stop offset="65%" stopColor="#C24CF2" />
              <stop offset="100%" stopColor="#00D4FF" />
            </radialGradient>
            <linearGradient id={rimId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0D9A8" />
              <stop offset="50%" stopColor="#7B5EA7" />
              <stop offset="100%" stopColor="#00D4FF" />
            </linearGradient>
            <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer rim */}
          <circle cx="60" cy="60" r="54" fill="none" stroke={`url(#${rimId})`} strokeWidth="3" opacity="0.55" />
          {/* Coin face */}
          <circle cx="60" cy="60" r="50" fill={`url(#${faceId})`} filter={`url(#${glowId})`} />
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="40" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
          {/* Tick marks around the rim — like a minted edge */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const x1 = 60 + Math.cos(angle) * 47;
            const y1 = 60 + Math.sin(angle) * 47;
            const x2 = 60 + Math.cos(angle) * 51;
            const y2 = 60 + Math.sin(angle) * 51;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.2"
              />
            );
          })}
          {/* Brand mark */}
          <text
            x="60"
            y="71"
            textAnchor="middle"
            fontSize="32"
            fontWeight="800"
            letterSpacing="0.5"
            fill="rgba(8,11,20,0.80)"
            fontFamily="Sora, sans-serif"
          >
            XN
          </text>
        </svg>
      </motion.div>
    </div>
  );

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {glowing &&
        [0, 1].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size * (1.35 + i * 0.4),
              height: size * (1.35 + i * 0.4),
              background:
                "radial-gradient(circle, rgba(249,163,40,0.16) 0%, rgba(194,76,242,0.10) 45%, transparent 72%)",
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.25, 0.55] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          />
        ))}

      {floating ? (
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          {coin}
        </motion.div>
      ) : (
        coin
      )}
    </div>
  );
}
