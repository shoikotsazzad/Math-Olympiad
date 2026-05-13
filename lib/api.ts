/**
 * API layer — currently returns mock data.
 * Set NEXT_PUBLIC_API_URL in .env to switch to the Laravel backend.
 */

import { topics, numberTheoryModules } from "./mock/topics";
import { tests, sampleQuestions } from "./mock/tests";
import { dashboardStats, leaderboard } from "./mock/dashboard";
import { events, internalEvents } from "./mock/events";
import { todaysPuzzle } from "./mock/puzzle";

const BASE = process.env.NEXT_PUBLIC_API_URL;

async function get<T>(path: string, fallback: T): Promise<T> {
  if (!BASE) return fallback;
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) return fallback;
  return res.json();
}

export const api = {
  getTopics: () => get("/api/topics", topics),
  getTopicModules: (slug: string) =>
    get(`/api/topics/${slug}/modules`, slug === "number-theory" ? numberTheoryModules : []),
  getTests: () => get("/api/tests", tests),
  getTestQuestions: (id: string) => get(`/api/tests/${id}/questions`, sampleQuestions),
  getDashboardStats: () => get("/api/dashboard", dashboardStats),
  getLeaderboard: () => get("/api/leaderboard", leaderboard),
  getEvents: () => get("/api/events", events),
  getInternalEvents: () => get("/api/events/internal", internalEvents),
  getDailyPuzzle: () => get("/api/puzzle/today", todaysPuzzle),
};
