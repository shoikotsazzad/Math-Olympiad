import { dashboardStats } from "@/lib/mock/dashboard";
import StatsRow from "@/components/dashboard/StatsRow";
import TopicMastery from "@/components/dashboard/TopicMastery";
import RecentActivity from "@/components/dashboard/RecentActivity";
import LearningPath from "@/components/dashboard/LearningPath";
import RecommendedNext from "@/components/dashboard/RecommendedNext";

export default function DashboardPage() {
  const stats = dashboardStats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Welcome back, Scholar.</h1>
          <p className="text-[#94a3b8] text-sm mt-1">
            Your intellectual journey continues. You are in the top 2% this week.
          </p>
        </div>
        <button className="gradient-violet glow-violet text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:scale-105 transition-all">
          Start Daily Challenge
        </button>
      </div>

      {/* Stats Row */}
      <StatsRow stats={stats} />

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TopicMastery mastery={stats.topicMastery} />
          <RecentActivity activity={stats.recentActivity} />
        </div>
        <div className="space-y-6">
          <RecommendedNext recommended={stats.recommendedNext} />
          <LearningPath path={stats.learningPath} />
        </div>
      </div>
    </div>
  );
}
