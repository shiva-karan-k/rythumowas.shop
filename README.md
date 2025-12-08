# RythuMowa Marketplace

Natural farming marketplace connecting farmers in Andhra Pradesh with customers worldwide.

## 🌾 Architecture

**Single Next.js Application** with three integrated portals:
- **Customer Portal** - Browse and purchase natural products
- **Farmer Portal** - Manage inventory, orders, and shipping
- **Admin Panel** - Verify farmers and moderate products

**Backend**: Medusa.js e-commerce engine  
**Auth**: Stack Auth (unified authentication)  
**Database**: PostgreSQL + Redis  
**Deployment**: Vercel (Frontend) + Railway (Backend)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL
- Redis
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Start Medusa backend (Terminal 1)
pnpm dev:backend

# Start Next.js frontend (Terminal 2)
pnpm dev:shop
```

### Access Points
- **Frontend**: http://localhost:3000
- **Medusa Admin**: http://localhost:9000/app
- **Medusa API**: http://localhost:9000

---

## 📁 Project Structure

```
rythumowas_shop/
├── rythumowas.shop/          # Next.js Frontend (all portals)
│   ├── app/
│   │   ├── page.tsx          # Landing page
│   │   ├── shop/             # Customer shopping
│   │   ├── cart/             # Shopping cart
│   │   ├── farmer/           # Farmer portal
│   │   │   ├── dashboard/    # Farmer dashboard
│   │   │   ├── products/     # Product management
│   │   │   ├── orders/       # Order management
│   │   │   └── register/     # Farmer registration
│   │   ├── (admin)/admin/    # Admin panel
│   │   └── api/              # API routes
│   ├── components/           # React components
│   ├── lib/                  # Utilities
│   └── prisma/               # Database schema
│
├── medusa-backend/           # Medusa E-commerce Engine
│   ├── src/
│   │   ├── api/              # Custom API endpoints
│   │   ├── models/           # Database models
│   │   └── migrations/       # Database migrations
│   └── medusa-config.js      # Medusa configuration
│
└── packages/ui/              # Shared UI components
```

---

## 🔐 Authentication

**Stack Auth** provides unified authentication for all portals:

- **Customers**: Browse and purchase products
- **Farmers**: Manage products and orders (requires verification)
- **Admins**: Platform management and farmer verification

Role-based access control ensures proper permissions across all portals.

---

## 💾 Database

### PostgreSQL
- **Medusa Schema**: Products, orders, cart, payments, shipping
- **App Schema**: Users, farmers, farmer-product links

### Redis
- Event bus for Medusa
- Cache layer
- Session storage
- Job queues

---

## 🛠️ Development

### Environment Setup

1. **Copy environment files**:
```bash
cp rythumowas.shop/.env.example rythumowas.shop/.env
cp medusa-backend/.env.example medusa-backend/.env
```

2. **Configure Stack Auth**:
   - Go to https://stack-auth.com
   - Create project and get API keys
   - Add to `rythumowas.shop/.env`

3. **Configure Database**:
   - Set up PostgreSQL (Neon, Supabase, or local)
   - Set up Redis (local or cloud)
   - Add connection strings to `.env` files

4. **Run migrations**:
```bash
cd medusa-backend
pnpm migrate
```

5. **Start development**:
```bash
pnpm dev
```

### Available Scripts

```bash
pnpm dev              # Start all services
pnpm dev:shop         # Start frontend only
pnpm dev:backend      # Start backend only
pnpm build            # Build all projects
pnpm lint             # Lint all projects
```

---

## 🌐 Deployment

### Frontend (Vercel)
1. Connect GitHub repository
2. Set root directory to `rythumowas.shop`
3. Add environment variables
4. Deploy

### Backend (Railway/Render)
1. Deploy `medusa-backend` folder
2. Add PostgreSQL and Redis services
3. Set environment variables
4. Run migrations

---

## 📚 Documentation

See `/docs` folder for detailed guides:
- **SETUP.md** - Installation and configuration
- **ARCHITECTURE.md** - System design and data flow
- **DEPLOYMENT.md** - Production deployment guide
- **API.md** - API documentation

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🌟 Features

### For Customers
- ✅ Browse natural products from verified farmers
- ✅ View farmer profiles and product origins
- ✅ Shopping cart and secure checkout
- ✅ Order tracking and history

### For Farmers
- ✅ Easy registration and onboarding
- ✅ Product management dashboard
- ✅ Order management and fulfillment
- ✅ Revenue tracking and analytics

### For Admins
- ✅ Farmer verification and approval
- ✅ Product moderation
- ✅ Order management
- ✅ Platform analytics

---

**Built with ❤️ for natural farmers of Andhra Pradesh**

**Rythu Mowa** - రైతు మోవ - Empowering Natural Farmers
