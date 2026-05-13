"use client";

import { useEventsStore } from "@/store/eventsStore";
import { MapPin, Calendar, ExternalLink, MessageSquare, BookOpen } from "lucide-react";

const typeColors: Record<string, string> = {
  IMO: "#7c3aed",
  BdMO: "#10b981",
  AMC: "#f59e0b",
  INTERNAL: "#0891b2",
};

const internalTypeColors: Record<string, string> = {
  "MOCK SESSION": "#7c3aed",
  "DISCUSSION CLASS": "#0891b2",
  CHALLENGE: "#f59e0b",
};

export default function EventsPage() {
  const { events, internalEvents } = useEventsStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white">Events & Competitions</h1>
        <p className="text-[#94a3b8] text-sm mt-1">
          Compete at the highest level. Track upcoming olympiads and internal UIU events.
        </p>
      </div>

      {/* Hero banner */}
      <div className="glass rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#7c3aed]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative">
          <h2 className="font-heading text-4xl font-extrabold text-white leading-tight">
            Compete at the
            <br />
            <span className="text-[#f59e0b]">Highest Level.</span>
          </h2>
          <p className="text-[#94a3b8] text-sm mt-3 max-w-lg">
            Join international math competitions and internal UIU mock tests. Navigate the
            coordinate planes of excellence.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Olympiads */}
        <div className="space-y-4">
          <h2 className="font-heading font-semibold text-white text-xl">Upcoming Olympiads</h2>
          {events.map((event) => (
            <div key={event.id} className="glass rounded-2xl p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase"
                    style={{
                      backgroundColor: `${typeColors[event.type]}20`,
                      color: typeColors[event.type],
                    }}
                  >
                    {event.type} — INTERNATIONAL
                  </span>
                  <h3 className="font-heading font-semibold text-white mt-2">{event.title}</h3>
                  <p className="text-xs text-[#94a3b8] mt-1">{event.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-[#94a3b8]">
                <span className="flex items-center gap-1.5">
                  <Calendar size={11} /> {event.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={11} /> {event.location}
                </span>
                {event.officialLink && (
                  <span className="flex items-center gap-1.5">
                    <ExternalLink size={11} /> {new URL(event.officialLink).hostname}
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-1.5 gradient-violet text-white text-xs font-semibold px-4 py-2 rounded-xl hover:scale-105 transition-all">
                  Register for Mock
                </button>
                <button className="flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.1] text-white text-xs font-medium px-4 py-2 rounded-xl hover:bg-white/[0.1] transition-all">
                  <BookOpen size={11} /> View Syllabus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <h2 className="font-heading font-semibold text-white text-xl">Internal UIU Events</h2>
          <div className="glass rounded-2xl p-5 space-y-3">
            {internalEvents.map((ev) => {
              const color = internalTypeColors[ev.type] ?? "#7c3aed";
              return (
                <div
                  key={ev.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: `${color}25`, color }}
                      >
                        {ev.type}
                      </span>
                    </div>
                    <p className="text-sm text-white font-medium">{ev.title}</p>
                    <p className="text-xs text-[#94a3b8]">{ev.subtitle}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-[#94a3b8]">{ev.date}</p>
                    <p className="text-xs text-[#64748b]">{ev.time}</p>
                  </div>
                </div>
              );
            })}

            <button className="w-full flex items-center justify-center gap-2 bg-[#5865f2]/20 border border-[#5865f2]/30 text-[#818cf8] text-sm font-medium py-3 rounded-xl hover:bg-[#5865f2]/30 transition-all">
              <MessageSquare size={14} /> Join Community Discord
            </button>
          </div>

          {/* Resource Library */}
          <div className="glass rounded-2xl p-5">
            <h3 className="font-heading font-semibold text-white mb-2">Resource Library</h3>
            <p className="text-xs text-[#94a3b8]">Master Euclidean geometry and Combinatorics.</p>
            <button className="mt-3 text-xs text-[#7c3aed] hover:text-[#a78bfa] transition-colors">
              Explore Assets →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
