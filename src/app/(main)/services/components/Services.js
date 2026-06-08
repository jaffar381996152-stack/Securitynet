"use client";

import { motion } from "framer-motion";
import { ScanEye, LayoutDashboard, Radar, ShieldCheck } from "lucide-react";
import SplitRise from "@/components/animations/SplitRise";
import LiquidGlassCard from "@/components/animations/LiquidGlassCard";
import MagneticButton from "@/components/animations/MagneticButton";
import AnimatedVisualPanel from "@/components/brand/AnimatedVisualPanel";

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: ScanEye,
    accent: "#00D4FF",
    accent2: "#6C5CE7",
    label: "AI Video Analytics",
    title: "Custom AI Algorithms & Video Analytics",
    description:
      "We build tailored AI models specifically for your use case. Every model is trained on your environment and optimized for accuracy.",
    bullets: [
      "Weapon detection (guns, knives, sharp objects)",
      "Attendance tracking with face recognition",
      "Behavior anomaly detection",
      "PPE monitoring (helmets, vests, gloves)",
      "Vehicle plate detection (ANPR)",
      "Crowd counting & movement analytics",
      "Custom workflows for your operational needs",
    ],
    tagline: "If a camera can see it — we can build an algorithm to detect it.",
  },
  {
    icon: LayoutDashboard,
    accent: "#7B5EA7",
    accent2: "#00D4FF",
    label: "Platform Engineering",
    title: "Web & Mobile Platforms for Camera & AI Management",
    description:
      "We develop secure and scalable applications to manage all your cameras, analytics, and alerts from a single place.",
    bullets: [
      "Admin dashboards",
      "Centralized camera feeds",
      "Alerts & event management",
      "User roles & access control",
      "System health monitoring",
      "AI analytics reports & logs",
      "Cloud or on-premise deployment",
    ],
    tagline:
      "You get a complete command-and-control system tailored to your organization.",
  },
  {
    icon: Radar,
    accent: "#F9A328",
    accent2: "#A78BFA",
    label: "Remote Operations",
    title: "Remote Monitoring & AI Operations",
    description:
      "Reduce operational costs with our remote team and AI-driven monitoring — no large on-site team required.",
    bullets: [
      "24/7 video surveillance",
      "Real-time AI alerting",
      "Incident verification",
      "Rapid response coordination",
      "Detailed reporting & analytics",
    ],
    tagline:
      "Leverage our expertise and AI technology to enhance security without the overhead.",
  },
  {
    icon: ShieldCheck,
    accent: "#6C5CE7",
    accent2: "#A78BFA",
    label: "Application Security",
    title: "Secure Application Development",
    description:
      "We build fully secure platforms following enterprise-grade security standards from the ground up.",
    bullets: [
      "End-to-end encryption",
      "Multi-factor authentication",
      "Role-based access control",
      "Regular security audits",
      "Compliance with data protection regulations",
    ],
    tagline:
      "100% data protection — security built into every layer, not bolted on.",
  },
];

