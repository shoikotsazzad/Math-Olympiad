"use client";

import { useState } from "react";
import { puzzlesByTier } from "@/lib/mock/puzzle";
import { Flame, Clock, ChevronRight, X, CheckCircle, Trophy } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import type { Tier } from "@/types";

const tierColors: Record<Tier, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#7c3aed",
};

interface PuzzleResult {
  id: string;
  title: string;
  topic: string;
  date: string;
  submittedAt: string;
  answerSnippet: string;
}

export default function DailyPuzzlePage() {
  const { user } = useAuthStore();
  const userTier = user?.tier ?? "Beginner";
  const puzzle = puzzlesByTier[userTier];
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Previous puzzle attempt modal
  const [attemptPuzzle, setAttemptPuzzle] = useState<(typeof puzzle.previousPuzzles)[0] | null>(null);
  const [prevAnswer, setPrevAnswer] = useState("");
  const [prevSubmitted, setPrevSubmitted] = useState(false);

  // Local result history (simulates past submissions)
  const [results, setResults] = useState<PuzzleResult[]>([]);

  const handleSubmit = () => {
    if (!answer.trim()) return;
    setSubmitted(true);
    setResults((prev) => [
      {
        id: puzzle.id,
        title: `Today's Puzzle (${puzzle.topic})`,
        topic: puzzle.topic,
        date: puzzle.date,
        submittedAt: new Date().toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" }),
        answerSnippet: answer.trim().slice(0, 60) + (answer.length > 60 ? "…" : ""),
      },
      ...prev,
    ]);
  };

  const openAttempt = (p: (typeof puzzle.previousPuzzles)[0]) => {
    setAttemptPuzzle(p);
    setPrevAnswer("");
    setPrevSubmitted(false);
  };

  const submitPrevAttempt = () => {
    if (!prevAnswer.trim() || !attemptPuzzle) return;
    setPrevSubmitted(true);
    setResults((prev) => [
      {
        id: attemptPuzzle.id,
        title: attemptPuzzle.title,
        topic: attemptPuzzle.topic,
        date: attemptPuzzle.date,
        submittedAt: new Date().toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" }),
        answerSnippet: prevAnswer.trim().slice(0, 60) + (prevAnswer.length > 60 ? "…" : ""),
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Previous Puzzle Attempt Modal */}
      {attemptPuzzle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass rounded-2xl p-6 max-w-lg w-full border border-white/[0.1] space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-[#64748b] uppercase tracking-wider mb-1">{attemptPuzzle.topic} • {attemptPuzzle.date}</p>
                <h3 className="font-heading font-bold text-white text-lg">{attemptPuzzle.title}</h3>
              </div>
              <button
                onClick={() => setAttemptPuzzle(null)}
                className="text-[#64748b] hover:text-white transition-colors shrink-0 mt-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
              <p className="text-white text-sm leading-relaxed">{attemptPuzzle.content}</p>
            </div>

            {!prevSubmitted ? (
              <>
                <div className="space-y-2">
                  <label className="text-xs text-[#94a3b8] uppercase tracking-wider">Your Solution</label>
                  <textarea
                    value={prevAnswer}
                    onChange={(e) => setPrevAnswer(e.target.value)}
                    rows={4}
                    placeholder="Write your solution or proof here..."
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748b] outline-none focus:border-[#7c3aed]/50 transition-all resize-none"
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setAttemptPuzzle(null)}
                    className="px-4 py-2 text-sm text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitPrevAttempt}
                    disabled={!prevAnswer.trim()}
                    className="flex items-center gap-2 gradient-violet text-white text-sm font-semibold px-5 py-2 rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
                  >
                    Submit <ChevronRight size={14} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30">
                <CheckCircle size={18} className="text-[#10b981] shrink-0" />
                <p className="text-sm text-[#10b981] font-medium">
                  Solution submitted! It has been sent to the admin for review.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Problem of the Day</h1>
          <p className="text-[#94a3b8] text-sm mt-1">{puzzle.date}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-full border"
            style={{ color: tierColors[puzzle.tier], backgroundColor: `${tierColors[puzzle.tier]}15`, borderColor: `${tierColors[puzzle.tier]}40` }}
          >
            {puzzle.tier}
          </span>
          <div className="flex items-center gap-2 bg-[#f59e0b]/20 border border-[#f59e0b]/30 px-4 py-2 rounded-full">
            <Flame size={16} className="text-[#f59e0b]" />
            <span className="text-[#f59e0b] font-bold text-sm">{puzzle.streakCount} Days</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main puzzle area */}
        <div className="lg:col-span-2 space-y-5">
          {/* Today's Puzzle */}
          <div className="glass rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] uppercase">
                {puzzle.difficulty}
              </span>
              <span className="text-xs text-[#94a3b8]">{puzzle.topic}</span>
            </div>

            <p className="text-white text-base leading-relaxed font-medium">{puzzle.content}</p>

            <div className="mt-6 space-y-3">
              <label className="text-xs text-[#94a3b8] uppercase tracking-wider">Your Solution</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={submitted}
                rows={4}
                placeholder="Enter your mathematical proof or answer here..."
                className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748b] outline-none focus:border-[#7c3aed]/50 focus:bg-white/[0.06] transition-all resize-none"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-[#94a3b8]">Solve correctly to earn 1 point and maintain your streak</p>
              <button
                onClick={handleSubmit}
                disabled={!answer.trim() || submitted}
                className="flex items-center gap-2 gradient-violet glow-violet text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                Submit Solution <ChevronRight size={14} />
              </button>
            </div>

            {submitted && (
              <div className="mt-4 p-4 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30">
                <p className="text-sm text-[#10b981] font-medium">
                  ✓ Solution submitted! Results will be reviewed by the admin within 24 hours.
                </p>
              </div>
            )}
          </div>

          {/* Previous Puzzles — CLICKABLE */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-white mb-4">Previous Puzzles</h3>
            <div className="space-y-2">
              {puzzle.previousPuzzles.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-colors"
                >
                  <div>
                    <p className="text-sm text-white font-medium">{p.title}</p>
                    <p className="text-xs text-[#94a3b8]">{p.topic} • {p.date}</p>
                  </div>
                  <button
                    onClick={() => openAttempt(p)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg gradient-violet text-white hover:scale-105 transition-all"
                  >
                    Attempt <ChevronRight size={11} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* My Results */}
          {results.length > 0 && (
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-white mb-4 flex items-center gap-2">
                <Trophy size={16} className="text-[#f59e0b]" /> My Submissions
              </h3>
              <div className="space-y-2">
                {results.map((r, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={14} className="text-[#10b981] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-white font-medium">{r.title}</p>
                        <p className="text-xs text-[#64748b] mt-0.5">{r.answerSnippet}</p>
                      </div>
                    </div>
                    <span className="text-xs text-[#64748b] shrink-0">{r.submittedAt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Streak tracker */}
          <div className="glass rounded-2xl p-5">
            <h3 className="font-heading font-semibold text-white mb-3">Streak Status</h3>
            <p className="text-3xl font-heading font-bold text-white">{puzzle.streakCount} Days</p>
            <div className="flex gap-1.5 mt-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${i < puzzle.streakCount % 7 ? "bg-[#f59e0b]" : "bg-white/[0.06]"}`}
                />
              ))}
            </div>
            <p className="text-xs text-[#94a3b8] mt-2">Keep solving to maintain your streak!</p>
          </div>

          {/* Top Solvers */}
          <div className="glass rounded-2xl p-5">
            <h3 className="font-heading font-semibold text-white mb-4">Top Solvers Today</h3>
            <div className="space-y-3">
              {puzzle.topSolvers.map((solver, i) => (
                <div key={solver.name} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#f59e0b] w-4">{i + 1}</span>
                  <div className="w-8 h-8 gradient-violet rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {solver.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{solver.name}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#94a3b8]">
                    <Clock size={11} /> {solver.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="glass rounded-xl p-4 border border-[#7c3aed]/20">
            <p className="text-xs text-[#94a3b8] italic leading-relaxed">
              &ldquo;Mathematics is the most beautiful and most powerful creation of the human spirit.&rdquo;
            </p>
            <p className="text-xs text-[#64748b] mt-2">— Stefan Banach</p>
          </div>
        </div>
      </div>
    </div>
  );
}
