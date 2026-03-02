"use client"

import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="hazard-top relative overflow-hidden border-t border-[#252525] bg-[#0a0a0a] py-20">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <svg className="h-full w-full animate-[drift_18s_linear_infinite]" viewBox="0 0 600 300" preserveAspectRatio="none">
          <defs>
            <pattern id="ctaGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#e8a020" fillOpacity="0.35" />
              <path d="M0 12h24M12 0v24" stroke="#1e1e1e" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="600" height="300" fill="url(#ctaGrid)" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-5xl text-[var(--bright)] sm:text-6xl">Ready to Elevate Your Operations?</h2>
          <p className="mt-4 text-lg text-[var(--chrome)]">
            Connect with our engineering team for a lifting solution matched to your load cycles, spans, and uptime goals.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <div className="relative inline-block">
              <span className="pointer-events-none absolute inset-0 rounded-none border border-[var(--accent)]/60 animate-[pulseRing_1.9s_ease-out_infinite]" />
              <Button asChild size="lg" className="shimmer-btn relative rounded-none border border-[var(--accent)] bg-[var(--accent)] px-8 py-6 text-[#1c1204] hover:bg-[#f1b84f]">
                <Link href="/contact?quote=true">
                  REQUEST A QUOTE
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <Button asChild size="lg" variant="outline" className="rounded-none border-[var(--accent)] px-8 py-6 text-[var(--accent)] hover:bg-[var(--glow)]">
              <Link href="/contact">
                <Phone className="mr-2 h-5 w-5" />
                CONTACT US
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
