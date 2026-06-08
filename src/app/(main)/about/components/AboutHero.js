"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import SplitRise from "@/components/animations/SplitRise";
import MagneticButton from "@/components/animations/MagneticButton";
import AnimatedVisualPanel from "@/components/brand/AnimatedVisualPanel";

export default function AboutHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden py-20 lg:py-0">
      {/* Ambient glows */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(108,92,231,0.10) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 80%, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Left — text */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-5"
            style={{ color: "var(--accent-cyan)" }}
          >
            ABOUT US
          </motion.p>

          <SplitRise
            text="Elevate Your Security with Securitynet AI"
            as="h1"
            delay={0.15}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold leading-tight tracking-tight mb-6 max-w-[560px]"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="text-base lg:text-lg leading-relaxed mb-8 max-w-[500px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Securitynet AI transforms ordinary camera networks into intelligent
            security systems — designed to detect, analyze, and respond to threats
            with unmatched precision and scalability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <MagneticButton variant="primary" size="lg" href="/contact-us">
              Contact Us
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right — darkened image with gradient blend */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-1 relative order-1 lg:order-2 w-full max-w-[480px] lg:max-w-none shrink-0"
        >
          <div
            className="rounded-[2rem] p-[1px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(108,92,231,0.35) 0%, rgba(0,212,255,0.12) 100%)",
              boxShadow:
                "0 24px 80px rgba(108,92,231,0.16), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="rounded-[1.9375rem] overflow-hidden relative" style={{ aspectRatio: "535 / 650" }}>
              <AnimatedVisualPanel
                icon={ShieldCheck}
                accent="#00D4FF"
                accent2="#7B5EA7"
                label="AI-Powered Surveillance"
                className="absolute inset-0"
              />
              {/* Mesh gradient blend */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(72,58,160,0.28) 0%, transparent 55%, rgba(0,212,255,0.07) 100%)",
                }}
              />
              {/* Bottom fade */}
              <div
                className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, var(--bg-base) 0%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
