import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export default function OrderConfirmation() {
  const [params] = useSearchParams();
  const orderId = params.get("orderId") || "MF000";
  const name = params.get("name") || "Customer";

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center pb-20 text-center md:pb-8">
      <div className="animate-scale-in">
        <CheckCircle className="mx-auto h-20 w-20 text-secondary" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-bold text-foreground md:text-4xl">Order Confirmed! 🎉</h1>
      <p className="mt-2 text-muted-foreground">
        Thank you, <span className="font-semibold text-foreground">{name}</span>!
      </p>

      <div className="mt-6 w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4" /> Order ID
        </div>
        <p className="mt-1 font-mono text-xl font-bold text-foreground">{orderId}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Your fresh mangoes will be delivered within <span className="font-semibold text-foreground">24-48 hours</span>. We'll send you tracking details via SMS.
        </p>
      </div>

      <Link
        to="/products"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-mango px-6 py-3 text-sm font-semibold text-primary-foreground shadow-mango transition-transform hover:scale-105"
      >
        Continue Shopping <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
