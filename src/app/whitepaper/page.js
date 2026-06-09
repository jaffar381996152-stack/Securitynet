import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import { pageMetadata } from "@/app/libs/seo";

const PDF_URL = "https://securitynets.s3.amazonaws.com/securitynetai.pdf";

export const metadata = pageMetadata({
  title: "Whitepaper — SecurityNet AI",
  description:
    "Read the official SecurityNet whitepaper — the technical specification and vision for the XN token, AI surveillance infrastructure, and blockchain security ecosystem.",
  path: "/whitepaper",
});

const HIGHLIGHTS = [
  { num: "01", title: "Executive Summary",    desc: "Overview of the SecurityNet vision, mission, and the role of the XN token in the ecosystem." },
  { num: "02", title: "Technology Stack",     desc: "Deep dive into AI surveillance architecture, edge computing, and blockchain integration layers." },
  { num: "03", title: "Token Economics",      desc: "XN tokenomics, vesting schedules, utility design, and governance framework." },
  { num: "04", title: "Roadmap & Milestones", desc: "Phased development timeline from presale through mainnet launch and global expansion." },
  { num: "05", title: "Security & Audits",    desc: "Smart contract audit results, KYC process, and ongoing security protocols." },
  { num: "06", title: "Legal Framework",      desc: "Regulatory compliance, jurisdictional considerations, and investor protections." },
];

export default function WhitepaperPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          style={{
            background: "var(--bg-primary)",
            padding: "clamp(60px,9vw,120px) 0 clamp(48px,7vw,80px)",
            borderBottom: "1px solid var(--border-sub)",
          }}
        >
          <div className="container">
            <div style={{ maxWidth: 760 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: 16,
                  lineHeight: 2,
                }}
              >
                <div>DOC CLASS: PUBLIC · REF: SNT-WP-2025</div>
                <div>CLEARANCE: OPEN ACCESS</div>
              </div>

              <span className="eyebrow" style={{ marginBottom: 16 }}>TECHNICAL DOCUMENTATION</span>

              <h1
                className="disp-title"
                style={{ fontSize: "var(--xl-size)", marginBottom: 24 }}
              >
                SECURITYNET
                <br />
                <span style={{ color: "var(--gold)" }}>WHITEPAPER</span>
              </h1>

              <p
                style={{
                  fontFamily: "var(--font-ed)",
                  fontStyle: "italic",
                  fontSize: "var(--ed-size)",
                  color: "var(--text-sec)",
                  lineHeight: 1.65,
                  maxWidth: 600,
                  marginBottom: 40,
                }}
              >
                The complete technical specification for SecurityNet's AI-powered surveillance infrastructure and the XN token economy.
              </p>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  data-cursor="cta"
                >
                  DOWNLOAD PDF →
                </a>
                <Link href="/presale" className="btn-ghost">
                  BUY XN TOKENS
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PDF embed (desktop) */}
        <section style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-sub)" }}>
          <div className="container" style={{ padding: "0 var(--gut)" }}>
            <div
              className="hidden lg:block"
              style={{ height: "80vh", borderLeft: "1px solid var(--border-gold)", borderRight: "1px solid var(--border-gold)" }}
            >
              <iframe
                src={`${PDF_URL}#view=FitH`}
                style={{ width: "100%", height: "100%", border: "none" }}
                title="SecurityNet Whitepaper PDF"
              />
            </div>

            {/* Mobile: download prompt */}
            <div
              className="lg:hidden"
              style={{ padding: "clamp(40px,6vw,64px) 0", textAlign: "center" }}
            >
              <p style={{ fontFamily: "var(--font-disp)", fontSize: 18, color: "var(--text-muted)", marginBottom: 24 }}>
                Open the full PDF whitepaper to read the complete technical specification.
              </p>
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                OPEN WHITEPAPER →
              </a>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="section-py" style={{ background: "var(--bg-primary)" }}>
          <div className="container">
            <span className="eyebrow" style={{ marginBottom: 16 }}>CONTENTS OVERVIEW</span>
            <h2 className="disp-title" style={{ fontSize: "var(--lg-size)", marginBottom: 48 }}>
              KEY SECTIONS
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 2,
              }}
            >
              {HIGHLIGHTS.map((h) => (
                <div
                  key={h.num}
                  className="card-surface card-hover"
                  style={{ padding: "28px 32px" }}
                >
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--gold)", marginBottom: 14 }}>
                    {h.num}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 18, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-primary)", marginBottom: 10 }}>
                    {h.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-disp)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 48, textAlign: "center" }}>
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                DOWNLOAD FULL WHITEPAPER →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
