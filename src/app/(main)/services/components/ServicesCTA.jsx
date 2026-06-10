"use client";
import Link from "next/link";
import FadeUpSection from "@/app/home/components/FadeUpSection";

export default function ServicesCTA() {
  return (
    <section
      id="cta-section"
      className="section-py"
      style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-gold)", borderBottom: "1px solid var(--border-gold)" }}
    >
      <div className="container" style={{ maxWidth: 780, textAlign: "center" }}>
        <FadeUpSection>
          <span className="eyebrow" style={{ marginBottom: 14 }}>GET INVOLVED</span>

          <h2 className="disp-title" style={{ fontSize: "clamp(40px,7vw,88px)", marginBottom: 18 }}>
            INVEST IN THE
            <br />
            <span className="gold-word">INFRASTRUCTURE.</span>
          </h2>

          <p style={{ fontFamily: "var(--font-ed)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(18px,2vw,26px)", color: "var(--text-sec)", lineHeight: 1.5, marginBottom: 44 }}>
            Secure the future of decentralized AI security. Buy XN in Stage 3 at $0.20 USDT before the price rises.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link href="/presale" className="btn-primary">
              AUTHORIZE PURCHASE — BUY XN
            </Link>
            <Link href="/tokenomics" className="btn-ghost">
              VIEW TOKENOMICS →
            </Link>
          </div>
        </FadeUpSection>
      </div>
    </section>
  );
}
