import { ArrowRight, Truck, Shield, Leaf, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-mangoes.jpg";

const features = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above ₹999" },
  { icon: Shield, title: "100% Fresh", desc: "Farm to door in 24hrs" },
  { icon: Leaf, title: "Organic", desc: "No chemicals used" },
  { icon: Star, title: "Premium Quality", desc: "Hand-picked mangoes" },
];

const reviews = [
  { name: "Priya S.", text: "Best Alphonso mangoes I've ever had! So fresh and sweet.", rating: 5 },
  { name: "Rahul M.", text: "Delivery was super fast. Mangoes were perfectly ripe.", rating: 5 },
  { name: "Anita K.", text: "The Kesar mangoes are absolutely divine. Will order again!", rating: 4 },
];

export default function Index() {
  const featured = products.filter((p) => p.featured);
  const seasonal = products.filter((p) => p.seasonal);

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container relative z-10 flex flex-col items-center py-12 text-center md:py-24">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-mango-light px-4 py-1.5 text-xs font-semibold text-mango-dark">
            <Leaf className="h-3.5 w-3.5" /> Season 2026 — Now Live
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
            Fresh Mangoes
            <br />
            <span className="text-gradient-mango">Delivered to Your Doorstep</span>
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">
            Hand-picked, farm-fresh premium mangoes from India's finest orchards. Taste the sunshine.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-mango px-6 py-3 text-sm font-semibold text-primary-foreground shadow-mango transition-transform hover:scale-105 active:scale-95"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="container mt-2 overflow-hidden rounded-2xl md:mt-0">
          <img
            src={heroImage}
            alt="Fresh farm mangoes"
            width={1920}
            height={1080}
            className="w-full rounded-2xl object-cover shadow-card"
            style={{ maxHeight: 400 }}
          />
        </div>
      </section>

      {/* Features */}
      <section className="container py-10 md:py-16">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-4 text-center shadow-card transition-shadow hover:shadow-mango md:p-6"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-mango-light">
                <f.icon className="h-5 w-5 text-mango-dark" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container py-6 md:py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Featured Varieties</h2>
            <p className="mt-1 text-sm text-muted-foreground">Our most loved mangoes this season</p>
          </div>
          <Link to="/products" className="text-sm font-medium text-mango-dark hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {featured.map((p, i) => (
            <div key={p.id} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Banner */}
      <section className="container py-6 md:py-12">
        <div className="overflow-hidden rounded-2xl bg-gradient-mango p-6 text-center md:p-12">
          <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-4xl">
            🥭 Seasonal Specials
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            Limited time offers on the best seasonal mangoes — up to 25% off!
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-card transition-transform hover:scale-105"
          >
            Grab the Deal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="container py-6 md:py-12">
        <h2 className="mb-6 font-display text-2xl font-bold text-foreground md:text-3xl">What Customers Say</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="mb-2 flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground">"{r.text}"</p>
              <p className="mt-3 text-xs font-semibold text-muted-foreground">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 py-8">
        <div className="container text-center">
          <p className="font-display text-lg font-bold text-foreground">
            Mango<span className="text-mango-dark">Fresh</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">© 2026 MangoFresh. Farm-fresh mangoes delivered with love.</p>
        </div>
      </footer>
    </div>
  );
}
