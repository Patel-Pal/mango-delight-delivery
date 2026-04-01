import { ShoppingCart, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between md:h-16">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-leaf" />
          <span className="font-display text-lg font-bold tracking-tight text-foreground md:text-xl">
            Mango<span className="text-mango-dark">Fresh</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Shop
          </Link>
        </nav>

        <Link to="/cart" className="relative rounded-full p-2 transition-colors hover:bg-muted">
          <ShoppingCart className="h-5 w-5 text-foreground" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground animate-cart-bounce">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
