"use client";

import { useState } from "react";
import { useNoticesStore } from "@/store/noticesStore";
import { useAuthStore } from "@/store/authStore";
import type { Tier } from "@/types";
import { Bell, ChevronDown, ChevronUp } from "lucide-react";

const priorityConfig = {
  high: { label: "Important", color: "#ef4444", bg: "bg-red-500/15 text-red-400" },
  normal: { label: "Notice", color: "#3b82f6", bg: "bg-blue-500/15 text-blue-400" },
  low: { label: "Info", color: "#64748b", bg: "bg-white/[0.06] text-[#64748b]" },
};

const tierColors: Record<Tier | "All", string> = {
  All: "#a78bfa",
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#7c3aed",
};

export default function StudentNoticesPage() {
  const { notices } = useNoticesStore();
  const { user } = useAuthStore();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<"mine" | "all">("mine");

  const userTier = user?.tier as Tier | undefined;

  const filtered = notices.filter((n) => {
    if (filter === "all") return true;
    return n.tier === "All" || n.tier === userTier;
  });

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white flex items-center gap-2">
          <Bell size={24} className="text-[#a78bfa]" /> Notices
        </h1>
        <p className="text-[#94a3b8] text-sm mt-1">
          Important announcements and updates from the admin team.
        </p>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("mine")}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            filter === "mine" ? "gradient-violet text-white" : "bg-white/[0.06] text-[#94a3b8] hover:text-white"
          }`}
        >
          My Tier
        </button>
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            filter === "all" ? "gradient-violet text-white" : "bg-white/[0.06] text-[#94a3b8] hover:text-white"
          }`}
        >
          All Notices
        </button>
      </div>

      {/* Notices list */}
      <div className="space-y-3">
        {sorted.map((notice) => {
          const pCfg = priorityConfig[notice.priority];
          const tierColor = tierColors[notice.tier];
          const isOpen = expanded === notice.id;

          return (
            <div
              key={notice.id}
              className={`glass rounded-2xl overflow-hidden transition-all ${
                notice.priority === "high" ? "border border-red-500/20" : "border border-white/[0.06]"
              }`}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : notice.id)}
                className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
              >
                {/* Priority dot */}
                <span
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: pCfg.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-white">{notice.title}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${pCfg.bg}`}>
                      {pCfg.label}
                    </span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${tierColor}18`, color: tierColor }}
                    >
                      {notice.tier}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b]">{notice.createdAt}</p>
                </div>
                {isOpen ? (
                  <ChevronUp size={15} className="text-[#64748b] shrink-0 mt-1" />
                ) : (
                  <ChevronDown size={15} className="text-[#64748b] shrink-0 mt-1" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 border-t border-white/[0.04]">
                  <p className="text-sm text-[#94a3b8] leading-relaxed pt-4">{notice.body}</p>
                  <p className="text-xs text-[#475569] mt-3">Posted by {notice.author}</p>
                </div>
              )}
            </div>
          );
        })}

        {sorted.length === 0 && (
          <div className="glass rounded-2xl p-10 text-center text-[#64748b] text-sm">
            No notices found.
          </div>
        )}
      </div>
    </div>
  );
}
