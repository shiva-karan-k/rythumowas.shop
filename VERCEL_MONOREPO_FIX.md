# Vercel Monorepo Configuration Fix

## The Real Problem

Your Vercel project is configured with:
- **Root Directory:** `rythumowas.shop` (subdirectory)
- **Lockfile Location:** `pnpm-lock.yaml` (at repository root)

This is a **monorepo** setup, and Vercel needs special configuration!

## Current Situation

```
Repository Root/
├── pnpm-lock.yaml          ← Lockfile is HERE (root)
├── pnpm-workspace.yaml
├── rythumowas.shop/        ← Vercel builds from HERE
│   └── package.json
├── farmer-portal/
└── medusa-backend/
```

**Problem:** When Vercel sets Root Directory to `rythumowas.shop`, it can't see the lockfile at the root!

## Solution: Update Vercel Build Settings

Go to your Vercel project settings and update:

### Option 1: Change Root Directory to Repository Root (Recommended)

1. Go to Vercel Dashboard → Your Project → Settings → General
2. Change **Root Directory** from `rythumowas.shop` to: `.` (root)
3. Update **Build Command:** `cd rythumowas.shop && pnpm build`
4. Update **Output Directory:** `rythumowas.shop/.next`

### Option 2: Keep Root Directory as `rythumowas.shop` but Fix Install

1. Keep **Root Directory:** `rythumowas.shop`
2. Update **Install Command:** 
   ```bash
   cd ../.. && pnpm install --frozen-lockfile && cd rythumowas.shop
   ```
3. Keep **Build Command:** `pnpm build`

## Recommended Vercel Settings

**For Monorepo with Root Lockfile:**

```
Root Directory: . (repository root)
Install Command: pnpm install --frozen-lockfile
Build Command: cd rythumowas.shop && pnpm build
Output Directory: rythumowas.shop/.next
```

OR

```
Root Directory: rythumowas.shop
Install Command: cd ../.. && pnpm install --frozen-lockfile
Build Command: pnpm build
Output Directory: .next
```

## Alternative: Create vercel.json

Create `rythumowas.shop/vercel.json`:

```json
{
  "buildCommand": "cd ../.. && pnpm install --frozen-lockfile && cd rythumowas.shop && pnpm build",
  "installCommand": "cd ../.. && pnpm install --frozen-lockfile",
  "outputDirectory": ".next"
}
```

## Quick Fix: Trigger New Deployment

The deployment that's failing was created BEFORE we pushed the new commits. 

**Action:** Go to Vercel dashboard and:
1. Click "Redeploy" on the latest deployment
2. OR make a small change and push (to trigger new deployment)
3. OR wait for Vercel to auto-detect the new commits

---

**Status:** Configuration issue - needs Vercel settings update  
**Priority:** High - this is why builds are failing

