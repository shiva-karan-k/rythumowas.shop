# Clerk Configuration for Vercel Deployment

## 1. Clerk Dashboard Settings

Go to: https://dashboard.clerk.com → Your App → Settings

### Allowed Origins (Add all these URLs)

**For rythumowas.shop:**
- `https://www.rythumowas.shop`
- `https://rythumowas.shop`

**For rythumowas.com:**
- `https://www.rythumowas.com`
- `https://rythumowas.com`

**Development:**
- `http://localhost:3000`

### Redirect URLs

**Sign-in redirect:**
- `https://www.rythumowas.shop/`
- `https://www.rythumowas.com/`

**Sign-up redirect:**
- `https://www.rythumowas.shop/`
- `https://www.rythumowas.com/`

**After sign-out:**
- `https://www.rythumowas.shop/`
- `https://www.rythumowas.com/`

## 2. Vercel Environment Variables

Add these in: Vercel Dashboard → Your Project → Settings → Environment Variables

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZHJpdmVuLXBoZWFzYW50LTgzLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_0zbfFQgtH4QXFyoZnvXwtUPMISkfFW501xPXqKX1gx
CLERK_WEBHOOK_SECRET=(get from Clerk webhooks section)

# Database
DATABASE_URL=postgresql://neondb_owner:npg_pSzIcKi5uaX3@ep-round-mud-a1d6wwss-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# Medusa Backend (your deployed Medusa URL)
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-medusa-backend.vercel.app

# App URL
NEXT_PUBLIC_APP_URL=https://www.rythumowas.shop
```

## 3. Domain Setup in Vercel

1. Go to: Vercel → Your Project → Settings → Domains
2. Add both domains:
   - `www.rythumowas.shop` (primary)
   - `rythumowas.shop` (redirect to www)
   - `www.rythumowas.com` (if you have it)
   - `rythumowas.com` (if you have it)

## 4. After Configuration

1. Save all settings in Clerk
2. Add all environment variables in Vercel
3. Redeploy in Vercel
4. Test the site

## Troubleshooting

If you still get errors:
1. Check Vercel Runtime Logs for the actual error
2. Verify Clerk keys are correct (copy-paste from Clerk dashboard)
3. Make sure domains are added in Clerk's Allowed Origins
4. Clear browser cache and try again
