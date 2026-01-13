"use client"

import { Shield, Award, Wrench, HeadphonesIcon } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Quality Assured",
    description:
      "ISO certified manufacturing with rigorous quality control at every stage",
  },
  {
    icon: Award,
    title: "Industry Leaders",
    description:
      "Decades of experience in designing and manufacturing industrial cranes",
  },
  {
    icon: Wrench,
    title: "Expert Service",
    description:
      "Comprehensive installation, maintenance, and repair services by certified technicians",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support and emergency service availability",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Committed to excellence in every aspect of our business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
