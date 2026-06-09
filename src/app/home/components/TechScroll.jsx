"use client";
import { useEffect, useRef } from "react";

const PANELS = [
  {
    num: null,
    isIntro: true,
    title: "INTELLIGENCE ARCHITECTURE",
    titleGold: "INTELLIGENCE",
    titleRest: " ARCHITECTURE",
    hint: "→ SCROLL TO EXPLORE",
  },
  {
    num: "01",
    title: "AI-DRIVEN SECURITY",
    desc: "On-chain AI continuously monitors blockchain activity, flags suspicious transactions, and auto-responds to threats across the network — no central authority required.",
    tags: ["Threat Detection", "On-chain AI", "Auto-Response"],
  },
  {
    num: "02",
    title: "AUTOMATION ENGINE",
    desc: "Smart contracts powered by AI decision trees execute security protocols automatically — from flagging anomalies to isolating compromised nodes and settling disputes.",
    tags: ["Smart Contracts", "AI Decisions", "Auto-Settle"],
  },
  {
    num: "03",
    title: "REAL-TIME INTELLIGENCE",
    desc: "Live market data, wallet activity, and on-chain signals processed by AI in milliseconds — giving XN holders and platform operators a decisive informational advantage.",
    tags: ["Live Data", "AI Analytics", "Millisecond Feed"],
  },
  {
    num: "04",
    title: "DECENTRALIZED SECURITY",
    desc: "Distributed node architecture eliminates single points of failure. Non-custodial by design — your keys, your assets, protected by an intelligent decentralized network.",
    tags: ["Distributed Nodes", "Non-Custodial", "Zero Single Point"],
    link: "Read the Whitepaper →",
    linkHref: "/whitepaper",
  },
];

