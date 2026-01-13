import { Wrench, Settings, FileCheck, RefreshCw } from "lucide-react"
import type { Metadata } from "next"

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
      "Professional installation services by certified technicians. We ensure proper setup, testing, and commissioning of all equipment.",
    features: [
      "Site assessment and planning",
      "Professional installation",
      "Safety compliance",
      "Testing and commissioning",
      "Training for operators",
    ],
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description:
      "Regular maintenance programs to keep your equipment running at peak performance and extend its operational life.",
    features: [
      "Scheduled inspections",
      "Preventive maintenance",
      "Component replacement",
      "Performance optimization",
      "Maintenance reports",
    ],
    color: "from-secondary/20 to-secondary/5",
  },
  {
    icon: FileCheck,
    title: "AMC (Annual Maintenance Contract)",
    description:
      "Comprehensive annual maintenance contracts providing peace of mind with regular service and priority support.",
    features: [
      "Annual service schedule",
      "Priority support",
      "Cost-effective pricing",
      "Comprehensive coverage",
      "Dedicated service team",
    ],
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: RefreshCw,
    title: "Repair & Retrofit",
    description:
      "Expert repair services and modernization solutions to upgrade existing equipment and restore optimal functionality.",
    features: [
      "Emergency repairs",
      "Component upgrades",
      "System modernization",
      "Performance enhancement",
      "Extended warranty",
    ],
    color: "from-secondary/20 to-secondary/5",
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Comprehensive support services to ensure your equipment operates at
            peak performance throughout its lifecycle
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br ${service.color}`}
            >
              <div className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <service.icon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  {service.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Professional Service?
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Our expert team is ready to assist you with all your service needs.
            Contact us today to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact?quote=true"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary rounded-md font-medium hover:bg-white/90 transition-colors"
            >
              Request Service
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

