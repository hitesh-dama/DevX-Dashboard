
# Business Analytics Portal

Welcome! This project started as a way to scratch my own itch: I needed a fast, modern analytics dashboard for business data, but most open-source options felt clunky or over-engineered. So I built this portal from the ground up using Next.js 13+, React, and TypeScript, with a focus on real-world usability and developer happiness.

I’ve made a lot of opinionated choices here—some you might agree with, some you might not! Either way, I hope you find the codebase approachable, practical, and easy to extend for your own needs.


## Features

### 📊 Dashboard
- See your business at a glance: revenue, orders, active customers, and refund rate, all in real time.
- Interactive revenue chart with quick date range toggles (7/30/90 days).
- Data loads fast, thanks to server-side fetching and minimal client JS.

### 📃 Orders Management
- Sort, filter, and search orders by customer or status—no more endless scrolling.
- Click any row for a detailed order view, including customer info.
- Pagination keeps things snappy, even with lots of data.

### 👤 Customer Details
- Dive into any customer’s profile: see their order history, revenue, and activity at a glance.
- Handy analytics and summary metrics for each customer.


## Architecture

### Folder Structure (opinionated, but it works for me)

```
app/
├── api/                    # Next.js Route Handlers
│   ├── dashboard/
│   │   ├── kpis/
│   │   └── revenue/
│   ├── orders/
│   └── customers/
├── dashboard/              # Dashboard route
│   ├── page.tsx           # Server Component
│   ├── dashboard-content.tsx  # Client Component
│   └── loading.tsx
├── orders/                 # Orders route
│   ├── page.tsx
│   ├── orders-content.tsx
│   └── loading.tsx
├── customers/[id]/         # Dynamic customer route
│   ├── page.tsx
│   ├── customer-content.tsx
│   └── loading.tsx
└── layout.tsx              # Root layout

components/
├── dashboard/              # Dashboard-specific components
│   ├── kpi-card.tsx
│   ├── revenue-chart.tsx
│   └── date-range-selector.tsx
├── orders/                 # Orders-specific components
│   ├── orders-table.tsx
│   ├── orders-filters.tsx
│   ├── order-details-dialog.tsx
│   └── pagination.tsx
├── layout/                 # Layout components
│   ├── sidebar.tsx
│   └── mobile-nav.tsx
└── ui/                     # shadcn/ui components

lib/
├── types.ts                # TypeScript type definitions
├── api.ts                  # API client wrapper
├── mock-data.ts            # Mock data for development
└── utils/
    └── calculations.ts     # Business logic utilities
```


### Data Fetching Strategy

I’m a big fan of Next.js’s new App Router and server components. All the main pages fetch data on the server for speed and SEO, then hand it off to client components for interactivity (filters, charts, modals, etc). All API calls go through a single wrapper in `lib/api.ts`—no more fetch spaghetti.


### State Management

I keep state local unless there’s a really good reason not to. For this project, React’s `useState` and `useEffect` are more than enough. If you want to share filter state via the URL, Next.js `searchParams` are a great next step (see `/orders?status=PAID&search=john`).


### API Layer

All API endpoints are just Next.js Route Handlers—no extra backend needed for now. The API client in `lib/api.ts` keeps things type-safe and consistent. If you want to swap in a real backend, it’s a one-file change.


## Technology Stack

- **Framework**: Next.js 13.5+ (App Router)
- **Language**: TypeScript
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Type Checking

```bash
npm run typecheck
```


## Key Design Decisions (and why I made them)

1. **Server Components by Default**
   - I love the performance and SEO benefits. Less JS for the client, more speed for everyone.
2. **Mock Data for Now**
   - It’s fast to iterate, and you can swap in a real backend later. All API calls are centralized for easy refactoring.
3. **Component Architecture**
   - UI primitives live in `components/ui/`, feature-specific stuff in their own folders. Keeps things tidy.
4. **TypeScript Everywhere**
   - I don’t ship code without types. It’s saved me from countless bugs.
5. **Responsive Design**
   - Mobile-first, always. Sidebar for desktop, drawer for mobile. Try it on your phone!


## Trade-offs (because every project has them)

**Mock Data vs Real Backend:**
I went with in-memory data for now—super easy to set up, but you’ll lose data on restart. If you need persistence, just plug in a real database.

**Client-Side Filtering:**
All data loads to the client for demo simplicity. Not ideal for huge datasets, but it keeps the code simple. Server-side filtering is on my roadmap.

**Local State Only:**
No global state libraries here. It’s all local state and prop drilling. If you need more, add Zustand or Context later.

**Charts:**
I picked Recharts for its simplicity, even if it’s a bit heavy. If you want something lighter, try Chart.js or D3.


## Future Enhancements (my personal wishlist)

1. **Real Database Integration**
   - Swap out the mock data for Supabase or Postgres
   - Add server-side pagination for big data
2. **Advanced Filtering**
   - Date range pickers, multi-select, and saved filters
3. **Export Tools**
   - Download tables as CSV/Excel, maybe even PDF reports
4. **Real-time Updates**
   - WebSocket support for live dashboards
5. **Authentication**
   - User login, protected routes, and roles
6. **Testing**
   - Unit, integration, and E2E tests (Jest, Playwright, Testing Library)


## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)


## License

MIT — and if you build something cool with this, let me know!
