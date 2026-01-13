import { getAllProducts, getProductBySlug } from "@/lib/products"
import { notFound } from "next/navigation"
import Image from "next/image"
import ProductEstimateSection from "@/components/ProductEstimateSection";


export const dynamicParams = true

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)


  if (!product) notFound()

  return (
    <main className="container py-12">
      {/* Title */}
      <h1 className="font-heading text-4xl font-bold mb-2">
        {product.name}
      </h1>
      <p className="text-muted-foreground mb-6">
        {product.description}
      </p>

      {/* ✅ SINGLE PRODUCT IMAGE */}
      <div className="relative w-full h-[420px] rounded-lg overflow-hidden mb-10">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Applications</h2>
          <ul className="list-disc pl-5">
            {product.applications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc pl-5">
            {product.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <ProductEstimateSection
        estimator={product.estimator}
        productSlug={product.slug}
        productName={product.name}
      />
    </main>
  )
}
