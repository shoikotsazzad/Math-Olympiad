"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Shield, AlertCircle } from "lucide-react";
import { useAuthStore, ADMIN_EMAIL, ADMIN_PASSWORD } from "@/store/authStore";

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAsAdmin } = useAuthStore();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !pass.trim()) return setError("Please fill in all fields.");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    if (email.trim() !== ADMIN_EMAIL || pass !== ADMIN_PASSWORD) {
      setLoading(false);
      return setError("Invalid admin credentials.");
    }
    loginAsAdmin();
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080810] px-4 py-12">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[350px] rounded-full bg-[#7c3aed]/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 gradient-violet rounded-xl flex items-center justify-center text-white font-bold font-heading">
              Σ
            </div>
            <span className="font-heading font-bold text-white tracking-wide text-base uppercase">
              UIU Olympiad
            </span>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield size={18} className="text-[#a78bfa]" />
            <h1 className="font-heading text-xl font-bold text-white">Admin Access</h1>
          </div>
          <p className="text-xs text-[#475569]">Restricted — authorized faculty only</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-[#0d0d1a] border border-[#7c3aed]/20 p-7 space-y-4">
          <div className="flex items-start gap-2.5 bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-xl px-4 py-3">
            <Shield size={13} className="text-[#a78bfa] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#a78bfa]">Demo Credentials</p>
              <p className="text-xs text-[#64748b] mt-0.5 font-mono">admin@uiu.ac.bd / UIUAdmin2024</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#94a3b8] uppercase tracking-wider">Admin Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@uiu.ac.bd"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#475569] outline-none focus:border-[#7c3aed]/60 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#94a3b8] uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
                <input
                  type={showPass ? "text" : "password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-[#475569] outline-none focus:border-[#7c3aed]/60 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#94a3b8] transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                <AlertCircle size={13} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-violet glow-violet text-white font-semibold py-3 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:scale-100 text-sm"
            >
              {loading ? "Verifying…" : "Access Admin Portal"}
            </button>
          </form>
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
