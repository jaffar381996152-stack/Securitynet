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
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
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
          padding: "clamp(60px,10vw,120px) var(--gut)",
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Classification badge */}
        <FadeUpSection>
          <div className="badge" style={{ marginBottom: 28 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--c-success)", display: "inline-block", animation: "ubPulse 1.8s ease-in-out infinite" }} />
            XN TOKEN PRESALE · STAGE 3 ACTIVE
          </div>
        </FadeUpSection>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-disp)",
            fontWeight: 900,
            textTransform: "uppercase",
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
            fontSize: "var(--hero-size)",
            color: "var(--text-primary)",
            maxWidth: 1100,
            marginBottom: 28,
            textAlign: "center",
          }}
        >
          <DeclassifyText text="AI EYES," delay={0.2} />{" "}
          <DeclassifyText
            text="SAFE SKIES."
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
        <FadeUpSection delay={1.1} style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "center", marginBottom: 60 }}>
          <Link href="/presale" className="btn-primary" data-cursor="cta">
            AUTHORIZE PURCHASE — BUY XN
          </Link>
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

        {/* Trust row */}
        <FadeUpSection delay={1.25}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "Smart Contract Audited",
                svg: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                ),
              },
              {
                label: "Non-Custodial Wallet",
                svg: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
              },
              {
                label: "BEP-20 · ERC-20 · TRC-20",
                svg: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <span
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0 24px",
                  borderRight: i < 2 ? "1px solid var(--border-sub)" : "none",
                  paddingLeft: i === 0 ? 0 : 24,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                <span style={{ color: "var(--gold)", flexShrink: 0 }}>{item.svg}</span>
                {item.label}
              </span>
            ))}
          </div>
        </FadeUpSection>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 1,
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
            height: 56,
            background: "linear-gradient(to bottom, var(--gold), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
