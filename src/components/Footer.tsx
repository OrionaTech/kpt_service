import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/kpt_logo.jpg"
                alt="KPT Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <span className="text-lg font-bold">KPT Service</span>
            </Link>
            <p className="text-slate-400 text-sm">
              Leading manufacturer of industrial cranes and material handling
              equipment. Quality, reliability, and innovation since our inception.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products?category=EOT Cranes"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  EOT Cranes
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Gantry Cranes"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  Gantry Cranes
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Jib Cranes"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  Jib Cranes
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Hoists"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  Hoists
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">+91-98123-43912</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">contact@kptservice.co.in</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">
                  Plot No 10/1, Industrial Estate Phase 2, Yamuna Nagar, Haryana - 135001
                </span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} KPT Service. All rights
            reserved. Made with ❤️ by <a href="www.orionatech.in">OrianaTech</a>.
          </p>
        </div>
      </div>
    </footer>
  )
}

