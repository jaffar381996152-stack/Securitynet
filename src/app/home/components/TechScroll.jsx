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
    desc: "XN powers real-time threat detection and automated response across decentralized networks. Every transaction is analyzed and secured by on-chain AI.",
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
    <div style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", opacity: 0.18, pointerEvents: "none" }} aria-hidden="true">
      <svg width="300" height="360" viewBox="0 0 300 360" fill="none" stroke="#D4AF6E" strokeWidth="1">
        <path d="M150 10L280 70V170Q280 290 150 350Q20 290 20 170V70Z" />
        <path d="M150 30L260 83V168Q260 272 150 328Q40 272 40 168V83Z" opacity="0.7" />
        <path d="M150 55L238 98V165Q238 255 150 304Q62 255 62 165V98Z" opacity="0.5" />
        <path d="M150 80L216 113V162Q216 238 150 280Q84 238 84 162V113Z" opacity="0.3" />
        <circle cx="110" cy="160" r="3" fill="#D4AF6E" />
        <circle cx="150" cy="145" r="3" fill="#D4AF6E" />
        <circle cx="190" cy="160" r="3" fill="#D4AF6E" />
        <circle cx="150" cy="210" r="3" fill="#D4AF6E" />
        <line x1="110" y1="160" x2="150" y2="145" strokeWidth="0.5" />
        <line x1="150" y1="145" x2="190" y2="160" strokeWidth="0.5" />
        <line x1="150" y1="145" x2="150" y2="210" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

function Panel01SVG() {
  return (
    <svg className="tech-svg" viewBox="0 0 340 260" fill="none" stroke="#D4AF6E" strokeWidth="1" aria-hidden="true">
      <circle cx="170" cy="130" r="60" strokeWidth="0.5" />
      <circle cx="60" cy="60" r="10" /><circle cx="290" cy="60" r="10" />
      <circle cx="60" cy="200" r="10" /><circle cx="290" cy="200" r="10" />
      <circle cx="170" cy="30" r="10" /><circle cx="170" cy="230" r="10" />
      <line x1="70" y1="64" x2="155" y2="118" /><line x1="280" y1="64" x2="195" y2="118" />
      <line x1="70" y1="196" x2="155" y2="142" /><line x1="280" y1="196" x2="195" y2="142" />
      <line x1="170" y1="40" x2="170" y2="70" /><line x1="170" y1="220" x2="170" y2="190" />
      <circle cx="290" cy="60" r="18" strokeDasharray="4 3" opacity="0.5" style={{ animation: "techPulseOpacity 2s ease-in-out infinite" }} />
      <circle cx="60" cy="200" r="18" strokeDasharray="4 3" opacity="0.4" style={{ animation: "techPulseOpacity 2s 0.7s ease-in-out infinite" }} />
      <text x="252" y="44" fontSize="9" fill="#A85252" fontFamily="JetBrains Mono" letterSpacing="1">THREAT</text>
      <text x="18" y="185" fontSize="9" fill="#A85252" fontFamily="JetBrains Mono" letterSpacing="1">THREAT</text>
      <circle cx="170" cy="130" r="8" fill="#D4AF6E" fillOpacity="0.2" stroke="#D4AF6E" />
      <text x="152" y="134" fontSize="9" fill="#D4AF6E" fontFamily="JetBrains Mono">AI</text>
    </svg>
  );
}

function Panel02SVG() {
  return (
    <svg className="tech-svg" viewBox="0 0 340 260" fill="none" aria-hidden="true">
      {[50, 110, 170, 230].map((y, i) => (
        <g key={i}>
          <rect x="60" y={y - 20} width="220" height="34" rx="2" stroke="#D4AF6E" strokeWidth="1" />
          <line x1="170" y1={y + 14} x2="170" y2={y + 50 < 260 ? y + 50 : y + 14} stroke="#D4AF6E" strokeWidth="1" strokeDasharray="4 4" />
        </g>
      ))}
      <rect x="130" y={210} width="80" height="30" rx="2" stroke="#D4AF6E" strokeWidth="0.5" fill="rgba(212,175,110,0.06)" />
    </svg>
  );
}

function Panel03SVG() {
  return (
    <svg className="tech-svg" viewBox="0 0 340 260" fill="none" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={i} x1="20" y1={30 + i * 30} x2="320" y2={30 + i * 30}
          stroke="#D4AF6E" strokeWidth="1" strokeDasharray="10 6"
          style={{ animation: `streamFlow ${2 + i * 0.4}s linear infinite` }} />
      ))}
      <circle cx="170" cy="130" r="20" stroke="#D4AF6E" strokeWidth="1" fill="rgba(212,175,110,0.06)" />
      <text x="158" y="134" fontSize="9" fill="#D4AF6E" fontFamily="JetBrains Mono">LIVE</text>
    </svg>
  );
}

function Panel04SVG() {
  return (
    <svg className="tech-svg" viewBox="0 0 340 260" fill="none" aria-hidden="true">
      <circle cx="170" cy="130" r="100" stroke="#D4AF6E" strokeWidth="1" />
      <ellipse cx="170" cy="130" rx="100" ry="32" stroke="#D4AF6E" strokeWidth="0.8" />
      <ellipse cx="170" cy="130" rx="60" ry="100" stroke="#D4AF6E" strokeWidth="0.8" />
      <line x1="70" y1="130" x2="270" y2="130" stroke="#D4AF6E" strokeWidth="0.8" />
      <line x1="170" y1="30" x2="170" y2="230" stroke="#D4AF6E" strokeWidth="0.8" />
      {[[90,70],[250,70],[90,190],[250,190]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="#D4AF6E" fillOpacity="0.4" />
      ))}
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
        className="tech-sticky"
        style={{
          position: "sticky",
          top: "calc(36px + 72px)",
          height: "calc(100vh - 36px - 72px)",
          overflow: "hidden",
          borderTop: "1px solid var(--border-gold)",
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

            if (panel.isIntro) {
              return (
                <div
                  key={i}
                  className="tech-panel-0"
                  style={{
                    width: "100vw",
                    flexShrink: 0,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 var(--gut)",
                    position: "relative",
                    borderRight: "1px solid var(--border-sub)",
                  }}
                >
                  <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", width: "100%", position: "relative" }}>
                    <span className="eyebrow" style={{ marginBottom: 16 }}>INTELLIGENCE ARCHITECTURE</span>
                    <h2
                      className="tech-intro-title"
                      style={{
                        fontFamily: "var(--font-disp)",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        lineHeight: 1,
                        letterSpacing: "-0.01em",
                        color: "var(--text-primary)",
                        marginBottom: 24,
                      }}
                    >
                      <span style={{ color: "var(--gold)" }}>INTELLIGENCE</span>{" "}ARCHITECTURE
                    </h2>
                    <p className="tech-intro-hint">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      SCROLL TO EXPLORE
                    </p>
                    <IntroShield />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={i}
                className="tech-panel-single"
                style={{ width: "100vw", flexShrink: 0, height: "100%", borderRight: "1px solid var(--border-sub)" }}
              >
                <div className="tech-panel-left">
                  <span className="tech-panel-num" aria-hidden="true">{panel.num}</span>
                  <h2 className="disp-title tech-panel-title">
                    {panel.title}
                  </h2>
                  <p className="tech-panel-body">{panel.desc}</p>
                  <div className="tech-tags">
                    {panel.tags.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                  {panel.link && (
                    <a
                      href={panel.linkHref}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 20,
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
                <div className="tech-panel-right" aria-hidden="true">
                  {PanelSVG && <PanelSVG />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
