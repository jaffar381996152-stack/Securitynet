import FadeUpSection from "./FadeUpSection";

export default function Vision() {
  return (
    <section className="section-py" style={{ background: "var(--bg-primary)" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px,6vw,96px)",
            alignItems: "start",
          }}
        >
          {/* Left: classification metadata */}
          <FadeUpSection>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                lineHeight: 2.2,
                paddingTop: 8,
              }}
            >
              <div>DOC CLASS: RESTRICTED</div>
              <div>DEPT: MISSION INTELLIGENCE</div>
              <div>REF: SNT-VISION-2025-A</div>
              <div>CLEARANCE: LEVEL II</div>
              <div style={{ marginTop: 24, borderTop: "1px solid var(--border-sub)", paddingTop: 24 }}>
                {["AI SURVEILLANCE", "BLOCKCHAIN AUTH", "REAL-TIME ALERTS", "SMART CONTRACTS"].map((tag) => (
                  <div key={tag} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ width: 1, height: 10, background: "var(--gold-dim)" }} />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </FadeUpSection>

          {/* Right: mission copy */}
          <FadeUpSection delay={0.12}>
            <span className="eyebrow" style={{ marginBottom: 24 }}>OUR MISSION</span>

            <h2
              style={{
                fontFamily: "var(--font-disp)",
                fontWeight: 800,
                fontSize: "var(--xl-size)",
                textTransform: "uppercase",
                lineHeight: 1,
                color: "var(--text-primary)",
                marginBottom: 28,
                letterSpacing: "-0.01em",
              }}
            >
              SECURING THE
              <br />
              WORLD WITH
              <br />
              <span style={{ color: "var(--gold)" }}>INTELLIGENCE.</span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-ed)",
                fontStyle: "italic",
                fontSize: "var(--ed-size)",
                color: "var(--text-sec)",
                lineHeight: 1.75,
                marginBottom: 32,
                borderLeft: "2px solid var(--gold-dim)",
                paddingLeft: 20,
              }}
            >
              Securitynet is building a decentralized security intelligence network — where AI-powered surveillance meets blockchain transparency, enabling communities and enterprises to protect what matters most.
            </p>

            <p
              style={{
                fontFamily: "var(--font-disp)",
                fontSize: 16,
                fontWeight: 400,
                color: "var(--text-muted)",
                lineHeight: 1.7,
              }}
            >
              The XN token powers the entire ecosystem — from accessing premium AI features to governance voting, reward distribution, and cross-border data sharing in a privacy-preserving, audit-trail protocol.
            </p>
          </FadeUpSection>
        </div>
      </div>
    </section>
  );
}
