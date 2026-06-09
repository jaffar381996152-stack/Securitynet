"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import AuthShell from "../components/AuthShell";
import { authFieldStyle } from "../components/authFieldStyle";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { firstname: "", lastname: "", email: "", password: "" };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--c-danger)", marginTop: 6, paddingLeft: 4 }}>
      {message}
    </p>
  );
}

export default function Register() {
  const router = useRouter();
  const [user, setUser] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!user.firstname.trim()) next.firstname = "First name is required";
    if (!user.lastname.trim()) next.lastname = "Last name is required";
    if (!user.email) next.email = "Email is required";
    else if (!EMAIL_RE.test(user.email)) next.email = "Enter a valid email address";
    if (!user.password) next.password = "Password is required";
    else if (user.password.length < 6) next.password = "Use at least 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await axios.post("/api/signup", user);
      if (res.status === 200 || res.status === 201) {
        toast.success("Account created! Redirecting to sign in…");
        setUser(EMPTY);
        setTimeout(() => router.push("/signin"), 1600);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.error ?? "Could not create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create Account"
      subtitle="Join SecurityNet.ai to track the XN presale and more"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/signin" style={{ color: "var(--gold)", fontWeight: 600 }}>
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <input
              type="text"
              name="firstname"
              autoComplete="given-name"
              placeholder="First name"
              value={user.firstname}
              onChange={handleChange}
              onFocus={() => setFocused("firstname")}
              onBlur={() => setFocused(null)}
              style={authFieldStyle(focused === "firstname", !!errors.firstname)}
            />
            <FieldError message={errors.firstname} />
          </div>
          <div>
            <input
              type="text"
              name="lastname"
              autoComplete="family-name"
              placeholder="Last name"
              value={user.lastname}
              onChange={handleChange}
              onFocus={() => setFocused("lastname")}
              onBlur={() => setFocused(null)}
              style={authFieldStyle(focused === "lastname", !!errors.lastname)}
            />
            <FieldError message={errors.lastname} />
          </div>
        </div>

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
              autoComplete="new-password"
              placeholder="Password (min 6 characters)"
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
              CREATING ACCOUNT…
            </span>
          ) : "CREATE ACCOUNT"}
        </button>
      </form>
    </AuthShell>
  );
}
