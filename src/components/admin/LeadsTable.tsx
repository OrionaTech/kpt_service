"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { exportToCSV } from "@/lib/csv";
import { Download } from "lucide-react";

interface Lead {
  id: string;
  company_name?: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  city?: string;
  state?: string;
  country?: string;
  source_page?: string;
  status: string;
  admin_notes?: string;
  follow_up_date?: string;
  created_at: string;
}

export default function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  async function updateStatus(id: string, status: string) {
    setLoading((prev) => ({ ...prev, [id]: true }));
    try {
      await supabase.from("leads").update({ status }).eq("id", id);
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  }

  function handleExport() {
    exportToCSV("leads.csv", leads);
  }

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700 border-blue-200",
    contacted: "bg-yellow-100 text-yellow-700 border-yellow-200",
    quoted: "bg-green-100 text-green-700 border-green-200",
    closed: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          {leads.length} {leads.length === 1 ? "lead" : "leads"} total
        </p>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-sm border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Company/Contact</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Email</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Phone</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Location</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Source</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Status</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-slate-900">
                        {lead.company_name || lead.contact_person || "—"}
                      </p>
                      {lead.contact_person && lead.company_name && (
                        <p className="text-xs text-slate-500">{lead.contact_person}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{lead.email || "—"}</td>
                  <td className="py-3 px-4 text-slate-700">{lead.phone || "—"}</td>
                  <td className="py-3 px-4 text-slate-700">
                    {[lead.city, lead.state, lead.country].filter(Boolean).join(", ") || "—"}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-600 text-xs">
                      {lead.source_page || "—"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      disabled={loading[lead.id]}
                      className={`px-3 py-1.5 text-xs rounded-md border font-medium cursor-pointer transition-colors ${
                        statusColors[lead.status] || statusColors.new
                      } ${loading[lead.id] ? "opacity-50" : ""}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

