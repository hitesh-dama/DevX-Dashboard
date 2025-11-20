# Business Analytics Portal - Architecture Document

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser (Client)                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dashboard   │  │    Orders    │  │  Customers   │      │
│  │    Route     │  │    Route     │  │    Route     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                     ┌──────▼──────┐                          │
│                     │  API Client │                          │
│                     │  (lib/api)  │                          │
│                     └──────┬──────┘                          │
└────────────────────────────┼────────────────────────────────┘
                             │ HTTP Requests
┌────────────────────────────▼────────────────────────────────┐
│                    Next.js Server                            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │            API Route Handlers                        │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │    │
│  │  │Dashboard │  │  Orders  │  │Customers │          │    │
│  │  │   APIs   │  │   APIs   │  │   APIs   │          │    │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘          │    │
│  └───────┼─────────────┼─────────────┼────────────────┘    │
│          └─────────────┴─────────────┘                      │
│                        │                                     │
│                  ┌─────▼─────┐                               │
│                  │ Mock Data │                               │
│                  │  (JSON)   │                               │
│                  └───────────┘                               │
└─────────────────────────────────────────────────────────────┘
```

## Folder Structure

```
project/
├── app/                          # Next.js App Router
│   ├── api/                      # Backend API Routes
│   │   ├── dashboard/
│   │   │   ├── kpis/route.ts    # KPI metrics endpoint
│   │   │   └── revenue/route.ts  # Revenue data endpoint
│   │   ├── orders/
│   │   │   ├── route.ts         # Orders list endpoint
│   │   │   └── [id]/route.ts    # Single order endpoint
│   │   └── customers/
│   │       └── [id]/
│   │           ├── route.ts     # Customer profile endpoint
│   │           └── orders/route.ts # Customer orders endpoint
│   │
│   ├── dashboard/                # Dashboard feature
│   │   ├── page.tsx             # Server Component (page)
│   │   ├── dashboard-content.tsx # Client Component (logic)
│   │   └── loading.tsx          # Loading UI
│   │
│   ├── orders/                   # Orders feature
│   │   ├── page.tsx
│   │   ├── orders-content.tsx
│   │   └── loading.tsx
│   │
│   ├── customers/[id]/           # Customer detail feature
│   │   ├── page.tsx
│   │   ├── customer-content.tsx
│   │   └── loading.tsx
│   │
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (redirects)
│   └── error.tsx                 # Global error boundary
│
├── components/                    # React Components
│   ├── dashboard/                # Dashboard-specific
│   │   ├── kpi-card.tsx
│   │   ├── revenue-chart.tsx
│   │   └── date-range-selector.tsx
│   │
│   ├── orders/                   # Orders-specific
│   │   ├── orders-table.tsx
│   │   ├── orders-filters.tsx
│   │   ├── order-details-dialog.tsx
│   │   └── pagination.tsx
│   │
│   ├── layout/                   # Layout components
│   │   ├── sidebar.tsx
│   │   └── mobile-nav.tsx
│   │
│   └── ui/                       # shadcn/ui primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── table.tsx
│       └── ... (40+ components)
│
├── lib/                          # Core logic & utilities
│   ├── types.ts                  # TypeScript types
│   ├── api.ts                    # API client wrapper
│   ├── mock-data.ts              # Mock data store
│   ├── utils.ts                  # Utility functions
│   └── utils/
│       └── calculations.ts       # Business logic
│
└── public/                       # Static assets

```

## Component Architecture

### Server Components (SC)

**Purpose**: Initial data fetching, SEO, performance

```typescript
// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Loading />}>
        <DashboardContent /> {/* Client Component */}
      </Suspense>
    </div>
  );
}
```

**Benefits**:
- Zero JavaScript to client
- Better SEO
- Faster initial page load
- Automatic code splitting

### Client Components (CC)

**Purpose**: Interactivity, state management, user input

```typescript
// app/dashboard/dashboard-content.tsx
'use client';

