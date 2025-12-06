# RythuMowa Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USERS & INTERFACES                          │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│    CUSTOMERS     │  │     FARMERS      │  │     ADMINS       │
│   (End Users)    │  │   (Vendors)      │  │  (Platform)      │
└────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
         │                     │                      │
         ↓                     ↓                      ↓
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   Storefront     │  │  Farmer Portal   │  │  Admin Panel     │
│  localhost:3000  │  │  localhost:3001  │  │  localhost:9000  │
│                  │  │                  │  │      /app        │
│  - Browse        │  │  - Dashboard     │  │                  │
│  - Search        │  │  - Products      │  │  - Farmers       │
│  - Cart          │  │  - Orders        │  │  - Products      │
│  - Checkout      │  │  - Earnings      │  │  - Orders        │
│                  │  │  - Profile       │  │  - Settings      │
│  Next.js 14      │  │  Next.js 14      │  │  Medusa Admin    │
│  Bolt UI         │  │  Clerk Auth      │  │                  │
└────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
         │                     │                      │
         │                     │                      │
         └─────────────────────┼──────────────────────┘
                               │
                               ↓
         ┌─────────────────────────────────────────────┐
         │         MEDUSA BACKEND API                  │
         │         localhost:9000                      │
         │                                             │
         │  ┌────────────────────────────────────┐    │
         │  │     Core Medusa Services           │    │
         │  │  ┌──────────────────────────────┐  │    │
         │  │  │  Product Service             │  │    │
         │  │  │  Cart Service                │  │    │
         │  │  │  Order Service               │  │    │
         │  │  │  Payment Service             │  │    │
         │  │  │  Customer Service            │  │    │
         │  │  │  Fulfillment Service         │  │    │
         │  │  └──────────────────────────────┘  │    │
         │  └────────────────────────────────────┘    │
         │                                             │
         │  ┌────────────────────────────────────┐    │
         │  │     Custom Extensions              │    │
         │  │  ┌──────────────────────────────┐  │    │
         │  │  │  Farmer Service              │  │    │
         │  │  │  FarmerProduct Service       │  │    │
         │  │  │  Commission Calculator       │  │    │
         │  │  │  Payout Service              │  │    │
         │  │  └──────────────────────────────┘  │    │
         │  └────────────────────────────────────┘    │
         │                                             │
         │  ┌────────────────────────────────────┐    │
         │  │     API Routes                     │    │
         │  │  /store/*    - Store API           │    │
         │  │  /admin/*    - Admin API           │    │
         │  │  /store/farmer/* - Farmer API      │    │
         │  └────────────────────────────────────┘    │
         └──────────────────┬──────────────────────────┘
                            │
                            ↓
         ┌─────────────────────────────────────────────┐
         │         DATA LAYER                          │
         │                                             │
         │  ┌──────────────┐    ┌──────────────┐      │
         │  │  PostgreSQL  │    │    Redis     │      │
         │  │              │    │              │      │
         │  │  Core Tables │    │  Cache       │      │
         │  │  - product   │    │  Sessions    │      │
         │  │  - order     │    │  Jobs        │      │
         │  │  - cart      │    │              │      │
         │  │  - customer  │    └──────────────┘      │
         │  │              │                           │
         │  │  Custom      │                           │
         │  │  - farmer    │                           │
         │  │  - farmer_   │                           │
         │  │    product   │                           │
         │  └──────────────┘                           │
         └─────────────────────────────────────────────┘
                            │
                            ↓
         ┌─────────────────────────────────────────────┐
         │      EXTERNAL SERVICES                      │
         │                                             │
         │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
         │  │ Razorpay │  │  Resend  │  │  Clerk   │  │
         │  │ Payments │  │  Emails  │  │   Auth   │  │
         │  └──────────┘  └──────────┘  └──────────┘  │
         └─────────────────────────────────────────────┘
```

## Data Flow Diagrams

### Customer Purchase Flow

```
Customer → Storefront → Medusa API → Database
   │           │            │            │
   │           │            │            ↓
   │           │            │       Save Order
   │           │            │            │
   │           │            ↓            │
   │           │       Process Payment   │
   │           │            │            │
   │           │            ↓            │
   │           │       Razorpay/Stripe   │
   │           │            │            │
   │           ↓            ↓            ↓
   │      Show Success  Send Email   Update Stock
   │           │            │            │
   └───────────┴────────────┴────────────┘
                     │
                     ↓
              Notify Farmer
```

### Farmer Product Management Flow

```
Farmer → Farmer Portal → Medusa API → Database
   │          │              │            │
   │          │              │            ↓
   │          │              │      Create Product
   │          │              │            │
   │          │              │            ↓
   │          │              │      Link to Farmer
   │          │              │            │
   │          │              ↓            │
   │          │         Return Product    │
   │          │              │            │
   │          ↓              ↓            ↓
   │     Show Success   Update UI    Sync to Store
   │          │              │            │
   └──────────┴──────────────┴────────────┘
```

### Admin Farmer Verification Flow

```
Admin → Admin Panel → Medusa API → Database
  │         │            │            │
  │         │            │            ↓
  │         │            │      Update Status
  │         │            │            │
  │         │            ↓            │
  │         │       Send Email        │
  │         │            │            │
  │         ↓            ↓            ↓
  │    Show Success  Notify Farmer  Enable Products
  │         │            │            │
  └─────────┴────────────┴────────────┘
```

## Database Schema

```
┌─────────────────┐
│    customer     │
│─────────────────│
│ id              │
│ email           │
│ first_name      │
│ last_name       │
└────────┬────────┘
         │
         │ 1:N
         ↓
┌─────────────────┐      ┌─────────────────┐
│     order       │  N:1 │    product      │
│─────────────────│──────│─────────────────│
│ id              │      │ id              │
│ customer_id     │      │ title           │
│ status          │      │ description     │
│ total           │      │ thumbnail       │
│ payment_status  │      │ metadata        │
└─────────────────┘      └────────┬────────┘
                                  │
                                  │ N:1
                                  ↓
                         ┌─────────────────┐
                         │ farmer_product  │
                         │─────────────────│
                         │ id              │
                         │ product_id      │
                         │ farmer_id       │
                         │ farmer_price    │
                         └────────┬────────┘
                                  │
                                  │ N:1
                                  ↓
                         ┌─────────────────┐
                         │     farmer      │
                         │─────────────────│
                         │ id              │
                         │ business_name   │
                         │ contact_name    │
                         │ phone           │
                         │ email           │
                         │ location        │
                         │ verification_   │
                         │   status        │
                         │ commission_rate │
                         │ total_earnings  │
                         └─────────────────┘
```

## Component Architecture

### Customer Storefront

```
app/
├── layout.tsx (Root)
│   └── Providers (React Query)
│       └── page.tsx (Home)
│           ├── Header
│           │   ├── Logo
│           │   ├── SearchBar
│           │   └── CartIcon
│           ├── HeroBanner
│           ├── Categories
│           ├── ProductGrid
│           │   └── ProductCard[]
│           └── Footer
│
├── shop/
│   └── page.tsx
│       └── ProductList
│           └── ProductCard[]
│
├── products/[id]/
│   └── page.tsx
│       └── ProductDetail
│
└── cart/
    └── page.tsx
        └── CartView
```

### Farmer Portal

```
app/
├── layout.tsx (Root + Clerk)
│   └── page.tsx (Landing)
│       ├── SignedOut → Marketing
│       └── SignedIn → Dashboard Links
│
├── dashboard/
│   └── page.tsx
│       ├── StatsCards
│       ├── RecentOrders
│       └── QuickActions
│
├── products/
│   ├── page.tsx (List)
│   ├── new/page.tsx (Create)
│   └── [id]/page.tsx (Edit)
│
├── orders/
│   └── page.tsx
│       └── OrderList
│
└── profile/
    └── page.tsx
        └── ProfileForm
```

## Security Architecture

```
┌─────────────────────────────────────────────┐
│           Security Layers                   │
├─────────────────────────────────────────────┤
│                                             │
│  1. Authentication                          │
│     - Clerk (Farmer Portal)                 │
│     - Medusa Auth (Admin)                   │
│     - JWT Tokens                            │
│                                             │
│  2. Authorization                           │
│     - Role-based access                     │
│     - Farmer can only edit own products     │
│     - Admin has full access                 │
│                                             │
│  3. API Security                            │
│     - CORS configuration                    │
│     - Rate limiting                         │
│     - Input validation                      │
│                                             │
│  4. Data Security                           │
│     - Encrypted passwords                   │
│     - Secure payment tokens                 │
│     - HTTPS in production                   │
│                                             │
└─────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────┐
│              Production Setup               │
├─────────────────────────────────────────────┤
│                                             │
│  Vercel (Storefronts)                       │
│  ├── customer-storefront.vercel.app         │
│  └── farmer-portal.vercel.app               │
│                                             │
│  Railway/Heroku (Backend)                   │
│  └── api.rythumowa.com                      │
│      ├── Medusa Backend                     │
│      ├── PostgreSQL                         │
│      └── Redis                              │
│                                             │
│  CDN (Images)                               │
│  └── Cloudinary / S3                        │
│                                             │
│  External Services                          │
│  ├── Clerk (Auth)                           │
│  ├── Razorpay (Payments)                    │
│  └── Resend (Emails)                        │
│                                             │
└─────────────────────────────────────────────┘
```

---

This architecture provides:
- ✅ Scalability
- ✅ Separation of concerns
- ✅ Security
- ✅ Maintainability
- ✅ Extensibility
