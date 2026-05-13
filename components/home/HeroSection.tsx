"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Background radial gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[700px] h-[500px] rounded-full bg-[#7c3aed]/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#4f46e5]/15 blur-[100px]" />
        {/* Math grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating math symbols */}
        {["∫", "∑", "π", "√", "∞", "θ", "Δ", "∂"].map((sym, i) => (
          <span
            key={i}
            className="absolute text-white/[0.04] font-heading font-bold select-none"
            style={{
              fontSize: `${Math.random() * 60 + 40}px`,
              left: `${(i * 13 + 5) % 95}%`,
              top: `${(i * 17 + 10) % 90}%`,
            }}
          >
            {sym}
          </span>
        ))}
      </div>

      <div className="relative max-w-screen-xl mx-auto px-6 py-20 w-full flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#7c3aed]/20 border border-[#7c3aed]/30 rounded-full px-4 py-1.5 text-sm text-[#a78bfa] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#a78bfa] animate-pulse" />
          2024 BdMO Qualifiers Now Open
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-extrabold text-5xl md:text-7xl text-white leading-tight max-w-3xl"
        >
          UIU Math
          <br />
          <span className="gradient-text">Olympiad Prep</span>
        </motion.h1>

        {/* Sub-line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-[#94a3b8] max-w-lg leading-relaxed"
        >
          Practice smart. Compete fearless. Win medals. Join the elite community of mathematical
          thinkers at UIU and master the art of problem solving.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/daily-puzzle"
            className="flex items-center gap-2 gradient-violet glow-violet text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95"
          >
            <Rocket size={18} />
            Start Daily Challenge
          </Link>
          <Link
            href="/topics"
            className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white font-semibold px-7 py-3.5 rounded-full transition-all"
          >
            View Syllabus
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-16 flex flex-wrap gap-10 justify-center"
        >
          {[
            { value: "4,281", label: "Active Students" },
            { value: "87%", label: "Avg. Completion Rate" },
            { value: "500+", label: "Practice Problems" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-heading font-bold text-white">{stat.value}</p>
              <p className="text-sm text-[#94a3b8] mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
