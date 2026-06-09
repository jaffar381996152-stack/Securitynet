"use client";
import { useEffect, useRef, useState } from "react";

const MILESTONES = [
  {
    quarter: "Q1–Q2 2025",
    title:   "Genesis & Deployment",
    status:  "complete",
    items: [
      "Project inception + whitepaper V1",
      "Smart contract dev & audit",
      "Token deployment on BNB Chain",
      "Website + community setup",
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
      "Stage 4 & 5 prep ($0.35/$0.55)",
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
  complete: { label: "COMPLETED ✓", color: "var(--c-success)",  borderColor: "rgba(74,140,111,0.4)",  bg: "rgba(74,140,111,0.08)" },
  active:   { label: "ACTIVE NOW",  color: "var(--gold)",        borderColor: "var(--border-gold)",    bg: "var(--gold-ghost)" },
  upcoming: { label: "UPCOMING",    color: "var(--text-muted)",  borderColor: "var(--border-sub)",     bg: "transparent" },
};

function MilestoneCard({ m, s, align, slideDir, delay }) {
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
      style={{
        border: "1px solid var(--border-sub)",
        background: "var(--bg-primary)",
        padding: "24px 28px",
        textAlign: align,
        maxWidth: 360,
        marginLeft: align === "right" ? "auto" : 0,
        transition: `border-color 0.2s, opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateX(0)" : `translateX(${slideDir}px)`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = s.color)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-sub)")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: align === "right" ? "flex-end" : "flex-start", marginBottom: 12 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          {m.quarter}
        </span>
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
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", display: "inline-block", animation: "ubPulse 1.8s ease-in-out infinite", flexShrink: 0 }} />
        )}
      </div>

      <h3 style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 18, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-primary)", marginBottom: 16 }}>
        {m.title}
      </h3>

      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        {m.items.map((item, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              justifyContent: align === "right" ? "flex-end" : "flex-start",
            }}
          >
            {align === "right" && (
              <span style={{ fontFamily: "var(--font-disp)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, flex: 1 }}>{item}</span>
            )}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--gold-dim)", flexShrink: 0, marginTop: 4 }}>—</span>
            {align === "left" && (
              <span style={{ fontFamily: "var(--font-disp)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{item}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Roadmap() {
  return (
    <section className="section-py" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-sub)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="eyebrow" style={{ marginBottom: 12 }}>DEVELOPMENT TIMELINE</span>
          <h2 className="disp-title" style={{ fontSize: "var(--lg-size)" }}>
            ROAD<span style={{ color: "var(--gold)" }}>MAP</span>
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
          {/* Central decorative line */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, var(--gold-dim), transparent)",
              transform: "translateX(-50%)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {MILESTONES.map((m, i) => {
              const s      = STATUS_STYLES[m.status];
              const isLeft = i % 2 === 0;
              const slideDir = isLeft ? -28 : 28;

              return (
                <div key={m.quarter}>
                  {/* Desktop: two-column layout */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 40px 1fr",
                      alignItems: "start",
                      gap: 16,
                    }}
                    className="hidden md:grid"
                  >
                    <div style={{ textAlign: isLeft ? "right" : "left" }}>
                      {isLeft && <MilestoneCard m={m} s={s} align="right" slideDir={-28} delay={0} />}
                    </div>

                    {/* Center dot */}
                    <div style={{ display: "flex", justifyContent: "center", paddingTop: 18 }}>
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

                    <div>
                      {!isLeft && <MilestoneCard m={m} s={s} align="left" slideDir={28} delay={0} />}
                    </div>
                  </div>

                  {/* Mobile: single column */}
                  <div className="md:hidden">
                    <MilestoneCard m={m} s={s} align="left" slideDir={-20} delay={0} />
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
