# Quick Start Guide

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you'll be redirected to `/dashboard`

## Available Routes

- **/** - Redirects to dashboard
- **/dashboard** - KPIs and revenue chart with date filtering
- **/orders** - Searchable, filterable orders table with pagination
- **/customers/[id]** - Individual customer profiles and order history

## Key Features to Try

### Dashboard
1. Toggle between date ranges (7/30/90 days)
2. View real-time KPI updates
3. Interact with the revenue chart

### Orders
1. Search for customers by name or email
2. Filter by order status (Paid, Pending, Refunded, Cancelled)
3. Sort by clicking column headers
4. Click any row to see order details in a modal
5. Click customer names to navigate to their profile
6. Use pagination to browse through orders

### Customer Details
1. Navigate from orders page by clicking customer name
2. View customer summary metrics
3. Browse their complete order history
4. Use back button to return to orders

## Project Commands

```bash
# Development
npm run dev              # Start dev server with hot reload

# Production
npm run build            # Build optimized production bundle
npm start                # Start production server

# Code Quality
npm run typecheck        # TypeScript type checking
npm run lint             # ESLint checking (if configured)
```

## Project Structure Overview

```
├── app/                 # Next.js App Router
│   ├── dashboard/       # Dashboard route
│   ├── orders/          # Orders route
│   ├── customers/[id]/  # Customer detail route
│   └── api/             # API route handlers
├── components/          # React components
│   ├── dashboard/       # Dashboard components
│   ├── orders/          # Orders components
│   ├── layout/          # Layout components
│   └── ui/              # UI primitives (shadcn)
└── lib/                 # Core utilities
    ├── types.ts         # TypeScript types
    ├── api.ts           # API client
    ├── mock-data.ts     # Mock data
    └── utils/           # Utility functions
```

## Technology Stack

- **Framework**: Next.js 13.5+ (App Router)
- **Language**: TypeScript
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: Tailwind CSS

## Mock Data

The application uses mock data located in `lib/mock-data.ts`:
- 12 sample orders with various statuses
- 8 customer profiles with complete information
- Revenue data spanning 90 days

## API Endpoints

All API routes are implemented as Next.js Route Handlers:

```
GET /api/dashboard/kpis?range=30
GET /api/dashboard/revenue?range=30
GET /api/orders?search=&status=&sortBy=&sortOrder=&page=&limit=
GET /api/orders/[id]
GET /api/customers/[id]
GET /api/customers/[id]/orders
```

## Component Architecture

**Server Components** (default):
- All `page.tsx` files
- Optimized for SEO and performance

**Client Components** (`'use client'`):
- Interactive UI (filters, charts, modals)
- State management
- Event handlers

## Customization

### Adding New Data

Edit `lib/mock-data.ts` to add more orders or customers:

```typescript
export const mockOrders: Order[] = [
  {
    id: 'ORD-1013',
    customerId: 'CUST-9',
    customerName: 'New Customer',
    customerEmail: 'new@example.com',
    orderDate: '2025-01-20T10:00:00Z',
    amount: 1999.00,
    status: 'PAID',
  },
  // ... more orders
];
```

### Styling

Colors and theme are configured in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles and CSS variables

### Adding New Routes

Create a new folder in `app/`:

```
app/
└── new-route/
    ├── page.tsx         # Server Component
    ├── loading.tsx      # Loading UI
    └── error.tsx        # Error handling (optional)
```

## Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Type Errors

```bash
# Check for type errors
npm run typecheck
```

### Port Already in Use

```bash
# Use a different port
PORT=3001 npm run dev
```

## Next Steps

1. **Database Integration**
   - Replace mock data with real database (Supabase recommended)
   - Implement server-side pagination

2. **Authentication**
   - Add user login/logout
   - Protect routes

3. **Testing**
   - Add unit tests (Vitest/Jest)
   - Add E2E tests (Playwright)

4. **Enhanced Features**
   - Export to CSV/Excel
   - Advanced filtering
   - Real-time updates

## Documentation

- `README.md` - Comprehensive overview and setup
- `ARCHITECTURE.md` - Technical architecture details
- `IMPLEMENTATION.md` - Implementation specifics

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Production Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
# Create Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t analytics-portal .
docker run -p 3000:3000 analytics-portal
```

---

**Ready to start building?** Run `npm run dev` and navigate to http://localhost:3000!
