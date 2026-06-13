"use client";
import FadeUpSection from "@/app/home/components/FadeUpSection";

const VALUES = [
  {
    num: "01",
    title: "Trustless by Design",
    body: "Every claim we make is verifiable on-chain. No black boxes, no proprietary algorithms you have to take our word for.",
  },
  {
    num: "02",
    title: "AI Without Compromise",
    body: "Our models are trained on the most comprehensive blockchain security dataset ever assembled. We ship accuracy, not demos.",
  },
  {
    num: "03",
    title: "Community First",
    body: "XN token holders govern this protocol. The roadmap is a proposal, not a decree — the community votes on what gets built next.",
  },
];

export default function OurMission() {
  return (
    <section id="mission" className="section-py section-light" style={{ borderTop: "1px solid var(--border-gold)", borderBottom: "1px solid var(--border-sub)" }}>
      <div className="container-narrow">
        <span className="eyebrow">OUR MISSION</span>

        <FadeUpSection delay={0.08}>
          <blockquote
            style={{
              fontFamily: "var(--font-ed)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(20px,2.5vw,30px)",
              color: "var(--text-primary)",
              lineHeight: 1.6,
              marginBottom: 36,
              borderLeft: "3px solid var(--gold)",
              paddingLeft: 28,
            }}
          >
            "The convergence of AI and blockchain creates the most powerful security infrastructure ever built — but only if the people building it refuse to cut corners. We don't cut corners."
          </blockquote>
        </FadeUpSection>

        <FadeUpSection delay={0.16}>
          <p style={{ fontSize: 16, color: "var(--text-sec)", lineHeight: 1.8, maxWidth: 680 }}>
            SecurityNet.ai was founded on the belief that centralized security is an oxymoron. Every firewall has an owner, every database has an admin, and every admin is a target. We are building the alternative — a security layer that is owned by no one and protected by everyone, fueled by AI that never sleeps and a token economy that aligns incentives across the entire network.
          </p>
        </FadeUpSection>

        <FadeUpSection delay={0.24}>
          <div style={{ width: 80, height: 1, background: "var(--gold-dim)", margin: "32px 0" }} />
          <div className="values-grid">
            {VALUES.map((v) => (
              <div key={v.num} className="value-cell card-dark">
                <div className="value-num">{v.num}</div>
                <div className="value-title">{v.title}</div>
                <p className="value-body">{v.body}</p>
              </div>
            ))}
          </div>
        </FadeUpSection>
      </div>
    </section>
  );
}
