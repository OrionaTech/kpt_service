import { calculateBehavior } from "./behavior-analytics";
import { groupByDate, groupByKey } from "./analytics-utils";
import { createAdminSupabaseClient } from "./supabase-admin";

export async function getAnalyticsData() {
 const supabase = createAdminSupabaseClient();
  // Get all page views
  const { data: pageViews } = await supabase
    .from("page_views")
    .select("*")
    .order("created_at", { ascending: true });

  if (!pageViews) {
    return {
      totalVisitors: 0,
      uniqueSessions: 0,
      visitsByDate: [],
      visitsByPage: [],
      behavior: {
        bounceRate: 0,
        avgTimeOnPage: 0,
        totalSessions: 0,
      },
    };
  }

  // Calculate unique sessions
  const uniqueSessions = new Set(pageViews.map((v) => v.session_id)).size;

  // Get visits by date (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentViews = pageViews.filter(
    (v) => new Date(v.created_at) >= thirtyDaysAgo
  );
  const visitsByDate = groupByDate(recentViews).slice(-30);

  // Get visits by page
  const visitsByPage = groupByKey(pageViews, "page_path")
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Top 10 pages

  // Calculate behavior metrics
  const behavior = calculateBehavior(pageViews);

  return {
    totalVisitors: pageViews.length,
    uniqueSessions,
    visitsByDate,
    visitsByPage,
    behavior,
  };
}

