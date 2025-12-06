import StorefrontHeader from '@/components/StorefrontHeader'

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <StorefrontHeader />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <footer className="bg-green-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Rythu Mowa - Supporting Natural Farmers of Andhra Pradesh</p>
        </div>
      </footer>
    </>
  )
}
