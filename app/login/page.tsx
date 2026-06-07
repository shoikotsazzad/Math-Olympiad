"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Building2, AlertCircle, GraduationCap } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useUsersStore } from "@/store/usersStore";
import type { Tier } from "@/types";

type Tab = "signin" | "signup";

const EDUCATION_LEVELS = [
  { label: "School",                   tier: "Beginner"     as Tier, subtitle: "Beginner" },
  { label: "College",                  tier: "Intermediate" as Tier, subtitle: "Intermediate" },
  { label: "Undergraduate / Graduate", tier: "Advanced"     as Tier, subtitle: "Advanced" },
];

const inputCls =
  "w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#d97706]/60 focus:ring-2 focus:ring-[#d97706]/10 transition-all";

export default function LoginPage() {
  const router = useRouter();
  const { loginAsStudent } = useAuthStore();
  const { addUser } = useUsersStore();

  const [tab, setTab] = useState<Tab>("signin");

  // Sign In
  const [siEmail, setSiEmail] = useState("");
  const [siPass, setSiPass] = useState("");
  const [siShowPass, setSiShowPass] = useState(false);
  const [siError, setSiError] = useState("");
  const [siLoading, setSiLoading] = useState(false);

  // Sign Up
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suInstitute, setSuInstitute] = useState("");
  const [suEduLevel, setSuEduLevel] = useState("");
  const [suPass, setSuPass] = useState("");
  const [suConfirm, setSuConfirm] = useState("");
  const [suShowPass, setSuShowPass] = useState(false);
  const [suError, setSuError] = useState("");
  const [suLoading, setSuLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSiError("");
    if (!siEmail.trim()) return setSiError("Please enter your email.");
    if (!siEmail.includes("@")) return setSiError("Enter a valid email address.");
    if (!siPass.trim()) return setSiError("Please enter your password.");
    if (siPass.length < 6) return setSiError("Password must be at least 6 characters.");
    setSiLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    loginAsStudent(siEmail);
    router.push("/dashboard");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuError("");
    if (!suName.trim()) return setSuError("Please enter your full name.");
    if (!suInstitute.trim()) return setSuError("Please enter your institution name.");
    if (!suEduLevel) return setSuError("Please select your education level.");
    if (!suEmail.trim() || !suEmail.includes("@")) return setSuError("Enter a valid email address.");
    if (!suPass.trim() || suPass.length < 6) return setSuError("Password must be at least 6 characters.");
    if (suPass !== suConfirm) return setSuError("Passwords do not match.");

    const matched = EDUCATION_LEVELS.find((l) => l.label === suEduLevel);
    const tier: Tier = matched?.tier ?? "Beginner";

    setSuLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const joinedAt = new Date().toLocaleString("en-US", { month: "short", year: "numeric" });
    addUser({
      id: `u-${Date.now()}`,
      name: suName.trim(),
      email: suEmail.trim(),
      dept: "",
      institute: suInstitute.trim(),
      tier,
      level: "Beginner",
      xp: 0,
      streak: 0,
      testsTaken: 0,
      avgScore: 0,
      joinedAt,
      status: "active",
    });
    loginAsStudent(suEmail.trim(), suName.trim(), tier, suInstitute.trim());
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef9f0] px-4 py-12">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#d97706]/8 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex mb-6">
            <img src="/logo1.png" alt="UIU CMOR" className="h-20 w-auto object-contain" />
          </Link>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            {tab === "signin" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {tab === "signin" ? "Sign in to continue your journey" : "Join the UIU Olympiad community"}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-slate-200">
            {(["signin", "signup"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`py-3.5 text-sm font-medium transition-colors relative ${
                  tab === t ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {t === "signin" ? "Sign In" : "Sign Up"}
                {tab === t && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 gradient-orange" />
                )}
              </button>
            ))}
          </div>

          <div className="p-7">
            {/* ── Sign In ── */}
            {tab === "signin" && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <p className="text-xs text-slate-400 mb-5">
                  Sign in with your email and password to access your dashboard.
                </p>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={siEmail}
                      onChange={(e) => setSiEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={siShowPass ? "text" : "password"}
                      value={siPass}
                      onChange={(e) => setSiPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-11 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#d97706]/60 focus:ring-2 focus:ring-[#d97706]/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setSiShowPass((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {siShowPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {siError && (
                  <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                    <AlertCircle size={13} />
                    {siError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={siLoading}
                  className="w-full gradient-orange glow-orange text-white font-semibold py-3 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:scale-100 text-sm mt-2"
                >
                  {siLoading ? "Signing in…" : "Sign In"}
                </button>

                <p className="text-xs text-slate-400 text-center pt-1">
                  Any email + password (6+ chars) works for demo
                </p>
              </form>
            )}

            {/* ── Sign Up ── */}
            {tab === "signup" && (
              <form onSubmit={handleSignUp} className="space-y-4">
                {/* Name + Institute */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={suName}
                        onChange={(e) => setSuName(e.target.value)}
                        placeholder="Your name"
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Institution</label>
                    <div className="relative">
                      <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={suInstitute}
                        onChange={(e) => setSuInstitute(e.target.value)}
                        placeholder="Your school / college / uni"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>

                {/* Education Level → auto-assigns tier */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Education Level</label>
                  <div className="relative">
                    <GraduationCap size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <select
                      value={suEduLevel}
                      onChange={(e) => setSuEduLevel(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-[#d97706]/60 focus:ring-2 focus:ring-[#d97706]/10 transition-all appearance-none"
                    >
                      <option value="">Select your current level</option>
                      {EDUCATION_LEVELS.map((l) => (
                        <option key={l.label} value={l.label}>
                          {l.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={suEmail}
                      onChange={(e) => setSuEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Password + Confirm */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={suShowPass ? "text" : "password"}
                        value={suPass}
                        onChange={(e) => setSuPass(e.target.value)}
                        placeholder="6+ characters"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-11 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#d97706]/60 focus:ring-2 focus:ring-[#d97706]/10 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setSuShowPass((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {suShowPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Confirm</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={suConfirm}
                        onChange={(e) => setSuConfirm(e.target.value)}
                        placeholder="Repeat password"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>

                {suError && (
                  <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                    <AlertCircle size={13} />
                    {suError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={suLoading}
                  className="w-full gradient-orange glow-orange text-white font-semibold py-3 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:scale-100 text-sm mt-2"
                >
                  {suLoading ? "Creating account…" : "Create Account"}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          <Link href="/" className="hover:text-slate-600 transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
