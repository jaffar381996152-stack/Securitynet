"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SplitRise from "@/components/animations/SplitRise";
import LiquidGlassCard from "@/components/animations/LiquidGlassCard";
import MagneticButton from "@/components/animations/MagneticButton";
import MorphingCounter from "@/components/animations/MorphingCounter";

// ── Donut chart math ──────────────────────────────────────────────────────────

const CX = 160, CY = 160, OR = 118, IR = 70;

function pt(r, deg) {
  const rad = (deg * Math.PI) / 180;
  return [(CX + r * Math.cos(rad)).toFixed(2), (CY + r * Math.sin(rad)).toFixed(2)];
}

function arc(sDeg, eDeg) {
  const [osx, osy] = pt(OR, sDeg);
  const [oex, oey] = pt(OR, eDeg);
  const [isx, isy] = pt(IR, sDeg);
  const [iex, iey] = pt(IR, eDeg);
  const lg = eDeg - sDeg > 180 ? 1 : 0;
  return `M${osx},${osy} A${OR},${OR},0,${lg},1,${oex},${oey} L${iex},${iey} A${IR},${IR},0,${lg},0,${isx},${isy}Z`;
}

// ── Data ─────────────────────────────────────────────────────────────────────

const tokenInfo = [
  { label: "Token Name",       value: "Securitynet.ai (XN)" },
  { label: "Token Standard",   value: "BEP-20" },
  { label: "Network",          value: "Binance Smart Chain (BSC)" },
  { label: "Total Supply",     value: "3,000,000,000 XN" },
  { label: "Presale Price",    value: "$0.20 USDT" },
  { label: "Presale Hard Cap", value: "150,000,000 XN (5%)" },
];

const rawDist = [
  { label: "Platform Development", pct: 45, amount: "1,350M", color: "#483AA0" },
  { label: "Reserve Pool",          pct: 16, amount: "480M",   color: "#6C5CE7" },
  { label: "Marketing Fund",        pct: 11, amount: "330M",   color: "#A78BFA" },
  { label: "Community Growth",      pct:  9, amount: "270M",   color: "#00D4FF" },
  { label: "Management",            pct:  6, amount: "180M",   color: "#F9A328" },
  { label: "Founder",               pct:  6, amount: "180M",   color: "#7C3AED" },
  { label: "Pre-Sale",              pct:  5, amount: "150M",   color: "#2DD4BF" },
  { label: "Research & Innovation", pct:  2, amount: "60M",    color: "#FB923C" },
];

const GAP = 0.8;
const dist = (() => {
  let cum = -90;
  return rawDist.map((d) => {
    const span = (d.pct / 100) * 360;
    const path = arc(cum + GAP / 2, cum + span - GAP / 2);
    cum += span;
    return { ...d, path };
  });
})();

