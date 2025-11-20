import { Order, Customer, DashboardKPIs, RevenueData, OrdersResponse } from './types';

const API_BASE = '/api';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => null);
    throw new Error(errorBody || `API Error: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  dashboard: {
    getKPIs: (range: string) =>
      fetchAPI<DashboardKPIs>(`/dashboard/kpis?range=${range}`),
    getRevenueData: (range: string) =>
      fetchAPI<RevenueData[]>(`/dashboard/revenue?range=${range}`),
  },

  orders: {
    getAll: (params?: {
      search?: string;
      status?: string;
      sortBy?: string;
      sortOrder?: string;
      page?: number;
      limit?: number;
    }) => {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.set('search', params.search);
      if (params?.status) queryParams.set('status', params.status);
      if (params?.sortBy) queryParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) queryParams.set('sortOrder', params.sortOrder);
      if (params?.page) queryParams.set('page', params.page.toString());
      if (params?.limit) queryParams.set('limit', params.limit.toString());

      const query = queryParams.toString();
      return fetchAPI<OrdersResponse>(`/orders${query ? `?${query}` : ''}`);
    },
    getById: (id: string) =>
      fetchAPI<Order>(`/orders/${id}`),
  },

  customers: {
    getById: (id: string) =>
      fetchAPI<Customer>(`/customers/${id}`),
    getOrders: (id: string) =>
      fetchAPI<Order[]>(`/customers/${id}/orders`),
  },
};
