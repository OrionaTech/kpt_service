"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { label: "Projects", value: 200 },
  { label: "Clients", value: 50 },
  { label: "Years", value: 25 },
  { label: "Countries", value: 2 },
]

const chartData = [
  { year: "2019", value: 350 },
  { year: "2020", value: 420 },
  { year: "2021", value: 480 },
  { year: "2022", value: 550 },
  { year: "2023", value: 620 },
  { year: "2024", value: 700 },
]

export function StatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const counterNodes = Array.from(section.querySelectorAll<HTMLElement>("[data-counter]"))

    const countUp = () => {
      stats.forEach((stat, index) => {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 1.1,
          ease: "power2.out",
          delay: index * 0.08,
          onUpdate: () => {
            if (counterNodes[index]) counterNodes[index].textContent = `${Math.round(obj.val)}+`
          },
        })
      })
    }

    if (window.innerWidth < 768) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              countUp()
              section.querySelectorAll<HTMLElement>(".progress-fill").forEach((bar) => {
                bar.style.width = "100%"
              })
              section.querySelectorAll<HTMLElement>(".chart-bar").forEach((bar) => {
                bar.style.height = `${bar.dataset.height ?? "0%"}`
              })
              observer.disconnect()
            }
          })
        },
        { threshold: 0.2 }
      )
      observer.observe(section)
      return () => observer.disconnect()
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 72%",
        once: true,
        onEnter: () => countUp(),
      })

      gsap.to(".progress-fill", {
        width: "100%",
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
        },
      })

      gsap.to(".chart-bar", {
        height: (_index, el) => (el as HTMLElement).dataset.height ?? "0%",
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".chart-wrap",
          start: "top 78%",
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const maxValue = Math.max(...chartData.map((item) => item.value))

  return (
    <section ref={sectionRef} className="border-y border-[#252525] bg-[#0d0d0d] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-5xl text-[var(--bright)] sm:text-6xl">Our Track Record</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--steel)]">Performance backed by measurable delivery across sectors and geographies.</p>
        </div>

        <div className="mb-16 grid grid-cols-2 gap-5 md:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="industrial-card p-5">
              <p className="font-mono text-4xl font-bold text-[var(--accent)]" data-counter>
                0+
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--steel)]">{stat.label}</p>
              <div className="mt-4 h-[6px] overflow-hidden rounded bg-[#2a2a2a]">
                <div className="progress-fill h-full w-0 bg-[linear-gradient(90deg,#8a5e14,#e8a020,#ffd27d)] transition-[width] duration-700" />
              </div>
            </article>
          ))}
        </div>

        <div className="chart-wrap industrial-card p-6">
          <h3 className="mb-6 text-center font-display text-4xl text-[var(--bright)]">Projects Completed (Last 6 Years)</h3>

          <div className="relative h-[320px]">
            <div className="pointer-events-none absolute inset-0">
              {[0, 1, 2, 3, 4].map((line) => (
                <div key={line} className="absolute left-0 right-0 border-t border-[#1a1a1a]" style={{ bottom: `${line * 25}%` }} />
              ))}
            </div>

            <div className="relative z-10 flex h-full items-end justify-between gap-3">
              {chartData.map((item) => {
                const height = `${Math.round((item.value / maxValue) * 100)}%`
                return (
                  <div key={item.year} className="group flex h-full w-full flex-col justify-end">
                    <div className="relative mx-auto flex h-[85%] w-full max-w-[72px] items-end">
                      <div
                        className="chart-bar relative h-0 w-full rounded-t border border-[#5b3f11] bg-[linear-gradient(180deg,#ffd27d_0%,#e8a020_35%,#8a5e14_100%)] transition-all duration-300 group-hover:brightness-110"
                        data-height={height}
                      >
                        <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#ffd27d] shadow-[0_0_14px_rgba(232,160,32,0.75)]" />
                        <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded border border-[var(--accent)]/40 bg-[#111] px-2 py-1 font-mono text-xs text-[#ffd9a0] opacity-0 transition-opacity group-hover:opacity-100">
                          {item.value}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-center font-mono text-xs tracking-[0.12em] text-[var(--steel)]">{item.year}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
