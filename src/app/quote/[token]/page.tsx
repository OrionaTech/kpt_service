import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export default async function PublicQuotationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY)
    : await createServerSupabaseClient();

  const { data: quotation, error: quotationError } = await supabase
    .from("quotations")
    .select("*")
    .eq("public_token", token)
    .single();

  if (quotationError) {
    console.error("Failed to load public quotation:", quotationError);
  }

  if (!quotation) {
    notFound();
  }

  const { data: items } = await supabase
    .from("quotation_items")
    .select("*")
    .eq("quotation_id", quotation.id)
    .order("sort_order", { ascending: true });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="border-b border-slate-200 pb-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">KPT Crane & Machinery</h1>
                <p className="text-slate-600 mt-1">Industrial Solutions Provider</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Quotation #</p>
                <p className="text-lg font-bold text-slate-900">
                  {quotation.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
              <div>
                <p className="text-slate-600 mb-1">Date:</p>
                <p className="text-slate-900 font-medium">
                  {new Date(quotation.created_at).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              {quotation.valid_until && (
                <div>
                  <p className="text-slate-600 mb-1">Valid Until:</p>
                  <p className="text-slate-900 font-medium">
                    {new Date(quotation.valid_until).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Client Info */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Client Information</h2>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="font-medium text-slate-900 mb-1">
                {quotation.client_name || "Client Name"}
              </p>
              {quotation.client_email && (
                <p className="text-sm text-slate-600">{quotation.client_email}</p>
              )}
              {quotation.client_phone && (
                <p className="text-sm text-slate-600">{quotation.client_phone}</p>
              )}
              {quotation.project_type && (
                <p className="text-sm text-slate-600 mt-2">
                  Project: {quotation.project_type}
                </p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quotation Details</h2>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Description</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-700">Quantity</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-700">Rate</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items && items.length > 0 ? (
                    items.map((item, index) => (
                      <tr key={item.id || index} className="border-b border-slate-100">
                        <td className="py-3 px-4 text-slate-900">{item.description || "—"}</td>
                        <td className="py-3 px-4 text-right text-slate-700">
                          {item.quantity || 0}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-700">
                          ₹{(item.rate || 0).toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-slate-900">
                          ₹{((item.quantity || 0) * (item.rate || 0)).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500">
                        No items in this quotation
                      </td>
                    </tr>
                  )}
                  <tr className="bg-slate-50 font-semibold">
                    <td colSpan={3} className="py-4 px-4 text-right text-slate-900">
                      Total Amount:
                    </td>
                    <td className="py-4 px-4 text-right text-xl text-slate-900">
                      ₹{(quotation.total_amount || 0).toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 pt-6">
            <p className="text-sm text-slate-600 mb-2">
              For any queries or clarifications, please contact us.
            </p>
            <div className="mt-4 text-sm text-slate-600">
              <p className="font-medium text-slate-900">KPT Crane & Machinery</p>
              <p>Industrial Solutions Provider</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


