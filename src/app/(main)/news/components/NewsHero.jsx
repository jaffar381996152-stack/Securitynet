"use client";
import DeclassifyText from "@/app/home/components/DeclassifyText";
import FadeUpSection from "@/app/home/components/FadeUpSection";

export default function NewsHero({ categories, activeCategory, onCategoryChange }) {
  return (
    <section id="hero">
      <div className="hero-inner">
        <div className="hero-row">
          <div className="hero-left">
            <span className="eyebrow">NEWS &amp; ANALYSIS</span>
            <h1 className="disp-title hero-title">
              <DeclassifyText text="INTELLIGENCE" delay={0.1} />
              <br />
              <DeclassifyText text="FEEDS." delay={0.3} style={{ color: "var(--gold)" }} />
            </h1>
            <FadeUpSection delay={0.4}>
              <p className="hero-sub italic-ed">
                Latest news, security research, guides, and announcements from the SecurityNet ecosystem.
              </p>
            </FadeUpSection>
          </div>

          <div className="hero-filter">
            <button
              className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
              data-filter="all"
              onClick={() => onCategoryChange("all")}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c._id}
                className={`filter-btn ${activeCategory === c._id ? "active" : ""}`}
                data-filter={c._id}
                onClick={() => onCategoryChange(c._id)}
              >
                {c._id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
