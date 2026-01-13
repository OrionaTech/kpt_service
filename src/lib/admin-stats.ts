import { createAdminSupabaseClient } from "./supabase-admin";

export async function getAdminDashboardStats() {
  const supabase = createAdminSupabaseClient();

  const [
    totalViews,
    uniqueSessions,
    totalLeads,
    pendingLeads,
    totalQuotations,
    draftQuotations,
    pendingRequests,
    recentViews,
  ] = await Promise.all([
    supabase.from("page_views").select("*", { count: "exact", head: true }),
    supabase
      .from("page_views")
      .select("session_id", { count: "exact", head: true })
      .not("session_id", "is", null),
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase.from("quotations").select("*", { count: "exact", head: true }),
    supabase
      .from("quotations")
      .select("*", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase
      .from("quotation_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte(
        "created_at",
        new Date(Date.now() - 30 * 86400000).toISOString()
      ),
  ]);

  return {
    totalViews: totalViews.count ?? 0,
    uniqueSessions: uniqueSessions.count ?? 0,
    totalLeads: totalLeads.count ?? 0,
    pendingLeads: pendingLeads.count ?? 0,
    totalQuotations: totalQuotations.count ?? 0,
    draftQuotations: draftQuotations.count ?? 0,
    pendingRequests: pendingRequests.count ?? 0,
    recentViews: recentViews.count ?? 0,
  };
}
