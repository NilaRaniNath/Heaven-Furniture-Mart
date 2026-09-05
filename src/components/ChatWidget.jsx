import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ───── Icons (inline SVGs to avoid extra deps) ───── */
const ChatIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const SendIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);

/* ───── Typing dots animation ───── */
const TypingDots = () => (
  <div style={{ display: "flex", gap: 4, padding: "8px 12px" }}>
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#B8925A",
          display: "inline-block",
        }}
      />
    ))}
  </div>
);

/* ───── Main Widget ───── */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm here to help with any questions about Heaven Furniture Mart's bespoke furniture and services.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ── Send message to backend proxy ── */
  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Map roles: Gemini expects "user" and "model"
      const history = [...messages, userMsg].map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) throw new Error("Backend error");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I can't connect right now. Please try again later or reach us on WhatsApp!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  /* ── Styles ── */
  const colors = {
    gold: "#B8925A",
    ivory: "#F5EFE6",
    teal: "#26373F",
    brown: "#3A2A1E",
    bubbleBot: "#E8E0D0",
    bubbleUser: "#B8925A",
  };

  return (
    <>
      {/* ─── Floating Action Button ─── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            aria-label="Open chat"
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 9999,
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "none",
              backgroundColor: colors.gold,
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(184,146,90,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChatIcon />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Chat Panel ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 9999,
              width: 360,
              height: 520,
              borderRadius: 16,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: `linear-gradient(135deg, ${colors.teal}, #1a2c30)`,
                color: "#fff",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: colors.gold,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  ✦
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    Ask Heaven
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>Online • Ready to help</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                backgroundColor: colors.ivory,
                padding: "12px 14px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {messages.map((msg, i) => {
                const isBot = msg.role === "assistant";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      alignSelf: isBot ? "flex-start" : "flex-end",
                      maxWidth: "82%",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: isBot ? colors.bubbleBot : colors.bubbleUser,
                        color: isBot ? colors.brown : "#fff",
                        borderRadius: isBot ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                        padding: "10px 14px",
                        fontSize: 13.5,
                        lineHeight: 1.5,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                      }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                );
              })}

              {loading && (
                <div style={{ alignSelf: "flex-start" }}>
                  <div
                    style={{
                      backgroundColor: colors.bubbleBot,
                      borderRadius: "4px 14px 14px 14px",
                      display: "inline-block",
                    }}
                  >
                    <TypingDots />
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Input */}
            <div
              style={{
                backgroundColor: "#fff",
                borderTop: `1px solid ${colors.bubbleBot}`,
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message…"
                disabled={loading}
                style={{
                  flex: 1,
                  border: `1px solid #ddd`,
                  borderRadius: 24,
                  padding: "8px 14px",
                  fontSize: 13.5,
                  fontFamily: "'Inter', sans-serif",
                  outline: "none",
                  backgroundColor: colors.ivory,
                  color: colors.brown,
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.gold)}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: loading || !input.trim() ? "#ccc" : colors.gold,
                  color: "#fff",
                  cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.2s",
                }}
              >
                <SendIcon />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
