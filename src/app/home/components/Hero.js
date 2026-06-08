"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import NeuralOrb from "@/components/animations/NeuralOrb";
import XNCoin from "@/components/brand/XNCoin";
import SplitRise from "@/components/animations/SplitRise";
import ParticleField from "@/components/animations/ParticleField";
import MagneticButton from "@/components/animations/MagneticButton";

const stats = [
  { label: "$0.20 / XN", pulse: true, accent: false },
  { label: "BSC Network", pulse: false, accent: false },
  { label: "Live Presale", pulse: true, accent: true },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Particle field */}
      <ParticleField count={40} connect />

      {/* Radial glow behind orb (desktop right, mobile center-top) */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(108,92,231,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 70%, rgba(0,212,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Main layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 pt-24 pb-16 lg:pt-0 lg:pb-0 lg:min-h-screen">

        {/* ── Content column ─────────────────────────────────────── */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-5"
            style={{ color: "var(--accent-cyan)" }}
          >
            AI-Powered Security
          </motion.p>

          {/* H1 — SplitRise word-by-word */}
          <SplitRise
            text="AI Security will be Faster than Human Capabilities"
            as="h1"
            delay={0.15}
            className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold leading-[1.1] tracking-tight mb-7 max-w-[640px]"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="text-base lg:text-lg leading-relaxed mb-10 max-w-[500px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Securitynet leverages cutting-edge AI for facial recognition,
            real-time alerts, and comprehensive monitoring — now fuelled
            by blockchain technology.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
          >
            <MagneticButton
              variant="primary"
              size="lg"
              href="/presale"
            >
              Buy XN Tokens
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              size="lg"
              href="https://securitynets.s3.amazonaws.com/securitynetai.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              White Paper
            </MagneticButton>
          </motion.div>

          {/* Stats pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium"
                style={{
                  color: s.accent ? "var(--accent-cyan)" : "var(--text-secondary)",
                }}
              >
                {s.pulse && (
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background: s.accent
                        ? "var(--accent-cyan)"
                        : "var(--text-muted)",
                      boxShadow: s.accent
                        ? "0 0 6px var(--accent-cyan)"
                        : "none",
                      animation: s.accent
                        ? "orb-pulse 2s ease-in-out infinite"
                        : "none",
                    }}
                  />
                )}
                {s.label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Orb column ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center justify-center order-1 lg:order-2 shrink-0"
        >
          {/* Mobile orb + signature coin */}
          <div className="relative lg:hidden">
            <NeuralOrb size={240} />
            <div className="absolute -bottom-3 -right-3">
              <XNCoin size={64} spinDuration={11} />
            </div>
          </div>
          {/* Desktop orb + signature coin */}
          <div className="relative hidden lg:block">
            <NeuralOrb size={420} />
            <div className="absolute bottom-2 -right-6">
              <XNCoin size={108} float spinDuration={10} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "var(--text-muted)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, var(--brand-mid), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
