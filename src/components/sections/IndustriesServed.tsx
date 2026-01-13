"use client"

const industries = [
  { name: "Manufacturing", icon: "🏭" },
  // { name: "Steel & Metal", icon: "⚙️" },
  // { name: "Automotive", icon: "🚗" },
  { name: "Construction", icon: "🏗️" },
  { name: "Warehousing", icon: "📦" },
  // { name: "Power Plants", icon: "⚡" },
  { name: "Shipbuilding", icon: "🚢" },
  // { name: "Mining", icon: "⛏️" },
]

export function IndustriesServed() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Industries We Serve
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading companies across diverse sectors
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <div
              key={industry.name}
              className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow hover:scale-105 duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="text-4xl mb-3">{industry.icon}</div>
              <h3 className="font-semibold text-foreground">{industry.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
