import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminNav />

      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <span className="text-sm text-slate-600 font-medium">
            KPT Business Admin System
          </span>
        </header>

        <section className="flex-1 p-8">{children}</section>
      </main>
    </div>
  );
}
