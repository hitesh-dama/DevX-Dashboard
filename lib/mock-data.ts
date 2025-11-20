import { Order, Customer } from './types';

export const mockOrders: Order[] = [
  { id: 'ORD-2001', customerId: 'CUST-1', customerName: 'Priya Sharma', customerEmail: 'priya.sharma@gmail.com', orderDate: '2025-11-18T09:30:00Z', amount: 18999, status: 'PAID' },
  { id: 'ORD-2002', customerId: 'CUST-2', customerName: 'Amit Patel', customerEmail: 'amit.patel@gmail.com', orderDate: '2025-11-17T15:45:00Z', amount: 2599, status: 'PENDING' },
  { id: 'ORD-2003', customerId: 'CUST-3', customerName: 'Rohit Verma', customerEmail: 'rohit.verma@gmail.com', orderDate: '2025-11-16T12:10:00Z', amount: 799, status: 'REFUNDED' },
  { id: 'ORD-2004', customerId: 'CUST-1', customerName: 'Priya Sharma', customerEmail: 'priya.sharma@gmail.com', orderDate: '2025-11-15T18:00:00Z', amount: 1299, status: 'CANCELLED' },
  { id: 'ORD-2005', customerId: 'CUST-4', customerName: 'Sneha Iyer', customerEmail: 'sneha.iyer@gmail.com', orderDate: '2025-11-14T10:00:00Z', amount: 499, status: 'PAID' },
  { id: 'ORD-2006', customerId: 'CUST-5', customerName: 'Vikram Singh', customerEmail: 'vikram.singh@gmail.com', orderDate: '2025-11-13T11:30:00Z', amount: 999, status: 'PENDING' },
  { id: 'ORD-2007', customerId: 'CUST-6', customerName: 'Kiran Desai', customerEmail: 'kiran.desai@gmail.com', orderDate: '2025-11-12T14:00:00Z', amount: 1599, status: 'REFUNDED' },
  { id: 'ORD-2008', customerId: 'CUST-7', customerName: 'Ananya Joshi', customerEmail: 'ananya.joshi@gmail.com', orderDate: '2025-11-11T10:30:00Z', amount: 2099, status: 'CANCELLED' },
  { id: 'ORD-2009', customerId: 'CUST-8', customerName: 'Suresh Pillai', customerEmail: 'suresh.pillai@gmail.com', orderDate: '2025-11-10T16:45:00Z', amount: 3499, status: 'PAID' },
  { id: 'ORD-2010', customerId: 'CUST-9', customerName: 'Meera Rao', customerEmail: 'meera.rao@gmail.com', orderDate: '2025-11-09T13:20:00Z', amount: 899, status: 'PENDING' },
  { id: 'ORD-2011', customerId: 'CUST-10', customerName: 'Arjun Mehta', customerEmail: 'arjun.mehta@gmail.com', orderDate: '2025-11-08T09:00:00Z', amount: 12999, status: 'REFUNDED' },
  { id: 'ORD-2012', customerId: 'CUST-11', customerName: 'Neha Kapoor', customerEmail: 'neha.kapoor@gmail.com', orderDate: '2025-11-07T11:15:00Z', amount: 4999, status: 'CANCELLED' },
  { id: 'ORD-2013', customerId: 'CUST-12', customerName: 'Sanjay Gupta', customerEmail: 'sanjay.gupta@gmail.com', orderDate: '2025-11-06T15:30:00Z', amount: 1599, status: 'PAID' },
  { id: 'ORD-2014', customerId: 'CUST-13', customerName: 'Ritu Singh', customerEmail: 'ritu.singh@gmail.com', orderDate: '2025-11-05T17:45:00Z', amount: 799, status: 'PENDING' },
  { id: 'ORD-2015', customerId: 'CUST-14', customerName: 'Deepak Joshi', customerEmail: 'deepak.joshi@gmail.com', orderDate: '2025-11-04T10:10:00Z', amount: 2599, status: 'REFUNDED' },
  { id: 'ORD-2016', customerId: 'CUST-15', customerName: 'Asha Menon', customerEmail: 'asha.menon@gmail.com', orderDate: '2025-11-03T12:00:00Z', amount: 1899, status: 'CANCELLED' },
  { id: 'ORD-2017', customerId: 'CUST-16', customerName: 'Rajesh Kumar', customerEmail: 'rajesh.kumar@gmail.com', orderDate: '2025-11-02T14:30:00Z', amount: 999, status: 'PAID' },
  { id: 'ORD-2018', customerId: 'CUST-17', customerName: 'Sunita Reddy', customerEmail: 'sunita.reddy@gmail.com', orderDate: '2025-11-01T16:00:00Z', amount: 3499, status: 'PENDING' },
  { id: 'ORD-2019', customerId: 'CUST-18', customerName: 'Manoj Pillai', customerEmail: 'manoj.pillai@gmail.com', orderDate: '2025-10-31T18:20:00Z', amount: 2099, status: 'REFUNDED' },
  { id: 'ORD-2020', customerId: 'CUST-19', customerName: 'Kavita Das', customerEmail: 'kavita.das@gmail.com', orderDate: '2025-10-30T09:40:00Z', amount: 1299, status: 'CANCELLED' },
  { id: 'ORD-2051', customerId: 'CUST-21', customerName: 'Harshita Bansal', customerEmail: 'harshita.bansal@gmail.com', orderDate: '2025-09-29T10:00:00Z', amount: 1599, status: 'PAID' },
  { id: 'ORD-2052', customerId: 'CUST-22', customerName: 'Gaurav Sinha', customerEmail: 'gaurav.sinha@gmail.com', orderDate: '2025-09-28T11:30:00Z', amount: 2499, status: 'PENDING' },
  { id: 'ORD-2053', customerId: 'CUST-23', customerName: 'Pooja Nair', customerEmail: 'pooja.nair@gmail.com', orderDate: '2025-09-27T13:00:00Z', amount: 3499, status: 'REFUNDED' },
  { id: 'ORD-2054', customerId: 'CUST-24', customerName: 'Ramesh Yadav', customerEmail: 'ramesh.yadav@gmail.com', orderDate: '2025-09-26T14:30:00Z', amount: 899, status: 'CANCELLED' },
  { id: 'ORD-2055', customerId: 'CUST-25', customerName: 'Divya Shetty', customerEmail: 'divya.shetty@gmail.com', orderDate: '2025-09-25T16:00:00Z', amount: 1999, status: 'PAID' },
  { id: 'ORD-2056', customerId: 'CUST-26', customerName: 'Siddharth Jain', customerEmail: 'siddharth.jain@gmail.com', orderDate: '2025-09-24T17:30:00Z', amount: 2999, status: 'PENDING' },
  { id: 'ORD-2057', customerId: 'CUST-27', customerName: 'Aarti Chawla', customerEmail: 'aarti.chawla@gmail.com', orderDate: '2025-09-23T19:00:00Z', amount: 3999, status: 'REFUNDED' },
  { id: 'ORD-2058', customerId: 'CUST-28', customerName: 'Naveen Kumar', customerEmail: 'naveen.kumar@gmail.com', orderDate: '2025-09-22T20:30:00Z', amount: 999, status: 'CANCELLED' },
  { id: 'ORD-2059', customerId: 'CUST-29', customerName: 'Shalini Mishra', customerEmail: 'shalini.mishra@gmail.com', orderDate: '2025-09-21T22:00:00Z', amount: 2499, status: 'PAID' },
  { id: 'ORD-2060', customerId: 'CUST-30', customerName: 'Yashwant Rao', customerEmail: 'yashwant.rao@gmail.com', orderDate: '2025-09-20T23:30:00Z', amount: 3499, status: 'PENDING' },
  { id: 'ORD-2061', customerId: 'CUST-31', customerName: 'Rina Dutta', customerEmail: 'rina.dutta@gmail.com', orderDate: '2025-09-19T10:00:00Z', amount: 1599, status: 'REFUNDED' },
  { id: 'ORD-2062', customerId: 'CUST-32', customerName: 'Sahil Khan', customerEmail: 'sahil.khan@gmail.com', orderDate: '2025-09-18T11:30:00Z', amount: 2499, status: 'CANCELLED' },
  { id: 'ORD-2063', customerId: 'CUST-33', customerName: 'Megha Jain', customerEmail: 'megha.jain@gmail.com', orderDate: '2025-09-17T13:00:00Z', amount: 3499, status: 'PAID' },
  { id: 'ORD-2064', customerId: 'CUST-34', customerName: 'Tarun Sethi', customerEmail: 'tarun.sethi@gmail.com', orderDate: '2025-09-16T14:30:00Z', amount: 899, status: 'PENDING' },
  { id: 'ORD-2065', customerId: 'CUST-35', customerName: 'Nisha Pillai', customerEmail: 'nisha.pillai@gmail.com', orderDate: '2025-09-15T16:00:00Z', amount: 1999, status: 'REFUNDED' },
  { id: 'ORD-2066', customerId: 'CUST-36', customerName: 'Rajat Kapoor', customerEmail: 'rajat.kapoor@gmail.com', orderDate: '2025-09-14T17:30:00Z', amount: 2999, status: 'CANCELLED' },
  { id: 'ORD-2067', customerId: 'CUST-37', customerName: 'Bhavna Singh', customerEmail: 'bhavna.singh@gmail.com', orderDate: '2025-09-13T19:00:00Z', amount: 3999, status: 'PAID' },
  { id: 'ORD-2068', customerId: 'CUST-38', customerName: 'Kunal Joshi', customerEmail: 'kunal.joshi@gmail.com', orderDate: '2025-09-12T20:30:00Z', amount: 999, status: 'PENDING' },
  { id: 'ORD-2069', customerId: 'CUST-39', customerName: 'Shreya Mehta', customerEmail: 'shreya.mehta@gmail.com', orderDate: '2025-09-11T22:00:00Z', amount: 2499, status: 'REFUNDED' },
  { id: 'ORD-2070', customerId: 'CUST-40', customerName: 'Devansh Rao', customerEmail: 'devansh.rao@gmail.com', orderDate: '2025-09-10T23:30:00Z', amount: 3499, status: 'CANCELLED' },
  { id: 'ORD-2071', customerId: 'CUST-41', customerName: 'Ayesha Khan', customerEmail: 'ayesha.khan@gmail.com', orderDate: '2025-09-09T10:00:00Z', amount: 1599, status: 'PAID' },
  { id: 'ORD-2072', customerId: 'CUST-42', customerName: 'Rohit Sinha', customerEmail: 'rohit.sinha@gmail.com', orderDate: '2025-09-08T11:30:00Z', amount: 2499, status: 'PENDING' },
  { id: 'ORD-2073', customerId: 'CUST-43', customerName: 'Kavya Nair', customerEmail: 'kavya.nair@gmail.com', orderDate: '2025-09-07T13:00:00Z', amount: 3499, status: 'REFUNDED' },
  { id: 'ORD-2074', customerId: 'CUST-44', customerName: 'Sandeep Yadav', customerEmail: 'sandeep.yadav@gmail.com', orderDate: '2025-09-06T14:30:00Z', amount: 899, status: 'CANCELLED' },
  { id: 'ORD-2075', customerId: 'CUST-45', customerName: 'Ritika Shetty', customerEmail: 'ritika.shetty@gmail.com', orderDate: '2025-09-05T16:00:00Z', amount: 1999, status: 'PAID' },
  { id: 'ORD-2076', customerId: 'CUST-46', customerName: 'Saurabh Jain', customerEmail: 'saurabh.jain@gmail.com', orderDate: '2025-09-04T17:30:00Z', amount: 2999, status: 'PENDING' },
  { id: 'ORD-2077', customerId: 'CUST-47', customerName: 'Nandini Chawla', customerEmail: 'nandini.chawla@gmail.com', orderDate: '2025-09-03T19:00:00Z', amount: 3999, status: 'REFUNDED' },
  { id: 'ORD-2078', customerId: 'CUST-48', customerName: 'Ravindra Kumar', customerEmail: 'ravindra.kumar@gmail.com', orderDate: '2025-09-02T20:30:00Z', amount: 999, status: 'CANCELLED' },
  { id: 'ORD-2079', customerId: 'CUST-49', customerName: 'Tanvi Mishra', customerEmail: 'tanvi.mishra@gmail.com', orderDate: '2025-09-01T22:00:00Z', amount: 2499, status: 'PAID' },
  { id: 'ORD-2080', customerId: 'CUST-50', customerName: 'Vivek Rao', customerEmail: 'vivek.rao@gmail.com', orderDate: '2025-08-31T23:30:00Z', amount: 3499, status: 'PENDING' },
  { id: 'ORD-2081', customerId: 'CUST-51', customerName: 'Sheetal Dey', customerEmail: 'sheetal.dey@gmail.com', orderDate: '2025-08-30T10:00:00Z', amount: 1599, status: 'REFUNDED' },
  { id: 'ORD-2082', customerId: 'CUST-52', customerName: 'Pranav Singh', customerEmail: 'pranav.singh@gmail.com', orderDate: '2025-08-29T11:30:00Z', amount: 2499, status: 'CANCELLED' },
  { id: 'ORD-2083', customerId: 'CUST-53', customerName: 'Mitali Jain', customerEmail: 'mitali.jain@gmail.com', orderDate: '2025-08-28T13:00:00Z', amount: 3499, status: 'PAID' },
  { id: 'ORD-2084', customerId: 'CUST-54', customerName: 'Rakesh Sethi', customerEmail: 'rakesh.sethi@gmail.com', orderDate: '2025-08-27T14:30:00Z', amount: 899, status: 'PENDING' },
  { id: 'ORD-2085', customerId: 'CUST-55', customerName: 'Nikita Pillai', customerEmail: 'nikita.pillai@gmail.com', orderDate: '2025-08-26T16:00:00Z', amount: 1999, status: 'REFUNDED' },
  { id: 'ORD-2086', customerId: 'CUST-56', customerName: 'Rohit Kapoor', customerEmail: 'rohit.kapoor@gmail.com', orderDate: '2025-08-25T17:30:00Z', amount: 2999, status: 'CANCELLED' },
  { id: 'ORD-2087', customerId: 'CUST-57', customerName: 'Bhavya Singh', customerEmail: 'bhavya.singh@gmail.com', orderDate: '2025-08-24T19:00:00Z', amount: 3999, status: 'PAID' },
  { id: 'ORD-2088', customerId: 'CUST-58', customerName: 'Karan Joshi', customerEmail: 'karan.joshi@gmail.com', orderDate: '2025-08-23T20:30:00Z', amount: 999, status: 'PENDING' },
  { id: 'ORD-2089', customerId: 'CUST-59', customerName: 'Shweta Mehta', customerEmail: 'shweta.mehta@gmail.com', orderDate: '2025-08-22T22:00:00Z', amount: 2499, status: 'REFUNDED' },
  { id: 'ORD-2090', customerId: 'CUST-60', customerName: 'Devika Rao', customerEmail: 'devika.rao@gmail.com', orderDate: '2025-08-21T23:30:00Z', amount: 3499, status: 'CANCELLED' },
  { id: 'ORD-2091', customerId: 'CUST-61', customerName: 'Aman Khan', customerEmail: 'aman.khan@gmail.com', orderDate: '2025-08-20T10:00:00Z', amount: 1599, status: 'PAID' },
  { id: 'ORD-2092', customerId: 'CUST-62', customerName: 'Ritika Sinha', customerEmail: 'ritika.sinha@gmail.com', orderDate: '2025-08-19T11:30:00Z', amount: 2499, status: 'PENDING' },
  { id: 'ORD-2093', customerId: 'CUST-63', customerName: 'Kavita Nair', customerEmail: 'kavita.nair@gmail.com', orderDate: '2025-08-18T13:00:00Z', amount: 3499, status: 'REFUNDED' },
  { id: 'ORD-2094', customerId: 'CUST-64', customerName: 'Sandeep Yadav', customerEmail: 'sandeep.yadav@gmail.com', orderDate: '2025-08-17T14:30:00Z', amount: 899, status: 'CANCELLED' },
  { id: 'ORD-2095', customerId: 'CUST-65', customerName: 'Ritika Shetty', customerEmail: 'ritika.shetty@gmail.com', orderDate: '2025-08-16T16:00:00Z', amount: 1999, status: 'PAID' },
  { id: 'ORD-2096', customerId: 'CUST-66', customerName: 'Saurabh Jain', customerEmail: 'saurabh.jain@gmail.com', orderDate: '2025-08-15T17:30:00Z', amount: 2999, status: 'PENDING' },
  { id: 'ORD-2097', customerId: 'CUST-67', customerName: 'Nandini Chawla', customerEmail: 'nandini.chawla@gmail.com', orderDate: '2025-08-14T19:00:00Z', amount: 3999, status: 'REFUNDED' },
  { id: 'ORD-2098', customerId: 'CUST-68', customerName: 'Ravindra Kumar', customerEmail: 'ravindra.kumar@gmail.com', orderDate: '2025-08-13T20:30:00Z', amount: 999, status: 'CANCELLED' },
  { id: 'ORD-2099', customerId: 'CUST-69', customerName: 'Tanvi Mishra', customerEmail: 'tanvi.mishra@gmail.com', orderDate: '2025-08-12T22:00:00Z', amount: 2499, status: 'PAID' },
  { id: 'ORD-2100', customerId: 'CUST-70', customerName: 'Vivek Rao', customerEmail: 'vivek.rao@gmail.com', orderDate: '2025-08-11T23:30:00Z', amount: 3499, status: 'PENDING' },
];

export const mockCustomers: Customer[] = [...(() => {
    const orders = mockOrders;
    const map = new Map();
    for (const order of orders) {
      if (!map.has(order.customerId)) {
        map.set(order.customerId, {
          id: order.customerId,
          name: order.customerName,
          email: order.customerEmail,
          joinedAt: '2024-01-01T10:00:00Z',
          totalRevenue: 0,
          totalOrders: 0,
          lastOrderDate: '',
        });
      }
      const c = map.get(order.customerId);
      c.totalOrders++;
      if (order.status === 'PAID') c.totalRevenue += order.amount;
      if (!c.lastOrderDate || new Date(order.orderDate) > new Date(c.lastOrderDate)) {
        c.lastOrderDate = order.orderDate;
      }
    }
    return Array.from(map.values());
  })(),
];
