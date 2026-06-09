"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { name: "HOME",        path: "/" },
  { name: "PRESALE",     path: "/presale" },
  { name: "TOKENOMICS",  path: "/tokenomics" },
  { name: "SERVICES",    path: "/services" },
  { name: "ABOUT",       path: "/about" },
  { name: "NEWS",        path: "/news" },
];

export default function Header() {
  const pathname    = usePathname();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-disp)",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "0.14em",
              color: "var(--gold)",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            SECURITYNET
            <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>.AI</span>
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

          {/* Right: CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link
              href="/presale"
              data-cursor="cta"
              className="hidden lg:inline-flex btn-primary"
              style={{ height: 40, padding: "0 24px", fontSize: 12 }}
            >
              BUY XN →
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              aria-expanded={open}
              style={{
                width: 40,
                height: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                background: "var(--gold-ghost)",
                border: "1px solid var(--border-gold)",
              }}
            >
              <span style={{ width: 18, height: 1, background: "var(--text-primary)", display: "block" }} />
              <span style={{ width: 12, height: 1, background: "var(--text-primary)", display: "block", alignSelf: "flex-start", marginLeft: 11 }} />
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
          alignItems: "center",
          justifyContent: "center",
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

        {/* Logo */}
        <div
          style={{
            fontFamily: "var(--font-disp)",
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: "0.2em",
            color: "var(--gold)",
            textTransform: "uppercase",
            marginBottom: 56,
          }}
        >
          SECURITYNET.AI
        </div>

        {/* Links */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            marginBottom: 48,
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
                  letterSpacing: "0.2em",
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

        <Link
          href="/presale"
          onClick={() => setOpen(false)}
          className="btn-primary"
          style={{ fontSize: 14, padding: "0 40px" }}
          data-cursor="cta"
        >
          BUY XN →
        </Link>
      </div>
    </>
  );
}
