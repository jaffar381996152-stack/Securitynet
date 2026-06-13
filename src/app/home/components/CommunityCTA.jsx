"use client";
import Link from "next/link";
import FadeUpSection from "./FadeUpSection";

const SOCIALS = [
  {
    label: "X",
    href: "https://x.com/Bullss_bears",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.857L2.25 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/securitynetai",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/securitynet-ai/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/securitynet.ai_000",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@securitynetai",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--bg-primary)" />
      </svg>
    ),
  },
];

export default function CommunityCTA() {
  return (
    <section
      className="section-py section-light"
      style={{
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
          <span className="eyebrow" style={{ marginBottom: 20 }}>JOIN THE OPERATION</span>

          <h2
            style={{
              fontFamily: "var(--font-disp)",
              fontWeight: 800,
              fontSize: "var(--xl-size)",
              textTransform: "uppercase",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              color: "#1C1C22",
              marginBottom: 20,
            }}
          >
            INTELLIGENCE GROWS WITH THE
            <br />
            <span style={{ color: "var(--gold)" }}>COMMUNITY.</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-ed)",
              fontStyle: "italic",
              fontSize: 22,
              color: "var(--text-sec)",
              maxWidth: 560,
              margin: "0 auto 40px",
              lineHeight: 1.55,
            }}
          >
            Join 12,000+ holders securing the future of AI-powered blockchain.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <Link href="https://t.me/securitynetai" target="_blank" rel="noopener noreferrer" className="btn-primary" data-cursor="cta">
              JOIN TELEGRAM →
            </Link>
            <Link href="https://x.com/Bullss_bears" target="_blank" rel="noopener noreferrer" className="btn-ghost">
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
              marginBottom: 40,
            }}
          >
            <span><span style={{ color: "var(--gold)" }}>12,000+</span> XN Holders</span>
            <span style={{ color: "var(--border-gold)" }}>·</span>
            <span><span style={{ color: "var(--gold)" }}>47</span> Countries</span>
            <span style={{ color: "var(--border-gold)" }}>·</span>
            <span><span style={{ color: "var(--gold)" }}>8,300+</span> Telegram Members</span>
          </div>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 20, justifyContent: "center", alignItems: "center" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  color: "var(--text-muted)",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </FadeUpSection>
      </div>
    </section>
  );
}
