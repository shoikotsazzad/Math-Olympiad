"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Edit3, Check, X, GraduationCap, FileText, Building2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useUsersStore } from "@/store/usersStore";
import type { Tier } from "@/types";

const genderOptions = ["Prefer not to say", "Male", "Female", "Non-binary", "Other"];
const deptOptions = ["CSE", "EEE", "BBA", "Math", "Civil", "Other"];
const TIERS: Tier[] = ["Beginner", "Intermediate", "Advanced"];

const tierColors: Record<Tier, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#d97706",
};

const tierSubtitles: Record<Tier, string> = {
  Beginner: "School Level",
  Intermediate: "College Level",
  Advanced: "University & Above",
};

export default function ProfilePage() {
  const { user, updateProfile } = useAuthStore();
  const { updateUser } = useUsersStore();

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [institute, setInstitute] = useState("");
  const [university, setUniversity] = useState("");
  const [dept, setDept] = useState("");
  const [tier, setTier] = useState<Tier>("Beginner");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setGender(user.gender ?? "");
      setDob(user.dob ?? "");
      setPhone(user.phone ?? "");
      setAddress(user.address ?? "");
      setInstitute(user.institute ?? "");
      setUniversity(user.university ?? "");
      setDept(user.department ?? "");
      setTier(user.tier ?? "Beginner");
      setAbout(user.about ?? "");
    }
  }, [user]);

  if (!user) return null;

  const userTier = user.tier ?? "Beginner";

  const handleSave = () => {
    updateProfile({ name, gender, dob, phone, address, institute, university, department: dept, tier, about });
    updateUser(user.id, { name, dept, institute, tier });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCancel = () => {
    setName(user.name ?? "");
    setGender(user.gender ?? "");
    setDob(user.dob ?? "");
    setPhone(user.phone ?? "");
    setAddress(user.address ?? "");
    setInstitute(user.institute ?? "");
    setUniversity(user.university ?? "");
    setDept(user.department ?? "");
    setTier(user.tier ?? "Beginner");
    setAbout(user.about ?? "");
    setEditing(false);
  };

  const fieldCls = "w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#d97706]/60 focus:ring-2 focus:ring-[#d97706]/10 transition-all";
  const readCls = "w-full px-0 py-1 text-sm text-slate-800 font-medium";
  const labelCls = "text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wide";

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 flex items-center gap-2">
            <User size={24} className="text-[#d97706]" /> My Profile
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage your personal information and account details.</p>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 gradient-orange glow-orange text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:scale-105 transition-all"
          >
            <Edit3 size={15} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X size={14} /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 gradient-orange text-white text-sm font-semibold px-5 py-2 rounded-xl hover:scale-105 transition-all"
            >
              <Check size={14} /> Save
            </button>
          </div>
        )}
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-sm text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20 rounded-xl px-4 py-3">
          <Check size={15} /> Profile updated successfully.
        </div>
      )}

      {/* Avatar + stats */}
      <div
        className="rounded-2xl p-6 flex items-center gap-6 flex-wrap"
        style={{
          background: "#fff",
          border: "1px solid rgba(15,23,42,0.07)",
          boxShadow: "0 2px 8px rgba(15,23,42,0.05), 0 0 0 1px rgba(15,23,42,0.03)",
        }}
      >
        <div className="w-20 h-20 gradient-orange rounded-full flex items-center justify-center text-white font-bold text-3xl font-heading shrink-0 shadow-lg shadow-amber-500/25">
          {user.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-heading text-xl font-bold text-slate-900">{user.name}</p>
          <p className="text-sm text-slate-500 mt-0.5">{user.email}</p>
          <div className="flex flex-wrap gap-3 mt-3">
            {[
              { label: "Tier", value: userTier, color: tierColors[userTier] },
              { label: "Level", value: user.level, color: "#d97706" },
              { label: "XP", value: user.xp.toLocaleString(), color: "#f59e0b" },
              { label: "Streak", value: `${user.streak}d`, color: "#10b981" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-center">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{label}</p>
                <p className="text-sm font-bold mt-0.5" style={{ color }}>{value}</p>
              </div>
            ))}
          </div>
          {user.institute && (
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <Building2 size={11} /> {user.institute}
            </p>
          )}
        </div>
      </div>

      {/* Personal Info */}
      <div
        className="rounded-2xl p-6 space-y-5"
        style={{
          background: "#fff",
          border: "1px solid rgba(15,23,42,0.07)",
          boxShadow: "0 2px 8px rgba(15,23,42,0.05), 0 0 0 1px rgba(15,23,42,0.03)",
        }}
      >
        <h3 className="font-heading font-bold text-slate-700 text-xs uppercase tracking-widest pb-2 border-b border-slate-100">
          Personal Information
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelCls}><User size={11} /> Full Name</label>
            {editing ? (
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={fieldCls} />
            ) : (
              <p className={readCls}>{user.name || <span className="text-slate-400 font-normal">Not set</span>}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>Gender</label>
            {editing ? (
              <select value={gender} onChange={(e) => setGender(e.target.value)} className={fieldCls}>
                {genderOptions.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            ) : (
              <p className={readCls}>{user.gender || <span className="text-slate-400 font-normal">Not set</span>}</p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelCls}><Calendar size={11} /> Date of Birth</label>
            {editing ? (
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={fieldCls} />
            ) : (
              <p className={readCls}>{user.dob || <span className="text-slate-400 font-normal">Not set</span>}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}><Phone size={11} /> Phone Number</label>
            {editing ? (
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880 1X XX-XXXXXX" className={fieldCls} />
            ) : (
              <p className={readCls}>{user.phone || <span className="text-slate-400 font-normal">Not set</span>}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className={labelCls}><Mail size={11} /> Email Address</label>
          <p className="text-sm text-slate-700 font-medium py-1">{user.email}</p>
        </div>

        <div className="space-y-1.5">
          <label className={labelCls}><MapPin size={11} /> Address</label>
          {editing ? (
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="City, Country" className={fieldCls} />
          ) : (
            <p className={readCls}>{user.address || <span className="text-slate-400 font-normal">Not set</span>}</p>
          )}
        </div>
      </div>

      {/* Academic Info */}
      <div
        className="rounded-2xl p-6 space-y-5"
        style={{
          background: "#fff",
          border: "1px solid rgba(15,23,42,0.07)",
          boxShadow: "0 2px 8px rgba(15,23,42,0.05), 0 0 0 1px rgba(15,23,42,0.03)",
        }}
      >
        <h3 className="font-heading font-bold text-slate-700 text-xs uppercase tracking-widest pb-2 border-b border-slate-100">
          Academic Information
        </h3>

        {/* Institute */}
        <div className="space-y-1.5">
          <label className={labelCls}><Building2 size={11} /> Institute Name</label>
          {editing ? (
            <input value={institute} onChange={(e) => setInstitute(e.target.value)} placeholder="School / College / University" className={fieldCls} />
          ) : (
            <p className={readCls}>{user.institute || <span className="text-slate-400 font-normal">Not set</span>}</p>
          )}
        </div>

        {/* Competition Tier */}
        <div className="space-y-2">
          <label className={labelCls}>Competition Tier</label>
          {editing ? (
            <div className="grid grid-cols-3 gap-2">
              {TIERS.map((t) => {
                const selected = tier === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTier(t)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selected ? "" : "border-slate-200 bg-slate-50 hover:border-slate-300"
                    }`}
                    style={selected ? {
                      borderColor: `${tierColors[t]}60`,
                      backgroundColor: `${tierColors[t]}12`,
                    } : {}}
                  >
                    <p className="font-bold text-xs" style={{ color: selected ? tierColors[t] : "#94a3b8" }}>{t}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{tierSubtitles[t]}</p>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span
                className="text-sm font-bold px-3 py-1 rounded-full border"
                style={{
                  color: tierColors[userTier],
                  backgroundColor: `${tierColors[userTier]}12`,
                  borderColor: `${tierColors[userTier]}35`,
                }}
              >
                {userTier}
              </span>
              <span className="text-xs text-slate-500">{tierSubtitles[userTier]}</span>
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelCls}><GraduationCap size={11} /> University / College</label>
            {editing ? (
              <input value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="University / College name" className={fieldCls} />
            ) : (
              <p className={readCls}>{user.university || <span className="text-slate-400 font-normal">Not set</span>}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}><BookOpen size={11} /> Department</label>
            {editing ? (
              <select value={dept} onChange={(e) => setDept(e.target.value)} className={fieldCls}>
                {deptOptions.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            ) : (
              <p className={readCls}>{user.department || <span className="text-slate-400 font-normal">Not set</span>}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className={labelCls}><FileText size={11} /> About Me</label>
          {editing ? (
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={3}
              placeholder="Tell us a bit about yourself..."
              className={fieldCls + " resize-none"}
            />
          ) : (
            <p className="text-sm text-slate-800 font-medium leading-relaxed py-1">
              {user.about || <span className="text-slate-400 font-normal">Not set</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
