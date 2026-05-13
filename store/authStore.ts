"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

const mockStudent: User = {
  id: "u1",
  name: "Alex Mercer",
  email: "alex.mercer@uiu.ac.bd",
  role: "STUDENT",
  department: "CSE",
  xp: 1242,
  streak: 42,
  level: "Grandmaster",
};

const mockAdmin: User = {
  id: "a1",
  name: "Faculty Admin",
  email: "admin@uiu.ac.bd",
  role: "ADMIN",
  department: "CSE",
  xp: 0,
  streak: 0,
  level: "Admin",
};

export const ADMIN_EMAIL = "admin@uiu.ac.bd";
export const ADMIN_PASSWORD = "UIUAdmin2024";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loginAsStudent: (email: string, name?: string) => void;
  loginAsAdmin: () => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loginAsStudent: (email: string, name?: string) =>
        set({
          user: { ...mockStudent, email, name: name ?? email.split("@")[0] },
          isAuthenticated: true,
        }),
      loginAsAdmin: () => set({ user: mockAdmin, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data: Partial<User>) =>
        set((s) => (s.user ? { user: { ...s.user, ...data } } : {})),
    }),
    { name: "uiu-auth" }
  )
);
