import { products } from "./products";

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: { productId: string; name: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "cod" | "online";
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

export const sampleOrders: Order[] = [
  { id: "ORD-1001", customerName: "Rajesh Kumar", phone: "+91 98765 43210", address: "12, MG Road, Mumbai", items: [{ productId: "alphonso", name: "Alphonso Mango", quantity: 2, price: 899 }, { productId: "kesar", name: "Kesar Mango", quantity: 1, price: 649 }], total: 2447, status: "delivered", paymentMethod: "online", createdAt: "2026-03-28" },
  { id: "ORD-1002", customerName: "Priya Sharma", phone: "+91 87654 32109", address: "45, Jayanagar, Bangalore", items: [{ productId: "badami", name: "Badami Mango", quantity: 3, price: 549 }], total: 1647, status: "shipped", paymentMethod: "cod", createdAt: "2026-03-29" },
  { id: "ORD-1003", customerName: "Amit Patel", phone: "+91 76543 21098", address: "78, Navrangpura, Ahmedabad", items: [{ productId: "kesar", name: "Kesar Mango", quantity: 2, price: 649 }, { productId: "totapuri", name: "Totapuri Mango", quantity: 2, price: 299 }], total: 1896, status: "processing", paymentMethod: "online", createdAt: "2026-03-30" },
  { id: "ORD-1004", customerName: "Sneha Reddy", phone: "+91 65432 10987", address: "23, Banjara Hills, Hyderabad", items: [{ productId: "alphonso", name: "Alphonso Mango", quantity: 1, price: 899 }], total: 899, status: "pending", paymentMethod: "cod", createdAt: "2026-03-31" },
  { id: "ORD-1005", customerName: "Vikram Singh", phone: "+91 54321 09876", address: "56, Civil Lines, Lucknow", items: [{ productId: "dasheri", name: "Dasheri Mango", quantity: 4, price: 449 }, { productId: "langra", name: "Langra Mango", quantity: 2, price: 399 }], total: 2594, status: "delivered", paymentMethod: "online", createdAt: "2026-03-25" },
  { id: "ORD-1006", customerName: "Anita Desai", phone: "+91 43210 98765", address: "89, Koregaon Park, Pune", items: [{ productId: "alphonso", name: "Alphonso Mango", quantity: 3, price: 899 }], total: 2697, status: "processing", paymentMethod: "online", createdAt: "2026-03-31" },
];

export const sampleCustomers: Customer[] = [
  { id: "CUST-001", name: "Rajesh Kumar", phone: "+91 98765 43210", email: "rajesh@email.com", address: "12, MG Road, Mumbai", totalOrders: 5, totalSpent: 8450, lastOrder: "2026-03-28" },
  { id: "CUST-002", name: "Priya Sharma", phone: "+91 87654 32109", email: "priya@email.com", address: "45, Jayanagar, Bangalore", totalOrders: 3, totalSpent: 4200, lastOrder: "2026-03-29" },
  { id: "CUST-003", name: "Amit Patel", phone: "+91 76543 21098", address: "78, Navrangpura, Ahmedabad", totalOrders: 7, totalSpent: 12300, lastOrder: "2026-03-30" },
  { id: "CUST-004", name: "Sneha Reddy", phone: "+91 65432 10987", email: "sneha@email.com", address: "23, Banjara Hills, Hyderabad", totalOrders: 2, totalSpent: 1798, lastOrder: "2026-03-31" },
  { id: "CUST-005", name: "Vikram Singh", phone: "+91 54321 09876", address: "56, Civil Lines, Lucknow", totalOrders: 8, totalSpent: 15600, lastOrder: "2026-03-25" },
  { id: "CUST-006", name: "Anita Desai", phone: "+91 43210 98765", email: "anita@email.com", address: "89, Koregaon Park, Pune", totalOrders: 4, totalSpent: 7890, lastOrder: "2026-03-31" },
];

export const revenueData = [
  { month: "Oct", revenue: 18500 },
  { month: "Nov", revenue: 22300 },
  { month: "Dec", revenue: 15800 },
  { month: "Jan", revenue: 28400 },
  { month: "Feb", revenue: 35200 },
  { month: "Mar", revenue: 42100 },
];

export const topProducts = products.map((p) => ({
  name: p.variety,
  sold: Math.floor(Math.random() * 200 + 50),
  revenue: Math.floor(Math.random() * 50000 + 10000),
})).sort((a, b) => b.revenue - a.revenue);
