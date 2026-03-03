import { Link } from "react-router-dom";
import { ShoppingBag, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative aspect-square overflow-hidden rounded-sm bg-secondary mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-foreground text-background text-[10px] uppercase tracking-widest font-body px-2.5 py-1">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="gold-gradient text-primary-foreground text-[10px] uppercase tracking-widest font-body px-2.5 py-1">
                Bestseller
              </span>
            )}
            {discount > 0 && (
              <span className="bg-destructive text-destructive-foreground text-[10px] uppercase tracking-widest font-body px-2.5 py-1">
                {discount}% Off
              </span>
            )}
          </div>

          {/* Quick add */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 bg-foreground text-background p-2.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary"
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-body uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
          <h3 className="font-display text-lg font-medium text-foreground leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-gold text-gold" />
            <span className="text-xs font-body text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="font-body font-semibold text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="font-body text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
