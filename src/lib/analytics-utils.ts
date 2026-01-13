export function groupByDate(data: any[]) {
  const map: Record<string, number> = {};

  data.forEach(d => {
    const date = new Date(d.created_at).toISOString().split("T")[0];
    map[date] = (map[date] || 0) + 1;
  });

  return Object.entries(map).map(([date, count]) => ({
    date,
    count,
  }));
}

export function groupByKey(data: any[], key: string) {
  const map: Record<string, number> = {};

  data.forEach(d => {
    const k = d[key] || "Unknown";
    map[k] = (map[k] || 0) + 1;
  });

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
}
