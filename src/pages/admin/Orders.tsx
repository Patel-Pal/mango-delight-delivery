import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sampleOrders, Order } from "@/data/adminData";
import { Badge } from "@/components/ui/badge";

const statusOptions = ["all", "pending", "processing", "shipped", "delivered", "cancelled"] as const;

const statusColors: Record<string, string> = {
  pending: "bg-primary/15 text-mango-dark border-transparent",
  processing: "bg-blue-100 text-blue-700 border-transparent",
  shipped: "bg-accent text-accent-foreground border-transparent",
  delivered: "bg-secondary/15 text-leaf-dark border-transparent",
  cancelled: "bg-destructive/15 text-destructive border-transparent",
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const updateStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filtered.length} orders</p>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((order) => (
          <Card key={order.id} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-foreground text-sm">{order.id}</span>
                    <Badge variant="outline" className={statusColors[order.status] + " text-xs capitalize"}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{order.customerName}</p>
                  <p className="text-xs text-muted-foreground">{order.phone}</p>
                  <p className="mt-1 text-xs text-muted-foreground truncate">{order.address}</p>
                  <div className="mt-2 space-y-0.5">
                    {order.items.map((item, i) => (
                      <p key={i} className="text-xs text-muted-foreground">
                        {item.quantity}x {item.name} — ₹{(item.quantity * item.price).toLocaleString()}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display font-bold text-foreground">₹{order.total.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground capitalize">{order.paymentMethod === "cod" ? "COD" : "Online"}</p>
                  <p className="text-xs text-muted-foreground">{order.createdAt}</p>
                </div>
              </div>

              {order.status !== "delivered" && order.status !== "cancelled" && (
                <div className="mt-3 flex gap-2">
                  <Select value={order.status} onValueChange={(v) => updateStatus(order.id, v as Order["status"])}>
                    <SelectTrigger className="h-8 w-32 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.filter((s) => s !== "all").map((s) => (
                        <SelectItem key={s} value={s} className="capitalize text-xs">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
