"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SEGMENTS = [
  { label: "PRESALE",   pct: 30, color: "#D4AF6E" },
  { label: "PUBLIC",    pct: 25, color: "#E8C882" },
  { label: "ECOSYSTEM", pct: 20, color: "#A88A52" },
  { label: "TEAM",      pct: 15, color: "rgba(212,175,110,0.45)" },
  { label: "RESERVE",   pct: 10, color: "rgba(212,175,110,0.25)" },
];

const TOTAL_SUPPLY = "1,000,000,000";
const R = 80;
const CIRC = 2 * Math.PI * R;
const CX = 120;
const CY = 120;

function DonutChart({ animated }) {
  let cumPct = 0;
  const gap = 2; // degrees gap between segments

  return (
    <svg width={240} height={240} viewBox="0 0 240 240" style={{ overflow: "visible" }}>
      {/* Background circle */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--border-sub)" strokeWidth={28} />

      {SEGMENTS.map((seg, i) => {
        const startAngle = cumPct / 100 * 360 - 90;
        const segAngle   = seg.pct / 100 * 360 - gap;
        const dashLen    = (segAngle / 360) * CIRC;
        const offset     = ((90 - startAngle) / 360) * CIRC;
        cumPct += seg.pct;

        return (
          <circle
            key={i}
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke={seg.color}
            strokeWidth={28}
            strokeDasharray={`${animated ? dashLen : 0} ${CIRC}`}
            strokeDashoffset={offset}
            style={{
              transition: animated
                ? `stroke-dasharray 1.2s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.12}s`
                : "none",
              transformOrigin: `${CX}px ${CY}px`,
              transform: "rotate(-90deg)",
            }}
          />
        );
      })}

      {/* Center label */}
      <text x={CX} y={CY - 8} textAnchor="middle" fill="var(--text-primary)" style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 18 }}>
        1B XN
      </text>
      <text x={CX} y={CY + 12} textAnchor="middle" fill="var(--text-muted)" style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em" }}>
        TOTAL SUPPLY
      </text>
    </svg>
  );
}

export default function TokenomicsPreview() {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-py" style={{ background: "var(--bg-primary)" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px,6vw,80px)",
            alignItems: "center",
          }}
        >
          {/* Left: text */}
          <div>
            <span className="eyebrow" style={{ marginBottom: 16 }}>TOKEN DISTRIBUTION</span>
            <h2
              className="disp-title"
              style={{ fontSize: "var(--lg-size)", marginBottom: 24 }}
            >
              XN TOKEN
              <br />
              <span style={{ color: "var(--gold)" }}>ECONOMICS</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-disp)",
                fontSize: 16,
                color: "var(--text-muted)",
                lineHeight: 1.7,
                marginBottom: 36,
              }}
            >
              A carefully designed token allocation model ensuring long-term ecosystem sustainability, community rewards, and aligned incentives across all stakeholders.
            </p>

            {/* Legend */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {SEGMENTS.map((seg) => (
                <div key={seg.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 12, height: 12, background: seg.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-sec)", flex: 1 }}>
                    {seg.label}
                  </span>
                  <span style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 14, color: "var(--gold)" }}>
                    {seg.pct}%
                  </span>
                </div>
              ))}
            </div>

            <Link href="/tokenomics" className="btn-ghost">
              VIEW FULL TOKENOMICS →
            </Link>
          </div>

          {/* Right: donut chart */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DonutChart animated={animated} />
          </div>
        </div>
      </div>
    </section>
  );
}
