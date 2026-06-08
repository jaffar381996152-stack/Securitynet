"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SplitRise from "@/components/animations/SplitRise";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function NewsClient() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 12 });
    if (activeCategory !== "all") params.set("category", activeCategory);
    fetch(`/api/posts?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.data);
          setCategories(data.categories || []);
          setPagination(data.pagination);
        }
      })
      .finally(() => setLoading(false));
  }, [activeCategory, page]);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-10 lg:pt-32 lg:pb-12 overflow-hidden">
        <div
          className="absolute top-0 inset-x-0 h-64 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(108,92,231,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-5"
            style={{ color: "var(--accent-cyan)" }}
          >
            NEWS & INSIGHTS
          </motion.p>
          <div className="flex justify-center">
            <SplitRise
              text="News & Guides"
              as="h1"
              delay={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-sm max-w-lg mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Stay updated with the latest developments in AI security, blockchain,
            and smart surveillance technology.
          </motion.p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Divider */}
          <div
            className="h-px mb-10"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--border-subtle) 50%, transparent 100%)",
            }}
          />

          {/* Category filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <button
                onClick={() => handleCategory("all")}
                className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200"
                style={
                  activeCategory === "all"
                    ? {
                        background:
                          "linear-gradient(135deg, var(--brand-start), var(--brand-mid))",
                        color: "white",
                        boxShadow: "0 0 14px var(--brand-glow)",
                        border: "1px solid transparent",
                      }
                    : {
                        background: "var(--bg-tertiary)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-subtle)",
                      }
                }
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c._id}
                  onClick={() => handleCategory(c._id)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200"
                  style={
                    activeCategory === c._id
                      ? {
                          background:
                            "linear-gradient(135deg, var(--brand-start), var(--brand-mid))",
                          color: "white",
                          boxShadow: "0 0 14px var(--brand-glow)",
                          border: "1px solid transparent",
                        }
                      : {
                          background: "var(--bg-tertiary)",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border-subtle)",
                        }
                  }
                >
                  {c._id}{" "}
                  <span style={{ opacity: 0.55 }}>({c.count})</span>
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-[var(--radius-card)] animate-pulse"
                  style={{
                    height: 280,
                    background: "var(--bg-glass)",
                    border: "1px solid var(--border-glass)",
                  }}
                />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ color: "var(--text-muted)" }}>No posts yet.</p>
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {posts.map((post) => (
                <motion.div key={post._id} variants={itemVariants}>
                  <Link
                    href={`/news/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] transition-all duration-300 h-full"
                    style={{
                      background: "var(--bg-glass)",
                      border: "1px solid var(--border-glass)",
                      backdropFilter: "blur(12px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 16px 48px rgba(108,92,231,0.12), inset 0 1px 0 rgba(255,255,255,0.06)";
                      e.currentTarget.style.borderColor = "rgba(108,92,231,0.30)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "var(--border-glass)";
                    }}
                  >
                    {/* Image */}
                    {post.coverImage ? (
                      <div className="h-48 overflow-hidden shrink-0">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div
                        className="h-48 shrink-0 flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(72,58,160,0.20) 0%, rgba(108,92,231,0.10) 100%)",
                        }}
                      >
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ opacity: 0.3 }}
                        >
                          <path
                            d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"
                            stroke="var(--brand-mid)"
                            strokeWidth="1.8"
                          />
                          <path
                            d="M3 9h18M9 21V9"
                            stroke="var(--brand-mid)"
                            strokeWidth="1.8"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1 gap-2">
                      {post.category && (
                        <span
                          className="text-[10px] font-semibold uppercase tracking-[0.15em] self-start px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(108,92,231,0.18)",
                            color: "var(--accent-cyan)",
                            border: "1px solid rgba(0,212,255,0.18)",
                          }}
                        >
                          {post.category}
                        </span>
                      )}
                      <h2
                        className="text-sm font-semibold leading-snug line-clamp-2 group-hover:opacity-75 transition-opacity"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p
                          className="text-xs leading-relaxed line-clamp-2"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {post.excerpt}
                        </p>
                      )}
                      <p
                        className="text-[10px] mt-auto pt-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {[...Array(pagination.pages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className="w-9 h-9 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={
                    page === i + 1
                      ? {
                          background:
                            "linear-gradient(135deg, var(--brand-start), var(--brand-mid))",
                          color: "white",
                          border: "1px solid transparent",
                          boxShadow: "0 0 12px var(--brand-glow)",
                        }
                      : {
                          background: "var(--bg-tertiary)",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border-subtle)",
                        }
                  }
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
