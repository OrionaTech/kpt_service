"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlobalStatsStrip } from "@/components/sections/GlobalStatsStrip"

function ClockIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8 text-[var(--accent)]">
      <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="2" />
      <g className="origin-center animate-[spin_12s_linear_infinite]">
        <path d="M24 24V13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g className="origin-center animate-[spin_60s_linear_infinite]">
        <path d="M24 24h10" stroke="#ffd27d" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <circle cx="24" cy="24" r="2.5" fill="#e8a020" />
    </svg>
  )
}

function ContactForm() {
  const searchParams = useSearchParams()
  const isQuote = searchParams.get("quote") === "true"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    ;(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (!res.ok) {
          alert("Failed to submit form. Please try again later.")
          return
        }

        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setFormData({ name: "", email: "", phone: "", company_name: "", message: "" })
        }, 3000)
      } catch {
        alert("Failed to submit form. Please check your connection and try again.")
      }
    })()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="min-h-screen bg-[#0c0c0c] text-[var(--bright)]">
      <section className="hazard-bottom border-b border-[#262626] bg-[linear-gradient(140deg,#151515,#090909)] py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-6xl sm:text-7xl">{isQuote ? "Request a Quote" : "Contact Us"}</h1>
          <p className="mt-3 max-w-2xl text-[var(--steel)]">
            {isQuote
              ? "Share your requirements and our team will provide a tailored quotation."
              : "Reach us for crane systems, service support, and project consultations."}
          </p>
        </div>
      </section>

      <GlobalStatsStrip />

      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="industrial-card p-8">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-green-400/60 bg-green-400/10 text-green-300">
                  <Send className="h-8 w-8" />
                </div>
                <h3 className="font-display text-4xl">Thank You</h3>
                <p className="mt-2 text-[var(--steel)]">We have received your message and will contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <label className="block">
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--steel)]">Name *</span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2 w-full border-0 border-b border-[#3a3a3a] bg-transparent px-0 py-2 text-[var(--bright)] focus:border-[var(--accent)] focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--steel)]">Email *</span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 w-full border-0 border-b border-[#3a3a3a] bg-transparent px-0 py-2 text-[var(--bright)] focus:border-[var(--accent)] focus:outline-none"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <label className="block">
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--steel)]">Phone *</span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2 w-full border-0 border-b border-[#3a3a3a] bg-transparent px-0 py-2 text-[var(--bright)] focus:border-[var(--accent)] focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--steel)]">Company</span>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      className="mt-2 w-full border-0 border-b border-[#3a3a3a] bg-transparent px-0 py-2 text-[var(--bright)] focus:border-[var(--accent)] focus:outline-none"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--steel)]">{isQuote ? "Requirements *" : "Message *"}</span>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 w-full resize-none border-0 border-b border-[#3a3a3a] bg-transparent px-0 py-2 text-[var(--bright)] focus:border-[var(--accent)] focus:outline-none"
                    placeholder={
                      isQuote
                        ? "Describe capacity, span, lifting height, duty class, and any electrical requirements..."
                        : "Tell us how we can support your project..."
                    }
                  />
                </label>

                <Button type="submit" size="lg" className="shimmer-btn w-full rounded-none border border-[var(--accent)] bg-[var(--accent)] text-[#1c1204] hover:bg-[#f1b84f]">
                  <Send className="mr-2 h-5 w-5" />
                  {isQuote ? "Request Quote" : "Send Message"}
                </Button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="industrial-card p-6">
              <h2 className="font-display text-4xl">Get in Touch</h2>
              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3 text-[var(--steel)]">
                  <Phone className="mt-0.5 h-5 w-5 text-[var(--accent)]" />
                  <span>+91-98123-43912</span>
                </div>
                <div className="flex items-start gap-3 text-[var(--steel)]">
                  <Mail className="mt-0.5 h-5 w-5 text-[var(--accent)]" />
                  <span>contact@kptservice.co.in</span>
                </div>
                <div className="flex items-start gap-3 text-[var(--steel)]">
                  <MapPin className="mt-0.5 h-5 w-5 text-[var(--accent)]" />
                  <span>Plot No 10/1, Industrial Estate Phase 2, Yamuna Nagar, Haryana - 135001</span>
                </div>
              </div>

              <a
                href="https://wa.me/919812343912"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center border border-[var(--accent)] px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)] transition hover:bg-[var(--glow)]"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            </div>

            <div className="industrial-card p-6">
              <div className="flex items-center gap-3">
                <ClockIcon />
                <div>
                  <h3 className="font-display text-3xl">Working Hours</h3>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--steel)]">Mon - Sat: 9:00 AM to 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden border border-[#2e2e2e]">
              <iframe
                title="KPT Location"
                src="https://maps.google.com/maps?q=Yamuna%20Nagar%20Haryana&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-[300px] w-full [filter:grayscale(100%)_brightness(80%)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#0c0c0c]">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--accent)]" />
            <p className="mt-4 text-[var(--steel)]">Loading...</p>
          </div>
        </main>
      }
    >
      <ContactForm />
    </Suspense>
  )
}
