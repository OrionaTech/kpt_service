import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch",
  description:
    "Contact KPT Crane & Machinery for inquiries, quotes, and support. Our team is ready to assist with all your crane and material handling needs.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

