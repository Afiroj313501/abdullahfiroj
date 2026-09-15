import { AnimatePresence, motion } from "framer-motion";
import type { FormEvent } from "react";
import { useState } from "react";

type Message = { role: "user" | "assistant"; text: string; link?: string };

const QUICK_QUESTIONS = ["What does Abdullah build?", "Tell me about his research.", "Can I see his resume?"];

export default function AskAbdullah() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Ask me about Abdullah's work, research, skills, or resume." },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = async (event?: FormEvent) => {
    event?.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isLoading) return;

    setMessages((current) => [...current, { role: "user", text: trimmedQuestion }]);
    setQuestion("");
    setIsLoading(true);

    if (/\b(resume|cv|curriculum vitae)\b/i.test(trimmedQuestion)) {
      setMessages((current) => [...current, { role: "assistant", text: "Here is Abdullah's resume.", link: "/resume.html" }]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmedQuestion }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok) throw new Error(data.error || "The assistant could not answer right now.");
      setMessages((current) => [...current, { role: "assistant", text: data.answer || "I could not find an answer." }]);
    } catch (error) {
      setMessages((current) => [...current, {
        role: "assistant",
        text: error instanceof Error ? error.message : "The assistant is temporarily unavailable.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside id="ask" className="ask-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            className="ask-popup"
          >
            <div className="ask-popup-header">
              <div><span className="ask-status-dot" /><strong>Ask Abdullah AI</strong></div>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close Ask AI">×</button>
            </div>
            <div className="ask-messages" aria-live="polite">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`ask-message ${message.role === "user" ? "ask-message-user" : "ask-message-assistant"}`}
                >
                  <span className="ask-message-label">{message.role === "user" ? "You" : "Abdullah AI"}</span>
                  <p>{message.text} {message.link && <a href={message.link} target="_blank" rel="noreferrer">Open resume ↗</a>}</p>
                </motion.div>
              ))}
              {isLoading && <div className="ask-thinking">Thinking<span>...</span></div>}
            </div>
            <div className="ask-prompts">
              {QUICK_QUESTIONS.map((prompt) => (
                <button key={prompt} type="button" onClick={() => setQuestion(prompt)}>{prompt}</button>
              ))}
            </div>
            <form className="ask-form" onSubmit={askQuestion}>
              <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask anything..." aria-label="Ask about Abdullah" maxLength={500} />
              <button type="submit" disabled={isLoading || !question.trim()} aria-label="Send question">↗</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button type="button" className="ask-launcher" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen}>
        <span className="ask-launcher-pulse" />
        <span>{isOpen ? "Close" : "Ask AI"}</span>
        <span aria-hidden="true">✦</span>
      </button>
    </aside>
  );
}
