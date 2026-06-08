"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import AuthShell from "../components/AuthShell";
import { authFieldStyle } from "../components/authFieldStyle";
import MagneticButton from "@/components/animations/MagneticButton";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { firstname: "", lastname: "", email: "", password: "" };

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
      title="Create Your Account"
      subtitle="Join SecurityNet.ai to track the XN presale and more"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/signin" className="font-semibold no-underline" style={{ color: "var(--brand-mid)" }}>
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
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
              className="absolute inset-y-0 right-0 flex items-center pr-3.5"
              style={{ color: "var(--text-muted)" }}
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

        <MagneticButton type="submit" variant="primary" size="lg" disabled={loading} className="w-full justify-center">
          {loading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Creating account…
            </>
          ) : (
            "Sign Up"
          )}
        </MagneticButton>
      </form>
    </AuthShell>
  );
}
