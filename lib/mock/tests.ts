import type { Test, Question } from "@/types";

export const tests: Test[] = [
  {
    id: "comb-masterclass-4",
    title: "Combinatorics Masterclass #4",
    description: "Advanced combinatorics covering graph theory and generating functions.",
    duration: 90,
    difficulty: "Advanced",
    topicId: "combinatorics",
    questionCount: 15,
    isPublic: true,
    source: "UIU Internal",
    tags: ["Graph Theory", "Generating Functions"],
  },
  {
    id: "nt-sprint-1",
    title: "Number Theory Sprint #1",
    description: "Fast-paced number theory covering modular arithmetic basics.",
    duration: 45,
    difficulty: "Intermediate",
    topicId: "number-theory",
    questionCount: 10,
    isPublic: true,
    source: "UIU Internal",
    tags: ["Modular Arithmetic", "Primes"],
  },
  {
    id: "geometry-mock-4",
    title: "Advanced Geometry Mock #4",
    description: "Full-length geometry test with circle theorems and projective geometry.",
    duration: 120,
    difficulty: "Advanced",
    topicId: "geometry",
    questionCount: 20,
    isPublic: true,
    source: "BdMO Style",
    tags: ["Circle Theorems", "Projective Geometry"],
  },
  {
    id: "algebra-fundamentals",
    title: "Algebra Fundamentals",
    description: "Polynomials, factoring, and functional equations for beginners.",
    duration: 60,
    difficulty: "Beginner",
    topicId: "algebra",
    questionCount: 12,
    isPublic: true,
    source: "UIU Internal",
    tags: ["Polynomials", "Functional Equations"],
  },
  {
    id: "bdmo-2023-regional",
    title: "BdMO 2023 Regional Practice",
    description: "Practice set modeled after BdMO 2023 regional round questions.",
    duration: 180,
    difficulty: "Advanced",
    topicId: "combinatorics",
    questionCount: 25,
    isPublic: true,
    source: "BdMO 2023 Regionals",
    tags: ["BdMO", "Regional"],
  },
];

export const sampleQuestions: Question[] = [
  {
    id: "q1",
    content:
      "Let $n$ be a positive integer such that $n + 4q$ and $n - 4n$ are both perfect cubes. Find the sum of all possible values of $n$.",
    options: ["125", "132", "144", "156"],
    correctOption: 2,
    explanation:
      "By analyzing the constraints, $n = 144$ satisfies both conditions. The sum of perfect cubes condition limits $n$ to a finite set.",
    topicId: "number-theory",
    difficulty: "Advanced",
  },
  {
    id: "q2",
    content:
      "Using Modular Arithmetic and Fermat's Little Theorem, find the remainder when $3^{100}$ is divided by $7$.",
    options: ["1", "2", "3", "4"],
    correctOption: 0,
    explanation:
      "By Fermat's Little Theorem, $3^6 \\equiv 1 \\pmod{7}$. Since $100 = 16 \\cdot 6 + 4$, we get $3^{100} \\equiv 3^4 = 81 \\equiv 4 \\pmod{7}$. Wait — $81 = 11 \\cdot 7 + 4$, so remainder is $4$. Actually checking: $3^1=3, 3^2=2, 3^3=6, 3^4=4, 3^5=5, 3^6=1$ mod 7. $100 \\mod 6 = 4$, so $3^{100} \\equiv 3^4 \\equiv 4 \\pmod 7$.",
    topicId: "number-theory",
    difficulty: "Intermediate",
  },
  {
    id: "q3",
    content:
      "Solving Systems of Linear Diophantine Equations: Find integer solutions to $6x + 10y = 14$.",
    options: [
      "$(x,y) = (4, -1)$",
      "$(x,y) = (2, -1)$ and infinitely many others",
      "No solution exists",
      "$(x,y) = (1, 1)$",
    ],
    correctOption: 1,
    explanation:
      "$\\gcd(6,10) = 2$ divides $14$, so solutions exist. A particular solution is $(x,y) = (2,-1)$. The general solution is $x = 2 + 5t$, $y = -1 - 3t$ for any integer $t$.",
    topicId: "number-theory",
    difficulty: "Intermediate",
  },
];
