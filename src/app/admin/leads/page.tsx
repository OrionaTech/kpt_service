import { createServerSupabaseClient } from "@/lib/supabase-server";
import LeadsTable from "@/components/admin/LeadsTable";

export default async function LeadsPage() {
  const supabase = await createServerSupabaseClient();

  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Leads Management</h1>
        <p className="text-slate-600 mt-2">Manage and track customer inquiries</p>
      </div>

      <LeadsTable initialLeads={leads || []} />
    </div>
  );
}
