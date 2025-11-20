import { NextRequest, NextResponse } from 'next/server';
import { mockOrders } from '@/lib/mock-data';
import { Order } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search')?.toLowerCase() || '';
    const status = searchParams.get('status') || 'ALL';
    const sortBy = searchParams.get('sortBy') || 'orderDate';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filtered = [...mockOrders];

    if (search) {
      filtered = filtered.filter(
        order =>
          order.customerName.toLowerCase().includes(search) ||
          order.customerEmail.toLowerCase().includes(search) ||
          order.id.toLowerCase().includes(search)
      );
    }

    if (status !== 'ALL') {
      filtered = filtered.filter(order => order.status === status);
    }

    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Order];
      let bValue: any = b[sortBy as keyof Order];

      if (sortBy === 'orderDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const orders = filtered.slice(startIndex, endIndex);

    return NextResponse.json({ orders, total });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
