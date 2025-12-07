# Rythu Mowa - Quick Start Guide

## ✅ What's Done

1. **Dependencies installed** ✓
2. **Database schema pushed to Neon** ✓
3. **Development server running** ✓ (http://localhost:3000)

## 🚀 Next Steps

### 1. Setup Stack Auth (Required)

Stack Auth is already configured. Make sure your `.env` file has:

```env
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_publishable_key
STACK_SECRET_SERVER_KEY=your_secret_key
```

Get these keys from: https://stack-auth.com → Your Project → API Keys

See `STACK_AUTH_SETUP.md` for detailed instructions.

### 2. Test Authentication

You can test authentication by:
1. Sign in with Stack Auth
2. View user in database using Prisma Studio:
   ```bash
   pnpm prisma studio
   ```

### 2. Test the Application

#### A. Visit the Landing Page
Open: http://localhost:3000

You should see:
- Rythu Mowa landing page
- Sign In button (top right)
- "Register as Farmer" button

#### B. Sign In with Clerk
1. Click "Sign In"
2. Create a test account
3. You'll be redirected back

#### C. Register as Farmer
1. After signing in, go to: http://localhost:3000/farmer/register
2. Fill in the form:
   - Farm Name
   - Phone Number
   - District (select from dropdown)
   - Village/Location
   - About Your Farm (optional)
3. Click "Register"
4. You'll be redirected to farmer dashboard

#### D. View Storefront
Visit: http://localhost:3000/shop

This is your Bolt-designed storefront!

### 3. Check Database

Open Prisma Studio to see your data:
```bash
pnpm prisma studio
```

This opens at http://localhost:5555

You should see:
- **User** table (synced from Clerk via webhook)
- **Farmer** table (created when you register)

### 4. Admin Dashboard (Coming Soon)

The admin dashboard at `/admin` will allow you to:
- Verify farmers
- Manage products
- View orders
- Analytics

## 🔧 Development Commands

```bash
# Start dev server
pnpm dev

# Open Prisma Studio (database GUI)
pnpm prisma studio

# Push schema changes to database
pnpm db:push

# Generate Prisma Client (after schema changes)
pnpm prisma generate

# Build for production
pnpm build

# Start production server
pnpm start
```

## 📁 Key Files

- `app/page.tsx` - Landing page
- `app/shop/page.tsx` - Storefront (Bolt design)
- `app/farmer/register/page.tsx` - Farmer registration
- `app/farmer/dashboard/page.tsx` - Farmer dashboard
- `app/api/webhooks/clerk/route.ts` - Clerk webhook handler
- `app/api/farmer/profile/route.ts` - Farmer API
- `prisma/schema.prisma` - Database schema
- `proxy.ts` - Clerk middleware

## 🐛 Troubleshooting

### Issue: "Unauthorized" when accessing protected routes
**Solution**: Make sure you're signed in with Clerk

### Issue: User not appearing in database
**Solution**: 
1. Check webhook is configured correctly
2. Check `CLERK_WEBHOOK_SECRET` in `.env`
3. Or manually create user in Prisma Studio

### Issue: Database connection error
**Solution**: Check `DATABASE_URL` in `.env` is correct

### Issue: Clerk not loading
**Solution**: 
1. Check `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in `.env`
2. Check `CLERK_SECRET_KEY` in `.env`
3. Restart dev server

## 🎯 What to Build Next

1. **Product Management**
   - Add product creation form for farmers
   - Image upload (Cloudinary/S3)
   - Product listing in farmer dashboard

2. **Shopping Cart**
   - Add to cart functionality
   - Cart page with checkout

3. **Payment Integration**
   - Razorpay for Indian payments
   - Order creation and tracking

4. **Admin Dashboard**
   - Farmer verification workflow
   - Product moderation
   - Order management

5. **Agentic AI Features**
   - Crop recommendations
   - Pricing suggestions
   - Seasonal insights

## 📚 Resources

- **Clerk Docs**: https://clerk.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs

---

**Current Status**: ✅ MVP Ready for Testing!

Visit http://localhost:3000 to get started.
