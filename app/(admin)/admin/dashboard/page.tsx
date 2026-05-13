"use client";

import { useUsersStore } from "@/store/usersStore";
import { Users, TrendingUp, Trophy, BookOpen, Search, Trash2, Eye } from "lucide-react";
import { useState } from "react";

const levelColors: Record<string, string> = {
  Grandmaster: "#f59e0b",
  "Prime Master": "#7c3aed",
  Expert: "#10b981",
  Advanced: "#3b82f6",
  Intermediate: "#0891b2",
  Beginner: "#64748b",
};

export default function AdminDashboardPage() {
  const { users, removeUser } = useUsersStore();
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.dept.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = users.filter((u) => u.status === "active").length;
  const avgScore = users.length > 0 ? Math.round(users.reduce((s, u) => s + u.avgScore, 0) / users.length) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white">Faculty Dashboard</h1>
        <p className="text-[#94a3b8] text-sm mt-1">
          Full visibility into student performance, platform health, and competition management.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: users.length, icon: Users, color: "#7c3aed" },
          { label: "Active Students", value: activeCount, icon: TrendingUp, color: "#10b981" },
          { label: "Platform Avg. Score", value: `${avgScore}%`, icon: Trophy, color: "#f59e0b" },
          { label: "Topics Available", value: "6", icon: BookOpen, color: "#0891b2" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-[#94a3b8] uppercase tracking-wider">{label}</p>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                <Icon size={14} style={{ color }} />
              </div>
            </div>
            <p className="font-heading text-2xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* All Users Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <h3 className="font-heading font-semibold text-white">All Students</h3>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, dept..."
              className="bg-white/[0.06] border border-white/[0.08] rounded-lg pl-9 pr-4 py-2 text-sm text-[#94a3b8] placeholder-[#475569] outline-none focus:border-[#7c3aed]/50 w-64 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-[#64748b] uppercase tracking-wider border-b border-white/[0.04]">
                <th className="text-left py-3 px-6 font-medium">Student</th>
                <th className="text-left py-3 px-6 font-medium hidden md:table-cell">Dept</th>
                <th className="text-left py-3 px-6 font-medium hidden lg:table-cell">Level</th>
                <th className="text-right py-3 px-6 font-medium hidden sm:table-cell">XP</th>
                <th className="text-right py-3 px-6 font-medium hidden md:table-cell">Streak</th>
                <th className="text-right py-3 px-6 font-medium hidden lg:table-cell">Tests</th>
                <th className="text-right py-3 px-6 font-medium">Score</th>
                <th className="text-center py-3 px-6 font-medium hidden sm:table-cell">Status</th>
                <th className="text-right py-3 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 gradient-violet rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {user.name[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        <p className="text-xs text-[#64748b] truncate hidden sm:block">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 hidden md:table-cell">
                    <span className="text-sm text-[#94a3b8]">{user.dept}</span>
                  </td>
                  <td className="py-3.5 px-6 hidden lg:table-cell">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${levelColors[user.level] ?? "#64748b"}18`, color: levelColors[user.level] ?? "#64748b" }}
                    >
                      {user.level}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right hidden sm:table-cell">
                    <span className="text-sm text-[#a78bfa] font-medium">{user.xp.toLocaleString()}</span>
                  </td>
                  <td className="py-3.5 px-6 text-right hidden md:table-cell">
                    <span className="text-sm text-[#f59e0b]">{user.streak}d</span>
                  </td>
                  <td className="py-3.5 px-6 text-right hidden lg:table-cell">
                    <span className="text-sm text-[#94a3b8]">{user.testsTaken}</span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <span className={`text-sm font-semibold ${user.avgScore >= 80 ? "text-[#10b981]" : user.avgScore >= 65 ? "text-[#f59e0b]" : "text-red-400"}`}>
                      {user.avgScore}%
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-center hidden sm:table-cell">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      user.status === "active" ? "bg-[#10b981]/15 text-[#10b981]" : "bg-white/[0.06] text-[#64748b]"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-2 justify-end">
                      <button className="p-1.5 rounded-lg text-[#64748b] hover:text-[#a78bfa] hover:bg-[#7c3aed]/10 transition-colors">
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => removeUser(user.id)}
                        className="p-1.5 rounded-lg text-[#64748b] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-[#64748b] text-sm py-10">No students match your search.</p>
          )}
        </div>

        <div className="px-6 py-3 border-t border-white/[0.04] text-xs text-[#64748b]">
          Showing {filtered.length} of {users.length} students
        </div>
      </div>
    </div>
  );
}
