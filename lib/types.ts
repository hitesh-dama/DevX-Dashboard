export type OrderStatus = 'PAID' | 'PENDING' | 'REFUNDED' | 'CANCELLED';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  amount: number;
  status: OrderStatus;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  totalRevenue: number;
  totalOrders: number;
  lastOrderDate: string;
}

export interface DashboardKPIs {
  totalRevenue: number;
  totalOrders: number;
  activeCustomers: number;
  refundRate: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export type DateRange = '7' | '30' | '90';

export interface OrdersResponse {
  orders: Order[];
  total: number;
}