const addOns = [
  {
    title: "CCTV Integration",
    body: "Seamless integration with legacy DVR, NVR, and IP camera systems.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M15 10l4.553-2.069A1 1 0 0121 8.88v6.24a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Edge Device Setup",
    body: "Full setup for Jetson, Raspberry Pi, Coral TPU, and custom edge hardware.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="white" strokeWidth="1.8"/>
        <path d="M9 9h6M9 12h6M9 15h4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Cloud Deployment",
    body: "Production-ready deployments on AWS, Azure, or GCP — managed or self-hosted.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Hardware Integration",
    body: "Custom hardware design and integration for specialized security deployments.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "API Integrations",
    body: "Connect your AI system with third-party platforms, ERPs, and access control systems.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M8 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M12 12l8-8M16 4h4v4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Mobile Alert Apps",
    body: "iOS and Android apps delivering real-time alerts, reports, and camera access.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="white" strokeWidth="1.8"/>
        <path d="M12 18h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Services() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-0 inset-x-0 h-64 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(108,92,231,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-5"
            style={{ color: "var(--accent-cyan)" }}
          >
            WHAT WE DO
          </motion.p>

          <div className="flex justify-center">
            <SplitRise
              text="The Services We Offer"
              as="h1"
              delay={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold tracking-tight leading-tight max-w-3xl"
            />
          </div>

          {/* Animated gradient key word */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            SecurityNet AI provides a fully integrated suite of{" "}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "linear-gradient(90deg, var(--brand-start), var(--brand-mid), var(--accent-cyan), var(--brand-mid), var(--brand-start))",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 600,
              }}
            >
              intelligent security services
            </motion.span>
            {" "}— custom AI models, secure platforms, and remote monitoring
            that reduce costs while improving accuracy and response times.
          </motion.p>
        </div>
      </section>

      {/* ── Service Cards (alternating) ── */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16 lg:gap-24">
          {services.map((svc, i) => {
            const isOdd = i % 2 === 0; // 0,2 → image left; 1,3 → image right
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12"
              >
                {/* Image */}
                <div
                  className={`w-full lg:w-5/12 shrink-0 ${
                    isOdd ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div
                    className="rounded-[2rem] p-[1px] h-full"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(108,92,231,0.30) 0%, rgba(0,212,255,0.10) 100%)",
                      boxShadow: "0 16px 60px rgba(108,92,231,0.10)",
                    }}
                  >
                    <div className="rounded-[1.9375rem] overflow-hidden h-full relative min-h-[280px]">
                      <AnimatedVisualPanel
                        icon={svc.icon}
                        accent={svc.accent}
                        accent2={svc.accent2}
                        label={svc.label}
                        className="absolute inset-0"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: isOdd
                            ? "linear-gradient(to right, rgba(72,58,160,0.20) 0%, transparent 60%)"
                            : "linear-gradient(to left, rgba(72,58,160,0.20) 0%, transparent 60%)",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Text card */}
                <div
                  className={`w-full lg:flex-1 ${
                    isOdd ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <LiquidGlassCard className="h-full" padding={false}>
                    <div className="p-7 lg:p-8 flex flex-col gap-5 h-full">
                      {/* Step badge */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--brand-start) 0%, var(--brand-mid) 100%)",
                          boxShadow: "0 0 14px var(--brand-glow)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>

                      <h2
                        className="font-sora text-xl lg:text-2xl font-bold leading-snug"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {svc.title}
                      </h2>

                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {svc.description}
                      </p>

                      <ul className="flex flex-col gap-2">
                        {svc.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                              style={{
                                background: "var(--brand-mid)",
                                boxShadow: "0 0 4px var(--brand-mid)",
                              }}
                            />
                            <span
                              className="text-sm leading-relaxed"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <p
                        className="text-sm font-semibold mt-auto pt-2"
                        style={{ color: "var(--text-accent)" }}
                      >
                        {svc.tagline}
                      </p>
                    </div>
                  </LiquidGlassCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Features Grid (Add-on Services) ── */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        {/* Top divider */}
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--border-subtle) 50%, transparent 100%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="flex flex-col items-center text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--accent-cyan)" }}
            >
              ADD-ON SERVICES
            </motion.p>
            <SplitRise
              text="Everything You Need to Scale"
              as="h2"
              delay={0.1}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight max-w-xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 text-sm max-w-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              We assist with seamless integration of our AI solutions into your existing
              infrastructure — ensuring smooth transition and optimal performance.
            </motion.p>
          </div>

          {/* 3-column grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {addOns.map((addon, i) => (
              <motion.div key={i} variants={itemVariants}>
                <LiquidGlassCard className="h-full" padding={false}>
                  <div className="p-7 flex flex-col gap-4 h-full">
                    {/* Icon circle */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--brand-start) 0%, var(--brand-mid) 100%)",
                        boxShadow: "0 0 20px var(--brand-glow)",
                      }}
                    >
                      {addon.icon}
                    </div>

                    <h3
                      className="font-sora text-base font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {addon.title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {addon.body}
                    </p>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center mt-12"
          >
            <MagneticButton variant="primary" size="lg" href="/contact-us">
              Get a Custom Quote
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
