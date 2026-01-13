import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function NewQuotationPage({
  searchParams,
}: {
  searchParams: Promise<{ request?: string }>;
}) {
  const { request: requestId } = await searchParams;
  const supabase = await createServerSupabaseClient();

  // Create new quotation
  const quotationData: any = {
    client_name: "New Client",
    project_type: "",
    status: "draft",
    version: 1,
    total_amount: 0,
  };

  let request = null;
  if (requestId) {
    // Load request data
    const { data } = await supabase
      .from("quotation_requests")
      .select("*")
      .eq("id", requestId)
      .single();
    
    if (data) {
      request = data;
      quotationData.client_email = data.client_email;
      quotationData.client_phone = data.client_phone;
      quotationData.request_id = data.id;
      quotationData.project_type = data.product_name || "";
      
      // Update request status
      await supabase
        .from("quotation_requests")
        .update({ status: "in_progress" })
        .eq("id", requestId);
    }
  }

  const { data: quotation, error } = await supabase
    .from("quotations")
    .insert(quotationData)
    .select()
    .single();

  if (error || !quotation) {
    console.error("Failed to create quotation:", error);
    redirect("/admin/quotations");
  }

  redirect(`/admin/quotations/${quotation.id}`);
}
