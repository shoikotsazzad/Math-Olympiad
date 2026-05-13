"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, X, Check, Puzzle } from "lucide-react";

type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Elite";

interface PuzzleItem {
  id: string;
  date: string;
  title: string;
  content: string;
  difficulty: Difficulty;
  topic: string;
}

const initialPuzzles: PuzzleItem[] = [
  { id: "p1", date: "March 14, 2024", title: "Pi Day Divisibility", content: "Find the number of positive integers $a$ such that $a + 50$ divides $a^2 + 100$.", difficulty: "Intermediate", topic: "Combinatorics" },
  { id: "p2", date: "March 13, 2024", title: "The Divisibility Paradox", content: "Prove that for any integer $n$, the expression $n^3 - n$ is always divisible by 6.", difficulty: "Beginner", topic: "Number Theory" },
  { id: "p3", date: "March 12, 2024", title: "The Pigeonhole Labyrinth", content: "In a group of 13 people, show that at least two share a birth month.", difficulty: "Beginner", topic: "Combinatorics" },
  { id: "p4", date: "March 11, 2024", title: "Euclid's Trinity Mystery", content: "Find all triples $(a,b,c)$ of positive integers satisfying $\\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c} = 1$.", difficulty: "Advanced", topic: "Number Theory" },
];

const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced", "Elite"];
const topics = ["Algebra", "Combinatorics", "Number Theory", "Geometry", "Inequalities", "Mathematical Logic"];

const diffColors: Record<string, string> = {
  Beginner: "#10b981", Intermediate: "#f59e0b", Advanced: "#7c3aed", Elite: "#ef4444",
};

const blank = (): Omit<PuzzleItem, "id"> => ({
  date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  title: "", content: "", difficulty: "Intermediate", topic: "Number Theory",
});

export default function AdminPuzzlesPage() {
  const [puzzles, setPuzzles] = useState<PuzzleItem[]>(initialPuzzles);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(blank());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => { setForm(blank()); setEditId(null); setShowForm(true); };
  const openEdit = (p: PuzzleItem) => { setForm({ date: p.date, title: p.title, content: p.content, difficulty: p.difficulty, topic: p.topic }); setEditId(p.id); setShowForm(true); };

  const save = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    if (editId) {
      setPuzzles((prev) => prev.map((p) => p.id === editId ? { ...p, ...form } : p));
    } else {
      setPuzzles((prev) => [{ id: `p${Date.now()}`, ...form }, ...prev]);
    }
    setShowForm(false);
  };

  const confirmDelete = (id: string) => setDeleteId(id);
  const doDelete = () => { if (deleteId) setPuzzles((prev) => prev.filter((p) => p.id !== deleteId)); setDeleteId(null); };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white flex items-center gap-2">
            <Puzzle size={24} className="text-[#a78bfa]" /> Daily Puzzles
          </h1>
          <p className="text-[#94a3b8] text-sm mt-1">Create, edit and delete daily challenge puzzles.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 gradient-violet glow-violet text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:scale-105 transition-all">
          <Plus size={16} /> New Puzzle
        </button>
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="glass rounded-2xl p-6 border border-[#7c3aed]/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-white">{editId ? "Edit Puzzle" : "New Puzzle"}</h3>
            <button onClick={() => setShowForm(false)} className="text-[#64748b] hover:text-white transition-colors"><X size={18} /></button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-[#94a3b8] uppercase tracking-wider">Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Puzzle title..." className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#475569] outline-none focus:border-[#7c3aed]/50 transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-[#94a3b8] uppercase tracking-wider">Date</label>
              <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#7c3aed]/50 transition-all" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-[#94a3b8] uppercase tracking-wider">Problem Statement</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={4} placeholder="Enter the full problem statement (LaTeX supported)..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-[#475569] outline-none focus:border-[#7c3aed]/50 transition-all resize-none" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-[#94a3b8] uppercase tracking-wider">Difficulty</label>
              <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value as Difficulty })}
                className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#7c3aed]/50 transition-all">
                {difficulties.map((d) => <option key={d} value={d} className="bg-[#0f0f1a]">{d}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-[#94a3b8] uppercase tracking-wider">Topic</label>
              <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#7c3aed]/50 transition-all">
                {topics.map((t) => <option key={t} value={t} className="bg-[#0f0f1a]">{t}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button onClick={() => setShowForm(false)} className="px-5 py-2 rounded-xl text-sm text-[#94a3b8] hover:text-white transition-colors">Cancel</button>
            <button onClick={save} disabled={!form.title.trim() || !form.content.trim()}
              className="flex items-center gap-2 gradient-violet text-white text-sm font-semibold px-5 py-2 rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100">
              <Check size={15} /> {editId ? "Save Changes" : "Create Puzzle"}
            </button>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="glass rounded-2xl p-5 border border-red-500/30 flex items-center justify-between gap-4">
          <p className="text-sm text-white">Delete <span className="text-red-400 font-semibold">&ldquo;{puzzles.find(p => p.id === deleteId)?.title}&rdquo;</span>? This cannot be undone.</p>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => setDeleteId(null)} className="px-4 py-1.5 rounded-lg text-sm text-[#94a3b8] hover:text-white transition-colors">Cancel</button>
            <button onClick={doDelete} className="px-4 py-1.5 rounded-lg text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-medium">Delete</button>
          </div>
        </div>
      )}

      {/* Puzzle list */}
      <div className="space-y-3">
        {puzzles.map((p) => (
          <div key={p.id} className="glass rounded-2xl p-5 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: `${diffColors[p.difficulty]}18`, color: diffColors[p.difficulty] }}>
                  {p.difficulty}
                </span>
                <span className="text-xs text-[#64748b]">{p.topic}</span>
                <span className="text-xs text-[#475569]">{p.date}</span>
              </div>
              <p className="font-heading font-semibold text-white mb-1">{p.title}</p>
              <p className="text-sm text-[#64748b] leading-relaxed line-clamp-2">{p.content}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => openEdit(p)} className="p-2 rounded-lg text-[#64748b] hover:text-[#a78bfa] hover:bg-[#7c3aed]/10 transition-colors"><Pencil size={15} /></button>
              <button onClick={() => confirmDelete(p.id)} className="p-2 rounded-lg text-[#64748b] hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
