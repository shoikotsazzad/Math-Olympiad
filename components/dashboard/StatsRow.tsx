import type { DashboardStats } from "@/types";
import { FileText, Target, Trophy, Clock } from "lucide-react";

const cards = [
  { key: "testsTaken", label: "Tests Taken", icon: FileText, color: "#7c3aed", suffix: "" },
  { key: "averageScore", label: "Average Score", icon: Target, color: "#10b981", suffix: "%" },
  { key: "bestScore", label: "Best Score", icon: Trophy, color: "#f59e0b", suffix: "%" },
  { key: "totalTime", label: "Total Time", icon: Clock, color: "#0891b2", suffix: "" },
];

export default function StatsRow({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ key, label, icon: Icon, color, suffix }) => (
        <div key={key} className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#94a3b8] uppercase tracking-wider">{label}</span>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon size={14} style={{ color }} />
            </div>
          </div>
          <p className="text-2xl font-heading font-bold text-white">
            {stats[key as keyof DashboardStats] as string | number}
            {suffix}
          </p>
        </div>
      ))}
    </div>
  );
}
