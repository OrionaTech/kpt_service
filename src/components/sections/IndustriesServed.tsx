"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const industries = [
  {
    name: "Manufacturing",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 43V18l12 7V18l12 7v18H5Z" />
        <path d="M29 43V8l14 7v28" />
      </svg>
    ),
  },
  {
    name: "Construction",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 38h38M9 38V9h7l14 12v17" />
        <path d="m16 13 12 10" stroke="#e8a020" />
      </svg>
    ),
  },
  {
    name: "Warehousing",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 17 24 8l18 9-18 9-18-9Z" />
        <path d="M6 17v14l18 9 18-9V17" />
      </svg>
    ),
  },
  {
    name: "Shipbuilding",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 30h38l-4 8H9l-4-8Z" />
        <path d="M16 30V16h16v14" />
        <path d="M6 41c3 0 3 2 6 2s3-2 6-2 3 2 6 2 3-2 6-2 3 2 6 2 3-2 6-2" stroke="#e8a020" />
      </svg>
    ),
  },
]

export function IndustriesServed() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (window.innerWidth < 768) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("opacity-100")
          })
        },
        { threshold: 0.2 }
      )

      section.querySelectorAll<HTMLElement>(".industry-card").forEach((card) => observer.observe(card))
      return () => observer.disconnect()
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".industry-card",
        { rotateY: 90, opacity: 0, transformPerspective: 1000 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.14,
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
    <section ref={sectionRef} className="border-y border-[#252525] bg-[#111] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-5xl text-[var(--bright)] sm:text-6xl">Industries We Serve</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--steel)]">Trusted for mission-critical lifting systems across demanding industrial sectors.</p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {industries.map((industry) => (
            <article
              key={industry.name}
              className="industry-card industrial-card perspective-1000 group p-6 text-center opacity-0 transition-all duration-300 hover:scale-105 hover:border-[var(--accent)] hover:shadow-[0_16px_24px_-18px_rgba(232,160,32,0.45)]"
            >
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded border border-[#303030] bg-[#141414] text-[var(--accent)] group-hover:bg-[var(--glow)]">
                {industry.icon}
              </div>
              <h3 className="font-display text-2xl text-[var(--bright)]">{industry.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
