"use client";
import { useEffect, useRef, useState } from "react";
import FadeUpSection from "@/app/home/components/FadeUpSection";

const BARS = [
  { name: "PRESALE",   pct: "40%", color: "#D4AF6E", left: 0,    width: 4,    label: "Unlocked at TGE" },
  { name: "ECOSYSTEM", pct: "20%", color: "#5A7060", left: 0,    width: 66.7, label: "Linear · 24 months" },
  { name: "TREASURY",  pct: "15%", color: "#445450", left: 0,    width: 100,  label: "Linear · 36 months" },
  { name: "TEAM",      pct: "10%", color: "#364040", left: 16.7, width: 50,   label: "Vest months 6–24", cliff: 16.7 },
  { name: "LIQUIDITY", pct: "8%",  color: "#2C3636", left: 0,    width: 33.3, label: "Locked · 12 months" },
  { name: "MARKETING", pct: "7%",  color: "#242C2C", left: 0,    width: 50,   label: "Linear · 18 months" },
];

const AXIS = ["TGE", "6 mo", "12 mo", "18 mo", "24 mo", "30 mo", "36 mo"];

export default function VestingSchedule() {
  const wrapRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="vesting" className="section-py" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-sub)" }}>
      <div className="container">
        <span className="eyebrow">VESTING SCHEDULE</span>
        <h2 className="disp-title" style={{ fontSize: "clamp(36px,5vw,64px)", marginBottom: 12 }}>
          UNLOCK <span className="gold-word">TIMELINE</span>
        </h2>
        <p style={{ fontSize: 15, color: "var(--text-sec)", maxWidth: 560, marginBottom: 8 }}>
          Bars represent the active unlock window for each category. All schedules are enforced by immutable smart contract logic.
        </p>
        <FadeUpSection delay={0.16} className="vest-chart">
          <div className="vest-inner" ref={wrapRef}>
            <div className="vest-axis">
              {AXIS.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
            {BARS.map((bar, i) => (
              <div className="vest-row" key={bar.name}>
                <div className="vest-name">
                  <div className="vest-name-title">{bar.name}</div>
                  <div className="vest-name-pct">{bar.pct}</div>
                </div>
                <div className="vest-track-outer">
                  {bar.name === "PRESALE" && (
                    <div className="vest-tge">
                      <span className="vest-tge-lbl">TGE</span>
                    </div>
                  )}
                  {bar.cliff && (
                    <div className="vest-cliff" style={{ left: 0, width: `${bar.cliff}%`, background: "rgba(54,64,64,0.3)" }}>
                      <span className="vest-cliff-lbl">6-mo cliff</span>
                    </div>
                  )}
                  <div
                    className={`vest-bar${animated ? " animated" : ""}`}
                    style={{
                      left: `${bar.left}%`,
                      width: animated ? `${bar.width}%` : 0,
                      background: bar.color,
                      transitionDelay: `${i * 120}ms`,
                    }}
                  >
                    <div className="vest-bar-inner">
                      <span className="vest-bar-lbl">{bar.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeUpSection>
      </div>
    </section>
  );
}
