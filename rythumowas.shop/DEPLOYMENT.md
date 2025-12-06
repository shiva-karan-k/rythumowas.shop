# Deployment Checklist

## Pre-Deployment

- [ ] Update Next.js to latest secure version (done ✅)
- [ ] Test all authentication flows locally
- [ ] Test farmer registration
- [ ] Test product creation
- [ ] Verify database schema

## Database Setup

### Option 1: Neon (Recommended - Free tier available)
1. Go to https://neon.tech
2. Create new project
3. Copy connection string
4. Add to Vercel environment variables

### Option 2: Supabase
1. Go to https://supabase.com
2. Create new project
3. Get PostgreSQL connection string
4. Add to Vercel environment variables

### Option 3: Railway
1. Go to https://railway.app
2. Create PostgreSQL database
3. Copy connection string
4. Add to Vercel environment variables

## Vercel Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Import to Vercel
- Go to https://vercel.com
- Click "New Project"
- Import your GitHub repository
- Select `rythumowas.shop` as root directory

### 3. Configure Environment Variables
Add these in Vercel dashboard:

```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://rythumowa.shop
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
NEXT_PUBLIC_APP_URL=https://rythumowa.shop
```

Generate secret:
```bash
openssl rand -base64 32
```

### 4. Deploy
- Click "Deploy"
- Wait for build to complete
- Visit your site!

## Post-Deployment

### 1. Initialize Database
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Push database schema
vercel env pull .env.local
pnpm db:push
```

### 2. Create Admin User
Run this in Prisma Studio or directly in database:
```sql
INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt")
VALUES (
  'admin-id',
  'admin@rythumowa.shop',
  '<bcrypt-hashed-password>',
  'Admin',
  'ADMIN',
  NOW(),
  NOW()
);
```

Or use this script (create `scripts/create-admin.ts`):
```typescript
import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const password = await bcrypt.hash('your-admin-password', 10)
  
  await prisma.user.create({
    data: {
      email: 'admin@rythumowa.shop',
      password,
      name: 'Admin',
      role: 'ADMIN',
    }
  })
}

main()
```

### 3. Test Production
- [ ] Visit homepage
- [ ] Test farmer registration
- [ ] Test sign in
- [ ] Test shop page
- [ ] Verify all images load
- [ ] Test on mobile

## Domain Setup

### Custom Domain (rythumowa.shop)
1. Go to Vercel project settings
2. Click "Domains"
3. Add `rythumowa.shop`
4. Add DNS records at your registrar:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

### Subdomain (shop.rythumowa.shop)
If you want shop on subdomain:
1. Add `shop.rythumowa.shop` in Vercel domains
2. Add DNS record:
   - Type: CNAME, Name: shop, Value: cname.vercel-dns.com

## Monitoring

### Vercel Analytics
- Enable in project settings
- Monitor performance and errors

### Database Monitoring
- Use Neon/Supabase dashboard
- Monitor query performance
- Set up alerts

## Security Checklist

- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] DATABASE_URL is not exposed in client code
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled (add middleware)
- [ ] Input validation on all forms
- [ ] SQL injection protection (Prisma handles this)

## Performance Optimization

- [ ] Enable Vercel Edge Functions for API routes
- [ ] Add image optimization (next/image)
- [ ] Enable caching headers
- [ ] Compress images
- [ ] Add loading states

## Backup Strategy

### Database Backups
- Neon: Automatic backups included
- Supabase: Automatic backups included
- Railway: Enable automatic backups

### Code Backups
- GitHub repository (already done)
- Tag releases: `git tag v1.0.0 && git push --tags`

## Rollback Plan

If deployment fails:
1. Go to Vercel dashboard
2. Click "Deployments"
3. Find last working deployment
4. Click "..." → "Promote to Production"

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs

---

**Ready to deploy!** 🚀
