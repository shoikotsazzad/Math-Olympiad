"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, Eye, Pin, Tag, ChevronRight, Plus, Flame, Clock } from "lucide-react";

const categories = ["All", "Algebra", "Combinatorics", "Number Theory", "Geometry", "General"];

const posts = [
  {
    id: 1,
    title: "How do I approach Vieta's formulas in competition problems?",
    category: "Algebra",
    author: "Rahat Khan",
    authorDept: "CSE",
    time: "2h ago",
    views: 142,
    likes: 34,
    replies: 12,
    pinned: true,
    tags: ["vieta", "polynomials"],
  },
  {
    id: 2,
    title: "Stuck on BdMO 2023 Problem 4 — any hints without spoiling?",
    category: "Number Theory",
    author: "Nadia Islam",
    authorDept: "Math",
    time: "5h ago",
    views: 98,
    likes: 21,
    replies: 8,
    pinned: false,
    tags: ["bdmo", "number-theory"],
  },
  {
    id: 3,
    title: "Trigonometric identities — which ones are worth memorizing?",
    category: "Geometry",
    author: "Lamia Akter",
    authorDept: "EEE",
    time: "1d ago",
    views: 210,
    likes: 57,
    replies: 19,
    pinned: false,
    tags: ["trig", "identities"],
  },
  {
    id: 4,
    title: "Pigeonhole principle trick I learned that might help others",
    category: "Combinatorics",
    author: "Adnan Chowdhury",
    authorDept: "CSE",
    time: "2d ago",
    views: 341,
    likes: 88,
    replies: 24,
    pinned: false,
    tags: ["pigeonhole", "tip"],
  },
  {
    id: 5,
    title: "Study group forming for UIU internal olympiad — anyone interested?",
    category: "General",
    author: "Sarah Jubaida",
    authorDept: "EEE",
    time: "3d ago",
    views: 187,
    likes: 43,
    replies: 31,
    pinned: false,
    tags: ["study-group", "event"],
  },
  {
    id: 6,
    title: "Modular arithmetic shortcut for large exponents — share your methods",
    category: "Number Theory",
    author: "Fahim Hossain",
    authorDept: "CSE",
    time: "4d ago",
    views: 265,
    likes: 60,
    replies: 15,
    pinned: false,
    tags: ["modular", "exponents"],
  },
];

const categoryColors: Record<string, string> = {
  Algebra: "#7c3aed",
  Combinatorics: "#f59e0b",
  "Number Theory": "#10b981",
  Geometry: "#3b82f6",
  General: "#94a3b8",
};

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const filtered =
    activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7c3aed]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame size={16} className="text-[#f59e0b]" />
              <p className="text-xs text-[#94a3b8] uppercase tracking-widest">Discussion Forum</p>
            </div>
            <h1 className="font-heading text-4xl font-extrabold text-white leading-tight">
              Math <span className="gradient-text">Community</span>
            </h1>
            <p className="text-[#94a3b8] mt-2 text-sm">
              Ask questions, share solutions, discuss strategies with fellow olympiad students.
            </p>
          </div>
          <button
            onClick={() => setShowNewPost(true)}
            className="flex items-center gap-2 gradient-violet glow-violet text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:scale-105 transition-all"
          >
            <Plus size={16} /> New Post
          </button>
        </div>
      </div>

      {/* New post form */}
      {showNewPost && (
        <div className="glass rounded-2xl p-6 border border-[#7c3aed]/30 space-y-4">
          <h3 className="font-heading font-semibold text-white">Create a New Post</h3>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What's your question or topic?"
            className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748b] outline-none focus:border-[#7c3aed]/50 transition-all"
          />
          <textarea
            rows={3}
            placeholder="Describe your question in detail..."
            className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748b] outline-none focus:border-[#7c3aed]/50 transition-all resize-none"
          />
          <div className="flex items-center gap-3">
            <select className="bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white outline-none">
              {categories.slice(1).map((c) => (
                <option key={c} value={c} className="bg-[#0f0f1a]">
                  {c}
                </option>
              ))}
            </select>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setShowNewPost(false)}
                className="px-5 py-2 rounded-xl text-sm text-[#94a3b8] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!newTitle.trim()}
                onClick={() => { setShowNewPost(false); setNewTitle(""); }}
                className="gradient-violet text-white text-sm font-semibold px-5 py-2 rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "gradient-violet text-white"
                : "bg-white/[0.06] text-[#94a3b8] hover:text-white hover:bg-white/[0.1]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-3">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="glass glass-hover rounded-2xl p-5 cursor-pointer group transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 gradient-violet rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                {post.author[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {post.pinned && (
                      <Pin size={13} className="text-[#f59e0b] shrink-0" />
                    )}
                    <h3 className="text-white font-semibold text-sm group-hover:text-[#a78bfa] transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </div>
                  <ChevronRight size={16} className="text-[#64748b] group-hover:text-[#a78bfa] shrink-0 transition-colors mt-0.5" />
                </div>

                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span
                    className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${categoryColors[post.category] ?? "#94a3b8"}18`,
                      color: categoryColors[post.category] ?? "#94a3b8",
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-[#64748b]">
                    {post.author} · {post.authorDept}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#64748b]">
                    <Clock size={11} /> {post.time}
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-3 text-xs text-[#64748b]">
                  <span className="flex items-center gap-1.5">
                    <ThumbsUp size={12} /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare size={12} /> {post.replies} replies
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye size={12} /> {post.views}
                  </span>
                  <div className="ml-auto flex gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-[#64748b] hover:text-[#94a3b8]"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
