import mangoAlphonso from "@/assets/mango-alphonso.jpg";
import mangoKesar from "@/assets/mango-kesar.jpg";
import mangoBadami from "@/assets/mango-badami.jpg";
import mangoDasheri from "@/assets/mango-dasheri.jpg";
import mangoLangra from "@/assets/mango-langra.jpg";
import mangoTotapuri from "@/assets/mango-totapuri.jpg";

export interface Product {
  id: string;
  name: string;
  variety: string;
  price: number;
  originalPrice?: number;
  unit: string;
  description: string;
  longDescription: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  seasonal: boolean;
  origin: string;
}

export const products: Product[] = [
  {
    id: "alphonso",
    name: "Alphonso Mango",
    variety: "Alphonso",
    price: 899,
    originalPrice: 1099,
    unit: "per box (12 pcs)",
    description: "The king of mangoes — rich, creamy, and aromatic with a buttery texture.",
    longDescription: "Alphonso mangoes, also known as Hapus, are considered the king of mangoes. Grown in the Ratnagiri and Devgad regions of Maharashtra, these mangoes are renowned for their rich, creamy texture, vibrant saffron color, and non-fibrous sweet flesh. Each mango is handpicked at the perfect ripeness to ensure the best flavor.",
    image: mangoAlphonso,
    rating: 4.9,
    reviews: 342,
    inStock: true,
    featured: true,
    seasonal: true,
    origin: "Ratnagiri, Maharashtra",
  },
  {
    id: "kesar",
    name: "Kesar Mango",
    variety: "Kesar",
    price: 649,
    originalPrice: 799,
    unit: "per box (12 pcs)",
    description: "Saffron-hued sweetness from Gujarat — the queen of mangoes.",
    longDescription: "Kesar mangoes from Junagadh, Gujarat are known for their unique saffron-like aroma and deep orange flesh. These mangoes have a perfect balance of sweetness and tanginess, making them ideal for both eating fresh and making desserts like aamras and mango lassi.",
    image: mangoKesar,
    rating: 4.7,
    reviews: 218,
    inStock: true,
    featured: true,
    seasonal: true,
    origin: "Junagadh, Gujarat",
  },
  {
    id: "badami",
    name: "Badami Mango",
    variety: "Badami",
    price: 549,
    unit: "per box (12 pcs)",
    description: "Karnataka's pride — similar to Alphonso but with a unique taste.",
    longDescription: "Badami mangoes, also called Karnataka Alphonso, are oval-shaped with smooth golden-yellow skin. They have a sweet, rich flavor with subtle notes of honey. These mangoes are perfect for direct consumption and are known for their consistent quality throughout the season.",
    image: mangoBadami,
    rating: 4.5,
    reviews: 156,
    inStock: true,
    featured: false,
    seasonal: false,
    origin: "North Karnataka",
  },
  {
    id: "dasheri",
    name: "Dasheri Mango",
    variety: "Dasheri",
    price: 449,
    unit: "per kg",
    description: "Lucknow's finest — fibreless, sweet, and incredibly aromatic.",
    longDescription: "Dasheri mangoes originate from the Dasheri village near Lucknow and are one of the most popular varieties in North India. Known for their sweet, fibreless flesh and pleasant aroma, these mangoes have a thin skin and elongated shape. They are excellent for eating fresh.",
    image: mangoDasheri,
    rating: 4.6,
    reviews: 189,
    inStock: true,
    featured: true,
    seasonal: false,
    origin: "Lucknow, UP",
  },
  {
    id: "langra",
    name: "Langra Mango",
    variety: "Langra",
    price: 399,
    unit: "per kg",
    description: "The green gem of Varanasi — stays green even when ripe!",
    longDescription: "Langra mangoes are unique because they remain green even when fully ripe. Originating from Varanasi, these mangoes have a distinct sweet and tangy flavor with a strong aroma. The flesh is fibreless and juicy, making them a favorite for mango lovers who appreciate a complex flavor profile.",
    image: mangoLangra,
    rating: 4.4,
    reviews: 134,
    inStock: true,
    featured: false,
    seasonal: false,
    origin: "Varanasi, UP",
  },
  {
    id: "totapuri",
    name: "Totapuri Mango",
    variety: "Totapuri",
    price: 299,
    originalPrice: 399,
    unit: "per kg",
    description: "Parrot-beaked beauty — tangy-sweet, perfect for salads and juices.",
    longDescription: "Totapuri mangoes get their name from their distinctive parrot-beak shape. These mangoes have a unique tangy-sweet flavor that makes them versatile for both eating fresh and culinary uses. They are widely used in making pickles, chutneys, and mango pulp for industrial processing.",
    image: mangoTotapuri,
    rating: 4.3,
    reviews: 98,
    inStock: true,
    featured: false,
    seasonal: true,
    origin: "Andhra Pradesh",
  },
];
