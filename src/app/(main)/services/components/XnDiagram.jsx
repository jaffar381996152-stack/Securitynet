"use client";
import { useEffect, useRef, useState } from "react";
import FadeUpSection from "@/app/home/components/FadeUpSection";

const NODES = [
  { id: "fl0", x1: 322, y1: 196, x2: 160, y2: 80, cx: 160, cy: 68, label: "AI", sub: "MONITORING", labelY: 63, subY: 75 },
  { id: "fl1", x1: 350, y1: 175, x2: 350, y2: 52, cx: 350, cy: 40, label: "THREAT", sub: "DETECTION", labelY: 35, subY: 47 },
  { id: "fl2", x1: 378, y1: 196, x2: 540, y2: 80, cx: 540, cy: 68, label: "CONTRACT", sub: "SECURITY", labelY: 63, subY: 75 },
  { id: "fl3", x1: 378, y1: 238, x2: 540, y2: 354, cx: 540, cy: 366, label: "DECENTRAL.", sub: "AI SERVICES", labelY: 361, subY: 373 },
  { id: "fl4", x1: 350, y1: 259, x2: 350, y2: 382, cx: 350, cy: 394, label: "IDENTITY", sub: "VERIF.", labelY: 389, subY: 401 },
  { id: "fl5", x1: 322, y1: 238, x2: 160, y2: 354, cx: 160, cy: 366, label: "IoT", sub: "SECURITY", labelY: 361, subY: 373 },
];

export default function XnDiagram() {
  const wrapRef = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const flowLine = (props, i) => (
    <line
      {...props}
      className={`flow-line${drawn ? " drawn" : ""}`}
      style={{ transitionDelay: `${i * 100}ms` }}
    />
  );

  return (
    <section id="how-xn" className="section-py" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-sub)" }}>
      <div className="container">
        <span className="eyebrow">HOW IT WORKS</span>
        <h2 className="disp-title" style={{ fontSize: "clamp(36px,5vw,64px)", marginBottom: 12 }}>
          XN POWERS <span className="gold-word">EVERY LAYER</span>
        </h2>
        <p style={{ fontSize: 15, color: "var(--text-sec)", maxWidth: 520, marginBottom: 48 }}>
          The XN token is the single currency connecting users to every SecurityNet service. Pay, stake, govern, and access — all with one token.
        </p>

        <FadeUpSection delay={0.16}>
          <div className="xn-diagram-wrap" ref={wrapRef}>
            <svg className="xn-diagram-svg" viewBox="0 0 700 420" aria-label="XN token service architecture diagram" role="img">
              <title>XN Powers Every Service Layer</title>

              <polygon points="350,175 386,196 386,238 350,259 314,238 314,196" fill="none" stroke="#D4AF6E" strokeWidth="1.5" />
              <polygon points="350,185 378,201 378,233 350,249 322,233 322,201" fill="rgba(212,175,110,0.06)" stroke="#D4AF6E" strokeWidth="0.5" />
              <circle className="diag-pulse-ring" cx="350" cy="217" r="48" fill="none" stroke="rgba(212,175,110,0.2)" strokeWidth="1" />
              <text className="diagram-label" x="350" y="213" fontSize="16" fontWeight="700">XN</text>
              <text className="diagram-sub" x="350" y="228">TOKEN</text>

              {NODES.map((n, i) => (
                <g key={n.id}>
                  {flowLine({ x1: n.x1, y1: n.y1, x2: n.x2, y2: n.y2, stroke: "#D4AF6E", strokeWidth: "0.8", opacity: "0.5" }, i)}
                  <circle cx={n.cx} cy={n.cy} r="32" fill="var(--bg-secondary,#1C1C22)" stroke="#D4AF6E" strokeWidth="1" />
                  <text className="diagram-label" x={n.cx} y={n.labelY}>{n.label}</text>
                  <text className="diagram-sub" x={n.cx} y={n.subY}>{n.sub}</text>
                </g>
              ))}

              {flowLine({ x1: 128, y1: 217, x2: 70, y2: 217, stroke: "#8B8B7A", strokeWidth: "0.8", opacity: "0.5", strokeDasharray: "4 3" }, 6)}
              <rect x="12" y="196" width="58" height="42" fill="none" stroke="rgba(240,237,232,0.12)" strokeWidth="1" />
              <text className="diagram-label" x="41" y="213" fill="#8B8B7A">USER</text>
              <text className="diagram-sub" x="41" y="225">→ PAY XN</text>

              {flowLine({ x1: 572, y1: 217, x2: 630, y2: 217, stroke: "#8B8B7A", strokeWidth: "0.8", opacity: "0.5", strokeDasharray: "4 3" }, 7)}
              <rect x="630" y="196" width="58" height="42" fill="none" stroke="rgba(240,237,232,0.12)" strokeWidth="1" />
              <text className="diagram-label" x="659" y="213" fill="#8B8B7A">DAPP</text>
              <text className="diagram-sub" x="659" y="225">→ STAKE</text>
            </svg>
          </div>
        </FadeUpSection>
      </div>
    </section>
  );
}
