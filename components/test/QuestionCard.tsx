"use client";

import type { Question } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  question: Question;
  selectedOption: number | null;
  onSelect: (idx: number) => void;
}

const optionLabels = ["A", "B", "C", "D"];

export default function QuestionCard({ question, selectedOption, onSelect }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 flex-1 space-y-6" style={{ border: "1px solid rgba(15,23,42,0.07)", boxShadow: "0 2px 8px rgba(15,23,42,0.05)" }}>
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3">
          Difficulty: {question.difficulty}
        </p>
        <p className="text-slate-800 text-base leading-relaxed font-medium">
          {question.content.replace(/\$/g, "").replace(/\\/g, "")}
        </p>
      </div>

      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all",
              selectedOption === idx
                ? "bg-[#d97706]/10 border-[#d97706]/40"
                : "bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
            )}
          >
            <span
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0",
                selectedOption === idx
                  ? "gradient-orange text-white shadow-sm shadow-amber-500/25"
                  : "bg-slate-200 text-slate-500"
              )}
            >
              {optionLabels[idx]}
            </span>
            <span className={cn("text-sm", selectedOption === idx ? "text-slate-900 font-semibold" : "text-slate-600")}>
              {opt.replace(/\$/g, "").replace(/\\/g, "")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
