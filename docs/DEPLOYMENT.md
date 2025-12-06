# Deployment Guide

## Vercel Deployment

### Farmer Portal (Already Deployed)
✅ Live at: https://rythumowa-farmers.vercel.app

### Main Shop (rythumowas.shop)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Vercel Setup**
- Go to vercel.com
- Import repository
- Root directory: `rythumowas.shop`
- Framework: Next.js
- Build command: `pnpm build`
- Install command: `pnpm install`

3. **Environment Variables**
```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_MEDUSA_URL=https://your-backend.com
```

4. **Deploy**
- Click Deploy
- Wait for build
- Test the site

## Backend Deployment (Medusa)

### Option 1: Railway

1. Create Railway account
2. New project from GitHub
3. Add PostgreSQL service
4. Set environment variables
5. Deploy

### Option 2: Render

1. Create Render account
2. New Web Service
3. Connect repository
4. Root directory: `medusa-backend`
5. Build: `pnpm install && pnpm build`
6. Start: `pnpm start`
7. Add PostgreSQL database
8. Set environment variables

## Database

### Supabase (Recommended)
1. Create project at supabase.com
2. Get connection string
3. Add to environment variables
4. Run migrations

### Neon
1. Create project at neon.tech
2. Get connection string
3. Configure in .env

## Post-Deployment

1. **Test Authentication**
   - Sign up/sign in works
   - Clerk webhooks configured

2. **Test Database**
   - Migrations ran successfully
   - Can create/read data

3. **Test API**
   - Backend accessible
   - CORS configured
   - Endpoints responding

4. **Configure Domains**
   - Add custom domains in Vercel
   - Update Clerk allowed origins
   - Update CORS settings

## Monitoring

- Vercel Analytics
- Clerk Dashboard
- Database metrics
- Error tracking (Sentry)
