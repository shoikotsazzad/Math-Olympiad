import type { DailyPuzzle } from "@/types";

export const todaysPuzzle: DailyPuzzle = {
  id: "puzzle-2024-march-14",
  date: "March 14, 2024 • Pi Day Special",
  content:
    "Find the number of positive integers $a$ such that $a + 50$ divides $a^2 + 100$. Prove your result using the property of modular arithmetic.",
  difficulty: "Intermediate",
  topic: "Combinatorics",
  streakCount: 12,
  topSolvers: [
    { name: "Alex Chen", time: "04:32" },
    { name: "Sarah Afrin", time: "07:18" },
  ],
  previousPuzzles: [
    { id: "p1", title: "The Divisibility Paradox", topic: "Number Theory", date: "March 13" },
    { id: "p2", title: "The Pigeonhole Labyrinth", topic: "Combinatorics", date: "March 12" },
    { id: "p3", title: "Euclid's Trinity Mystery", topic: "Number Theory", date: "March 11" },
  ],
};
