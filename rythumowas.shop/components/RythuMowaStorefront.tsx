'use client'

import { ChevronDownIcon, SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"

const navigationItems = [
  "Gardening",
  "Health & Wellness",
  "Organic food & Staples",
  "Bread, Dairy & Poultry",
  "Personal & Home care",
]

const categories = [
  { name: "Almonds", image: "/shop-assets/image-109.png" },
  { name: "Healthy\nMixes", image: "/shop-assets/image-110.png" },
  { name: "Baby Food\nMixes", image: "/shop-assets/image-112.png" },
  { name: "Savories", image: "/shop-assets/image-113.png" },
  { name: "Gift\nBoxes", image: "/shop-assets/image-111.png" },
]

const yearEndSaleProducts = [
  {
    image: "/shop-assets/rectangle-96.png",
    name: "RythuMowa's Naturally Grown Coconuts",
    rating: 4,
    price: "22.00",
    discount: "-27%",
    originalPrice: "30.00",
    badge: "Organically Grown",
  },
  {
    image: "/shop-assets/image-93.png",
    name: "RythuMowa's Free Range Desi Chicken (Curry Cut Naatu Koidi) with Skin",
    rating: 5,
    price: "340.00",
    discount: "-9%",
    from: true,
  },
  {
    image: "/shop-assets/image-94.png",
    name: "RythuMowa's Free Range Desi Chicken (Curry Cut Naatu Koidi) Skinless 500g / 1 kg",
    rating: 4,
    price: "360.00",
    discount: "-10%",
    from: true,
  },
  {
    image: "/shop-assets/rectangle-101.png",
    name: "Germinated Asiatic Lily Bulbs - Yellow 1 pc",
    rating: 5,
    price: "60.00",
    soldOut: true,
    badge: "1 Pc",
  },
]

const productsOnSale = [
  {
    image: "/shop-assets/rectangle-129.png",
    name: "Epsom Salt Fertilizer (Magnesium Sulphate) For Plants",
    rating: 4,
    price: "30.00",
    discount: "-54%",
    from: true,
  },
  {
    image: "/shop-assets/rectangle-128.png",
    name: "Enriched Bone Meal Fertilizer For Plants (Panchagavya and Humic Acid are added)",
    rating: 5,
    price: "35.00",
    discount: "-30%",
    from: true,
  },
  {
    image: "/shop-assets/rectangle-130.png",
    name: "Organic Vemicompost Manure For Plants (70 days Preparation)",
    rating: 4,
    price: "15.00",
    discount: "-25%",
    from: true,
  },
  {
    image: "/shop-assets/rectangle-134.png",
    name: "Ghanajeevamrutham Natural Cow-based Fertilizer For Plants (Nitrogen Supplement)",
    rating: 4,
    price: "25.00",
    discount: "-38%",
    from: true,
  },
  {
    image: "/shop-assets/rectangle-131.png",
    name: "Organic Neem Seed Powder Natural NPK Fertilizer For Plants",
    rating: 5,
    price: "40.00",
    discount: "-26%",
    from: true,
  },
  {
    image: "/shop-assets/rectangle-132.png",
    name: "Organic Mustard Cake Powder Natural Fertilizer For Plants",
    rating: 4,
    price: "45.00",
    discount: "-38%",
    from: true,
  },
]

const promotionalBanners = [
  {
    title: "Healthy Foods !",
    link: "Dive In",
    image: "/shop-assets/image-98.png",
    bgColor: "bg-[#cfdaf1]",
  },
  {
    title: "Personal Care Products",
    link: "Learn More",
    image: "/shop-assets/image-99.png",
    bgColor: "bg-[#fdcf99]",
  },
  {
    title: "Pickles & Vadiyalu",
    link: "Checkout our Specials !",
    image: "/shop-assets/image-100.png",
    bgColor: "bg-[#d7ffb6]",
  },
]

const additionalBanners = [
  {
    title: "Growbags & Planters",
    subtitle: "Diwali Offer (Upto 50%)",
    image: "/shop-assets/growbags.png",
    bgColor: "bg-[#ffecc4]",
  },
  {
    title: "Desi Seeds & Bulbs",
    subtitle: "Delivery Across India",
    image: "/shop-assets/seeds.png",
    bgColor: "bg-[#d7ffb6]",
  },
]

const latestProducts = [
  {
    image: "/shop-assets/epsom-salt.png",
    name: "Epsom Salt Fertilizer (Magnesium Sulphate) For Plants",
    rating: 5,
    price: "30.00",
    discount: "-54%",
    from: true,
  },
  {
    image: "/shop-assets/bone-meal.png",
    name: "Enriched Bone Meal Fertilizer For Plants (Panchagavya and Humic Acid are added)",
    rating: 5,
    price: "35.00",
    discount: "-30%",
    from: true,
  },
  {
    image: "/shop-assets/vermicompost.png",
    name: "Organic Vemicompost Manure For Plants (70 days Preparation)",
    rating: 4,
    price: "15.00",
    discount: "-25%",
    from: true,
  },
  {
    image: "/shop-assets/ghanajeevamrutham.png",
    name: "Ghanajeevamrutham Natural Cow-based Fertilizer For Plants (Nitrogen Supplement)",
    rating: 4,
    price: "28.00",
    discount: "-38%",
  },
  {
    image: "/shop-assets/neem-seed.png",
    name: "Organic Neem Seed Powder Natural NPK Fertilizer For Plants",
    rating: 5,
    price: "40.00",
    discount: "-28%",
  },
  {
    image: "/shop-assets/mustard-cake.png",
    name: "Organic Mustard Cake Powder Natural Fertilizer For Plants",
    rating: 4,
    price: "46.00",
    discount: "-18%",
  },
]

const bottomBanners = [
  {
    title: "Healthy Foods !",
    link: "Dive In",
    image: "/shop-assets/healthy-foods.png",
    bgColor: "bg-[#fff9e6]",
  },
  {
    title: "Personal Care Products",
    link: "Learn More",
    image: "/shop-assets/personal-care.png",
    bgColor: "bg-[#e6f3ff]",
  },
  {
    title: "Pickles & Vadiyalu",
    link: "Checkout our Specials !",
    image: "/shop-assets/pickles.png",
    bgColor: "bg-[#ffe6cc]",
  },
]

const paymentMethods = [
  "/shop-assets/image-103.png",
  "/shop-assets/image-104.png",
  "/shop-assets/image-106.png",
  "/shop-assets/image-105.png",
  "/shop-assets/image-107.png",
  "/shop-assets/image-108.png",
]

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <img
          key={star}
          className="w-6 h-6"
          alt="Star"
          src={star <= rating ? "/shop-assets/star-14.svg" : "/shop-assets/star-16.svg"}
        />
      ))}
    </div>
  )
}

