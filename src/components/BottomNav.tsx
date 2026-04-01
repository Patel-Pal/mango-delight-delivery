import { Home, Search, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/products", icon: Search, label: "Shop" },
  { to: "/cart", icon: ShoppingCart, label: "Cart" },
  { to: "/checkout", icon: User, label: "Account" },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 text-xs font-medium transition-colors ${
                active ? "text-mango-dark" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label === "Cart" && totalItems > 0 && (
                <span className="absolute -right-1 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-secondary-foreground">
                  {totalItems}
                </span>
              )}
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
