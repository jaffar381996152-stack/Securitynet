"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useTransform,
  animate,
} from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

/* ── Coin geometry ──────────────────────────────────────────────────────
   A real CSS-3D coin. Two circular faces (XN / shield) separated along Z by
   THICKNESS, joined by a reeded cylindrical edge built from EDGE_SEGMENTS
   thin strips. Each strip is `rotateY(θ) translateZ(RADIUS)` inside a group
   tipped `rotateX(90deg)` — that lands the strips in a ring in the XY plane,
   normals pointing radially out, extending THICKNESS along Z: a coin's edge.
   When the coin spins about Y, the edge swings into view at ±90° just like a
   real coin flip.                                                          */
const COIN_SIZE     = 150;          // on-screen diameter (px)
const RADIUS        = 74;           // edge ring radius — matches the gold disc rim
const THICKNESS     = 16;           // coin depth (px)
const EDGE_SEGMENTS = 90;
const SEG_ANGLE     = 360 / EDGE_SEGMENTS;                 // exact: 4°
const SEG_W         = Number(((Math.PI * 2 * RADIUS) / EDGE_SEGMENTS + 0.7).toFixed(3));

/* Shared gold disc face. `gradId` keeps SVG gradient ids unique per face.   */
function CoinDisc({ gradId, children }) {
  return (
    <svg
      width={COIN_SIZE}
      height={COIN_SIZE}
      viewBox="0 0 120 120"
      style={{ display: "block", filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.55))" }}
    >
      <defs>
        <radialGradient id={gradId} cx="34%" cy="28%" r="80%">
          <stop offset="0%"  stopColor="#FBEFD6" />
          <stop offset="42%" stopColor="var(--gold-bright)" />
          <stop offset="100%" stopColor="var(--gold-dim)" />
        </radialGradient>
      </defs>

      {/* Disc body — fills the viewBox so it meets the 3D edge ring */}
      <circle cx="60" cy="60" r="59" fill={`url(#${gradId})`} />
      <circle cx="60" cy="60" r="59" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="53" fill="none" stroke="rgba(10,10,14,0.16)" strokeWidth="1" />

      {/* Minted inner ring of ticks — rounded to avoid SSR float drift */}
      {Array.from({ length: 32 }).map((_, i) => {
        const a  = (i / 32) * Math.PI * 2;
        const x1 = (60 + Math.cos(a) * 49).toFixed(3);
        const y1 = (60 + Math.sin(a) * 49).toFixed(3);
        const x2 = (60 + Math.cos(a) * 53).toFixed(3);
        const y2 = (60 + Math.sin(a) * 53).toFixed(3);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(10,10,14,0.22)" strokeWidth="1.1" />;
      })}

      {children}
    </svg>
  );
}

