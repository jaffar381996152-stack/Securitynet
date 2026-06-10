"use client";
import FadeUpSection from "@/app/home/components/FadeUpSection";

const ITEMS = [
  {
    title: "Transaction Fees",
    body: "Pay platform fees, API calls, and on-chain interactions across the SecurityNet ecosystem using XN at a discounted rate.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
  },
  {
    title: "Staking Rewards",
    body: "Stake XN to earn yield from network activity. Stakers are rewarded proportionally for securing the protocol and providing liquidity.",
    icon: (
      <>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </>
    ),
  },
  {
    title: "AI Service Payments",
    body: "Access advanced AI security services, intelligence feeds, and automated analysis tools. XN is the exclusive payment currency for premium features.",
    icon: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8h10M7 12h6" />
      </>
    ),
  },
  {
    title: "Governance Voting",
    body: "XN holders vote on protocol upgrades, parameter changes, and treasury allocations. One XN equals one vote — true decentralized governance.",
    icon: (
      <>
        <path d="M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7L12 2z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    title: "Ecosystem Access",
    body: "Unlock premium tiers of the SecurityNet platform, early access to new tools, and exclusive partner integrations by holding XN above threshold amounts.",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </>
    ),
  },
];

const DELAYS = [0.08, 0.16, 0.24, 0.08, 0.16];

export default function TokenUtility() {
  return (
    <section id="utility" className="section-py" style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border-sub)" }}>
      <div className="container">
        <span className="eyebrow">TOKEN UTILITY</span>
        <h2 className="disp-title" style={{ fontSize: "clamp(36px,5vw,64px)", marginBottom: 8 }}>
          FIVE WAYS <span className="gold-word">XN WORKS</span>
        </h2>
        <p style={{ fontSize: 15, color: "var(--text-sec)", maxWidth: 500 }}>
          XN is not a speculative asset — it is the operational currency of the SecurityNet ecosystem.
        </p>
        <div className="utility-grid" style={{ marginTop: 48 }}>
          {ITEMS.map((item, i) => (
            <FadeUpSection key={item.title} delay={DELAYS[i]} className="utility-card">
              <svg className="utility-icon" viewBox="0 0 24 24" aria-hidden="true">
                {item.icon}
              </svg>
              <div style={{ fontFamily: "var(--font-disp)", fontWeight: 600, fontSize: "clamp(15px,1.5vw,18px)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-primary)", marginBottom: 10 }}>
                {item.title}
              </div>
              <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>{item.body}</p>
            </FadeUpSection>
          ))}
        </div>
      </div>
    </section>
  );
}
