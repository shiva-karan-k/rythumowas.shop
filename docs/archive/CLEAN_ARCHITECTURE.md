# 🌾 RythuMowa - Clean Architecture

## Three-Tier System

```
rythumowas.shop (Customer Shop)
         ↓
   Medusa Backend (API)
         ↓
rythumowa.com (Farmer Portal)
```

---

## 1. Customer Shop - rythumowas.shop
**Folder:** `rythumowas.shop/`  
**Port:** 3000  
**Domain:** rythumowas.shop

### Current Status:
- ✅ Full Bolt UI design
- ✅ Prisma + PostgreSQL
- ✅ Clerk authentication
- ✅ Product pages, cart, checkout

### Next: Connect to Medusa
- Add Medusa SDK
- Replace Prisma queries with Medusa API calls
- Keep existing UI

---

## 2. Medusa Backend
**Folder:** `medusa-backend/`  
**Port:** 9000  
**Domain:** api.rythumowas.shop (production)

### Features:
- ✅ Product catalog API
- ✅ Order management
- ✅ Payment processing
- ✅ Farmer entities
- ✅ Commission tracking
- ✅ Admin panel (port 9000/app)

### Database:
- PostgreSQL (shared with rythumowas.shop or separate)
- Redis for caching

---

## 3. Farmer Portal - rythumowa.com
**Folder:** `farmer-portal/`  
**Port:** 3001  
**Domain:** rythumowa.com

### Features:
- ✅ Clerk authentication
- ✅ Product management
- ✅ Order tracking
- ✅ Earnings dashboard
- ✅ Connects to Medusa API

---

## Development Setup

### Start All Services:

**Terminal 1 - Customer Shop:**
```bash
cd rythumowas.shop
pnpm dev
# Runs on http://localhost:3000
```

**Terminal 2 - Medusa Backend:**
```bash
cd medusa-backend
npm install
npm run migrate
npm run dev
# Runs on http://localhost:9000
# Admin: http://localhost:9000/app
```

**Terminal 3 - Farmer Portal:**
```bash
cd farmer-portal
npm run dev
# Runs on http://localhost:3001
```

---

## Production Deployment

### DNS Setup:
```
rythumowas.shop       → Customer shop (Vercel)
api.rythumowas.shop   → Medusa backend (Railway/Heroku)
rythumowa.com         → Farmer portal (Vercel)
```

### Environment Variables:

**rythumowas.shop (.env):**
```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_MEDUSA_API_URL=https://api.rythumowas.shop
```

**medusa-backend (.env):**
```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=...
COOKIE_SECRET=...
STORE_CORS=https://rythumowas.shop
ADMIN_CORS=https://rythumowa.com
```

**farmer-portal (.env.local):**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_MEDUSA_API_URL=https://api.rythumowas.shop
```

---

## Data Flow

### Customer Purchase Flow:
1. Customer browses rythumowas.shop
2. Adds products to cart
3. Checks out
4. Order sent to Medusa API
5. Payment processed
6. Order assigned to farmer
7. Farmer notified at rythumowa.com

### Farmer Product Flow:
1. Farmer logs into rythumowa.com
2. Creates/updates products
3. Sent to Medusa API
4. Products appear on rythumowas.shop
5. Customers can purchase

---

## Integration Steps

### Phase 1: Setup Medusa Backend ✅
- [x] Install Medusa
- [x] Create Farmer entities
- [x] Setup database
- [x] Create API endpoints

### Phase 2: Connect Customer Shop
- [ ] Install @medusajs/medusa-js in rythumowas.shop
- [ ] Replace Prisma product queries with Medusa API
- [ ] Connect cart to Medusa
- [ ] Integrate checkout

### Phase 3: Connect Farmer Portal
- [ ] Build product management UI
- [ ] Connect to Medusa API
- [ ] Add order tracking
- [ ] Build earnings dashboard

---

## Folder Structure

```
rythumowas_shop/
├── rythumowas.shop/        # Customer shop (keep)
├── medusa-backend/         # API backend (keep)
├── farmer-portal/          # Farmer portal (keep)
├── customer-storefront/    # DELETE (not needed)
└── nextjs-store/           # DELETE (not needed)
```

---

## Quick Commands

```bash
# Install Medusa backend
cd medusa-backend
npm install

# Setup database
createdb medusa_rythumowa

# Run migrations
npm run migrate

# Start backend
npm run dev

# Access admin panel
open http://localhost:9000/app
```

---

## Status: Ready to Integrate! 🚀

All three components are built and ready. Next step is connecting them together.
