import { Card, CardContent } from "@/components/ui/card";
import { sampleCustomers } from "@/data/adminData";
import { Phone, Mail, MapPin, ShoppingBag } from "lucide-react";

export default function Customers() {
  return (
    <div className="space-y-3 animate-fade-in">
      <p className="text-sm text-muted-foreground">{sampleCustomers.length} customers</p>

      {sampleCustomers.map((c) => (
        <Card key={c.id} className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-sm text-foreground">{c.name}</p>
                <div className="mt-1.5 space-y-1">
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3" /> {c.phone}
                  </p>
                  {c.email && (
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" /> {c.email}
                    </p>
                  )}
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
                    <MapPin className="h-3 w-3 shrink-0" /> {c.address}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ShoppingBag className="h-3 w-3" /> {c.totalOrders} orders
                </div>
                <p className="mt-1 font-display font-bold text-sm text-foreground">₹{c.totalSpent.toLocaleString()}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Last: {c.lastOrder}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