export default function Preloader() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible]   = useState(true);
  const [rippling, setRippling] = useState(false);

  // Spin + presentation
  const rotateY     = useMotionValue(-1080);  // 3 full turns → lands on the XN face
  const coinScale   = useMotionValue(0.5);
  const coinOpacity = useMotionValue(0);
  const wordOpacity = useMotionValue(0);

  // Metallic light sweep across the face
  const glareX        = useMotionValue(-1.5);
  const glareTransform = useTransform(glareX, (v) => `translateX(${v * 100}%)`);

  // Gold ripple-of-light reveal
  const radius      = useMotionValue(0);
  const flashOpacity = useMotionValue(0);
  const maskImage   = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent calc(${radius}px - 26px), #000 ${radius}px)`;
  const wipeDiameter = useTransform(radius, (v) => v * 2);
  const wipeOpacity  = useTransform(radius, [0, 110, 900], [0, 0.85, 0]);

  const cancelledRef = useRef(false);

  useEffect(() => {
    document.body.classList.add("preloading");

    const finish = () => {
      setVisible(false);
      document.body.classList.remove("preloading");
    };

    if (reducedMotion) {
      rotateY.set(0);
      coinScale.set(1);
      coinOpacity.set(1);
      wordOpacity.set(1);
      const t = setTimeout(finish, 600);
      return () => {
        clearTimeout(t);
        document.body.classList.remove("preloading");
      };
    }

    (async () => {
      // 1 — Spin in: fast whirl decelerating to a soft stop just past the XN face.
      //     The coin reaches full size + opacity early so the XN↔shield flips read
      //     while it's still turning; the ease keeps motion visible, not front-loaded.
      animate(coinOpacity, 1, { duration: 0.18, ease: "easeOut" });
      animate(coinScale, 1, { duration: 0.55, ease: "easeOut" });
      animate(wordOpacity, 1, { duration: 0.7, delay: 0.6, ease: "easeOut" });
      await animate(rotateY, 6, { duration: 1.75, ease: [0.17, 0.67, 0.25, 1] });
      if (cancelledRef.current) return;

      // 2 — Strike: tiny rotational bounce settle + a light sweep catching the metal.
      animate(glareX, 1.5, { duration: 0.7, ease: "easeInOut" });
      await animate(rotateY, 0, { type: "spring", stiffness: 220, damping: 11 });
      if (cancelledRef.current) return;

      // 3 — Ripple of light: coin flares into an expanding gold wipe that uncovers the page.
      setRippling(true);
      animate(flashOpacity, [0, 0.65, 0], { duration: 0.5, ease: "easeOut" });
      animate(coinScale, 1.25, { duration: 0.5, ease: "easeOut" });
      animate(coinOpacity, 0, { duration: 0.4, ease: "easeIn" });
      animate(wordOpacity, 0, { duration: 0.35, ease: "easeIn" });
      const maxRadius = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 60;
      await animate(radius, maxRadius, { duration: 1.2, ease: [0.4, 0, 0.2, 1] });
      if (cancelledRef.current) return;

      finish();
    })();

    return () => {
      cancelledRef.current = true;
      document.body.classList.remove("preloading");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* ── Layer A — dark overlay, punched open by the growing light ring ── */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          background: "var(--bg-primary)",
          WebkitMaskImage: reducedMotion ? undefined : maskImage,
          maskImage: reducedMotion ? undefined : maskImage,
          opacity: reducedMotion ? (visible ? 1 : 0) : 1,
          transition: reducedMotion ? "opacity 0.5s cubic-bezier(0.16,1,0.3,1)" : undefined,
        }}
      />

      {/* ── Layer B — the coin + wordmark, floating above the overlay ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* Opacity lives on this flat perspective wrapper — NOT on the coin —
            because opacity < 1 on a preserve-3d element flattens it and breaks
            backface culling (front face would show mirrored mid-spin). */}
        <motion.div
          style={{
            perspective: "1500px",
            marginBottom: 34,
            opacity: reducedMotion ? 1 : coinOpacity,
          }}
        >
          <motion.div
            style={{
              width: COIN_SIZE,
              height: COIN_SIZE,
              position: "relative",
              transformStyle: "preserve-3d",
              rotateX: -12,
              rotateY: reducedMotion ? 0 : rotateY,
              scale: reducedMotion ? 1 : coinScale,
            }}
          >
            {/* Front — XN */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: `translateZ(${THICKNESS / 2}px)`,
              }}
            >
              <CoinDisc gradId="pl-face-front">
                <text x="60" y="74" textAnchor="middle" fontSize="34" fontWeight="800" letterSpacing="1"
                      fill="var(--bg-primary)" fillOpacity="0.88" fontFamily="var(--font-disp)">
                  XN
                </text>
              </CoinDisc>
              {/* Light sweep — clip-path (not overflow) so the face stays backface-cullable */}
              {!reducedMotion && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    clipPath: "circle(50% at 50% 50%)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <motion.div
                    style={{
                      position: "absolute",
                      top: "-50%",
                      left: 0,
                      width: "55%",
                      height: "200%",
                      background:
                        "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.6) 50%, transparent 65%)",
                      transform: glareTransform,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Back — shield mark (brand motif, in gold) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: `rotateY(180deg) translateZ(${THICKNESS / 2}px)`,
              }}
            >
              <CoinDisc gradId="pl-face-back">
                <g transform="translate(60,60) scale(1.5) translate(-24,-22)"
                   stroke="var(--bg-primary)" strokeOpacity="0.82" fill="none">
                  <path d="M24 3 L42 12.5 V31.5 L24 41 L6 31.5 V12.5 Z" strokeWidth="2.2" strokeLinejoin="round"
                        fill="rgba(10,10,14,0.07)" />
                  <circle cx="24" cy="22" r="5.2" fill="var(--bg-primary)" fillOpacity="0.82" stroke="none" />
                  <path d="M24 8 V14.5 M24 29.5 V36 M12 16 L17.5 19 M30.5 25 L36 28 M36 16 L30.5 19 M17.5 25 L12 28"
                        strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
                </g>
              </CoinDisc>
            </div>

            {/* Reeded edge */}
            {!reducedMotion && (
              <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transform: "rotateX(90deg)" }}>
                {Array.from({ length: EDGE_SEGMENTS }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: SEG_W,
                      height: THICKNESS,
                      marginLeft: -SEG_W / 2,
                      marginTop: -THICKNESS / 2,
                      transform: `rotateY(${i * SEG_ANGLE}deg) translateZ(${RADIUS}px)`,
                      background:
                        "linear-gradient(90deg, #5C4A2A, #C9A765 42%, #FBEFD6 52%, #5C4A2A)",
                      boxShadow: "inset -1px 0 rgba(0,0,0,0.4)",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Wordmark */}
        <motion.div
          style={{
            fontFamily: "var(--font-disp)",
            fontWeight: 700,
            fontSize: "clamp(20px,3.5vw,32px)",
            letterSpacing: "0.3em",
            color: "var(--gold)",
            textTransform: "uppercase",
            opacity: reducedMotion ? 1 : wordOpacity,
          }}
        >
          SECURITYNET.AI
        </motion.div>
        <motion.div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.25em",
            color: "var(--gold-dim)",
            textTransform: "uppercase",
            marginTop: 14,
            opacity: reducedMotion ? 1 : wordOpacity,
          }}
        >
          Initializing Secure Channel
        </motion.div>
      </div>

      {/* ── Layer C — light FX: leading glow ring, accent shockwaves, bloom ── */}
      {!reducedMotion && (
        <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 100001, pointerEvents: "none" }}>
          {/* Bloom flash at the strike */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(255,240,210,0.9), rgba(212,175,110,0.35) 35%, transparent 70%)",
              opacity: flashOpacity,
            }}
          />
          {/* Bright ring riding the wipe edge */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: wipeDiameter,
              height: wipeDiameter,
              x: "-50%",
              y: "-50%",
              borderRadius: "50%",
              border: "2px solid var(--gold-bright)",
              boxShadow: "0 0 50px 10px var(--gold-glow), inset 0 0 30px rgba(232,200,130,0.4)",
              opacity: wipeOpacity,
            }}
          />
          {/* Two trailing accent shockwaves */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: COIN_SIZE,
                height: COIN_SIZE,
                marginLeft: -COIN_SIZE / 2,
                marginTop: -COIN_SIZE / 2,
                borderRadius: "50%",
                border: "1px solid var(--gold)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={rippling ? { scale: 16, opacity: 0 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 1.2, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
            />
          ))}
        </div>
      )}
    </>
  );
}
