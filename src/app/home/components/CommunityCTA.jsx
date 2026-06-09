import Link from "next/link";
import FadeUpSection from "./FadeUpSection";

export default function CommunityCTA() {
  return (
    <section
      className="section-py"
      style={{
        background: "var(--bg-secondary)",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--border-gold)",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,175,110,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeUpSection>
          <span className="eyebrow" style={{ marginBottom: 20 }}>COMMUNITY</span>

          <h2
            style={{
              fontFamily: "var(--font-disp)",
              fontWeight: 800,
              fontSize: "var(--xl-size)",
              textTransform: "uppercase",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
              marginBottom: 20,
            }}
          >
            JOIN THE
            <br />
            <span style={{ color: "var(--gold)" }}>COMMUNITY</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-ed)",
              fontStyle: "italic",
              fontSize: "var(--ed-size)",
              color: "var(--text-sec)",
              maxWidth: 560,
              margin: "0 auto 40px",
              lineHeight: 1.65,
            }}
          >
            Join thousands of early adopters shaping the future of intelligence-grade security.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            <Link
              href="https://t.me/securitynetai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              data-cursor="cta"
            >
              JOIN TELEGRAM →
            </Link>
            <Link
              href="https://x.com/securitynetAI"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              FOLLOW ON X
            </Link>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "clamp(20px,4vw,48px)",
              justifyContent: "center",
              flexWrap: "wrap",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            <span><span style={{ color: "var(--gold)" }}>47,000+</span> TELEGRAM MEMBERS</span>
            <span style={{ color: "var(--border-gold)" }}>·</span>
            <span><span style={{ color: "var(--gold)" }}>23,000+</span> X FOLLOWERS</span>
            <span style={{ color: "var(--border-gold)" }}>·</span>
            <span><span style={{ color: "var(--gold)" }}>6,200+</span> XN HOLDERS</span>
          </div>
        </FadeUpSection>
      </div>
    </section>
  );
}
