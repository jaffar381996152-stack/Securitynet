"use client";

// This replaces the ENTIRE root layout (including <html>/<body>) when an
// error escapes it, so it must stand completely on its own — no component
// imports, no CSS custom properties, just inline styles using the same
// brand hex values as globals.css. Keep this file boring and bulletproof.
export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05060C",
          color: "#F2F5FF",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: 24,
          textAlign: "center",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#00D4FF",
              marginBottom: 16,
            }}
          >
            Critical System Alert
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 16px" }}>
            Securitynet hit a snag
          </h1>
          <p
            style={{
              color: "#8892A4",
              maxWidth: 420,
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            Something went wrong loading the application. Please try reloading
            the page.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "linear-gradient(135deg, #483AA0, #6C5CE7)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "12px 28px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
