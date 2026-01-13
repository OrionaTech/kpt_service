import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient();

  // Get quotation templates
  const { data: templates } = await supabase
    .from("quotation_templates")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-2">Configure your admin system</p>
      </div>

      {/* Email Configuration */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Email Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              From Email Address
            </label>
            <input
              type="email"
              defaultValue={process.env.RESEND_FROM_EMAIL || "noreply@kptcrane.com"}
              disabled
              className="w-full px-4 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Configured via RESEND_FROM_EMAIL environment variable
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Resend API Key
            </label>
            <input
              type="password"
              defaultValue="••••••••••••••••"
              disabled
              className="w-full px-4 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Configured via RESEND_API_KEY environment variable
            </p>
          </div>
        </div>
      </div>

      {/* Quotation Templates */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Quotation Templates</h2>
          <button
            disabled
            className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50 text-sm"
          >
            Create Template
          </button>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Template management coming soon. Currently using default template.
        </p>
        {templates && templates.length > 0 ? (
          <div className="space-y-2">
            {templates.map((template) => (
              <div
                key={template.id}
                className="p-4 border border-slate-200 rounded-md flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-slate-900">{template.name}</p>
                  <p className="text-sm text-slate-600">
                    Created {new Date(template.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  disabled
                  className="text-sm text-slate-600 hover:text-slate-900 disabled:opacity-50"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No templates configured</p>
        )}
      </div>

      {/* System Information */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">System Information</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Database</span>
            <span className="font-medium text-slate-900">Supabase PostgreSQL</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Email Service</span>
            <span className="font-medium text-slate-900">Resend</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Authentication</span>
            <span className="font-medium text-slate-900">Supabase Auth</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Framework</span>
            <span className="font-medium text-slate-900">Next.js App Router</span>
          </div>
        </div>
      </div>
    </div>
  );
}


