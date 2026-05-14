"use client";

import Link from "next/link";
import { useState } from "react";
import { tests } from "@/lib/mock/tests";
import { Clock, BookOpen, ChevronRight, Lock } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import type { Tier } from "@/types";

const difficultyColors: Record<string, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#7c3aed",
  Elite: "#ef4444",
};

const tierColors: Record<Tier, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#7c3aed",
};

export default function TestsPage() {
  const { user } = useAuthStore();
  const [lockedToast, setLockedToast] = useState<string | null>(null);

  const userTier = user?.tier ?? "Beginner";
  const filteredTests = tests.filter((t) => t.tier === userTier);

  const handleLockedClick = (testTier: Tier) => {
    setLockedToast(`This test is for ${testTier} tier students. Your tier is ${userTier}.`);
    setTimeout(() => setLockedToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Mock Test Arena</h1>
          <p className="text-[#94a3b8] text-sm mt-1">
            Compete in timed environments that simulate actual BdMO conditions.
          </p>
        </div>
        <span
          className="text-xs font-semibold px-3 py-1.5 rounded-full border self-center"
          style={{
            color: tierColors[userTier],
            backgroundColor: `${tierColors[userTier]}15`,
            borderColor: `${tierColors[userTier]}40`,
          }}
        >
          {userTier}
        </span>
      </div>

      {/* Toast */}
      {lockedToast && (
        <div className="flex items-center gap-2 text-sm text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-xl px-4 py-3">
          <Lock size={14} /> {lockedToast}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {filteredTests.map((test) => (
          <div key={test.id} className="glass glass-hover rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${difficultyColors[test.difficulty]}20`,
                      color: difficultyColors[test.difficulty],
                    }}
                  >
                    {test.difficulty}
                  </span>
                  {test.source && (
                    <span className="text-xs text-[#64748b]">{test.source}</span>
                  )}
                </div>
                <h3 className="font-heading font-semibold text-white text-lg">{test.title}</h3>
                <p className="text-sm text-[#94a3b8] mt-1">{test.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#94a3b8]">
              <span className="flex items-center gap-1.5">
                <Clock size={12} /> {test.duration} min
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={12} /> {test.questionCount} questions
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {test.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded bg-white/[0.05] text-[#94a3b8] border border-white/[0.08]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={`/tests/${test.id}`}
              className="flex items-center justify-center gap-2 gradient-violet text-white text-sm font-semibold py-2.5 rounded-xl hover:scale-[1.02] transition-all mt-auto"
            >
              Start Test <ChevronRight size={16} />
            </Link>
          </div>
        ))}

        {filteredTests.length === 0 && (
          <div className="col-span-full glass rounded-2xl p-10 text-center">
            <p className="text-[#94a3b8] text-sm">No tests available for your tier yet.</p>
          </div>
        )}
      </div>

      {/* Other tiers teaser */}
      {tests.filter((t) => t.tier !== userTier).length > 0 && (
        <div className="glass rounded-2xl p-5">
          <p className="text-xs text-[#64748b] uppercase tracking-wider mb-3">Other Tier Tests</p>
          <div className="flex flex-wrap gap-2">
            {tests
              .filter((t) => t.tier !== userTier)
              .map((test) => (
                <button
                  key={test.id}
                  onClick={() => handleLockedClick(test.tier)}
                  className="flex items-center gap-2 text-xs text-[#64748b] bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-full hover:text-[#94a3b8] transition-colors"
                >
                  <Lock size={10} /> {test.title}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
