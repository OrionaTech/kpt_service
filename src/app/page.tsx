import { Hero } from "@/components/sections/Hero"
import { ProductCategories } from "@/components/sections/ProductCategories"
import { WhyChooseUs } from "@/components/sections/WhyChooseUs"
import { IndustriesServed } from "@/components/sections/IndustriesServed"
import { StatsSection } from "@/components/sections/StatsSection"
import { CTA } from "@/components/sections/CTA"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KPT Crane & Machinery - Industrial Crane Solutions",
  description:
    "Leading manufacturer of EOT cranes, gantry cranes, and material handling equipment. Quality, reliability, and innovation for industrial applications.",
  keywords: [
    "EOT cranes",
    "gantry cranes",
    "industrial cranes",
    "material handling",
    "crane manufacturer",
  ],
}

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductCategories />
      <WhyChooseUs />
      <IndustriesServed />
      <StatsSection />
      <CTA />
    </main>
  )
}
