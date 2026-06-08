"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GeneratedCover from "@/components/brand/GeneratedCover";

const posts = [
  {
    id: "future-of-security-with-ai",
    href: "/blog/future-of-security-with-ai",
    title: "The Future of Security: How AI and Blockchain Are Transforming Surveillance",
    category: "Artificial Intelligence",
    date: "Feb 23, 2024",
  },
  {
    id: "Crypto-Payments-for-Security-Services",
    href: "/blog/Crypto-Payments-for-Security-Services",
    title: "Crypto Payments for Security Services: A New Frontier in Payment Solutions",
    category: "Cryptocurrency",
    date: "Feb 25, 2024",
  },
];

const categories = [
  { name: "Artificial Intelligence", count: 1 },
  { name: "Cryptocurrency", count: 1 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function BlogSidebar({ currentId }) {
  return (
    <div className="flex flex-col gap-5">

      {/* Categories */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="glass-card rounded-[var(--radius-card)] p-5"
      >
        <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h10" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--accent-cyan)" }}>
            Categories
          </span>
        </div>

        <ul className="flex flex-col gap-1">
          {categories.map((cat, i) => (
            <li key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < categories.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {cat.name}
              </span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(108,92,231,0.18)",
                  color: "var(--brand-mid)",
                  border: "1px solid rgba(108,92,231,0.25)",
                }}
              >
                {cat.count}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Popular posts */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="glass-card rounded-[var(--radius-card)] p-5"
      >
        <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="var(--accent-cyan)" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
          <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--accent-cyan)" }}>
            Popular Posts
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {posts.map((post, i) => (
            <Link
              key={i}
              href={post.href}
              className="flex gap-3 group"
            >
              {/* Thumbnail */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <GeneratedCover
                  seed={post.title}
                  className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                />
                {post.id === currentId && (
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{ border: "2px solid var(--brand-mid)" }}
                  />
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-semibold leading-snug line-clamp-2 mb-1 group-hover:opacity-75 transition-opacity"
                  style={{ color: "var(--text-primary)" }}
                >
                  {post.title}
                </p>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                  {post.category} · {post.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* CTA card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="rounded-[var(--radius-card)] p-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(72,58,160,0.35) 0%, rgba(108,92,231,0.20) 100%)",
          border: "1px solid rgba(108,92,231,0.25)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 100% 0%, rgba(0,212,255,0.12) 0%, transparent 70%)",
          }}
        />
        <p
          className="text-xs font-semibold tracking-[0.18em] uppercase mb-2"
          style={{ color: "var(--accent-cyan)" }}
        >
          PRESALE OPEN
        </p>
        <p
          className="font-sora text-sm font-semibold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Buy XN tokens at $0.20 USDT before the public launch.
        </p>
        <Link
          href="/presale"
          className="btn-primary inline-block text-xs font-semibold px-4 py-2.5 rounded-xl"
        >
          Join Presale
        </Link>
      </motion.div>
    </div>
  );
}
