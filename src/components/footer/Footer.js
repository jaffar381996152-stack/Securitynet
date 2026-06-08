"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/components/brand/Logo";
import {
  PlayIcon,
  Twitter,
  Linkedin,
  Instagram,
} from "../../../public/icons/icons";

const socials = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@securitynetai",
    icon: <PlayIcon width={13} height={13} fill="#fff" />,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/securitynetAI",
    icon: <Twitter width={13} height={13} fill="#fff" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/securitynet-ai/",
    icon: <Linkedin width={13} height={13} stroke="#fff" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/securitynetai",
    icon: <Instagram width={13} height={13} stroke="#fff" />,
  },
];

const navGroups = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Tokenomics", href: "/tokenomics" },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "White Paper",
        href: "https://securitynets.s3.amazonaws.com/securitynetai.pdf",
        external: true,
      },
      { label: "Blog", href: "/blog" },
      { label: "News", href: "/news" },
      { label: "Presale", href: "/presale" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact Us", href: "/contact-us" },
      {
        label: "info@securitynet.ai",
        href: "mailto:info@securitynet.ai",
        external: true,
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* ── Gradient top border ───────────────────────────────────── */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--brand-start) 25%, var(--brand-end) 65%, transparent 100%)",
        }}
      />

      {/* ── Main content ─────────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="max-w-7xl mx-auto px-6 pt-16 pb-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1 — Logo + tagline + social */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center sm:items-start text-center sm:text-start"
          >
            <Link href="/" className="inline-block mb-5 transition-transform duration-300 hover:scale-105">
              <Logo size={56} showWordmark={false} />
            </Link>

            <p
              className="text-sm leading-relaxed mb-7 max-w-[220px]"
              style={{ color: "var(--text-secondary)" }}
            >
              AI-powered security intelligence, fuelled by blockchain technology.
            </p>

            {/* Social icons */}
            <motion.ul variants={stagger} className="flex items-center gap-3">
              {socials.map((s, i) => (
                <motion.li variants={fadeUp} key={i}>
                  <Link
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden transition-all duration-300"
                    style={{
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    {/* Gradient hover overlay */}
                    <span
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--brand-start) 0%, var(--brand-mid) 100%)",
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center">
                      {s.icon}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Cols 2-4 — Nav link groups */}
          {navGroups.map(({ title, links }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex flex-col items-center sm:items-start text-center sm:text-start"
            >
              <h3
                className="text-xs font-semibold uppercase tracking-[0.15em] mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm transition-colors duration-200 hover:text-white break-all"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div
        className="border-t"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {year} SecurityNet.ai — All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            XN Token · BSC Network
          </p>
        </div>
      </div>
    </footer>
  );
}
