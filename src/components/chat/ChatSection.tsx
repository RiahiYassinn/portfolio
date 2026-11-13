import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircleQuestion } from "lucide-react";

/* ── Edit this knowledge base — the chat answers from here ────────── */
const knowledgeBase = [
  {
    keywords: [
      "experience",
      "internship",
      "worked",
      "background",
      "who are you",
      "about",
    ],
    answer:
      "I'm Yassine Riahi, a Computer Science Engineer and recent graduate focused on full-stack development and applied AI.",
  },
  {
    keywords: ["stack", "skills", "technologies", "tools", "languages", "tech"],
    answer:
      "My End-of-Studies Project, Dev.Lab, uses Next.js, NestJS, FastAPI, Kafka, PostgreSQL, MongoDB, and RAG. See the Skills section for more of my toolkit.",
  },
  {
    keywords: ["project", "built", "portfolio", "work"],
    answer:
      "Dev.Lab is my End-of-Studies Project: an AI-powered project built with an event-driven microservices architecture. More projects and their technology stacks are in the Projects section.",
  },
  {
    keywords: [
      "contact",
      "email",
      "reach",
      "hire",
      "availability",
      "available",
    ],
    answer:
      "Use the Contact section or the email and social links below to get in touch.",
  },
  {
    keywords: [
      "education",
      "study",
      "student",
      "school",
      "university",
      "degree",
    ],
    answer:
      "I graduated as a Computer Science Engineer. My education and certification details are in the Education section.",
  },
];

const DEFAULT_ANSWER =
  "I don't have that detail in my portfolio guide yet. Use the Contact section below to ask me directly.";

function findAnswer(question: string): string {
  const q = question.toLowerCase();
  const best = knowledgeBase
    .map((entry) => ({
      entry,
      score: entry.keywords.reduce(
        (acc, k) => acc + (q.includes(k) ? 1 : 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score)[0];
  return best && best.score > 0 ? best.entry.answer : DEFAULT_ANSWER;
}
/* ─────────────────────────────────────────────────────────────────── */

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

const ChatSection: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hi! I'm Yassine's portfolio guide. Ask about his skills, projects, or education.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  const suggestions = useMemo(
    () => [
      "Tell me about Dev.Lab",
      "What's the tech stack?",
      "Tell me about his projects",
      "What's his background?",
    ],
    [],
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: idRef.current++, role: "user", text: trimmed },
    ]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: idRef.current++, role: "assistant", text: findAnswer(trimmed) },
      ]);
      setTyping(false);
    }, 700);
  };

  return (
    <section
      id="chat"
      className="min-h-screen flex items-center py-20 relative"
    >
      {/* Soft background, matches hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-light-200 to-light-500 dark:from-dark-600 dark:to-dark-500 -z-10" />

      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
        {/* Section header */}
        <motion.p
          className="text-accent-500 font-mono mb-4 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Have a question?
        </motion.p>

        <motion.h2
          className="text-3xl md:text-5xl font-bold text-primary-500 dark:text-light-100 mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Ask Me Anything
        </motion.h2>

        <motion.p
          className="text-dark-400 dark:text-light-400 max-w-xl mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Use the portfolio guide to explore my background, skills, and projects.
        </motion.p>

        {/* Centered chat card */}
        <motion.div
          className="w-full max-w-2xl rounded-2xl border border-light-600 dark:border-dark-400 bg-light-100 dark:bg-dark-600 shadow-2xl shadow-dark-900/10 flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ height: "520px" }}
        >
          {/* Header */}
          <div className="px-5 py-4 bg-primary-500 text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
              YR
            </div>
            <div>
              <p className="font-semibold">Ask me about Yassine</p>
              <p className="text-xs text-white/80 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-400 inline-block" />
                Online — replies instantly
              </p>
            </div>
            <MessageCircleQuestion className="ml-auto opacity-70" size={22} />
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-5 py-5 space-y-3 bg-light-200 dark:bg-dark-700"
          >
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-primary-500 text-white rounded-br-md"
                    : "mr-auto bg-light-100 dark:bg-dark-500 text-dark-800 dark:text-light-200 rounded-bl-md border border-light-600 dark:border-dark-400"
                }`}
              >
                {m.text}
              </motion.div>
            ))}

            {typing && (
              <div className="mr-auto bg-light-100 dark:bg-dark-500 border border-light-600 dark:border-dark-400 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5 w-fit">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 rounded-full bg-dark-300 dark:bg-light-300"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            )}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-primary-300 dark:border-primary-700 text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="px-4 py-4 bg-light-100 dark:bg-dark-600 border-t border-light-600 dark:border-dark-400 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 bg-light-300 dark:bg-dark-700 text-sm text-dark-800 dark:text-light-200 placeholder-dark-300 dark:placeholder-light-400 px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-primary-400 transition-shadow"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-11 h-11 rounded-full bg-primary-500 hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatSection;
