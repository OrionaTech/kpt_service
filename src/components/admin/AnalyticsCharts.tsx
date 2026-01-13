"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface AnalyticsChartsProps {
  visitsByDate: Array<{ date: string; count: number }>;
  visitsByPage: Array<{ name: string; value: number }>;
}

export default function AnalyticsCharts({
  visitsByDate,
  visitsByPage,
}: AnalyticsChartsProps) {
  return (
    <div className="space-y-6">
      {/* Visitors Trend */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Visitors – Last 30 Days
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={visitsByDate}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              style={{ fontSize: "12px" }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
              }}
              labelFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString();
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#0f172a"
              strokeWidth={2}
              dot={{ fill: "#0f172a", r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Pages */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Most Visited Pages
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={visitsByPage} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" stroke="#64748b" style={{ fontSize: "12px" }} />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#64748b"
              style={{ fontSize: "12px" }}
              width={200}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
              }}
            />
            <Bar dataKey="value" fill="#334155" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


