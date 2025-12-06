import { prisma } from '@/lib/prisma'
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@rythumowa/ui'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Farmer Management',
  description: 'Manage farmer approvals and verification'
}

export default async function FarmersPage() {
  const farmers = await prisma.farmer.findMany({
    include: { user: true, _count: { select: { products: true } } },
    orderBy: { createdAt: 'desc' }
  })

  const pending = farmers.filter(f => !f.verified)
  const verified = farmers.filter(f => f.verified)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Farmer Management</h1>
      
      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Pending Approvals ({pending.length})</h2>
          <div className="grid gap-4">
            {pending.map(farmer => (
              <Card key={farmer.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{farmer.farmName}</span>
                    <Badge variant="secondary">Pending</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Location: {farmer.location}</p>
                  <p className="text-sm text-gray-600">Products: {farmer._count.products}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Verified Farmers ({verified.length})</h2>
        <div className="grid gap-4">
          {verified.map(farmer => (
            <Card key={farmer.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{farmer.farmName}</span>
                  <Badge>Verified</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Location: {farmer.location}</p>
                <p className="text-sm text-gray-600">Products: {farmer._count.products}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
