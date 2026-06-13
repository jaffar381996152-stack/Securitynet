"use client";
import { useEffect, useRef, useState } from "react";
import FadeUpSection from "@/app/home/components/FadeUpSection";

const R = 110;
const CIRC = 2 * Math.PI * R;
const CX = 170;
const CY = 170;

const SEGMENTS = [
  { label: "Presale",   key: "PRESALE",   pct: 40, color: "#D4AF6E", amount: "40,000,000", vesting: "Unlocked at TGE" },
  { label: "Ecosystem", key: "ECOSYSTEM", pct: 20, color: "#5A7060", amount: "20,000,000", vesting: "24 months linear" },
  { label: "Treasury",  key: "TREASURY",  pct: 15, color: "#445450", amount: "15,000,000", vesting: "36 months linear" },
  { label: "Team",      key: "TEAM",      pct: 10, color: "#364040", amount: "10,000,000", vesting: "6-mo cliff, 18-mo vest" },
  { label: "Liquidity", key: "LIQUIDITY", pct: 8,  color: "#2C3636", amount: "8,000,000",  vesting: "Locked 12 months" },
  { label: "Marketing", key: "MARKETING", pct: 7,  color: "#242C2C", amount: "7,000,000",  vesting: "18 months linear" },
];

const thStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: 9,
  letterSpacing: "0.15em",
  color: "var(--gold)",
  textTransform: "uppercase",
  padding: "0 0 10px",
  textAlign: "left",
  borderBottom: "1px solid var(--border-gold)",
  whiteSpace: "nowrap",
};

const tdStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  padding: "11px 0",
  borderBottom: "1px solid var(--border-sub)",
  color: "var(--text-sec)",
  verticalAlign: "middle",
};

export default function AllocationDonut() {
  const wrapRef = useRef(null);
  const [animated, setAnimated] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const gapDeg = 1.5;
  const gapLen = (gapDeg / 360) * CIRC;
  let cumPct = 0;
  const arcs = SEGMENTS.map((seg, i) => {
    const startFraction = cumPct / 100;
    const dashLen = (seg.pct / 100) * CIRC - gapLen;
    const dashOffset = CIRC - startFraction * CIRC;
    cumPct += seg.pct;
    const delay = i === 0 ? 0 : i * 0.1 + 0.02;
    const duration = i === 0 ? 1 : 1.1;
    return { ...seg, dashLen, dashOffset, delay, duration };
  });

  const hoveredSeg = hovered !== null ? SEGMENTS[hovered] : null;

  return (
    <section id="allocation" className="section-py section-light" style={{ borderTop: "1px solid var(--border-sub)", borderBottom: "1px solid var(--border-sub)" }}>
      <div className="container">
        <span className="eyebrow">ALLOCATION BREAKDOWN</span>
        <div className="alloc-grid" style={{ marginTop: 32 }}>
          <FadeUpSection delay={0.08}>
            <div ref={wrapRef} style={{ position: "relative", width: 340, height: 340, margin: "0 auto", maxWidth: "100%" }}>
              <svg width={340} height={340} viewBox="0 0 340 340" style={{ overflow: "visible", width: "100%", height: "auto" }} aria-label="Token allocation chart" role="img">
                <title>XN Token Allocation</title>
                <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(20,20,24,0.06)" strokeWidth={34} />
                {arcs.map((seg, i) => (
                  <circle
                    key={seg.key}
                    cx={CX}
                    cy={CY}
                    r={R}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={hovered === i ? 40 : 34}
                    transform={`rotate(-90, ${CX}, ${CY})`}
                    strokeDasharray={`${animated ? seg.dashLen : 0} ${CIRC}`}
                    strokeDashoffset={seg.dashOffset}
                    style={{
                      cursor: "pointer",
                      transition: animated
                        ? `stroke-dasharray ${seg.duration}s var(--ease-expo) ${seg.delay}s, stroke-width 0.2s`
                        : "stroke-width 0.2s",
                    }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  />
                ))}
              </svg>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none" }}>
                <div
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontWeight: 700,
                    fontSize: hoveredSeg ? 18 : 28,
                    color: "var(--gold)",
                    letterSpacing: "-0.01em",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    transition: "font-size 0.2s",
                  }}
                >
                  {hoveredSeg ? hoveredSeg.key : "XN"}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 5 }}>
                  {hoveredSeg ? `${hoveredSeg.pct}% · ${(hoveredSeg.pct * 1000000).toLocaleString()} XN` : "TOKEN"}
                </div>
              </div>
            </div>
          </FadeUpSection>

          <FadeUpSection delay={0.16} className="alloc-right-col">
            <h2 className="disp-title" style={{ fontSize: "clamp(32px,4vw,52px)", marginBottom: 28 }}>
              FULL <span className="gold-word">ALLOCATION</span> TABLE
            </h2>
            <table aria-label="Token allocation breakdown" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>ALLOCATION</th>
                  <th style={thStyle}>AMOUNT (XN)</th>
                  <th style={thStyle}>%</th>
                  <th style={thStyle}>VESTING</th>
                </tr>
              </thead>
              <tbody>
                {SEGMENTS.map((seg, i) => (
                  <tr
                    key={seg.key}
                    style={{ background: hovered === i ? "var(--gold-ghost)" : "transparent", cursor: "pointer", transition: "background 0.2s" }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <td style={{ ...tdStyle, color: "var(--text-primary)", fontWeight: 500 }}>
                      <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", marginRight: 8, verticalAlign: "middle", background: seg.color }} />
                      {seg.label}
                    </td>
                    <td style={tdStyle}>{seg.amount}</td>
                    <td style={{ ...tdStyle, color: "var(--gold)" }}>{seg.pct}%</td>
                    <td style={tdStyle}>{seg.vesting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeUpSection>
        </div>
      </div>
    </section>
  );
}
