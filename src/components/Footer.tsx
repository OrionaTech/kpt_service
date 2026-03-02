import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

const quickLinks = [
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
]

const productLinks = [
  { href: "/products?category=EOT Cranes", label: "EOT Cranes" },
  { href: "/products?category=Gantry Cranes", label: "Gantry Cranes" },
  { href: "/products?category=Jib Cranes", label: "Jib Cranes" },
  { href: "/products?category=Electrical Panels", label: "Electrical Panels" },
]

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7h.01M12 17v-4a2 2 0 1 1 4 0v4" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 12a8 8 0 0 1-11.7 7l-4 1 1.1-3.8A8 8 0 1 1 20 12Z" />
      <path d="M9 9c0 3 2 6 5 7l1-1" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="hazard-top relative overflow-hidden border-t border-[#2e2e2e] bg-[#0a0a0a] text-[var(--chrome)]">
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.08)_0.4px,transparent_0.4px)] [background-size:4px_4px]" />

      <div className="container relative mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/kpt-new-logo.jpeg" alt="KPT Logo" width={48} height={48} className="object-contain" />
              <div>
                <p className="font-display text-3xl leading-none text-[var(--bright)]">KPT</p>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent)]">SERVICES</p>
              </div>
            </Link>
            <p className="text-sm text-[var(--steel)]">
              Industrial crane systems engineered for uptime, safety, and precision material handling.
            </p>
          </div>

          <div>
            <h3 className="font-display text-3xl text-[var(--bright)]">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--steel)] transition-colors hover:text-[var(--accent)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-3xl text-[var(--bright)]">Products</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--steel)] transition-colors hover:text-[var(--accent)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-3xl text-[var(--bright)]">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
                <span className="text-[var(--steel)]">+91-98123-43912</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
                <span className="text-[var(--steel)]">contact@kptservice.co.in</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
                <span className="text-[var(--steel)]">Plot No 10/1, Industrial Estate Phase 2, Yamuna Nagar, Haryana - 135001</span>
              </li>
            </ul>

            <div className="mt-4 flex gap-3">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded border border-[#343434] p-2 text-[var(--steel)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
                <LinkedInIcon />
              </a>
              <a href="https://wa.me/919812343912" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="rounded border border-[#343434] p-2 text-[var(--steel)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#2d2d2d] pt-6 text-center font-mono text-[10px] tracking-[0.16em] text-[var(--steel)]">
          © {new Date().getFullYear()} KPT Crane & Machinery. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
