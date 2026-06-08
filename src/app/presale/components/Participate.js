"use client";

import { motion } from "framer-motion";
import LiquidGlassCard from "@/components/animations/LiquidGlassCard";

// ─── Progress ring ────────────────────────────────────────────────────────────

const RADIUS = 54;
const CIRC   = 2 * Math.PI * RADIUS;

function ProgressRing({ pct = 0 }) {
  const offset = CIRC - (Math.min(Math.max(pct, 0), 100) / 100) * CIRC;
  return (
    <div className="relative flex items-center justify-center">
      <svg width="144" height="144" viewBox="0 0 144 144" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="var(--brand-start)" />
            <stop offset="100%" stopColor="var(--brand-mid)"   />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle
          cx="72" cy="72" r={RADIUS}
          strokeWidth="8"
          stroke="var(--border-subtle)"
          fill="none"
        />

        {/* Progress arc */}
        <motion.circle
          cx="72" cy="72" r={RADIUS}
          strokeWidth="8"
          stroke="url(#ring-grad)"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC}
          transform="rotate(-90 72 72)"
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.4 }}
        />
      </svg>

      {/* Centre label */}
      <div className="absolute flex flex-col items-center select-none">
        <span
          className="font-sora text-2xl font-bold leading-none"
          style={{ color: "var(--text-primary)" }}
        >
          {pct}%
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.14em] mt-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          Sold
        </span>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const tokenStats = [
  { label: "Price",   value: "$0.20 USDT" },
  { label: "Network", value: "BNB Chain"  },
  { label: "Min Buy", value: "$10 USDT"   },
  { label: "Token",   value: "XN"         },
];

const quickActions = [
  {
    icon: "🐦",
    label: "Follow Updates",
    sub: "Twitter / X",
    href: "https://x.com/securitynetAI",
    external: true,
  },
  {
    icon: "📺",
    label: "Watch Videos",
    sub: "YouTube",
    href: "https://www.youtube.com/@securitynetai",
    external: true,
  },
  {
    icon: "💼",
    label: "Connect",
    sub: "LinkedIn",
    href: "https://www.linkedin.com/company/securitynet-ai/",
    external: true,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Participate({ tokensSold = 0, presaleCap = 0 }) {
  const soldPct =
    presaleCap > 0 ? Math.min(100, Math.round((tokensSold / presaleCap) * 100)) : 0;

  return (
    <LiquidGlassCard padding={false} className="w-full">
      <div className="p-6 flex flex-col gap-5">

        {/* Header row */}
        <div className="flex items-center justify-between">
          <h3
            className="font-sora text-base font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Presale Stats
          </h3>
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-full glass"
            style={{ border: "1px solid rgba(0,212,255,0.25)" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: "var(--accent-cyan)",
                boxShadow: "0 0 6px var(--accent-cyan)",
                animation: "orb-pulse 2s ease-in-out infinite",
              }}
            />
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: "var(--accent-cyan)" }}
            >
              Live
            </span>
          </div>
        </div>

        {/* Progress ring */}
        <div className="flex flex-col items-center gap-1">
          <ProgressRing pct={soldPct} />
          <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
            Token sale in progress
          </p>
        </div>

        {/* Token info table */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--border-subtle)" }}
        >
          {tokenStats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-2.5"
              style={{
                background: i % 2 === 0 ? "var(--bg-tertiary)" : "transparent",
                borderBottom:
                  i < tokenStats.length - 1
                    ? "1px solid var(--border-subtle)"
                    : "none",
              }}
            >
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </span>
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--border-subtle), transparent)",
          }}
        />

        {/* Quick-action buttons */}
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            Get Involved
          </p>

          <div className="flex flex-col gap-2">
            {quickActions.map((action, i) => (
              <motion.a
                key={i}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                whileHover={{
                  x: 3,
                  borderColor: "var(--brand-mid)",
                  transition: { duration: 0.18 },
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl no-underline"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <span className="text-sm shrink-0">{action.icon}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-medium leading-none mb-0.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {action.label}
                  </p>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    {action.sub}
                  </p>
                </div>
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  className="shrink-0 opacity-35"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>

        {/* White Paper CTA */}
        <a
          href="https://securitynets.s3.amazonaws.com/securitynetai.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost btn-shimmer text-xs py-2.5 rounded-xl text-center"
        >
          Read White Paper →
        </a>

      </div>
    </LiquidGlassCard>
  );
}
