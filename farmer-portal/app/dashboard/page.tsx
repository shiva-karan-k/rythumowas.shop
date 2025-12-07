'use client'

import Link from 'next/link'
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react'

export default function DashboardPage() {

  const stats = [
    { label: 'Total Products', value: '0', icon: Package, color: 'bg-blue-500' },
    { label: 'Active Orders', value: '0', icon: ShoppingCart, color: 'bg-green-500' },
    { label: 'Total Earnings', value: '₹0', icon: DollarSign, color: 'bg-yellow-500' },
    { label: 'This Month', value: '₹0', icon: TrendingUp, color: 'bg-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
            <Link href="/" className="text-green-600 hover:text-green-700">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Welcome back, Farmer! 👋
          </h2>
          <p className="text-gray-600 mt-1">Here's what's happening with your farm today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
            <div className="text-center py-8 text-gray-500">
              No orders yet. Start by adding products!
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/products/new"
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700"
              >
                + Add New Product
              </Link>
              <Link
                href="/products"
                className="block w-full bg-gray-100 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-200"
              >
                View All Products
              </Link>
              <Link
                href="/profile"
                className="block w-full bg-gray-100 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-200"
              >
                Update Profile
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
