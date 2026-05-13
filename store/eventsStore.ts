import { create } from "zustand";
import { persist } from "zustand/middleware";
import { events as initialEvents, internalEvents as initialInternal } from "@/lib/mock/events";
import type { Event } from "@/types";

export interface InternalEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  type: string;
  typeColor: string;
}

interface EventsState {
  events: Event[];
  internalEvents: InternalEvent[];
  // External events CRUD
  addEvent: (ev: Event) => void;
  updateEvent: (id: string, data: Partial<Event>) => void;
  removeEvent: (id: string) => void;
  // Internal events CRUD
  addInternal: (ev: InternalEvent) => void;
  updateInternal: (id: string, data: Partial<InternalEvent>) => void;
  removeInternal: (id: string) => void;
}

export const useEventsStore = create<EventsState>()(
  persist(
    (set) => ({
      events: initialEvents,
      internalEvents: initialInternal,
      addEvent: (ev) => set((s) => ({ events: [ev, ...s.events] })),
      updateEvent: (id, data) =>
        set((s) => ({ events: s.events.map((e) => (e.id === id ? { ...e, ...data } : e)) })),
      removeEvent: (id) => set((s) => ({ events: s.events.filter((e) => e.id !== id) })),
      addInternal: (ev) => set((s) => ({ internalEvents: [ev, ...s.internalEvents] })),
      updateInternal: (id, data) =>
        set((s) => ({
          internalEvents: s.internalEvents.map((e) => (e.id === id ? { ...e, ...data } : e)),
        })),
      removeInternal: (id) =>
        set((s) => ({ internalEvents: s.internalEvents.filter((e) => e.id !== id) })),
    }),
    { name: "uiu-events" }
  )
);
