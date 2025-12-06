# RythuMowa Marketplace

Natural farming marketplace connecting farmers in Andhra Pradesh with customers.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start farmer portal (port 3001)
cd farmer-portal
pnpm dev

# Start main shop (port 3000)
cd rythumowas.shop
pnpm dev

# Start Medusa backend (port 9000)
cd medusa-backend
pnpm dev
```

## Project Structure

```
rythumowas.shop/     # Main marketplace (customers + admin)
farmer-portal/       # Farmer dashboard
medusa-backend/      # Backend API
packages/ui/         # Shared UI components
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Auth**: Clerk
- **Database**: PostgreSQL + Prisma
- **Backend**: Medusa.js
- **Deployment**: Vercel

## Key Features

- Customer storefront with product browsing
- Farmer registration and product management
- Admin panel for farmer verification
- Shared UI component library
- Clerk authentication across all apps

## Environment Setup

Copy `.env.example` files in each project and configure:
- Clerk API keys
- Database URLs
- Medusa backend URL

## Documentation

See `/docs` folder for detailed guides.

## Deployment

- Farmer Portal: https://rythumowa-farmers.vercel.app
- Main Shop: Deploy rythumowas.shop to Vercel
- Backend: Deploy medusa-backend separately

## Development

This is a pnpm workspace monorepo. All projects share dependencies and the UI component library.
