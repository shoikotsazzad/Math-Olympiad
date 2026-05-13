import Link from "next/link";
import { tests } from "@/lib/mock/tests";
import { Clock, BookOpen, ChevronRight } from "lucide-react";

const difficultyColors: Record<string, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#7c3aed",
  Elite: "#ef4444",
};

export default function TestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white">Mock Test Arena</h1>
        <p className="text-[#94a3b8] text-sm mt-1">
          Compete in timed environments that simulate actual BdMO conditions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {tests.map((test) => (
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
      </div>
    </div>
  );
}
