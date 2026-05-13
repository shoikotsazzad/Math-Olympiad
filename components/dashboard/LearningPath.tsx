import type { DashboardStats } from "@/types";
import { CheckCircle2, Circle, Lock } from "lucide-react";

type Props = { path: DashboardStats["learningPath"] };

export default function LearningPath({ path }: Props) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-xs text-[#94a3b8] uppercase tracking-wider mb-4">Learning Path Progress</p>
      <div className="space-y-3">
        {path.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            {item.status === "completed" ? (
              <CheckCircle2 size={18} className="text-[#10b981] shrink-0" />
            ) : item.status === "in_progress" ? (
              <Circle size={18} className="text-[#7c3aed] shrink-0" />
            ) : (
              <Lock size={18} className="text-[#64748b] shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm ${
                  item.status === "locked" ? "text-[#64748b]" : "text-white"
                }`}
              >
                {item.title}
              </p>
              {item.status === "in_progress" && (
                <div className="mt-1 h-1 rounded-full bg-white/[0.06]">
                  <div
                    className="h-1 rounded-full bg-[#7c3aed]"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
