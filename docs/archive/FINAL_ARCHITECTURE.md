# 🌾 RythuMowa Marketplace - Final Architecture

## Domain Structure

```
rythumowas.shop (Main Domain)
├── shop.rythumowas.shop  → Janulu Portal (Customer Shop)
└── mowa.rythumowas.shop  → RythuMowa Portal (Farmer Dashboard)
```

---

## 1. Janulu Portal (జనులు పోర్టల్)
**Subdomain:** `shop.rythumowas.shop`  
**Local Port:** 3000  
**Folder:** `rythumowas.shop/`  
**Purpose:** Customer marketplace

### Features:
- ✅ Complete Bolt UI design
- ✅ Product browsing with categories
- ✅ Shopping cart
- ✅ Product search
- ✅ Year-end sale sections
- ✅ Promotional banners
- ✅ All shop-assets images

### Tech Stack:
- Next.js 14
- Prisma + PostgreSQL
- Clerk Authentication
- Tailwind CSS

---

## 2. RythuMowa Portal (రైతు మోవ పోర్టల్)
**Subdomain:** `mowa.rythumowas.shop`  
**Local Port:** 3001  
**Folder:** `farmer-portal/`  
**Purpose:** Farmer dashboard

### Features:
- ✅ Clerk authentication
- ✅ Product management
- ✅ Order tracking
- ✅ Earnings dashboard
- ✅ Profile settings
- ✅ Bolt UI assets (copied)

### Tech Stack:
- Next.js 14
- Clerk Authentication
- Medusa API integration
- Tailwind CSS

---

## 3. Medusa Backend
**Port:** 9000  
**Folder:** `medusa-backend/`  
**Purpose:** Commerce engine & API

### Features:
- Product catalog
- Order management
- Payment processing
- Farmer entities
- Commission tracking

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                  CUSTOMERS (జనులు)                      │
│                         ↓                               │
│            shop.rythumowas.shop                         │
│            Janulu Portal (Port 3000)                    │
│            rythumowas.shop/                             │
│            - Browse Products                            │
│            - Add to Cart                                │
│            - Checkout                                   │
│            - Bolt UI Design                             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓ API Calls
┌─────────────────────────────────────────────────────────┐
│              Medusa Backend (Port 9000)                 │
│              medusa-backend/                            │
│              - Products API                             │
│              - Orders API                               │
│              - Payments                                 │
│              - Farmer Management                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓ API Calls
┌─────────────────────────────────────────────────────────┐
│                  FARMERS (రైతులు)                      │
│                         ↓                               │
│            mowa.rythumowas.shop                         │
│            RythuMowa Portal (Port 3001)                 │
│            farmer-portal/                               │
│            - Manage Products                            │
│            - Track Orders                               │
│            - View Earnings                              │
│            - Bolt UI Assets                             │
└─────────────────────────────────────────────────────────┘
```

---

## Local Development URLs

| Portal | URL | Purpose |
|--------|-----|---------|
| Janulu | http://localhost:3000 | Customer shop |
| RythuMowa | http://localhost:3001 | Farmer dashboard |
| Medusa Backend | http://localhost:9000 | API |
| Medusa Admin | http://localhost:9000/app | Admin panel |

---

## Production Deployment

### DNS Configuration

```
rythumowas.shop          → Main landing page
shop.rythumowas.shop     → Janulu Portal (Vercel)
mowa.rythumowas.shop     → RythuMowa Portal (Vercel)
api.rythumowas.shop      → Medusa Backend (Railway/Heroku)
```

### Deployment Steps

1. **Janulu Portal (shop.rythumowas.shop)**
   ```bash
   cd rythumowas.shop
   vercel --prod
   # Set custom domain: shop.rythumowas.shop
   ```

2. **RythuMowa Portal (mowa.rythumowas.shop)**
   ```bash
   cd farmer-portal
   vercel --prod
   # Set custom domain: mowa.rythumowas.shop
   ```

3. **Medusa Backend (api.rythumowas.shop)**
   ```bash
   cd medusa-backend
   # Deploy to Railway or Heroku
   # Set custom domain: api.rythumowas.shop
   ```

---

## Shared Resources

### Authentication
- **Clerk** - Shared across both portals
- Same user database
- User roles differentiated by metadata

### Database
- **PostgreSQL** - Shared database
- Prisma schema in `rythumowas.shop`
- Medusa schema in `medusa-backend`

### Assets
- **Bolt UI Assets** - Copied to both portals
- Located in `public/shop-assets/`
- Product images, banners, icons

---

## User Flow

### Customer Journey (Janulu)
1. Visit `shop.rythumowas.shop`
2. Browse products
3. Add to cart
4. Sign in (optional)
5. Checkout
6. Track order

### Farmer Journey (RythuMowa)
1. Visit `mowa.rythumowas.shop`
2. Sign in with Clerk
3. View dashboard
4. Add/manage products
5. Track orders
6. View earnings

---

## Environment Variables

### Janulu Portal (.env)
```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=https://shop.rythumowas.shop
```

### RythuMowa Portal (.env.local)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.rythumowas.shop
```

### Medusa Backend (.env)
```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
STORE_CORS=https://shop.rythumowas.shop
ADMIN_CORS=https://mowa.rythumowas.shop
```

---

## Summary

✅ **Janulu Portal** - Customer shop at `shop.rythumowas.shop`  
✅ **RythuMowa Portal** - Farmer dashboard at `mowa.rythumowas.shop`  
✅ **Medusa Backend** - API at `api.rythumowas.shop`  
✅ **Shared Clerk Auth** - Single sign-on across portals  
✅ **Bolt UI Assets** - Consistent design across both portals  

**Status:** Architecture complete and ready for production! 🚀
