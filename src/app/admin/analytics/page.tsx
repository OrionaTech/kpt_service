import { getAnalyticsData } from "@/lib/analytics-data";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";

export default async function AnalyticsPage() {
  const analyticsData = await getAnalyticsData();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600 mt-2">Website performance and visitor insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Visitors"
          value={analyticsData.totalVisitors.toLocaleString()}
        />
        <StatCard
          title="Unique Sessions"
          value={analyticsData.uniqueSessions.toLocaleString()}
        />
        <StatCard
          title="Bounce Rate"
          value={`${analyticsData.behavior.bounceRate}%`}
        />
        <StatCard
          title="Avg Time on Page"
          value={`${analyticsData.behavior.avgTimeOnPage}s`}
        />
      </div>

      {/* Charts */}
      <AnalyticsCharts
        visitsByDate={analyticsData.visitsByDate}
        visitsByPage={analyticsData.visitsByPage}
      />

      {/* Page Engagement Table */}
      <div className="mt-6 bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Page Engagement
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-slate-600 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Page</th>
                <th className="text-right py-3 px-4 font-medium">Views</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.visitsByPage.length > 0 ? (
                analyticsData.visitsByPage.map((page) => (
                  <tr
                    key={page.name}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-3 px-4 text-slate-900">{page.name}</td>
                    <td className="py-3 px-4 text-right text-slate-700 font-medium">
                      {page.value.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="py-8 text-center text-slate-500">
                    No data available
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

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <p className="text-sm font-medium text-slate-600 mb-2">{title}</p>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
