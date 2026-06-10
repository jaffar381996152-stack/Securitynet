"use client";
import { useEffect, useRef } from "react";

const PANELS = [
  {
    num: null,
    isIntro: true,
    hint: "→ SCROLL TO EXPLORE",
  },
  {
    num: "01",
    titleGold: "AI-DRIVEN",
    titleWhite: "SECURITY",
    desc: "XN powers real-time threat detection and automated response across decentralized networks. Every transaction is analyzed and secured by on-chain AI.",
    tags: ["Threat Detection", "On-chain AI", "Auto-Response"],
  },
  {
    num: "02",
    titleGold: "AUTOMATION",
    titleWhite: "ENGINE",
    desc: "Smart contract automation driven by AI decision trees. Transactions are validated, routed, and settled without human intervention across any supported chain.",
    tags: ["Smart Contracts", "AI Decisions", "Auto-Settle"],
  },
  {
    num: "03",
    titleGold: "REAL-TIME",
    titleWhite: "INTELLIGENCE",
    desc: "Live market data, on-chain analytics, and AI-powered signals. XN holders access intelligence feeds that update in milliseconds, not minutes.",
    tags: ["Live Data", "AI Analytics", "Millisecond Feed"],
  },
  {
    num: "04",
    titleGold: "DECENTRALIZED",
    titleWhite: "SECURITY",
    desc: "No single point of failure. XN's security layer distributes trust across hundreds of nodes — the network gets stronger with every new participant.",
    tags: ["Distributed Nodes", "Non-Custodial", "Zero Single Point"],
    link: "Read the Whitepaper →",
    linkHref: "/whitepaper",
  },
];

function IntroShield() {
  return (
    <div className="tech-intro-shield" style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", opacity: 0.18, pointerEvents: "none" }} aria-hidden="true">
      <svg viewBox="0 0 300 360" fill="none" stroke="#D4AF6E" strokeWidth="1">
        <path d="M150 10L280 70V170Q280 290 150 350Q20 290 20 170V70Z" />
        <path d="M150 30L260 83V168Q260 272 150 328Q40 272 40 168V83Z" opacity="0.7" />
        <path d="M150 55L238 98V165Q238 255 150 304Q62 255 62 165V98Z" opacity="0.5" />
        <path d="M150 80L216 113V162Q216 238 150 280Q84 238 84 162V113Z" opacity="0.3" />
        <line x1="110" y1="160" x2="150" y2="145" strokeWidth="0.5" strokeDasharray="4 2" className="tech-dash-flow" />
        <line x1="150" y1="145" x2="190" y2="160" strokeWidth="0.5" strokeDasharray="4 2" className="tech-dash-flow" style={{ animationDelay: "0.3s" }} />
        <line x1="150" y1="145" x2="150" y2="210" strokeWidth="0.5" strokeDasharray="4 2" className="tech-dash-flow" style={{ animationDelay: "0.6s" }} />
        <circle cx="110" cy="160" r="6" className="diag-pulse-ring" />
        <circle cx="150" cy="145" r="6" className="diag-pulse-ring" style={{ animationDelay: "0.5s" }} />
        <circle cx="190" cy="160" r="6" className="diag-pulse-ring" style={{ animationDelay: "1s" }} />
        <circle cx="150" cy="210" r="6" className="diag-pulse-ring" style={{ animationDelay: "1.5s" }} />
        <circle cx="110" cy="160" r="3" fill="#D4AF6E" />
        <circle cx="150" cy="145" r="3" fill="#D4AF6E" />
        <circle cx="190" cy="160" r="3" fill="#D4AF6E" />
        <circle cx="150" cy="210" r="3" fill="#D4AF6E" />
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
      <line x1="70" y1="64" x2="155" y2="118" strokeDasharray="4 2" className="tech-dash-flow" />
      <line x1="280" y1="64" x2="195" y2="118" strokeDasharray="4 2" className="tech-dash-flow" style={{ animationDelay: "0.3s" }} />
      <line x1="70" y1="196" x2="155" y2="142" strokeDasharray="4 2" className="tech-dash-flow" style={{ animationDelay: "0.6s" }} />
      <line x1="280" y1="196" x2="195" y2="142" strokeDasharray="4 2" className="tech-dash-flow" style={{ animationDelay: "0.9s" }} />
      <line x1="170" y1="40" x2="170" y2="70" strokeDasharray="4 2" className="tech-dash-flow" style={{ animationDelay: "0.2s" }} />
      <line x1="170" y1="220" x2="170" y2="190" strokeDasharray="4 2" className="tech-dash-flow" style={{ animationDelay: "0.5s" }} />
      <circle cx="290" cy="60" r="18" strokeDasharray="4 3" opacity="0.5" style={{ animation: "techPulseOpacity 2s ease-in-out infinite" }} />
      <circle cx="60" cy="200" r="18" strokeDasharray="4 3" opacity="0.4" style={{ animation: "techPulseOpacity 2s 0.7s ease-in-out infinite" }} />
      <text x="252" y="44" fontSize="9" fill="#A85252" fontFamily="JetBrains Mono" letterSpacing="1">THREAT</text>
      <text x="18" y="185" fontSize="9" fill="#A85252" fontFamily="JetBrains Mono" letterSpacing="1">THREAT</text>
      <circle cx="170" cy="130" r="14" strokeDasharray="3 3" className="diag-pulse-ring" />
      <circle cx="170" cy="130" r="8" fill="#D4AF6E" fillOpacity="0.2" stroke="#D4AF6E" />
      <text x="152" y="134" fontSize="9" fill="#D4AF6E" fontFamily="JetBrains Mono">AI</text>
    </svg>
  );
}

