"use client";
import DeclassifyText from "@/app/home/components/DeclassifyText";
import FadeUpSection from "@/app/home/components/FadeUpSection";

export default function TokenomicsHero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "56vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: "clamp(48px,7vw,96px)",
        position: "relative",
      }}
    >
      <div className="container">
        <span className="eyebrow">TOKENOMICS</span>
        <h1 className="disp-title" style={{ fontSize: "clamp(56px,10vw,128px)", marginBottom: 24 }}>
          <DeclassifyText text="THE ALLOCATION" delay={0.1} />
          <br />
          <DeclassifyText text="BLUEPRINT." delay={0.3} style={{ color: "var(--gold)" }} />
        </h1>
        <FadeUpSection delay={0.5}>
          <p style={{ fontSize: 17, color: "var(--text-sec)", lineHeight: 1.75, maxWidth: 580 }}>
            A transparent, tamper-proof token economy designed to reward early believers and sustain long-term ecosystem growth. Every allocation is locked, vested, and publicly verifiable on-chain.
          </p>
        </FadeUpSection>
      </div>
    </section>
  );
}
