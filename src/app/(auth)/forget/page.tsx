"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import AuthShell from "../components/AuthShell";
import { authFieldStyle } from "../components/authFieldStyle";
import MagneticButton from "@/components/animations/MagneticButton";

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
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex flex-col items-center text-center gap-5 py-2"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.20) 0%, rgba(108,92,231,0.10) 100%)",
              border: "1px solid rgba(0,212,255,0.35)",
              boxShadow: "var(--glow-sm)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="var(--accent-cyan)" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M22 6l-10 7L2 6" stroke="var(--accent-cyan)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            If an account exists for <strong style={{ color: "var(--text-primary)" }}>{email}</strong>,
            we&apos;ve sent a link to reset your password. It expires in 1 hour.
          </p>
          <Link href="/signin" className="text-xs font-semibold no-underline" style={{ color: "var(--brand-mid)" }}>
            ← Back to sign in
          </Link>
        </motion.div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Forgot Password?"
      subtitle="Enter your email and we'll send you a link to reset it"
      footer={
        <Link href="/signin" className="font-semibold no-underline" style={{ color: "var(--brand-mid)" }}>
          ← Back to sign in
        </Link>
      }
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
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
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-xs mt-1.5 px-1"
                style={{ color: "#EF4444" }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <MagneticButton type="submit" variant="primary" size="lg" disabled={loading} className="w-full justify-center">
          {loading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Sending…
            </>
          ) : (
            "Send Reset Link"
          )}
        </MagneticButton>
      </form>
    </AuthShell>
  );
}
