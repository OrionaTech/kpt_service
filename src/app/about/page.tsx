import { Award, Users, Target, Heart } from "lucide-react"
import type { Metadata } from "next"

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
      "To provide world-class industrial crane solutions that enhance productivity, ensure safety, and deliver exceptional value to our customers.",
  },
  {
    icon: Award,
    title: "Quality First",
    description:
      "We maintain the highest standards in manufacturing, using premium materials and rigorous quality control processes.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description:
      "Our customers are at the heart of everything we do. We build lasting relationships through exceptional service and support.",
  },
  {
    icon: Heart,
    title: "Innovation",
    description:
      "We continuously invest in research and development to bring cutting-edge solutions and technologies to the market.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Leading the industry with quality, innovation, and customer
            satisfaction
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Company Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                KPT Crane & Machinery has been a trusted name in the industrial
                crane manufacturing industry for over two decades. Founded with
                a vision to provide reliable and efficient material handling
                solutions, we have grown to become one of the leading
                manufacturers in the region.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Our commitment to quality, innovation, and customer satisfaction
                has enabled us to serve thousands of clients across various
                industries including manufacturing, steel, automotive,
                construction, and warehousing.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                With state-of-the-art manufacturing facilities and a team of
                experienced engineers and technicians, we continue to push the
                boundaries of what's possible in industrial crane technology.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Why Choose KPT Crane & Machinery?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-white/90">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-white/90">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2500+</div>
              <div className="text-white/90">Satisfied Clients</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

