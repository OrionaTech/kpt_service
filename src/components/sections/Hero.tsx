"use client"

import { useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { label: "Projects", value: 200, suffix: "+" },
  { label: "Clients", value: 50, suffix: "+" },
  { label: "Years", value: 25, suffix: "+" },
  { label: "Countries", value: 2, suffix: "+" },
]

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null)
  const headingText = "INDUSTRIAL CRANE"

  const headingChars = useMemo(
    () =>
      headingText.split("").map((ch, index) => ({
        id: `${ch}-${index}`,
        char: ch,
      })),
    []
  )

  useEffect(() => {
    if (!rootRef.current) return

    const ctx = gsap.context(() => {
      rootRef.current?.querySelectorAll<SVGGeometryElement>(".crane-line").forEach((el) => {
        try {
          const len = el.getTotalLength()
          gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
        } catch {
          // Skip non-rendered geometry without breaking hero animation.
        }
      })
      gsap.set(".hero-char", { opacity: 0, y: 26 })
      gsap.set(".hero-sub", { opacity: 0, y: 22 })
      gsap.set(".hero-actions", { opacity: 0, y: 20 })
      gsap.set(".hero-underline", { scaleX: 0, transformOrigin: "left center" })

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.to(".crane-line", { strokeDashoffset: 0, duration: 1.2, stagger: 0.08 }, 0)
        .to(".hero-char", { opacity: 1, y: 0, duration: 0.35, stagger: 0.03 })
        .to(".hero-underline", { scaleX: 1, duration: 0.7 }, "<")
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.6 }, "-=0.25")
        .to(".hero-actions", { opacity: 1, y: 0, duration: 0.5 }, "-=0.25")

      gsap.to(".hook-sway", {
        rotate: 4,
        transformOrigin: "center top",
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: "sine.inOut",
      })

      gsap.to(".trolley", {
        x: -120,
        repeat: -1,
        yoyo: true,
        duration: 6,
        ease: "none",
      })

      gsap.utils.toArray<HTMLElement>(".spark-dot").forEach((dot, index) => {
        gsap.fromTo(
          dot,
          { y: 0, opacity: 0.6 + (index % 2) * 0.25 },
          {
            y: 56 + index * 6,
            opacity: 0,
            duration: 1.2 + index * 0.12,
            repeat: -1,
            delay: index * 0.2,
            ease: "power1.in",
          }
        )
      })

      stats.forEach((_, index) => {
        const obj = { value: 0 }
        gsap.to(obj, {
          value: stats[index].value,
          duration: 1.1,
          delay: 0.45 + index * 0.1,
          ease: "power2.out",
          onUpdate: () => {
            const node = document.querySelector(`[data-stat='${index}']`)
            if (node) {
              node.textContent = `${Math.round(obj.value)}${stats[index].suffix}`
            }
          },
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="hazard-bottom relative min-h-screen overflow-hidden border-b border-[#252525] bg-[radial-gradient(circle_at_80%_10%,rgba(232,160,32,0.10)_0%,rgba(10,10,10,0)_44%),linear-gradient(170deg,#101010,#0a0a0a)]"
    >
      <div className="container mx-auto grid min-h-screen grid-cols-1 items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="z-10">
          <h1 className="font-display text-6xl leading-[0.9] text-[var(--bright)] sm:text-7xl lg:text-8xl">
            <span className="flex flex-wrap gap-x-1.5 gap-y-0.5">
              {headingChars.map((item) => (
                <span key={item.id} className="hero-char inline-block">
                  {item.char === " " ? "\u00A0" : item.char}
                </span>
              ))}
            </span>
            <span className="mt-2 block text-[var(--accent)]">SOLUTIONS</span>
          </h1>
          <div className="hero-underline mt-3 h-[3px] w-44 bg-[var(--accent)]" />
          <p className="hero-sub mt-6 max-w-xl text-xl text-[var(--chrome)]">Built for Excellence</p>

          <div className="hero-actions mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="shimmer-btn rounded-none border border-[var(--accent)] bg-[var(--accent)] px-8 py-6 font-semibold tracking-wide text-[#1c1204] hover:bg-[#f1b84f]">
              <Link href="/products">
                EXPLORE PRODUCTS
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-none border-[var(--accent)] px-8 py-6 text-[var(--accent)] hover:bg-[var(--glow)] hover:text-[#ffdca3]">
              <Link href="/contact?quote=true">GET QUOTE</Link>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={stat.label} className="relative border border-[#242424] bg-[#111111b3] p-4 backdrop-blur">
                <div className="font-mono text-2xl font-bold text-[var(--accent)]" data-stat={idx}>
                  0+
                </div>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--steel)]">{stat.label}</p>
                {idx !== stats.length - 1 && <span className="absolute -right-2 top-1/2 h-8 w-px -translate-y-1/2 bg-[var(--accent)]/60" />}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <svg viewBox="0 0 620 420" className="h-auto w-full">
            <defs>
              <linearGradient id="beam" x1="0" x2="1">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#3b3b3b" />
              </linearGradient>
              <linearGradient id="metalPlate" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#262626" />
                <stop offset="100%" stopColor="#171717" />
              </linearGradient>
            </defs>

            <rect x="30" y="68" width="560" height="28" fill="url(#beam)" stroke="#3d3d3d" className="crane-line" />
            <line x1="44" y1="82" x2="580" y2="82" stroke="#5c5c5c" strokeDasharray="6 6" className="crane-line" />
            <line x1="44" y1="72" x2="580" y2="72" stroke="#454545" className="crane-line" />
            <line x1="44" y1="92" x2="580" y2="92" stroke="#454545" className="crane-line" />
            <g stroke="#4f4f4f" strokeWidth="1" className="crane-line">
              <line x1="82" y1="68" x2="82" y2="96" />
              <line x1="140" y1="68" x2="140" y2="96" />
              <line x1="198" y1="68" x2="198" y2="96" />
              <line x1="256" y1="68" x2="256" y2="96" />
              <line x1="314" y1="68" x2="314" y2="96" />
              <line x1="372" y1="68" x2="372" y2="96" />
              <line x1="430" y1="68" x2="430" y2="96" />
              <line x1="488" y1="68" x2="488" y2="96" />
              <line x1="546" y1="68" x2="546" y2="96" />
            </g>

            <g className="trolley" transform="translate(414 98)">
              <rect x="2" y="0" width="124" height="58" rx="2" fill="url(#metalPlate)" stroke="#5a5a5a" className="crane-line" />
              <rect x="16" y="10" width="95" height="18" fill="#1c1c1c" stroke="#4b4b4b" className="crane-line" />
              <circle cx="22" cy="10" r="6" fill="#e8a020" className="crane-line" />
              <circle cx="106" cy="10" r="6" fill="#e8a020" className="crane-line" />
              <circle cx="42" cy="38" r="8" fill="none" stroke="#727272" className="crane-line" />
              <circle cx="87" cy="38" r="8" fill="none" stroke="#727272" className="crane-line" />
              <line x1="50" y1="38" x2="79" y2="38" stroke="#5f5f5f" className="crane-line" />
              <rect x="54" y="28" width="22" height="10" fill="#222" stroke="#515151" className="crane-line" />
              <circle cx="65" cy="33" r="2.5" fill="#e8a020" />

              <g className="hook-sway">
                <line x1="65" y1="58" x2="65" y2="82" stroke="#8f8f8f" className="crane-line" />
                <rect x="54" y="82" width="22" height="14" fill="#1b1b1b" stroke="#4f4f4f" className="crane-line" />
                <circle cx="60" cy="89" r="3" fill="none" stroke="#9b9b9b" className="crane-line" />
                <circle cx="70" cy="89" r="3" fill="none" stroke="#9b9b9b" className="crane-line" />
                <line x1="60" y1="96" x2="60" y2="116" stroke="#b2b2b2" className="crane-line" />
                <line x1="70" y1="96" x2="70" y2="116" stroke="#b2b2b2" className="crane-line" />
                <line x1="65" y1="116" x2="65" y2="170" stroke="#d0d0d0" className="crane-line" />
                <rect x="57" y="118" width="16" height="12" fill="#202020" stroke="#595959" className="crane-line" />
                <path d="M65 170 C89 170 88 210 66 216 C45 221 37 205 41 191 L49 194 C47 201 49 208 57 209 C71 209 73 186 65 184" fill="none" stroke="#e8a020" strokeWidth="4.2" strokeLinecap="round" />
                <path d="M50 196h13" stroke="#c68b1b" strokeWidth="2" />
                <circle className="spark-dot" cx="65" cy="224" r="2.2" fill="#e8a020" />
                <circle className="spark-dot" cx="68" cy="229" r="1.7" fill="#ffd27d" />
                <circle className="spark-dot" cx="62" cy="234" r="1.4" fill="#ffc95a" />
              </g>
            </g>

            <rect x="34" y="300" width="108" height="18" fill="#212121" stroke="#2e2e2e" className="crane-line" />
            <rect x="478" y="300" width="108" height="18" fill="#212121" stroke="#2e2e2e" className="crane-line" />
            <line x1="88" y1="300" x2="88" y2="94" stroke="#2f2f2f" className="crane-line" />
            <line x1="532" y1="300" x2="532" y2="94" stroke="#2f2f2f" className="crane-line" />
            <line x1="88" y1="170" x2="532" y2="170" stroke="#242424" strokeDasharray="5 7" className="crane-line" />
            <line x1="88" y1="250" x2="532" y2="250" stroke="#242424" strokeDasharray="5 7" className="crane-line" />
          </svg>
        </div>
      </div>
    </section>
  )
}
