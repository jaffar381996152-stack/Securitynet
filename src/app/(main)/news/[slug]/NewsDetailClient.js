"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

function renderMarkdown(text) {
  if (!text) return { __html: "" };
  const html = text
    .replace(/^(#{1,6})\s+(.*)$/gm, (match, hashes, content) => {
      const level = hashes.length;
      if (level === 1)
        return `<h1 class="text-2xl font-bold mt-10 mb-4" style="color:var(--text-primary)">${content}</h1>`;
      if (level === 2)
        return `<h2 class="text-xl font-bold mt-8 mb-3" style="color:var(--text-primary)">${content}</h2>`;
      if (level === 3)
        return `<h3 class="text-lg font-bold mt-6 mb-2" style="color:var(--text-primary)">${content}</h3>`;
      return `<h4 class="text-base font-bold mt-5 mb-2" style="color:var(--text-primary)">${content}</h4>`;
    })
    .replace(
      /\*\*(.*?)\*\*/gim,
      '<strong style="color:var(--text-primary);font-weight:600">$1</strong>'
    )
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/gim,
      '<a href="$2" style="color:var(--brand-mid)" class="hover:opacity-75 underline underline-offset-2 transition-opacity" target="_blank" rel="noopener noreferrer">$1</a>'
    );
  return { __html: html };
}

export default function NewsDetailClient() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/posts?slug=${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setPost(data.data);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-col gap-4 animate-pulse">
            <div
              className="h-6 rounded-xl w-2/3"
              style={{ background: "var(--bg-glass)" }}
            />
            <div
              className="rounded-[var(--radius-card)]"
              style={{ height: 320, background: "var(--bg-glass)" }}
            />
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-4 rounded-lg"
                style={{
                  background: "var(--bg-glass)",
                  width: `${70 + Math.random() * 25}%`,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (notFound || !post) {
    return (
      <section className="pt-28 pb-24 text-center">
        <p className="text-lg mb-4" style={{ color: "var(--text-muted)" }}>
          Post not found.
        </p>
        <Link
          href="/news"
          className="text-sm font-semibold hover:opacity-70 transition-opacity"
          style={{ color: "var(--brand-mid)" }}
        >
          ← Back to News
        </Link>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-24 lg:pt-28">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/news"
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
            Back to News
          </Link>
        </motion.div>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-5"
        >
          {post.category && (
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(108,92,231,0.18)",
                color: "var(--accent-cyan)",
                border: "1px solid rgba(0,212,255,0.20)",
              }}
            >
              {post.category}
            </span>
          )}
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-sora text-2xl md:text-3xl lg:text-[2rem] font-bold leading-tight mb-8"
          style={{ color: "var(--text-primary)" }}
        >
          {post.title}
        </motion.h1>

        {/* Cover image */}
        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="rounded-[var(--radius-card)] overflow-hidden mb-10"
            style={{
              boxShadow: "0 16px 48px rgba(0,0,0,0.30)",
            }}
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full object-cover max-h-[420px]"
            />
          </motion.div>
        )}

        {/* Content blocks */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          {(post.content || []).map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={i}
                  className="font-sora text-xl font-bold mt-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  {block.value}
                </h2>
              );
            }
            if (block.type === "image") {
              return (
                <div
                  key={i}
                  className="rounded-[var(--radius-card)] overflow-hidden my-2"
                >
                  <img
                    src={block.value}
                    alt={block.caption || ""}
                    className="w-full object-cover"
                  />
                  {block.caption && (
                    <p
                      className="text-xs text-center mt-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {block.caption}
                    </p>
                  )}
                </div>
              );
            }
            if (block.type === "raw") {
              return (
                <div
                  key={i}
                  className="text-base leading-relaxed whitespace-pre-wrap"
                  style={{ color: "var(--text-secondary)" }}
                  dangerouslySetInnerHTML={renderMarkdown(block.value)}
                />
              );
            }
            return (
              <p
                key={i}
                className="text-base leading-relaxed whitespace-pre-wrap"
                style={{ color: "var(--text-secondary)" }}
              >
                {block.value}
              </p>
            );
          })}
        </motion.div>

        {/* Footer */}
        <div
          className="mt-12 pt-6 flex items-center justify-between flex-wrap gap-4"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <Link
            href="/news"
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
            All News
          </Link>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