export function DashboardContent() {
  const [dateRange, setDateRange] = useState('30');
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  return (
    <>
      <DateRangeSelector onChange={setDateRange} />
      <RevenueChart data={data} />
    </>
  );
}
```

**Benefits**:
- Interactive UI
- State management
- Event handlers
- React hooks

## Data Flow

### 1. Dashboard Data Flow

```
User Action: Select date range (7/30/90 days)
      ↓
Client: Update state (setDateRange)
      ↓
Client: useEffect triggers
      ↓
Client: Call api.dashboard.getKPIs(range)
      ↓
API: GET /api/dashboard/kpis?range=30
      ↓
Server: Calculate KPIs from mock data
      ↓
Server: Return JSON response
      ↓
Client: Update state (setKpis)
      ↓
UI: Re-render with new data
```

### 2. Orders Data Flow

```
User Action: Type in search box
      ↓
Client: Update search state (debounced)
      ↓
Client: Call api.orders.getAll({ search, ... })
      ↓
API: GET /api/orders?search=john&status=PAID
      ↓
Server: Filter mock orders
Server: Sort and paginate
      ↓
Server: Return { orders, total }
      ↓
Client: Update orders state
      ↓
UI: Re-render table
```

### 3. Customer Detail Data Flow

```
Navigation: Click customer name
      ↓
Router: Navigate to /customers/[id]
      ↓
Server: Render page.tsx (Server Component)
      ↓
Server: Pass customerId to CustomerContent
      ↓
Client: CustomerContent mounts
      ↓
Client: Parallel API calls:
  - api.customers.getById(id)
  - api.customers.getOrders(id)
      ↓
Server: Return customer data and orders
      ↓
Client: Update state
      ↓
UI: Display customer profile + orders
```

## State Management

### Local State (useState)

```typescript
// Used for component-specific UI state
const [search, setSearch] = useState('');
const [status, setStatus] = useState('ALL');
const [currentPage, setCurrentPage] = useState(1);
```

**When to use**:
- Component-specific state
- No need to share across routes
- Simple state updates

### No Global State (Currently)

**Why**:
- No shared state across routes needed
- Each page is independent
- Simpler architecture
- Easier to maintain

**Future consideration**:
- Add Zustand if cross-page state needed
- Example: User preferences, shopping cart

## API Design

### RESTful Conventions

```
GET  /api/dashboard/kpis?range=30
GET  /api/dashboard/revenue?range=30

GET  /api/orders?search=john&status=PAID&page=1&limit=10
GET  /api/orders/[id]

GET  /api/customers/[id]
GET  /api/customers/[id]/orders
```

### Response Format

```typescript
// Success response
{
  orders: Order[],
  total: number
}

// Error response (future)
{
  error: string,
  code: string,
  details?: any
}
```

### API Client Layer

```typescript
// lib/api.ts - Centralized API calls
async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`/api${endpoint}`);
  if (!response.ok) throw new Error();
  return response.json();
}

export const api = {
  dashboard: { ... },
  orders: { ... },
  customers: { ... },
};
```

**Benefits**:
- Single source of truth
- Type-safe
- Easy to mock for testing
- Consistent error handling

## Routing Strategy

### File-Based Routing

```
/                         → app/page.tsx
/dashboard                → app/dashboard/page.tsx
/orders                   → app/orders/page.tsx
/customers/CUST-1         → app/customers/[id]/page.tsx
```

### Dynamic Routes

```typescript
// app/customers/[id]/page.tsx
export default function CustomerPage({
  params
}: {
  params: { id: string }
}) {
  return <CustomerContent customerId={params.id} />;
}
```

### Navigation

```typescript
// Programmatic navigation
import { useRouter } from 'next/navigation';
router.push('/customers/CUST-1');

