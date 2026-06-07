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
  Advanced: "#d97706",
  Elite: "#ef4444",
};

const tierColors: Record<Tier, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#d97706",
};

const cardStyle = {
  background: "#fff",
  border: "1px solid rgba(15,23,42,0.07)",
  boxShadow: "0 2px 8px rgba(15,23,42,0.05), 0 0 0 1px rgba(15,23,42,0.03)",
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
          <h1 className="font-heading text-3xl font-bold text-slate-900">Mock Test Arena</h1>
          <p className="text-slate-500 text-sm mt-1">Compete in timed environments that simulate actual BdMO conditions.</p>
        </div>
        <span
          className="text-xs font-bold px-3 py-1.5 rounded-full border self-center"
          style={{ color: tierColors[userTier], backgroundColor: `${tierColors[userTier]}12`, borderColor: `${tierColors[userTier]}35` }}
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
          <div
            key={test.id}
            className="bg-white rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-1"
            style={cardStyle}
            onMouseEnter={(e) => {
              const color = difficultyColors[test.difficulty] ?? "#d97706";
              (e.currentTarget as HTMLDivElement).style.borderColor = `${color}30`;
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px rgba(15,23,42,0.09), 0 0 0 1px ${color}25`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(15,23,42,0.07)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(15,23,42,0.05), 0 0 0 1px rgba(15,23,42,0.03)";
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${difficultyColors[test.difficulty]}15`, color: difficultyColors[test.difficulty] }}
                  >
                    {test.difficulty}
                  </span>
                  {test.source && <span className="text-xs text-slate-400">{test.source}</span>}
                </div>
                <h3 className="font-heading font-semibold text-slate-900 text-lg">{test.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{test.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Clock size={12} /> {test.duration} min</span>
              <span className="flex items-center gap-1.5"><BookOpen size={12} /> {test.questionCount} questions</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {test.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={`/tests/${test.id}`}
              className="flex items-center justify-center gap-2 gradient-orange text-white text-sm font-semibold py-2.5 rounded-xl hover:scale-[1.02] transition-all mt-auto"
            >
              Start Test <ChevronRight size={16} />
            </Link>
          </div>
        ))}

        {filteredTests.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl p-10 text-center" style={cardStyle}>
            <p className="text-slate-400 text-sm">No tests available for your tier yet.</p>
          </div>
        )}
      </div>

      {/* Other tiers teaser */}
      {tests.filter((t) => t.tier !== userTier).length > 0 && (
        <div className="bg-white rounded-2xl p-5" style={cardStyle}>
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3">Other Tier Tests</p>
          <div className="flex flex-wrap gap-2">
            {tests.filter((t) => t.tier !== userTier).map((test) => (
              <button
                key={test.id}
                onClick={() => handleLockedClick(test.tier)}
                className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full hover:text-slate-700 hover:bg-slate-200 transition-colors"
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
