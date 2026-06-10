"use client";
import FadeUpSection from "@/app/home/components/FadeUpSection";
import useCounterAnimation from "@/app/home/components/useCounterAnimation";

const STATS = [
  { label: "Total Supply",        target: 100000000, desc: "XN — fixed, no inflation" },
  { label: "Presale Allocation",  target: 40000000,  desc: "XN — 40% of total supply" },
  { label: "Team Tokens",         target: 10000000,  desc: "XN — locked 6 months, then vested" },
  { label: "Ecosystem Reserve",   target: 20000000,  desc: "XN — 24-month linear vesting" },
];

const toLocale = (n) => n.toLocaleString();

function StatCard({ stat, delay }) {
  const { ref, value } = useCounterAnimation({ target: stat.target, duration: 1600, formatter: toLocale });
  return (
    <FadeUpSection delay={delay}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 4 }}>
        {stat.label}
      </div>
      <div ref={ref} style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(20px,2.5vw,32px)", color: "var(--gold)", fontWeight: 500, letterSpacing: "0.04em", marginBottom: 8 }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: "var(--text-sec)" }}>{stat.desc}</div>
    </FadeUpSection>
  );
}

export default function OverviewStats() {
  return (
    <section id="stats" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-gold)", borderBottom: "1px solid var(--border-sub)" }}>
      <div className="stats-row">
        {STATS.map((s, i) => (
          <StatCard key={s.label} stat={s} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
