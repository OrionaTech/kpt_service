import { supabase } from "@/lib/supabase";

export async function getAnalytics() {
  const { count: totalVisitors } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true });

  const { data: uniqueSessions } = await supabase
    .from("page_views")
    .select("session_id");

  const uniqueCount = new Set(uniqueSessions?.map(s => s.session_id)).size;

  const { data: pages } = await supabase
    .from("page_views")
    .select("page_path");

  const pageCounts: Record<string, number> = {};
  pages?.forEach(p => {
    pageCounts[p.page_path] = (pageCounts[p.page_path] || 0) + 1;
  });

  const { data: locations } = await supabase
    .from("page_views")
    .select("country, state, city");

  return {
    totalVisitors,
    uniqueVisitors: uniqueCount,
    pageCounts,
    locations,
  };
}
