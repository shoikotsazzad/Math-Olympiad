import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Users, Mail, MapPin, Sigma } from "lucide-react";

const milestones = [
  {
    year: "2001",
    title: "The Beginning",
    desc: "Educators and mathematicians united to popularize creative mathematics, laying the foundation for an organized olympiad movement in Bangladesh.",
  },
  {
    year: "2003",
    title: "First National Olympiad",
    desc: "The first large-scale national math olympiad was organized by Bangladesh Mathematical Olympiad Committee, supported by Dutch-Bangla Bank PLC, drawing students from schools and colleges nationwide.",
  },
  {
    year: "2004",
    title: "Bangladesh Joins IMO",
    desc: "Bangladesh officially participated in the International Mathematical Olympiad for the first time — a landmark moment for the country's mathematical community.",
  },
  {
    year: "2005–2009",
    title: "Rapid Growth",
    desc: "Regional olympiads spread across cities. Math camps, training sessions, and problem-solving books gained widespread popularity among students.",
  },
  {
    year: "2010",
    title: "Olympiad Culture Expands",
    desc: "Math Olympiad became a household name among school and college students. Newspaper coverage and online forums amplified interest nationwide.",
  },
  {
    year: "2014",
    title: "International Recognition",
    desc: "Bangladeshi students began achieving stronger international performances through improved training systems and dedicated mentorship programs.",
  },
  {
    year: "2020",
    title: "Online Olympiads",
    desc: "The pandemic shifted all olympiad activities online. Virtual camps, digital exams, and e-learning platforms ensured continuity through COVID-19.",
  },
  {
    year: "2026",
    title: "Present Era",
    desc: "BdMO now organizes nationwide programs with thousands of participants annually. Students prepare using online platforms, global resources, and advanced problem-solving communities.",
  },
];

const team = [
  { name: "Dr. Md. Rafiqul Islam", role: "Faculty Advisor", dept: "Department of Mathematics", initial: "R" },
  { name: "Prof. Tahmina Akhtar", role: "Competition Coordinator", dept: "Department of CSE", initial: "T" },
  { name: "Adnan Chowdhury", role: "Student Club President", dept: "BSc CSE, Batch 50", initial: "A" },
  { name: "Sarah Jubaida", role: "Problem Setter Lead", dept: "BSc EEE, Batch 49", initial: "S" },
];

