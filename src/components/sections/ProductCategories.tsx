"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

gsap.registerPlugin(ScrollTrigger)

type Category = {
  name: string
  description: string
  image: string
  href: string
  badge: string
  icon: ReactNode
}

const categories: Category[] = [
  {
    name: "EOT Cranes",
    description: "Electric overhead traveling cranes for heavy-duty industrial applications.",
    image: "/categories/eot_crane.jpg",
    href: "/products?category=EOT Cranes",
    badge: "UP TO 500T",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 10h36M20 10v9m8-9v9M24 19v15" />
        <path d="M24 34c5 0 5 6 0 6-3 0-4-2-3-4" stroke="#e8a020" />
      </svg>
    ),
  },
  {
    name: "Gantry Cranes",
    description: "Versatile gantry cranes for outdoor and indoor material handling.",
    image: "/products/goliath.jpg",
    href: "/products?category=Gantry Cranes",
    badge: "HEAVY YARD",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 12h36M10 12v24m28-24v24" />
        <path d="M18 36h-8m30 0h-8" stroke="#e8a020" />
        <circle cx="10" cy="38" r="3" />
        <circle cx="38" cy="38" r="3" />
      </svg>
    ),
  },
  {
    name: "Jib Cranes",
    description: "Compact jib cranes for manufacturing floor operations and workshop lifting.",
    image: "/products/jib-crane.jpg",
    href: "/products?category=Jib Cranes",
    badge: "360 ROTATION",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 40V7m0 4h28l-7 9" />
        <path d="M29 20v12" />
        <path d="M29 32c4 0 4 5 0 5-2 0-3-2-2-3" stroke="#e8a020" />
      </svg>
    ),
  },
  {
    name: "MCC Panels",
    description: "Motor control center panels engineered for reliability and centralized control.",
    image: "/products/mcc-panels.jpg",
    href: "/products?category=Electrical Panels",
    badge: "IP RATED",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="7" width="30" height="34" rx="2" />
        <path d="M14 15h18M14 22h18M14 29h10" />
        <circle cx="31" cy="29" r="3" stroke="#e8a020" />
      </svg>
    ),
  },
]

export function ProductCategories() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (window.innerWidth < 768) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("opacity-100", "translate-y-0")
          })
        },
        { threshold: 0.15 }
      )

      section.querySelectorAll<HTMLElement>(".product-card").forEach((card) => observer.observe(card))
      return () => observer.disconnect()
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hazard-top border-y border-[#252525] bg-[#101010] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-5xl text-[var(--bright)] sm:text-6xl">Our Product Range</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--steel)]">Comprehensive crane and electrical systems designed for industrial duty cycles.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group product-card translate-y-5 opacity-0 transition-all duration-300">
              <article className="industrial-card relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(232,160,32,0.2)]">
                <span className="absolute left-0 top-0 z-20 h-0 w-0 border-l-[46px] border-t-[46px] border-l-[var(--accent)] border-t-[var(--accent)]/20 border-r-transparent border-b-transparent" />

                <div className="relative h-48 overflow-hidden border-b border-[#2d2d2d]">
                  <Image src={category.image} alt={category.name} fill className="industrial-image object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-[#ffd9a0]">
                    {category.badge}
                  </span>
                </div>

                <div className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm border border-[var(--accent)]/40 bg-[var(--glow)] text-[var(--accent)]">
                    {category.icon}
                  </div>
                  <h3 className="font-display text-3xl text-[var(--bright)]">{category.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--steel)]">{category.description}</p>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold tracking-wide text-[var(--accent)]">
                    VIEW DETAILS
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-none border-[var(--accent)] px-8 text-[var(--accent)] hover:bg-[var(--glow)]">
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
