"use client";
import FadeUpSection from "@/app/home/components/FadeUpSection";
import useCounterAnimation from "@/app/home/components/useCounterAnimation";

const STATS = [
  { label: "Year Founded", value: "2023" },
  { label: "Countries Reached", target: 47 },
  { label: "AI Models Deployed", target: 6 },
  { label: "Networks Supported", target: 3 },
];

function StatCell({ stat, delay }) {
  const { ref, value } = useCounterAnimation({ target: stat.target ?? 0, duration: 1400 });
  return (
    <FadeUpSection delay={delay}>
      <div ref={ref} className="stat-c-num">
        {stat.value ?? value}
      </div>
      <div className="stat-c-lbl">{stat.label}</div>
    </FadeUpSection>
  );
}

export default function CompanyStats() {
  return (
    <section id="company-stats" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-sub)" }}>
      <div className="stats-4">
        {STATS.map((s, i) => (
          <StatCell key={s.label} stat={s} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
