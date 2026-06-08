"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import AuthShell from "../components/AuthShell";
import { authFieldStyle } from "../components/authFieldStyle";
import MagneticButton from "@/components/animations/MagneticButton";

const errorMotion = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.2 },
};

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p {...errorMotion} className="text-xs mt-1.5 px-1" style={{ color: "#EF4444" }}>
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function PasswordToggle({ shown, onToggle }: { shown: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={shown ? "Hide password" : "Show password"}
      className="absolute inset-y-0 right-0 flex items-center pr-3.5"
      style={{ color: "var(--text-muted)" }}
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
        <div className="flex flex-col items-center text-center gap-5 py-2">
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            This password reset link is missing its token. It may have been copied incorrectly —
            request a fresh link and try again.
          </p>
          <Link href="/forget" className="text-xs font-semibold no-underline" style={{ color: "var(--brand-mid)" }}>
            Request a new link →
          </Link>
        </div>
      </AuthShell>
    );
  }

  if (done) {
    return (
      <AuthShell title="Password Updated">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex flex-col items-center text-center gap-5 py-2"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(0,200,83,0.20) 0%, rgba(0,200,83,0.10) 100%)",
              border: "1px solid rgba(0,200,83,0.40)",
              boxShadow: "0 0 28px rgba(0,200,83,0.15)",
            }}
          >
            <motion.svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <motion.path
                d="M5 13l4 4L19 7"
                stroke="#00C853"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              />
            </motion.svg>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Your password has been updated. You can now sign in with your new password.
          </p>
          <MagneticButton variant="primary" size="md" onClick={() => router.push("/signin")}>
            Continue to sign in
          </MagneticButton>
        </motion.div>
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
    <AuthShell title="Set a New Password" subtitle="Choose a new password for your account">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <div>
          <div className="relative">
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
          <div className="relative">
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

        <MagneticButton type="submit" variant="primary" size="lg" disabled={loading} className="w-full justify-center">
          {loading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Updating…
            </>
          ) : (
            "Update Password"
          )}
        </MagneticButton>
      </form>
    </AuthShell>
  );
}
