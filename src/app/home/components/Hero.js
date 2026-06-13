"use client";
import Link from "next/link";
import DeclassifyText from "./DeclassifyText";
import FadeUpSection from "./FadeUpSection";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(32px,6vh,64px) var(--gut)",
        overflow: "hidden",
      }}
    >
      {/* Radial gold glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "70vw",
          maxWidth: 900,
          borderRadius: "50%",
          background: "radial-gradient(ellipse,rgba(212,175,110,0.06) 0%,transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "0 var(--gut)",
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Headline */}
        <h1
          className="hero-headline"
          style={{
            fontFamily: "var(--font-disp)",
            fontWeight: 900,
            textTransform: "uppercase",
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: 28,
            textAlign: "center",
          }}
        >
          <DeclassifyText text="AI THAT" delay={0.2} />
          <br className="mobile-br" />{" "}
          <DeclassifyText
            text="NEVER BLINKS."
            delay={0.2}
            style={{ color: "var(--gold)" }}
          />
        </h1>

        {/* Subheading */}
        <FadeUpSection delay={1.0}>
          <p
            style={{
              fontFamily: "var(--font-ed)",
              fontStyle: "italic",
              fontSize: "clamp(17px,2vw,22px)",
              fontWeight: 400,
              color: "var(--text-sec)",
              maxWidth: 520,
              lineHeight: 1.65,
              marginBottom: 44,
              textAlign: "center",
            }}
          >
            Fueled by blockchain. Powered by AI. Secured by design.
          </p>
        </FadeUpSection>

        {/* CTAs */}
        <FadeUpSection delay={1.1} style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "center", marginBottom: 36 }}>
          <a href="#how-to-buy" className="btn-primary hero-howtobuy-cta" data-cursor="cta">
            HOW TO BUY <span className="htb-arrow">↓</span>
          </a>
          <Link
            href="/whitepaper"
            style={{
              fontFamily: "var(--font-disp)",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-sec)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-sec)")}
          >
            Read Whitepaper
            <span style={{ color: "var(--gold)" }}>→</span>
          </Link>
        </FadeUpSection>

        {/* Scroll indicator */}
        <div
          className="hero-scroll-indicator"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: 1,
              height: 40,
              background: "linear-gradient(to bottom, var(--gold), transparent)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
