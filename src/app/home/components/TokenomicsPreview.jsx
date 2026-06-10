"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SEGMENTS = [
  { label: "PRESALE",   pct: 40, color: "#D4AF6E" },
  { label: "ECOSYSTEM", pct: 20, color: "#6B7A6B" },
  { label: "TREASURY",  pct: 15, color: "#4A5A4A" },
  { label: "TEAM",      pct: 10, color: "#3A4A3A" },
  { label: "LIQUIDITY", pct: 8,  color: "#2E3E2E" },
  { label: "MARKETING", pct: 7,  color: "#262E26" },
];

const STATS = [
  { value: "100,000,000", label: "TOTAL XN SUPPLY"       },
  { value: "40%",         label: "PRESALE ALLOCATION"    },
  { value: "15%",         label: "CIRCULATING AT LAUNCH" },
  { value: "24 Months",   label: "TEAM VESTING PERIOD"   },
];

const R    = 85;
const CIRC = 2 * Math.PI * R;
const CX   = 130;
const CY   = 130;

function DonutChart({ animated }) {
  let cumPct = 0;
  const gapDeg = 1.5;
  const gapLen = (gapDeg / 360) * CIRC;

  return (
    <svg viewBox="0 0 260 260" style={{ overflow: "visible", display: "block", width: "100%", height: "100%" }}>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(212,175,110,0.08)" strokeWidth={28} />

      {SEGMENTS.map((seg, i) => {
        const startFraction = cumPct / 100;
        const dashLen       = (seg.pct / 100) * CIRC - gapLen;
        const dashOffset    = CIRC - startFraction * CIRC;
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
            transform={`rotate(-90, ${CX}, ${CY})`}
            strokeDasharray={`${animated ? dashLen : 0} ${CIRC}`}
            strokeDashoffset={dashOffset}
            style={{
              transition: animated
                ? `stroke-dasharray 1.2s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.12}s`
                : "none",
            }}
          />
        );
      })}

      <text x={CX} y={CY - 8} textAnchor="middle" fill="#D4AF6E" style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 26 }}>
        XN
      </text>
      <text x={CX} y={CY + 10} textAnchor="middle" fill="rgba(240,237,232,0.4)" style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em" }}>
        TOKEN
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
        <div className="tnp-grid">
          {/* Left: heading + description + stats + CTA */}
          <div>
            <span className="eyebrow" style={{ marginBottom: 16 }}>TOKENOMICS</span>
            <h2
              className="disp-title"
              style={{ fontSize: "var(--lg-size)", marginBottom: 24 }}
            >
              ALLOCATION
              <br />
              STRUCTURE
            </h2>
            <p
              style={{
                fontFamily: "var(--font-disp)",
                fontSize: 16,
                color: "var(--text-muted)",
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              A transparent, lock-secured token economy designed to align the incentives of early investors, the development team, and the long-term ecosystem.
            </p>

            {/* Stats 2×2 grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1,
                background: "var(--border-sub)",
                marginBottom: 32,
              }}
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "var(--bg-secondary)",
                    padding: "20px 16px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-disp)",
                      fontWeight: 800,
                      fontSize: "clamp(16px,2vw,24px)",
                      color: "var(--text-primary)",
                      lineHeight: 1.1,
                      marginBottom: 6,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/tokenomics"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              VIEW FULL TOKENOMICS →
            </Link>
          </div>

          {/* Right: donut chart + legend */}
          <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <div style={{ width: "100%", maxWidth: 260, aspectRatio: "1 / 1" }}>
                <DonutChart animated={animated} />
              </div>
            </div>

            {/* 2-column legend */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px 16px",
              }}
            >
              {SEGMENTS.map((seg) => (
                <div key={seg.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: seg.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      color: "var(--text-sec)",
                    }}
                  >
                    {seg.label.charAt(0) + seg.label.slice(1).toLowerCase()} — {seg.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
