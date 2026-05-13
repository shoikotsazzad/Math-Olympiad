"use client";

import type { DashboardStats } from "@/types";

type Props = { mastery: DashboardStats["topicMastery"] };

export default function TopicMastery({ mastery }: Props) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-heading font-semibold text-white">Topic Mastery</h3>
        <div className="flex items-center gap-4 text-xs text-[#94a3b8]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7c3aed]" /> Accuracy
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/20" /> Avg. Student
          </span>
        </div>
        <div className="text-xs text-[#94a3b8] ml-4">RECOMMENDED NEXT</div>
      </div>

      <div className="space-y-4">
        {mastery.map(({ topic, accuracy, speed }) => (
          <div key={topic}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#94a3b8]">{topic}</span>
              <span
                className={`font-semibold ${
                  accuracy >= 85
                    ? "text-[#10b981]"
                    : accuracy >= 70
                    ? "text-white"
                    : "text-[#f59e0b]"
                }`}
              >
                {accuracy}%
              </span>
            </div>
            <div className="relative h-2 rounded-full bg-white/[0.06]">
              {/* Avg student bar */}
              <div
                className="absolute h-2 rounded-full bg-white/[0.15]"
                style={{ width: `${speed}%` }}
              />
              {/* Accuracy bar */}
              <div
                className="absolute h-2 rounded-full transition-all duration-700"
                style={{
                  width: `${accuracy}%`,
                  background:
                    accuracy >= 85
                      ? "linear-gradient(90deg, #10b981, #059669)"
                      : accuracy >= 70
                      ? "linear-gradient(90deg, #7c3aed, #4f46e5)"
                      : "linear-gradient(90deg, #f59e0b, #d97706)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
