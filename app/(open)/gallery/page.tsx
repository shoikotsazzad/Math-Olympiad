import { Images, Calendar, Trophy, Users, GraduationCap } from "lucide-react";

const albums = [
  {
    title: "UIU Internal Olympiad 2024 — Finals",
    date: "June 2024",
    photos: 24,
    category: "Competition",
    color: "#d97706",
    icon: Trophy,
    coverGradient: "from-amber-400 to-amber-600",
    desc: "Grand finale of the annual UIU Internal Math Olympiad with prize-giving ceremony.",
  },
  {
    title: "BdMO Pre-Training Camp 2024",
    date: "January 2024",
    photos: 18,
    category: "Training",
    color: "#f59e0b",
    icon: GraduationCap,
    coverGradient: "from-yellow-400 to-amber-500",
    desc: "5-day intensive camp preparing students for the BdMO regional round.",
  },
  {
    title: "Guest Lecture: Dr. Rahman on NT",
    date: "September 2023",
    photos: 12,
    category: "Seminar",
    color: "#b45309",
    icon: Users,
    coverGradient: "from-orange-500 to-amber-700",
    desc: "Seminar on Advanced Number Theory techniques by Dr. Aminur Rahman, BdMO alumnus.",
  },
  {
    title: "UIU Olympiad 2023 — All Rounds",
    date: "April–May 2023",
    photos: 36,
    category: "Competition",
    color: "#d97706",
    icon: Trophy,
    coverGradient: "from-amber-500 to-orange-600",
    desc: "Full photo coverage of the 2023 olympiad from preliminary to award ceremony.",
  },
  {
    title: "Weekly Problem Sessions — 2023",
    date: "2023",
    photos: 20,
    category: "Workshop",
    color: "#059669",
    icon: Calendar,
    coverGradient: "from-emerald-500 to-teal-600",
    desc: "Highlights from Thursday evening problem-solving sessions throughout the year.",
  },
  {
    title: "Inter-University Challenge 2023",
    date: "March 2023",
    photos: 15,
    category: "Competition",
    color: "#0891b2",
    icon: Trophy,
    coverGradient: "from-cyan-500 to-sky-600",
    desc: "UIU vs BUET vs IUT team math challenge — collaborative and competitive.",
  },
];

const categories = ["All", "Competition", "Training", "Workshop", "Seminar"];

export default function GalleryPage() {
  return (
    <div>

        {/* Hero */}
        <section className="relative overflow-hidden pt-16 pb-12">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-[#d97706]/6 blur-[120px]" />
          </div>
          <div className="relative max-w-screen-xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[#d97706]/10 border border-[#d97706]/25 rounded-full px-4 py-1.5 text-sm text-[#92400e] mb-7">
              <Images size={13} />
              Memories &amp; Highlights
            </div>
            <h1 className="font-heading font-extrabold text-5xl md:text-[3.5rem] text-slate-900 leading-[1.1] tracking-tight">
              Our <span className="gradient-text-orange">Gallery</span>
            </h1>
            <p className="mt-5 text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
              A visual record of UIU CMOR&apos;s competitions, training sessions, award ceremonies, and community moments.
            </p>
          </div>
        </section>

        <div className="max-w-screen-xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#d97706]/20 to-transparent" />
        </div>

        {/* Category filter */}
        <section className="max-w-screen-xl mx-auto px-6 pt-10 pb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`text-sm font-medium px-4 py-1.5 rounded-full border transition-all ${
                  cat === "All"
                    ? "gradient-orange text-white border-transparent glow-orange"
                    : "bg-white text-slate-600 border-slate-200 hover:border-[#d97706]/30 hover:text-[#d97706]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Albums grid */}
        <section className="max-w-screen-xl mx-auto px-6 py-8 pb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {albums.map(({ title, date, photos, category, color, icon: Icon, coverGradient, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
              >
                {/* Cover */}
                <div className={`h-40 bg-gradient-to-br ${coverGradient} relative flex items-center justify-center`}>
                  <Icon size={40} className="text-white/60" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                  <span
                    className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "#fff", backdropFilter: "blur(8px)" }}
                  >
                    {category}
                  </span>
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/80 bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {photos} photos
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="font-heading font-bold text-slate-900 text-sm leading-snug">{title}</p>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{desc}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar size={11} /> {date}
                    </span>
                    <button
                      className="text-xs font-semibold transition-colors"
                      style={{ color }}
                    >
                      View Album →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state notice */}
          <div className="mt-10 text-center py-8 bg-amber-50 rounded-2xl border border-amber-100">
            <Images size={28} className="text-amber-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500 font-medium">More photos are being uploaded regularly.</p>
            <p className="text-xs text-slate-400 mt-1">Check back after each event for fresh albums.</p>
          </div>
        </section>

    </div>
  );
}
