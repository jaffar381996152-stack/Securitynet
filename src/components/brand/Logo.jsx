"use client";

import { motion } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * Code-drawn brand mark — a hexagonal "shield" outline with a pulsing
 * core and an animated gradient sweep, paired with the wordmark.
 * No raster image; renders identically everywhere it's used.
 */
export default function Logo({ size = 48, showWordmark = true, className = "" }) {
  const reducedMotion = useReducedMotion();
  const loop = (animate, transition) => (reducedMotion ? {} : { animate, transition });
  const gradientId = "logo-gradient";
  const glowId = "logo-glow";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="55%" stopColor="#6C5CE7" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Hexagonal shield outline */}
        <motion.path
          d="M24 3 L42 12.5 V31.5 L24 41 L6 31.5 V12.5 Z"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinejoin="round"
          fill="rgba(0,212,255,0.04)"
          filter={`url(#${glowId})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />

        {/* Inner "eye / node" core — pulses gently */}
        <motion.circle
          cx="24"
          cy="22"
          r="5.5"
          fill={`url(#${gradientId})`}
          {...loop({ opacity: [0.65, 1, 0.65], scale: [1, 1.12, 1] }, { duration: 3.2, repeat: Infinity, ease: "easeInOut" })}
        />

        {/* Connector ticks — suggest a network / blockchain node */}
        <motion.path
          d="M24 8 V14.5 M24 29.5 V36 M12 16 L17.5 19 M30.5 25 L36 28 M36 16 L30.5 19 M17.5 25 L12 28"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.55"
          {...loop({ opacity: [0.3, 0.6, 0.3] }, { duration: 4, repeat: Infinity, ease: "easeInOut" })}
        />
      </motion.svg>

      {showWordmark && (
        <span
          className="font-sora font-bold tracking-tight leading-none"
          style={{ fontSize: size * 0.42 }}
        >
          <span className="text-gradient-cyan">Security</span>
          <span style={{ color: "var(--text-primary)" }}>Net</span>
        </span>
      )}
    </span>
  );
}
