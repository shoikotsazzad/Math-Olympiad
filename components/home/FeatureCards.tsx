import Link from "next/link";
import { FlaskConical, BookOpen, ArrowRight } from "lucide-react";

const features = [
  {
    icon: FlaskConical,
    title: "Mock Test Arena",
    description:
      "Compete in timed environments that simulate the actual BdMO conditions. Get real-time feedback and ranking.",
    href: "/tests",
    cta: "Explore Tests",
    color: "#7c3aed",
  },
  {
    icon: BookOpen,
    title: "BdMO Info",
    description:
      "Stay updated with registration dates, rules, and regional event schedules for all major olympiads.",
    href: "/events",
    cta: "Learn More",
    color: "#4f46e5",
  },
  {
    icon: BookOpen,
    title: "Syllabus",
    description:
      "From Number Theory to Combinatorics. Comprehensive curriculum guides for all levels.",
    href: "/topics",
    cta: "Curriculum",
    color: "#0891b2",
  },
];

export default function FeatureCards() {
  return (
    <section className="max-w-screen-xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, description, href, cta, color }) => (
          <Link
            key={title}
            href={href}
            className="glass glass-hover rounded-2xl p-6 flex flex-col gap-4 group"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}20`, border: `1px solid ${color}30` }}
            >
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-white text-lg">{title}</h3>
              <p className="text-sm text-[#94a3b8] mt-2 leading-relaxed">{description}</p>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium mt-auto" style={{ color }}>
              {cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
