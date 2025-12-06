'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

type Product = {
  id: string
  name: string
  description: string
  price: number
  unit: string
  imageUrl: string | null
  inStock: boolean
  farmer: {
    farmName: string
    location: string
    contactNumber: string
  }
}

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [params.id])

  const addToCart = () => {
    if (!product) return
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find((item: any) => item.id === product.id)
    
    if (existing) {
      existing.quantity += quantity
    } else {
      cart.push({ 
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.imageUrl,
        farmer: product.farmer.farmName,
        location: product.farmer.location,
        quantity 
      })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('storage'))
    alert('Added to cart!')
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Product not found</p>
        <Link href="/" className="text-green-700 hover:underline">
          ← Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-green-700 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>
      
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-8">
        <div>
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full rounded-lg"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-green-700 font-bold mb-4">
            ₹{product.price} <span className="text-sm text-gray-600">per {product.unit}</span>
          </p>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <p className="text-sm text-gray-600">👨‍🌾 Farm: {product.farmer.farmName}</p>
            <p className="text-sm text-gray-600">📍 Location: {product.farmer.location}</p>
            <p className="text-sm text-gray-600">📞 Contact: {product.farmer.contactNumber}</p>
            <p className="text-sm text-gray-600">
              {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
            </p>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <label className="font-semibold">Quantity:</label>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
          
          <button
            onClick={addToCart}
            disabled={!product.inStock}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}
