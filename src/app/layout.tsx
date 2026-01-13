import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import PageTracker from "@/components/PageTracker"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: {
    default: "KPT Crane & Machinery - Industrial Crane Solutions",
    template: "%s | KPT Crane & Machinery",
  },
  description:
    "Leading manufacturer of EOT cranes, gantry cranes, and material handling equipment. Quality, reliability, and innovation for industrial applications.",
  keywords: [
    "EOT cranes",
    "gantry cranes",
    "industrial cranes",
    "material handling",
    "crane manufacturer",
  ],
   icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
       <link rel="icon" href="/favicon.ico" />
      <body className={`${inter.variable} font-sans antialiased`}>
         <PageTracker />
        <Navbar />
        <div className="pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
