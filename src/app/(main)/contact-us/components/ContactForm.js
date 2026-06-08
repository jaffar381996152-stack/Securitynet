"use client";

import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .min(6, "Phone must be at least 6 characters")
    .max(15, "Phone must be at most 15 characters")
    .required("Phone number is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be at most 500 characters")
    .required("Message is required"),
});

const EMPTY = { name: "", email: "", phone: "", message: "" };

// ── Styled field helpers ───────────────────────────────────────────────────────

function fieldStyle(focused, hasError) {
  return {
    width: "100%",
    background: "var(--bg-tertiary)",
    border: `1px solid ${
      hasError
        ? "rgba(239,68,68,0.70)"
        : focused
        ? "var(--brand-mid)"
        : "var(--border-subtle)"
    }`,
    borderRadius: "0.875rem",
    color: "var(--text-primary)",
    fontSize: "0.875rem",
    outline: "none",
    boxShadow:
      focused && !hasError ? "0 0 0 3px rgba(108,92,231,0.15)" : "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [formData, setFormData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setErrors({});
    try {
      await schema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      const newErrors = {};
      validationError.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post("/api/contactform", formData);
      if (response.data.success) {
        setSubmitted(true);
        setFormData(EMPTY);
      } else {
        toast.error(response.data.error ?? "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error ?? "Failed to send message. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex flex-col items-center text-center gap-6 py-12"
      >
        {/* Animated check circle */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,200,83,0.20) 0%, rgba(0,200,83,0.10) 100%)",
            border: "1px solid rgba(0,200,83,0.40)",
            boxShadow: "0 0 28px rgba(0,200,83,0.15)",
          }}
        >
          <motion.svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            initial={{ pathLength: 0 }}
          >
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

        <div>
          <h3
            className="font-sora text-xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Message Sent!
          </h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Thank you for reaching out. We&apos;ll respond within 24 hours.
          </p>
        </div>

        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-semibold hover:opacity-70 transition-opacity"
          style={{ color: "var(--brand-mid)" }}
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-5">

        {/* Name */}
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Full Name"
            autoComplete="name"
            onChange={handleChange}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            style={{ ...fieldStyle(focused === "name", !!errors.name), padding: "0.75rem 1rem" }}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-xs mt-1.5 px-1"
                style={{ color: "#EF4444" }}
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email Address"
              autoComplete="email"
              onChange={handleChange}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              style={{ ...fieldStyle(focused === "email", !!errors.email), padding: "0.75rem 1rem" }}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs mt-1.5 px-1"
                  style={{ color: "#EF4444" }}
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="Phone Number"
              autoComplete="tel"
              onChange={handleChange}
              onFocus={() => setFocused("phone")}
              onBlur={() => setFocused(null)}
              style={{ ...fieldStyle(focused === "phone", !!errors.phone), padding: "0.75rem 1rem" }}
            />
            <AnimatePresence>
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs mt-1.5 px-1"
                  style={{ color: "#EF4444" }}
                >
                  {errors.phone}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Message */}
        <div>
          <textarea
            name="message"
            value={formData.message}
            placeholder="Tell us about your project or inquiry..."
            rows={5}
            onChange={handleChange}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
            style={{
              ...fieldStyle(focused === "message", !!errors.message),
              padding: "0.875rem 1rem",
              resize: "vertical",
              minHeight: "130px",
            }}
          />
          <div className="flex items-start justify-between mt-1 px-1">
            <AnimatePresence>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs"
                  style={{ color: "#EF4444" }}
                >
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
            <span
              className="text-xs ml-auto"
              style={{ color: formData.message.length > 450 ? "#F9A328" : "var(--text-muted)" }}
            >
              {formData.message.length}/500
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-1">
          <MagneticButton
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full justify-center"
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="3"
                  />
                  <path
                    d="M12 2a10 10 0 0110 10"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                Sending…
              </>
            ) : (
              <>
                Send Message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </MagneticButton>
          <p
            className="text-xs text-center mt-3"
            style={{ color: "var(--text-muted)" }}
          >
            We respond within 24 hours on business days.
          </p>
        </div>
      </div>
    </form>
  );
}