function Panel02SVG() {
  return (
    <svg className="tech-svg" viewBox="0 0 340 260" fill="none" aria-hidden="true">
      {/* AI INPUT */}
      <rect x="120" y="10" width="100" height="30" rx="2" stroke="#D4AF6E" strokeWidth="1" />
      <text x="170" y="30" fontSize="9" fill="#D4AF6E" fontFamily="JetBrains Mono,monospace" textAnchor="middle" letterSpacing="0.8">AI INPUT</text>
      <line x1="170" y1="40" x2="170" y2="70" stroke="#D4AF6E" strokeWidth="1" strokeDasharray="4 3" className="tech-dash-flow" />
      {/* Middle row */}
      <rect x="10" y="70" width="75" height="30" rx="2" stroke="#D4AF6E" strokeWidth="1" />
      <text x="47" y="90" fontSize="9" fill="#D4AF6E" fontFamily="JetBrains Mono,monospace" textAnchor="middle" letterSpacing="0.8">PASS</text>
      <g style={{ animation: "techPulseOpacity 2.4s ease-in-out infinite" }}>
        <rect x="120" y="70" width="100" height="30" rx="2" stroke="#D4AF6E" strokeWidth="1" />
        <text x="170" y="90" fontSize="9" fill="#D4AF6E" fontFamily="JetBrains Mono,monospace" textAnchor="middle" letterSpacing="0.8">DECISION</text>
      </g>
      <rect x="255" y="70" width="75" height="30" rx="2" stroke="#D4AF6E" strokeWidth="1" />
      <text x="292" y="90" fontSize="9" fill="#D4AF6E" fontFamily="JetBrains Mono,monospace" textAnchor="middle" letterSpacing="0.8">HOLD</text>
      {/* Horizontal connectors */}
      <line x1="120" y1="85" x2="85" y2="85" stroke="#D4AF6E" strokeWidth="1" />
      <line x1="220" y1="85" x2="255" y2="85" stroke="#D4AF6E" strokeWidth="1" />
      {/* Drop lines */}
      <line x1="47" y1="100" x2="47" y2="155" stroke="#D4AF6E" strokeWidth="1" strokeDasharray="4 3" className="tech-dash-flow" style={{ animationDelay: "0.2s" }} />
      <line x1="170" y1="100" x2="170" y2="155" stroke="#D4AF6E" strokeWidth="1" strokeDasharray="4 3" className="tech-dash-flow" style={{ animationDelay: "0.4s" }} />
      <line x1="292" y1="100" x2="292" y2="155" stroke="#D4AF6E" strokeWidth="1" strokeDasharray="4 3" className="tech-dash-flow" style={{ animationDelay: "0.6s" }} />
      {/* Bottom row */}
      <rect x="10" y="155" width="75" height="30" rx="2" stroke="#D4AF6E" strokeWidth="1" />
      <text x="47" y="175" fontSize="9" fill="#D4AF6E" fontFamily="JetBrains Mono,monospace" textAnchor="middle" letterSpacing="0.8">SETTLE</text>
      <rect x="120" y="155" width="100" height="30" rx="2" stroke="#D4AF6E" strokeWidth="1" />
      <text x="170" y="175" fontSize="9" fill="#D4AF6E" fontFamily="JetBrains Mono,monospace" textAnchor="middle" letterSpacing="0.8">EXECUTE</text>
      <rect x="255" y="155" width="75" height="30" rx="2" stroke="#D4AF6E" strokeWidth="1" />
      <text x="292" y="175" fontSize="9" fill="#D4AF6E" fontFamily="JetBrains Mono,monospace" textAnchor="middle" letterSpacing="0.8">REVIEW</text>
    </svg>
  );
}

