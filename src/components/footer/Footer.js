"use client";

import Link from "next/link";

const SOCIALS = [
  { label: "YouTube",    href: "https://www.youtube.com/@securitynetai",            sym: "▶" },
  { label: "X",          href: "https://x.com/securitynetAI",                       sym: "𝕏" },
  { label: "LinkedIn",   href: "https://www.linkedin.com/company/securitynet-ai/",  sym: "in" },
  { label: "Instagram",  href: "https://www.instagram.com/securitynetai",           sym: "◎" },
];

const NAV_GROUPS = [
  {
    title: "COMPANY",
    links: [
      { label: "Home",        href: "/" },
      { label: "About",       href: "/about" },
      { label: "Services",    href: "/services" },
      { label: "Tokenomics",  href: "/tokenomics" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Whitepaper",  href: "/whitepaper" },
      { label: "Blog",        href: "/blog" },
      { label: "News",        href: "/news" },
      { label: "Presale",     href: "/presale" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Contact Us",  href: "/contact-us" },
      { label: "info@securitynet.ai", href: "mailto:info@securitynet.ai", external: true },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-gold)",
        position: "relative",
      }}
    >
      {/* Top gradient rule */}
      <div
        style={{
          position: "absolute",
          top: -1,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg,transparent 0%,var(--gold-dim) 25%,var(--gold-bright) 65%,transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Main grid */}
      <div
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "clamp(48px,7vw,80px) var(--gut) 48px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
          gap: "clamp(32px,4vw,48px)",
        }}
      >
        {/* Brand column */}
        <div>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-disp)",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "0.14em",
              color: "var(--gold)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 16,
            }}
          >
            SECURITYNET.AI
          </Link>

          <p
            style={{
              fontFamily: "var(--font-disp)",
              fontSize: 13,
              color: "var(--text-muted)",
              lineHeight: 1.7,
              maxWidth: 220,
              marginBottom: 24,
            }}
          >
            Intelligence-grade security, tokenized. Powered by AI and anchored on blockchain.
          </p>

          {/* Classification tag */}
          <div className="badge" style={{ marginBottom: 24 }}>
            XN TOKEN · BSC NETWORK
          </div>

          {/* Socials */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {SOCIALS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: 32,
                  height: 32,
                  border: "1px solid var(--border-sub)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-disp)",
                  fontWeight: 700,
                  fontSize: 11,
                  color: "var(--text-muted)",
                  transition: "border-color 0.2s, color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.color = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-sub)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                {s.sym}
              </Link>
            ))}
          </div>
        </div>

        {/* Nav groups */}
        {NAV_GROUPS.map(({ title, links }) => (
          <div key={title}>
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 20,
              }}
            >
              {title}
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    style={{
                      fontFamily: "var(--font-disp)",
                      fontSize: 14,
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      color: "var(--text-muted)",
                      transition: "color 0.2s",
                      wordBreak: "break-all",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid var(--border-sub)",
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "18px var(--gut)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "var(--text-muted)",
          }}
        >
          © {year} SECURITYNET.AI — ALL RIGHTS RESERVED
        </p>
        <div
          style={{
            display: "flex",
            gap: 20,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "var(--text-muted)",
          }}
        >
          <Link href="/contact-us" style={{ transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            TERMS
          </Link>
          <Link href="/contact-us" style={{ transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            PRIVACY
          </Link>
          <Link href="/contact-us" style={{ transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            DISCLAIMER
          </Link>
        </div>
      </div>
    </footer>
  );
}
