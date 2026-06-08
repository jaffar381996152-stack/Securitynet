"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SplitRise from "@/components/animations/SplitRise";
import LiquidGlassCard from "@/components/animations/LiquidGlassCard";
import MagneticButton from "@/components/animations/MagneticButton";
import GeneratedCover from "@/components/brand/GeneratedCover";

const featured = {
  href: "/blog/future-of-security-with-ai",
  category: "Artificial Intelligence",
  date: "Feb 23, 2024",
  title:
    "The Future of Security: How AI and Blockchain Are Transforming Surveillance",
  excerpt:
    "Traditional surveillance methods are giving way to cutting-edge solutions powered by artificial intelligence and blockchain technology. At the forefront of this evolution stands SecurityNet.ai — reshaping the future of security services.",
  author: "Ahmed Faraz",
};

export default function BlogHero() {
  return (
    <section className="relative pt-24 pb-10 lg:pt-32 lg:pb-14 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-0 inset-x-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(108,92,231,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-5"
            style={{ color: "var(--accent-cyan)" }}
          >
            BLOG & INSIGHTS
          </motion.p>
          <div className="flex justify-center">
            <SplitRise
              text="The SecurityNet Blog"
              as="h1"
              delay={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold tracking-tight"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Insights on AI security, blockchain technology, and the future of
            intelligent surveillance.
          </motion.p>
        </div>

        {/* Featured article card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <LiquidGlassCard padding={false}>
            <div className="flex flex-col lg:flex-row overflow-hidden rounded-[var(--radius-card)]">
              {/* Image */}
              <div className="relative lg:w-[54%] h-60 lg:h-auto min-h-[300px] lg:min-h-[380px] shrink-0">
                <GeneratedCover seed={featured.title} className="absolute inset-0" />
                {/* Darkening overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(8,11,20,0.28)" }}
                />
                {/* Bottom fade for mobile */}
                <div
                  className="absolute inset-0 lg:hidden"
                  style={{
                    background:
                      "linear-gradient(to top, var(--bg-glass) 0%, transparent 55%)",
                  }}
                />
                {/* Right fade for desktop */}
                <div
                  className="absolute inset-0 hidden lg:block"
                  style={{
                    background:
                      "linear-gradient(to right, transparent 70%, var(--bg-glass) 100%)",
                  }}
                />
                {/* Category chip */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(108,92,231,0.30)",
                      color: "var(--accent-cyan)",
                      border: "1px solid rgba(0,212,255,0.25)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {featured.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="lg:flex-1 p-7 lg:p-10 xl:p-12 flex flex-col justify-center gap-5">
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Featured Article &nbsp;·&nbsp; {featured.date}
                </p>

                <Link href={featured.href} className="block">
                  <h2
                    className="font-sora text-xl lg:text-2xl xl:text-[1.75rem] font-bold leading-snug hover:opacity-80 transition-opacity"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {featured.title}
                  </h2>
                </Link>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {featured.excerpt}
                </p>

                {/* Author + CTA */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--brand-start), var(--brand-mid))",
                      }}
                    >
                      {featured.author[0]}
                    </div>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {featured.author}
                    </span>
                  </div>
                  <MagneticButton variant="primary" size="sm" href={featured.href}>
                    Read Article
                  </MagneticButton>
                </div>
              </div>
            </div>
          </LiquidGlassCard>
        </motion.div>
      </div>
    </section>
  );
}
