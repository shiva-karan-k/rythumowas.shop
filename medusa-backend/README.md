# RythuMowa Medusa Backend

Medusa commerce backend with multi-vendor farmer marketplace extensions.

## Features

- 🛒 Full e-commerce functionality (products, cart, checkout, orders)
- 👨‍🌾 Farmer vendor management
- 📦 Product-to-farmer attribution
- 💰 Commission tracking
- 🔐 Admin panel for platform management
- 📊 Custom API endpoints for farmer portal

## Custom Entities

### Farmer
Represents a farmer/vendor on the platform.

Fields:
- `business_name` - Farm/business name
- `contact_name` - Primary contact person
- `phone`, `email` - Contact information
- `location`, `district`, `state` - Geographic info
- `farm_size` - Size of farm
- `verification_status` - pending/verified/rejected
- `commission_rate` - Platform commission (%)
- `total_earnings` - Lifetime earnings
- `is_active` - Active status

### FarmerProduct
Links products to farmers.

Fields:
- `farmer_id` - Reference to Farmer
- `product_id` - Reference to Product
- `farmer_price` - Farmer's base price
- `is_active` - Active status

## API Endpoints

### Admin Endpoints

```
GET    /admin/farmers           # List all farmers
POST   /admin/farmers           # Create farmer
GET    /admin/farmers/:id       # Get farmer details
PUT    /admin/farmers/:id       # Update farmer
DELETE /admin/farmers/:id       # Delete farmer
```

### Store Endpoints (Farmer Portal)

```
GET    /store/farmer/profile    # Get own profile
PUT    /store/farmer/profile    # Update own profile
GET    /store/farmer/products   # List own products
POST   /store/farmer/products   # Create product
GET    /store/farmer/orders     # List orders
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Setup PostgreSQL database:
```bash
createdb medusa_rythumowa
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run migrations:
```bash
npm run migrate
```

5. Seed database (optional):
```bash
npm run seed
```

6. Start development server:
```bash
npm run dev
```

Backend runs on: http://localhost:9000
Admin panel: http://localhost:9000/app

## Database Migrations

Create new migration:
```bash
npx typeorm migration:create src/migrations/YourMigrationName
```

Run migrations:
```bash
npm run migrate
```

## Admin Panel

Access: http://localhost:9000/app

Default credentials (after seeding):
- Email: admin@medusa-test.com
- Password: supersecret

## Adding Farmers to Products

### Via Admin Panel

1. Go to Products
2. Edit a product
3. Add custom metadata:
```json
{
  "farmer_id": "farmer_123",
  "farmer_name": "Ravi's Farm",
  "location": "Guntur, AP"
}
```

### Via API

```javascript
// Create farmer
POST /admin/farmers
{
  "business_name": "Ravi's Organic Farm",
  "contact_name": "Ravi Kumar",
  "phone": "+91 9876543210",
  "email": "ravi@farm.com",
  "location": "Guntur",
  "district": "Guntur",
  "state": "Andhra Pradesh",
  "farm_size": "5 acres"
}

// Link product to farmer
POST /admin/farmer-products
{
  "farmer_id": "farmer_123",
  "product_id": "prod_456",
  "farmer_price": 5000
}
```

## Environment Variables

```
DATABASE_URL=postgres://user:password@localhost/medusa_rythumowa
REDIS_URL=redis://localhost:6379
JWT_SECRET=something-secret
COOKIE_SECRET=something-secret
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000
```

## Project Structure

```
medusa-backend/
├── src/
│   ├── api/                    # Custom API routes
│   │   ├── admin/
│   │   │   └── farmers/        # Farmer admin endpoints
│   │   └── store/
│   │       └── farmer/         # Farmer portal endpoints
│   ├── models/                 # Database entities
│   │   ├── farmer.ts
│   │   └── farmer-product.ts
│   ├── migrations/             # Database migrations
│   └── services/               # Business logic (future)
├── medusa-config.js            # Medusa configuration
└── package.json
```

## Next Steps

1. Add farmer authentication middleware
2. Implement order attribution to farmers
3. Add payout calculation service
4. Create farmer analytics endpoints
5. Add email notifications (Resend)
6. Implement B2B pricing logic

## Resources

- Medusa Documentation: https://docs.medusajs.com
- TypeORM Documentation: https://typeorm.io
