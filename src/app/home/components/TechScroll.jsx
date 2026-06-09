"use client";
import { useEffect, useRef } from "react";

const PANELS = [
  { num: "01", title: "AI SURVEILLANCE", desc: "Real-time facial recognition and behavioral analysis powered by next-generation neural networks operating at the edge.", metric: "99.7%", metricLabel: "ACCURACY" },
  { num: "02", title: "BLOCKCHAIN AUTH", desc: "Immutable audit trails and decentralized identity verification — every access event anchored on-chain for tamper-proof accountability.", metric: "0.3s", metricLabel: "VERIFICATION TIME" },
  { num: "03", title: "NEURAL PROCESSING", desc: "Distributed GPU compute clusters running real-time threat models trained on billions of security events from global deployments.", metric: "1B+", metricLabel: "EVENTS PROCESSED" },
  { num: "04", title: "THREAT DETECTION", desc: "Predictive anomaly detection with sub-second alert latency — identifying threats before they escalate into incidents.", metric: "<0.5s", metricLabel: "ALERT LATENCY" },
  { num: "05", title: "SMART REPORTING", desc: "Automated compliance reports, incident timelines, and forensic data packages generated and stored on decentralized infrastructure.", metric: "100%", metricLabel: "AUDIT COMPLIANCE" },
];

export default function TechScroll() {
  const containerRef = useRef(null);
  const trackRef     = useRef(null);
  const progressRef  = useRef(null);
  const panelRefs    = useRef([]);
  const dotsRef      = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let gsapMod, ScrollTrigger;
    import("@/lib/gsap").then(({ getGsap, ScrollTrigger: ST }) => {
      gsapMod    = getGsap();
      ScrollTrigger = ST;

      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const totalWidth = track.scrollWidth - window.innerWidth;

      const tl = gsapMod.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Progress dots
            const panelIndex = Math.round(self.progress * (PANELS.length - 1));
            dotsRef.current.forEach((dot, i) => {
              if (!dot) return;
              dot.style.background = i === panelIndex ? "var(--gold)" : "rgba(212,175,110,0.25)";
              dot.style.transform  = i === panelIndex ? "scale(1.4)" : "scale(1)";
            });
            // Progress line
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      tl.to(track, { x: -totalWidth, ease: "none" });
    });

    return () => {
      if (ScrollTrigger) ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        overflow: "hidden",
        background: "var(--bg-secondary)",
        position: "relative",
        borderTop: "1px solid var(--border-sub)",
        borderBottom: "1px solid var(--border-sub)",
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
        {/* Progress bar */}
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
          width: "max-content",
        }}
      >
        {PANELS.map((panel, i) => (
          <div
            key={i}
            ref={(el) => (panelRefs.current[i] = el)}
            style={{
              width: "100vw",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              padding: "clamp(80px,10vw,120px) var(--gut)",
              borderRight: "1px solid var(--border-sub)",
              flexShrink: 0,
              position: "relative",
            }}
          >
            {/* Large background number */}
            <div
              style={{
                position: "absolute",
                right: "var(--gut)",
                bottom: "clamp(24px,4vw,48px)",
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

            <div style={{ maxWidth: 560, position: "relative", zIndex: 1 }}>
              <div className="badge" style={{ marginBottom: 28 }}>
                {panel.num} / {String(PANELS.length).padStart(2, "0")}
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
                  marginBottom: 28,
                }}
              >
                {panel.title}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-disp)",
                  fontSize: 18,
                  fontWeight: 400,
                  color: "var(--text-sec)",
                  lineHeight: 1.7,
                  marginBottom: 40,
                }}
              >
                {panel.desc}
              </p>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontWeight: 800,
                    fontSize: "clamp(40px,6vw,72px)",
                    color: "var(--gold)",
                    lineHeight: 1,
                  }}
                >
                  {panel.metric}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginTop: 6,
                  }}
                >
                  {panel.metricLabel}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
