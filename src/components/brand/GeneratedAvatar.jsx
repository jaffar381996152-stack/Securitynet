"use client";

import { motion } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

const GRADIENTS = [
  ["#00D4FF", "#6C5CE7"],
  ["#7B5EA7", "#00D4FF"],
  ["#F9A328", "#A78BFA"],
  ["#6C5CE7", "#A78BFA"],
  ["#00D4FF", "#F9A328"],
  ["#A78BFA", "#00D4FF"],
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function initialsOf(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Code-drawn avatar — a glowing gradient disc (deterministic per name)
 * with the person's initials and a slow-rotating ring accent.
 * Replaces static headshot photos site-wide.
 */
export default function GeneratedAvatar({ name = "?", size = 64, className = "" }) {
  const reducedMotion = useReducedMotion();
  const seed = hashString(name);
  const [from, to] = GRADIENTS[seed % GRADIENTS.length];
  const gradientId = `avatar-grad-${seed}`;
  const initials = initialsOf(name) || "?";

  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" className="absolute inset-0">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill={`url(#${gradientId})`} opacity="0.9" />
        <circle cx="50" cy="50" r="50" fill="rgba(8,11,20,0.28)" />
      </svg>

      {/* Slow-rotating glow ring accent — static ring for reduced-motion users */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          border: "1.5px solid rgba(255,255,255,0.22)",
          borderTopColor: "rgba(255,255,255,0.6)",
        }}
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={reducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <span
        className="relative font-sora font-bold text-white"
        style={{ fontSize: size * 0.34, textShadow: "0 1px 8px rgba(0,0,0,0.35)" }}
      >
        {initials}
      </span>
    </span>
  );
}
