"use client";
import Link from "next/link";

export default function AuthShell({ title, subtitle = null, children = null, footer = null }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(48px,8vw,96px) var(--gut)",
        background: "var(--bg-primary)",
        position: "relative",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "60vw",
          height: "60vw",
          maxWidth: 700,
          borderRadius: "50%",
          background: "radial-gradient(ellipse,rgba(212,175,110,0.05) 0%,transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: 460, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-disp)",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "0.14em",
              color: "var(--gold)",
              textTransform: "uppercase",
            }}
          >
            SECURITYNET.AI
          </Link>
        </div>

        {/* Card */}
        <div
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-gold)",
            padding: "clamp(28px,5vw,48px)",
          }}
        >
          {/* Card header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: 12,
              }}
            >
              SECURE ACCESS · AUTHENTICATION REQUIRED
            </div>

            <h1
              style={{
                fontFamily: "var(--font-disp)",
                fontWeight: 700,
                fontSize: "clamp(22px,3vw,30px)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "var(--text-primary)",
                marginBottom: subtitle ? 10 : 0,
              }}
            >
              {title}
            </h1>

            {subtitle && (
              <p
                style={{
                  fontFamily: "var(--font-disp)",
                  fontSize: 14,
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {children}
        </div>

        {footer && (
          <p
            style={{
              fontFamily: "var(--font-disp)",
              fontSize: 13,
              textAlign: "center",
              marginTop: 20,
              color: "var(--text-muted)",
            }}
          >
            {footer}
          </p>
        )}
      </div>
    </div>
  );
}
