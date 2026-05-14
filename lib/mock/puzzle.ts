import type { DailyPuzzle } from "@/types";
import type { Tier } from "@/types";

export const puzzlesByTier: Record<Tier, DailyPuzzle> = {
  Beginner: {
    id: "puzzle-beginner-2026-may-14",
    date: "May 14, 2026 • School Level",
    content: "A number leaves remainder 4 when divided by 6, and remainder 7 when divided by 9. Find the smallest such positive integer.",
    difficulty: "Beginner",
    tier: "Beginner",
    topic: "Number Theory",
    streakCount: 5,
    topSolvers: [
      { name: "Maliha Sultana",  time: "03:21" },
      { name: "Arif Hasan",      time: "05:47" },
      { name: "Tasnim Rahman",   time: "07:12" },
    ],
    previousPuzzles: [
      { id: "pb1", title: "The Division Remainder",   topic: "Number Theory", date: "May 13" },
      { id: "pb2", title: "Sum of Digits Puzzle",      topic: "Algebra",       date: "May 12" },
      { id: "pb3", title: "Triangle Count",            topic: "Combinatorics", date: "May 11" },
      { id: "pb4", title: "Factor Finder",             topic: "Number Theory", date: "May 10" },
      { id: "pb5", title: "Quadratic Roots",           topic: "Algebra",       date: "May 9"  },
    ],
  },
  Intermediate: {
    id: "puzzle-intermediate-2026-may-14",
    date: "May 14, 2026 • College Level",
    content: "Find the number of positive integers $a$ such that $a+50$ divides $a^2+100$. Prove your result using the property of modular arithmetic.",
    difficulty: "Intermediate",
    tier: "Intermediate",
    topic: "Combinatorics",
    streakCount: 12,
    topSolvers: [
      { name: "Fahim Hossain",  time: "04:32" },
      { name: "Lamia Akter",    time: "07:18" },
      { name: "Tahmid Reza",    time: "09:55" },
    ],
    previousPuzzles: [
      { id: "pi1", title: "The Divisibility Paradox",  topic: "Number Theory", date: "May 13" },
      { id: "pi2", title: "The Pigeonhole Labyrinth",  topic: "Combinatorics", date: "May 12" },
      { id: "pi3", title: "Euclid's Trinity Mystery",  topic: "Number Theory", date: "May 11" },
      { id: "pi4", title: "Circle Chord Count",        topic: "Geometry",      date: "May 10" },
      { id: "pi5", title: "Inclusion-Exclusion Dance", topic: "Combinatorics", date: "May 9"  },
    ],
  },
  Advanced: {
    id: "puzzle-advanced-2026-may-14",
    date: "May 14, 2026 • University Level",
    content: "Let $p$ be an odd prime and $a$ an integer not divisible by $p$. Prove that $a^{p-1}\\equiv 1\\pmod{p}$, then use this to find the last two digits of $7^{1000}$.",
    difficulty: "Advanced",
    tier: "Advanced",
    topic: "Number Theory",
    streakCount: 21,
    topSolvers: [
      { name: "Adnan Chowdhury", time: "02:47" },
      { name: "Sarah Jubaida",   time: "03:58" },
      { name: "Rahat Khan",      time: "05:23" },
    ],
    previousPuzzles: [
      { id: "pa1", title: "IMO 2023 NT Shortlist",     topic: "Number Theory", date: "May 13" },
      { id: "pa2", title: "Diophantine System",         topic: "Number Theory", date: "May 12" },
      { id: "pa3", title: "Cauchy-Schwarz Marathon",   topic: "Inequalities",  date: "May 11" },
      { id: "pa4", title: "Ramsey Graph Coloring",     topic: "Combinatorics", date: "May 10" },
      { id: "pa5", title: "Jensen's Inequality Chain", topic: "Inequalities",  date: "May 9"  },
    ],
  },
};

export const todaysPuzzle: DailyPuzzle = puzzlesByTier.Intermediate;
