# Rythu Mowa - Natural Farming Marketplace

A full-stack marketplace platform connecting natural farmers of Andhra Pradesh with customers worldwide.

## 🌾 Features

### For Customers
- Browse curated natural products
- View farmer profiles and product origins
- Shopping cart and checkout
- Order tracking

### For Farmers
- Easy registration and onboarding
- Product management dashboard
- Order management
- Revenue tracking

### For Admins
- Farmer verification and approval
- Product moderation
- Order management
- Analytics dashboard

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI**: Tailwind CSS + Radix UI
- **Deployment**: Vercel
- **Language**: TypeScript

## 📦 Installation

### Prerequisites
- Node.js 20+
- PostgreSQL database
- pnpm (recommended) or npm

### Setup

1. **Clone and install**
```bash
git clone https://github.com/shiva-karan-k/rythumowas.shop
cd rythumowas.shop
pnpm install
```

2. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/rythumowa"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
```

3. **Setup database**
```bash
pnpm db:push
```

4. **Run development server**
```bash
pnpm dev
```

Visit http://localhost:3000

## 🗂️ Project Structure

```
rythumowas.shop/
├── app/
│   ├── (storefront)/          # Customer-facing pages
│   ├── shop/                  # Main storefront (Bolt design)
│   ├── farmer/                # Farmer dashboard & registration
│   ├── admin/                 # Admin dashboard
│   ├── auth/                  # Authentication pages
│   └── api/                   # API routes
├── components/                # Reusable components
├── lib/                       # Utilities & configs
├── prisma/                    # Database schema
└── types/                     # TypeScript types
```

## 🔐 Authentication Flow

1. **Farmer Registration** (`/farmer/register`)
   - Creates user account with FARMER role
   - Creates farmer profile
   - Awaits admin verification

2. **Sign In** (`/auth/signin`)
   - Email/password authentication
   - Redirects based on role

3. **Role-based Access**
   - CUSTOMER → Storefront
   - FARMER → Farmer dashboard
   - ADMIN → Admin dashboard

## 💾 Database Schema

### User
- Authentication and role management
- Links to Farmer profile for farmer users

### Farmer
- Farm details and verification status
- One-to-many with Products

### Product
- Product information and pricing
- Belongs to Farmer

### Order & OrderItem
- Customer orders and line items
- Order status tracking

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel**
   - Import repository at vercel.com
   - Add environment variables
   - Deploy

3. **Database Setup**
   - Use Neon, Supabase, or Railway for PostgreSQL
   - Update `DATABASE_URL` in Vercel environment variables
   - Run `pnpm db:push` locally or via Vercel CLI

### Environment Variables on Vercel
```
DATABASE_URL=your-production-database-url
NEXTAUTH_URL=https://rythumowa.shop
NEXTAUTH_SECRET=your-production-secret
```

## 📝 Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm db:push      # Push schema to database
pnpm db:studio    # Open Prisma Studio
pnpm lint         # Run ESLint
pnpm test         # Run tests
```

## 🎨 Routes

### Public
- `/` - Landing page
- `/shop` - Storefront
- `/auth/signin` - Sign in
- `/farmer/register` - Farmer registration

### Protected
- `/farmer/dashboard` - Farmer dashboard
- `/admin` - Admin dashboard

## 🔧 Configuration

### Database
Edit `prisma/schema.prisma` for schema changes, then:
```bash
pnpm db:push
```

### Authentication
Configure in `lib/auth.ts`

### Styling
- Global styles: `styles/tailwind.css`
- Tailwind config: `tailwind.config.ts`

## 📱 Features Roadmap

- [ ] Payment integration (Razorpay/Stripe)
- [ ] Image upload (Cloudinary/S3)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced search and filters
- [ ] Product reviews and ratings
- [ ] Farmer analytics
- [ ] Mobile app

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT

## 👥 Team

Built with ❤️ for natural farmers of Andhra Pradesh

---

**Rythu Mowa** - రైతు మోవ - Empowering Natural Farmers