const ProductCard = ({
  product,
}: {
  product: {
    image: string
    name: string
    rating: number
    price: string
    discount?: string
    originalPrice?: string
    from?: boolean
    soldOut?: boolean
    badge?: string
  }
}) => {
  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="relative">
          <img
            className="w-full h-[196px] rounded-[5.4px] object-cover"
            alt={product.name}
            src={product.image}
          />
          {product.soldOut && (
            <div className="absolute top-0 right-0 bg-[#ff2121] text-white text-[12.7px] font-semibold px-4 py-2">
              SOLD OUT
            </div>
          )}
          {product.badge && (
            <div className="absolute bottom-0 left-0 bg-[#9bd967] rounded-[5.31px] px-4 py-2 text-white font-semibold text-[23.4px]">
              {product.badge}
            </div>
          )}
        </div>
        <div className="mt-3">
          <StarRating rating={product.rating} />
        </div>
        <div className="mt-2 [font-family:'Montserrat',Helvetica] font-medium text-neutral-700 text-base leading-[22.5px] min-h-[67px]">
          {product.name}
        </div>
        <div className="mt-2 flex items-center gap-2">
          {product.from && (
            <span className="[font-family:'Montserrat',Helvetica] font-bold text-[#7fb750] text-[17px]">
              From
            </span>
          )}
          <span className="[font-family:'Montserrat',Helvetica] font-bold text-black text-[17px]">
            ₹ {product.price}
          </span>
          {product.discount && (
            <span className="[font-family:'Montserrat',Helvetica] font-semibold text-[#fc3333] text-[17px]">
              {product.discount}
            </span>
          )}
          {product.originalPrice && (
            <span className="[font-family:'Montserrat',Helvetica] font-bold text-black text-[14.9px] line-through opacity-40">
              ₹ {product.originalPrice}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function RythuMowaStorefront() {
  return (
    <div className="bg-[linear-gradient(181deg,rgba(249,244,236,1)_0%,rgba(255,255,255,1)_100%)] w-full min-h-screen">
      <header className="w-full">
        <div className="flex items-center justify-between px-14 pt-[84px]">
          <div className="flex items-center gap-4">
            <img
              className="w-[127px] h-[127px] object-cover"
              alt="RythuMowaa Logo"
              src="/shop-assets/download-removebg-preview--1--1-1.png"
            />
            <h1 className="[font-family:'Segoe_Print-Bold',Helvetica] font-bold text-[#1e363e] text-[32.8px] tracking-[0.82px]">
              RythuMowaa
            </h1>
          </div>

          <div className="relative w-[713px]">
            <div className="relative w-full h-[58px] rounded-[40px] border border-solid border-[#7f4000] shadow-[5px_5px_10px_#7f400099] bg-white">
              <div className="absolute top-[17px] left-[33px] [font-family:'Montserrat',Helvetica] font-medium text-[#1e363e] text-[18.3px] tracking-[0.46px] flex items-center gap-2">
                All Categories
                <ChevronDownIcon className="w-[9px] h-2" />
              </div>
              <div className="absolute top-0 left-[219px] w-px h-[58px] bg-gray-300" />
              <Input
                placeholder="Search products..."
                className="absolute top-[18px] left-60 border-0 bg-transparent [font-family:'Montserrat',Helvetica] font-medium text-[#1e363e] text-[18.3px] tracking-[0.46px] placeholder:opacity-30 focus-visible:ring-0"
              />
              <SearchIcon className="absolute top-[22.10%] right-[4.63%] w-[33px] h-[33px] text-[#7f4000]" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <img
              className="w-[58px] h-[58px]"
              alt="Cart"
              src="/shop-assets/group-182.png"
            />
            <div>
              <div className="[font-family:'Montserrat',Helvetica] font-medium text-[#1e363e] text-[20.1px] tracking-[0.50px]">
                My Cart
              </div>
              <div className="opacity-50 [font-family:'Montserrat',Helvetica] font-medium text-[#1e363e] text-[17.6px] tracking-[0.44px]">
                0 Items
              </div>
            </div>
          </div>
        </div>

        <nav className="flex items-center justify-center gap-[38px] mt-[52px]">
          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="[font-family:'Montserrat',Helvetica] font-medium text-[#1e363e] text-lg tracking-[1.71px] hover:bg-transparent"
            >
              {item}
            </Button>
          ))}
        </nav>
      </header>

      <section className="mt-[56px] mx-auto max-w-[1312px] px-4">
        <div className="bg-[#fff0d1] flex items-center overflow-hidden">
          <div className="ml-[58px] flex flex-col py-12">
            <h2 className="[font-family:'Montserrat',Helvetica] font-medium text-[#111111] text-[40.9px] tracking-[1.43px] leading-[60.3px]">
              Fruits & Vegetables
            </h2>
            <div className="[font-family:'Montserrat',Helvetica] font-semibold text-[#111111] text-[40.9px] tracking-[0.41px] leading-[60.3px]">
              Natural & Fresh
            </div>
            <p className="mt-4 [font-family:'Montserrat',Helvetica] font-medium text-[#0b0b0b] text-[16.1px] tracking-[0] leading-[23.8px]">
              Right From Our Farm to Your Kitchen!
            </p>
            <Button className="mt-4 w-[137px] h-11 bg-[#378365] rounded-[48.44px] [font-family:'Montserrat',Helvetica] font-bold text-[#e7e7e7] text-sm tracking-[0.14px] hover:bg-[#2d6b52]">
              VIEW MORE
            </Button>
          </div>
          <img
            className="ml-auto w-[755px] h-auto object-contain"
            alt="Fresh Produce"
            src="/shop-assets/rectangle-89.png"
          />
        </div>
      </section>

      <section className="mt-16 mx-auto max-w-[1240px] px-4">
        <h2 className="text-center [font-family:'Montserrat',Helvetica] font-semibold text-black text-3xl tracking-[0.90px] leading-[44.2px] mb-8">
          CATEGORIES
        </h2>
        <div className="flex justify-between items-start gap-[85.6px]">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                className="w-[200px] h-auto object-contain"
                alt={category.name}
                src={category.image}
              />
              <div className="mt-4 [font-family:'Montserrat',Helvetica] font-medium text-black text-[25.4px] text-center tracking-[0.38px] leading-[37.4px] whitespace-pre-line">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 flex justify-center">
        <Button className="w-[362px] h-[63px] bg-[#378365] rounded-[5px] [font-family:'Montserrat',Helvetica] font-semibold text-[#f2f2f2] text-[21.8px] hover:bg-[#2d6b52]">
          SHOP NOW
        </Button>
      </section>

      <section className="mt-16 mx-auto max-w-[1307px] px-4">
        <div className="w-full h-[97px] bg-[#fff0d1] shadow-[4px_4px_4px_#dea40180] flex items-center justify-between px-8">
          <h2 className="[font-family:'Montserrat',Helvetica] font-semibold text-black text-3xl tracking-[0.90px] leading-[44.2px]">
            YEAR END SALE
          </h2>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              className="w-[50px] h-[50px] bg-[#ffa96e] rounded-[24.97px] border-0"
            >
              <img
                className="w-2.5 h-[18px]"
                alt="Previous"
                src="/shop-assets/arrow-5.svg"
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-[50px] h-[50px] bg-[#ffa96e] rounded-[24.97px] border-0"
            >
              <img className="w-2.5 h-[18px]" alt="Next" src="/shop-assets/arrow-4.svg" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8 mt-8">
          {yearEndSaleProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-16 mx-auto max-w-[1307px] px-4">
        <div className="w-full h-[97px] bg-[#fff0d1] shadow-[4px_4px_4px_#dea40180] flex items-center px-8">
          <h2 className="[font-family:'Montserrat',Helvetica] font-semibold text-black text-3xl tracking-[0.90px] leading-[44.2px]">
            PRODUCTS ON SALE
          </h2>
        </div>

        <div className="grid grid-cols-6 gap-6 mt-8">
          {productsOnSale.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-16 mx-auto max-w-[1309px] px-4 flex gap-6">
        {promotionalBanners.map((banner, index) => (
          <div
            key={index}
            className={`w-[426px] h-[262px] ${banner.bgColor} rounded-[5.34px] relative`}
          >
            <div className="absolute top-[77px] left-8">
              <h3 className="[font-family:'Montserrat',Helvetica] font-semibold text-black text-[31px] tracking-[0.93px] leading-[31px] max-w-[237px]">
                {banner.title}
              </h3>
              <p className="mt-4 [font-family:'Barlow',Helvetica] font-medium text-[#111111] text-[19px] tracking-[0.76px] leading-[22.8px] underline">
                {banner.link}
              </p>
            </div>
            <img
              className="absolute bottom-0 right-8 h-[190px] object-contain"
              alt={banner.title}
              src={banner.image}
            />
          </div>
        ))}
      </section>

      <footer className="mt-16 w-full">
        <div className="w-full h-[158px] bg-[#378365] flex items-center justify-center">
          <div className="text-center">
            <h3 className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-[22px] mb-4">
              Accepted Payment Methods
            </h3>
            <div className="flex gap-4 justify-center">
              {paymentMethods.map((method, index) => (
                <img
                  key={index}
                  className="h-[41px] object-contain"
                  alt="Payment Method"
                  src={method}
                />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
