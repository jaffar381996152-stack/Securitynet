"use client";
import Link from "next/link";
import FadeUpSection from "@/app/home/components/FadeUpSection";
import { getCategoryClass, formatDate, getThumbLabel, getReadTime } from "../categoryColors";

export default function FeaturedPost({ post }) {
  if (!post) return null;

  return (
    <section id="featured" className="section-py">
      <div className="container">
        <span className="eyebrow">LATEST BRIEFING</span>
        <FadeUpSection delay={0.1}>
          <Link href={`/news/${post.slug}`} className="featured-card">
            <div className="featured-img">
              <div className="featured-img-bg" />
              <div className="featured-img-pattern" />
              <div className="featured-img-overlay" />
              <div className="featured-img-label">
                {getThumbLabel(post).map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < getThumbLabel(post).length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
            <div className="featured-content">
              <div className="featured-meta">
                <span className={`cat ${getCategoryClass(post.category)}`}>{post.category}</span>
                <span className="featured-date">
                  {formatDate(post.publishedAt)} · {getReadTime(post)} min read
                </span>
              </div>
              <h2 className="featured-title">{post.title}</h2>
              <p className="featured-excerpt">{post.excerpt}</p>
              <span className="read-link">READ BRIEFING →</span>
            </div>
          </Link>
        </FadeUpSection>
      </div>
    </section>
  );
}
