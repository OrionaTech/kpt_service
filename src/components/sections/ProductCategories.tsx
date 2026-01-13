"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "EOT Cranes",
    description: "Electric Overhead Traveling cranes for heavy-duty industrial applications",
    image: "/categories/eot_crane.jpg",
    href: "/products?category=EOT Cranes",
    color: "from-primary/20 to-primary/5",
  },
  {
    name: "Gantry Cranes",
    description: "Versatile gantry cranes for outdoor and indoor material handling",
    image: "/products/goliath.jpg",
    href: "/products?category=Gantry Cranes",
    color: "from-secondary/20 to-secondary/5",
  },
  {
    name: "Jib Cranes",
    description: "Compact jib cranes for workshop and manufacturing floor operations",
    image: "/products/jib-crane.jpg",
    href: "/products?category=Jib Cranes",
    color: "from-primary/20 to-primary/5",
  },
  {
    name: "MCC Panels",
    description: "MCC Panels control and protect electric motors in industrial applications with centralized control.",
    image: "/products/mcc-panels.jpg",
    href: "/products?category=Electrical Panels",
    color: "from-secondary/20 to-secondary/5",
  },
]

export function ProductCategories() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Product Range
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions for all your material handling needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link href={category.href}>
                <div className="group relative h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative h-48 bg-slate-200 flex items-center justify-center overflow-hidden">
                            {category.image ? (
                             <Image
                              src={category.image}
                              alt={category.name}
                              fill
                              className="object-cover"
                            />
                            ) : (
                              <div className="text-4xl font-bold text-slate-400">
                                {category.name.charAt(0)}
                              </div>
                            )}
                      </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-2 transition-transform">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <Button asChild size="lg" variant="outline">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
