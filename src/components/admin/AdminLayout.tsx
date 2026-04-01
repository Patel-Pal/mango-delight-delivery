import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Package, Users, ArrowLeft, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Customers", path: "/admin/customers", icon: Users },
];

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-200 md:static md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <span className="font-display text-lg font-bold text-foreground">
            Mango<span className="text-mango-dark">Fresh</span>
            <span className="ml-1 text-xs font-body font-medium text-muted-foreground">Admin</span>
          </span>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4", active && "text-mango-dark")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-md md:px-6">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden">
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="font-display text-lg font-semibold text-foreground">
            {navItems.find((i) => i.path === location.pathname)?.label ?? "Admin"}
          </h1>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
