"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import DeclassifyText from "./DeclassifyText";
import FadeUpSection from "./FadeUpSection";

const TopographicCanvas = dynamic(() => import("./TopographicCanvas"), { ssr: false });

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        background: "var(--bg-primary)",
        overflow: "hidden",
      }}
    >
      <TopographicCanvas />

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
        }}
      >
        {/* Classification badge */}
        <FadeUpSection>
          <div className="badge" style={{ marginBottom: 28 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--c-success)", display: "inline-block", animation: "ubPulse 1.8s ease-in-out infinite" }} />
            CLASSIFIED · STAGE 01 ACTIVE
          </div>
        </FadeUpSection>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-disp)",
            fontWeight: 800,
            textTransform: "uppercase",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            fontSize: "var(--hero-size)",
            color: "var(--text-primary)",
            maxWidth: 960,
            marginBottom: 28,
          }}
        >
          <DeclassifyText text="INTELLIGENCE‑GRADE" delay={0.2} />
          <br />
          <DeclassifyText
            text="SECURITY,"
            delay={0.5}
            style={{ color: "var(--text-primary)" }}
          />
          {" "}
          <DeclassifyText
            text="TOKENIZED."
            delay={0.8}
            style={{ color: "var(--gold)" }}
          />
        </h1>

        {/* Subheading */}
        <FadeUpSection delay={1.0}>
          <p
            style={{
              fontFamily: "var(--font-ed)",
              fontStyle: "italic",
              fontSize: "var(--ed-size)",
              color: "var(--text-sec)",
              maxWidth: 560,
              lineHeight: 1.65,
              marginBottom: 44,
            }}
          >
            AI-powered surveillance infrastructure meets decentralized finance — own a stake in the future of security intelligence through the XN token.
          </p>
        </FadeUpSection>

        {/* CTAs */}
        <FadeUpSection delay={1.1} style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 60 }}>
          <Link href="/presale" className="btn-primary" data-cursor="cta">
            JOIN THE PRESALE →
          </Link>
          <Link href="/whitepaper" className="btn-ghost">
            VIEW WHITEPAPER
          </Link>
        </FadeUpSection>

        {/* Trust row */}
        <FadeUpSection delay={1.25}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(16px,3vw,32px)",
              flexWrap: "wrap",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            {[
              { label: "AUDITED", dot: "var(--c-success)" },
              { label: "KYC VERIFIED", dot: "var(--gold)" },
              { label: "MULTISIG SECURED", dot: "var(--gold)" },
              { label: "LICENSED ENTITY", dot: "var(--gold)" },
            ].map((item, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: item.dot }} />
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
        <div
          style={{
            width: 1,
            height: 56,
            background: "linear-gradient(to bottom, var(--gold), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
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
      </div>
    </section>
  );
}
