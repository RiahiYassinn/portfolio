import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";
import Button from "../ui/Button";
import GuideCharacter from "../chat/GuideCharacter";
import { useLanguage } from "../../i18n/LanguageContext";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

interface SpeechRecognitionResultLike {
  0?: { transcript?: string };
}

interface SpeechRecognitionResultEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionResultEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;
type WindowWithSpeechRecognition = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

interface MatchReport {
  matchPercentage: number;
  roleTitle: string;
  summary: string;
  matchingSkills: string[];
  missingOrGaps: string[];
  projectAlignment: string;
}

interface JobMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper to parse markdown formatting from the AI response into structured JSX elements
const renderFormattedMessage = (text: string) => {
  if (text.includes("*") || text.includes("-")) {
    const parts = text.split(/(?=\*\*[\w\s]+\*\*[:]?)/g);

    return (
      <div className="space-y-2 text-left">
        {parts.map((part, idx) => {
          const trimmed = part.trim();
          if (!trimmed) return null;

          const match = trimmed.match(/^\*\*([^*]+)\*\*[:]?\s*(.*)$/);
          if (match) {
            const [, title, content] = match;
            return (
              <div key={idx} className="mb-1.5">
                <span className="font-semibold text-primary-600 dark:text-primary-300">
                  {title}:
                </span>{" "}
                <span className="text-dark-600 dark:text-light-200">
                  {content.replace(/^[*\-]\s*/, "")}
                </span>
              </div>
            );
          }

          if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
            return (
              <div key={idx} className="ml-1 flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                <span className="flex-1">
                  {trimmed.replace(/^[*\-]\s*/, "")}
                </span>
              </div>
            );
          }

          return <p key={idx}>{trimmed}</p>;
        })}
      </div>
    );
  }

  return <p>{text}</p>;
};

