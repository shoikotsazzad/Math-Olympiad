import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockUsers, type AdminUser } from "@/lib/mock/users";

interface UsersState {
  users: AdminUser[];
  addUser: (user: AdminUser) => void;
  removeUser: (id: string) => void;
  updateUser: (id: string, data: Partial<AdminUser>) => void;
}

export const useUsersStore = create<UsersState>()(
  persist(
    (set) => ({
      users: mockUsers,
      addUser: (user) => set((s) => ({ users: [user, ...s.users] })),
      removeUser: (id) => set((s) => ({ users: s.users.filter((u) => u.id !== id) })),
      updateUser: (id, data) =>
        set((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, ...data } : u)) })),
    }),
    { name: "uiu-users" }
  )
);
