import { supabase } from "@/lib/supabase";

export async function generateInsights() {
  const { data: clicks } = await supabase
    .from("click_events")
    .select("page_path");

  const { data: estimations } = await supabase
    .from("estimations")
    .select("project_type");

  if (!clicks || !estimations) return;

  const shedClicks = clicks.filter(c =>
    c.page_path?.includes("shed")
  ).length;

  if (shedClicks > 10) {
    await supabase.from("insights").insert({
      insight_type: "behavior",
      message:
        "Users mostly explore Shed structures before requesting estimation.",
    });
  }
}
