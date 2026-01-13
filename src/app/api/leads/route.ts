import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();

  await supabase.from("leads").insert({
    company_name: body.company_name,
    contact_person: body.name,
    phone: body.phone,
    email: body.email,
    message: body.message,
    city: body.city,
    state: body.state,
    country: body.country,
    source_page: body.source,
  });

  return NextResponse.json({ success: true });
}