// Link component
import Link from 'next/link';
<Link href="/customers/CUST-1">View Customer</Link>
```

## Performance Optimization

### Code Splitting

- Automatic route-based splitting
- Dynamic imports for heavy components
- Lazy loading for charts

### Bundle Size

```
Dashboard: 193 kB (includes Recharts)
Orders:    128 kB
Customer:  98.8 kB
Shared:    79.5 kB
```

### Optimization Techniques

1. **Server Components**
   - Reduce client bundle
   - Better performance

2. **Suspense Boundaries**
   - Stream content
   - Better perceived performance

3. **Image Optimization**
   - Next.js Image component
   - Automatic optimization

4. **Font Optimization**
   - next/font for optimal loading

## Error Handling

### Error Boundaries

```typescript
// app/error.tsx - Route-level error boundary
'use client';

export default function Error({ error, reset }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Something went wrong</AlertTitle>
      <Button onClick={reset}>Try again</Button>
    </Alert>
  );
}
```

### API Error Handling

```typescript
try {
  const data = await api.orders.getAll();
  setOrders(data.orders);
} catch (err) {
  setError('Failed to load orders');
  console.error(err);
}
```

### Loading States

```typescript
// app/dashboard/loading.tsx
export default function Loading() {
  return <Skeleton className="h-32" />;
}
```

## Security Considerations

### Current Implementation

1. **No authentication** (internal tool assumption)
2. **Client-side validation**
3. **No sensitive data exposure**

### Future Enhancements

1. **Authentication**
   - JWT tokens
   - Session management
   - Protected routes

2. **Authorization**
   - Role-based access
   - Permission checks

3. **API Security**
   - Rate limiting
   - Input validation
   - CSRF protection

## Scalability

### Current Architecture

- ✅ Modular components
- ✅ Clean separation of concerns
- ✅ Type-safe contracts
- ✅ Centralized API layer

### Ready for Scale

1. **Database Integration**
   - Replace mock data
   - Add Supabase/PostgreSQL
   - Implement caching

2. **State Management**
   - Add Zustand if needed
   - Implement optimistic updates

3. **Real-time Features**
   - WebSocket integration
   - Live data updates

4. **Microservices**
   - API routes → separate services
   - Service-to-service communication

## Testing Strategy

### Unit Tests (Future)

```typescript
// Example
describe('calculateKPIs', () => {
  it('calculates total revenue correctly', () => {
    const orders = mockOrders;
    const kpis = calculateKPIs(orders, 30);
    expect(kpis.totalRevenue).toBe(31988);
  });
});
```

### Integration Tests (Future)

```typescript
// Example
describe('Orders Page', () => {
  it('filters orders by status', async () => {
    render(<OrdersPage />);
    await selectStatus('PAID');
    expect(getOrders()).toHaveLength(8);
  });
});
```

### E2E Tests (Future)

```typescript
// Example with Playwright
test('complete order workflow', async ({ page }) => {
  await page.goto('/orders');
  await page.click('text=ORD-1001');
  await expect(page.locator('text=John Doe')).toBeVisible();
});
```

## Deployment

### Build Process

```bash
npm run build
# Creates optimized production build
# Output: .next/ directory
```

### Deployment Options

1. **Vercel** (Recommended)
   - Zero-config deployment
   - Automatic previews
   - Edge network

2. **Docker**
   - Containerized deployment
   - Self-hosted option

3. **Static Export**
   - Generate static HTML
   - Deploy to CDN
   - (Note: API routes need serverless)

## Monitoring & Observability

### Future Considerations

1. **Error Tracking**
   - Sentry integration
   - Error reporting

2. **Analytics**
   - User behavior tracking
   - Performance metrics

3. **Logging**
   - Structured logging
   - Log aggregation

## Conclusion

This architecture provides:
- ✅ Scalable foundation
- ✅ Clean separation of concerns
- ✅ Type safety
- ✅ Performance optimization
- ✅ Easy maintenance
- ✅ Future-proof design

Ready for production use and future enhancements.
