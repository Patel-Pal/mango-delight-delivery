import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Minus, Plus, ShoppingCart, Star, MapPin, Check } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">Product not found</h2>
        <Link to="/products" className="mt-4 text-sm text-mango-dark hover:underline">← Back to shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${qty} × ${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate("/checkout");
  };

  return (
    <div className="pb-20 md:pb-8">
      <div className="container py-4 md:py-8">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl border border-border bg-muted">
            <img src={product.image} alt={product.name} width={512} height={512} className="h-full w-full object-cover" />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {product.seasonal && (
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Seasonal</span>
              )}
              {product.originalPrice && (
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <h1 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">{product.name}</h1>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {product.origin}
            </div>

            <div className="mt-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
                )}
              </div>
              <span className="text-sm text-muted-foreground">{product.unit}</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.longDescription}</p>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-secondary">
              <Check className="h-4 w-4" /> {product.inStock ? "In Stock — Ready to ship" : "Out of Stock"}
            </div>

            {/* Qty */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">Qty:</span>
              <div className="flex items-center rounded-full border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-10 w-10 items-center justify-center rounded-l-full text-foreground hover:bg-muted">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-foreground">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="flex h-10 w-10 items-center justify-center rounded-r-full text-foreground hover:bg-muted">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-primary bg-card px-6 py-3 text-sm font-semibold text-foreground transition-transform active:scale-95"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-mango px-6 py-3 text-sm font-semibold text-primary-foreground shadow-mango transition-transform active:scale-95"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
