"use client";
import FadeUpSection from "@/app/home/components/FadeUpSection";
import useCounterAnimation from "@/app/home/components/useCounterAnimation";

function CounterCell({ target, suffix, label, delay }) {
  const { ref, value } = useCounterAnimation({ target, duration: 1400, suffix });
  return (
    <FadeUpSection delay={delay}>
      <div ref={ref} className="strip-num">{value}</div>
      <div className="strip-lbl">{label}</div>
    </FadeUpSection>
  );
}

function StaticCell({ value, label, delay }) {
  return (
    <FadeUpSection delay={delay}>
      <div className="strip-num">{value}</div>
      <div className="strip-lbl">{label}</div>
    </FadeUpSection>
  );
}

export default function ServicesStats() {
  return (
    <section id="stats-strip" style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border-sub)" }}>
      <div className="strip-grid">
        <CounterCell target={6} label="AI Service Layers" delay={0} />
        <StaticCell value="24/7" label="Continuous Monitoring" delay={0.08} />
        <CounterCell target={99} suffix=".9%" label="Uptime SLA" delay={0.16} />
        <StaticCell value="<50ms" label="Threat Response Time" delay={0.24} />
      </div>
    </section>
  );
}
