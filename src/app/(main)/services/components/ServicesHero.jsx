"use client";
import DeclassifyText from "@/app/home/components/DeclassifyText";
import FadeUpSection from "@/app/home/components/FadeUpSection";

export default function ServicesHero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: "clamp(48px,7vw,96px)",
        position: "relative",
      }}
    >
      <div className="container">
        <span className="eyebrow">SERVICES</span>
        <h1 className="disp-title" style={{ fontSize: "clamp(48px,9vw,116px)", maxWidth: 900, marginBottom: 24 }}>
          <DeclassifyText text="AI-POWERED " delay={0.1} />
          <DeclassifyText text="SECURITY." delay={0.48} style={{ color: "var(--gold)" }} />
          <br />
          <DeclassifyText text="DEPLOYED ON-CHAIN." delay={0.6} />
        </h1>
        <FadeUpSection delay={0.8}>
          <p style={{ fontSize: 17, color: "var(--text-sec)", lineHeight: 1.75, maxWidth: 560 }}>
            Six AI-powered security layers built for the decentralized era. Each service runs on-chain, powered by the XN token, with zero reliance on centralized infrastructure.
          </p>
        </FadeUpSection>
      </div>
    </section>
  );
}
