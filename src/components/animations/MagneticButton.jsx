"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * variant: "primary" | "ghost"
 * size: "sm" | "md" | "lg"
 */
export default function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick = undefined,
  disabled = false,
  type = "button",
  href = undefined,
  ...props
}) {
  const reducedMotion = useReducedMotion();
  const [ripples, setRipples] = useState([]);
  const rippleId = useRef(0);

  const spawnRipple = (e) => {
    if (reducedMotion || disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dim = Math.max(rect.width, rect.height) * 1.8;
    const id = rippleId.current++;
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left - dim / 2, y: e.clientY - rect.top - dim / 2, dim },
    ]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 650);
  };

  const handleClick = (e) => {
    spawnRipple(e);
    onClick?.(e);
  };

  const sizeMap = {
    sm: "px-4 py-2 text-sm",
    md: "px-7 py-3 text-[0.9375rem]",
    lg: "px-9 py-4 text-base",
  };

  const variantClass =
    variant === "primary"
      ? "btn-primary btn-shimmer"
      : "btn-ghost btn-shimmer";

  const cls = `${variantClass} ${sizeMap[size]} ${className}`;

  const Tag = href ? motion.a : motion.button;
  const tagProps = href
    ? { href }
    : { type, disabled };

  return (
    <Tag
      className={cls}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={handleClick}
      aria-disabled={disabled}
      {...tagProps}
      {...props}
    >
      {/* Ripple-on-tap — a soft ring of brand light expanding from the press point */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: r.x,
              top: r.y,
              width: r.dim,
              height: r.dim,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(0,212,255,0.18) 45%, transparent 72%)",
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Tag>
  );
}
