import {
  getAllProducts,
  getAllCategories,
  getProductsByCategory,
} from "@/lib/products"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
 import Image from "next/image"

export const metadata: Metadata = {
  title: "Products - Industrial Cranes & Material Handling Equipment",
  description:
    "Browse our comprehensive range of EOT cranes, gantry cranes, jib cranes, and electrical panels.",
}

type ProductsPageProps = {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { category } = await searchParams // ✅ REQUIRED IN NEXT 16

  const categories = getAllCategories()
  const selectedCategory = category

  const products = selectedCategory
    ? getProductsByCategory(selectedCategory)
    : getAllProducts()

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-slate-300 max-w-2xl">
            Industrial cranes & electrical panels engineered for performance
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/products"
            className={`px-4 py-2 rounded-md ${
              !selectedCategory
                ? "bg-primary text-white"
                : "bg-white"
            }`}
          >
            All Products
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-white"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden">
                {/* IMAGE PLACEHOLDER (ready for next/image later) */}
                  <div className="relative h-48">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>


                <div className="p-6">
                  <p className="text-sm text-primary mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-xl font-semibold mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {product.shortDescription}
                  </p>
                  <span className="flex items-center text-primary text-sm">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
