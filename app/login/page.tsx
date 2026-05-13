"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useUsersStore } from "@/store/usersStore";

type Tab = "signin" | "signup";

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
  const [suDept, setSuDept] = useState("CSE");
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
    if (!suEmail.trim() || !suEmail.includes("@")) return setSuError("Enter a valid email address.");
    if (!suPass.trim() || suPass.length < 6) return setSuError("Password must be at least 6 characters.");
    if (suPass !== suConfirm) return setSuError("Passwords do not match.");
    setSuLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const now = new Date();
    const joinedAt = now.toLocaleString("en-US", { month: "short", year: "numeric" });
    addUser({
      id: `u-${Date.now()}`,
      name: suName.trim(),
      email: suEmail.trim(),
      dept: suDept,
      level: "Beginner",
      xp: 0,
      streak: 0,
      testsTaken: 0,
      avgScore: 0,
      joinedAt,
      status: "active",
    });
    loginAsStudent(suEmail.trim(), suName.trim());
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080810] px-4 py-12">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#7c3aed]/15 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 gradient-violet rounded-xl flex items-center justify-center text-white font-bold text-base font-heading">
              Σ
            </div>
            <span className="font-heading font-bold text-white tracking-wide text-base uppercase">
              UIU Olympiad
            </span>
          </Link>
          <h1 className="font-heading text-2xl font-bold text-white">
            {tab === "signin" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-sm text-[#64748b] mt-1">
            {tab === "signin" ? "Sign in to continue your journey" : "Join the UIU Olympiad community"}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-[#0d0d1a] border border-white/[0.08] overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-white/[0.08]">
            {(["signin", "signup"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`py-3.5 text-sm font-medium transition-colors relative ${
                  tab === t ? "text-white" : "text-[#64748b] hover:text-[#94a3b8]"
                }`}
              >
                {t === "signin" ? "Sign In" : "Sign Up"}
                {tab === t && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 gradient-violet" />
                )}
              </button>
            ))}
          </div>

          <div className="p-7">
            {/* ── Sign In ── */}
            {tab === "signin" && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <p className="text-xs text-[#64748b] mb-5">
                  Sign in with your email and password to access your dashboard.
                </p>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#94a3b8] uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
                    <input
                      type="email"
                      value={siEmail}
                      onChange={(e) => setSiEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#475569] outline-none focus:border-[#7c3aed]/60 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#94a3b8] uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
                    <input
                      type={siShowPass ? "text" : "password"}
                      value={siPass}
                      onChange={(e) => setSiPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-[#475569] outline-none focus:border-[#7c3aed]/60 focus:bg-white/[0.06] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setSiShowPass((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#94a3b8] transition-colors"
                    >
                      {siShowPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {siError && (
                  <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                    <AlertCircle size={13} />
                    {siError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={siLoading}
                  className="w-full gradient-violet glow-violet text-white font-semibold py-3 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:scale-100 text-sm mt-2"
                >
                  {siLoading ? "Signing in…" : "Sign In"}
                </button>

                <p className="text-xs text-[#475569] text-center pt-1">
                  Any email + password (6+ chars) works for demo
                </p>
              </form>
            )}

            {/* ── Sign Up ── */}
            {tab === "signup" && (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#94a3b8] uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
                      <input
                        type="text"
                        value={suName}
                        onChange={(e) => setSuName(e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#475569] outline-none focus:border-[#7c3aed]/60 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#94a3b8] uppercase tracking-wider">Department</label>
                    <select
                      value={suDept}
                      onChange={(e) => setSuDept(e.target.value)}
                      className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-[#7c3aed]/60 transition-all"
                    >
                      {["CSE", "EEE", "BBA", "Math", "Civil", "Other"].map((d) => (
                        <option key={d} value={d} className="bg-[#0f0f1a]">{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#94a3b8] uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
                    <input
                      type="email"
                      value={suEmail}
                      onChange={(e) => setSuEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#475569] outline-none focus:border-[#7c3aed]/60 transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#94a3b8] uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
                      <input
                        type={suShowPass ? "text" : "password"}
                        value={suPass}
                        onChange={(e) => setSuPass(e.target.value)}
                        placeholder="6+ characters"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-[#475569] outline-none focus:border-[#7c3aed]/60 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setSuShowPass((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#94a3b8] transition-colors"
                      >
                        {suShowPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#94a3b8] uppercase tracking-wider">Confirm</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
                      <input
                        type="password"
                        value={suConfirm}
                        onChange={(e) => setSuConfirm(e.target.value)}
                        placeholder="Repeat password"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#475569] outline-none focus:border-[#7c3aed]/60 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {suError && (
                  <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                    <AlertCircle size={13} />
                    {suError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={suLoading}
                  className="w-full gradient-violet glow-violet text-white font-semibold py-3 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:scale-100 text-sm mt-2"
                >
                  {suLoading ? "Creating account…" : "Create Account"}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-[#475569] mt-6">
          <Link href="/" className="hover:text-[#94a3b8] transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
