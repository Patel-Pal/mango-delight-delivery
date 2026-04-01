import { IndianRupee, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { sampleOrders, sampleCustomers, revenueData, topProducts } from "@/data/adminData";

const COLORS = [
  "hsl(45 100% 55%)",
  "hsl(122 39% 49%)",
  "hsl(38 100% 42%)",
  "hsl(122 39% 35%)",
  "hsl(30 50% 60%)",
  "hsl(45 100% 70%)",
];

const stats = [
  { label: "Total Revenue", value: `₹${sampleOrders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, icon: IndianRupee, color: "text-leaf" },
  { label: "Total Orders", value: sampleOrders.length, icon: ShoppingBag, color: "text-mango-dark" },
  { label: "Customers", value: sampleCustomers.length, icon: Users, color: "text-secondary" },
  { label: "Avg Order", value: `₹${Math.round(sampleOrders.reduce((s, o) => s + o.total, 0) / sampleOrders.length).toLocaleString()}`, icon: TrendingUp, color: "text-leaf-dark" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-lg bg-muted p-2">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="font-display text-lg font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-body font-semibold text-foreground">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(30 5% 45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(30 5% 45%)" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
                <Bar dataKey="revenue" fill="hsl(45 100% 55%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products Pie */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-body font-semibold text-foreground">Top Products by Revenue</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={topProducts} dataKey="revenue" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name }) => name}>
                  {topProducts.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-body font-semibold text-foreground">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-2 pr-4">Order ID</th>
                <th className="pb-2 pr-4">Customer</th>
                <th className="pb-2 pr-4">Total</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleOrders.slice(0, 5).map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-foreground">{o.id}</td>
                  <td className="py-2.5 pr-4 text-muted-foreground">{o.customerName}</td>
                  <td className="py-2.5 pr-4 font-medium text-foreground">₹{o.total.toLocaleString()}</td>
                  <td className="py-2.5">
                    <StatusBadge status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-primary/15 text-mango-dark",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-accent text-accent-foreground",
    delivered: "bg-secondary/15 text-leaf-dark",
    cancelled: "bg-destructive/15 text-destructive",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status] ?? ""}`}>
      {status}
    </span>
  );
}
