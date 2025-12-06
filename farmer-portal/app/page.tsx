import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌾</span>
            <div>
              <h1 className="text-2xl font-bold text-green-800">RythuMowa Portal</h1>
              <p className="text-xs text-gray-600">రైతు మోవ పోర్టల్</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 font-medium">
                  Sign In
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium">
                  Sign Up
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <SignedOut>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome to RythuMowa Portal
            </h2>
            <p className="text-xl text-green-700 mb-4">రైతు మోవ పోర్టల్</p>
            <p className="text-lg text-gray-600 mb-8">
              Manage your products, track orders, and grow your farming business
            </p>
            <SignInButton mode="modal">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-700">
                Get Started
              </button>
            </SignInButton>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-2">Product Management</h3>
              <p className="text-gray-600">
                Easily add and manage your products with photos and descriptions
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Order Tracking</h3>
              <p className="text-gray-600">
                Track all your orders in real-time and manage fulfillment
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Earnings Dashboard</h3>
              <p className="text-gray-600">
                View your earnings and payout history at a glance
              </p>
            </div>
          </div>

          {/* Why Join Section */}
          <div className="mt-24 bg-white rounded-lg shadow-lg p-12">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Why Join RythuMowa?
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="text-3xl">🌾</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Direct Market Access</h4>
                  <p className="text-gray-600">
                    Sell directly to customers without middlemen. Keep more of your profits.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">💳</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Easy Payments</h4>
                  <p className="text-gray-600">
                    Receive payments directly to your account. Fast and secure transactions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">📱</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Simple to Use</h4>
                  <p className="text-gray-600">
                    User-friendly dashboard designed for farmers. No technical knowledge needed.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">🤝</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Support Network</h4>
                  <p className="text-gray-600">
                    Join a community of farmers. Get support and share best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Active Farmers</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Products Listed</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Orders Delivered</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">₹2Cr+</div>
              <div className="text-gray-600">Farmer Earnings</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of farmers already selling on RythuMowa
            </p>
            <SignInButton mode="modal">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors">
                Start Selling Today →
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Your RythuMowa Dashboard
            </h2>
            <p className="text-lg text-green-700 mb-8">రైతు మోవ డాష్‌బోర్డ్</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Link
                href="/dashboard"
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-xl font-bold">Dashboard</h3>
                <p className="text-gray-600 mt-2">View your stats and analytics</p>
              </Link>
              <Link
                href="/products"
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">📦</div>
                <h3 className="text-xl font-bold">Products</h3>
                <p className="text-gray-600 mt-2">Manage your product catalog</p>
              </Link>
              <Link
                href="/orders"
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">🛒</div>
                <h3 className="text-xl font-bold">Orders</h3>
                <p className="text-gray-600 mt-2">Track and fulfill orders</p>
              </Link>
              <Link
                href="/profile"
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">👤</div>
                <h3 className="text-xl font-bold">Profile</h3>
                <p className="text-gray-600 mt-2">Update your information</p>
              </Link>
            </div>
          </div>
        </SignedIn>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-24">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌾</span>
                <span className="text-xl font-bold">RythuMowa</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering farmers across Andhra Pradesh to reach customers directly.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
                <li><a href="#" className="hover:text-white">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 RythuMowa. All rights reserved. | Made with ❤️ for farmers of Andhra Pradesh</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
