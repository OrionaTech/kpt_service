"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("leads").select("*").then(({ data }) => {
      setLeads(data || []);
    });
  }, []);

  async function updateStatus(id: string, status: string) {
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads(l =>
      l.map(lead => (lead.id === id ? { ...lead, status } : lead))
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Leads</h1>

      <table className="mt-6 w-full bg-white border rounded text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(l => (
            <tr key={l.id} className="border-t">
              <td>{l.company_name}</td>
              <td>{l.contact_person}</td>
              <td>{l.city}, {l.country}</td>
              <td>
                <select
                  value={l.status}
                  onChange={e => updateStatus(l.id, e.target.value)}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
