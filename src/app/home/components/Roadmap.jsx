"use client";
import { useEffect, useRef, useState } from "react";

const MILESTONES = [
  {
    quarter: "Q1–Q2 2025",
    title:   "Genesis & Deployment",
    status:  "complete",
    items: [
      "Project inception + whitepaper V1",
      "Smart contract development & audit",
      "Token deployment on BNB Chain",
      "Website launch and community setup",
      "Presale Stage 1 opened ($0.10 USDT)",
    ],
  },
  {
    quarter: "Q3 2025",
    title:   "Growth & Presale Expansion",
    status:  "complete",
    items: [
      "Stage 2 launched ($0.15 USDT)",
      "Community growth to 8,000+ members",
      "Whitepaper V2 publication",
      "Multi-chain USDT support added",
    ],
  },
  {
    quarter: "Q4 2025–Q1 2026",
    title:   "Presale Stage 3 & Listings Prep",
    status:  "active",
    items: [
      "Stage 3 active ($0.20 USDT) — currently live",
      "Stage 4 & 5 prep ($0.35 / $0.55)",
      "CEX listing applications submitted",
      "Security audit V2 underway",
      "Marketing & KOL partnerships",
    ],
  },
  {
    quarter: "Q2 2026",
    title:   "Token Generation Event",
    status:  "upcoming",
    items: [
      "XN listed on Tier-1 & Tier-2 CEXs",
      "DEX liquidity pools launched",
      "Token unlock + vesting begin",
      "Staking rewards program live",
    ],
  },
  {
    quarter: "Q3–Q4 2026",
    title:   "Platform & AI Product Launch",
    status:  "upcoming",
    items: [
      "SecurityNet AI platform beta",
      "Enterprise partnership program",
      "AI security SDK released",
      "Ecosystem grant program opens",
    ],
  },
];

const STATUS_STYLES = {
  complete: { label: "COMPLETED ✓", color: "var(--c-success)",  borderColor: "rgba(74,140,111,0.35)", bg: "rgba(74,140,111,0.07)" },
  active:   { label: "ACTIVE NOW",  color: "var(--gold)",        borderColor: "var(--border-gold)",    bg: "var(--gold-ghost)" },
  upcoming: { label: "UPCOMING",    color: "var(--text-muted)",  borderColor: "var(--border-sub)",     bg: "transparent" },
};

function MilestoneCard({ m, s, slideDir }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rm-card card-dark"
      style={{
        border: "1px solid var(--border-sub)",
        padding: "24px 28px",
        maxWidth: 360,
        minHeight: 280,
        transition: "border-color 0.2s, opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateX(0)" : `translateX(${slideDir}px)`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = s.color)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-sub)")}
    >
      {/* Quarter + status row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: 12,
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          {m.quarter}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: s.color,
              border: `1px solid ${s.borderColor}`,
              background: s.bg,
              padding: "2px 8px",
            }}
          >
            {s.label}
          </span>
          {m.status === "active" && (
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--gold)",
                display: "inline-block",
                animation: "ubPulse 1.8s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
          )}
        </div>
      </div>

      {/* Title */}
      <h3
        className="rm-title"
        style={{
          fontFamily: "var(--font-disp)",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "0.04em",
          color: "var(--text-primary)",
          marginBottom: 16,
        }}
      >
        {m.title}
      </h3>

      {/* Bullet list */}
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        {m.items.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--gold-dim)", flexShrink: 0, marginTop: 3 }}>—</span>
            <span className="rm-item" style={{ fontFamily: "var(--font-disp)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Roadmap() {
  return (
    <section className="section-py section-light" style={{ borderTop: "1px solid var(--border-sub)" }}>
      <div className="container">
        {/* Section heading */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="eyebrow" style={{ marginBottom: 12 }}>ROADMAP</span>
          <h2 className="disp-title" style={{ fontSize: "var(--lg-size)", color: "#1C1C22" }}>
            MISSION TIMELINE
          </h2>
        </div>

        {/* Timeline container */}
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
          {/* Vertical connecting line — always visible */}
          <div
            className="rm-line"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, var(--gold-dim), transparent)",
              transform: "translateX(-50%)",
              pointerEvents: "none",
            }}
          />

          {/* Milestones */}
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {MILESTONES.map((m, i) => {
              const s      = STATUS_STYLES[m.status];
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={m.quarter}
                  className="rm-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 40px 1fr",
                    alignItems: "start",
                    gap: 8,
                  }}
                >
                  {/* Left column — push card to right (toward center line) */}
                  <div className="rm-col-left" style={{ display: "flex", justifyContent: "flex-end" }}>
                    {isLeft && <MilestoneCard m={m} s={s} slideDir={-28} />}
                  </div>

                  {/* Center dot */}
                  <div className="rm-dot-col" style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        border: `2px solid ${s.color}`,
                        background: m.status === "active" ? s.color : "var(--bg-secondary)",
                        zIndex: 1,
                        position: "relative",
                        boxShadow: m.status === "active" ? "0 0 0 4px rgba(212,175,110,0.2)" : "none",
                        animation: m.status === "active" ? "ubPulse 2s ease-in-out infinite" : "none",
                      }}
                    />
                  </div>

                  {/* Right column */}
                  <div className="rm-col-right">
                    {!isLeft && <MilestoneCard m={m} s={s} slideDir={28} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
