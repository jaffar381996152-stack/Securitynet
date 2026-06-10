"use client";
import { useState } from "react";
import FadeUpSection from "@/app/home/components/FadeUpSection";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <section id="newsletter">
      <div className="nl-inner">
        <FadeUpSection delay={0.1}>
          <span className="eyebrow">INTELLIGENCE DISPATCH</span>
          <h2 className="disp-title nl-title">
            STAY <span className="gold-word">INFORMED.</span>
          </h2>
          <p className="nl-sub italic-ed">
            Weekly security briefings, XN presale updates, and AI research — delivered to your inbox. No spam, ever.
          </p>
          {submitted ? (
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--c-success)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              ✓ SUBSCRIBED — FIRST BRIEFING INCOMING
            </p>
          ) : (
            <>
              <form className="nl-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="nl-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="nl-submit">SUBSCRIBE</button>
              </form>
              <p className="nl-note">Join 4,800+ subscribers · Unsubscribe any time</p>
            </>
          )}
        </FadeUpSection>
      </div>
    </section>
  );
}
