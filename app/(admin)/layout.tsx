import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { AdminGuard } from "@/components/auth/AuthGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1 max-w-screen-xl mx-auto w-full px-4 py-6 gap-6">
          <Sidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
