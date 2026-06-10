"use client";
import FadeUpSection from "@/app/home/components/FadeUpSection";

const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const TWITTER_PATH =
  "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z";

const TEAM = [
  {
    initials: "AZ",
    name: "Azeem",
    role: "Founder & CEO",
    bio: "Drives the vision behind SecurityNet's AI-powered blockchain security platform, leading product strategy, partnerships, and the XN token presale.",
    socials: ["linkedin", "twitter"],
  },
  {
    initials: "AO",
    name: "Amir Omer",
    role: "Co-Founder & CTO",
    bio: "Leads engineering for SecurityNet, overseeing the AI threat detection engine, on-chain infrastructure, and the XN token smart contract architecture.",
    socials: ["linkedin", "twitter"],
  },
];

const DELAYS = [0.08, 0.16];

function SocialIcon({ type }) {
  const path = type === "linkedin" ? LINKEDIN_PATH : TWITTER_PATH;
  const label = type === "linkedin" ? "LinkedIn" : "Twitter";
  return (
    <a href="#" className="team-social" aria-label={label}>
      <svg viewBox="0 0 24 24">
        <path d={path} />
      </svg>
    </a>
  );
}

export default function OurTeam() {
  return (
    <section id="team" className="section-py">
      <div className="container">
        <span className="eyebrow">THE TEAM</span>
        <h2 className="disp-title" style={{ fontSize: "clamp(36px,5.5vw,72px)" }}>
          PEOPLE BEHIND <span className="gold-word">THE NETWORK</span>
        </h2>
        <div className="team-grid">
          {TEAM.map((member, i) => (
            <FadeUpSection key={member.name} delay={DELAYS[i]} className="team-card">
              <div className="team-photo-placeholder">
                <span className="team-photo-initials">{member.initials}</span>
              </div>
              <div className="team-info">
                <div className="team-name">{member.name}</div>
                <div className="team-role">{member.role}</div>
                <p className="team-bio">{member.bio}</p>
                <div className="team-socials">
                  {member.socials.map((s) => (
                    <SocialIcon key={s} type={s} />
                  ))}
                </div>
              </div>
            </FadeUpSection>
          ))}
        </div>
      </div>
    </section>
  );
}
