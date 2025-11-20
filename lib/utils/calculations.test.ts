import { calculateKPIs, formatCurrency, formatDate } from './calculations';
import { Order } from '@/lib/types';

// Mock data for testing
const mockOrders: Order[] = [
    {
        id: '1',
        customerId: 'c1',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        orderDate: new Date().toISOString(), // Today
        amount: 100,
        status: 'PAID'
    },
    {
        id: '2',
        customerId: 'c2',
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        orderDate: new Date().toISOString(), // Today
        amount: 200,
        status: 'PENDING'
    },
    {
        id: '3',
        customerId: 'c1', // Same customer as order 1
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        orderDate: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
        amount: 50,
        status: 'REFUNDED'
    }
];

describe('Utility Functions', () => {
    describe('formatCurrency', () => {
        it('formats numbers as INR currency', () => {
            expect(formatCurrency(1000)).toBe('₹1,000.00');
            expect(formatCurrency(1234.56)).toBe('₹1,234.56');
            expect(formatCurrency(0)).toBe('₹0.00');
        });
    });

    describe('formatDate', () => {
        it('formats date strings correctly', () => {
            const date = '2025-01-15T10:00:00Z';
            // Note: The output depends on the locale, but we expect "Jan 15, 2025" for en-US
            expect(formatDate(date)).toBe('Jan 15, 2025');
        });
    });

    describe('calculateKPIs', () => {
        it('calculates total revenue correctly for PAID orders within range', () => {
            const kpis = calculateKPIs(mockOrders, 30);
            // Order 1 (100) + Order 3 (0, refunded) + Order 2 (0, pending)
            // Wait, logic check:
            // Order 1: PAID, Today. Included.
            // Order 2: PENDING, Today. Included in count, but not revenue.
            // Order 3: REFUNDED, 10 days ago. Included in count (within 30 days).

            // Total Revenue = Only PAID orders = 100
            expect(kpis.totalRevenue).toBe(100);
        });

        it('calculates total orders correctly', () => {
            const kpis = calculateKPIs(mockOrders, 30);
            expect(kpis.totalOrders).toBe(3);
        });

        it('calculates active customers correctly', () => {
            const kpis = calculateKPIs(mockOrders, 30);
            // c1 and c2 are active
            expect(kpis.activeCustomers).toBe(2);
        });

        it('calculates refund rate correctly', () => {
            const kpis = calculateKPIs(mockOrders, 30);
            // 1 refunded out of 3 total
            // 1/3 * 100 = 33.333...
            expect(kpis.refundRate).toBeCloseTo(33.33, 1);
        });

        it('filters out orders outside the date range', () => {
            const kpis = calculateKPIs(mockOrders, 7); // Last 7 days
            // Order 3 is 10 days ago, should be excluded.
            // Remaining: Order 1 and Order 2.

            expect(kpis.totalOrders).toBe(2);
            expect(kpis.totalRevenue).toBe(100); // Order 1 is PAID
        });
    });
});
