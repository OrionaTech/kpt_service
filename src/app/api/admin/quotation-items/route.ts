import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase-server";

async function getSupabase() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY)
    : await createServerSupabaseClient();
}

export async function POST(req: Request) {
  // create item
  try {
    const body = await req.json();
    const supabase = await getSupabase();
    const { data, error } = await supabase.from("quotation_items").insert(body).select().single();
    if (error) {
      console.error("Failed to create quotation item:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) return NextResponse.json({ error: "Missing item id" }, { status: 400 });
    const supabase = await getSupabase();
    const id = body.id;
    delete body.id;
    const { data, error } = await supabase.from("quotation_items").update(body).eq("id", id).select().single();
    if (error) {
      console.error("Failed to update quotation item:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) return NextResponse.json({ error: "Missing item id" }, { status: 400 });
    const supabase = await getSupabase();
    const { error } = await supabase.from("quotation_items").delete().eq("id", body.id);
    if (error) {
      console.error("Failed to delete quotation item:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
