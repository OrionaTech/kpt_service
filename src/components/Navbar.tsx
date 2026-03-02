"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const productCategories = [
  { name: "EOT Cranes", href: "/products?category=EOT Cranes" },
  { name: "Gantry Cranes", href: "/products?category=Gantry Cranes" },
  { name: "Electrical Panels", href: "/products?category=Electrical Panels" },
]

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "border-[#343434] bg-[rgba(10,10,10,0.85)] backdrop-blur-xl"
          : "border-transparent bg-[rgba(10,10,10,0.22)] backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/kpt-new-logo.jpeg" alt="KPT Logo" width={60} height={60} className="object-contain" />
            <div className="hidden sm:block">
              <p className="font-display text-3xl leading-none text-[var(--bright)]">KPT</p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent)]">SERVICES</p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="group flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--chrome)] transition-colors hover:text-[var(--accent)]">
                  <span className={cn("pl-3", pathname.startsWith("/products") && "border-l-2 border-[var(--accent)] text-[var(--accent)]")}>Products</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 border-[#353535] bg-[#121212] text-[var(--chrome)]">
                {productCategories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild className="focus:bg-[var(--glow)] focus:text-[var(--accent)]">
                    <Link href={category.href}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "border-l-2 border-transparent pl-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--chrome)] transition-colors hover:text-[var(--accent)]",
                  pathname === link.href && "border-[var(--accent)] text-[var(--accent)]"
                )}
              >
                {link.label}
              </Link>
            ))}

            <Button asChild className="shimmer-btn rounded-none border border-[var(--accent)] bg-[var(--accent)] px-5 text-[#1c1204] hover:bg-[#f1b84f]">
              <Link href="/contact?quote=true">Get Quote</Link>
            </Button>
          </div>

          <button className="lg:hidden p-2 text-[var(--bright)]" onClick={() => setIsOpen((open) => !open)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[#303030] bg-[#0e0e0e] lg:hidden">
          <div className="container mx-auto space-y-4 px-4 py-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--steel)]">Products</p>
            {productCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="block border-l-2 border-transparent pl-3 text-sm text-[var(--chrome)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </Link>
            ))}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block border-l-2 border-transparent pl-3 text-sm text-[var(--chrome)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Button asChild className="mt-2 w-full rounded-none border border-[var(--accent)] bg-[var(--accent)] text-[#1c1204] hover:bg-[#f1b84f]">
              <Link href="/contact?quote=true" onClick={() => setIsOpen(false)}>
                Get Quote
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
