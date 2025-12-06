# RythuMowa Marketplace - Quick Start Guide

## What We Built

A Medusa-powered marketplace with your Bolt UI design:

```
customer-storefront/          ✅ Created
├── Bolt UI design (colors, fonts, layout)
├── Medusa.js integration ready
├── Header with search & cart
├── Product cards with ratings
├── Category sections
├── Promotional banners
└── Footer with payment methods
```

## Next: Set Up Medusa Backend

### 1. Install Medusa CLI
```bash
npm install -g @medusajs/medusa-cli
```

### 2. Create Medusa Backend
```bash
medusa new medusa-backend
cd medusa-backend
```

During setup, choose:
- PostgreSQL for database
- Stripe or Razorpay for payments
- Yes to seed database (for testing)

### 3. Start Medusa Backend
```bash
npm run dev
```

Backend runs on: http://localhost:9000
Admin panel: http://localhost:9000/app

Default admin credentials:
- Email: admin@medusa-test.com
- Password: supersecret

### 4. Start Customer Storefront
```bash
cd ../customer-storefront
npm install
cp .env.local.example .env.local
npm run dev
```

Storefront runs on: http://localhost:3000

## Design Preserved

Your Bolt UI is fully preserved:
- ✅ Warm color palette (#fff0d1, #378365, #ffa96e)
- ✅ Montserrat font family
- ✅ Product cards with star ratings
- ✅ Category sections
- ✅ Promotional banners
- ✅ Header with search
- ✅ Footer with payment methods

## What's Next

1. **Add Farmer Extension to Medusa**
   - Create Farmer entity
   - Link products to farmers
   - Add farmer metadata

2. **Build Farmer Portal**
   - Product management
   - Order tracking
   - Payout dashboard

3. **Integrate Payments**
   - Razorpay for India
   - Multi-vendor payouts

4. **Add Email Notifications**
   - Resend integration
   - Order confirmations
   - Farmer notifications

## File Structure

```
rythumowa-marketplace/
├── customer-storefront/       # Next.js storefront (Bolt UI)
│   ├── components/
│   │   ├── Header.tsx        # Your Bolt header design
│   │   ├── Footer.tsx        # Your Bolt footer design
│   │   └── ProductCard.tsx   # Your Bolt product cards
│   ├── app/
│   │   └── page.tsx          # Homepage with categories
│   └── lib/
│       └── medusa-client.ts  # Medusa API integration
│
├── medusa-backend/            # To be created
│   ├── src/
│   │   ├── models/           # Add Farmer model here
│   │   └── api/              # Custom farmer endpoints
│   └── medusa-config.js
│
└── farmer-portal/             # To be created
    └── Next.js app for farmers
```

## Commands Reference

### Medusa Backend
```bash
cd medusa-backend
npm run dev              # Start backend (port 9000)
npm run seed             # Seed test data
medusa user -e admin@test.com -p password  # Create admin
```

### Customer Storefront
```bash
cd customer-storefront
npm run dev              # Start storefront (port 3000)
npm run build            # Production build
```

### Farmer Portal (coming next)
```bash
cd farmer-portal
npm run dev              # Start farmer portal (port 3001)
```

## Environment Variables

### Medusa Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/medusa
REDIS_URL=redis://localhost:6379
JWT_SECRET=something-secret
COOKIE_SECRET=something-secret
```

### Customer Storefront (.env.local)
```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

## Testing

1. Start Medusa backend
2. Access admin: http://localhost:9000/app
3. Add products with images
4. Start storefront
5. Browse products with your Bolt UI design

## Support

- Medusa Docs: https://docs.medusajs.com
- Next.js Docs: https://nextjs.org/docs
- Your design system: See `STOREFRONT_DESIGN.md`
