import { tests, sampleQuestions } from "@/lib/mock/tests";
import { dashboardStats } from "@/lib/mock/dashboard";
import Link from "next/link";
import { CheckCircle2, XCircle, Clock, ChevronRight } from "lucide-react";

const topicBreakdown = [
  { topic: "Algebra & Polynomials", accuracy: 96, avgAccuracy: 72 },
  { topic: "Number Theory", accuracy: 88, avgAccuracy: 65 },
  { topic: "Geometry (Euclidean)", accuracy: 62, avgAccuracy: 70 },
  { topic: "Combinatorics", accuracy: 90, avgAccuracy: 68 },
];

export default async function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const test = tests.find((t) => t.id === id) ?? tests[0];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
        <Link href="/tests" className="hover:text-white transition-colors">TESTS</Link>
        <ChevronRight size={12} />
        <span className="text-white uppercase">{test.title}</span>
      </div>

      <div>
        <h1 className="font-heading text-3xl font-bold text-white">Test Results Analysis</h1>
        <p className="text-[#94a3b8] text-sm mt-1">
          Completed on October 24, 2023 • Attempt #2
        </p>
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-[#94a3b8] uppercase tracking-wider mb-2">Total Score</p>
          <p className="font-heading text-4xl font-bold text-white">
            420 <span className="text-lg text-[#64748b]">/ 500</span>
          </p>
          <p className="text-xs text-[#f59e0b] mt-2 font-medium">★ Top 5% of all candidates</p>
        </div>
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-[#94a3b8] uppercase tracking-wider mb-2">Accuracy</p>
          <p className="font-heading text-4xl font-bold text-[#10b981]">84%</p>
          <div className="mt-3 h-1.5 rounded-full bg-white/[0.06]">
            <div className="h-1.5 rounded-full bg-[#10b981]" style={{ width: "84%" }} />
          </div>
        </div>
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-[#94a3b8] uppercase tracking-wider mb-2">Time Taken</p>
          <p className="font-heading text-4xl font-bold text-[#f59e0b]">
            34<span className="text-lg">m</span> 12<span className="text-lg">s</span>
          </p>
          <p className="text-xs text-[#94a3b8] mt-2">8 minutes ahead of average</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Topic Performance */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-semibold text-white">Topic Performance</h3>
            <div className="flex items-center gap-4 text-xs text-[#94a3b8]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7c3aed]" /> Accuracy
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/20" /> Avg. Student
              </span>
            </div>
          </div>
          <div className="space-y-4">
            {topicBreakdown.map(({ topic, accuracy, avgAccuracy }) => (
              <div key={topic}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-[#94a3b8]">{topic}</span>
                  <span className={accuracy < 70 ? "text-[#f59e0b] font-semibold" : "text-white font-semibold"}>
                    {accuracy}%
                  </span>
                </div>
                <div className="relative h-2 rounded-full bg-white/[0.06]">
                  <div
                    className="absolute h-2 rounded-full bg-white/[0.15]"
                    style={{ width: `${avgAccuracy}%` }}
                  />
                  <div
                    className="absolute h-2 rounded-full"
                    style={{
                      width: `${accuracy}%`,
                      background:
                        accuracy < 70
                          ? "linear-gradient(90deg, #f59e0b, #d97706)"
                          : "linear-gradient(90deg, #7c3aed, #4f46e5)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mastery Insight */}
        <div className="glass rounded-2xl p-6 border border-[#7c3aed]/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 gradient-violet rounded-lg flex items-center justify-center text-white text-sm">
              ◎
            </div>
            <h3 className="font-heading font-semibold text-white">Mastery Insight</h3>
          </div>
          <p className="text-sm text-[#94a3b8] leading-relaxed">
            You excel in logical deduction and algebraic manipulation. However, your time spent on{" "}
            <span className="text-[#f59e0b] font-semibold">Geometry</span> problems was 40% higher
            than average with lower accuracy.
          </p>
          <div className="mt-4">
            <p className="text-xs text-[#94a3b8] font-medium mb-2">Recommendation:</p>
            <ul className="text-xs text-[#94a3b8] space-y-1 list-disc list-inside">
              <li>Practice Circle Theorems</li>
              <li>Review 3D Geometry formulas</li>
            </ul>
          </div>
          <Link
            href="/topics/geometry"
            className="mt-5 flex items-center justify-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white text-sm font-medium py-2.5 rounded-xl transition-all"
          >
            Go to Geometry Module
          </Link>
        </div>
      </div>

      {/* Question Breakdown */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-heading font-semibold text-white mb-5">Question Breakdown</h3>
        <div className="space-y-3">
          {sampleQuestions.map((q, idx) => {
            const isCorrect = idx !== 1;
            return (
              <div
                key={q.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
              >
                {isCorrect ? (
                  <CheckCircle2 size={18} className="text-[#10b981] shrink-0" />
                ) : (
                  <XCircle size={18} className="text-red-400 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#94a3b8]">QUESTION {String(idx + 1).padStart(2, "0")}</p>
                  <p className="text-sm text-white truncate">{q.content.replace(/\$/g, "").slice(0, 60)}...</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="flex items-center gap-1 text-xs text-[#94a3b8]">
                    <Clock size={11} /> {["02:45", "04:12", "01:05"][idx]}
                  </span>
                  <button className="text-xs text-[#7c3aed] hover:text-[#a78bfa] transition-colors">
                    View Explanation
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <Link
          href="/tests"
          className="px-6 py-2.5 rounded-xl bg-white/[0.08] border border-white/[0.12] text-white text-sm font-medium hover:bg-white/[0.12] transition-all"
        >
          Review Questions
        </Link>
        <Link
          href="/tests"
          className="px-6 py-2.5 rounded-xl gradient-violet text-white text-sm font-semibold hover:scale-105 transition-all"
        >
          Take Another Test
        </Link>
      </div>
    </div>
  );
}
