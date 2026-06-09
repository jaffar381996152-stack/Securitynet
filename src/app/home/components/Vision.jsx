import FadeUpSection from "./FadeUpSection";

export default function Vision() {
  return (
    <section className="section-py" style={{ background: "var(--bg-primary)" }}>
      <div style={{ maxWidth: "var(--max-narrow)", margin: "0 auto", padding: "0 var(--gut)" }}>
        <FadeUpSection>
          <span className="eyebrow" style={{ marginBottom: 24 }}>THE MISSION</span>

          <h2
            style={{
              fontFamily: "var(--font-disp)",
              fontWeight: 800,
              fontSize: "var(--xl-size)",
              textTransform: "uppercase",
              lineHeight: 1,
              color: "var(--text-primary)",
              marginBottom: 24,
              letterSpacing: "-0.01em",
            }}
          >
            XN IS A GROUNDBREAKING UTILITY TOKEN FUELING AN{" "}
            <span style={{ color: "var(--gold)" }}>ADVANCED AI</span>{" "}
            ECOSYSTEM.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-disp)",
              fontSize: 17,
              fontWeight: 400,
              color: "var(--text-sec)",
              lineHeight: 1.75,
              marginBottom: 32,
              maxWidth: 660,
            }}
          >
            Designed to enhance AI-driven security, automation, and real-time intelligence, XN seamlessly integrates with decentralized networks — enabling secure, transparent, AI-powered operations at scale.
          </p>

          {/* Gold rule */}
          <div style={{ width: 80, height: 1, background: "var(--gold-dim)", marginBottom: 32 }} />

          {/* Sub-grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(20px,3vw,40px)" }}>
            {[
              {
                title: "AI-Driven Security",
                body: "On-chain AI that monitors, flags, and responds to threats across the network in real time, without a centralized authority.",
              },
              {
                title: "Real-Time Intelligence",
                body: "Live data feeds, instant settlements, and AI-powered analytics that give XN holders a decisive edge in the decentralized economy.",
              },
            ].map((item) => (
              <div key={item.title}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--gold)",
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontSize: 14,
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </FadeUpSection>
      </div>
    </section>
  );
}
