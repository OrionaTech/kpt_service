"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function CraneAssemblySection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const setDrawLength = (el: SVGGeometryElement) => {
      try {
        const len = el.getTotalLength()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
      } catch {
        // Skip elements that are temporarily non-rendered in current layout pass.
      }
    }

    if (window.innerWidth < 768) {
      section.querySelectorAll<SVGGeometryElement>(".draw-path").forEach((el) => {
        setDrawLength(el)
        gsap.set(el, { strokeDashoffset: 0 })
      })
      section.querySelector<HTMLElement>(".assembly-text")?.classList.remove("opacity-0", "translate-y-5")
      return
    }

    const ctx = gsap.context(() => {
      section.querySelectorAll<SVGGeometryElement>(".draw-path").forEach((el) => setDrawLength(el))
      gsap.set(".assembly-text", { opacity: 0, y: 20 })
      gsap.set(".hoist", { x: 0 })
      gsap.set(".hook-drop", { y: -90 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 0.75,
        },
      })

      tl.to(".track", { strokeDashoffset: 0, duration: 1.1 })
        .to(".bridge", { strokeDashoffset: 0, duration: 0.7 }, ">-0.15")
        .to(".hoist-body", { strokeDashoffset: 0, duration: 0.55 }, ">-0.1")
        .to(".hoist", { x: 180, duration: 0.9 })
        .to(".hook-drop", { y: 0, duration: 0.7 })
        .to(".dimensions-path", { strokeDashoffset: 0, duration: 0.5 })
        .to(".assembly-text", { opacity: 1, y: 0, duration: 0.5 }, ">-0.15")
    }, section)

    return () => {
      ctx.revert()
      // Defensive cleanup in case any trigger escapes context during route switches.
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerNode = trigger.trigger
        if (triggerNode instanceof Element && section.contains(triggerNode)) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-y border-[#252525] bg-[#090909] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <svg viewBox="0 0 1100 440" className="mx-auto h-auto w-full max-w-6xl">
          <path className="draw-path track" d="M120 90H980" stroke="#e8a020" strokeWidth="1.5" fill="none" />
          <path className="draw-path track" d="M120 78H980" stroke="#a06f18" strokeWidth="1" fill="none" />
          <path className="draw-path track" d="M120 102H980" stroke="#a06f18" strokeWidth="1" fill="none" />
          <g stroke="#8a8a8a" strokeWidth="1">
            <line className="draw-path track" x1="190" y1="78" x2="190" y2="102" />
            <line className="draw-path track" x1="260" y1="78" x2="260" y2="102" />
            <line className="draw-path track" x1="330" y1="78" x2="330" y2="102" />
            <line className="draw-path track" x1="400" y1="78" x2="400" y2="102" />
            <line className="draw-path track" x1="470" y1="78" x2="470" y2="102" />
            <line className="draw-path track" x1="540" y1="78" x2="540" y2="102" />
            <line className="draw-path track" x1="610" y1="78" x2="610" y2="102" />
            <line className="draw-path track" x1="680" y1="78" x2="680" y2="102" />
            <line className="draw-path track" x1="750" y1="78" x2="750" y2="102" />
            <line className="draw-path track" x1="820" y1="78" x2="820" y2="102" />
            <line className="draw-path track" x1="890" y1="78" x2="890" y2="102" />
          </g>
          <path className="draw-path bridge" d="M220 90V170H860V90" stroke="#e8a020" strokeWidth="1.5" fill="none" />
          <path className="draw-path bridge" d="M220 124H860" stroke="#8a8a8a" strokeWidth="1" fill="none" />
          <path className="draw-path bridge" d="M250 170L280 124L310 170L340 124L370 170L400 124L430 170L460 124L490 170L520 124L550 170L580 124L610 170L640 124L670 170L700 124L730 170L760 124L790 170L820 124" stroke="#666" strokeWidth="1" fill="none" />

          <g className="hoist" transform="translate(350 170)">
            <rect className="draw-path hoist-body" x="0" y="0" width="140" height="76" rx="3" stroke="#e8a020" strokeWidth="1.5" fill="none" />
            <rect className="draw-path hoist-body" x="14" y="12" width="112" height="20" stroke="#8a8a8a" strokeWidth="1.2" fill="none" />
            <circle className="draw-path hoist-body" cx="46" cy="47" r="10" stroke="#8a8a8a" strokeWidth="1.2" fill="none" />
            <circle className="draw-path hoist-body" cx="96" cy="47" r="10" stroke="#8a8a8a" strokeWidth="1.2" fill="none" />
            <line x1="56" y1="47" x2="86" y2="47" stroke="#8a8a8a" strokeWidth="1.2" />
            <line x1="70" y1="76" x2="70" y2="112" stroke="#c0c0c0" strokeWidth="1.5" />
            <line x1="70" y1="112" x2="70" y2="205" stroke="#e8a020" strokeWidth="1.5" strokeDasharray="4 4" />
            <g className="hook-drop">
              <rect x="58" y="112" width="24" height="15" stroke="#8a8a8a" fill="none" />
              <circle cx="65" cy="119.5" r="3" stroke="#8a8a8a" fill="none" />
              <circle cx="75" cy="119.5" r="3" stroke="#8a8a8a" fill="none" />
              <path d="M70 205 C97 205 96 247 72 252 C49 257 41 241 44 228 L53 231 C51 238 54 244 61 245 C76 245 79 220 70 218" stroke="#e8a020" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M54 233h13" stroke="#c68b1b" strokeWidth="2" />
            </g>
          </g>

          <g stroke="#8a8a8a" strokeWidth="1" fill="none">
            <path className="draw-path dimensions-path" d="M120 66H980" strokeDasharray="8 6" />
            <path className="draw-path dimensions-path" d="M120 66V90M980 66V90" />
            <path className="draw-path dimensions-path" d="M220 198H860" strokeDasharray="8 6" />
            <path className="draw-path dimensions-path" d="M220 198V170M860 198V170" />
            <path className="draw-path dimensions-path" d="M915 170V255" strokeDasharray="8 6" />
            <path className="draw-path dimensions-path" d="M898 170H932M898 255H932" />
          </g>

          <text x="540" y="57" textAnchor="middle" fill="#8a8a8a" fontFamily="var(--font-mono)" fontSize="14">
            TRACK LENGTH
          </text>
          <text x="540" y="220" textAnchor="middle" fill="#8a8a8a" fontFamily="var(--font-mono)" fontSize="14">
            BRIDGE SPAN
          </text>
          <text x="950" y="215" fill="#8a8a8a" fontFamily="var(--font-mono)" fontSize="14">
            LIFT
          </text>
        </svg>

        <p className="assembly-text mt-8 translate-y-5 text-center font-display text-5xl text-[var(--accent)] opacity-0 sm:text-6xl">
          ENGINEERED FOR EVERY LOAD
        </p>
      </div>
    </section>
  )
}
