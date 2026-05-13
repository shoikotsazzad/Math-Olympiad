"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { User, Shield, Mail, Building2, Save, UserCircle, Phone, MapPin, Info, Calendar } from "lucide-react";

export default function AdminProfilePage() {
  const { user, updateProfile } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
    address: "",
    about: "",
    dob: "",
    gender: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        department: user.department || "",
        phone: user.phone || "",
        address: user.address || "",
        about: user.about || "",
        dob: user.dob || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      updateProfile(formData);
      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (error) {
      setMessage({ text: "Failed to update profile.", type: "error" });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white flex items-center gap-2">
          <Shield size={24} className="text-[#a78bfa]" /> Admin Profile
        </h1>
        <p className="text-[#94a3b8] text-sm mt-1">Manage your administrative details and account settings.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 gradient-violet rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 border-4 border-white/10">
              {user.name[0]}
            </div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-sm text-[#a78bfa] font-medium">{user.role}</p>
            <p className="text-xs text-[#64748b] mt-1">{user.department} Department</p>
            
            <div className="w-full h-px bg-white/10 my-6" />
            
            <div className="w-full space-y-3 text-left">
              <div className="flex items-center gap-3 text-xs text-[#94a3b8]">
                <Mail size={14} className="text-[#7c3aed]" />
                <span className="truncate">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-3 text-xs text-[#94a3b8]">
                  <Phone size={14} className="text-[#7c3aed]" />
                  <span>{user.phone}</span>
                </div>
              )}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Info size={14} className="text-[#a78bfa]" /> System Info
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-[#64748b]">Role</span>
                <span className="text-[#94a3b8] font-medium">{user.role}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#64748b]">Level</span>
                <span className="text-[#94a3b8] font-medium">{user.level}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#64748b]">Status</span>
                <span className="text-emerald-400 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs text-[#94a3b8] uppercase tracking-wider flex items-center gap-2">
                  <UserCircle size={12} /> Full Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#7c3aed]/50 outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-[#94a3b8] uppercase tracking-wider flex items-center gap-2">
                  <Mail size={12} /> Email Address
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-[#64748b] cursor-not-allowed"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-[#94a3b8] uppercase tracking-wider flex items-center gap-2">
                  <Building2 size={12} /> Department
                </label>
                <input
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#7c3aed]/50 outline-none transition-all"
                  placeholder="e.g. CSE"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-[#94a3b8] uppercase tracking-wider flex items-center gap-2">
                  <Phone size={12} /> Phone Number
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#7c3aed]/50 outline-none transition-all"
                  placeholder="+880..."
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-[#94a3b8] uppercase tracking-wider flex items-center gap-2">
                  <Calendar size={12} /> Date of Birth
                </label>
                <input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#7c3aed]/50 outline-none transition-all [color-scheme:dark]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-[#94a3b8] uppercase tracking-wider flex items-center gap-2">
                   Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#7c3aed]/50 outline-none transition-all"
                >
                  <option value="" className="bg-[#0f0f1a]">Select Gender</option>
                  <option value="Male" className="bg-[#0f0f1a]">Male</option>
                  <option value="Female" className="bg-[#0f0f1a]">Female</option>
                  <option value="Other" className="bg-[#0f0f1a]">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-[#94a3b8] uppercase tracking-wider flex items-center gap-2">
                <MapPin size={12} /> Address
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#7c3aed]/50 outline-none transition-all"
                placeholder="Full address..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-[#94a3b8] uppercase tracking-wider flex items-center gap-2">
                 Bio / About
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows={4}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:border-[#7c3aed]/50 outline-none transition-all resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              {message && (
                <p className={`text-sm ${message.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
                  {message.text}
                </p>
              )}
              <button
                type="submit"
                disabled={isSaving}
                className="ml-auto flex items-center gap-2 gradient-violet glow-violet text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
              >
                <Save size={16} />
                {isSaving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
