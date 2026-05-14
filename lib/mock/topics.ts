import type { Topic, Module } from "@/types";

export const topics: Topic[] = [
  {
    id: "algebra",
    slug: "algebra",
    name: "Algebra",
    description:
      "Polynomials, functional equations, and complex inequalities. Master the language of variables and abstract structures.",
    tier: "Beginner",
    level: "Beginner",
    lessonCount: 14,
    problemCount: 120,
    color: "#7c3aed",
  },
  {
    id: "geometry",
    slug: "geometry",
    name: "Geometry",
    description:
      "Euclidean constructions, projective geometry, and advanced circle theorems. Visualizing logic through spatial forms.",
    tier: "Intermediate",
    level: "Intermediate",
    lessonCount: 15,
    problemCount: 98,
    color: "#4f46e5",
  },
  {
    id: "number-theory",
    slug: "number-theory",
    name: "Number Theory",
    description:
      "Modular arithmetic, Diophantine equations, and prime distribution — the profound properties of integers.",
    tier: "Advanced",
    level: "Advanced",
    lessonCount: 12,
    problemCount: 110,
    color: "#0891b2",
  },
  {
    id: "combinatorics",
    slug: "combinatorics",
    name: "Combinatorics",
    description:
      "Graph theory, pigeonhole principle, and generating functions. Counting the infinite ways elements can be combined.",
    tier: "Intermediate",
    level: "Intermediate",
    lessonCount: 11,
    problemCount: 88,
    color: "#059669",
  },
  {
    id: "inequalities",
    slug: "inequalities",
    name: "Inequalities",
    description:
      "AM-GM, Cauchy-Schwarz, and Jensen's inequality. Mastery of bounds and extremal values.",
    tier: "Advanced",
    level: "Advanced",
    lessonCount: 8,
    problemCount: 72,
    color: "#d97706",
  },
  {
    id: "mathematical-logic",
    slug: "mathematical-logic",
    name: "Mathematical Logic",
    description:
      "The cornerstone of all proof-based mathematics. Set theory, formal proofs, and structural integrity of mathematical arguments.",
    tier: "Beginner",
    level: "Beginner",
    lessonCount: 10,
    problemCount: 60,
    color: "#be185d",
  },
];

export const numberTheoryModules: Module[] = [
  {
    id: "mod-arithmetic",
    topicId: "number-theory",
    name: "Modular Arithmetic",
    description:
      "Master congruences, Fermat's Little Theorem, and the Chinese Remainder Theorem.",
    difficulty: "Advanced",
    lessonCount: 4,
    order: 1,
  },
  {
    id: "primes",
    topicId: "number-theory",
    name: "Primes & Factorization",
    description:
      "The Fundamental Theorem of Arithmetic, Sieve of Eratosthenes, and distribution of primes.",
    difficulty: "Intermediate",
    lessonCount: 3,
    order: 2,
  },
  {
    id: "diophantine",
    topicId: "number-theory",
    name: "Diophantine Equations",
    description:
      "Linear and non-linear equations with integer solutions — Pell's Equation and Pythagorean triples.",
    difficulty: "Elite",
    lessonCount: 5,
    order: 3,
  },
];
