import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center pb-20">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="mt-4 font-display text-2xl font-bold text-foreground">Your cart is empty</h2>
        <p className="mt-2 text-sm text-muted-foreground">Add some delicious mangoes to get started!</p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-mango px-6 py-3 text-sm font-semibold text-primary-foreground shadow-mango"
        >
          Browse Mangoes <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-8">
      <div className="container py-6 md:py-10">
        <h1 className="font-display text-3xl font-bold text-foreground">Your Cart</h1>
        <p className="mt-1 text-sm text-muted-foreground">{totalItems} item{totalItems > 1 ? "s" : ""}</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Items */}
          <div className="space-y-3 lg:col-span-2">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 rounded-2xl border border-border bg-card p-3 shadow-card md:p-4">
                <Link to={`/product/${product.id}`} className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-muted md:h-24 md:w-24">
                  <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground md:text-base">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.unit}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-border">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="flex h-8 w-8 items-center justify-center text-foreground">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold text-foreground">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="flex h-8 w-8 items-center justify-center text-foreground">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-foreground">₹{product.price * quantity}</span>
                    <button onClick={() => removeFromCart(product.id)} className="rounded-full p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card lg:sticky lg:top-20 lg:self-start">
            <h3 className="font-display text-lg font-bold text-foreground">Order Summary</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span className={totalPrice >= 999 ? "text-secondary font-medium" : ""}>
                  {totalPrice >= 999 ? "FREE" : "₹99"}
                </span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex justify-between text-base font-bold text-foreground">
                  <span>Total</span>
                  <span>₹{totalPrice + (totalPrice >= 999 ? 0 : 99)}</span>
                </div>
              </div>
            </div>
            {totalPrice < 999 && (
              <p className="mt-3 text-xs text-muted-foreground">Add ₹{999 - totalPrice} more for free delivery!</p>
            )}
            <Link
              to="/checkout"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-mango px-6 py-3 text-sm font-semibold text-primary-foreground shadow-mango transition-transform active:scale-95"
            >
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
