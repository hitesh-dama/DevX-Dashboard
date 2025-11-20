# Business Analytics Portal

A modern, high-performance analytics dashboard designed for e-commerce business insights. Built with Next.js 13+ (App Router), React, and TypeScript, this project focuses on a clean architecture, real-world usability, and a developer-friendly codebase.

## Features

### 📊 Dashboard
- **Real-time Overview:** Instant visibility into revenue, orders, active customers, and refund rates.
- **Interactive Charts:** Dynamic revenue visualization with adjustable date ranges (7/30/90 days).
- **Performance:** Optimized with Server Components for fast initial load and minimal client-side JavaScript.

### 📃 Orders Management
- **Advanced Filtering:** Sort, filter, and search orders by customer or status.
- **Detailed Views:** interactive row expansion for detailed order information.
- **Pagination:** Efficient data handling for large lists.

### 👤 Customer Insights
- **Deep Dive:** Comprehensive customer profiles including order history and lifetime value.
- **Metrics:** Key analytics per customer.

## Architecture

### Folder Structure
The project follows a domain-driven structure within the Next.js App Router:

```
app/
├── api/                    # Next.js Route Handlers (Mock Backend)
├── dashboard/              # Dashboard Feature
├── orders/                 # Orders Feature
├── customers/              # Customer Feature
└── layout.tsx              # Root Layout & Navigation

components/
├── dashboard/              # Feature-specific components
├── orders/                 # Feature-specific components
├── layout/                 # Global layout components
└── ui/                     # Reusable UI primitives (shadcn/ui)

lib/
├── types.ts                # TypeScript definitions
├── api.ts                  # Centralized API client
└── utils/                  # Shared utilities
```

### Technical Decisions

#### Data Fetching Strategy
Leveraging **Next.js Server Components**, we fetch data on the server for improved performance and SEO. The client receives fully formed HTML where possible, with hydration occurring only for interactive elements (charts, filters). All API interactions are centralized in `lib/api.ts` to ensure type safety and consistent error handling.

#### State Management
We utilize **Local State** (`useState`, `useEffect`) for UI-specific concerns. This avoids the complexity of global state libraries for this scope, keeping the application lightweight and predictable. URL search params are used for shareable states like filter selections.

#### API Layer
The backend is simulated using **Next.js Route Handlers**. This decouples the frontend from the data source, allowing for a seamless transition to a real backend (Node.js, Python, Go) in the future without refactoring the UI components.

## Technology Stack

- **Framework**: Next.js 13.5+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI)
- **Visualization**: Recharts
- **Testing**: Jest & React Testing Library

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

### Testing

Run the unit test suite:

```bash
npm run test
```

## Trade-offs & Considerations

1.  **Mock Data vs. Real Database:**
    Currently uses in-memory mock data for ease of setup and demonstration. In a production environment, this would be replaced by a database connection (PostgreSQL/Supabase) within the API handlers.

2.  **Client-Side Filtering:**
    For this demo, some filtering logic resides on the client/mock-API boundary. For large-scale production datasets, this logic would move entirely to the database query layer.

## Future Roadmap

1.  **Database Integration:** Connect to a persistent data store.
2.  **Authentication:** Implement NextAuth.js for secure access.
3.  **Export Capabilities:** Add CSV/PDF export for reports.
4.  **WebSocket Integration:** Enable live updates for the dashboard.

## License

MIT
