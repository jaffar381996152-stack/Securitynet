"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const NAV_LINKS = [
  { name: "HOME",       path: "/" },
  { name: "TOKENOMICS", path: "/tokenomics" },
  { name: "SERVICES",   path: "/services" },
  { name: "ABOUT",      path: "/about" },
  { name: "NEWS",       path: "/news" },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const accountName = session?.user?.name?.split(" ")[0] || session?.user?.email?.split("@")[0];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", open);
    return () => document.body.classList.remove("mobile-nav-open");
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Fixed nav bar ─────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 36,
          left: 0,
          right: 0,
          height: 72,
          zIndex: 8000,
          display: "flex",
          alignItems: "center",
          background: scrolled ? "rgba(10,10,14,0.92)" : "rgba(10,10,14,0)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(212,175,110,0.12)"
            : "1px solid transparent",
          transition: "background 0.35s ease, border-color 0.35s ease",
        }}
      >
        <div
          style={{
            maxWidth: "var(--max-w)",
            margin: "0 auto",
            padding: "0 var(--gut)",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo — two-line */}
          <Link href="/" style={{ display: "flex", flexDirection: "column", textDecoration: "none", flexShrink: 0 }}>
            <span
              style={{
                fontFamily: "var(--font-disp)",
                fontWeight: 800,
                fontSize: 20,
                letterSpacing: "0.08em",
                color: "var(--text-primary)",
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              SecurityNet
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.22em",
                color: "var(--gold)",
                textTransform: "lowercase",
                lineHeight: 1.4,
              }}
            >
              securitynet.ai
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex"
            style={{ alignItems: "center", gap: 36 }}
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((item) => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: active ? "var(--gold)" : "var(--text-sec)",
                    position: "relative",
                    transition: "color 0.2s",
                    paddingBottom: 2,
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = "var(--text-sec)";
                  }}
                >
                  {item.name}
                  {active && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: -2,
                        left: 0,
                        right: 0,
                        height: 1,
                        background: "var(--gold)",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: account + CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {status === "authenticated" ? (
              <div className="hidden lg:flex" style={{ alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-sec)",
                  }}
                >
                  {accountName}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  SIGN OUT
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="hidden lg:flex"
                style={{
                  alignItems: "center",
                  fontFamily: "var(--font-disp)",
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--text-sec)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-sec)")}
              >
                SIGN IN
              </Link>
            )}

            <Link
              href="/presale"
              data-cursor="cta"
              className="hidden lg:inline-flex nav-cta"
              style={{ border: "1px solid var(--gold)" }}
            >
              BUY XN
            </Link>

            {/* Hamburger */}
            <button
              className="hamburger-btn lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              aria-expanded={open}
              style={{
                width: 40,
                height: 40,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, height: "100%" }}>
                <span style={{ width: 22, height: 1.5, background: "var(--text-primary)", display: "block" }} />
                <span style={{ width: 16, height: 1.5, background: "var(--text-primary)", display: "block", alignSelf: "flex-start", marginLeft: 3 }} />
                <span style={{ width: 22, height: 1.5, background: "var(--text-primary)", display: "block" }} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9500,
          background: "#0A0A0E",
          display: "flex",
          flexDirection: "column",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.3s ease",
        }}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
        aria-hidden={!open}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--border-gold)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-disp)",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          ×
        </button>

        {/* Content area — full height, flex column with padding */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "80px var(--gut) 32px",
          }}
        >
          {/* Classification eyebrow */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: 12,
            }}
          >
            CLASSIFIED NAVIGATION
          </div>
          <div style={{ width: 40, height: 1, background: "var(--gold-dim)", marginBottom: 40 }} />

          {/* Links */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 28,
              flex: 1,
            }}
          >
            {NAV_LINKS.map((item, i) => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontWeight: 700,
                    fontSize: 28,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: active ? "var(--gold)" : "var(--text-sec)",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.35s ease ${i * 0.06}s, transform 0.35s ease ${i * 0.06}s`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--gold-dim)",
                      letterSpacing: "0.1em",
                      minWidth: 24,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Account */}
          <div style={{ paddingTop: 32, borderTop: "1px solid var(--border-sub)", marginTop: 32 }}>
            {status === "authenticated" ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--text-sec)",
                  }}
                >
                  SIGNED IN AS <span style={{ color: "var(--gold)" }}>{accountName}</span>
                </span>
                <button
                  onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  SIGN OUT
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                SIGN IN / REGISTER →
              </Link>
            )}
          </div>

          {/* CTA */}
          <div style={{ paddingTop: 24, marginTop: 24 }}>
            <Link
              href="/presale"
              onClick={() => setOpen(false)}
              className="btn-primary"
              style={{ fontSize: 13, padding: "0 40px", width: "100%", justifyContent: "center" }}
              data-cursor="cta"
            >
              AUTHORIZE PURCHASE — BUY XN
            </Link>
          </div>

          {/* Bottom info bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 24,
              marginTop: 20,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.16em",
              color: "var(--text-muted)",
            }}
          >
            <span>
              1 XN = <span style={{ color: "var(--gold)" }}>$0.20 USDT</span> · STAGE 3
            </span>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 16 }}>
              {/* X icon */}
              <a href="https://x.com/securitynetAI" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
                style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.857L2.25 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Telegram icon */}
              <a href="https://t.me/securitynetai" target="_blank" rel="noopener noreferrer" aria-label="Telegram"
                style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
