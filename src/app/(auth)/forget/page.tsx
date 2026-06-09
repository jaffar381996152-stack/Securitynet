"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import AuthShell from "../components/AuthShell";
import { authFieldStyle } from "../components/authFieldStyle";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Forget() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) return setError("Email is required");
    if (!EMAIL_RE.test(email)) return setError("Enter a valid email address");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.status) {
        setSent(true);
      } else {
        toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthShell title="Check Your Email">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 20, paddingTop: 8 }}>
          {/* Email icon */}
          <div
            style={{
              width: 64,
              height: 64,
              border: "1px solid var(--border-gold)",
              background: "var(--gold-ghost)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="var(--gold)" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M22 6l-10 7L2 6" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ fontFamily: "var(--font-disp)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 300 }}>
            If an account exists for <strong style={{ color: "var(--text-primary)" }}>{email}</strong>,
            we&apos;ve sent a link to reset your password. It expires in 1 hour.
          </p>
          <Link href="/signin" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--gold)" }}>
            ← BACK TO SIGN IN
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Forgot Password?"
      subtitle="Enter your email and we'll send a reset link"
      footer={
        <Link href="/signin" style={{ color: "var(--gold)", fontWeight: 600 }}>
          ← Back to sign in
        </Link>
      }
    >
      <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={authFieldStyle(focused, !!error)}
          />
          {error && (
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--c-danger)", marginTop: 6, paddingLeft: 4 }}>
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg style={{ animation: "ringRotate 0.8s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(10,10,14,0.3)" strokeWidth="3" />
                <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              SENDING…
            </span>
          ) : "SEND RESET LINK"}
        </button>
      </form>
    </AuthShell>
  );
}
