import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export default async function QuotationsPage() {
  // Use service role key for admin reads if available to bypass RLS.
  // Set SUPABASE_SERVICE_ROLE_KEY in server environment (never expose it client-side).
  const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY)
    : await createServerSupabaseClient();

  const { data: quotations } = await supabase
    .from("quotations")
    .select("*")
    .order("created_at", { ascending: false });

  // Get quotation requests
  const { data: requests } = await supabase
    .from("quotation_requests")
    .select("*")
    .order("created_at", { ascending: false });

  // Debug: surface counts so we can see if data is being returned
  const quotationsCount = Array.isArray(quotations) ? quotations.length : 0;
  const requestsCount = Array.isArray(requests) ? requests.length : 0;

  return (
    <div>
      <div className="mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Quotations</h1>
          <p className="text-slate-600 mt-2">Manage customer quotations and requests</p>
        </div>

    
      </div>

      {/* Pending Requests */}
      {requests && requests.length > 0 && (
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Pending Quotation Requests ({requests.length})
          </h2>
          <div className="overflow-x-auto bg-white border border-blue-100 rounded">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Client Email</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Phone</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Project Page</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Slug</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Estimate Data</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Admin Notes</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-700">{r.id}</td>
                    <td className="py-3 px-4 text-slate-700">{r.client_email || "—"}</td>
                    <td className="py-3 px-4 text-slate-700">{r.client_phone || "—"}</td>
                    <td className="py-3 px-4 text-slate-700">{r.project_page || "—"}</td>
                    <td className="py-3 px-4 text-slate-700">{r.product_name || "—"}</td>
                    <td className="py-3 px-4 text-slate-700">{r.product_slug || "—"}</td>
                    <td className="py-3 px-4 text-slate-700">
                      {r.estimate_data ? (
                        <details>
                          <summary className="text-sm text-slate-600 cursor-pointer">View</summary>
                          <pre className="mt-2 text-xs bg-white p-2 rounded overflow-auto max-h-48">{JSON.stringify(r.estimate_data, null, 2)}</pre>
                        </details>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-700">{r.status || "pending"}</td>
                    <td className="py-3 px-4 text-slate-700">{r.created_at ? new Date(r.created_at).toLocaleString() : "—"}</td>
                    <td className="py-3 px-4 text-slate-700">{r.admin_notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quotations List */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Client</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Project Type</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Version</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Created</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotations && quotations.length > 0 ? (
                quotations.map((quote) => (
                  <tr
                    key={quote.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {quote.client_name || "Unnamed"}
                        </p>
                        {quote.client_email && (
                          <p className="text-xs text-slate-500">{quote.client_email}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{quote.project_type || "—"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded font-medium ${
                          quote.status === "draft"
                            ? "bg-slate-100 text-slate-700"
                            : quote.status === "sent"
                            ? "bg-blue-100 text-blue-700"
                            : quote.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : quote.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {quote.status || "draft"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {quote.total_amount
                        ? `₹${quote.total_amount.toLocaleString("en-IN")}`
                        : "—"}
                    </td>
                    <td className="py-3 px-4 text-slate-600">v{quote.version || 1}</td>
                    <td className="py-3 px-4 text-slate-600">
                      {new Date(quote.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/admin/quotations/${quote.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No quotations found. Create your first quotation to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
