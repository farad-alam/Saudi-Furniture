import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: "#F8F7F5" }}>
      <AdminSidebar />
      <main className="flex-1 min-w-0 lg:ms-60 p-6">
        {children}
      </main>
    </div>
  );
}
