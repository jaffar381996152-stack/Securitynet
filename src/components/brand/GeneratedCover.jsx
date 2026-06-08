"use client";

import { motion } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

const PALETTES = [
  ["#483AA0", "#00D4FF", "#080B14"],
  ["#7B5EA7", "#A78BFA", "#080B14"],
  ["#00D4FF", "#6C5CE7", "#080B14"],
  ["#F9A328", "#7B5EA7", "#080B14"],
  ["#6C5CE7", "#00D4FF", "#080B14"],
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Code-drawn blog/article cover — a unique animated gradient mesh with
 * drifting glow orbs and a faint network-line overlay, deterministically
 * generated from the post title. No two posts render identically, and
 * nothing is a static photo.
 */
export default function GeneratedCover({ seed = "", className = "" }) {
  const reducedMotion = useReducedMotion();
  const loop = (animate, transition) =>
    reducedMotion ? {} : { animate, transition };
  const hash = hashString(seed);
  const [c1, c2, c3] = PALETTES[hash % PALETTES.length];
  const angle = hash % 360;
  const orbX = 20 + (hash % 50);
  const orbY = 15 + ((hash >> 3) % 55);

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ background: c3 }}
      aria-hidden="true"
    >
      {/* Base gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${angle}deg, ${c1}55 0%, ${c3} 60%)`,
        }}
      />

      {/* Drifting glow orb 1 */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "60%",
          height: "60%",
          left: `${orbX}%`,
          top: `${orbY}%`,
          background: `radial-gradient(circle, ${c1}66 0%, transparent 70%)`,
          filter: "blur(28px)",
        }}
        {...loop({ x: [0, 24, 0], y: [0, -16, 0] }, { duration: 14, repeat: Infinity, ease: "easeInOut" })}
      />

      {/* Drifting glow orb 2 */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "45%",
          height: "45%",
          right: `${orbX / 2}%`,
          bottom: `${orbY / 2}%`,
          background: `radial-gradient(circle, ${c2}55 0%, transparent 70%)`,
          filter: "blur(24px)",
        }}
        {...loop({ x: [0, -20, 0], y: [0, 14, 0] }, { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 })}
      />

      {/* Faint network-node overlay — ties into "AI / blockchain" theme */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.18]" preserveAspectRatio="none">
        <line x1="10%" y1="20%" x2="45%" y2="55%" stroke={c2} strokeWidth="1" />
        <line x1="45%" y1="55%" x2="80%" y2="30%" stroke={c1} strokeWidth="1" />
        <line x1="45%" y1="55%" x2="60%" y2="85%" stroke={c2} strokeWidth="1" />
        <circle cx="10%" cy="20%" r="3" fill={c1} />
        <circle cx="45%" cy="55%" r="3.5" fill={c2} />
        <circle cx="80%" cy="30%" r="3" fill={c1} />
        <circle cx="60%" cy="85%" r="2.5" fill={c2} />
      </svg>

      {/* Subtle scan-line sweep */}
      <motion.div
        className="absolute inset-x-0 h-1/3 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${c1}1a, transparent)`,
        }}
        {...loop({ top: ["-33%", "100%"] }, { duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 2 })}
      />

      {/* Darkening layer for text legibility when overlaid */}
      <div className="absolute inset-0" style={{ background: "rgba(8,11,20,0.18)" }} />
    </div>
  );
}
