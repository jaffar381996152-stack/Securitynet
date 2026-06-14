"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatDate, getReadTime } from "../categoryColors";

function renderMarkdown(text) {
  if (!text) return { __html: "" };
  const html = text
    .replace(/^(#{1,6})\s+(.*)$/gm, (m, hashes, content) => {
      const level = hashes.length;
      const size = level === 1 ? 30 : level === 2 ? 24 : level === 3 ? 20 : 17;
      const mt = level <= 2 ? 36 : 26;
      return `<h${level} style="font-family:var(--font-disp);font-weight:700;font-size:${size}px;line-height:1.25;margin:${mt}px 0 12px;color:var(--text-primary)">${content}</h${level}>`;
    })
    .replace(/\*\*(.*?)\*\*/gim, '<strong style="color:var(--text-primary);font-weight:700">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/gim,
      '<a href="$2" style="color:var(--gold);text-decoration:underline;text-underline-offset:2px" target="_blank" rel="noopener noreferrer">$1</a>'
    );
  return { __html: html };
}

const BackLink = ({ children = "Back to News" }) => (
  <Link
    href="/news"
    style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em",
      textTransform: "uppercase", color: "var(--text-muted)", transition: "color 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
    {children}
  </Link>
);

const Shell = ({ children }) => (
  <section className="section-light" style={{ minHeight: "100vh", padding: "48px 0 96px" }}>
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 var(--gut)" }}>{children}</div>
  </section>
);

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
      <Shell>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="animate-pulse">
          <div style={{ height: 14, width: "30%", background: "rgba(20,20,24,0.07)", borderRadius: 4 }} />
          <div style={{ height: 40, width: "85%", background: "rgba(20,20,24,0.07)", borderRadius: 6 }} />
          <div style={{ height: 380, background: "rgba(20,20,24,0.07)", borderRadius: 20, marginTop: 12 }} />
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ height: 13, width: `${70 + ((i * 7) % 25)}%`, background: "rgba(20,20,24,0.06)", borderRadius: 4 }} />
          ))}
        </div>
      </Shell>
    );
  }

  if (notFound || !post) {
    return (
      <Shell>
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ fontFamily: "var(--font-disp)", fontSize: 20, color: "var(--text-primary)", marginBottom: 16 }}>
            Post not found.
          </p>
          <BackLink />
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div style={{ marginBottom: 28 }}>
        <BackLink />
      </div>

      {/* Meta */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
        {post.category && (
          <span
            style={{
              fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "var(--gold)", background: "var(--gold-ghost)",
              border: "1px solid var(--border-gold)", padding: "5px 12px", borderRadius: 999,
            }}
          >
            {post.category}
          </span>
        )}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--text-muted)" }}>
          {formatDate(post.publishedAt)} · {getReadTime(post)} min read
        </span>
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: "var(--font-disp)", fontWeight: 800,
          fontSize: "clamp(30px, 5vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.01em",
          color: "var(--text-primary)", marginBottom: post.excerpt ? 18 : 32,
        }}
      >
        {post.title}
      </h1>

      {/* Standfirst / excerpt */}
      {post.excerpt && (
        <p
          style={{
            fontFamily: "var(--font-ed)", fontStyle: "italic",
            fontSize: "clamp(18px, 2.4vw, 22px)", lineHeight: 1.55,
            color: "var(--text-sec)", marginBottom: 36,
          }}
        >
          {post.excerpt}
        </p>
      )}

      {/* Cover image — rounded, premium */}
      {post.coverImage && (
        <div
          style={{
            borderRadius: 20, overflow: "hidden", marginBottom: 44,
            border: "1px solid var(--border-sub)",
            boxShadow: "0 24px 60px rgba(20,20,24,0.16)",
          }}
        >
          <img
            src={post.coverImage}
            alt={post.title}
            style={{ display: "block", width: "100%", maxHeight: 460, objectFit: "cover" }}
          />
        </div>
      )}

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {(post.content || []).map((block, i) => {
          if (block.type === "heading") {
            return (
              <h2 key={i} style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: "clamp(22px,3vw,28px)", lineHeight: 1.2, color: "var(--text-primary)", marginTop: 16 }}>
                {block.value}
              </h2>
            );
          }
          if (block.type === "image") {
            return (
              <figure key={i} style={{ margin: "8px 0" }}>
                <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--border-sub)", boxShadow: "0 16px 40px rgba(20,20,24,0.12)" }}>
                  <img src={block.value} alt={block.caption || ""} style={{ display: "block", width: "100%", objectFit: "cover" }} />
                </div>
                {block.caption && (
                  <figcaption style={{ fontFamily: "var(--font-mono)", fontSize: 11, textAlign: "center", marginTop: 10, color: "var(--text-muted)" }}>
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }
          if (block.type === "raw") {
            return (
              <div
                key={i}
                style={{ fontFamily: "var(--font-disp)", fontSize: 17.5, lineHeight: 1.85, color: "var(--text-sec)", whiteSpace: "pre-wrap" }}
                dangerouslySetInnerHTML={renderMarkdown(block.value)}
              />
            );
          }
          return (
            <p key={i} style={{ fontFamily: "var(--font-disp)", fontSize: 17.5, lineHeight: 1.85, color: "var(--text-sec)", whiteSpace: "pre-wrap" }}>
              {block.value}
            </p>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 56, paddingTop: 28, display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          borderTop: "1px solid var(--border-sub)",
        }}
      >
        <BackLink>All News</BackLink>
        <Link
          href="/presale"
          className="btn-primary"
          style={{ fontSize: 12, padding: "0 28px", height: 44 }}
        >
          BUY XN →
        </Link>
      </div>
    </Shell>
  );
}
