"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/brand/Logo";
import { CloseIcon, MenuIcon } from "../../../public/icons/icons";
import { NavigationData } from "../../../data/NavigationData";

const navLinks = NavigationData.filter((item) => item.name !== "Securitynet.ai");

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ── Fixed header bar ─────────────────────────────────────── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 inset-x-0 z-50 h-[72px] flex items-center transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8, 11, 20, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border-glass)"
            : "1px solid transparent",
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group" aria-label="SecurityNet.ai home">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Logo size={44} showWordmark={false} />
            </motion.div>
          </Link>

          {/* Desktop nav ─────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((item, i) => {
              const active = pathname === item.path;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={item.path}
                    className={`relative text-[0.8125rem] font-semibold tracking-widest uppercase transition-colors duration-200 group ${
                      active
                        ? "text-[var(--text-accent)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {item.name}

                    {/* Underline glow */}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 ${
                        active
                          ? "w-full bg-[var(--text-accent)] shadow-[0_0_8px_var(--brand-mid)]"
                          : "w-0 group-hover:w-full bg-[var(--brand-mid)]"
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Right side ───────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            {/* White Paper CTA */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="hidden lg:block"
            >
              <Link
                href="https://securitynets.s3.amazonaws.com/securitynetai.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost btn-shimmer px-5 py-2.5 text-[0.8125rem] rounded-xl"
              >
                White Paper
              </Link>
            </motion.div>

            {/* Hamburger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl glass"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <MenuIcon width={20} height={12} stroke="var(--text-primary)" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen overlay ───────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60]"
              style={{
                background: "rgba(8, 11, 20, 0.92)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-0"
              aria-modal="true"
              role="dialog"
              aria-label="Navigation menu"
            >
              {/* Close button */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-xl glass"
                aria-label="Close navigation menu"
              >
                <CloseIcon width={18} height={18} fill="var(--text-primary)" />
              </motion.button>

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.4 }}
                className="mb-12"
              >
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <Logo size={56} showWordmark={false} />
                </Link>
              </motion.div>

              {/* Nav links */}
              <nav className="flex flex-col items-center gap-8 mb-12">
                {navLinks.map((item, i) => {
                  const active = pathname === item.path;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.07, duration: 0.4 }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`text-2xl font-bold tracking-widest uppercase transition-colors duration-200 ${
                          active
                            ? "text-[var(--text-accent)]"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* White Paper CTA */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + navLinks.length * 0.07, duration: 0.4 }}
              >
                <Link
                  href="https://securitynets.s3.amazonaws.com/securitynetai.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary btn-shimmer px-8 py-3.5 text-base rounded-xl"
                >
                  White Paper
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
