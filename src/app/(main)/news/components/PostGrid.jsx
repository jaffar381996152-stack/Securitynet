"use client";
import Link from "next/link";
import FadeUpSection from "@/app/home/components/FadeUpSection";
import { getCategoryClass, formatDate, getThumbLabel, getReadTime } from "../categoryColors";

const DELAYS = [0.08, 0.16, 0.24];

export default function PostGrid({ posts, loading, error, hasMore, loadingMore, onLoadMore }) {
  return (
    <section id="post-grid" className="section-py">
      <div className="container">
        <div className="grid-header">
          <span className="eyebrow" style={{ margin: 0 }}>ALL INTELLIGENCE</span>
          <span className="grid-count">
            SHOWING {posts.length} ARTICLE{posts.length !== 1 ? "S" : ""}
          </span>
        </div>

        {error ? (
          <p style={{ textAlign: "center", fontFamily: "var(--font-mono)", color: "var(--text-muted)", padding: "60px 0" }}>
            Unable to load articles. Please try again later.
          </p>
        ) : !loading && posts.length === 0 ? (
          <p style={{ textAlign: "center", fontFamily: "var(--font-mono)", color: "var(--text-muted)", padding: "60px 0" }}>
            NO ARTICLES YET
          </p>
        ) : (
          <div className="posts-grid">
            {posts.map((post, i) => (
              <FadeUpSection key={post._id} delay={DELAYS[i % 3]}>
                <Link href={`/news/${post.slug}`} className="post-card">
                  <div className="post-thumb">
                    {post.coverImage ? (
                      <>
                        <img className="post-thumb-img" src={post.coverImage} alt={post.title} loading="lazy" />
                        <div className="post-thumb-overlay" />
                      </>
                    ) : (
                      <>
                        <div className="post-thumb-pattern" />
                        <div className="post-thumb-overlay" />
                        <div className="post-thumb-label">
                          {getThumbLabel(post).map((line, idx) => (
                            <span key={idx}>
                              {line}
                              {idx < getThumbLabel(post).length - 1 && <br />}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="post-body">
                    <div className="post-meta">
                      <span className={`cat ${getCategoryClass(post.category)}`}>{post.category}</span>
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <div className="post-footer">
                      <span className="post-date">{formatDate(post.publishedAt)}</span>
                      <span className="post-read">
                        {getReadTime(post)} min read · <span className="post-read-link">READ →</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeUpSection>
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <div className="load-more-wrap">
            <button className="btn-outline" onClick={onLoadMore} disabled={!hasMore || loadingMore}>
              {hasMore ? "LOAD MORE ARTICLES ↓" : "NO MORE ARTICLES"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
