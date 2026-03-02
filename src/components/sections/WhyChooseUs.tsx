"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: "Quality Assured",
    description: "ISO-grade process controls with documented checks at every fabrication stage.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M24 6 10 12v12c0 9 6 14 14 18 8-4 14-9 14-18V12L24 6Z" />
        <path d="m17 25 5 5 9-10" stroke="#e8a020" />
      </svg>
    ),
  },
  {
    title: "Industry Leaders",
    description: "Built on decades of crane engineering, commissioning, and operational insight.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M24 6 7 14v11c0 8 7 14 17 17 10-3 17-9 17-17V14L24 6Z" />
        <path d="m17 22 7-8 7 8-7 6-7-6Z" stroke="#e8a020" />
      </svg>
    ),
  },
  {
    title: "Expert Service",
    description: "Certified teams for installation, preventive maintenance, and system retrofits.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="18" r="6" />
        <path d="m22 22 17 17M12 30l6 6" stroke="#e8a020" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    description: "Response-first support channel to keep your operations running continuously.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M24 39c10 0 18-8 18-18S34 3 24 3 6 11 6 21c0 4 1 8 4 11v9l8-4c2 1 4 2 6 2Z" />
        <path d="M17 23h14" stroke="#e8a020" />
      </svg>
    ),
  },
]

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (window.innerWidth < 768) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("opacity-100", "translate-x-0")
          })
        },
        { threshold: 0.2 }
      )
      section.querySelectorAll<HTMLElement>(".feature-item").forEach((item) => observer.observe(item))
      return () => observer.disconnect()
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-item",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.16,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      )

      gsap.fromTo(
        ".feature-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.16,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="border-y border-[#252525] bg-[#0d0d0d] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-5xl text-[var(--bright)] sm:text-6xl">Why Choose Us</h2>
          <p className="mx-auto mt-2 max-w-2xl text-[var(--steel)]">Engineering discipline, field-proven reliability, and responsive support.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="feature-item industrial-card relative translate-x-5 p-6 opacity-0 transition-all duration-300 hover:border-[var(--accent)]/70"
            >
              <span className="feature-line absolute left-0 top-0 h-full w-[2px] bg-[var(--accent)]" />
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm border border-[var(--accent)]/50 bg-[var(--glow)] text-[var(--accent)]">
                {feature.icon}
              </div>
              <h3 className="font-display text-3xl text-[var(--bright)]">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--steel)]">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
