# 🌾 RythuMowa Marketplace - Complete Setup Guide

## What You Have Now

✅ **Customer Storefront** - Next.js with your Bolt UI design  
✅ **Medusa Backend** - Commerce engine with Farmer extensions  
✅ **Farmer Portal** - Dashboard for farmers to manage products  

## Project Structure

```
rythumowa-marketplace/
├── customer-storefront/     # Port 3000 - Customer shop (Bolt UI)
├── medusa-backend/          # Port 9000 - Commerce API + Admin
└── farmer-portal/           # Port 3001 - Farmer dashboard
```

## Prerequisites

Install these first:

1. **Node.js 18+** - https://nodejs.org
2. **PostgreSQL** - https://www.postgresql.org/download/
3. **Redis** - https://redis.io/download

### Quick Install (Windows)

```powershell
# Using Chocolatey
choco install nodejs postgresql redis-64

# Or using Scoop
scoop install nodejs postgresql redis
```

## Step-by-Step Setup

### 1. Setup PostgreSQL Database

```powershell
# Start PostgreSQL service
net start postgresql-x64-14

# Create database
psql -U postgres
CREATE DATABASE medusa_rythumowa;
\q
```

### 2. Setup Redis

```powershell
# Start Redis
redis-server
```

### 3. Setup Medusa Backend

```powershell
cd medusa-backend

# Copy environment file
copy .env.example .env

# Edit .env and update:
# DATABASE_URL=postgres://postgres:password@localhost/medusa_rythumowa
# JWT_SECRET=your-secret-here
# COOKIE_SECRET=your-secret-here

# Install dependencies
npm install

# Run migrations
npm run migrate

# Seed database (optional - adds test data)
npm run seed

# Start backend
npm run dev
```

Backend will run on: **http://localhost:9000**  
Admin panel: **http://localhost:9000/app**

Default admin login:
- Email: `admin@medusa-test.com`
- Password: `supersecret`

### 4. Setup Customer Storefront

```powershell
cd customer-storefront

# Install dependencies
npm install

# Copy environment file
copy .env.local.example .env.local

# Edit .env.local:
# NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000

# Start storefront
npm run dev
```

Storefront will run on: **http://localhost:3000**

### 5. Setup Farmer Portal

```powershell
cd farmer-portal

# Install dependencies
npm install

# Copy environment file
copy .env.local.example .env.local

# Get Clerk keys from https://clerk.com
# Edit .env.local and add your Clerk keys

# Start farmer portal
npm run dev
```

Farmer portal will run on: **http://localhost:3001**

## Testing the Setup

### 1. Add Products in Medusa Admin

1. Go to http://localhost:9000/app
2. Login with admin credentials
3. Navigate to Products
4. Click "New Product"
5. Add product details and images
6. Publish the product

### 2. View Products in Storefront

1. Go to http://localhost:3000
2. Products should appear with your Bolt UI design
3. Test search, cart, and navigation

### 3. Test Farmer Portal

1. Go to http://localhost:3001
2. Sign in with Clerk
3. View dashboard
4. (Products management coming soon)

## Next Steps

### Immediate Tasks

1. **Add Farmer to Products**
   - In Medusa admin, add farmer metadata to products
   - Link products to farmers via FarmerProduct table

2. **Complete Farmer Portal**
   - Product management UI
   - Order tracking
   - Earnings dashboard

3. **Add Checkout Flow**
   - Cart functionality in storefront
   - Checkout process
   - Payment integration (Razorpay/Stripe)

4. **Email Notifications**
   - Setup Resend account
   - Order confirmation emails
   - Farmer notification emails

### Future Enhancements

- [ ] B2B pricing tiers
- [ ] Bulk order discounts
- [ ] Farmer verification workflow
- [ ] Payout management
- [ ] Analytics dashboard
- [ ] Mobile apps

## Troubleshooting

### PostgreSQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Fix:** Make sure PostgreSQL service is running
```powershell
net start postgresql-x64-14
```

### Redis Connection Error
```
Error: Redis connection to localhost:6379 failed
```
**Fix:** Start Redis server
```powershell
redis-server
```

### Port Already in Use
```
Error: Port 3000 is already in use
```
**Fix:** Kill the process or use different port
```powershell
# Find process
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

## Development Workflow

### Daily Development

```powershell
# Terminal 1 - Backend
cd medusa-backend
npm run dev

# Terminal 2 - Storefront
cd customer-storefront
npm run dev

# Terminal 3 - Farmer Portal
cd farmer-portal
npm run dev
```

### Adding New Features

1. Backend changes → `medusa-backend/src/`
2. Storefront changes → `customer-storefront/`
3. Farmer portal changes → `farmer-portal/`

## Environment Variables Summary

### Medusa Backend (.env)
```
DATABASE_URL=postgres://postgres:password@localhost/medusa_rythumowa
REDIS_URL=redis://localhost:6379
JWT_SECRET=something-secret
COOKIE_SECRET=something-secret
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000
```

### Customer Storefront (.env.local)
```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

### Farmer Portal (.env.local)
```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Support & Resources

- Medusa Docs: https://docs.medusajs.com
- Next.js Docs: https://nextjs.org/docs
- Clerk Docs: https://clerk.com/docs
- Your Design System: See `STOREFRONT_DESIGN.md`

## Quick Commands

```powershell
# Install all dependencies
cd medusa-backend && npm install
cd ../customer-storefront && npm install
cd ../farmer-portal && npm install

# Start all services (use 3 terminals)
cd medusa-backend && npm run dev
cd customer-storefront && npm run dev
cd farmer-portal && npm run dev

# Build for production
cd medusa-backend && npm run build
cd customer-storefront && npm run build
cd farmer-portal && npm run build
```

---

**Ready to start?** Follow the steps above and you'll have the full marketplace running! 🚀
