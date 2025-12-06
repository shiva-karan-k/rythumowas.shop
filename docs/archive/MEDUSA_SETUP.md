# RythuMowa Marketplace - Medusa Architecture

## Project Structure

```
rythumowa-marketplace/
├── medusa-backend/          # Medusa commerce engine
├── customer-storefront/     # Next.js customer-facing shop
├── farmer-portal/           # Next.js farmer dashboard
└── shared/                  # Shared types, utils
```

## Tech Stack

### Backend (Medusa)
- **Medusa v2** - Commerce engine
- **PostgreSQL** - Database
- **Redis** - Caching & job queue
- **Medusa Admin** - Platform admin panel

### Frontends
- **Next.js 14+** - Both storefronts
- **Clerk** - Authentication
- **Resend** - Email notifications
- **Tailwind CSS** - Styling

### Payments
- **Razorpay** (India) or **Stripe** (Global)

## Medusa Customizations Needed

### 1. Multi-Vendor Extension
Add farmer/vendor concept to Medusa:

```typescript
// Custom entities to add:
- Farmer (vendor profile)
- FarmerProduct (links products to farmers)
- FarmerPayout (commission tracking)
- FarmerOrder (order attribution)
```

### 2. B2B Pricing
- Customer groups for B2B buyers
- Bulk pricing tiers
- Wholesale price lists

### 3. Custom Workflows
- Farmer onboarding & verification
- Product approval process
- Payout calculations
- Commission management

## Setup Steps

### 1. Install Medusa Backend
```bash
npx create-medusa-app@latest medusa-backend
cd medusa-backend
```

Options:
- PostgreSQL database
- Stripe/Razorpay plugin
- Admin dashboard

### 2. Install Next.js Storefront
```bash
npx create-next-app@latest customer-storefront --typescript --tailwind --app
```

Use Medusa Next.js starter:
```bash
git clone https://github.com/medusajs/nextjs-starter-medusa customer-storefront
cd customer-storefront
npm install
```

### 3. Create Farmer Portal
```bash
npx create-next-app@latest farmer-portal --typescript --tailwind --app
```

## Medusa Backend Extensions

### Database Schema Extensions

```typescript
// src/models/farmer.ts
import { BaseEntity } from "@medusajs/medusa"
import { Column, Entity, OneToMany } from "typeorm"

@Entity()
export class Farmer extends BaseEntity {
  @Column()
  user_id: string // Link to Medusa User or Clerk

  @Column()
  business_name: string

  @Column()
  phone: string

  @Column()
  location: string

  @Column()
  farm_size: string

  @Column({ default: 'pending' })
  verification_status: string

  @Column({ type: 'decimal', default: 0 })
  commission_rate: number

  @Column({ type: 'decimal', default: 0 })
  total_earnings: number

  @OneToMany(() => Product, product => product.farmer)
  products: Product[]
}
```

### API Routes to Add

```typescript
// Farmer Management
POST   /admin/farmers              # Create farmer
GET    /admin/farmers              # List farmers
GET    /admin/farmers/:id          # Get farmer
PUT    /admin/farmers/:id          # Update farmer
DELETE /admin/farmers/:id          # Delete farmer

// Farmer Portal (authenticated)
GET    /store/farmer/profile       # Get own profile
PUT    /store/farmer/profile       # Update profile
GET    /store/farmer/products      # List own products
POST   /store/farmer/products      # Create product
GET    /store/farmer/orders        # List orders
GET    /store/farmer/payouts       # Payout history

// B2B Pricing
GET    /store/products/:id/b2b-price
POST   /admin/products/:id/b2b-pricing
```

## Integration Points

### Customer Storefront → Medusa
- Product catalog via Medusa API
- Cart & checkout via Medusa SDK
- Order tracking
- Customer account management

### Farmer Portal → Medusa
- Product CRUD via custom API
- Order notifications
- Payout dashboard
- Analytics

### Resend Email Events
- Order confirmation (customer)
- Order notification (farmer)
- Payout notifications
- Farmer verification emails

## Environment Variables

### Medusa Backend (.env)
```
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=...
COOKIE_SECRET=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
RESEND_API_KEY=...
CLERK_SECRET_KEY=...
```

### Customer Storefront (.env.local)
```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

### Farmer Portal (.env.local)
```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

## Development Workflow

1. Start Medusa backend: `cd medusa-backend && npm run dev` (port 9000)
2. Start customer storefront: `cd customer-storefront && npm run dev` (port 3000)
3. Start farmer portal: `cd farmer-portal && npm run dev` (port 3001)
4. Access Medusa admin: http://localhost:9000/app

## Next Steps

1. ✅ Set up Medusa backend with PostgreSQL
2. ✅ Clone & configure Next.js customer storefront
3. ✅ Create farmer portal Next.js app
4. Add Farmer entity & migrations to Medusa
5. Build farmer API endpoints
6. Integrate Clerk auth
7. Set up Resend email templates
8. Configure payment provider (Razorpay/Stripe)
9. Build farmer product management UI
10. Implement B2B pricing logic

## Migration from Current Build

From `rythumowas.shop/prisma/schema.prisma`, we'll migrate:
- Farmer model → Medusa Farmer entity
- Product → Medusa Product + FarmerProduct link
- Order → Medusa Order + farmer attribution
- Keep Clerk integration for auth
