import { Metadata } from "next"
import { Button } from "components/Button/Button"

export const metadata: Metadata = {
  title: "Rythu Mowa - Empowering Natural Farmers of Andhra Pradesh",
  description: "Connecting natural farmers with the world. Fresh, organic, chemical-free products from Andhra Pradesh.",
  openGraph: {
    title: "Rythu Mowa - Natural Farming Marketplace",
    description: "Supporting natural farmers across Andhra Pradesh",
  },
}

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto grid max-w-(--breakpoint-xl) px-4 py-16 text-center lg:py-24">
          <div className="mx-auto place-self-center">
            <h1 className="mb-6 max-w-3xl text-5xl leading-tight font-extrabold tracking-tight md:text-6xl xl:text-7xl text-green-800">
              Rythu Mowa
            </h1>
            <p className="mb-4 text-2xl font-semibold text-green-700">
              రైతు మోవ - Empowering Natural Farmers
            </p>
            <p className="mb-8 max-w-2xl mx-auto font-light text-gray-700 md:text-lg lg:text-xl">
              Connecting natural farmers of Andhra Pradesh with the world. 
              Fresh, organic, chemical-free products directly from our curated network of farmers.
            </p>
            <div className="flex gap-4 justify-center">
              <Button href="/shop" className="mr-3 bg-green-600 hover:bg-green-700">
                Shop Now
              </Button>
              <Button href="/farmer/register" intent="secondary">
                Join as Farmer
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Rythu Mowa?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🌾</div>
              <h3 className="text-xl font-bold mb-2">100% Natural</h3>
              <p className="text-gray-600">
                All products are grown without chemicals, pesticides, or synthetic fertilizers
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">👨‍🌾</div>
              <h3 className="text-xl font-bold mb-2">Direct from Farmers</h3>
              <p className="text-gray-600">
                Connect directly with verified natural farmers across Andhra Pradesh
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2">Global Reach</h3>
              <p className="text-gray-600">
                Making Andhra's finest natural products accessible worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-50 py-16">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">For Farmers</h2>
              <p className="text-gray-700 mb-6">
                Join our platform to reach customers worldwide. We handle the marketplace, 
                you focus on growing quality produce.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Easy onboarding and product listing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Fair pricing and direct payments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Marketing and logistics support</span>
                </li>
              </ul>
              <Button href="/farmer/register">Register as Farmer</Button>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">For Customers</h2>
              <p className="text-gray-700 mb-6">
                Discover authentic, chemical-free products from verified natural farmers. 
                Know exactly where your food comes from.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Curated selection of quality products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Transparent farmer information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Delivery across India and beyond</span>
                </li>
              </ul>
              <Button href="/shop">Start Shopping</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
