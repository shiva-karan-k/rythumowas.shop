'use client'

import Link from 'next/link'
import { Product, Farmer } from '@prisma/client'

type ProductWithFarmer = Product & {
  farmer: Farmer
}

export default function ProductCard({ product }: { product: ProductWithFarmer }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative h-48 bg-gray-200">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          {!product.inStock && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-2xl font-bold text-green-700">₹{product.price}</p>
              <p className="text-xs text-gray-500">per {product.unit}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">👨‍🌾 {product.farmer.farmName}</p>
              <p className="text-xs text-gray-500">{product.farmer.location}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
