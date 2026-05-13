import Link from "next/link";
import { topics } from "@/lib/mock/topics";
import { BookOpen, ArrowRight, Lock } from "lucide-react";

const difficultyColors: Record<string, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#7c3aed",
  Elite: "#ef4444",
};

export default function TopicsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="glass rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7c3aed]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative">
          <p className="text-xs text-[#94a3b8] uppercase tracking-widest mb-3">
            Academic Syllabus 2024
          </p>
          <h1 className="font-heading text-4xl font-extrabold text-white leading-tight">
            Master the <span className="gradient-text">Foundations</span>
          </h1>
          <p className="text-[#94a3b8] mt-3 max-w-lg text-sm leading-relaxed">
            Explore the core pillars of competitive mathematics. Our curated syllabus is designed to
            take you from fundamental principles to world-class problem-solving techniques.
          </p>
        </div>
      </div>

      {/* Topic grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/topics/${topic.slug}`}
            className="glass glass-hover rounded-2xl p-6 flex flex-col gap-4 group"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
              style={{ backgroundColor: `${topic.color}25`, color: topic.color }}
            >
              {topic.name[0]}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-heading font-semibold text-white text-lg">{topic.name}</h3>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${difficultyColors[topic.level]}15`,
                    color: difficultyColors[topic.level],
                  }}
                >
                  {topic.level}
                </span>
              </div>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{topic.description}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-[#64748b]">
              <span className="flex items-center gap-1.5">
                <BookOpen size={12} /> {topic.lessonCount} Lessons
              </span>
              <span className="flex items-center gap-1.5 text-[#7c3aed] group-hover:text-[#a78bfa] transition-colors">
                View Problems <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="glass rounded-2xl p-8 text-center">
        <Lock size={20} className="text-[#a78bfa] mx-auto mb-3" />
        <h3 className="font-heading font-bold text-white text-2xl mb-2">
          Ready to Start Learning?
        </h3>
        <p className="text-[#94a3b8] text-sm mb-6 max-w-md mx-auto">
          Sign in to access full lessons, problem sets, progress tracking, and personalized
          recommendations across all topics.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="gradient-violet glow-violet text-white font-semibold px-6 py-2.5 rounded-full hover:scale-105 transition-all text-sm"
          >
            Sign In to Start
          </Link>
          <Link
            href="/about"
            className="bg-white/[0.06] border border-white/[0.1] text-white font-medium px-6 py-2.5 rounded-full hover:bg-white/[0.1] transition-all text-sm"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
