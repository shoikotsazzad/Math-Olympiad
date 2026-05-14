"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, ChevronDown, LayoutDashboard, LogOut, User, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useRef, useState, useEffect } from "react";

const navLinks = [
  { label: "Practice", href: "/tests", protected: true },
  { label: "Live Exam", href: "/live-exam", protected: true },
  { label: "Olympiads", href: "/events", protected: false },
  { label: "Leaderboard", href: "/leaderboard", protected: false },
  { label: "Resources", href: "/topics", protected: false },
  { label: "About", href: "/about", protected: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const signOut = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  const authUser = mounted ? user : null;

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/[0.06]">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 gradient-violet rounded-lg flex items-center justify-center text-white font-bold text-sm font-heading">
            Σ
          </div>
          <span className="font-heading font-bold text-white tracking-wide text-sm uppercase hidden sm:block">
            UIU Olympiad
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const isLocked = link.protected && !authUser;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors relative group flex items-center gap-1.5",
                  isActive
                    ? "text-white bg-white/[0.08]"
                    : "text-[#94a3b8] hover:text-white hover:bg-white/[0.05]"
                )}
              >
                {link.label}
                {isLocked && (
                  <Lock size={11} className="text-[#64748b] group-hover:text-[#a78bfa] transition-colors" />
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#7c3aed] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          {/* Search */}
          <div className="hidden lg:flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2 w-48">
            <Search size={14} className="text-[#94a3b8]" />
            <input
              placeholder="Search resources..."
              className="bg-transparent text-sm text-[#94a3b8] placeholder-[#64748b] outline-none w-full"
            />
          </div>

          {authUser && (
            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.06] hover:bg-white/[0.1] transition-colors text-[#94a3b8] hover:text-white">
              <Bell size={16} />
            </button>
          )}

          {!authUser && (
            <Link
              href="/login"
              className="gradient-violet glow-violet text-white text-sm font-semibold px-5 py-2 rounded-full hover:scale-105 transition-all"
            >
              Sign In
            </Link>
          )}

          {authUser && (
            <div className="relative" ref={ref}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] transition-colors rounded-lg px-3 py-1.5"
              >
                <div className="w-7 h-7 gradient-violet rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {authUser.name[0]}
                </div>
                <span className="text-sm text-white hidden sm:block">{authUser.name.split(" ")[0]}</span>
                <ChevronDown
                  size={14}
                  className={cn("text-[#94a3b8] transition-transform", open && "rotate-180")}
                />
              </button>

              {open && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[#13131f] border border-white/[0.1] shadow-2xl overflow-hidden z-50">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-white/[0.08]">
                    <p className="text-sm font-medium text-white">{authUser.name}</p>
                    <p className="text-xs text-[#64748b] mt-0.5">{authUser.email}</p>
                    <span className="inline-flex mt-1.5 items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#7c3aed]/20 text-[#a78bfa]">
                      {authUser.role === "ADMIN" ? "Faculty Admin" : `${authUser.level} · ${authUser.tier ?? authUser.department}`}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="py-1">
                    {authUser.role === "STUDENT" ? (
                      <>
                        <Link
                          href="/dashboard"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#94a3b8] hover:text-white hover:bg-white/[0.05] transition-colors"
                        >
                          <LayoutDashboard size={15} />
                          My Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#94a3b8] hover:text-white hover:bg-white/[0.05] transition-colors"
                        >
                          <User size={15} />
                          My Profile
                        </Link>
                      </>
                    ) : (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#94a3b8] hover:text-white hover:bg-white/[0.05] transition-colors"
                      >
                        <LayoutDashboard size={15} />
                        Admin Dashboard
                      </Link>
                    )}
                  </div>

                  {/* Sign out */}
                  <div className="border-t border-white/[0.08] py-1">
                    <button
                      onClick={signOut}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
