"use client";

import { useState } from "react";
import { leaderboard } from "@/lib/mock/dashboard";
import { TrendingUp, TrendingDown, Minus, Trophy, Medal, Star, Lock } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

const allTimeData = [
  { rank: 1, name: "Adnan Chowdhury", department: "CSE", rating: 5120, trend: "up" as const },
  { rank: 2, name: "Sarah Jubaida", department: "EEE", rating: 4984, trend: "up" as const },
  { rank: 3, name: "Rahat Khan", department: "CSE", rating: 4701, trend: "stable" as const },
  { rank: 4, name: "Nadia Islam", department: "Math", rating: 4520, trend: "up" as const },
  { rank: 5, name: "Fahim Hossain", department: "CSE", rating: 4310, trend: "down" as const },
  { rank: 6, name: "Lamia Akter", department: "EEE", rating: 4198, trend: "up" as const },
  { rank: 7, name: "Tahmid Reza", department: "CSE", rating: 3975, trend: "down" as const },
  { rank: 8, name: "Rifat Ahmed", department: "Math", rating: 3820, trend: "up" as const },
  { rank: 9, name: "Maliha Sultana", department: "CSE", rating: 3650, trend: "stable" as const },
  { rank: 10, name: "Arif Hasan", department: "EEE", rating: 3401, trend: "down" as const },
  { rank: 11, name: "Sabrina Yeasmin", department: "Math", rating: 3250, trend: "up" as const },
  { rank: 12, name: "Tanvir Anjum", department: "CSE", rating: 3180, trend: "stable" as const },
  { rank: 13, name: "Tasfia Ahmed", department: "EEE", rating: 3050, trend: "up" as const },
  { rank: 14, name: "Samiul Islam", department: "Math", rating: 2980, trend: "down" as const },
  { rank: 15, name: "Nabila Tabassum", department: "CSE", rating: 2890, trend: "up" as const },
  { rank: 16, name: "Zubair Rahman", department: "EEE", rating: 2760, trend: "stable" as const },
  { rank: 17, name: "Mehedi Hasan", department: "Math", rating: 2640, trend: "up" as const },
  { rank: 18, name: "Anika Tahsin", department: "CSE", rating: 2510, trend: "down" as const },
  { rank: 19, name: "Sajid Khan", department: "EEE", rating: 2420, trend: "up" as const },
  { rank: 20, name: "Fariha Alam", department: "Math", rating: 2350, trend: "stable" as const },
  { rank: 21, name: "Imtiaz Ahmed", department: "CSE", rating: 2280, trend: "up" as const },
  { rank: 22, name: "Ishrat Jahan", department: "EEE", rating: 2190, trend: "down" as const },
  { rank: 23, name: "Abrar Shakil", department: "Math", rating: 2110, trend: "up" as const },
  { rank: 24, name: "Sumaiya Haque", department: "CSE", rating: 2040, trend: "stable" as const },
  { rank: 25, name: "Rakibul Islam", department: "EEE", rating: 1980, trend: "up" as const },
  { rank: 26, name: "Niaz Morshed", department: "Math", rating: 1910, trend: "down" as const },
  { rank: 27, name: "Sadia Afrin", department: "CSE", rating: 1850, trend: "up" as const },
  { rank: 28, name: "Asif Iqbal", department: "EEE", rating: 1790, trend: "stable" as const },
  { rank: 29, name: "Tasmia Zaman", department: "Math", rating: 1720, trend: "up" as const },
  { rank: 30, name: "Mahmudul Hasan", department: "CSE", rating: 1650, trend: "down" as const },
];

const VISIBLE_ROWS = 10;

const rankIcon = (rank: number) => {
  if (rank === 1) return <Trophy size={16} className="text-[#f59e0b]" />;
  if (rank === 2) return <Medal size={16} className="text-[#94a3b8]" />;
  if (rank === 3) return <Medal size={16} className="text-[#cd7f32]" />;
  return null;
};

