"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, Eye, Pin, Tag, ChevronRight, Plus, Flame, Clock } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { communityPosts } from "@/lib/mock/community";
import type { Tier } from "@/types";

const categories = ["All", "Algebra", "Combinatorics", "Number Theory", "Geometry", "General"];

const categoryColors: Record<string, string> = {
  Algebra: "#7c3aed",
  Combinatorics: "#f59e0b",
  "Number Theory": "#10b981",
  Geometry: "#3b82f6",
  Inequalities: "#ef4444",
  General: "#94a3b8",
};

const tierColors: Record<Tier, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#7c3aed",
};

export default function CommunityPage() {
  const { user } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [myTierOnly, setMyTierOnly] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const userTier = user?.tier ?? "Beginner";

  const filtered = communityPosts.filter((p) => {
    const categoryMatch = activeCategory === "All" || p.category === activeCategory;
    const tierMatch = !myTierOnly || p.tier === userTier;
    return categoryMatch && tierMatch;
  });

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

      {/* Filters row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
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

        {/* Tier toggle */}
        <button
          onClick={() => setMyTierOnly((v) => !v)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
            myTierOnly
              ? "border-transparent text-white"
              : "bg-white/[0.06] border-white/[0.08] text-[#94a3b8]"
          }`}
          style={myTierOnly ? {
            backgroundColor: `${tierColors[userTier]}20`,
            borderColor: `${tierColors[userTier]}50`,
            color: tierColors[userTier],
          } : {}}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: tierColors[userTier] }}
          />
          {myTierOnly ? `${userTier} Only` : "All Tiers"}
        </button>
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
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${tierColors[post.tier]}15`,
                      color: tierColors[post.tier],
                    }}
                  >
                    {post.tier}
                  </span>
                  <span className="text-xs text-[#64748b]">
                    {post.author} · {post.authorInstitute}
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

        {filtered.length === 0 && (
          <div className="glass rounded-2xl p-10 text-center">
            <p className="text-[#94a3b8] text-sm">No posts found. Be the first to post!</p>
          </div>
        )}
      </div>
    </div>
  );
}
