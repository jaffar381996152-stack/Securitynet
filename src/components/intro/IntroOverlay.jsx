"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/brand/Logo";
import useReducedMotion from "@/hooks/useReducedMotion";

const STORAGE_KEY = "sn_intro_played_v1";

/* ── The coin mark — drawn live with SVG, no image file ──────────────── */
function CoinMark({ size = 112 }) {
  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        style={{ width: size, height: size, transformStyle: "preserve-3d" }}
        animate={{ rotateY: [0, 360, 720, 1080] }}
        transition={{ duration: 1.5, ease: [0.45, 0, 0.2, 1] }}
      >
        <svg width={size} height={size} viewBox="0 0 120 120">
          <defs>
            <radialGradient id="intro-coin-face" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#FDF6E3" />
              <stop offset="32%" stopColor="#F9A328" />
              <stop offset="68%" stopColor="#C24CF2" />
              <stop offset="100%" stopColor="#00D4FF" />
            </radialGradient>
            <filter id="intro-coin-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle cx="60" cy="60" r="52" fill="url(#intro-coin-face)" filter="url(#intro-coin-glow)" />
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
          <text
            x="60"
            y="73"
            textAnchor="middle"
            fontSize="40"
            fontWeight="800"
            fill="rgba(8,11,20,0.80)"
            fontFamily="Sora, sans-serif"
          >
            X
          </text>
        </svg>
      </motion.div>
    </div>
  );
}

const clipVariants = {
  closed: { clipPath: "circle(150% at 50% 50%)" },
  open: {
    clipPath: "circle(0% at 50% 50%)",
    transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] },
  },
};

export default function IntroOverlay() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState("coin"); // coin -> mint -> open -> done

  // Decide once per browser session whether to show the intro at all.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(true);
  }, []);

  // Lock page scroll while the overlay is up.
  useEffect(() => {
    if (!visible || phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible, phase]);

  // Drive the phase sequence on a timer.
  useEffect(() => {
    if (!visible) return;

    if (reducedMotion) {
      setPhase("done");
      return;
    }

    const timers = [
      setTimeout(() => setPhase("mint"), 1550),
      setTimeout(() => setPhase("open"), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible, reducedMotion]);

  if (!visible || phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-base)" }}
      variants={clipVariants}
      initial="closed"
      animate={phase === "open" ? "open" : "closed"}
      onAnimationComplete={(def) => {
        if (def === "open") setPhase("done");
      }}
    >
      {/* Ambient breathing glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(108,92,231,0.20) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pulsing rings behind the mark */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 160 + i * 70,
            height: 160 + i * 70,
            border: "1px solid rgba(0,212,255,0.14)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      {/* Mint flash burst — the moment the coin "stamps" into the logo */}
      <AnimatePresence>
        {phase === "mint" && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(240,217,168,0.85) 0%, transparent 58%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Coin → Logo cross-fade */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <AnimatePresence mode="wait">
          {phase === "coin" ? (
            <motion.div
              key="coin"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.25, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <CoinMark size={112} />
            </motion.div>
          ) : (
            <motion.div
              key="logo"
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Logo size={84} showWordmark={false} />
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-lg font-bold tracking-tight"
              >
                <span className="text-gradient-cyan">Security</span>
                <span style={{ color: "var(--text-primary)" }}>Net</span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="text-[10px] font-semibold tracking-[0.3em] uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                AI Eyes · Safe Skies
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
