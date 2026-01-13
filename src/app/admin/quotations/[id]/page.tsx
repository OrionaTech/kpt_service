import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";
import { notFound, redirect } from "next/navigation";
import QuotationEditorClient from "@/components/admin/QuotationEditorClient";

export default async function QuotationEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Use service role key for admin reads when available to bypass RLS.
  const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY)
    : await createServerSupabaseClient();

  const { data: quotation, error: quotationError } = await supabase
    .from("quotations")
    .select("*")
    .eq("id", id)
    .single();

  if (quotationError || !quotation) {
    console.error("Failed to load quotation:", quotationError);
    notFound();
  }

  const { data: items } = await supabase
    .from("quotation_items")
    .select("*")
    .eq("quotation_id", id)
    .order("sort_order", { ascending: true });

  // Get quotation request if exists
  let request = null;
  if (quotation.request_id) {
    const { data } = await supabase
      .from("quotation_requests")
      .select("*")
      .eq("id", quotation.request_id)
      .single();
    request = data;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Edit Quotation</h1>
        <p className="text-slate-600 mt-2">
          Quotation #{quotation.id.slice(0, 8)} • Version {quotation.version || 1}
        </p>
      </div>

      <QuotationEditorClient
        initialQuotation={quotation}
        initialItems={items || []}
        initialRequest={request}
      />
    </div>
  );
}
