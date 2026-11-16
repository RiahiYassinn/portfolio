import { useState } from "react";
import type { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  FileText,
} from "lucide-react";
import Button from "../ui/Button";

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

export const JobMatchModal: FC<JobMatchModalProps> = ({ isOpen, onClose }) => {
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
        body: JSON.stringify({ jobDescription: jd }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) {
        throw new Error(data?.error || `Matching failed (${res.status}).`);
      }
      setReport(data.report);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
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
            aria-label="Close modal"
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
                Recruiter JD Fit Evaluator
              </h2>
              <p className="text-xs text-dark-300 dark:text-light-400">
                Paste a job description to instantly analyze Yassine’s technical
                fit & alignment.
              </p>
            </div>
          </div>

          {!report ? (
            <form onSubmit={handleMatch} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dark-500 dark:text-light-300">
                  Job Description / Requirements
                </label>
                <textarea
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  rows={6}
                  placeholder="Paste the job description here (e.g., Looking for a Backend Engineer with NestJS, Kafka, Docker experience...)"
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
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading || !jd.trim()}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Analyzing
                      Fit...
                    </>
                  ) : (
                    <>Generate Match Report</>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Score header */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary-200 bg-primary-50/50 p-5 dark:border-primary-800 dark:bg-primary-950/30">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                    Evaluated Role
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
                  Executive Assessment
                </h4>
                <p className="text-sm leading-relaxed text-dark-600 dark:text-light-200">
                  {report.summary}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-light-600 bg-white p-4 dark:border-dark-400 dark:bg-dark-600">
                  <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={15} /> Matching Skills
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
                    <AlertCircle size={15} /> Growth Areas / Gaps
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
                        No major gaps identified!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-dark-400 dark:text-light-400">
                  Project Alignment
                </h4>
                <p className="text-sm leading-relaxed text-dark-600 dark:text-light-200">
                  {report.projectAlignment}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="primary" onClick={() => setReport(null)}>
                  Evaluate Another JD
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
