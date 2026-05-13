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
    <div className="glass rounded-2xl p-6 flex-1 space-y-6">
      {/* Question text — renders LaTeX-like content as plain text for now */}
      <div>
        <p className="text-xs text-[#94a3b8] uppercase tracking-wider mb-3">
          Difficulty: {question.difficulty}
        </p>
        <p className="text-white text-base leading-relaxed font-medium">
          {question.content.replace(/\$/g, "").replace(/\\/g, "")}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all",
              selectedOption === idx
                ? "bg-[#7c3aed]/20 border-[#7c3aed]/60 glow-violet"
                : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.15]"
            )}
          >
            <span
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0",
                selectedOption === idx
                  ? "gradient-violet text-white"
                  : "bg-white/[0.08] text-[#94a3b8]"
              )}
            >
              {optionLabels[idx]}
            </span>
            <span
              className={cn(
                "text-sm",
                selectedOption === idx ? "text-white font-medium" : "text-[#94a3b8]"
              )}
            >
              {opt.replace(/\$/g, "").replace(/\\/g, "")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
