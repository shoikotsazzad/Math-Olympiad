"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Radio, Clock, BookOpen, ChevronRight, Calendar } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useEventsStore } from "@/store/eventsStore";
import type { LiveExam, Tier } from "@/types";

const tierColors: Record<Tier, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#7c3aed",
};

function calcRemaining(scheduledAt: string): number {
  return Math.max(0, Math.floor((new Date(scheduledAt).getTime() - Date.now()) / 1000));
}

function formatCountdown(seconds: number): { days: string; hours: string; mins: string; secs: string } {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return {
    days: String(d).padStart(2, "0"),
    hours: String(h).padStart(2, "0"),
    mins: String(m).padStart(2, "0"),
    secs: String(s).padStart(2, "0"),
  };
}

function formatScheduled(iso: string): string {
  return new Date(iso).toLocaleString("en-BD", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function LiveExamCard({ exam }: { exam: LiveExam }) {
  const [remaining, setRemaining] = useState(() => calcRemaining(exam.scheduledAt));

  useEffect(() => {
    const interval = setInterval(() => setRemaining(calcRemaining(exam.scheduledAt)), 1000);
    return () => clearInterval(interval);
  }, [exam.scheduledAt]);

  const isLive = exam.status === "live" || (exam.status === "upcoming" && remaining === 0);
  const isEnded = exam.status === "ended";
  const countdown = formatCountdown(remaining);
  const tierColor = tierColors[exam.tier];

  return (
    <div
      className="glass rounded-2xl p-6 space-y-5 border"
      style={{ borderColor: isLive ? `${tierColor}50` : "rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style={{ color: tierColor, backgroundColor: `${tierColor}18` }}
            >
              {exam.tier}
            </span>
            {isLive && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#10b981] bg-[#10b981]/15 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                LIVE
              </span>
            )}
            {isEnded && (
              <span className="text-xs font-medium text-[#64748b] bg-white/[0.06] px-2.5 py-0.5 rounded-full">
                Ended
              </span>
            )}
          </div>
          <h3 className="font-heading font-bold text-white text-lg">{exam.title}</h3>
          <p className="text-sm text-[#94a3b8] mt-1">{exam.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-[#94a3b8]">
        <span className="flex items-center gap-1.5">
          <Calendar size={12} /> {formatScheduled(exam.scheduledAt)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={12} /> {exam.duration} min
        </span>
        <span className="flex items-center gap-1.5">
          <BookOpen size={12} /> {exam.questionCount} questions
        </span>
      </div>

      {/* Countdown */}
      {!isEnded && !isLive && remaining > 0 && (
        <div>
          <p className="text-xs text-[#64748b] uppercase tracking-wider mb-2">Starts in</p>
          <div className="flex gap-2">
            {[
              { label: "Days", value: countdown.days },
              { label: "Hours", value: countdown.hours },
              { label: "Mins", value: countdown.mins },
              { label: "Secs", value: countdown.secs },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex-1 rounded-xl py-3 text-center border"
                style={{ backgroundColor: `${tierColor}10`, borderColor: `${tierColor}30` }}
              >
                <p className="font-heading font-bold text-xl text-white">{value}</p>
                <p className="text-[10px] text-[#64748b] mt-0.5 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action button */}
      {isLive && exam.testId ? (
        <Link
          href={`/tests/${exam.testId}`}
          className="flex items-center justify-center gap-2 text-white text-sm font-semibold py-3 rounded-xl hover:scale-[1.02] transition-all"
          style={{ background: `linear-gradient(135deg, ${tierColor}, ${tierColor}cc)` }}
        >
          Join Now — Exam is Live! <ChevronRight size={16} />
        </Link>
      ) : isEnded ? (
        <button
          disabled
          className="w-full text-sm text-[#64748b] bg-white/[0.04] border border-white/[0.06] py-3 rounded-xl cursor-not-allowed"
        >
          Exam Ended
        </button>
      ) : (
        <button
          disabled
          className="w-full text-sm text-[#64748b] bg-white/[0.04] border border-white/[0.06] py-3 rounded-xl cursor-not-allowed"
        >
          {exam.testId ? "Waiting for exam to start…" : "Questions not yet assigned"}
        </button>
      )}
    </div>
  );
}

export default function LiveExamPage() {
  const { user } = useAuthStore();
  const { liveExams } = useEventsStore();

  const userTier = user?.tier ?? "Beginner";
  const myExams = liveExams.filter((e) => e.tier === userTier);
  const upcoming = myExams.filter((e) => e.status === "upcoming" || e.status === "live");
  const ended = myExams.filter((e) => e.status === "ended");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
            style={{ backgroundColor: `${tierColors[userTier]}15` }}
          />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Radio size={16} style={{ color: tierColors[userTier] }} />
            <p className="text-xs text-[#94a3b8] uppercase tracking-widest">Live Exams</p>
          </div>
          <h1 className="font-heading text-4xl font-extrabold text-white leading-tight">
            Synchronized <span className="gradient-text">Tests</span>
          </h1>
          <p className="text-[#94a3b8] mt-2 text-sm">
            Real-time competitive exams for{" "}
            <span style={{ color: tierColors[userTier] }} className="font-semibold">
              {userTier}
            </span>{" "}
            students. All participants start at the same moment.
          </p>
        </div>
      </div>

      {/* Upcoming / Live */}
      {upcoming.length > 0 ? (
        <div className="space-y-4">
          <h2 className="font-heading font-semibold text-white text-lg">Upcoming & Live</h2>
          {upcoming.map((exam) => (
            <LiveExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-12 text-center">
          <Radio size={32} className="text-[#64748b] mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-white text-lg mb-2">No Upcoming Exams</h3>
          <p className="text-sm text-[#94a3b8]">
            No live exams scheduled for {userTier} students right now. Check back soon!
          </p>
        </div>
      )}

      {/* Ended */}
      {ended.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-heading font-semibold text-[#64748b] text-lg">Past Exams</h2>
          {ended.map((exam) => (
            <LiveExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      )}
    </div>
  );
}
