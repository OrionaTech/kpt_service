import { Award, Users, Target, Heart } from "lucide-react"
import type { Metadata } from "next"
import { GlobalStatsStrip } from "@/components/sections/GlobalStatsStrip"

export const metadata: Metadata = {
  title: "About Us - KPT Crane & Machinery",
  description:
    "Learn about KPT Crane & Machinery - a leading manufacturer of industrial cranes with decades of experience, commitment to quality, and customer satisfaction.",
}

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To deliver world-class crane solutions that improve productivity, strengthen safety, and create long-term value.",
  },
  {
    icon: Award,
    title: "Quality First",
    description:
      "We enforce strict manufacturing standards with premium materials and inspection-driven execution.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description:
      "We build long-term partnerships through responsive communication and reliable service support.",
  },
  {
    icon: Heart,
    title: "Innovation",
    description:
      "Continuous engineering improvements help us deliver safer and more efficient industrial systems.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0c0c0c] text-[var(--bright)]">
      <section className="hazard-bottom border-b border-[#262626] bg-[linear-gradient(140deg,#151515,#090909)] py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-6xl sm:text-7xl">About Us</h1>
          <p className="mt-3 max-w-2xl text-[var(--steel)]">Engineering reliable material handling systems with consistency, precision, and accountability.</p>
        </div>
      </section>

      <GlobalStatsStrip />

      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="industrial-card mx-auto mb-14 max-w-4xl p-8 md:p-12">
          <h2 className="font-display text-5xl">Our Story</h2>
          <p className="mt-5 text-[var(--steel)]">
            KPT Crane & Machinery has served industrial clients for more than two decades with dependable lifting systems designed for practical plant conditions.
            We have grown through execution quality, transparent communication, and continuous technical refinement.
          </p>
          <p className="mt-4 text-[var(--steel)]">
            From crane fabrication to electrical panel integration and lifecycle service support, we operate with one objective: stable, safe, and efficient operations for every client.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-center font-display text-5xl">Our Core Values</h2>
          <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2">
            {values.map((value) => (
              <article key={value.title} className="industrial-card p-8 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(232,160,32,0.2)]">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded border border-[var(--accent)]/45 bg-[var(--glow)] text-[var(--accent)]">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-4xl">{value.title}</h3>
                <p className="mt-2 text-sm text-[var(--steel)]">{value.description}</p>
              </article>
            ))}
          </div>
        </div>

        <section className="hazard-top border border-[#2c2c2c] bg-[#111] p-8 md:p-12">
          <h2 className="text-center font-display text-5xl">Why Choose KPT Crane & Machinery?</h2>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="font-mono text-5xl font-bold text-[var(--accent)]">25+</div>
              <div className="mt-2 text-sm uppercase tracking-[0.16em] text-[var(--steel)]">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-5xl font-bold text-[var(--accent)]">5000+</div>
              <div className="mt-2 text-sm uppercase tracking-[0.16em] text-[var(--steel)]">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-5xl font-bold text-[var(--accent)]">2500+</div>
              <div className="mt-2 text-sm uppercase tracking-[0.16em] text-[var(--steel)]">Satisfied Clients</div>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
