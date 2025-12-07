# Rythu Mowa - Route Structure

## 🎯 Two Storefronts Integrated

### 1. **Consumer Storefront** (Bolt Design) - `/shop`
Beautiful, marketing-focused storefront with the original Bolt design.

**Route**: `http://localhost:3000/shop`

**Features**:
- Hero banner with fresh produce
- Category browsing (Almonds, Healthy Mixes, Baby Food, etc.)
- Year-end sale section
- Products on sale grid
- Promotional banners
- Payment methods footer
- Shopping cart integration

**Component**: `components/RythuMowaStorefront.tsx`

**Note**: This page uses static product data and images from `/public/shop-assets/`

---

### 2. **B2B Storefront** (Database-Driven) - `/`
Professional, database-driven storefront for business buyers.

**Route**: `http://localhost:3000/` (root)

**Features**:
- Real-time product listing from Neon database
- Farmer information on each product
- Product detail pages with full farmer contact
- Shopping cart with localStorage
- Checkout flow
- Stock management

**Component**: `app/(storefront)/page.tsx`
**Product Card**: `components/ProductCard.tsx`

---

## 📄 All Routes

### Public Routes
- `/` - B2B Storefront (database products)
- `/shop` - Consumer Storefront (Bolt design)
- `/cart` - Shopping cart
- `/products/[id]` - Product detail page
- `/handler/sign-in` - Stack Auth authentication
- `/handler/sign-up` - Stack Auth registration

### Farmer Routes (Protected)
- `/farmer/register` - Farmer registration form
- `/farmer/dashboard` - Farmer dashboard
- `/farmer/products` - Manage products (TODO)

### Admin Routes (Protected)
- `/admin` - Admin dashboard
- `/admin/farmers` - Farmer verification
- `/admin/products` - Product moderation (TODO)
- `/admin/orders` - Order management (TODO)

### API Routes
- `/api/webhooks/stack` - Stack Auth user sync (if configured)
- `/api/auth/register` - User registration
- `/api/farmer/profile` - Farmer profile CRUD
- `/api/products/[id]` - Get product details

---

## 🔄 Navigation Flow

### Consumer Journey (B2C)
1. Land on `/shop` (Bolt storefront)
2. Browse categories and products
3. Click product → `/products/[id]`
4. Add to cart → `/cart`
5. Checkout (TODO: Payment integration)

### Business Buyer Journey (B2B)
1. Land on `/` (database storefront)
2. Browse real farmer products
3. Click product → `/products/[id]`
4. Add to cart → `/cart`
5. Bulk order checkout

### Farmer Journey
1. Sign up → `/sign-up`
2. Register as farmer → `/farmer/register`
3. Access dashboard → `/farmer/dashboard`
4. Add products (TODO)
5. Manage inventory (TODO)

### Admin Journey
1. Sign in with admin role
2. Access `/admin`
3. Verify farmers → `/admin/farmers`
4. Moderate products
5. Manage orders

---

## 🎨 Design Differences

### `/shop` (Consumer)
- Warm, earthy colors (#fff0d1, #378365)
- Large hero images
- Marketing copy
- Category-focused
- Promotional banners
- Static content

### `/` (B2B)
- Clean, professional
- Grid layout
- Farmer details prominent
- Real-time inventory
- Contact information
- Database-driven

---

## 🚀 Next Steps

1. **Add shop assets** to `/public/shop-assets/` for Bolt storefront
2. **Seed database** with real products for B2B storefront
3. **Product management** for farmers
4. **Payment integration** (Razorpay)
5. **Order management** system
6. **Search & filters** on both storefronts
7. **Reviews & ratings**

---

## 📝 Notes

- Both storefronts share the same cart (`/cart`)
- Both use the same product detail page (`/products/[id]`)
- Middleware protects farmer and admin routes
- Clerk handles all authentication
- Prisma + Neon for database
- Next.js 15 App Router

