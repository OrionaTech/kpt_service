"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Estimations() {
  const [form, setForm] = useState<any>({});
  const [summary, setSummary] = useState("");

  async function generate() {
    const text = `Estimated ${form.project} project for ${form.industry} industry with budget ${form.budget}.`;
    setSummary(text);

    await supabase.from("estimations").insert({
      project_type: form.project,
      industry: form.industry,
      budget_range: form.budget,
      summary: text,
    });
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Project Estimation (Beta)</h1>

      <div className="grid grid-cols-2 gap-4 mt-6">
      <input 
        placeholder="Project Type" 
        className="border p-2 rounded text-gray-700 placeholder-gray-400 w-full"
        onChange={e => setForm({ ...form, project: e.target.value })} 
      />
      <input 
        placeholder="Industry" 
        className="border p-2 rounded text-gray-700 placeholder-gray-400 w-full"
        onChange={e => setForm({ ...form, industry: e.target.value })} 
      />
      <input 
        placeholder="Budget Range" 
        className="border p-2 rounded text-gray-700 placeholder-gray-400 w-full"
        onChange={e => setForm({ ...form, budget: e.target.value })} 
      />
      </div>

      <button onClick={generate} className="mt-4 bg-slate-900 text-white px-4 py-2">
        Generate Estimation
      </button>

      {summary && (
        <div className="mt-6 bg-white border p-4 rounded text-gray-700">
          {summary}
        </div>
      )}
    </div>
  );
}
