import { getAdminDashboardStats } from "@/lib/admin-stats";
import Link from "next/link";
import { BarChart3, Users, FileText, Mail } from "lucide-react";

import { createAdminSupabaseClient } from "@/lib/supabase-admin";

export default async function AdminDashboard() {
  const stats = await getAdminDashboardStats();
  const supabase = createAdminSupabaseClient();

  const { data: recentLeads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: recentQuotations } = await supabase
    .from("quotation_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Overview of your business operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Visitors"
          value={stats.totalViews.toLocaleString()}
          subtitle={`${stats.uniqueSessions} unique sessions`}
          icon={BarChart3}
          href="/admin/analytics"
        />
        <StatCard
          title="Total Leads"
          value={stats.totalLeads.toString()}
          subtitle={`${stats.pendingLeads} pending`}
          icon={Users}
          href="/admin/leads"
        />
        <StatCard
          title="Quotations"
          value={stats.totalQuotations.toString()}
          subtitle={`${stats.draftQuotations} drafts`}
          icon={FileText}
          href="/admin/quotations"
        />
        <StatCard
          title="Pending Requests"
          value={stats.pendingRequests.toString()}
          subtitle="Awaiting response"
          icon={Mail}
          href="/admin/quotations"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Leads</h2>
            <Link
              href="/admin/leads"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentLeads && recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {lead.company_name || lead.contact_person || "Unnamed"}
                    </p>
                    <p className="text-sm text-slate-600">{lead.email}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      lead.status === "new"
                        ? "bg-blue-100 text-blue-700"
                        : lead.status === "contacted"
                        ? "bg-yellow-100 text-yellow-700"
                        : lead.status === "quoted"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No leads yet</p>
            )}
          </div>
        </div>

        {/* Recent Quotations */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Quotations</h2>
            <Link
              href="/admin/quotations"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentQuotations && recentQuotations.length > 0 ? (
              recentQuotations.map((quote) => (
                <div
                
                  key={quote.id}
                  className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {quote.client_name ? quote.client_name : "Unnamed Client"} {quote.client_email ? ` - ${quote.client_email}` : ""}
                    </p>
                    <p className="text-sm text-slate-600">{quote.project_type}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      quote.status === "draft"
                        ? "bg-slate-100 text-slate-700"
                        : quote.status === "sent"
                        ? "bg-blue-100 text-blue-700"
                        : quote.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {quote.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No quotations yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  href,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <Icon className="w-6 h-6 text-slate-600" />
        </div>
        <h3 className="text-sm font-medium text-slate-600 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </Link>
  );
}
