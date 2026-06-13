"use client";
import { useEffect, useRef, useState } from "react";

const WELCOME = {
  role: "assistant",
  content:
    "Hi! I'm Secura AI, your SecurityNet assistant. Ask me anything about XN, the presale, tokenomics, security, or how to buy — I can answer in any language.",
};

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, padding: "10px 12px" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--gold)",
            display: "inline-block",
            animation: "ubPulse 1s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "88%",
        background: isUser ? "var(--gold)" : "var(--bg-tertiary)",
        color: isUser ? "var(--text-inv)" : "var(--text-primary)",
        border: isUser ? "none" : "1px solid var(--border-sub)",
        borderRadius: 2,
        padding: "9px 12px",
        fontFamily: "var(--font-disp)",
        fontSize: 13,
        lineHeight: 1.55,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {msg.content}
    </div>
  );
}

export default function AiAgentBot() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open, streaming]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const [hintVisible, setHintVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHintVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  const bottom = isMobile ? 20 : 32;

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const history = [...messages, { role: "user", content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: acc };
          return next;
        });
      }
    } catch (err) {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: err?.message || "Sorry, I'm having trouble responding right now. Please try again shortly.",
        };
        return next;
      });
    } finally {
      setStreaming(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const lastMsg = messages[messages.length - 1];
  const showTyping = streaming && lastMsg?.role === "assistant" && lastMsg.content === "";

  return (
    <>
      {!open && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            bottom: bottom + 14,
            right: 84,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 16px",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-gold)",
            borderRadius: 999,
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            whiteSpace: "nowrap",
            zIndex: 5999,
            pointerEvents: "none",
            opacity: hintVisible ? 1 : 0,
            transform: hintVisible ? "translateX(0)" : "translateX(8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <rect x="3" y="8" width="18" height="12" rx="2" />
            <path d="M12 8V4" />
            <circle cx="12" cy="3" r="1" />
            <circle cx="8.5" cy="14" r="1.5" fill="var(--gold)" stroke="none" />
            <circle cx="15.5" cy="14" r="1.5" fill="var(--gold)" stroke="none" />
            <path d="M8 18h8" />
          </svg>
          <span style={{ fontFamily: "var(--font-disp)", fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
            Ask me anything
          </span>
          {/* Speech-bubble pointer toward the floating icon */}
          <span
            style={{
              position: "absolute",
              right: -7,
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "7px solid transparent",
              borderBottom: "7px solid transparent",
              borderLeft: "7px solid var(--border-gold)",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: -6,
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: "6px solid var(--bg-secondary)",
            }}
          />
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="AI Agent"
        data-cursor="cta"
        style={{
          position: "fixed",
          bottom,
          right: 16,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "var(--gold)",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 6000,
          boxShadow: "0 4px 24px rgba(212,175,110,0.35)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--text-inv)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8" width="18" height="12" rx="2" />
          <path d="M12 8V4" />
          <circle cx="12" cy="3" r="1" />
          <circle cx="8.5" cy="14" r="1.5" fill="var(--text-inv)" />
          <circle cx="15.5" cy="14" r="1.5" fill="var(--text-inv)" />
          <path d="M8 18h8" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: bottom + 68,
            right: 16,
            width: "min(360px, calc(100vw - 32px))",
            height: "min(520px, 70vh)",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-gold)",
            zIndex: 6000,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 16px",
              borderBottom: "1px solid var(--border-sub)",
              flexShrink: 0,
            }}
          >
            <div style={{ position: "relative", width: 32, height: 32, flexShrink: 0 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "var(--gold-ghost)",
                  border: "1px solid var(--border-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="8" width="18" height="12" rx="2" />
                  <path d="M12 8V4" />
                  <circle cx="12" cy="3" r="1" />
                  <circle cx="8.5" cy="14" r="1.5" fill="var(--gold)" stroke="none" />
                  <circle cx="15.5" cy="14" r="1.5" fill="var(--gold)" stroke="none" />
                  <path d="M8 18h8" />
                </svg>
              </div>
              <span
                style={{
                  position: "absolute",
                  bottom: -1,
                  right: -1,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--c-success)",
                  border: "2px solid var(--bg-secondary)",
                  display: "inline-block",
                  animation: "ubPulse 1.8s ease-in-out infinite",
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                SECURA AI
              </div>
              <div
                style={{
                  fontFamily: "var(--font-disp)",
                  fontSize: 11,
                  color: "var(--text-muted)",
                  marginTop: 2,
                }}
              >
                Ask me anything
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                fontSize: 16,
                lineHeight: 1,
                padding: 4,
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            data-lenis-prevent
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              padding: "14px 16px",
            }}
          >
            {messages.map((m, i) => (
              <MessageBubble key={i} msg={m} />
            ))}
            {showTyping && <TypingDots />}
          </div>

          {/* Input row */}
          <div
            style={{
              display: "flex",
              gap: 8,
              padding: "12px 16px",
              borderTop: "1px solid var(--border-sub)",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question…"
              disabled={streaming}
              style={{
                flex: 1,
                minWidth: 0,
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-sub)",
                padding: "10px 12px",
                fontFamily: "var(--font-disp)",
                fontSize: 13,
                color: "var(--text-primary)",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border-sub)")}
            />
            <button
              onClick={sendMessage}
              disabled={streaming || !input.trim()}
              aria-label="Send"
              style={{
                width: 40,
                height: 40,
                flexShrink: 0,
                background: "var(--gold)",
                border: "none",
                cursor: streaming || !input.trim() ? "default" : "pointer",
                opacity: streaming || !input.trim() ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "opacity 0.2s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-inv)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