const stats = [
  { value: "4,281", label: "Active Students" },
  { value: "500+", label: "Practice Problems" },
  { value: "12", label: "Departments" },
  { value: "6", label: "National Medalists" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-[#7c3aed]/40" />
      <span className="text-xs font-semibold text-[#a78bfa] uppercase tracking-widest">{children}</span>
      <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-[#7c3aed]/40" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-16 pb-12">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#7c3aed]/12 blur-[130px]" />
          </div>
          <div className="relative max-w-screen-xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[#7c3aed]/20 border border-[#7c3aed]/30 rounded-full px-4 py-1.5 text-sm text-[#a78bfa] mb-7">
              <Sigma size={13} />
              United International University
            </div>
            <h1 className="font-heading font-extrabold text-5xl md:text-[4rem] text-white leading-[1.1] tracking-tight">
              About <span className="gradient-text">UIU Math Olympiad</span>
            </h1>
            <p className="mt-5 text-[#94a3b8] text-base max-w-xl mx-auto leading-relaxed">
              Founded in 2019, UIU Math Olympiad has been at the forefront of mathematical
              excellence and competitive problem solving within United International University.
            </p>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent" />
        </div>

        {/* ── Mission + Vision ── */}
        <section className="max-w-screen-xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl p-8 bg-[#0d0d1a] border border-[#7c3aed]/25 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#7c3aed]/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
              <div className="relative">
                <p className="font-heading font-bold text-[#a78bfa] text-xl mb-3">Our Mission</p>
                <p className="text-[#94a3b8] leading-relaxed text-sm">
                  To democratise access to olympiad-level mathematics preparation inside UIU and help
                  every motivated student reach their peak potential in national and international
                  competitions, while nurturing future problem-solvers and mathematical thinkers.
                </p>
              </div>
            </div>
            <div className="rounded-2xl p-8 bg-[#0d0d1a] border border-[#4f46e5]/25 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4f46e5]/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
              <div className="relative">
                <p className="font-heading font-bold text-[#818cf8] text-xl mb-3">Our Vision</p>
                <p className="text-[#94a3b8] leading-relaxed text-sm">
                  To be the leading student-run mathematics hub in Bangladesh, recognised for
                  fostering excellence in competitive mathematics, innovation in problem solving,
                  and sustained national and international olympiad achievement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="max-w-screen-xl mx-auto px-6 pb-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl py-7 px-5 text-center bg-[#0d0d1a] border border-[#7c3aed]/20 hover:border-[#7c3aed]/40 transition-colors"
              >
                <p className="font-heading text-4xl font-extrabold gradient-text">{s.value}</p>
                <p className="text-xs text-[#64748b] mt-2 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent" />
        </div>

        {/* ── Our Journey ── */}
        <section className="max-w-screen-xl mx-auto px-6 py-14">
          <SectionLabel>Timeline</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-white text-center mb-12">
            History of Math Olympiad in Bangladesh
          </h2>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#7c3aed]/40 to-transparent" />

            <div className="flex flex-col gap-8">
              {milestones.map((m, i) => {
                const isRight = i % 2 === 0;
                return (
                  <div key={m.year} className="grid grid-cols-[1fr_28px_1fr] items-center">
                    {isRight ? (
                      <div />
                    ) : (
                      <div className="pr-7">
                        <div className="rounded-xl p-5 bg-[#0d0d1a] border border-[#7c3aed]/20 hover:border-[#7c3aed]/40 transition-colors">
                          <p className="text-xs font-bold text-[#a78bfa] mb-1.5">{m.year}</p>
                          <p className="font-heading font-semibold text-white text-sm mb-1.5">{m.title}</p>
                          <p className="text-xs text-[#64748b] leading-relaxed">{m.desc}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-center z-10">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#7c3aed] ring-2 ring-[#7c3aed]/30 ring-offset-2 ring-offset-[#080810]" />
                    </div>

                    {isRight ? (
                      <div className="pl-7">
                        <div className="rounded-xl p-5 bg-[#0d0d1a] border border-[#7c3aed]/20 hover:border-[#7c3aed]/40 transition-colors">
                          <p className="text-xs font-bold text-[#a78bfa] mb-1.5">{m.year}</p>
                          <p className="font-heading font-semibold text-white text-sm mb-1.5">{m.title}</p>
                          <p className="text-xs text-[#64748b] leading-relaxed">{m.desc}</p>
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent" />
        </div>

        {/* ── Team ── */}
        <section className="max-w-screen-xl mx-auto px-6 py-14">
          <SectionLabel>People</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-white text-center mb-2">The Team</h2>
          <p className="text-[#64748b] text-sm text-center mb-10">
            Faculty and students driving the UIU Math Olympiad ecosystem.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl p-6 text-center bg-[#0d0d1a] border border-[#7c3aed]/20 hover:border-[#7c3aed]/40 transition-colors"
              >
                <div className="w-12 h-12 gradient-violet rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {member.initial}
                </div>
                <p className="font-semibold text-white text-sm">{member.name}</p>
                <p className="text-xs text-[#a78bfa] mt-1">{member.role}</p>
                <p className="text-xs text-[#64748b] mt-0.5">{member.dept}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent" />
        </div>

        {/* ── CTA — compact horizontal strip ── */}
        <section className="max-w-screen-xl mx-auto px-6 py-10 pb-14">
          <div className="rounded-2xl px-8 py-7 bg-[#0d0d1a] border border-[#7c3aed]/25 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-0 top-0 w-48 h-full bg-[#7c3aed]/05 blur-3xl" />
            </div>

            {/* Icon + text */}
            <div className="flex items-center gap-4 relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/20 border border-[#7c3aed]/30 flex items-center justify-center shrink-0">
                <Users size={18} className="text-[#a78bfa]" />
              </div>
              <div>
                <p className="font-heading font-bold text-white text-base leading-tight">Join the Community</p>
                <p className="text-xs text-[#64748b] mt-0.5">Open to all UIU students — no prior experience needed.</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 relative md:ml-auto flex-wrap justify-center">
              <Link
                href="/dashboard"
                className="gradient-violet glow-violet text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:scale-105 transition-all whitespace-nowrap"
              >
                Start Practicing Free
              </Link>
              <a
                href="mailto:mathclub@uiu.ac.bd"
                className="flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.1] text-[#94a3b8] hover:text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/[0.1] transition-all whitespace-nowrap"
              >
                <Mail size={13} />
                Contact Us
              </a>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-1 relative shrink-0 md:border-l md:border-white/[0.06] md:pl-6">
              <span className="flex items-center gap-1.5 text-xs text-[#64748b] whitespace-nowrap">
                <MapPin size={11} className="text-[#7c3aed]" /> Madani Ave, Dhaka
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#64748b] whitespace-nowrap">
                <Mail size={11} className="text-[#7c3aed]" /> mathclub@uiu.ac.bd
              </span>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
