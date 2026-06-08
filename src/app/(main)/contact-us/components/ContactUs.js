"use client";

import { motion } from "framer-motion";
import SplitRise from "@/components/animations/SplitRise";
import LiquidGlassCard from "@/components/animations/LiquidGlassCard";
import ContactForm from "./ContactForm";

// ── Inquiry types ─────────────────────────────────────────────────────────────

const inquiries = [
  {
    color: "#6C5CE7",
    title: "AI & Video Analytics",
    body: "Custom weapon detection, face recognition, behaviour anomaly, PPE, ANPR, crowd analytics — built around your environment.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M15 10l4.553-2.069A1 1 0 0121 8.88v6.24a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    color: "#00D4FF",
    title: "Presale & XN Token",
    body: "Questions about buying XN tokens, presale allocation, $0.20 USDT pricing, vesting, or the token economics.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.8" />
        <path
          d="M12 6v6l4 2"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    color: "#F9A328",
    title: "Partnerships & Integration",
    body: "For CCTV integrators, security resellers, system integrators, and enterprise clients exploring co-branded deployments.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="1.8" />
        <path
          d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

// ── Info items ────────────────────────────────────────────────────────────────

const infoItems = [
  {
    label: "Response Time",
    value: "Within 24 business hours",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 6v6l4 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "General Inquiries",
    value: "info@securitynet.ai",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M22 6l-10 7L2 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Presale Support",
    value: "presale@securitynet.ai",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function ContactUs() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-10 lg:pt-32 lg:pb-14 overflow-hidden">
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
            GET IN TOUCH
          </motion.p>
          <div className="flex justify-center">
            <SplitRise
              text="Contact SecurityNet AI"
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
            Have a project in mind, a presale question, or a partnership
            opportunity? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* ── Main: info + form ── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Divider */}
          <div
            className="h-px mb-12"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--border-subtle) 50%, transparent 100%)",
            }}
          />

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

            {/* ── Left: inquiry types + info ── */}
            <motion.div
              className="w-full lg:w-[38%] shrink-0 flex flex-col gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              <motion.div variants={itemVariants}>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Whether you&apos;re looking to deploy AI surveillance, join
                  our presale, or build a partnership — fill in the form and our
                  team will get back to you within 24 hours.
                </p>
              </motion.div>

              {/* Inquiry type cards */}
              {inquiries.map((item, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <LiquidGlassCard padding={false} className="h-full">
                    <div className="p-5 flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${item.color}BB 0%, ${item.color} 100%)`,
                          boxShadow: `0 0 16px ${item.color}50`,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h3
                          className="font-sora text-sm font-semibold mb-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </LiquidGlassCard>
                </motion.div>
              ))}

              {/* Contact info */}
              <motion.div
                variants={itemVariants}
                className="rounded-[var(--radius-card)] p-5 flex flex-col gap-3"
                style={{
                  background: "var(--bg-glass)",
                  border: "1px solid var(--border-glass)",
                }}
              >
                {infoItems.map((info, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2"
                    style={{
                      borderBottom:
                        i < infoItems.length - 1
                          ? "1px solid var(--border-subtle)"
                          : "none",
                    }}
                  >
                    <span style={{ color: "var(--brand-mid)" }}>
                      {info.icon}
                    </span>
                    <div>
                      <p
                        className="text-[10px] uppercase tracking-[0.12em] font-semibold leading-none mb-0.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {info.label}
                      </p>
                      <p
                        className="text-xs font-medium"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: form card ── */}
            <motion.div
              className="w-full lg:flex-1"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <LiquidGlassCard padding={false}>
                <div className="p-7 lg:p-10">
                  <div className="mb-7">
                    <p
                      className="text-xs font-semibold tracking-[0.22em] uppercase mb-2"
                      style={{ color: "var(--accent-cyan)" }}
                    >
                      SEND A MESSAGE
                    </p>
                    <h2
                      className="font-sora text-xl lg:text-2xl font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Let&apos;s Build Something Secure
                    </h2>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      All fields are required unless marked optional.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </LiquidGlassCard>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
