"use client";
import FadeUpSection from "@/app/home/components/FadeUpSection";

const SERVICES = [
  {
    num: "01",
    title: "AI Security Monitoring",
    body: "Continuous, 24/7 AI-driven surveillance of wallet activity, smart contract interactions, and on-chain anomalies. Alerts fire in milliseconds — before damage is done.",
    tags: ["Real-Time", "AI Alerts", "24/7"],
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="7" strokeDasharray="3 3" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
      </>
    ),
  },
  {
    num: "02",
    title: "On-Chain Threat Detection",
    body: "Machine learning models scan every block for malicious patterns — reentrancy attacks, flash loan exploits, and front-running — and trigger automated countermeasures.",
    tags: ["ML Models", "Auto-Block", "MEV Guard"],
    icon: (
      <>
        <path d="M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7L12 2z" />
        <path d="M12 8v4" />
        <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    num: "03",
    title: "Smart Contract Security",
    body: "Static analysis, fuzzing, and formal verification for smart contracts at deployment. Continuous runtime monitoring flags behavioral deviations after launch.",
    tags: ["Formal Verify", "Fuzzing", "Runtime"],
    icon: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </>
    ),
  },
  {
    num: "04",
    title: "Decentralized AI Services",
    body: "Distributed AI inference nodes process security queries without single points of failure. Intelligence is available even when centralized providers are down or censored.",
    tags: ["Distributed", "Censorship-Resistant"],
    icon: (
      <>
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </>
    ),
  },
  {
    num: "05",
    title: "Identity Verification",
    body: "Zero-knowledge proof-based identity layer. Verify wallet ownership and credentials without exposing sensitive data. Fully compliant, fully private by design.",
    tags: ["ZK Proofs", "Privacy", "Compliant"],
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    num: "06",
    title: "IoT Security Layer",
    body: "On-chain registration and behavioral fingerprinting for IoT devices. Detects compromised nodes, anomalous data patterns, and botnet recruitment attempts in real time.",
    tags: ["IoT Nodes", "Fingerprint", "Botnet Guard"],
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

const DELAYS = [0.08, 0.16, 0.24, 0.08, 0.16, 0.24];

export default function ServicesGrid() {
  return (
    <section id="services-grid" className="section-py" style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border-sub)" }}>
      <div className="container">
        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <FadeUpSection key={s.num} delay={DELAYS[i]} className="svc-card">
              <span className="svc-num" aria-hidden="true">{s.num}</span>
              <svg className="svc-icon" viewBox="0 0 24 24" aria-hidden="true">
                {s.icon}
              </svg>
              <div className="svc-title">{s.title}</div>
              <p className="svc-body">{s.body}</p>
              <div className="svc-tags">
                {s.tags.map((t) => (
                  <span key={t} className="svc-tag">{t}</span>
                ))}
              </div>
              <a href="#" className="svc-link">Learn more →</a>
            </FadeUpSection>
          ))}
        </div>
      </div>
    </section>
  );
}
