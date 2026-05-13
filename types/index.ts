export type UserRole = "STUDENT" | "ADMIN" | "FACULTY";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Elite";
export type OlympiadType = "BdMO" | "AMC" | "IMO" | "INTERNAL";
export type QuestionState = "unanswered" | "answered" | "marked" | "skipped";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  xp: number;
  streak: number;
  level: string;
  avatar?: string;
  // Extended profile fields
  gender?: string;
  dob?: string;
  phone?: string;
  address?: string;
  university?: string;
  about?: string;
}

export interface Topic {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl?: string;
  level: Difficulty;
  lessonCount: number;
  problemCount: number;
  color: string;
}

export interface Module {
  id: string;
  topicId: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  lessonCount: number;
  order: number;
}

export interface Question {
  id: string;
  content: string;
  options: string[];
  correctOption: number;
  explanation: string;
  topicId: string;
  difficulty: Difficulty;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: Difficulty;
  topicId: string;
  questionCount: number;
  isPublic: boolean;
  source?: string;
  tags: string[];
}

export interface TestAttempt {
  id: string;
  userId: string;
  testId: string;
  testTitle: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeSpent: number;
  submittedAt: string;
  topicBreakdown: { topic: string; accuracy: number; avgAccuracy: number }[];
}

export interface DailyPuzzle {
  id: string;
  date: string;
  content: string;
  difficulty: Difficulty;
  topic: string;
  streakCount: number;
  topSolvers: { name: string; time: string; avatar?: string }[];
  previousPuzzles: { id: string; title: string; topic: string; date: string }[];
}

export interface Event {
  id: string;
  title: string;
  type: OlympiadType;
  date: string;
  location: string;
  officialLink?: string;
  registrationLink?: string;
  description: string;
  isInternal: boolean;
  time?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  department: string;
  rating: number;
  trend: "up" | "down" | "stable";
  avatar?: string;
}

export interface DashboardStats {
  testsTaken: number;
  averageScore: number;
  bestScore: number;
  totalTime: string;
  topicMastery: { topic: string; accuracy: number; speed: number }[];
  recentActivity: { type: string; title: string; score?: string; xp?: number; time: string }[];
  learningPath: { title: string; progress: number; status: string }[];
  recommendedNext: { title: string; topic: string; level: Difficulty };
}