export default function LeaderboardPage() {
  const [tab, setTab] = useState<"monthly" | "alltime">("monthly");
  const { user } = useAuthStore();
  const data = tab === "monthly" ? leaderboard : allTimeData;
  const visibleData = user ? data : data.slice(0, VISIBLE_ROWS);
  const hiddenCount = user ? 0 : data.length - VISIBLE_ROWS;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f59e0b]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star size={18} className="text-[#f59e0b]" />
              <p className="text-xs text-[#94a3b8] uppercase tracking-widest">Hall of Fame</p>
            </div>
            <h1 className="font-heading text-4xl font-extrabold text-white leading-tight">
              Global <span className="gradient-text">Leaderboard</span>
            </h1>
            <p className="text-[#94a3b8] mt-2 text-sm">
              The brightest minds from UIU. Track your rank against the best.
            </p>
          </div>
          <div className="flex gap-2">
            {(["monthly", "alltime"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  tab === t
                    ? "gradient-violet text-white glow-violet"
                    : "bg-white/[0.06] text-[#94a3b8] hover:text-white hover:bg-white/[0.1]"
                }`}
              >
                {t === "monthly" ? "Monthly" : "All Time"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 0, 2].map((order) => {
          const entry = data[order];
          const colors = ["text-[#f59e0b]", "text-[#94a3b8]", "text-[#cd7f32]"];
          const bgColors = [
            "bg-[#f59e0b]/10 border-[#f59e0b]/20",
            "bg-white/[0.06] border-white/[0.1]",
            "bg-[#cd7f32]/10 border-[#cd7f32]/20",
          ];
          return (
            <div key={entry.rank} className={`glass rounded-2xl p-5 border text-center ${bgColors[order]}`}>
              <div className={`text-2xl font-heading font-extrabold mb-1 ${colors[order]}`}>
                #{entry.rank}
              </div>
              <div className="w-12 h-12 gradient-violet rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                {entry.name[0]}
              </div>
              <p className="text-white font-semibold text-sm">{entry.name}</p>
              <p className="text-[#94a3b8] text-xs mt-0.5">{entry.department}</p>
              <p className={`text-lg font-heading font-bold mt-2 ${colors[order]}`}>
                {entry.rating.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Full table */}
      <div className="glass rounded-2xl overflow-hidden relative">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-4 px-6 text-xs text-[#64748b] uppercase tracking-wider font-medium">Rank</th>
              <th className="text-left py-4 px-6 text-xs text-[#64748b] uppercase tracking-wider font-medium">Competitor</th>
              <th className="text-left py-4 px-6 text-xs text-[#64748b] uppercase tracking-wider font-medium hidden sm:table-cell">Department</th>
              <th className="text-right py-4 px-6 text-xs text-[#64748b] uppercase tracking-wider font-medium">Rating</th>
              <th className="text-right py-4 px-6 text-xs text-[#64748b] uppercase tracking-wider font-medium hidden sm:table-cell">Trend</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((entry) => (
              <tr key={entry.rank} className="border-t border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    {rankIcon(entry.rank)}
                    <span className={`text-sm font-bold ${entry.rank <= 3 ? "text-[#f59e0b]" : "text-[#94a3b8]"}`}>
                      {String(entry.rank).padStart(2, "0")}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full gradient-violet flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {entry.name[0]}
                    </div>
                    <span className="text-sm font-medium text-white">{entry.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 hidden sm:table-cell">
                  <span className="text-sm text-[#94a3b8]">{entry.department}</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <span className="text-sm font-semibold text-white">{entry.rating.toLocaleString()}</span>
                </td>
                <td className="py-4 px-6 text-right hidden sm:table-cell">
                  {entry.trend === "up" && <TrendingUp size={16} className="text-[#10b981] ml-auto" />}
                  {entry.trend === "down" && <TrendingDown size={16} className="text-red-400 ml-auto" />}
                  {entry.trend === "stable" && <Minus size={16} className="text-[#94a3b8] ml-auto" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Visitor lock — blurred rows + overlay */}
        {!user && hiddenCount > 0 && (
          <div className="relative">
            {/* Ghost rows (blurred) */}
            <div className="pointer-events-none select-none" style={{ filter: "blur(5px)", opacity: 0.3 }}>
              {data.slice(VISIBLE_ROWS).map((entry) => (
                <div key={entry.rank} className="flex items-center gap-4 border-t border-white/[0.04] px-6 py-4">
                  <span className="text-sm font-bold text-[#94a3b8] w-8">{String(entry.rank).padStart(2, "0")}</span>
                  <div className="w-9 h-9 rounded-full bg-white/10 shrink-0" />
                  <span className="text-sm text-white flex-1">{entry.name}</span>
                  <span className="text-sm font-semibold text-white">{entry.rating.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Gradient fade */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#0d1117]/0 to-transparent pointer-events-none" />

            {/* Lock banner */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#0d0d1a]/95 border border-[#7c3aed]/30 rounded-2xl px-8 py-5 text-center shadow-2xl">
                <Lock size={20} className="text-[#a78bfa] mx-auto mb-2" />
                <p className="text-white font-semibold text-sm">
                  {hiddenCount} more competitors hidden
                </p>
                <p className="text-[#64748b] text-xs mt-1 mb-4">Sign in to see the full rankings and find your own position</p>
                <Link
                  href="/login"
                  className="gradient-violet glow-violet text-white text-sm font-semibold px-6 py-2 rounded-full hover:scale-105 transition-all"
                >
                  Sign In to See Your Rank
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
