import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const data = await req.json();

  await supabase.from("page_views").insert({
    page_path: data.page,
    referrer: data.referrer,
    session_id: data.sessionId,
    country: data.country,
    state: data.state,
    city: data.city,
  });

  return NextResponse.json({ success: true });
}
