import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
const {
  email,
  phone,
  product_slug,
  product_name,
  estimate,
  source_page,
} = await req.json()

// Use service role key when available to bypass row-level security for server-side writes.
const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : await createServerSupabaseClient();

const {
  data: request,
  error: requestInsertError,
} = await supabase
  .from("quotation_requests")
  .insert({
    client_email: email,
    client_phone: phone,
    project_page: source_page,
    estimate_data: estimate,
  })
  .select()
  .single();

if (requestInsertError || !request) {
  console.error("Failed to create quotation_request:", requestInsertError);
  return NextResponse.json(
    { error: "Failed to create quotation request", details: requestInsertError?.message || null },
    { status: 500 }
  );
}

const { error: quotationInsertError } = await supabase.from("quotations").insert({
  client_name: email,
  project_type: product_name,
  request_id: request.id,
  status: "draft",
});

if (quotationInsertError) {
  console.error("Failed to create quotation:", quotationInsertError);
  return NextResponse.json({ error: "Failed to create quotation", details: quotationInsertError.message || null }, { status: 500 });
}

  return NextResponse.json({ success: true });
}
