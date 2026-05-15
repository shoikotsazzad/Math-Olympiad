"use client";

import { useState } from "react";
import { useNoticesStore } from "@/store/noticesStore";
import type { Notice } from "@/lib/mock/notices";
import type { Tier } from "@/types";
import { Bell, Plus, Pencil, Trash2, X, ChevronDown, ChevronUp } from "lucide-react";

const priorityConfig = {
  high: { label: "Important", bg: "bg-red-500/15 text-red-400" },
  normal: { label: "Notice", bg: "bg-blue-500/15 text-blue-400" },
  low: { label: "Info", bg: "bg-white/[0.06] text-[#64748b]" },
};

const tierColors: Record<Tier | "All", string> = {
  All: "#a78bfa",
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#7c3aed",
};

const tiers: (Tier | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];

const emptyForm = (): Omit<Notice, "id" | "author" | "createdAt"> => ({
  title: "",
  body: "",
  tier: "All",
  priority: "normal",
});

export default function AdminNoticesPage() {
  const { notices, addNotice, updateNotice, removeNotice } = useNoticesStore();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [filterTier, setFilterTier] = useState<Tier | "All">("All");

  const filtered = notices.filter((n) => filterTier === "All" || n.tier === filterTier || n.tier === "All");
  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm());
    setShowForm(true);
  };

  const openEdit = (n: Notice) => {
    setEditId(n.id);
    setForm({ title: n.title, body: n.body, tier: n.tier, priority: n.priority });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm());
  };

  const save = () => {
    if (!form.title.trim() || !form.body.trim()) return;
    if (editId) {
      updateNotice(editId, form);
    } else {
      const newNotice: Notice = {
        ...form,
        id: `n${Date.now()}`,
        author: "Admin",
        createdAt: new Date().toISOString().split("T")[0],
      };
      addNotice(newNotice);
    }
    closeForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white flex items-center gap-2">
            <Bell size={24} className="text-[#a78bfa]" /> Notices
          </h1>
          <p className="text-[#94a3b8] text-sm mt-1">Create and manage announcements for students.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 gradient-violet glow-violet text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:scale-105 transition-all"
        >
          <Plus size={15} /> New Notice
        </button>
      </div>

      {/* Tier filter */}
      <div className="flex flex-wrap gap-2">
        {tiers.map((t) => (
          <button
            key={t}
            onClick={() => setFilterTier(t)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              filterTier === t ? "text-white" : "bg-white/[0.06] text-[#94a3b8] hover:text-white"
            }`}
            style={filterTier === t ? { backgroundColor: tierColors[t] } : {}}
          >
            {t === "All" ? "All Tiers" : t}
          </button>
        ))}
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div className="glass rounded-2xl p-5 border border-[#7c3aed]/30 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold text-white text-sm">
              {editId ? "Edit Notice" : "New Notice"}
            </h2>
            <button onClick={closeForm} className="text-[#64748b] hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="space-y-3">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Notice title"
              className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#475569] outline-none focus:border-[#7c3aed]/50 transition-all"
            />
            <textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Notice body / details..."
              rows={4}
              className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#475569] outline-none focus:border-[#7c3aed]/50 transition-all resize-none"
            />
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-36">
                <label className="text-xs text-[#64748b] mb-1 block">Tier</label>
                <select
                  value={form.tier}
                  onChange={(e) => setForm({ ...form, tier: e.target.value as Tier | "All" })}
                  className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#7c3aed]/50 transition-all"
                >
                  {tiers.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-36">
                <label className="text-xs text-[#64748b] mb-1 block">Priority</label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value as Notice["priority"] })}
                  className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#7c3aed]/50 transition-all"
                >
                  <option value="high">Important</option>
                  <option value="normal">Normal</option>
                  <option value="low">Info</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={closeForm} className="px-4 py-2 text-sm text-[#94a3b8] hover:text-white transition-colors">
              Cancel
            </button>
            <button
              onClick={save}
              disabled={!form.title.trim() || !form.body.trim()}
              className="px-5 py-2 rounded-xl text-sm font-semibold gradient-violet text-white disabled:opacity-40 transition-all hover:scale-105 disabled:hover:scale-100"
            >
              {editId ? "Save Changes" : "Post Notice"}
            </button>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="glass rounded-2xl p-4 border border-red-500/30 flex items-center justify-between gap-4">
          <p className="text-sm text-white">
            Delete notice <span className="text-red-400 font-semibold">&ldquo;{notices.find(n => n.id === deleteId)?.title}&rdquo;</span>?
          </p>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => setDeleteId(null)} className="px-4 py-1.5 rounded-lg text-sm text-[#94a3b8] hover:text-white transition-colors">Cancel</button>
            <button onClick={() => { removeNotice(deleteId); setDeleteId(null); }} className="px-4 py-1.5 rounded-lg text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-medium">Delete</button>
          </div>
        </div>
      )}

      {/* Notices list */}
      <div className="space-y-3">
        {sorted.map((notice) => {
          const pCfg = priorityConfig[notice.priority];
          const tierColor = tierColors[notice.tier];
          const isOpen = expanded === notice.id;

          return (
            <div
              key={notice.id}
              className={`glass rounded-2xl overflow-hidden ${notice.priority === "high" ? "border border-red-500/20" : "border border-white/[0.06]"}`}
            >
              <div className="flex items-start gap-3 px-5 py-4">
                <button
                  onClick={() => setExpanded(isOpen ? null : notice.id)}
                  className="flex-1 flex items-start gap-3 text-left"
                >
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
                  {isOpen ? <ChevronUp size={14} className="text-[#64748b] mt-0.5 shrink-0" /> : <ChevronDown size={14} className="text-[#64748b] mt-0.5 shrink-0" />}
                </button>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(notice)} className="p-1.5 rounded-lg text-[#64748b] hover:text-[#a78bfa] hover:bg-[#7c3aed]/10 transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => setDeleteId(notice.id)} className="p-1.5 rounded-lg text-[#64748b] hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

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
            No notices yet. Click &ldquo;New Notice&rdquo; to post one.
          </div>
        )}
      </div>

      <div className="text-xs text-[#64748b]">{sorted.length} notice{sorted.length !== 1 ? "s" : ""}</div>
    </div>
  );
}
