export interface AdminUser {
  id: string;
  name: string;
  email: string;
  dept: string;
  level: string;
  xp: number;
  streak: number;
  testsTaken: number;
  avgScore: number;
  joinedAt: string;
  status: "active" | "inactive";
}

export const mockUsers: AdminUser[] = [
  { id: "u1", name: "Adnan Chowdhury",   email: "adnan.cse@uiu.ac.bd",   dept: "CSE",  level: "Grandmaster", xp: 5120, streak: 42, testsTaken: 98,  avgScore: 91, joinedAt: "Jan 2024", status: "active" },
  { id: "u2", name: "Sarah Jubaida",     email: "sarah.eee@uiu.ac.bd",   dept: "EEE",  level: "Grandmaster", xp: 4984, streak: 38, testsTaken: 87,  avgScore: 89, joinedAt: "Jan 2024", status: "active" },
  { id: "u3", name: "Rahat Khan",        email: "rahat.cse@uiu.ac.bd",   dept: "CSE",  level: "Prime Master", xp: 4701, streak: 30, testsTaken: 76,  avgScore: 85, joinedAt: "Feb 2024", status: "active" },
  { id: "u4", name: "Nadia Islam",       email: "nadia.math@uiu.ac.bd",  dept: "Math", level: "Prime Master", xp: 4520, streak: 27, testsTaken: 71,  avgScore: 83, joinedAt: "Feb 2024", status: "active" },
  { id: "u5", name: "Fahim Hossain",     email: "fahim.cse@uiu.ac.bd",   dept: "CSE",  level: "Expert",      xp: 4310, streak: 22, testsTaken: 65,  avgScore: 80, joinedAt: "Mar 2024", status: "active" },
  { id: "u6", name: "Lamia Akter",       email: "lamia.eee@uiu.ac.bd",   dept: "EEE",  level: "Expert",      xp: 4198, streak: 19, testsTaken: 59,  avgScore: 78, joinedAt: "Mar 2024", status: "active" },
  { id: "u7", name: "Tahmid Reza",       email: "tahmid.cse@uiu.ac.bd",  dept: "CSE",  level: "Advanced",    xp: 3975, streak: 15, testsTaken: 52,  avgScore: 75, joinedAt: "Mar 2024", status: "active" },
  { id: "u8", name: "Rifat Ahmed",       email: "rifat.math@uiu.ac.bd",  dept: "Math", level: "Advanced",    xp: 3820, streak: 12, testsTaken: 44,  avgScore: 72, joinedAt: "Apr 2024", status: "active" },
  { id: "u9", name: "Maliha Sultana",    email: "maliha.cse@uiu.ac.bd",  dept: "CSE",  level: "Intermediate",xp: 3650, streak: 9,  testsTaken: 38,  avgScore: 68, joinedAt: "Apr 2024", status: "inactive" },
  { id: "u10",name: "Arif Hasan",        email: "arif.eee@uiu.ac.bd",    dept: "EEE",  level: "Intermediate",xp: 3401, streak: 7,  testsTaken: 31,  avgScore: 65, joinedAt: "Apr 2024", status: "active" },
  { id: "u11",name: "Tasnim Rahman",     email: "tasnim.math@uiu.ac.bd", dept: "Math", level: "Beginner",    xp: 2100, streak: 4,  testsTaken: 20,  avgScore: 58, joinedAt: "May 2024", status: "active" },
  { id: "u12",name: "Jubayer Siddique",  email: "jubayer.cse@uiu.ac.bd", dept: "CSE",  level: "Beginner",    xp: 1540, streak: 2,  testsTaken: 12,  avgScore: 50, joinedAt: "May 2024", status: "inactive" },
];
