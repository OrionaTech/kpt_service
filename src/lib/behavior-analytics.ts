export function calculateBehavior(pageViews: any[]) {
  const sessions: Record<string, any[]> = {};

  pageViews.forEach(v => {
    if (!sessions[v.session_id]) sessions[v.session_id] = [];
    sessions[v.session_id].push(v);
  });

  let totalSessions = 0;
  let bounceSessions = 0;
  let totalTime = 0;
  let timeEntries = 0;

  Object.values(sessions).forEach(session => {
    totalSessions++;

    session.sort(
      (a, b) =>
        new Date(a.created_at).getTime() -
        new Date(b.created_at).getTime()
    );

    if (session.length === 1) {
      bounceSessions++;
      return;
    }

    for (let i = 0; i < session.length - 1; i++) {
      const current = new Date(session[i].created_at).getTime();
      const next = new Date(session[i + 1].created_at).getTime();

      const diff = Math.max(0, (next - current) / 1000);
      totalTime += diff;
      timeEntries++;
    }
  });

  return {
    bounceRate: totalSessions
      ? Math.round((bounceSessions / totalSessions) * 100)
      : 0,
    avgTimeOnPage: timeEntries
      ? Math.round(totalTime / timeEntries)
      : 0,
    totalSessions,
  };
}
