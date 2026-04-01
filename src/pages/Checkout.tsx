import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, CreditCard, Banknote } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  address: z.string().trim().min(10, "Please enter full address").max(500),
  city: z.string().trim().min(2, "City is required").max(100),
  pincode: z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});

type FormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [payment, setPayment] = useState<"cod" | "online">("cod");
  const [form, setForm] = useState<FormData>({ name: "", phone: "", address: "", city: "", pincode: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const delivery = totalPrice >= 999 ? 0 : 99;
  const total = totalPrice + delivery;

  if (items.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center pb-20">
        <h2 className="font-display text-2xl font-bold text-foreground">No items in cart</h2>
        <Link to="/products" className="mt-4 text-sm text-mango-dark hover:underline">← Browse mangoes</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof FormData;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const orderId = `MF${Date.now().toString(36).toUpperCase()}`;
    clearCart();
    navigate(`/order-confirmation?orderId=${orderId}&name=${encodeURIComponent(form.name)}`);
    toast.success("Order placed successfully!");
  };

  const updateField = (key: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  return (
    <div className="pb-20 md:pb-8">
      <div className="container py-6 md:py-10">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h1 className="font-display text-3xl font-bold text-foreground">Checkout</h1>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            {/* Delivery Details */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h2 className="font-display text-lg font-bold text-foreground">Delivery Details</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {(["name", "phone", "city", "pincode"] as const).map((key) => (
                  <div key={key}>
                    <label className="mb-1 block text-xs font-medium capitalize text-muted-foreground">{key}</label>
                    <input
                      type={key === "phone" ? "tel" : "text"}
                      value={form[key]}
                      onChange={(e) => updateField(key, e.target.value)}
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/20 ${errors[key] ? "border-destructive" : "border-border"}`}
                      placeholder={key === "phone" ? "10-digit number" : key === "pincode" ? "6-digit code" : ""}
                    />
                    {errors[key] && <p className="mt-1 text-xs text-destructive">{errors[key]}</p>}
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Full Address</label>
                  <textarea
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    rows={3}
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/20 ${errors.address ? "border-destructive" : "border-border"}`}
                  />
                  {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h2 className="font-display text-lg font-bold text-foreground">Payment Method</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPayment("cod")}
                  className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors ${payment === "cod" ? "border-primary bg-accent" : "border-border bg-card"}`}
                >
                  <Banknote className="h-5 w-5 text-foreground" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Cash on Delivery</p>
                    <p className="text-xs text-muted-foreground">Pay when you receive</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPayment("online")}
                  className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors ${payment === "online" ? "border-primary bg-accent" : "border-border bg-card"}`}
                >
                  <CreditCard className="h-5 w-5 text-foreground" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Online Payment</p>
                    <p className="text-xs text-muted-foreground">UPI, Card, Net Banking</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card lg:sticky lg:top-20 lg:self-start">
            <h3 className="font-display text-lg font-bold text-foreground">Order Summary</h3>
            <div className="mt-4 space-y-2">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{product.name} × {quantity}</span>
                  <span className="font-medium text-foreground">₹{product.price * quantity}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery</span>
                <span className={delivery === 0 ? "font-medium text-secondary" : ""}>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex justify-between text-base font-bold text-foreground">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-gradient-mango px-6 py-3 text-sm font-semibold text-primary-foreground shadow-mango transition-transform active:scale-95"
            >
              Place Order — ₹{total}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