const utility = [
  {
    title: "Service Access",
    body: "Pay for AI detection modules, API credits, and platform licences directly with XN — no conversion required.",
    color: "#6C5CE7",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.8"/>
        <path d="M12 8v4l3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12h6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Discounts & Incentives",
    body: "Users paying with XN tokens receive platform discounts. Early holders and stakers earn bonus credits and priority access.",
    color: "#F9A328",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Governance",
    body: "XN token holders vote on platform upgrades, treasury allocation, and AI model roadmap decisions — proportional to their holdings.",
    color: "#00D4FF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="1.8"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Staking & Rewards",
    body: "Stake XN to earn passive rewards, unlock partner reseller tiers, and earn additional tokens for contributing anonymized AI training data.",
    color: "#2DD4BF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l-9 4v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const pillars = [
  {
    tagline: "Pillar 3",
    title: "Partner & Reseller Staking",
    body: "CCTV integrators, security service providers, and IT resellers stake XN to access better reseller discounts, co-branded dashboards, and lead or territory priority. If a partner abuses the system, their stake can be slashed using rule-based time-locked returns.",
    quote: "The more partners onboard, the more XN must be staked — tying the token directly to global product distribution.",
    color: "#6C5CE7",
  },
  {
    tagline: "Pillar 4",
    title: "Data & Model Improvement Rewards",
    body: "Clients who opt-in can share anonymized video events, labeled incidents, false positives, and edge cases. In return they earn XN rewards. This creates a flywheel: more data → better AI → more paying clients → more XN demand.",
    quote: "XN is tied to AI quality, because it rewards data that continually improves the model.",
    color: "#00D4FF",
  },
];

// ── Animation variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ── Component ────────────────────────────────────────────────────────────────

export default function Tokenomics() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-14 lg:pt-32 lg:pb-16 overflow-hidden">
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
            TOKENOMICS
          </motion.p>
          <div className="flex justify-center">
            <SplitRise
              text="The XN Token"
              as="h1"
              delay={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold tracking-tight leading-tight"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-6 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            The Securitynet ecosystem is powered by{" "}
            <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>
              XN
            </strong>{" "}
            — a BEP-20 utility token on Binance Smart Chain that governs access,
            incentivises partners, and rewards data contributors.
          </motion.p>
        </div>
      </section>

      {/* ── Token Info + Donut Chart ── */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">

            {/* Left — token info card */}
            <motion.div
              className="w-full lg:w-5/12"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <LiquidGlassCard padding={false} className="h-full">
                <div className="p-7 lg:p-8">
                  <p
                    className="text-xs font-semibold tracking-[0.22em] uppercase mb-6"
                    style={{ color: "var(--accent-cyan)" }}
                  >
                    TOKEN DETAILS
                  </p>
                  <div className="flex flex-col">
                    {tokenInfo.map((row, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-3.5 gap-4"
                        style={{
                          borderBottom:
                            i < tokenInfo.length - 1
                              ? "1px solid var(--border-subtle)"
                              : "none",
                        }}
                      >
                        <span
                          className="text-sm"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {row.label}
                        </span>
                        <span
                          className="text-sm font-semibold text-right"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <MagneticButton variant="primary" size="md" href="/presale">
                      Buy XN Tokens
                    </MagneticButton>
                  </div>
                </div>
              </LiquidGlassCard>
            </motion.div>

            {/* Right — donut chart */}
            <motion.div
              className="w-full lg:flex-1 flex flex-col items-center gap-8"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* SVG donut */}
              <motion.div
                className="relative w-full max-w-[300px]"
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
              >
                <svg viewBox="0 0 320 320" width="100%" height="100%">
                  {/* Subtle glow ring behind chart */}
                  <circle
                    cx={CX}
                    cy={CY}
                    r={OR + 6}
                    fill="none"
                    stroke="rgba(108,92,231,0.12)"
                    strokeWidth="12"
                  />

                  {/* Donut slices */}
                  {dist.map((s, i) => (
                    <path
                      key={i}
                      d={s.path}
                      fill={s.color}
                      style={{
                        opacity: hovered === null ? 1 : hovered === i ? 1 : 0.28,
                        transition: "opacity 0.2s ease",
                        cursor: "pointer",
                        filter:
                          hovered === i
                            ? `drop-shadow(0 0 8px ${s.color}99)`
                            : "none",
                      }}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                    />
                  ))}

                  {/* Center: default state */}
                  {hovered === null && (
                    <>
                      <text
                        x={CX}
                        y={CY - 8}
                        textAnchor="middle"
                        fontFamily="Sora, sans-serif"
                        fontSize="24"
                        fontWeight="700"
                        style={{ fill: "var(--text-primary)" }}
                      >
                        3B
                      </text>
                      <text
                        x={CX}
                        y={CY + 12}
                        textAnchor="middle"
                        fontFamily="Inter, sans-serif"
                        fontSize="10"
                        style={{ fill: "var(--text-muted)" }}
                      >
                        Total XN Supply
                      </text>
                    </>
                  )}

                  {/* Center: hover state */}
                  {hovered !== null && (
                    <>
                      <text
                        x={CX}
                        y={CY - 12}
                        textAnchor="middle"
                        fontFamily="Sora, sans-serif"
                        fontSize="26"
                        fontWeight="700"
                        style={{ fill: dist[hovered].color }}
                      >
                        {dist[hovered].pct}%
                      </text>
                      <text
                        x={CX}
                        y={CY + 8}
                        textAnchor="middle"
                        fontFamily="Inter, sans-serif"
                        fontSize="9.5"
                        style={{ fill: "var(--text-secondary)" }}
                      >
                        {dist[hovered].label}
                      </text>
                      <text
                        x={CX}
                        y={CY + 22}
                        textAnchor="middle"
                        fontFamily="Inter, sans-serif"
                        fontSize="9.5"
                        style={{ fill: "var(--text-muted)" }}
                      >
                        {dist[hovered].amount} XN
                      </text>
                    </>
                  )}
                </svg>
              </motion.div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 w-full max-w-[300px]">
                {dist.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2"
                    style={{ cursor: "default" }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{
                        background: s.color,
                        boxShadow: `0 0 5px ${s.color}`,
                      }}
                    />
                    <span
                      className="text-xs leading-tight"
                      style={{
                        color:
                          hovered === i
                            ? "var(--text-primary)"
                            : "var(--text-muted)",
                        transition: "color 0.2s",
                      }}
                    >
                      {s.label}{" "}
                      <span style={{ color: s.color, fontWeight: 600 }}>
                        {s.pct}%
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Distribution Cards ── */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--border-subtle) 50%, transparent 100%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--accent-cyan)" }}
            >
              ALLOCATION
            </motion.p>
            <SplitRise
              text="Token Distribution"
              as="h2"
              delay={0.1}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
            />
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {dist.map((d, i) => (
              <motion.div key={i} variants={itemVariants}>
                <LiquidGlassCard padding={false} className="h-full">
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-2xl font-bold font-sora"
                        style={{ color: d.color }}
                      >
                        <MorphingCounter to={d.pct} suffix="%" duration={1.2} />
                      </span>
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{
                          background: d.color,
                          boxShadow: `0 0 8px ${d.color}`,
                        }}
                      />
                    </div>
                    <h3
                      className="text-sm font-semibold leading-snug"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {d.label}
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {d.amount} XN
                    </p>
                    {/* Animated progress bar */}
                    <div
                      className="h-1 rounded-full overflow-hidden"
                      style={{ background: "var(--bg-tertiary)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: d.color,
                          boxShadow: `0 0 6px ${d.color}60`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${d.pct}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.9,
                          delay: i * 0.06,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      />
                    </div>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Token Utility ── */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--border-subtle) 50%, transparent 100%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--accent-cyan)" }}
            >
              USE CASES
            </motion.p>
            <SplitRise
              text="Token Utility"
              as="h2"
              delay={0.1}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 text-sm max-w-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              XN is a functional token — not speculative. Every holder can put
              it to work within the Securitynet platform.
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {utility.map((u, i) => (
              <motion.div key={i} variants={itemVariants}>
                <LiquidGlassCard padding={false} className="h-full">
                  <div className="p-7 flex flex-col gap-4 h-full">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${u.color}BB 0%, ${u.color} 100%)`,
                        boxShadow: `0 0 20px ${u.color}50`,
                      }}
                    >
                      {u.icon}
                    </div>
                    <h3
                      className="font-sora text-base font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {u.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {u.body}
                    </p>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Ecosystem Pillars ── */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--border-subtle) 50%, transparent 100%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--accent-cyan)" }}
            >
              ECOSYSTEM
            </motion.p>
            <SplitRise
              text="How XN Powers Growth"
              as="h2"
              delay={0.1}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <LiquidGlassCard padding={false} className="h-full">
                  <div className="p-7 lg:p-8 flex flex-col gap-5 h-full">
                    {/* Tagline + title */}
                    <div>
                      <span
                        className="text-xs font-semibold tracking-[0.2em] uppercase"
                        style={{ color: p.color }}
                      >
                        {p.tagline}
                      </span>
                      <h3
                        className="font-sora text-xl font-bold mt-1.5"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {p.title}
                      </h3>
                    </div>

                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {p.body}
                    </p>

                    <blockquote
                      className="text-sm italic font-medium pl-4 border-l-2"
                      style={{
                        color: "var(--text-accent)",
                        borderColor: p.color,
                      }}
                    >
                      &ldquo;{p.quote}&rdquo;
                    </blockquote>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <LiquidGlassCard padding={false}>
              <div className="relative overflow-hidden p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                {/* Background glow */}
                <div
                  className="absolute right-0 top-0 w-64 h-64 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 100% 0%, rgba(108,92,231,0.14) 0%, transparent 70%)",
                  }}
                />
                <div className="relative z-10">
                  <p
                    className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
                    style={{ color: "var(--accent-cyan)" }}
                  >
                    JOIN THE PRESALE
                  </p>
                  <h2
                    className="font-sora text-2xl lg:text-3xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Ready to Acquire XN?
                  </h2>
                  <p
                    className="mt-2 text-sm max-w-md"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Presale tokens are priced at{" "}
                    <strong
                      className="font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      $0.20 USDT
                    </strong>
                    . Join now to secure your allocation before the public
                    launch.
                  </p>
                </div>
                <div className="relative z-10 shrink-0">
                  <MagneticButton variant="primary" size="lg" href="/presale">
                    Buy XN Now
                  </MagneticButton>
                </div>
              </div>
            </LiquidGlassCard>
          </motion.div>
        </div>
      </section>
    </>
  );
}
