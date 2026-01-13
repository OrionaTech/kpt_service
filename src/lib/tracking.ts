import { supabase } from "@/lib/supabase";

export async function trackPageView({
  page,
  referrer,
  sessionId,
  location,
}: {
  page: string;
  referrer?: string;
  sessionId: string;
  location?: {
    country?: string;
    state?: string;
    city?: string;
  };
}) {
  await supabase.from("page_views").insert({
    page_path: page,
    referrer,
    session_id: sessionId,
    country: location?.country,
    state: location?.state,
    city: location?.city,
  });
}