function IntroShield() {
  return (
    <svg width="300" height="360" viewBox="0 0 300 360" fill="none" style={{ opacity: 0.18, position: "absolute", right: "var(--gut)", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
      {[0, 20, 40, 60, 80].map((inset, i) => (
        <path key={i} d={`M${150 - inset / 2} ${20 + inset / 2} L${300 - inset} ${80 + inset / 2} L${300 - inset} ${220 - inset / 2} Q${150} ${360 - inset} ${inset} ${220 - inset / 2} L${inset} ${80 + inset / 2} Z`}
          stroke="#D4AF6E" strokeWidth="1" />
      ))}
    </svg>
  );
}

function Panel01SVG() {
  return (
    <svg width="260" height="240" viewBox="0 0 260 240" fill="none" style={{ position: "absolute", right: "var(--gut)", top: "50%", transform: "translateY(-50%)", opacity: 0.25, pointerEvents: "none" }}>
      {[[65,60],[130,30],[195,60],[210,120],[195,180],[130,210],[65,180],[50,120]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" stroke="#D4AF6E" strokeWidth="1.5" style={{ animation: `techPulseOpacity ${2 + i * 0.3}s ease-in-out infinite` }} />
      ))}
      {[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[0,4],[1,5],[2,6],[3,7]].map(([a,b], i) => {
        const pts = [[65,60],[130,30],[195,60],[210,120],[195,180],[130,210],[65,180],[50,120]];
        return <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="#D4AF6E" strokeWidth="0.5" strokeOpacity="0.5" />;
      })}
    </svg>
  );
}

function Panel02SVG() {
  return (
    <svg width="220" height="260" viewBox="0 0 220 260" fill="none" style={{ position: "absolute", right: "var(--gut)", top: "50%", transform: "translateY(-50%)", opacity: 0.22, pointerEvents: "none" }}>
      {[40,100,160,220].map((y, i) => (
        <g key={i}>
          <rect x="10" y={y - 20} width="200" height="30" rx="2" stroke="#D4AF6E" strokeWidth="1" />
          <line x1="110" y1={y + 10} x2="110" y2={y + 40 < 280 ? y + 40 : y + 10} stroke="#D4AF6E" strokeWidth="1" strokeDasharray="4 4" />
        </g>
      ))}
    </svg>
  );
}

function Panel03SVG() {
  return (
    <svg width="280" height="200" viewBox="0 0 280 200" fill="none" style={{ position: "absolute", right: "var(--gut)", top: "50%", transform: "translateY(-50%)", opacity: 0.2, pointerEvents: "none" }}>
      {[0,1,2,3,4,5].map((i) => (
        <line key={i} x1="0" y1={20 + i * 32} x2="280" y2={20 + i * 32}
          stroke="#D4AF6E" strokeWidth="1" strokeDasharray="8 6"
          style={{ animation: `streamFlow ${2 + i * 0.5}s linear infinite` }} />
      ))}
    </svg>
  );
}

function Panel04SVG() {
  return (
    <svg width="240" height="240" viewBox="0 0 240 240" fill="none" style={{ position: "absolute", right: "var(--gut)", top: "50%", transform: "translateY(-50%)", opacity: 0.2, pointerEvents: "none" }}>
      <circle cx="120" cy="120" r="100" stroke="#D4AF6E" strokeWidth="1" />
      <ellipse cx="120" cy="120" rx="100" ry="30" stroke="#D4AF6E" strokeWidth="0.8" />
      <ellipse cx="120" cy="120" rx="60" ry="100" stroke="#D4AF6E" strokeWidth="0.8" />
      <line x1="20" y1="120" x2="220" y2="120" stroke="#D4AF6E" strokeWidth="0.8" />
      <line x1="120" y1="20" x2="120" y2="220" stroke="#D4AF6E" strokeWidth="0.8" />
    </svg>
  );
}

const PANEL_SVGS = [null, Panel01SVG, Panel02SVG, Panel03SVG, Panel04SVG];

export default function TechScroll() {
  const outerRef   = useRef(null);
  const trackRef   = useRef(null);
  const progressRef = useRef(null);
  const dotsRef    = useRef([]);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const handleScroll = () => {
      const rect      = outer.getBoundingClientRect();
      const sectionH  = outer.offsetHeight;
      const windowH   = window.innerHeight;
      const scrollable = sectionH - windowH;
      const scrolled  = Math.max(0, -rect.top);
      const progress  = scrollable > 0 ? Math.min(scrolled / scrollable, 1) : 0;

      const translateX = -progress * (PANELS.length - 1) * 100;
      track.style.transform = `translateX(${translateX}vw)`;

      const panelIdx = Math.round(progress * (PANELS.length - 1));
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        dot.style.background = i === panelIdx ? "var(--gold)" : "rgba(212,175,110,0.25)";
        dot.style.transform  = i === panelIdx ? "scale(1.4)" : "scale(1)";
      });

      if (progressRef.current) {
        progressRef.current.style.width = `${progress * 100}%`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    /* Outer: 600vh scroll container */
    <div
      ref={outerRef}
      style={{
        height: "600vh",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-sub)",
        borderBottom: "1px solid var(--border-sub)",
        position: "relative",
      }}
    >
      {/* Sticky viewport-height panel */}
      <div
        style={{
          position: "sticky",
          top: "calc(36px + 72px)",
          height: "calc(100vh - 36px - 72px)",
          overflow: "hidden",
        }}
      >
        {/* Section label */}
        <div
          style={{
            position: "absolute",
            top: "clamp(20px,3vw,36px)",
            left: "var(--gut)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span className="eyebrow" style={{ marginBottom: 0 }}>TECHNOLOGY</span>
          <div style={{ width: 120, height: 1, background: "var(--border-sub)", position: "relative" }}>
            <div
              ref={progressRef}
              style={{ position: "absolute", inset: 0, width: "0%", background: "var(--gold)", transition: "none" }}
            />
          </div>
        </div>

        {/* Dot navigation */}
        <div
          style={{
            position: "absolute",
            top: "clamp(20px,3vw,36px)",
            right: "var(--gut)",
            zIndex: 10,
            display: "flex",
            gap: 6,
            alignItems: "center",
          }}
        >
          {PANELS.map((_, i) => (
            <div
              key={i}
              ref={(el) => (dotsRef.current[i] = el)}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: i === 0 ? "var(--gold)" : "rgba(212,175,110,0.25)",
                transition: "background 0.3s, transform 0.3s",
              }}
            />
          ))}
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            width: `${PANELS.length * 100}vw`,
            height: "100%",
            willChange: "transform",
          }}
        >
          {PANELS.map((panel, i) => {
            const PanelSVG = PANEL_SVGS[i];
            return (
              <div
                key={i}
                style={{
                  width: "100vw",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "clamp(80px,10vw,120px) var(--gut)",
                  borderRight: "1px solid var(--border-sub)",
                  flexShrink: 0,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {PanelSVG && <PanelSVG />}

                {panel.isIntro ? (
                  <div style={{ maxWidth: 600, position: "relative", zIndex: 1 }}>
                    <span className="eyebrow" style={{ marginBottom: 24 }}>INTELLIGENCE ARCHITECTURE</span>
                    <h2
                      style={{
                        fontFamily: "var(--font-disp)",
                        fontWeight: 800,
                        fontSize: "var(--xl-size)",
                        textTransform: "uppercase",
                        lineHeight: 1,
                        letterSpacing: "-0.01em",
                        color: "var(--text-primary)",
                        marginBottom: 32,
                      }}
                    >
                      <span style={{ color: "var(--gold)" }}>INTELLIGENCE</span>{" "}
                      ARCHITECTURE
                    </h2>
                    <IntroShield />
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        marginTop: 8,
                      }}
                    >
                      {panel.hint}
                    </p>
                  </div>
                ) : (
                  <div style={{ maxWidth: 560, position: "relative", zIndex: 1 }}>
                    <div
                      style={{
                        position: "absolute",
                        right: "-60px",
                        bottom: "-60px",
                        fontFamily: "var(--font-disp)",
                        fontWeight: 900,
                        fontSize: "clamp(120px,20vw,280px)",
                        lineHeight: 1,
                        color: "rgba(212,175,110,0.04)",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                      {panel.num}
                    </div>

                    <div className="badge" style={{ marginBottom: 28 }}>
                      {panel.num} / 04
                    </div>

                    <h2
                      style={{
                        fontFamily: "var(--font-disp)",
                        fontWeight: 800,
                        fontSize: "var(--xl-size)",
                        textTransform: "uppercase",
                        lineHeight: 1,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.01em",
                        marginBottom: 24,
                      }}
                    >
                      {panel.title}
                    </h2>

                    <p
                      style={{
                        fontFamily: "var(--font-disp)",
                        fontSize: 17,
                        fontWeight: 400,
                        color: "var(--text-sec)",
                        lineHeight: 1.7,
                        marginBottom: 32,
                      }}
                    >
                      {panel.desc}
                    </p>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: panel.link ? 28 : 0 }}>
                      {panel.tags.map((tag) => (
                        <span key={tag} className="badge" style={{ margin: 0 }}>{tag}</span>
                      ))}
                    </div>

                    {panel.link && (
                      <a
                        href={panel.linkHref}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--gold)",
                          textDecoration: "none",
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        {panel.link}
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
