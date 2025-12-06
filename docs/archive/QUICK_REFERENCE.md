# 🚀 Quick Reference Card

## One-Time Setup

```powershell
# 1. Install dependencies
.\install.ps1

# 2. Setup database
createdb medusa_rythumowa

# 3. Configure environment files
# Edit medusa-backend/.env
# Edit customer-storefront/.env.local
# Edit farmer-portal/.env.local (add Clerk keys)

# 4. Run migrations
cd medusa-backend
npm run migrate
```

## Daily Development

```powershell
# Start all 3 services (use 3 terminals)

# Terminal 1 - Backend (Port 9000)
cd medusa-backend
npm run dev

# Terminal 2 - Storefront (Port 3000)
cd customer-storefront
npm run dev

# Terminal 3 - Farmer Portal (Port 3001)
cd farmer-portal
npm run dev
```

## Access URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| Customer Storefront | http://localhost:3000 | - |
| Medusa Admin | http://localhost:9000/app | admin@medusa-test.com / supersecret |
| Farmer Portal | http://localhost:3001 | Clerk auth |
| API | http://localhost:9000 | - |

## Common Commands

### Medusa Backend
```powershell
cd medusa-backend
npm run dev              # Start dev server
npm run build            # Build for production
npm run migrate          # Run migrations
npm run seed             # Seed test data
```

### Customer Storefront
```powershell
cd customer-storefront
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
```

### Farmer Portal
```powershell
cd farmer-portal
npm run dev              # Start dev server (port 3001)
npm run build            # Build for production
```

## Quick Tasks

### Add a Product (via Admin)
1. Go to http://localhost:9000/app
2. Login with admin credentials
3. Products → New Product
4. Fill details, add image
5. Publish

### Add Farmer Metadata to Product
In product metadata, add:
```json
{
  "farmer_id": "farmer_123",
  "farmer_name": "Ravi's Farm",
  "location": "Guntur, AP",
  "rating": 5,
  "discount": "-20%",
  "from": true
}
```

### Create a Farmer (via API)
```bash
curl -X POST http://localhost:9000/admin/farmers \
  -H "Content-Type: application/json" \
  -d '{
    "business_name": "Ravi Organic Farm",
    "contact_name": "Ravi Kumar",
    "phone": "+91 9876543210",
    "email": "ravi@farm.com",
    "location": "Guntur",
    "district": "Guntur",
    "state": "Andhra Pradesh"
  }'
```

## Troubleshooting

### Port Already in Use
```powershell
# Find process
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F
```

### Database Connection Error
```powershell
# Check PostgreSQL is running
net start postgresql-x64-14

# Or restart
net stop postgresql-x64-14
net start postgresql-x64-14
```

### Redis Connection Error
```powershell
# Start Redis
redis-server

# Or in background
Start-Process redis-server
```

### Clear Node Modules
```powershell
# If having dependency issues
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

## File Locations

### Environment Files
- `medusa-backend/.env`
- `customer-storefront/.env.local`
- `farmer-portal/.env.local`

### Key Components
- Customer Header: `customer-storefront/components/Header.tsx`
- Product Card: `customer-storefront/components/ProductCard.tsx`
- Farmer Model: `medusa-backend/src/models/farmer.ts`
- Farmer Dashboard: `farmer-portal/app/dashboard/page.tsx`

### Configuration
- Medusa Config: `medusa-backend/medusa-config.js`
- Tailwind Config: `customer-storefront/tailwind.config.ts`
- Next Config: `customer-storefront/next.config.mjs`

## API Testing

### Get Products
```bash
curl http://localhost:9000/store/products
```

### Get Farmers (Admin)
```bash
curl http://localhost:9000/admin/farmers
```

### Create Cart
```bash
curl -X POST http://localhost:9000/store/carts
```

## Git Workflow

```bash
# Initial commit
git init
git add .
git commit -m "Initial RythuMowa marketplace setup"

# Create feature branch
git checkout -b feature/farmer-products

# Commit changes
git add .
git commit -m "Add farmer product management"

# Push to remote
git push origin feature/farmer-products
```

## Production Checklist

- [ ] Update all `.env` files with production values
- [ ] Set strong JWT_SECRET and COOKIE_SECRET
- [ ] Configure production database
- [ ] Setup Redis instance
- [ ] Add payment provider keys (Razorpay/Stripe)
- [ ] Configure CORS for production domains
- [ ] Setup email service (Resend)
- [ ] Add SSL certificates
- [ ] Configure CDN for images
- [ ] Setup monitoring (Sentry, etc.)
- [ ] Enable rate limiting
- [ ] Setup backups

## Support

- Full Setup: `START_HERE.md`
- Architecture: `PROJECT_SUMMARY.md`
- Design System: `STOREFRONT_DESIGN.md`
- Main Docs: `README.md`

---

**Need help?** Check the docs folder or create an issue!