const JobMatchModal: FC<JobMatchModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<MatchReport | null>(null);
  const [error, setError] = useState("");

  const handleMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jd.trim() || loading) return;

    setLoading(true);
    setError("");
    setReport(null);

    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jd, language }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) {
        throw new Error(data?.error || `Matching failed (${res.status}).`);
      }
      setReport(data.report);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("match.error"));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-light-600 bg-light-100 p-6 shadow-2xl dark:border-dark-400 dark:bg-dark-700 sm:p-8"
        >
          <button
            onClick={onClose}
            aria-label={t("match.close")}
            className="absolute right-5 top-5 rounded-full p-2 text-dark-400 transition hover:bg-light-300 dark:text-light-300 dark:hover:bg-dark-600"
          >
            <X size={20} />
          </button>

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600/10 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-dark-800 dark:text-light-100">
                {t("match.title")}
              </h2>
              <p className="text-xs text-dark-300 dark:text-light-400">
                {t("match.subtitle")}
              </p>
            </div>
          </div>

          {!report ? (
            <form onSubmit={handleMatch} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dark-500 dark:text-light-300">
                  {t("match.label")}
                </label>
                <textarea
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  rows={6}
                  placeholder={t("match.placeholder")}
                  className="w-full rounded-2xl border border-light-600 bg-white p-4 text-sm text-dark-800 outline-none transition focus:ring-2 focus:ring-primary-500 dark:border-dark-400 dark:bg-dark-600 dark:text-light-100"
                />
              </div>

              {error && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  {t("match.cancel")}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading || !jd.trim()}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> {t("match.loading")}
                    </>
                  ) : (
                    <>{t("match.submit")}</>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary-200 bg-primary-50/50 p-5 dark:border-primary-800 dark:bg-primary-950/30">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                    {t("match.role")}
                  </span>
                  <h3 className="text-lg font-bold text-dark-800 dark:text-light-100">
                    {report.roleTitle}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-white shadow-md">
                    <span className="text-lg font-bold">
                      {report.matchPercentage}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-dark-400 dark:text-light-400">
                  {t("match.assessment")}
                </h4>
                <p className="text-sm leading-relaxed text-dark-600 dark:text-light-200">
                  {report.summary}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-light-600 bg-white p-4 dark:border-dark-400 dark:bg-dark-600">
                  <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={15} /> {t("match.skills")}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {report.matchingSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-light-600 bg-white p-4 dark:border-dark-400 dark:bg-dark-600">
                  <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    <AlertCircle size={15} /> {t("match.gaps")}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {report.missingOrGaps.length > 0 ? (
                      report.missingOrGaps.map((gap, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                        >
                          {gap}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-dark-400 dark:text-light-400">
                        {t("match.noGaps")}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-dark-400 dark:text-light-400">
                  {t("match.projects")}
                </h4>
                <p className="text-sm leading-relaxed text-dark-600 dark:text-light-200">
                  {report.projectAlignment}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="primary" onClick={() => setReport(null)}>
                  {t("match.again")}
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const Hero: FC = () => {
  const { t, language } = useLanguage();
  const recruiterSuggestions = [
    t("suggestion.devLab"),
    t("suggestion.stack"),
    t("suggestion.quality"),
    t("suggestion.remote"),
  ];
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceInputError, setVoiceInputError] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlsRef = useRef(new Map<string, string>());
  const speechRequestRef = useRef(0);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const voiceInputBaseRef = useRef("");
  const voiceEnabledRef = useRef(voiceEnabled);
  voiceEnabledRef.current = voiceEnabled;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(
    () => () => {
      audioRef.current?.pause();
      recognitionRef.current?.abort();
      recognitionRef.current = null;
      for (const url of audioUrlsRef.current.values()) URL.revokeObjectURL(url);
      audioUrlsRef.current.clear();
    },
    [],
  );

  const stopSpeech = () => {
    speechRequestRef.current += 1;
    const audio = audioRef.current;
    if (audio) {
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
      audio.currentTime = 0;
    }
    audioRef.current = null;
    setSpeaking(false);
    setVoiceLoading(false);
  };

  const toggleVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    const browserWindow = window as WindowWithSpeechRecognition;
    const Recognition =
      browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceInputError(t("voice.unsupported"));
      return;
    }

    const recognition = new Recognition();
    recognition.lang = language === "fr" ? "fr-FR" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    voiceInputBaseRef.current = input.trim();
    setVoiceInputError("");
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript || "")
        .join(" ")
        .trim();
      setInput(
        [voiceInputBaseRef.current, transcript].filter(Boolean).join(" "),
      );
    };
    recognition.onerror = (event) => {
      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        setVoiceInputError(t("voice.denied"));
      } else if (event.error === "no-speech") {
        setVoiceInputError(t("voice.noSpeech"));
      } else if (event.error !== "aborted") {
        setVoiceInputError(t("voice.failed"));
      }
    };
    recognition.onend = () => {
      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
        setListening(false);
      }
    };

    recognitionRef.current = recognition;
    setListening(true);
    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setListening(false);
      setVoiceInputError(t("voice.failed"));
    }
  };

  const speakAnswer = async (text: string, messageId?: number) => {
    stopSpeech();
    const requestId = speechRequestRef.current;
    setSpeechError("");
    setVoiceLoading(true);

    try {
      let audioUrl =
        messageId === undefined
          ? undefined
          : audioUrlsRef.current.get(String(messageId));

      if (!audioUrl) {
        const response = await fetch("/api/speech", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new Error(
            error.error || `ElevenLabs request failed (${response.status}).`,
          );
        }
        if (requestId !== speechRequestRef.current) return;

        audioUrl = URL.createObjectURL(await response.blob());
        if (messageId !== undefined) {
          audioUrlsRef.current.set(String(messageId), audioUrl);
          if (audioUrlsRef.current.size > 12) {
            const oldestId = audioUrlsRef.current.keys().next().value;
            if (oldestId !== undefined) {
              URL.revokeObjectURL(audioUrlsRef.current.get(oldestId)!);
              audioUrlsRef.current.delete(oldestId);
            }
          }
        }
      }

      const audio = new Audio(audioUrl);
      if (requestId !== speechRequestRef.current) return;
      audioRef.current = audio;
      audio.onplay = () => setSpeaking(true);
      audio.onended = () => {
        if (audioRef.current === audio) {
          audioRef.current = null;
          setSpeaking(false);
        }
      };
      audio.onerror = () => {
        if (audioRef.current === audio) {
          audioRef.current = null;
          setSpeaking(false);
          setSpeechError(
            t("voice.playbackFailed"),
          );
        }
      };
      await audio.play();
    } catch (error) {
      if (requestId !== speechRequestRef.current) return;
      setSpeaking(false);
      setSpeechError(
        error instanceof Error
          ? error.message
          : "ElevenLabs speech generation failed.",
      );
    } finally {
      if (requestId === speechRequestRef.current) setVoiceLoading(false);
    }
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    recognitionRef.current?.stop();
    stopSpeech();
    setChatStarted(true);
    const userMessage = {
      id: idRef.current++,
      role: "user" as const,
      text: trimmed,
    };
    const conversation = [
      ...messages
        .slice(-15)
        .map(({ role, text: content }) => ({ role, content })),
      { role: "user" as const, content: trimmed },
    ];
    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation, language }),
      });
      const result = await response.json();
      if (!response.ok || typeof result.answer !== "string") {
        throw new Error(result.error || "Chat request failed.");
      }

      const answer = result.answer.trim();
      const assistantId = idRef.current++;
      setMessages((previous) => [
        ...previous,
        { id: assistantId, role: "assistant", text: answer },
      ]);
      if (voiceEnabledRef.current) void speakAnswer(answer, assistantId);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          id: idRef.current++,
          role: "assistant",
          text: t("chat.error"),
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[min(900px,100svh)] items-center overflow-hidden bg-light-500/55 pb-16 pt-28 dark:bg-dark-800/50 md:pb-20 md:pt-32"
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

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Intro */}
          <motion.div
            className="w-full text-center lg:text-left"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-light-600 bg-light-100/80 px-3.5 py-2 text-sm text-dark-500 shadow-sm dark:border-dark-400 dark:bg-dark-700/80 dark:text-light-200">
              <Code2
                size={16}
                className="text-accent-600 dark:text-accent-400"
              />
              <span>{t("hero.degree")}</span>
            </div>

            <p className="mb-3 font-mono text-sm tracking-wide text-primary-600 dark:text-primary-300">
              {t("hero.hello")}
            </p>
            <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-dark-800 dark:text-light-100 sm:text-5xl lg:text-6xl">
              {t("hero.title")} {" "}
              <span className="text-primary-600 dark:text-primary-300">
                {t("hero.titleAccent")}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-dark-400 dark:text-light-300 lg:mx-0">
              {t("hero.description")}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button
                href="#projects"
                variant="primary"
                size="lg"
                className="inline-flex items-center justify-center gap-2 rounded-xl"
              >
                {t("hero.work")} <ArrowUpRight size={17} />
              </Button>
              <Button
                href="#contact"
                variant="outline"
                size="lg"
                className="inline-flex items-center justify-center rounded-xl border-primary-200 text-primary-700 hover:bg-primary-50 dark:border-primary-700 dark:text-primary-200 dark:hover:bg-primary-900/30"
              >
                {t("hero.contact")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsMatchModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-accent-300 text-accent-700 hover:bg-accent-50 dark:border-accent-700 dark:text-accent-300 dark:hover:bg-accent-950/30"
              >
                {t("hero.match")}
              </Button>
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-dark-300 dark:text-light-400 lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                {t("hero.fullStack")}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                {t("hero.ai")}
              </span>
            </div>
          </motion.div>

          {/* Right Column: Original Size Chat Container with Scroll & Suggestions */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-primary-300/30 via-transparent to-accent-300/30 blur-2xl"
              />

              <div className="grid overflow-hidden rounded-[1.7rem] border border-light-600/90 bg-light-100/95 shadow-2xl shadow-primary-900/10 dark:border-dark-400 dark:bg-dark-700/95 dark:shadow-black/20 md:min-h-[570px] md:grid-cols-[minmax(220px,0.78fr)_minmax(0,1.22fr)]">
                {/* Character Guide Sidebar */}
                <aside className="relative flex min-h-[250px] flex-col items-center justify-center overflow-hidden bg-primary-50 px-5 py-6 dark:bg-dark-800 sm:min-h-[280px] md:min-h-[570px] md:px-6">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(99,102,241,0.2),transparent_58%)] dark:bg-[radial-gradient(circle_at_50%_42%,rgba(99,102,241,0.28),transparent_58%)]"
                  />
                  <div className="relative flex w-full items-center justify-center">
                    <div className="h-44 w-44 sm:h-52 sm:w-52 md:h-60 md:w-60">
                      <GuideCharacter
                        state={
                          typing ? "thinking" : speaking ? "speaking" : "idle"
                        }
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  <div className="relative mt-2 text-center">
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 text-xs font-medium text-dark-500 shadow-sm dark:border-dark-400 dark:bg-dark-700/80 dark:text-light-200">
                      <span
                        className={`h-2 w-2 rounded-full ${typing ? "animate-pulse bg-amber-400" : speaking ? "animate-pulse bg-accent-500" : "bg-accent-500"}`}
                      />
                      {typing
                        ? t("chat.thinking")
                        : speaking
                          ? t("chat.speaking")
                          : t("chat.ready")}
                    </div>
                    <p className="text-lg font-semibold text-dark-800 dark:text-light-100">
                      {t("chat.guide")}
                    </p>
                    <p className="mt-1 text-xs text-dark-300 dark:text-light-400">
                      {t("chat.aboutYassine")}
                    </p>
                  </div>
                  <Sparkles
                    className="absolute right-5 top-5 text-accent-600/80 dark:text-accent-300"
                    size={18}
                    aria-hidden="true"
                  />
                </aside>

                {/* Chat Panel Window */}
                <div className="flex h-[480px] min-w-0 flex-col md:h-[570px]">
                  {/* Header */}
                  <header className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-light-600 px-4 py-4 dark:border-dark-400 sm:px-5">
                    <div>
                      <p className="text-sm font-semibold text-dark-800 dark:text-light-100">
                        {t("chat.askExperience")}
                      </p>
                      <p className="mt-0.5 text-xs text-dark-300 dark:text-light-400">
                        {t("chat.skillsProjects")}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const nextEnabled = !voiceEnabled;
                          setVoiceEnabled(nextEnabled);
                          if (!nextEnabled) stopSpeech();
                        }}
                        aria-pressed={voiceEnabled}
                        aria-label={voiceEnabled ? t("chat.voiceRepliesOn") : t("chat.voiceRepliesOff")}
                        title={
                          voiceEnabled
                            ? t("chat.voiceOnTitle")
                            : t("chat.voiceOffTitle")
                        }
                        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-light-600 bg-white/70 px-3 py-2 text-xs font-medium text-dark-500 transition hover:border-primary-300 hover:text-primary-700 dark:border-dark-400 dark:bg-dark-600 dark:text-light-200 dark:hover:text-light-100"
                      >
                        {voiceEnabled ? (
                          <Volume2 size={16} aria-hidden="true" />
                        ) : (
                          <VolumeX size={16} aria-hidden="true" />
                        )}
                        <span className="hidden sm:inline">
                          {voiceEnabled ? t("chat.voiceOn") : t("chat.voiceOff")}
                        </span>
                      </button>
                    </div>
                  </header>

                  {speechError && (
                    <p
                      role="alert"
                      className="shrink-0 border-b border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300 sm:px-5"
                    >
                      {speechError}
                    </p>
                  )}
                  {voiceLoading && (
                    <p
                      role="status"
                      className="shrink-0 border-b border-primary-200/70 bg-primary-50/60 px-4 py-2 text-xs text-primary-700 dark:border-primary-900/50 dark:bg-primary-950/20 dark:text-primary-200 sm:px-5"
                    >
                      {t("chat.generatingVoice")}
                    </p>
                  )}

                  {/* Scrollable Message History Area */}
                  <div
                    ref={scrollRef}
                    className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5"
                    aria-live="polite"
                    aria-label={t("chat.guide")}
                  >
                    <AnimatePresence initial={false}>
                      {!chatStarted && (
                        <motion.p
                          key="welcome"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mr-auto max-w-[92%] rounded-2xl rounded-bl-md border border-light-600 bg-light-300 px-4 py-3 text-sm leading-6 text-dark-500 dark:border-dark-400 dark:bg-dark-600 dark:text-light-200"
                        >
                          {t("chat.welcome")}
                        </motion.p>
                      )}
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className={`flex max-w-[94%] items-end gap-2 rounded-2xl px-4 py-3 text-sm leading-6 ${
                            message.role === "user"
                              ? "ml-auto rounded-br-md bg-primary-600 text-white shadow-sm"
                              : "mr-auto rounded-bl-md border border-light-600 bg-light-300 text-dark-500 shadow-sm dark:border-dark-400 dark:bg-dark-600 dark:text-light-200"
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            {message.role === "assistant"
                              ? renderFormattedMessage(message.text)
                              : message.text}
                          </div>
                          {message.role === "assistant" && (
                            <button
                              type="button"
                              onClick={() =>
                                void speakAnswer(message.text, message.id)
                              }
                              aria-label={t("chat.readAloud")}
                              title={t("chat.readAloud")}
                              className="mb-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-primary-600 transition hover:bg-primary-100 dark:text-primary-300 dark:hover:bg-dark-500"
                            >
                              <Volume2 size={16} aria-hidden="true" />
                            </button>
                          )}
                        </motion.div>
                      ))}
                      {typing && (
                        <motion.div
                          key="typing"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex w-fit gap-1.5 rounded-2xl rounded-bl-md border border-light-600 bg-light-300 px-4 py-3 dark:border-dark-400 dark:bg-dark-600"
                          role="status"
                            aria-label={t("chat.preparing")}
                        >
                          {[0, 1, 2].map((dot) => (
                            <motion.span
                              key={dot}
                              className="h-1.5 w-1.5 rounded-full bg-primary-500"
                              animate={{ opacity: [0.35, 1, 0.35] }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: dot * 0.12,
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Recruiter Suggestion Chips Re-shown after every response */}
                    {!typing && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {recruiterSuggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => send(suggestion)}
                            className="rounded-full border border-primary-200 bg-white/60 px-3.5 py-1.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 dark:border-primary-700 dark:bg-dark-700 dark:text-primary-200 dark:hover:bg-primary-900/40"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Input Form Footer */}
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      send(input);
                    }}
                    className="flex shrink-0 items-center gap-2 border-t border-light-600 bg-white/50 p-3 dark:border-dark-400 dark:bg-dark-700/70 sm:p-4"
                  >
                    <input
                      value={input}
                      onChange={(event) => {
                        setInput(event.target.value);
                        setVoiceInputError("");
                      }}
                      placeholder={
                        listening
                          ? t("chat.listening")
                          : t("chat.placeholder")
                      }
                      aria-label={t("chat.askGuide")}
                      className="min-w-0 flex-1 rounded-2xl border border-light-600 bg-light-100 px-4 py-3 text-sm text-dark-800 outline-none transition-shadow placeholder:text-dark-300 focus:ring-2 focus:ring-primary-400 dark:border-dark-400 dark:bg-dark-600 dark:text-light-100 dark:placeholder:text-light-400"
                    />
                    <button
                      type="button"
                      onClick={toggleVoiceInput}
                      disabled={typing}
                      aria-pressed={listening}
                      aria-label={
                        listening ? t("chat.stopVoice") : t("chat.askVoice")
                      }
                      title={
                        listening ? t("chat.stopListening") : t("chat.askVoice")
                      }
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 disabled:cursor-not-allowed disabled:opacity-40 ${
                        listening
                          ? "animate-pulse border-red-300 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300"
                          : "border-light-600 bg-white/75 text-dark-500 hover:border-primary-300 hover:text-primary-700 dark:border-dark-400 dark:bg-dark-600 dark:text-light-200 dark:hover:text-light-100"
                      }`}
                    >
                      {listening ? (
                        <MicOff size={18} aria-hidden="true" />
                      ) : (
                        <Mic size={18} aria-hidden="true" />
                      )}
                    </button>
                    <button
                      type="submit"
                      disabled={!input.trim() || typing}
                      aria-label={t("chat.send")}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-md shadow-primary-900/15 transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Send size={17} aria-hidden="true" />
                    </button>
                  </form>
                  {voiceInputError && (
                    <p
                      role="alert"
                      className="shrink-0 px-4 pb-3 text-xs text-red-700 dark:text-red-300 sm:px-5"
                    >
                      {voiceInputError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <a
        href="#about"
        aria-label={t("chat.scrollAbout")}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full p-2 text-dark-300 transition-colors hover:text-primary-600 dark:text-light-400 dark:hover:text-accent-300"
      >
        <ArrowDown size={19} aria-hidden="true" />
      </a>

      {/* Render the JD Match Evaluator Modal */}
      <JobMatchModal
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
