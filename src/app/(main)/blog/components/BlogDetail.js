"use client";

import GeneratedCover from "@/components/brand/GeneratedCover";
import Link from "next/link";
import { motion } from "framer-motion";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { articles } from "./articles";

// ── Article renderer ──────────────────────────────────────────────────────────

function ArticleSection({ section, index }) {
  if (section.type === "intro") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-base lg:text-lg leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {section.body}
      </motion.p>
    );
  }

  if (section.type === "section") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col gap-4"
      >
        <h2
          className="font-sora text-xl lg:text-2xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {section.heading}
        </h2>
        {section.body.split("\n\n").map((para, i) => (
          <p
            key={i}
            className="text-base lg:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {para}
          </p>
        ))}
      </motion.div>
    );
  }

  if (section.type === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="flex flex-col gap-4"
      >
        <h2
          className="font-sora text-xl lg:text-2xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {section.heading}
        </h2>
        <ul className="flex flex-col gap-3">
          {section.items.map((item, i) => {
            const [label, ...rest] = item.split(": ");
            return (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background: "var(--brand-mid)",
                    boxShadow: "0 0 5px var(--brand-mid)",
                  }}
                />
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {rest.length > 0 ? (
                    <>
                      <strong
                        className="font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {label}:
                      </strong>{" "}
                      {rest.join(": ")}
                    </>
                  ) : (
                    item
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </motion.div>
    );
  }

  return null;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function BlogDetail({ id }) {
  const article = articles[id];

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <p style={{ color: "var(--text-muted)" }}>Article not found.</p>
        <Link
          href="/blog"
          className="mt-4 inline-block text-sm font-semibold"
          style={{ color: "var(--brand-mid)" }}
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <section className="pt-24 pb-24 lg:pt-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* ── Main article column ── */}
          <article className="w-full lg:flex-1 min-w-0">

            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-semibold mb-8 hover:opacity-70 transition-opacity"
                style={{ color: "var(--text-muted)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 12H5M12 19l-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Blog
              </Link>
            </motion.div>

            {/* Article meta */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-5"
            >
              <span
                className="text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(108,92,231,0.20)",
                  color: "var(--accent-cyan)",
                  border: "1px solid rgba(0,212,255,0.22)",
                }}
              >
                {article.category}
              </span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {article.date} &nbsp;·&nbsp; {article.readTime}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-sora text-2xl sm:text-3xl lg:text-[2.25rem] font-bold leading-tight mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              {article.title}
            </motion.h1>

            {/* Author */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center gap-3 mb-8 pb-8"
              style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-start), var(--brand-mid))",
                  boxShadow: "0 0 12px var(--brand-glow)",
                }}
              >
                {article.author.name[0]}
              </div>
              <div>
                <p
                  className="text-sm font-semibold leading-none mb-0.5"
                  style={{ color: "var(--text-primary)" }}
                >
                  {article.author.name}
                </p>
                {article.author.handle && (
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {article.author.handle}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="relative w-full rounded-[var(--radius-card)] overflow-hidden mb-10"
              style={{
                aspectRatio: "16/9",
                boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
              }}
            >
              <GeneratedCover seed={article.title} className="absolute inset-0" />
              <div
                className="absolute inset-0"
                style={{ background: "rgba(8,11,20,0.22)" }}
              />
            </motion.div>

            {/* Article body */}
            <div className="flex flex-col gap-8">
              {article.sections.map((section, i) => (
                <ArticleSection key={i} section={section} index={i} />
              ))}
            </div>

            {/* Footer divider */}
            <div
              className="mt-12 pt-8 flex items-center justify-between flex-wrap gap-4"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity"
                style={{ color: "var(--brand-mid)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 12H5M12 19l-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                All Articles
              </Link>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Published {article.date}
              </p>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24">
            <BlogSidebar currentId={id} />
          </aside>
        </div>
      </div>
    </section>
  );
}
