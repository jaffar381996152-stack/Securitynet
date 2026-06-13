"use client";

import Link from "next/link";
import { useState } from "react";

const CONTRACT = "0x917D93261B6b232F6b8b643d65b48928D1c85FFc";
const CONTRACT_SHORT = "0x917D…85FFc";

const NAVIGATE = [
  { label: "Home",       href: "/" },
  { label: "Tokenomics", href: "/tokenomics" },
  { label: "Services",   href: "/services" },
  { label: "About",      href: "/about" },
  { label: "News",       href: "/news" },
];

const RESOURCES = [
  { label: "Whitepaper",    href: "/whitepaper" },
  { label: "Blog",          href: "/blog" },
  { label: "How to Buy",    href: "/presale" },
  { label: "Terms of Use",  href: "/contact-us" },
  { label: "Privacy Policy",href: "/contact-us" },
];

const SOCIALS = [
  {
    label: "X",
    href: "https://x.com/Bullss_bears",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.857L2.25 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/securitynetai",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/securitynet-ai/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyContract = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      className="section-light"
      style={{
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

      {/* Main 4-column grid */}
      <div
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "clamp(48px,7vw,80px) var(--gut) 48px",
        }}
        className="footer-grid"
      >
        {/* Col 1 — Brand */}
        <div>
          <Link href="/" style={{ display: "block", marginBottom: 14, textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-disp)",
                fontWeight: 800,
                fontSize: 20,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-primary)",
                display: "block",
                lineHeight: 1.1,
              }}
            >
              SecurityNet
            </span>
          </Link>

          {/* "AI Eyes, Safe Skies." tagline — Cormorant italic */}
          <p
            style={{
              fontFamily: "var(--font-ed)",
              fontStyle: "italic",
              fontSize: 16,
              color: "var(--text-muted)",
              marginBottom: 24,
              lineHeight: 1.5,
            }}
          >
            AI Eyes, Safe Skies.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
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

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
            }}
          >
            © 2025 SecurityNet.ai. All rights reserved.
          </p>
        </div>

        {/* Col 2 — Navigate */}
        <div>
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
            NAVIGATE
          </h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {NAVIGATE.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    color: "var(--text-sec)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-sec)")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Resources */}
        <div>
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
            RESOURCES
          </h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {RESOURCES.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    color: "var(--text-sec)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-sec)")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Presale */}
        <div>
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
            PRESALE
          </h3>

          {/* Stage badge */}
          <div className="badge" style={{ marginBottom: 16, display: "inline-flex" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--c-success)", display: "inline-block", animation: "ubPulse 1.8s ease-in-out infinite" }} />
            Stage 3 Active
          </div>

          {/* Current price */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>
              Current Price
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--gold)", fontWeight: 500 }}>
              1 XN = $0.20 USDT
            </div>
          </div>

          {/* Listing price */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>
              Listing Price
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-sec)" }}>
              $0.80 USDT
            </div>
          </div>

          {/* Contract address */}
          <div style={{ marginBottom: 16, position: "relative" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>
              Contract
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-primary)", border: "1px solid var(--border-sub)", padding: "8px 10px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-sec)", letterSpacing: "0.04em", flex: 1 }}>
                {CONTRACT_SHORT}
              </span>
              <button
                onClick={copyContract}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 8,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: copied ? "var(--c-success)" : "var(--gold)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "color 0.2s",
                }}
              >
                {copied ? "✓ COPIED" : "COPY"}
              </button>
            </div>
          </div>

          {/* Network tags */}
          <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
            {["BEP-20", "ERC-20", "TRC-20"].map((n) => (
              <span
                key={n}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  border: "1px solid var(--border-sub)",
                  padding: "3px 8px",
                  color: "var(--text-muted)",
                }}
              >
                {n}
              </span>
            ))}
          </div>

          {/* BUY XN button — smaller */}
          <Link
            href="/presale"
            data-cursor="cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-disp)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              background: "var(--gold)",
              color: "var(--text-inv)",
              padding: "12px 24px",
              height: 44,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-bright)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}
          >
            BUY XN →
          </Link>
        </div>
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
          © 2025 SecurityNet.ai
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
          {["Terms", "Privacy Policy", "Disclaimer"].map((label) => (
            <Link
              key={label}
              href="/contact-us"
              style={{ transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
