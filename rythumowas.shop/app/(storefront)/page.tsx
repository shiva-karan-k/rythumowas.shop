import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'

export default async function StorefrontPage() {
  const products = await prisma.product.findMany({
    where: { inStock: true },
    include: { farmer: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          Natural Products from Andhra Pradesh
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Authentic, chemical-free products directly from our curated network 
          of natural farmers across Andhra Pradesh
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">No products available yet</p>
        </div>
      )}
    </div>
  )
}
