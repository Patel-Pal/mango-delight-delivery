import { useState } from "react";
import { products as initialProducts, Product } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminProducts() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSave = (product: Product) => {
    if (editing) {
      setProductList((prev) => prev.map((p) => (p.id === product.id ? product : p)));
      toast.success("Product updated");
    } else {
      setProductList((prev) => [...prev, product]);
      toast.success("Product added");
    }
    setEditing(null);
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{productList.length} products</p>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditing(null); }}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display">{editing ? "Edit Product" : "New Product"}</DialogTitle>
            </DialogHeader>
            <ProductForm product={editing} onSave={handleSave} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {productList.map((product) => (
          <Card key={product.id} className="shadow-card">
            <CardContent className="flex items-center gap-4 p-3">
              <img src={product.image} alt={product.name} className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.origin}</p>
                <p className="mt-0.5 font-display font-bold text-sm text-foreground">₹{product.price} <span className="text-xs font-body font-normal text-muted-foreground">/ {product.unit}</span></p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditing(product); setDialogOpen(true); }}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(product.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProductForm({ product, onSave }: { product: Product | null; onSave: (p: Product) => void }) {
  const [form, setForm] = useState({
    name: product?.name ?? "",
    variety: product?.variety ?? "",
    price: product?.price?.toString() ?? "",
    unit: product?.unit ?? "per box (12 pcs)",
    description: product?.description ?? "",
    origin: product?.origin ?? "",
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: product?.id ?? form.variety.toLowerCase().replace(/\s+/g, "-"),
      name: form.name,
      variety: form.variety,
      price: Number(form.price),
      unit: form.unit,
      description: form.description,
      longDescription: product?.longDescription ?? form.description,
      image: product?.image ?? "/placeholder.svg",
      rating: product?.rating ?? 4.0,
      reviews: product?.reviews ?? 0,
      inStock: form.inStock,
      featured: form.featured,
      seasonal: product?.seasonal ?? false,
      origin: form.origin,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Name</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Variety</Label>
          <Input value={form.variety} onChange={(e) => setForm({ ...form, variety: e.target.value })} required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Price (₹)</Label>
          <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Unit</Label>
          <Input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Origin</Label>
        <Input value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Description</Label>
        <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Switch checked={form.inStock} onCheckedChange={(v) => setForm({ ...form, inStock: v })} />
          <Label className="text-xs">In Stock</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
          <Label className="text-xs">Featured</Label>
        </div>
      </div>
      <Button type="submit" className="w-full">{product ? "Update" : "Add"} Product</Button>
    </form>
  );
}
