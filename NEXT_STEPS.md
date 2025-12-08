# 🎯 Next Steps - Action Plan

## ✅ Completed

1. ✅ Removed ALL Clerk references
2. ✅ Fixed environment files
3. ✅ Updated .gitignore
4. ✅ Deleted 14 temporary documentation files
5. ✅ Fixed route structure (removed storefront route group)
6. ✅ Fixed monorepo configuration
7. ✅ Created Medusa-Stack Auth integration layer
8. ✅ Updated documentation

---

## 🚧 Remaining Tasks

### 1. Merge Farmer Portal into Main App

The `farmer-portal` folder still exists and needs to be merged into `rythumowas.shop`.

**Option A: Manual Merge** (Recommended for control)
```bash
# Copy farmer dashboard if not already in main app
# Check what's in farmer-portal that's not in rythumowas.shop/app/farmer/

# Then delete farmer-portal
rm -rf farmer-portal
```

**Option B: Let me do it**
I can merge the farmer-portal pages into rythumowas.shop automatically.

**Current Status**:
- `rythumowas.shop/app/farmer/` already has:
  - `register/page.tsx` ✅
  - `dashboard/page.tsx` ✅
- `farmer-portal/app/` has:
  - `page.tsx` (landing page - not needed, main app handles this)
  - `dashboard/page.tsx` (might have different content)

**Decision needed**: Should I merge or can we delete farmer-portal?

---

### 2. Install Missing Dependencies

The Medusa client needs to be installed:

```bash
cd rythumowas.shop
pnpm add @medusajs/medusa-js
```

---

### 3. Update Medusa Backend Configuration

Add Stack Auth middleware to Medusa routes:

**File**: `medusa-backend/src/api/index.ts`

```typescript
import { Router } from 'express'
import { stackAuthMiddleware } from './middlewares/stack-auth'

export default (rootDirectory: string): Router => {
  const router = Router()
  
  // Apply Stack Auth middleware to all routes
  router.use(stackAuthMiddleware)
  
  // Your existing routes...
  
  return router
}
```

---

### 4. Test the Application

```bash
# Terminal 1: Start Medusa backend
cd medusa-backend
pnpm dev

# Terminal 2: Start Next.js frontend
cd rythumowas.shop
pnpm dev
```

**Test Checklist**:
- [ ] Landing page loads (http://localhost:3000)
- [ ] Shop page loads (http://localhost:3000/shop)
- [ ] Stack Auth sign-in works
- [ ] Farmer registration works
- [ ] Farmer dashboard loads
- [ ] Admin panel loads
- [ ] No console errors
- [ ] No TypeScript errors

---

### 5. Update Documentation

**Files to update**:

**docs/ARCHITECTURE.md**:
- Remove Clerk references
- Add Stack Auth + Medusa integration details
- Update data flow diagrams

**docs/SETUP.md**:
- Remove Clerk setup steps
- Add Stack Auth setup steps
- Add Medusa setup steps

**docs/DEPLOYMENT.md**:
- Remove Clerk deployment steps
- Add Stack Auth environment variables
- Add Medusa deployment guide

---

### 6. Database Schema Updates

**Prisma Schema** needs to integrate with Medusa:

```prisma
// rythumowas.shop/prisma/schema.prisma

model User {
  id            String    @id @default(cuid())
  stackId       String    @unique // Stack Auth user ID
  email         String    @unique
  name          String?
  role          Role      @default(CUSTOMER)
  
  // Link to Medusa customer
  medusaCustomerId String? @unique
  
  farmer        Farmer?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Farmer {
  id            String    @id @default(cuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id])
  
  farmName      String
  location      String
  district      String
  phone         String
  description   String?
  verified      Boolean   @default(false)
  
  // Link to Medusa vendor
  medusaVendorId String?  @unique
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

Then run:
```bash
cd rythumowas.shop
pnpm prisma db push
```

---

### 7. Create API Integration Endpoints

**File**: `rythumowas.shop/app/api/medusa/products/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getMedusaClient } from '@/lib/medusa-client'

export async function GET(request: NextRequest) {
  try {
    const medusa = await getMedusaClient()
    const { products } = await medusa.products.list()
    
    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
```

---

### 8. Update Components to Use Medusa

**Example**: Update product listing to use Medusa API

**File**: `rythumowas.shop/app/shop/page.tsx`

```typescript
import { getMedusaClient } from '@/lib/medusa-client'
import ProductCard from '@/components/ProductCard'

export default async function ShopPage() {
  const medusa = await getMedusaClient()
  const { products } = await medusa.products.list()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shop Natural Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
```

---

### 9. Set Up Redis (Required for Medusa)

**Local Development**:
```bash
# Install Redis (Windows)
# Download from: https://github.com/microsoftarchive/redis/releases

# Or use Docker
docker run -d -p 6379:6379 redis:alpine

# Or use cloud Redis (Upstash, Redis Cloud)
```

**Update medusa-backend/.env**:
```env
REDIS_URL=redis://localhost:6379
```

---

### 10. Final Verification

Run these commands to ensure everything works:

```bash
# Check for TypeScript errors
cd rythumowas.shop
pnpm tsc --noEmit

# Check for linting issues
pnpm lint

# Build the project
pnpm build

# Run tests (if any)
pnpm test
```

---

## 🎯 Priority Order

### High Priority (Do First)
1. ✅ Merge or delete farmer-portal
2. ✅ Install @medusajs/medusa-js
3. ✅ Test basic functionality
4. ✅ Set up Redis

### Medium Priority (Do Soon)
5. ✅ Update Medusa backend with Stack Auth middleware
6. ✅ Update database schema
7. ✅ Create API integration endpoints
8. ✅ Update components to use Medusa

### Low Priority (Do Later)
9. ✅ Update documentation
10. ✅ Final verification and testing

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
pnpm install

# Install Medusa client
cd rythumowas.shop && pnpm add @medusajs/medusa-js

# Start development
pnpm dev

# Or start individually
pnpm dev:backend  # Terminal 1
pnpm dev:shop     # Terminal 2
```

---

## 📞 Need Help?

If you encounter issues:
1. Check `CLEANUP_COMPLETE.md` for what was changed
2. Check `.gitignore` to ensure env files are excluded
3. Verify Stack Auth keys in `.env`
4. Ensure PostgreSQL and Redis are running
5. Check Medusa backend logs for errors

---

**Status**: 🟡 Cleanup complete, integration in progress

**Next**: Decide on farmer-portal merge strategy
