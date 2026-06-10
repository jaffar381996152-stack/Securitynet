"use client";
import { useEffect, useRef, useState } from "react";

export default function DeclassifyText({ text, tag: Tag = "span", style = {}, className = "", delay = 0 }) {
  const ref     = useRef(null);
  const [chars, setChars]   = useState(() => text.split(""));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const original = text.split("");
    // Mask all non-space chars to █
    setChars(original.map((c) => (c === " " ? " " : "█")));

    const ids = [];
    let idx = 0;
    original.forEach((char, i) => {
      if (char === " ") return;
      const id = setTimeout(() => {
        setChars((prev) => { const n = [...prev]; n[i] = char; return n; });
      }, delay * 1000 + idx * 38);
      idx++;
      ids.push(id);
    });
    return () => ids.forEach(clearTimeout);
  }, [started, text, delay]);

  return (
    <Tag ref={ref} className={className} style={{ display: "inline", ...style }} aria-label={text}>
      {chars.map((char, i) => (
        <span key={i} aria-hidden="true" style={{ display: "inline" }}>
          {char}
        </span>
      ))}
    </Tag>
  );
}
