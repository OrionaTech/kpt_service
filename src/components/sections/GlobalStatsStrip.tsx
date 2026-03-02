const stats = [
  { label: "Projects", value: "200+" },
  { label: "Clients", value: "50+" },
  { label: "Years", value: "25+" },
  { label: "Countries", value: "2+" },
]

export function GlobalStatsStrip() {
  return (
    <section className="border-y border-[#2a2a2a] bg-[#0e0e0e]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative py-5 text-center">
              <p className="font-mono text-3xl font-bold text-[var(--accent)]">{stat.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--steel)]">{stat.label}</p>
              {index !== stats.length - 1 && (
                <span className="absolute right-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-[var(--accent)]/60 sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
