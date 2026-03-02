import type { Metadata } from "next"
import { Inter, Bebas_Neue, Space_Mono } from "next/font/google"
import "./globals.css"
import AppShell from "@/components/AppShell"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
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
      <body className={`${inter.variable} ${bebas.variable} ${spaceMono.variable} font-sans antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
