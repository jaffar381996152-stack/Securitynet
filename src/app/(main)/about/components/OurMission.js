"use client";

import { motion } from "framer-motion";
import SplitRise from "@/components/animations/SplitRise";

const pillars = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Proactive Security",
    text: "Turning cameras into intelligent, real-time threat detectors that act before incidents escalate.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="white" strokeWidth="2" />
        <path d="M8 21h8M12 17v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Custom Algorithms",
    text: "AI models built specifically around your environment, threat profile, and compliance needs.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Scalable Platforms",
    text: "From ten cameras to ten thousand — one secure, unified dashboard that grows with you.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Privacy-First",
    text: "Strict access control and end-to-end encrypted data flows — security without compromise.",
  },
];

export default function OurMission() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative glass-card rounded-[var(--radius-card)] p-8 lg:p-12 overflow-hidden"
        >
          {/* Gradient left accent border */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[var(--radius-card)]"
            style={{
              background:
                "linear-gradient(180deg, var(--brand-start) 0%, var(--brand-end) 100%)",
            }}
          />

          {/* Icon + heading row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8 pl-4 lg:pl-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-start) 0%, var(--brand-mid) 100%)",
                boxShadow: "0 0 28px var(--brand-glow)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p
                className="text-xs font-semibold tracking-[0.25em] uppercase mb-1"
                style={{ color: "var(--accent-cyan)" }}
              >
                OUR MISSION
              </p>
              <SplitRise
                text="What Drives Securitynet AI"
                as="h2"
                delay={0.05}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
              />
            </div>
          </div>

          {/* Mission statement */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base lg:text-lg leading-relaxed mb-10 pl-4 lg:pl-6 max-w-3xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Our mission is to transform traditional surveillance into intelligent, proactive security.
            We build custom algorithms, secure platforms, and remote operations that turn every camera
            into a source of real-time insight — delivering solutions that are accurate, scalable,
            cost-effective, and privacy-first.
          </motion.p>

          {/* Pillars grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pl-4 lg:pl-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex flex-col gap-3 p-4 rounded-2xl"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-start) 0%, var(--brand-mid) 100%)",
                    boxShadow: "0 0 14px var(--brand-glow)",
                  }}
                >
                  {pillar.icon}
                </div>
                <h3
                  className="font-sora text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
