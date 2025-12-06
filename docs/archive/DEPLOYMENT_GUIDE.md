# 🚀 RythuMowa Deployment Guide

## Overview

We'll deploy three applications:
1. **rythumowas.shop** - Customer shop (Vercel)
2. **api.rythumowas.shop** - Medusa backend (Railway)
3. **rythumowa.com** - Farmer portal (Vercel)

---

## Prerequisites

- [ ] Vercel account (https://vercel.com)
- [ ] Railway account (https://railway.app)
- [ ] Domain: rythumowas.shop (already owned)
- [ ] Domain: rythumowa.com (need to purchase)
- [ ] PostgreSQL database (Railway provides)
- [ ] Redis instance (Railway provides)

---

## Step 1: Deploy Medusa Backend to Railway

### 1.1 Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub account
5. Select your repository
6. Choose `medusa-backend` folder

### 1.2 Add PostgreSQL Database

1. In Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will create a database
4. Copy the `DATABASE_URL` from variables

### 1.3 Add Redis

1. Click "New" → "Database" → "Redis"
2. Copy the `REDIS_URL` from variables

### 1.4 Configure Environment Variables

In Railway, add these variables:

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}
JWT_SECRET=your-random-secret-here
COOKIE_SECRET=your-random-secret-here
STORE_CORS=https://rythumowas.shop
ADMIN_CORS=https://rythumowa.com
NODE_ENV=production
```

### 1.5 Run Migrations

In Railway terminal:
```bash
npm run migrate
```

### 1.6 Get Railway URL

Railway will give you a URL like: `medusa-backend-production.up.railway.app`

### 1.7 Add Custom Domain (Optional)

1. In Railway, go to Settings → Domains
2. Add custom domain: `api.rythumowas.shop`
3. Add CNAME record in your DNS:
   ```
   CNAME  api  medusa-backend-production.up.railway.app
   ```

---

## Step 2: Deploy Customer Shop (rythumowas.shop)

### 2.1 Deploy to Vercel

```bash
cd rythumowas.shop

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set root directory: ./
# - Build command: pnpm build
# - Output directory: .next
```

### 2.2 Configure Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```env
DATABASE_URL=your-neon-postgres-url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_MEDUSA_API_URL=https://api.rythumowas.shop
NEXT_PUBLIC_APP_URL=https://rythumowas.shop
```

### 2.3 Add Custom Domain

1. In Vercel → Settings → Domains
2. Add domain: `rythumowas.shop`
3. Vercel will provide DNS records
4. Add to your domain registrar:
   ```
   A      @      76.76.21.21
   CNAME  www    cname.vercel-dns.com
   ```

### 2.4 Redeploy

```bash
vercel --prod
```

---

## Step 3: Purchase & Setup rythumowa.com

### 3.1 Purchase Domain

Buy `rythumowa.com` from:
- Namecheap (https://namecheap.com)
- GoDaddy (https://godaddy.com)
- Google Domains (https://domains.google)

**Cost:** ~$10-15/year

### 3.2 Deploy Farmer Portal to Vercel

```bash
cd farmer-portal

# Deploy
vercel

# Follow prompts
```

### 3.3 Configure Environment Variables

In Vercel dashboard:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_MEDUSA_API_URL=https://api.rythumowas.shop
```

### 3.4 Add Custom Domain

1. In Vercel → Settings → Domains
2. Add domain: `rythumowa.com`
3. Vercel provides DNS records
4. In your domain registrar (Namecheap/GoDaddy):
   ```
   A      @      76.76.21.21
   CNAME  www    cname.vercel-dns.com
   ```

### 3.5 Deploy Production

```bash
vercel --prod
```

---

## Step 4: Update Clerk Settings

### 4.1 Add Production URLs

In Clerk Dashboard (https://dashboard.clerk.com):

1. Go to your application
2. Navigate to "Domains"
3. Add production domains:
   - `rythumowas.shop`
   - `rythumowa.com`

4. Update redirect URLs:
   - Sign-in: `https://rythumowa.com/dashboard`
   - Sign-out: `https://rythumowa.com`

---

## Step 5: DNS Configuration Summary

### For rythumowas.shop (Customer Shop)

In your DNS provider:
```
Type   Name   Value
A      @      76.76.21.21
CNAME  www    cname.vercel-dns.com
CNAME  api    medusa-backend-production.up.railway.app
```

### For rythumowa.com (Farmer Portal)

In your DNS provider:
```
Type   Name   Value
A      @      76.76.21.21
CNAME  www    cname.vercel-dns.com
```

---

## Step 6: Test Deployment

### Test Customer Shop
1. Visit https://rythumowas.shop
2. Browse products
3. Add to cart
4. Test checkout

### Test Farmer Portal
1. Visit https://rythumowa.com
2. Sign in with Clerk
3. Access dashboard
4. Test product management

### Test Medusa Admin
1. Visit https://api.rythumowas.shop/app
2. Login with admin credentials
3. Manage products
4. View orders

---

## Alternative: Use Subdomain Instead

If you don't want to buy rythumowa.com, use a subdomain:

**farmer.rythumowas.shop** or **mowa.rythumowas.shop**

DNS Configuration:
```
CNAME  farmer  cname.vercel-dns.com
```

Then deploy farmer-portal with domain: `farmer.rythumowas.shop`

---

## Deployment Costs

| Service | Cost | Purpose |
|---------|------|---------|
| Vercel (Hobby) | Free | Host both Next.js apps |
| Railway (Starter) | $5/month | Medusa backend + DB |
| rythumowa.com | $10-15/year | Farmer portal domain |
| **Total** | **~$5-6/month** | Full marketplace |

---

## Quick Deploy Commands

```bash
# Deploy customer shop
cd rythumowas.shop
vercel --prod

# Deploy farmer portal
cd ../farmer-portal
vercel --prod

# Medusa is auto-deployed via Railway on git push
```

---

## Troubleshooting

### Issue: Domain not connecting
**Solution:** DNS can take 24-48 hours to propagate. Use `nslookup rythumowa.com` to check.

### Issue: Environment variables not working
**Solution:** Redeploy after adding env vars in Vercel/Railway dashboard.

### Issue: Database connection error
**Solution:** Check DATABASE_URL is correct in Railway variables.

### Issue: CORS errors
**Solution:** Update STORE_CORS and ADMIN_CORS in Medusa backend env vars.

---

## Post-Deployment Checklist

- [ ] rythumowas.shop loads correctly
- [ ] rythumowa.com loads correctly
- [ ] Clerk authentication works on both
- [ ] Medusa API responds at api.rythumowas.shop
- [ ] Products display on customer shop
- [ ] Farmer can login and see dashboard
- [ ] SSL certificates active (https://)
- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Test purchase flow
- [ ] Test farmer product creation

---

## Support

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Medusa Docs: https://docs.medusajs.com
- Clerk Docs: https://clerk.com/docs

---

**Ready to deploy!** 🚀

Start with Step 1 (Medusa Backend) and work your way through each step.
