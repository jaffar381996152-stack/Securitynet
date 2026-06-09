"use client";
import { useEffect, useRef, useState } from "react";

export default function Preloader() {
  const [phase, setPhase]     = useState(0); // 0=line 1=text 2=bar 3=done
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const rafRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("preloading");

    // Phase 0 → 1: gold line sweep (600ms)
    const t1 = setTimeout(() => setPhase(1), 50);
    // Phase 1 → 2: text declassify (800ms after phase 1)
    const t2 = setTimeout(() => setPhase(2), 700);

    // Phase 2: progress bar fill
    const t3 = setTimeout(() => {
      let start = null;
      const fill = (ts) => {
        if (!start) start = ts;
        const elapsed = ts - start;
        const p = Math.min((elapsed / 900) * 100, 100);
        setProgress(Math.round(p));
        if (p < 100) {
          rafRef.current = requestAnimationFrame(fill);
        } else {
          // Phase 3: fade out
          setTimeout(() => {
            setPhase(3);
            setTimeout(() => {
              setVisible(false);
              document.body.classList.remove("preloading");
            }, 450);
          }, 120);
        }
      };
      rafRef.current = requestAnimationFrame(fill);
    }, 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.classList.remove("preloading");
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#0A0A0E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: phase === 3 ? 0 : 1,
        transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: phase === 3 ? "none" : "all",
      }}
    >
      {/* Gold sweep line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          height: "1px",
          width: phase >= 1 ? "100%" : "0%",
          background: "linear-gradient(90deg,transparent,#D4AF6E,transparent)",
          transition: "width 0.55s cubic-bezier(0.16,1,0.3,1)",
          transform: "translateY(-40px)",
          opacity: phase >= 2 ? 0 : 1,
        }}
      />

      {/* Logo text */}
      <div
        style={{
          fontFamily: "'Barlow Condensed','Arial Narrow',sans-serif",
          fontWeight: 700,
          fontSize: "clamp(22px,4vw,38px)",
          letterSpacing: phase >= 1 ? "0.3em" : "0.8em",
          color: "#D4AF6E",
          textTransform: "uppercase",
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(8px)",
          transition: "letter-spacing 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease, transform 0.5s ease",
          marginBottom: 32,
        }}
      >
        SECURITYNET.AI
      </div>

      {/* Classification sub-label */}
      <div
        style={{
          fontFamily: "'JetBrains Mono','Courier New',monospace",
          fontSize: 10,
          letterSpacing: "0.25em",
          color: "rgba(212,175,110,0.5)",
          textTransform: "uppercase",
          marginBottom: 32,
          opacity: phase >= 2 ? 1 : 0,
          transition: "opacity 0.4s ease 0.1s",
        }}
      >
        INITIALIZING SECURE CHANNEL
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "clamp(200px,30vw,300px)",
          height: 1,
          background: "rgba(212,175,110,0.15)",
          position: "relative",
          opacity: phase >= 2 ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${progress}%`,
            background: "#D4AF6E",
            transition: "width 0.04s linear",
          }}
        />
      </div>

      {/* Progress number */}
      <div
        style={{
          fontFamily: "'JetBrains Mono','Courier New',monospace",
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "rgba(212,175,110,0.4)",
          marginTop: 12,
          opacity: phase >= 2 ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {String(progress).padStart(3, "0")}%
      </div>
    </div>
  );
}
