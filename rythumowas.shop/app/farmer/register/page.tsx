'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button/Button'
import { useUser } from '@stackframe/stack'

export default function FarmerRegister() {
  const router = useRouter()
  const user = useUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    district: '',
    phone: '',
    description: '',
  })

  useEffect(() => {
    if (!user) {
      // Must be signed in via Stack before registering as farmer
      router.push('/handler/sign-in')
    }
  }, [user, router])

  const disabled = useMemo(() => loading || !user, [loading, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Create farmer profile for the signed-in user (Stack session)
      const farmerRes = await fetch('/api/farmer/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmName: formData.farmName,
          location: formData.location,
          district: formData.district,
          phone: formData.phone,
          description: formData.description,
        }),
      })

      if (!farmerRes.ok) {
        throw new Error('Failed to create farmer profile')
      }

      alert('Registration successful! Please wait for admin approval.')
      router.push('/farmer/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Register as Farmer
          </h1>
          <p className="text-gray-600 mb-6">
            Join Rythu Mowa and reach customers worldwide
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Farm Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  District *
                </label>
                <select
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select District</option>
                  <option value="Anantapur">Anantapur</option>
                  <option value="Chittoor">Chittoor</option>
                  <option value="East Godavari">East Godavari</option>
                  <option value="Guntur">Guntur</option>
                  <option value="Krishna">Krishna</option>
                  <option value="Kurnool">Kurnool</option>
                  <option value="Prakasam">Prakasam</option>
                  <option value="Srikakulam">Srikakulam</option>
                  <option value="Visakhapatnam">Visakhapatnam</option>
                  <option value="Vizianagaram">Vizianagaram</option>
                  <option value="West Godavari">West Godavari</option>
                  <option value="YSR Kadapa">YSR Kadapa</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Village/Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  About Your Farm
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us about your farming practices, products you grow, etc."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={disabled}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
              <Button
                type="button"
                intent="secondary"
                onClick={() => router.push('/')}
              >
                Cancel
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/handler/sign-in" className="text-green-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
