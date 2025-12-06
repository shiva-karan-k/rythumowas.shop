import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const stats = await Promise.all([
    prisma.product.count(),
    prisma.farmer.count(),
    prisma.order.count(),
    prisma.farmer.count({ where: { verified: false } })
  ])

  const [productCount, farmerCount, orderCount, pendingFarmers] = stats

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Products" value={productCount} />
        <StatCard title="Farmers" value={farmerCount} />
        <StatCard title="Orders" value={orderCount} />
        <StatCard title="Pending Approvals" value={pendingFarmers} alert />
      </div>
    </div>
  )
}

function StatCard({ title, value, alert }: { title: string; value: number; alert?: boolean }) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow ${alert ? 'border-l-4 border-orange-500' : ''}`}>
      <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}
