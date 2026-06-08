"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SplitRise from "@/components/animations/SplitRise";
import LiquidGlassCard from "@/components/animations/LiquidGlassCard";
import GeneratedCover from "@/components/brand/GeneratedCover";

const posts = [
  {
    href: "/blog/future-of-security-with-ai",
    category: "Artificial Intelligence",
    date: "Feb 23, 2024",
    title:
      "The Future of Security: How AI and Blockchain Are Transforming Surveillance",
    excerpt:
      "AI algorithms provide proactive, real-time threat detection while blockchain ensures the tamper-proof nature of surveillance data — together reshaping modern security.",
    author: "Ahmed Faraz",
  },
  {
    href: "/blog/Crypto-Payments-for-Security-Services",
    category: "Cryptocurrency",
    date: "Feb 25, 2024",
    title:
      "Crypto Payments for Security Services: A New Frontier in Payment Solutions",
    excerpt:
      "SecurityNet.ai introduces crypto payment support — fast, secure, and borderless financial solutions for organizations embracing modern security services.",
    author: "Ammar Hanif",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function PostCard({ post }) {
  return (
    <LiquidGlassCard padding={false} className="h-full group">
      {/* Image */}
      <div
        className="relative h-52 overflow-hidden"
        style={{
          borderRadius: "var(--radius-card) var(--radius-card) 0 0",
        }}
      >
        <GeneratedCover
          seed={post.title}
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(8,11,20,0.30)" }}
        />
        {/* Category chip */}
        <div className="absolute top-3 left-4">
          <span
            className="text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(108,92,231,0.28)",
              color: "var(--accent-cyan)",
              border: "1px solid rgba(0,212,255,0.22)",
              backdropFilter: "blur(6px)",
            }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3">
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {post.author} &nbsp;·&nbsp; {post.date}
        </p>

        <Link href={post.href} className="block">
          <h3
            className="font-sora text-base font-semibold leading-snug hover:opacity-75 transition-opacity"
            style={{ color: "var(--text-primary)" }}
          >
            {post.title}
          </h3>
        </Link>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {post.excerpt}
        </p>

        <Link
          href={post.href}
          className="flex items-center gap-1.5 text-xs font-semibold mt-1 hover:opacity-70 transition-opacity"
          style={{ color: "var(--brand-mid)" }}
        >
          Read Article
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </LiquidGlassCard>
  );
}

export default function Blog() {
  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Divider */}
        <div
          className="h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--border-subtle) 50%, transparent 100%)",
          }}
        />

        <div className="flex flex-col items-center text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--accent-cyan)" }}
          >
            LATEST ARTICLES
          </motion.p>
          <SplitRise
            text="All Posts"
            as="h2"
            delay={0.1}
            className="text-2xl sm:text-3xl font-bold tracking-tight"
          />
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {posts.map((post, i) => (
            <motion.div key={i} variants={itemVariants}>
              <PostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
