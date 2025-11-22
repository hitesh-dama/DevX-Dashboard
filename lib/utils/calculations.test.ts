import { calculateKPIs, formatCurrency, formatDate } from './calculations';
import { Order } from '@/lib/types';

// Mock data for testing
const mockOrders: Order[] = [
    {
        id: '1',
        customerId: 'c1',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        orderDate: new Date().toISOString(),
        amount: 100,
        status: 'PAID'
    },
    {
        id: '2',
        customerId: 'c2',
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        orderDate: new Date().toISOString(),
        amount: 200,
        status: 'PENDING'
    },
    {
        id: '3',
        customerId: 'c1',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        orderDate: new Date(Date.now() - 86400000 * 10).toISOString(),
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

            expect(formatDate(date)).toBe('Jan 15, 2025');
        });
    });

    describe('calculateKPIs', () => {
        it('calculates total revenue correctly for PAID orders within range', () => {
            const kpis = calculateKPIs(mockOrders, 30);
            expect(kpis.totalRevenue).toBe(100);
        });

        it('calculates total orders correctly', () => {
            const kpis = calculateKPIs(mockOrders, 30);
            expect(kpis.totalOrders).toBe(3);
        });

        it('calculates active customers correctly', () => {
            const kpis = calculateKPIs(mockOrders, 30);
            expect(kpis.activeCustomers).toBe(2);
        });

        it('calculates refund rate correctly', () => {
            const kpis = calculateKPIs(mockOrders, 30);
            expect(kpis.refundRate).toBeCloseTo(33.33, 1);
        });

        it('filters out orders outside the date range', () => {
            const kpis = calculateKPIs(mockOrders, 7);
            expect(kpis.totalOrders).toBe(2);
            expect(kpis.totalRevenue).toBe(100);
        });
    });
});
