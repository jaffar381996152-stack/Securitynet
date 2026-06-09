"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const XN_PRICE = 0.20;

export default function StickyPresaleWidget() {
  const [minimized, setMinimized] = useState(false);
  const [visible, setVisible]     = useState(false);
  const [usdtAmt, setUsdtAmt]     = useState(100);
  const [xnAmt, setXnAmt]         = useState((100 / XN_PRICE).toFixed(0));
  const [isMobile, setIsMobile]   = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  const handleUsdt = (v) => {
    setUsdtAmt(v);
    setXnAmt(Math.round(parseFloat(v || 0) / XN_PRICE));
  };

  const bottom = isMobile ? 72 : 32;

  return (
    <div
      style={{
        position: "fixed",
        bottom,
        right: 12,
        width: "min(268px, calc(100vw - 24px))",
        zIndex: 6000,
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-gold)",
        boxShadow: "0 0 0 1px rgba(212,175,110,0.06), 0 20px 60px rgba(0,0,0,0.6)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        pointerEvents: visible ? "all" : "none",
      }}
    >
      {/* Header / toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 14px",
          borderBottom: minimized ? "none" : "1px solid var(--border-sub)",
          cursor: "pointer",
        }}
        onClick={() => setMinimized(!minimized)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "var(--c-success)",
              display: "inline-block",
              animation: "ubPulse 1.8s ease-in-out infinite",
            }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>
            PRESALE LIVE
          </span>
        </div>
        {/* ▲ rotated 180deg = ▼ when minimized */}
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--text-muted)",
          lineHeight: 1,
          display: "inline-block",
          transform: minimized ? "rotate(180deg)" : "none",
          transition: "transform 0.25s ease",
        }}>
          ▲
        </span>
      </div>

      {/* Body */}
      {!minimized && (
        <div style={{ padding: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              STAGE 3
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)" }}>
              78% FILLED
            </span>
          </div>
          <div style={{ height: 4, background: "rgba(212,175,110,0.1)", position: "relative", marginBottom: 14 }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "78%", background: "linear-gradient(90deg,#A88A52,#E8C882)" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--text-muted)" }}>1 XN</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--gold)", fontWeight: 500 }}>$0.20 USDT</span>
          </div>

          <div style={{ position: "relative", marginBottom: 8 }}>
            <input
              type="number"
              value={usdtAmt}
              min={10}
              onChange={(e) => handleUsdt(e.target.value)}
              style={{
                width: "100%",
                height: 40,
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-sub)",
                borderRadius: 0,
                outline: "none",
                paddingLeft: 10,
                paddingRight: 52,
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                color: "var(--text-primary)",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-gold)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border-sub)")}
            />
            <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", color: "var(--text-muted)" }}>
              USDT
            </span>
          </div>

          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginBottom: 14 }}>
            You receive: <span style={{ color: "var(--gold)" }}>{xnAmt} XN</span>
          </p>

          <Link
            href="/presale"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 40,
              background: "var(--gold)",
              color: "var(--text-inv)",
              fontFamily: "var(--font-disp)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textDecoration: "none",
              marginBottom: 10,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#E8C882")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}
          >
            BUY XN
          </Link>

          <Link
            href="/presale"
            style={{
              display: "block",
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            VIEW FULL PRESALE PAGE →
          </Link>
        </div>
      )}
    </div>
  );
}
