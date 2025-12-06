# Architecture Overview

## System Design

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Customer Web   │────▶│  Medusa Backend  │◀────│  Farmer Portal  │
│ (rythumowas.shop)│     │   (Port 9000)    │     │   (Port 3001)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │                         │
         └───────────────────────┴─────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │   PostgreSQL   │
                    └────────────────┘
```

## Projects

### rythumowas.shop (Main Marketplace)
- Customer storefront
- Product browsing and cart
- Admin panel for farmer management
- Clerk authentication

### farmer-portal
- Farmer registration
- Product management
- Dashboard with analytics
- Separate Clerk instance

### medusa-backend
- REST API
- Product catalog
- Order management
- Farmer data storage

### packages/ui
- Shared component library
- Button, Card, Input, Badge
- Consistent styling across apps

## Data Flow

1. **Farmer Registration**
   - Farmer signs up via farmer-portal
   - Clerk creates user account
   - Profile saved to Medusa backend
   - Admin approves via rythumowas.shop

2. **Product Creation**
   - Farmer adds product via farmer-portal
   - Saved to Medusa backend
   - Appears in rythumowas.shop storefront

3. **Customer Purchase**
   - Customer browses rythumowas.shop
   - Adds to cart
   - Checkout via Medusa
   - Order assigned to farmer

## Authentication

- **Clerk** handles all auth
- Separate instances for customer/farmer portals
- JWT tokens for API requests
- Webhook sync to backend

## Database Schema

**Farmer Table**
- id, userId (Clerk), farmName, location
- verified (admin approval)
- products (relation)

**Product Table**
- id, farmerId, name, price, stock
- category, images
- timestamps

## Deployment

- Frontend apps: Vercel
- Backend: Railway/Render
- Database: Supabase/Neon
- File storage: Cloudinary
