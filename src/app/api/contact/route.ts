import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";
import { sendContactNotification, ContactFormData } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data: ContactFormData = {
      name: String(body.name || "").trim(),
      email: String(body.email || "").trim(),
      phone: String(body.phone || "").trim(),
      company_name: body.company_name ? String(body.company_name).trim() : null,
      message: String(body.message || "").trim(),
    };

    if (!data.name || !data.email || !data.phone || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert lead into Supabase
      // Insert lead into Supabase using service role key when available to bypass RLS.
      // If `SUPABASE_SERVICE_ROLE_KEY` is not set, fall back to the server supabase client (may be blocked by RLS).
      const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY
        ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY)
        : await createServerSupabaseClient();

    const { error: insertError } = await supabase.from("leads").insert([{
      contact_person: data.name,
      email: data.email,
      phone: data.phone,
        company_name: data.company_name,
      message: data.message,
    //   source: "website",
      status: "new",
    }]);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }

    // Send notification email
    try {
      await sendContactNotification(data);
    } catch (e) {
      console.error("Failed to send contact notification:", e);
      // Don't fail the whole request if email fails; lead is already stored.
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
