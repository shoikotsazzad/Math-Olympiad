"use client";

import { useState } from "react";
import { puzzlesByTier } from "@/lib/mock/puzzle";
import { Flame, Clock, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import type { Tier } from "@/types";

const tierColors: Record<Tier, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#7c3aed",
};

export default function DailyPuzzlePage() {
  const { user } = useAuthStore();
  const userTier = user?.tier ?? "Beginner";
  const puzzle = puzzlesByTier[userTier];
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Problem of the Day</h1>
          <p className="text-[#94a3b8] text-sm mt-1">{puzzle.date}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-full border"
            style={{
              color: tierColors[puzzle.tier],
              backgroundColor: `${tierColors[puzzle.tier]}15`,
              borderColor: `${tierColors[puzzle.tier]}40`,
            }}
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
          {/* Puzzle card */}
          <div className="glass rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] uppercase">
                {puzzle.difficulty}
              </span>
              <span className="text-xs text-[#94a3b8]">{puzzle.topic}</span>
            </div>

            <p className="text-white text-base leading-relaxed font-medium">
              {puzzle.content.replace(/\$/g, "").replace(/\\/g, "")}
            </p>

            <div className="mt-6 space-y-3">
              <label className="text-xs text-[#94a3b8] uppercase tracking-wider">
                Your Solution
              </label>
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
              <p className="text-xs text-[#94a3b8]">
                Solve correctly to earn 1 point and maintain your streak
              </p>
              <button
                onClick={() => setSubmitted(true)}
                disabled={!answer.trim() || submitted}
                className="flex items-center gap-2 gradient-violet glow-violet text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                Submit Solution <ChevronRight size={14} />
              </button>
            </div>

            {submitted && (
              <div className="mt-4 p-4 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30">
                <p className="text-sm text-[#10b981] font-medium">
                  ✓ Solution submitted! Results will be available after 24 hours.
                </p>
              </div>
            )}
          </div>

          {/* Previous Puzzles */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-white mb-4">Previous Puzzles</h3>
            <div className="space-y-3">
              {puzzle.previousPuzzles.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-sm text-white font-medium">{p.title}</p>
                    <p className="text-xs text-[#94a3b8]">{p.topic} • {p.date}</p>
                  </div>
                  <button className="text-xs text-[#7c3aed] hover:text-[#a78bfa] transition-colors">
                    Attempt
                  </button>
                </div>
              ))}
            </div>
          </div>
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
                  className={`flex-1 h-2 rounded-full ${
                    i < puzzle.streakCount % 7 ? "bg-[#f59e0b]" : "bg-white/[0.06]"
                  }`}
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
              &ldquo;Mathematics is the most beautiful and most powerful creation of the human
              spirit.&rdquo;
            </p>
            <p className="text-xs text-[#64748b] mt-2">— Stefan Banach</p>
          </div>
        </div>
      </div>
    </div>
  );
}
