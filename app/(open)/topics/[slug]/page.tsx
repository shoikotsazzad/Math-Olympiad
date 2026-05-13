import { topics, numberTheoryModules } from "@/lib/mock/topics";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ExternalLink, Download, Users, Trophy, Flame } from "lucide-react";
import { LoginWall } from "@/components/auth/LoginWall";

const difficultyColors: Record<string, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#7c3aed",
  Elite: "#ef4444",
};

const topContributors = [
  { name: "Alex Chen", solved: 326, level: "Grandmaster" },
  { name: "Sarah Jenkins", level: "Prime Master", solved: 289 },
];

const expertResources = [
  { title: "Theorem Omnibus v2.4", type: "PDF", size: "12.6 MB" },
  { title: "MIT OpenCourseWare: NT", type: "Video", external: true },
];

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) notFound();

  const modules = slug === "number-theory" ? numberTheoryModules : [];

  return (
    <div className="space-y-6">
      {/* Hero — visible to all */}
      <div className="glass rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-10 -right-10 w-72 h-72 rounded-full blur-3xl"
            style={{ backgroundColor: `${topic.color}15` }}
          />
        </div>
        <div className="relative">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider"
            style={{ backgroundColor: `${topic.color}20`, color: topic.color }}
          >
            Foundation Tier • {modules.length * 4} Modules • {topic.lessonCount * 4} Lessons
          </span>
          <h1 className="font-heading text-5xl font-extrabold text-white mt-4 italic">
            {topic.name}
          </h1>
          <p className="text-[#94a3b8] text-sm mt-3 max-w-2xl leading-relaxed">
            {topic.description}
          </p>
          <div className="mt-5 flex gap-3">
            <Link
              href="/login"
              className="gradient-violet glow-violet text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:scale-105 transition-all"
            >
              Sign In to Start Learning
            </Link>
            <Link
              href="/topics"
              className="bg-white/[0.06] border border-white/[0.1] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/[0.1] transition-all"
            >
              ← All Topics
            </Link>
          </div>
        </div>
      </div>

      {/* Syllabus + Sidebar — gated for visitors */}
      <LoginWall
        title="Sign In to Access Lessons"
        description="Join free to unlock the full syllabus path, problem sets, progress tracking, and expert resources for this topic."
      >
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Syllabus Path */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-heading font-semibold text-white text-xl flex items-center gap-2">
              <BookOpen size={18} className="text-[#7c3aed]" /> Syllabus Path
            </h2>

            {modules.length > 0 ? (
              modules.map((mod) => (
                <div key={mod.id} className="glass rounded-2xl p-5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                      style={{ backgroundColor: `${topic.color}20`, color: topic.color }}
                    >
                      Σ
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-semibold text-white">{mod.name}</h3>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            backgroundColor: `${difficultyColors[mod.difficulty]}15`,
                            color: difficultyColors[mod.difficulty],
                          }}
                        >
                          {mod.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-[#94a3b8]">{mod.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button className="flex items-center gap-2 gradient-violet text-white text-xs font-medium px-4 py-2 rounded-lg whitespace-nowrap hover:scale-105 transition-all">
                      ▶ Start Lesson
                    </button>
                    <button className="text-xs text-[#94a3b8] hover:text-white transition-colors text-center">
                      Practice Problems
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass rounded-2xl p-8 text-center">
                <p className="text-[#94a3b8]">Modules coming soon for {topic.name}.</p>
              </div>
            )}

            <h2 className="font-heading font-semibold text-white text-xl pt-2">Expert Resources</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {expertResources.map((res) => (
                <div key={res.title} className="glass rounded-xl p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed]">
                    {res.external ? <ExternalLink size={14} /> : <Download size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{res.title}</p>
                    <p className="text-xs text-[#94a3b8]">
                      {res.type} {res.size && `• ${res.size}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5">
              <h3 className="font-heading font-semibold text-white mb-4">Topic Progress</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                    <circle
                      cx="48" cy="48" r="40" fill="none"
                      stroke="#7c3aed" strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 40 * 0.75} ${2 * Math.PI * 40}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading font-bold text-white text-xl">75%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <h3 className="font-heading font-semibold text-white mb-4 flex items-center gap-2">
                <Trophy size={16} className="text-[#f59e0b]" /> Top Contributors
              </h3>
              <div className="space-y-3">
                {topContributors.map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 gradient-violet rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {c.name[0]}
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{c.name}</p>
                      <p className="text-xs text-[#94a3b8]">{c.solved} problems solved</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-gradient-to-br from-[#7c3aed]/30 to-[#4f46e5]/20 border border-[#7c3aed]/30">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-[#a78bfa]" />
                <h3 className="font-heading font-semibold text-white text-sm">Need a Mentor?</h3>
              </div>
              <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">
                Connect with Grandmasters for 1-on-1 sessions.
              </p>
              <button className="w-full bg-white text-[#7c3aed] font-bold text-sm py-2.5 rounded-xl hover:bg-white/90 transition-all">
                Find a Mentor
              </button>
            </div>

            <button className="w-full gradient-violet glow-violet text-white font-semibold py-3 rounded-xl hover:scale-105 transition-all text-sm flex items-center justify-center gap-2">
              <Flame size={16} /> Start Daily Challenge
            </button>
          </div>
        </div>
      </LoginWall>
    </div>
  );
}

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}
