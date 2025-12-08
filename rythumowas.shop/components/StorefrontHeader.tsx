'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { UserButton } from '@stackframe/stack'

export default function StorefrontHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">RythuMowa</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/shop" className="text-gray-700 hover:text-green-600 transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="/farmers" className="text-gray-700 hover:text-green-600 transition-colors">
              Our Farmers
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="text-gray-700 hover:text-green-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  )
}