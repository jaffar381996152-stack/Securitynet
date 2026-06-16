"use client";
import { useRef, useCallback } from "react";
import Link from "next/link";
import { useParticleHero } from "./useParticleHero";

// Must match FORM_END in scene/controller.js — the scroll fraction by which the
// coin has settled & started rotating. After it, the CTA buttons reveal.
const FORM_END = 0.66;
const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function ParticleCollapseHero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const howRef = useRef(null);
  const buyRef = useRef(null);

  // Scroll-driven CTA reveal — imperative (no React re-renders). After the coin
  // settles, "How to Buy" fades+slides in from the LEFT and "Buy XN" from the
  // RIGHT, both settling centred. Stable callback so the hero effect never re-runs.
  const onProgress = useCallback((p) => {
    const how = howRef.current;
    const buy = buyRef.current;
    if (!how || !buy) return;
    const bp = (p - FORM_END) / (1 - FORM_END);
    const t = smoothstep(0.05, 0.6, bp); // clear fade + slide-in, then hold
    const interactive = t > 0.6 ? "auto" : "none";
    how.style.opacity = String(t);
    how.style.transform = `translateX(${(t - 1) * 150}px)`;
    how.style.pointerEvents = interactive;
    buy.style.opacity = String(t);
    buy.style.transform = `translateX(${(1 - t) * 150}px)`;
    buy.style.pointerEvents = interactive;
  }, []);

  // "How to Buy" smooth-scrolls down to the How-to-Buy section on this page
  const scrollToHowToBuy = useCallback((e) => {
    e.preventDefault();
    const target = document.getElementById("how-to-buy");
    if (!target) return;
    const OFFSET = -120; // clear the fixed header
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { offset: OFFSET, duration: 1.2 });
    } else {
      const y = target.getBoundingClientRect().top + window.scrollY + OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  useParticleHero({ sectionRef, canvasRef, onProgress });

  // shared compact size for both CTAs; fills differ
  const sizeBtn = {
    width: 150,
    height: 48,
    boxSizing: "border-box",
    padding: "0 14px",
    borderRadius: 0,
    fontFamily: "var(--font-disp)",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    whiteSpace: "nowrap",
    opacity: 0,
    pointerEvents: "none",
    willChange: "opacity, transform",
    transition: "background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease",
  };
  const whiteBtn = { ...sizeBtn, color: "#fff", background: "transparent", border: "1px solid #fff" };
  const goldBtn = { ...sizeBtn, color: "var(--text-inv)", background: "var(--gold)", border: "1px solid var(--gold)" };
  // hovers (background/shadow only — the scroll loop owns opacity/transform)
  const howEnter = (e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; };
  const howLeave = (e) => { e.currentTarget.style.background = "transparent"; };
  const buyEnter = (e) => {
    e.currentTarget.style.background = "var(--gold-bright)";
    e.currentTarget.style.boxShadow = "0 0 24px rgba(212,175,110,0.45)";
  };
  const buyLeave = (e) => {
    e.currentTarget.style.background = "var(--gold)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <section
      ref={sectionRef}
      aria-label="XN token hero"
      style={{
        position: "relative",
        height: "900vh", // formation (~first 2/3) + the CTA reveal phase (~last 1/3)
        background: "#0A0A0E",
        marginTop: "calc(-1 * (36px + 72px))", // full-bleed behind the fixed header
      }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />

        {/* Scroll-revealed CTAs (below the coin) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "13vh",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            padding: "0 var(--gut)",
            pointerEvents: "none",
          }}
        >
          <a
            ref={howRef}
            href="#how-to-buy"
            onClick={scrollToHowToBuy}
            style={{ ...whiteBtn }}
            onMouseEnter={howEnter}
            onMouseLeave={howLeave}
          >
            How to Buy
          </a>
          <Link
            ref={buyRef}
            href="/presale"
            data-cursor="cta"
            style={{ ...goldBtn }}
            onMouseEnter={buyEnter}
            onMouseLeave={buyLeave}
          >
            Buy XN
          </Link>
        </div>
      </div>
    </section>
  );
}
