import { useState, useMemo } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal } from "lucide-react";

type SortOption = "default" | "price-asc" | "price-desc" | "rating";
const varieties = ["All", ...Array.from(new Set(products.map((p) => p.variety)))];

export default function Products() {
  const [variety, setVariety] = useState("All");
  const [sort, setSort] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = variety === "All" ? [...products] : products.filter((p) => p.variety === variety);
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [variety, sort]);

  return (
    <div className="pb-20 md:pb-8">
      <div className="container py-6 md:py-10">
        <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">Our Mangoes</h1>
        <p className="mt-1 text-sm text-muted-foreground">Browse our premium collection of farm-fresh mangoes</p>

        {/* Filter toggle (mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mt-4 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground md:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>

        {/* Filters */}
        <div className={`mt-4 flex flex-wrap gap-3 ${showFilters ? "flex" : "hidden md:flex"}`}>
          <div className="flex flex-wrap gap-2">
            {varieties.map((v) => (
              <button
                key={v}
                onClick={() => setVariety(v)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  variety === v
                    ? "bg-primary text-primary-foreground shadow-mango"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground outline-none"
          >
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {filtered.map((p, i) => (
            <div key={p.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">No mangoes found for this filter.</p>
        )}
      </div>
    </div>
  );
}
