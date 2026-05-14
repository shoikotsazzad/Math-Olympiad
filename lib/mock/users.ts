import type { Tier } from "@/types";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  dept: string;
  institute: string;
  tier: Tier;
  level: string;
  xp: number;
  streak: number;
  testsTaken: number;
  avgScore: number;
  joinedAt: string;
  status: "active" | "inactive";
}

export const mockUsers: AdminUser[] = [
  // ── Advanced — University students ──────────────────────────────────
  { id: "u1",  name: "Adnan Chowdhury",   email: "adnan.cse@uiu.ac.bd",     dept: "CSE",  institute: "UIU",                       tier: "Advanced",     level: "Grandmaster",  xp: 5120, streak: 42, testsTaken: 98, avgScore: 91, joinedAt: "Jan 2024", status: "active"   },
  { id: "u2",  name: "Sarah Jubaida",     email: "sarah.eee@buet.ac.bd",    dept: "EEE",  institute: "BUET",                      tier: "Advanced",     level: "Grandmaster",  xp: 4984, streak: 38, testsTaken: 87, avgScore: 89, joinedAt: "Jan 2024", status: "active"   },
  { id: "u3",  name: "Rahat Khan",        email: "rahat.cse@uiu.ac.bd",     dept: "CSE",  institute: "UIU",                       tier: "Advanced",     level: "Prime Master", xp: 4701, streak: 30, testsTaken: 76, avgScore: 85, joinedAt: "Feb 2024", status: "active"   },
  { id: "u4",  name: "Nadia Islam",       email: "nadia.math@du.ac.bd",     dept: "Math", institute: "DU",                        tier: "Advanced",     level: "Prime Master", xp: 4520, streak: 27, testsTaken: 71, avgScore: 83, joinedAt: "Feb 2024", status: "active"   },
  { id: "u13", name: "Arman Hossain",     email: "arman.cse@kuet.ac.bd",    dept: "CSE",  institute: "KUET",                      tier: "Advanced",     level: "Expert",       xp: 4350, streak: 25, testsTaken: 68, avgScore: 82, joinedAt: "Feb 2024", status: "active"   },
  { id: "u14", name: "Priya Chowdhury",   email: "priya.eee@cuet.ac.bd",    dept: "EEE",  institute: "CUET",                      tier: "Advanced",     level: "Expert",       xp: 4210, streak: 20, testsTaken: 61, avgScore: 80, joinedAt: "Mar 2024", status: "active"   },
  { id: "u15", name: "Zafar Iqbal",       email: "zafar.math@sust.edu",     dept: "Math", institute: "SUST",                      tier: "Advanced",     level: "Advanced",     xp: 4050, streak: 17, testsTaken: 55, avgScore: 78, joinedAt: "Mar 2024", status: "active"   },
  // ── Intermediate — College students ─────────────────────────────────
  { id: "u5",  name: "Fahim Hossain",     email: "fahim.hossain@gmail.com", dept: "CSE",  institute: "Dhaka City College",         tier: "Intermediate", level: "Expert",       xp: 4310, streak: 22, testsTaken: 65, avgScore: 80, joinedAt: "Mar 2024", status: "active"   },
  { id: "u6",  name: "Lamia Akter",       email: "lamia.akter@gmail.com",   dept: "EEE",  institute: "Notre Dame College",         tier: "Intermediate", level: "Expert",       xp: 4198, streak: 19, testsTaken: 59, avgScore: 78, joinedAt: "Mar 2024", status: "active"   },
  { id: "u7",  name: "Tahmid Reza",       email: "tahmid.reza@gmail.com",   dept: "CSE",  institute: "Rajshahi College",           tier: "Intermediate", level: "Advanced",     xp: 3975, streak: 15, testsTaken: 52, avgScore: 75, joinedAt: "Mar 2024", status: "active"   },
  { id: "u8",  name: "Rifat Ahmed",       email: "rifat.ahmed@gmail.com",   dept: "Math", institute: "Dhaka College",              tier: "Intermediate", level: "Advanced",     xp: 3820, streak: 12, testsTaken: 44, avgScore: 72, joinedAt: "Apr 2024", status: "active"   },
  { id: "u16", name: "Sumaiya Begum",     email: "sumaiya.begum@gmail.com", dept: "Math", institute: "Adamjee Cantonment College", tier: "Intermediate", level: "Advanced",     xp: 3680, streak: 11, testsTaken: 40, avgScore: 71, joinedAt: "Apr 2024", status: "active"   },
  { id: "u17", name: "Zarif Hasan",       email: "zarif.hasan@gmail.com",   dept: "CSE",  institute: "Comilla Victoria College",   tier: "Intermediate", level: "Intermediate", xp: 3500, streak: 8,  testsTaken: 35, avgScore: 69, joinedAt: "Apr 2024", status: "active"   },
  { id: "u18", name: "Mehzabin Rahman",   email: "mehzabin.r@gmail.com",    dept: "EEE",  institute: "BAF Shaheen College",        tier: "Intermediate", level: "Intermediate", xp: 3340, streak: 6,  testsTaken: 28, avgScore: 66, joinedAt: "May 2024", status: "inactive" },
  // ── Beginner — School students ───────────────────────────────────────
  { id: "u9",  name: "Maliha Sultana",    email: "maliha.sultana@gmail.com",dept: "CSE",  institute: "Viqarunnisa Noon School",    tier: "Beginner",     level: "Intermediate", xp: 3650, streak: 9,  testsTaken: 38, avgScore: 68, joinedAt: "Apr 2024", status: "inactive" },
  { id: "u10", name: "Arif Hasan",        email: "arif.hasan@gmail.com",    dept: "EEE",  institute: "Rajuk Uttara Model College", tier: "Beginner",     level: "Intermediate", xp: 3401, streak: 7,  testsTaken: 31, avgScore: 65, joinedAt: "Apr 2024", status: "active"   },
  { id: "u11", name: "Tasnim Rahman",     email: "tasnim.rahman@gmail.com", dept: "Math", institute: "BAF Shaheen College",        tier: "Beginner",     level: "Beginner",     xp: 2100, streak: 4,  testsTaken: 20, avgScore: 58, joinedAt: "May 2024", status: "active"   },
  { id: "u12", name: "Jubayer Siddique",  email: "jubayer.sid@gmail.com",   dept: "CSE",  institute: "Mymensingh Zilla School",    tier: "Beginner",     level: "Beginner",     xp: 1540, streak: 2,  testsTaken: 12, avgScore: 50, joinedAt: "May 2024", status: "inactive" },
  { id: "u19", name: "Afsana Khan",       email: "afsana.khan@gmail.com",   dept: "Math", institute: "Motijheel Model School",     tier: "Beginner",     level: "Beginner",     xp: 1820, streak: 3,  testsTaken: 15, avgScore: 54, joinedAt: "May 2024", status: "active"   },
  { id: "u20", name: "Rafiq Molla",       email: "rafiq.molla@gmail.com",   dept: "EEE",  institute: "Faujdarhat Cadet College",   tier: "Beginner",     level: "Beginner",     xp: 1210, streak: 1,  testsTaken: 8,  avgScore: 47, joinedAt: "Jun 2024", status: "inactive" },
];