function Panel03SVG() {
  const rows = [
    { label: "TX.FEED",     lineEnd: 230, highlight: false },
    { label: "PRICE.DATA",  lineEnd: 210, highlight: false },
    { label: "AI.SIGNAL",   lineEnd: 165, highlight: true  },
    { label: "CHAIN.STATS", lineEnd: 200, highlight: false },
    { label: "THREAT.LOG",  lineEnd: 220, highlight: false },
  ];
  const baseY = 50;
  const gap   = 40;
  return (
    <svg className="tech-svg" viewBox="0 0 340 260" fill="none" aria-hidden="true">
      {rows.map((row, i) => {
        const y   = baseY + i * gap;
        const rX2 = 282 + (i % 3) * 8;
        return (
          <g key={i}>
            <text
              x="10" y={y + 4} fontSize="9"
              fill={row.highlight ? "#D4AF6E" : "rgba(212,175,110,0.45)"}
              fontFamily="JetBrains Mono,monospace" letterSpacing="0.5"
            >
              {row.label}
            </text>
            <line
              x1="90" y1={y}
              x2={row.highlight ? 165 : row.lineEnd} y2={y}
              stroke={row.highlight ? "#D4AF6E" : "rgba(212,175,110,0.3)"}
              strokeWidth="0.8"
            />
            {row.highlight && (
              <>
                <circle cx="172" cy={y} r="10" stroke="#D4AF6E" strokeWidth="1" fill="none" className="diag-pulse-ring" />
                <circle cx="172" cy={y} r="6" stroke="#D4AF6E" strokeWidth="1" fill="rgba(212,175,110,0.15)" />
                <circle cx="172" cy={y} r="2" fill="#D4AF6E" />
                <line x1="178" y1={y} x2={row.lineEnd} y2={y} stroke="#D4AF6E" strokeWidth="0.8" strokeDasharray="4 2" className="tech-dash-flow" />
              </>
            )}
            <line x1="268" y1={y} x2={rX2} y2={y} stroke="rgba(212,175,110,0.18)" strokeWidth="0.6" />
          </g>
        );
      })}
    </svg>
  );
}

function Panel04SVG() {
  return (
    <div className="tech-panel04-svgs" style={{ display: "flex", alignItems: "center", gap: 24 }}>
      {/* Shield with network */}
      <svg
        className="tech-panel04-svg"
        style={{ flexShrink: 0, opacity: 0.55 }}
        viewBox="0 0 180 220"
        fill="none"
        stroke="#D4AF6E"
        strokeWidth="1"
      >
        <path d="M90 12L162 48V112Q162 172 90 208Q18 172 18 112V48Z" />
        <path d="M90 28L146 58V110Q146 160 90 190Q34 160 34 110V58Z" strokeWidth="0.6" opacity="0.6" />
        <line x1="90" y1="90" x2="62" y2="122" strokeWidth="0.6" />
        <line x1="90" y1="90" x2="118" y2="122" strokeWidth="0.6" />
        <line x1="62" y1="122" x2="90" y2="152" strokeWidth="0.6" />
        <line x1="118" y1="122" x2="90" y2="152" strokeWidth="0.6" />
        <circle cx="90" cy="90" r="9" stroke="#D4AF6E" strokeWidth="0.6" fill="none" className="diag-pulse-ring" />
        <circle cx="62" cy="122" r="7" stroke="#D4AF6E" strokeWidth="0.6" fill="none" className="diag-pulse-ring" style={{ animationDelay: "0.6s" }} />
        <circle cx="118" cy="122" r="7" stroke="#D4AF6E" strokeWidth="0.6" fill="none" className="diag-pulse-ring" style={{ animationDelay: "1.2s" }} />
        <circle cx="90" cy="152" r="6" stroke="#D4AF6E" strokeWidth="0.6" fill="none" className="diag-pulse-ring" style={{ animationDelay: "1.8s" }} />
        <circle cx="90" cy="90" r="5" fill="#D4AF6E" fillOpacity="0.3" />
        <circle cx="62" cy="122" r="3.5" fill="#D4AF6E" fillOpacity="0.3" />
        <circle cx="118" cy="122" r="3.5" fill="#D4AF6E" fillOpacity="0.3" />
        <circle cx="90" cy="152" r="3" fill="#D4AF6E" fillOpacity="0.3" />
      </svg>
      {/* Globe */}
      <svg
        className="tech-panel04-svg"
        style={{ flexShrink: 0, opacity: 0.55 }}
        viewBox="0 0 220 220"
        fill="none"
        stroke="#D4AF6E"
        strokeWidth="1"
      >
        <circle cx="110" cy="110" r="95" />
        <g className="tech-rotate-slow">
          <ellipse cx="110" cy="110" rx="95" ry="30" strokeWidth="0.8" />
          <ellipse cx="110" cy="110" rx="57" ry="95" strokeWidth="0.8" />
          <line x1="15" y1="110" x2="205" y2="110" strokeWidth="0.8" />
          <line x1="110" y1="15" x2="110" y2="205" strokeWidth="0.8" />
          {[[40,60],[180,60],[40,160],[180,160]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="4" fill="#D4AF6E" fillOpacity="0.4" />
          ))}
        </g>
      </svg>
    </div>
  );
}

const PANEL_SVGS = [null, Panel01SVG, Panel02SVG, Panel03SVG, Panel04SVG];

export default function TechScroll() {
  const outerRef    = useRef(null);
  const trackRef    = useRef(null);
  const progressRef = useRef(null);
  const dotsRef     = useRef([]);

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
                      <span style={{ color: "var(--gold)" }}>INTELLIGENCE</span>
                      <br />
                      ARCHITECTURE
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
                    <span style={{ color: "var(--gold)" }}>{panel.titleGold}</span>
                    <br />
                    {panel.titleWhite}
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
