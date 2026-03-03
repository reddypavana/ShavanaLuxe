import productNecklace1 from "@/assets/product-necklace1.png";
import productEarrings1 from "@/assets/product-earrings1.png";
import productKurti1 from "@/assets/product-kurti1.png";
import productSaree1 from "@/assets/product-saree1.png";
import productTop1 from "@/assets/product-top1.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Jewellery",
    slug: "jewellery",
    image: "",
    description: "Exquisite artificial jewellery for every occasion",
  },
  {
    id: "2",
    name: "Kurtis",
    slug: "kurtis",
    image: "",
    description: "Elegant embroidered kurtis for the modern woman",
  },
  {
    id: "3",
    name: "Sarees",
    slug: "sarees",
    image: "",
    description: "Timeless sarees with beautiful craftsmanship",
  },
  {
    id: "4",
    name: "Tops",
    slug: "tops",
    image: "",
    description: "Stylish western tops for casual and formal wear",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Royal Kundan Necklace Set",
    price: 2499,
    originalPrice: 3999,
    description: "A stunning kundan necklace set with matching earrings. Perfect for weddings and festive occasions. Crafted with premium artificial stones and gold-plated metal.",
    category: "jewellery",
    image: productNecklace1,
    stock: 15,
    rating: 4.8,
    reviews: 124,
    isBestseller: true,
  },
  {
    id: "p2",
    name: "Traditional Gold Jhumka Earrings",
    price: 899,
    originalPrice: 1499,
    description: "Classic gold-plated jhumka earrings with intricate filigree work. Lightweight and comfortable for all-day wear.",
    category: "jewellery",
    image: productEarrings1,
    stock: 30,
    rating: 4.6,
    reviews: 89,
    isNew: true,
  },
  {
    id: "p3",
    name: "Dusty Rose Embroidered Kurti",
    price: 1799,
    originalPrice: 2499,
    description: "A beautiful dusty rose kurti with delicate gold thread embroidery. Made with premium georgette fabric for a luxurious feel.",
    category: "kurtis",
    image: productKurti1,
    stock: 20,
    rating: 4.7,
    reviews: 56,
    isBestseller: true,
  },
  {
    id: "p4",
    name: "Maroon Banarasi Silk Saree",
    price: 4999,
    originalPrice: 7999,
    description: "An exquisite maroon banarasi silk saree with rich gold zari work. A timeless piece for special celebrations.",
    category: "sarees",
    image: productSaree1,
    stock: 8,
    rating: 4.9,
    reviews: 203,
    isBestseller: true,
  },
  {
    id: "p5",
    name: "Olive Green Casual Top",
    price: 999,
    originalPrice: 1299,
    description: "A chic olive green button-down top in soft cotton blend. Perfect for casual outings and office wear.",
    category: "tops",
    image: productTop1,
    stock: 25,
    rating: 4.4,
    reviews: 42,
    isNew: true,
  },
  {
    id: "p6",
    name: "Pearl Drop Choker Set",
    price: 1599,
    originalPrice: 2299,
    description: "Elegant pearl drop choker with matching drop earrings. Ideal for both traditional and western outfits.",
    category: "jewellery",
    image: productNecklace1,
    stock: 18,
    rating: 4.5,
    reviews: 67,
  },
  {
    id: "p7",
    name: "Navy Blue Anarkali Kurti",
    price: 2199,
    originalPrice: 2999,
    description: "A stunning navy blue anarkali kurti with silver zari embroidery. Flared silhouette with a flattering fit.",
    category: "kurtis",
    image: productKurti1,
    stock: 12,
    rating: 4.6,
    reviews: 34,
    isNew: true,
  },
  {
    id: "p8",
    name: "Cream Chiffon Saree",
    price: 3499,
    originalPrice: 4999,
    description: "A graceful cream chiffon saree with delicate gold border embroidery. Light and elegant for every occasion.",
    category: "sarees",
    image: productSaree1,
    stock: 10,
    rating: 4.7,
    reviews: 91,
  },
];

export const getProductsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);

export const searchProducts = (query: string) =>
  products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

export const filterByPrice = (min: number, max: number) =>
  products.filter((p) => p.price >= min && p.price <= max);
