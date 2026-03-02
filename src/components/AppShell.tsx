"use client"

import { useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import PageTracker from "@/components/PageTracker"

function LoadingScreen({ done }: { done: boolean }) {
  if (done) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--dark)]">
      <div className="w-[min(520px,88vw)]">
        <p className="font-display text-4xl tracking-[0.2em] text-[var(--bright)]">
          KPT
        </p>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--steel)]">
          SERVICES 
        </p>
        <div className="loader-track mt-8">
          <div className="loader-bar" />
        </div>
      </div>
    </div>
  )
}

function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const cursorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMounted(true)

    if (window.matchMedia("(pointer: coarse)").matches) {
      return
    }

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let cursorX = mouseX
    let cursorY = mouseY
    let rafId = 0

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    const onHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest("a, button, input, textarea, select, [role='button']")
      cursorRef.current?.classList.toggle("cursor-active", Boolean(interactive))
    }

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.18
      cursorY += (mouseY - cursorY) * 0.18
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX - 6}px, ${cursorY - 6}px, 0)`
      }
      rafId = requestAnimationFrame(render)
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onHover)
    rafId = requestAnimationFrame(render)

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onHover)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (!mounted) return null
  return <div ref={cursorRef} className="custom-cursor" />
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      lerp: 0.08,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <LoadingScreen done={loaded} />
      <CustomCursor />
      <PageTracker />
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  )
}
