"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import AuthShell from "../components/AuthShell";
import { authFieldStyle } from "../components/authFieldStyle";
import GoogleSignInButton from "../components/GoogleSignInButton";
import OrDivider from "../components/OrDivider";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { email: "", password: "" };

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--c-danger)", marginTop: 6, paddingLeft: 4 }}>
      {message}
    </p>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [user, setUser] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!user.email) next.email = "Email is required";
    else if (!EMAIL_RE.test(user.email)) next.email = "Enter a valid email address";
    if (!user.password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Welcome back!");
        const params = new URLSearchParams(window.location.search);
        const callbackUrl = params.get("callbackUrl") || "/";
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Sign in to continue to SecurityNet.ai"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            onClick={(e) => {
              const params = new URLSearchParams(window.location.search);
              const cb = params.get("callbackUrl");
              if (cb) {
                e.preventDefault();
                router.push(`/register?callbackUrl=${encodeURIComponent(cb)}`);
              }
            }}
            style={{ color: "var(--gold)", fontWeight: 600 }}
          >
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email address"
            value={user.email}
            onChange={handleChange}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            style={authFieldStyle(focused === "email", !!errors.email)}
          />
          <FieldError message={errors.email} />
        </div>

        <div>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              style={{ ...authFieldStyle(focused === "password", !!errors.password), paddingRight: "2.75rem" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
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
              {showPassword ? (
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
          </div>
          <FieldError message={errors.password} />
        </div>

        <div style={{ textAlign: "right", marginTop: -8 }}>
          <Link href="/forget" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em" }}>
            FORGOT PASSWORD?
          </Link>
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
              SIGNING IN…
            </span>
          ) : "SIGN IN"}
        </button>
      </form>

      <OrDivider />
      <GoogleSignInButton />
    </AuthShell>
  );
}
