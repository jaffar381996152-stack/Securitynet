"use client";
import DeclassifyText from "@/app/home/components/DeclassifyText";
import FadeUpSection from "@/app/home/components/FadeUpSection";

export default function AboutHero() {
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
        <span className="eyebrow">ABOUT</span>
        <h1 className="disp-title" style={{ fontSize: "clamp(44px,8.5vw,112px)", maxWidth: 860, marginBottom: 24 }}>
          <DeclassifyText text="THE TEAM BEHIND" delay={0.1} />
          <br />
          <DeclassifyText text="THE INTELLIGENCE." delay={0.3} style={{ color: "var(--gold)" }} />
        </h1>
        <FadeUpSection delay={0.5}>
          <p style={{ fontSize: 17, color: "var(--text-sec)", lineHeight: 1.75, maxWidth: 520 }}>
            A team of security engineers, AI researchers, and blockchain architects united by one mission — make decentralized systems the safest in the world.
          </p>
        </FadeUpSection>
      </div>
    </section>
  );
}
