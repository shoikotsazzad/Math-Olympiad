import type { Question, QuestionState } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  questions: Question[];
  states: Record<string, QuestionState>;
  currentIdx: number;
  onJump: (idx: number) => void;
}

const stateStyles: Record<QuestionState, string> = {
  answered: "bg-[#10b981]/20 border-[#10b981]/40 text-[#10b981]",
  marked: "bg-[#f59e0b]/20 border-[#f59e0b]/40 text-[#f59e0b]",
  unanswered: "bg-white/[0.04] border-white/[0.1] text-[#94a3b8]",
  skipped: "bg-red-500/10 border-red-500/30 text-red-400",
};

export default function QuestionPalette({ questions, states, currentIdx, onJump }: Props) {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-xs text-[#94a3b8] uppercase tracking-wider mb-3">Question Palette</p>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((q, idx) => {
          const state = states[q.id] ?? "unanswered";
          const isCurrent = idx === currentIdx;
          return (
            <button
              key={q.id}
              onClick={() => onJump(idx)}
              className={cn(
                "w-9 h-9 rounded-lg border text-xs font-semibold transition-all",
                isCurrent
                  ? "gradient-violet text-white border-[#7c3aed] scale-110 shadow-lg shadow-[#7c3aed]/30"
                  : stateStyles[state]
              )}
            >
              {String(idx + 1).padStart(2, "0")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
