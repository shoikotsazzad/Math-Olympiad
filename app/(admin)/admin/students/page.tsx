"use client";

import { useState } from "react";
import { useUsersStore } from "@/store/usersStore";
import type { AdminUser } from "@/lib/mock/users";
import { Search, Trash2, Eye, Users, UserX } from "lucide-react";

const levelColors: Record<string, string> = {
  Grandmaster: "#f59e0b", "Prime Master": "#7c3aed", Expert: "#10b981",
  Advanced: "#3b82f6", Intermediate: "#0891b2", Beginner: "#64748b",
};

export default function AdminStudentsPage() {
  const { users, removeUser } = useUsersStore();
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [viewUser, setViewUser] = useState<AdminUser | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const depts = ["All", ...Array.from(new Set(users.map((u) => u.dept)))];
  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = filterDept === "All" || u.dept === filterDept;
    return matchSearch && matchDept;
  });

  const doDelete = () => {
    if (deleteId) removeUser(deleteId);
    if (viewUser?.id === deleteId) setViewUser(null);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white flex items-center gap-2">
          <Users size={24} className="text-[#a78bfa]" /> Students
        </h1>
        <p className="text-[#94a3b8] text-sm mt-1">View and manage all registered students on the platform.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or email..."
            className="bg-white/[0.06] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-sm text-[#94a3b8] placeholder-[#475569] outline-none focus:border-[#7c3aed]/50 w-60 transition-all" />
        </div>
        <div className="flex flex-wrap gap-2">
          {depts.map((d) => (
            <button key={d} onClick={() => setFilterDept(d)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${filterDept === d ? "gradient-violet text-white" : "bg-white/[0.06] text-[#94a3b8] hover:text-white"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* View modal */}
      {viewUser && (
        <div className="glass rounded-2xl p-6 border border-[#7c3aed]/25 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-white">Student Profile</h3>
            <button onClick={() => setViewUser(null)} className="text-[#64748b] hover:text-white">✕</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 gradient-violet rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0">{viewUser.name[0]}</div>
            <div>
              <p className="font-heading font-semibold text-white text-lg">{viewUser.name}</p>
              <p className="text-sm text-[#64748b]">{viewUser.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Department", value: viewUser.dept },
              { label: "Level", value: viewUser.level },
              { label: "XP", value: viewUser.xp.toLocaleString() },
              { label: "Streak", value: `${viewUser.streak} days` },
              { label: "Tests Taken", value: viewUser.testsTaken },
              { label: "Avg. Score", value: `${viewUser.avgScore}%` },
              { label: "Joined", value: viewUser.joinedAt },
              { label: "Status", value: viewUser.status },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/[0.04] rounded-xl p-3">
                <p className="text-xs text-[#64748b] mb-1">{label}</p>
                <p className="text-sm font-medium text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="glass rounded-2xl p-5 border border-red-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <UserX size={16} className="text-red-400" />
            <p className="text-sm text-white">Remove <span className="text-red-400 font-semibold">{users.find(u => u.id === deleteId)?.name}</span> from the platform?</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => setDeleteId(null)} className="px-4 py-1.5 rounded-lg text-sm text-[#94a3b8] hover:text-white transition-colors">Cancel</button>
            <button onClick={doDelete} className="px-4 py-1.5 rounded-lg text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-medium">Remove</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06] text-xs text-[#64748b] uppercase tracking-wider">
                <th className="text-left py-3 px-6 font-medium">Student</th>
                <th className="text-left py-3 px-6 font-medium hidden md:table-cell">Dept</th>
                <th className="text-left py-3 px-6 font-medium hidden lg:table-cell">Level</th>
                <th className="text-right py-3 px-6 font-medium hidden sm:table-cell">XP</th>
                <th className="text-right py-3 px-6 font-medium hidden md:table-cell">Streak</th>
                <th className="text-right py-3 px-6 font-medium">Score</th>
                <th className="text-center py-3 px-6 font-medium hidden sm:table-cell">Status</th>
                <th className="text-center py-3 px-6 font-medium hidden lg:table-cell">Joined</th>
                <th className="text-right py-3 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 gradient-violet rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">{u.name[0]}</div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{u.name}</p>
                        <p className="text-xs text-[#64748b] truncate hidden sm:block">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 hidden md:table-cell"><span className="text-sm text-[#94a3b8]">{u.dept}</span></td>
                  <td className="py-3.5 px-6 hidden lg:table-cell">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${levelColors[u.level] ?? "#64748b"}18`, color: levelColors[u.level] ?? "#64748b" }}>{u.level}</span>
                  </td>
                  <td className="py-3.5 px-6 text-right hidden sm:table-cell"><span className="text-sm text-[#a78bfa] font-medium">{u.xp.toLocaleString()}</span></td>
                  <td className="py-3.5 px-6 text-right hidden md:table-cell"><span className="text-sm text-[#f59e0b]">{u.streak}d</span></td>
                  <td className="py-3.5 px-6 text-right"><span className={`text-sm font-semibold ${u.avgScore >= 80 ? "text-[#10b981]" : u.avgScore >= 65 ? "text-[#f59e0b]" : "text-red-400"}`}>{u.avgScore}%</span></td>
                  <td className="py-3.5 px-6 text-center hidden sm:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.status === "active" ? "bg-[#10b981]/15 text-[#10b981]" : "bg-white/[0.06] text-[#64748b]"}`}>{u.status}</span>
                  </td>
                  <td className="py-3.5 px-6 text-center hidden lg:table-cell"><span className="text-xs text-[#64748b]">{u.joinedAt}</span></td>
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-1.5 justify-end">
                      <button onClick={() => setViewUser(u)} className="p-1.5 rounded-lg text-[#64748b] hover:text-[#a78bfa] hover:bg-[#7c3aed]/10 transition-colors"><Eye size={14} /></button>
                      <button onClick={() => setDeleteId(u.id)} className="p-1.5 rounded-lg text-[#64748b] hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center text-[#64748b] text-sm py-10">No students found.</p>}
        </div>
        <div className="px-6 py-3 border-t border-white/[0.04] text-xs text-[#64748b]">{filtered.length} of {users.length} students</div>
      </div>
    </div>
  );
}
