import { Wrench, Settings, FileCheck, RefreshCw } from "lucide-react"
import type { Metadata } from "next"
import { GlobalStatsStrip } from "@/components/sections/GlobalStatsStrip"

export const metadata: Metadata = {
  title: "Services - Installation, Maintenance & Support",
  description:
    "Comprehensive crane services including installation, maintenance, AMC, and repair & retrofit. Expert technicians ensuring optimal performance.",
}

const services = [
  {
    icon: Settings,
    title: "Installation",
    description:
      "Professional installation services by certified technicians, including testing and commissioning.",
    features: [
      "Site assessment and planning",
      "Professional installation",
      "Safety compliance",
      "Testing and commissioning",
      "Training for operators",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description:
      "Preventive and predictive maintenance schedules to maximize uptime and extend equipment life.",
    features: [
      "Scheduled inspections",
      "Preventive maintenance",
      "Component replacement",
      "Performance optimization",
      "Maintenance reports",
    ],
  },
  {
    icon: FileCheck,
    title: "AMC",
    description:
      "Annual maintenance contracts with planned service visits and priority support windows.",
    features: [
      "Annual service schedule",
      "Priority support",
      "Cost-effective pricing",
      "Comprehensive coverage",
      "Dedicated service team",
    ],
  },
  {
    icon: RefreshCw,
    title: "Repair & Retrofit",
    description:
      "Rapid corrective services and modernization packages for legacy systems.",
    features: [
      "Emergency repairs",
      "Component upgrades",
      "System modernization",
      "Performance enhancement",
      "Extended warranty",
    ],
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0c0c0c] text-[var(--bright)]">
      <section className="hazard-bottom border-b border-[#262626] bg-[linear-gradient(140deg,#151515,#090909)] py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-6xl sm:text-7xl">Our Services</h1>
          <p className="mt-3 max-w-2xl text-[var(--steel)]">Lifecycle support to keep crane and panel systems reliable, compliant, and productive.</p>
        </div>
      </section>

      <GlobalStatsStrip />

      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="industrial-card p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(232,160,32,0.2)]">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded border border-[var(--accent)]/50 bg-[var(--glow)] text-[var(--accent)]">
                <service.icon className="h-7 w-7" />
              </div>
              <h2 className="font-display text-4xl">{service.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--steel)]">{service.description}</p>
              <ul className="mt-5 space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start text-sm text-[var(--chrome)]">
                    <span className="mt-1.5 mr-3 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="hazard-top mt-12 border border-[#2b2b2b] bg-[#111] p-8 text-center">
          <h2 className="font-display text-5xl text-[var(--bright)]">Need Professional Service?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--steel)]">Our engineers are ready to plan, service, and optimize your lifting infrastructure.</p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/contact?quote=true" className="shimmer-btn inline-flex items-center justify-center border border-[var(--accent)] bg-[var(--accent)] px-8 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[#1c1204] transition hover:bg-[#f1b84f]">
              Request Service
            </a>
            <a href="/contact" className="inline-flex items-center justify-center border border-[var(--accent)] px-8 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)] transition hover:bg-[var(--glow)]">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
