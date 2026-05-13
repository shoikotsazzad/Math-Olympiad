import Link from "next/link";
import type { DashboardStats } from "@/types";
import { ArrowRight } from "lucide-react";

type Props = { recommended: DashboardStats["recommendedNext"] };

export default function RecommendedNext({ recommended }: Props) {
  return (
    <div className="glass rounded-2xl p-5 border border-[#7c3aed]/20">
      <p className="text-xs text-[#94a3b8] uppercase tracking-wider mb-3">Recommended Next</p>
      <h4 className="font-heading font-semibold text-white text-lg leading-snug">
        {recommended.title}
      </h4>
      <p className="text-sm text-[#94a3b8] mt-1">
        {recommended.topic} • {recommended.level}
      </p>
      <p className="text-xs text-[#94a3b8] mt-3 leading-relaxed">
        Based on your recent performance in Combinatorics, we recommend strengthening your grasp
        on structural counting.
      </p>
      <Link
        href="/tests"
        className="mt-4 flex items-center gap-2 gradient-violet text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:scale-105 transition-all"
      >
        Begin Assessment <ArrowRight size={14} />
      </Link>
    </div>
  );
}
