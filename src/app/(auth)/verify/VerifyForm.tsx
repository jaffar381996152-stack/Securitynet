"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import AuthShell from "../components/AuthShell";
import { authFieldStyle } from "../components/authFieldStyle";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--c-danger)", marginTop: 6, paddingLeft: 4 }}>
      {message}
    </p>
  );
}

function PasswordToggle({ shown, onToggle }: { shown: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={shown ? "Hide password" : "Show password"}
      style={{
        position: "absolute",
        inset: "0 0 0 auto",
        display: "flex",
        alignItems: "center",
        paddingRight: 14,
        color: "var(--text-muted)",
        cursor: "pointer",
      }}
    >
      {shown ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.5 5.2A9.7 9.7 0 0112 5c5 0 9 4 10 7-.4 1.2-1.1 2.5-2.1 3.6M6.7 6.7C4.6 8 3 10 2 12c1 3 5 7 10 7 1.3 0 2.6-.3 3.7-.7"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      )}
    </button>
  );
}

export default function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get("key") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!key) {
    return (
      <AuthShell title="Invalid Reset Link">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 20, paddingTop: 8 }}>
          <p style={{ fontFamily: "var(--font-disp)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>
            This password reset link is missing its token. It may have been copied incorrectly —
            request a fresh link and try again.
          </p>
          <Link href="/forget" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--gold)" }}>
            REQUEST A NEW LINK →
          </Link>
        </div>
      </AuthShell>
    );
  }

  if (done) {
    return (
      <AuthShell title="Password Updated">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 20, paddingTop: 8 }}>
          {/* Success icon */}
          <div
            style={{
              width: 64,
              height: 64,
              border: "1px solid var(--c-success)",
              background: "rgba(74,140,111,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="var(--c-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ fontFamily: "var(--font-disp)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>
            Your password has been updated. You can now sign in with your new password.
          </p>
          <button
            onClick={() => router.push("/signin")}
            className="btn-primary"
            style={{ minWidth: 180, justifyContent: "center" }}
          >
            CONTINUE TO SIGN IN
          </button>
        </div>
      </AuthShell>
    );
  }

  const validate = () => {
    const next: Record<string, string> = {};
    if (!password) next.password = "Password is required";
    else if (password.length < 6) next.password = "Use at least 6 characters";
    if (!confirm) next.confirm = "Please confirm your password";
    else if (confirm !== password) next.confirm = "Passwords don't match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, password }),
      });
      const data = await res.json();
      if (data.status) {
        setDone(true);
      } else {
        toast.error(data.error || "This reset link is invalid or has expired");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Set New Password" subtitle="Choose a new password for your account">
      <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder="New password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((p) => ({ ...p, password: "" }));
              }}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              style={{ ...authFieldStyle(focused === "password", !!errors.password), paddingRight: "2.75rem" }}
            />
            <PasswordToggle shown={showPassword} onToggle={() => setShowPassword((v) => !v)} />
          </div>
          <FieldError message={errors.password} />
        </div>

        <div>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="confirm"
              autoComplete="new-password"
              placeholder="Confirm new password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                if (errors.confirm) setErrors((p) => ({ ...p, confirm: "" }));
              }}
              onFocus={() => setFocused("confirm")}
              onBlur={() => setFocused(null)}
              style={{ ...authFieldStyle(focused === "confirm", !!errors.confirm), paddingRight: "2.75rem" }}
            />
          </div>
          <FieldError message={errors.confirm} />
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
              UPDATING…
            </span>
          ) : "UPDATE PASSWORD"}
        </button>
      </form>
    </AuthShell>
  );
}
