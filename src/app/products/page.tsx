import { getAllProducts, getAllCategories, getProductsByCategory } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { GlobalStatsStrip } from "@/components/sections/GlobalStatsStrip"

export const metadata: Metadata = {
  title: "Products - Industrial Cranes & Material Handling Equipment",
  description:
    "Browse our comprehensive range of EOT cranes, gantry cranes, jib cranes, and electrical panels.",
}

type ProductsPageProps = {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams

  const categories = getAllCategories()
  const selectedCategory = category
  const products = selectedCategory ? getProductsByCategory(selectedCategory) : getAllProducts()

  return (
    <main className="min-h-screen bg-[#0c0c0c] text-[var(--bright)]">
      <section className="hazard-bottom border-b border-[#262626] bg-[linear-gradient(140deg,#161616,#0a0a0a)] py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-6xl sm:text-7xl">Our Products</h1>
          <p className="mt-3 max-w-2xl text-[var(--steel)]">Industrial cranes and electrical panels engineered for demanding operating environments.</p>
        </div>
      </section>

      <GlobalStatsStrip />

      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/products"
            className={`border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition ${
              !selectedCategory ? "border-[var(--accent)] bg-[var(--accent)] text-[#1c1204]" : "border-[#313131] text-[var(--steel)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            All Products
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className={`border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition ${
                selectedCategory === cat ? "border-[var(--accent)] bg-[var(--accent)] text-[#1c1204]" : "border-[#313131] text-[var(--steel)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="group">
              <article className="industrial-card relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(232,160,32,0.2)]">
                <span className="absolute left-0 top-0 z-20 h-0 w-0 border-l-[46px] border-t-[46px] border-l-[var(--accent)] border-t-[var(--accent)]/20 border-r-transparent border-b-transparent" />

                <div className="relative h-52 overflow-hidden border-b border-[#2d2d2d]">
                  <Image src={product.images[0]} alt={product.name} fill className="industrial-image object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-[#ffd9a0]">
                    {product.category.includes("Electrical") ? "CONTROL SYSTEM" : "UP TO 500T"}
                  </span>
                </div>

                <div className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">{product.category}</p>
                  <h3 className="mt-1 font-display text-3xl text-[var(--bright)]">{product.name}</h3>
                  <p className="mt-2 text-sm text-[var(--steel)]">{product.shortDescription}</p>
                  <span className="mt-4 inline-flex items-center font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
