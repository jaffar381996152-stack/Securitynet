"use client";
import Link from "next/link";
import FadeUpSection from "@/app/home/components/FadeUpSection";

const SOCIALS = [
  {
    label: "X",
    href: "https://x.com/securitynetAI",
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
];

export default function AboutCTA() {
  return (
    <section
      id="about-cta"
      className="section-py"
      style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border-gold)", borderBottom: "1px solid var(--border-gold)" }}
    >
      <div className="container" style={{ maxWidth: 700, textAlign: "center" }}>
        <FadeUpSection>
          <span className="eyebrow" style={{ marginBottom: 14 }}>JOIN THE OPERATION</span>

          <h2 className="disp-title" style={{ fontSize: "clamp(40px,7vw,88px)", marginBottom: 18 }}>
            INTELLIGENCE GROWS WITH THE <span className="gold-word">COMMUNITY.</span>
          </h2>

          <p style={{ fontFamily: "var(--font-ed)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(18px,2vw,26px)", color: "var(--text-sec)", lineHeight: 1.5, marginBottom: 44 }}>
            Join 12,000+ holders securing the future of AI-powered blockchain.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link href="https://t.me/securitynetai" target="_blank" rel="noopener noreferrer" className="btn-primary">
              JOIN TELEGRAM
            </Link>
            <Link href="/presale" className="btn-ghost">
              BUY XN →
            </Link>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 40 }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{ color: "var(--text-muted)", transition: "color 0.2s, transform 0.2s", display: "flex", alignItems: "center" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--gold)";
                  e.currentTarget.style.transform = "scale(1.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
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
