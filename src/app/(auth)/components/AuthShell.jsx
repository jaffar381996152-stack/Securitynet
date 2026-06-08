"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "@/components/brand/Logo";
import LiquidGlassCard from "@/components/animations/LiquidGlassCard";

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

/**
 * Shared centred-card frame for the auth route group (sign in, register,
 * forgot/reset password) — keeps the glassmorphism shell, logo and motion
 * consistent while each page supplies its own form as `children`.
 */
export default function AuthShell({ title, subtitle = null, children = null, footer = null }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20 sm:py-24">
      <div className="w-full max-w-[440px]">
        <motion.div {...rise(0)} className="flex justify-center mb-8">
          <Link href="/" aria-label="SecurityNet.ai home" className="no-underline">
            <Logo size={46} />
          </Link>
        </motion.div>

        <LiquidGlassCard hover={false} className="w-full">
          <div className="p-7 sm:p-9">
            <motion.div {...rise(0.08)}>
              <h1
                className="font-sora text-2xl font-bold text-center tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-center mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {subtitle}
                </p>
              )}
            </motion.div>

            <motion.div {...rise(0.16)} className="mt-7">
              {children}
            </motion.div>
          </div>
        </LiquidGlassCard>

        {footer && (
          <motion.p
            {...rise(0.24)}
            className="text-xs text-center mt-6"
            style={{ color: "var(--text-muted)" }}
          >
            {footer}
          </motion.p>
        )}
      </div>
    </div>
  );
}
