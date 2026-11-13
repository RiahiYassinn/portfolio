import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Code2, Send, Sparkles } from "lucide-react";
import Button from "../ui/Button";

const knowledgeBase = [
  {
    keywords: ["experience", "background", "who are you", "about", "yassine"],
    answer:
      "I'm Yassine Riahi, a Computer Science Engineer and recent graduate focused on full-stack development and applied AI.",
  },
  {
    keywords: ["stack", "skills", "technologies", "tools", "languages", "tech"],
    answer:
      "Dev.Lab, my End-of-Studies Project, brings together Next.js, NestJS, FastAPI, Kafka, PostgreSQL, MongoDB and RAG. See the Skills section for more of my toolkit.",
  },
  {
    keywords: ["dev.lab", "devlab", "final project", "end-of-studies", "project", "work"],
    answer:
      "Dev.Lab is my End-of-Studies Project: an AI-powered application built with an event-driven microservices architecture and a stack spanning Next.js, NestJS, FastAPI, Kafka, PostgreSQL, MongoDB and RAG.",
  },
  {
    keywords: ["contact", "email", "reach", "hire", "availability", "available"],
    answer:
      "You can reach me through the Contact section below, or connect with me on LinkedIn and GitHub.",
  },
  {
    keywords: ["education", "study", "student", "school", "university", "degree", "graduate"],
    answer:
      "I graduated as a Computer Science Engineer. My education and certification details are in the Education section.",
  },
];

const DEFAULT_ANSWER =
  "I don't have that detail in my portfolio guide yet. The Contact section below is the best way to ask me directly.";

function findAnswer(question: string) {
  const query = question.toLowerCase();
  const best = knowledgeBase
    .map((entry) => ({
      entry,
      score: entry.keywords.reduce((score, keyword) => score + Number(query.includes(keyword)), 0),
    }))
    .sort((a, b) => b.score - a.score)[0];

  return best && best.score > 0 ? best.entry.answer : DEFAULT_ANSWER;
}

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

const Hero: FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setChatStarted(true);
    setMessages((previous) => [
      ...previous,
      { id: idRef.current++, role: "user", text: trimmed },
    ]);
    setInput("");
    setTyping(true);
    timeoutRef.current = setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        { id: idRef.current++, role: "assistant", text: findAnswer(trimmed) },
      ]);
      setTyping(false);
    }, 500);
  };

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[min(900px,100svh)] items-center overflow-hidden bg-light-500 pb-16 pt-28 dark:bg-dark-800 md:pb-20 md:pt-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-80 dark:opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 18%, rgba(99, 102, 241, .13), transparent 28rem), radial-gradient(circle at 12% 82%, rgba(20, 184, 166, .09), transparent 24rem)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary-300/70 to-transparent" />

      <div className="container mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <motion.div
          className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-light-600 bg-light-100/80 px-3.5 py-2 text-sm text-dark-500 shadow-sm dark:border-dark-400 dark:bg-dark-700/80 dark:text-light-200">
            <Code2 size={16} className="text-accent-600 dark:text-accent-400" />
            <span>Computer Science Engineer · Recent graduate</span>
          </div>

          <p className="mb-3 font-mono text-sm tracking-wide text-primary-600 dark:text-primary-300">
            Hello, I’m Yassine Riahi.
          </p>
          <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-dark-800 dark:text-light-100 sm:text-6xl lg:text-7xl">
            I build useful software <span className="text-primary-600 dark:text-primary-300">for the web.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-dark-400 dark:text-light-300 lg:mx-0">
            I work across full-stack development and applied AI, with a focus on
            thoughtful interfaces and well-structured systems. My End-of-Studies
            Project, Dev.Lab, brings those interests together.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button href="#projects" variant="primary" size="lg" className="inline-flex items-center justify-center gap-2 rounded-xl">
              Explore Dev.Lab <ArrowUpRight size={17} />
            </Button>
            <Button href="#contact" variant="outline" size="lg" className="inline-flex items-center justify-center rounded-xl border-primary-200 text-primary-700 hover:bg-primary-50 dark:border-primary-700 dark:text-primary-200 dark:hover:bg-primary-900/30">
              Get in touch
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-dark-300 dark:text-light-400 lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              Full-stack engineering
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-light-800 sm:block" />
            <span>Applied AI</span>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-md"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
        >
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-primary-300/25 via-transparent to-accent-300/25 blur-2xl" />
            <div className="overflow-hidden rounded-[1.6rem] border border-light-600/90 bg-light-100/95 shadow-2xl shadow-primary-900/10 dark:border-dark-400 dark:bg-dark-700/95 dark:shadow-black/20">
              <div className="flex items-center gap-3 border-b border-light-600 px-5 py-4 dark:border-dark-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-sm font-semibold tracking-wide text-white">
                  YR
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark-800 dark:text-light-100">Portfolio guide</p>
                  <p className="text-xs text-dark-300 dark:text-light-400">A quick way to explore my work</p>
                </div>
                <Sparkles className="ml-auto text-accent-600 dark:text-accent-400" size={18} aria-hidden="true" />
              </div>

              <div
                ref={scrollRef}
                className="h-64 space-y-3 overflow-y-auto px-4 py-4 sm:h-72"
                aria-live="polite"
                aria-label="Portfolio guide conversation"
              >
                <AnimatePresence initial={false}>
                  {!chatStarted && (
                    <motion.p
                      key="welcome"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mr-auto max-w-[88%] rounded-2xl rounded-bl-md border border-light-600 bg-light-300 px-4 py-3 text-sm leading-6 text-dark-500 dark:border-dark-400 dark:bg-dark-600 dark:text-light-200"
                    >
                      Ask about my background, skills, or End-of-Studies Project.
                    </motion.p>
                  )}
                  {messages.map((message) => (
                    <motion.p
                      key={message.id}
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.role === "user"
                          ? "ml-auto rounded-br-md bg-primary-600 text-white"
                          : "mr-auto rounded-bl-md border border-light-600 bg-light-300 text-dark-500 dark:border-dark-400 dark:bg-dark-600 dark:text-light-200"
                      }`}
                    >
                      {message.text}
                    </motion.p>
                  ))}
                  {typing && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex w-fit gap-1.5 rounded-2xl rounded-bl-md border border-light-600 bg-light-300 px-4 py-3 dark:border-dark-400 dark:bg-dark-600"
                      role="status"
                      aria-label="Preparing a reply"
                    >
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          className="h-1.5 w-1.5 rounded-full bg-primary-500"
                          animate={{ opacity: [0.35, 1, 0.35] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.12 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {!chatStarted && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["Tell me about Dev.Lab", "Tech stack?", "Education?"].map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => send(suggestion)}
                        className="rounded-full border border-primary-200 px-3 py-1.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 dark:border-primary-700 dark:text-primary-200 dark:hover:bg-primary-900/40"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 border-t border-light-600 p-3 dark:border-dark-400"
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask a question…"
                  aria-label="Ask the portfolio guide a question"
                  className="min-w-0 flex-1 rounded-full bg-light-300 px-4 py-3 text-sm text-dark-800 outline-none transition-shadow placeholder:text-dark-300 focus:ring-2 focus:ring-primary-400 dark:bg-dark-600 dark:text-light-100 dark:placeholder:text-light-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Send question"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={17} aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full p-2 text-dark-300 transition-colors hover:text-primary-600 dark:text-light-400 dark:hover:text-accent-300"
      >
        <ArrowDown size={19} aria-hidden="true" />
      </a>
    </section>
  );
};

export default Hero;
