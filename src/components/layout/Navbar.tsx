import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User, LogOut, Shield, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop All" },
    { to: "/products?category=jewellery", label: "Jewellery" },
    { to: "/products?category=kurtis", label: "Kurtis" },
    { to: "/products?category=sarees", label: "Sarees" },
    { to: "/products?category=tops", label: "Tops" },
  ];

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="gold-gradient text-primary-foreground text-center py-1.5 text-xs font-body tracking-widest uppercase">
        Free Shipping on Orders Above ₹1999
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground" aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="flex-shrink-0">
            <h1 className="font-display text-2xl md:text-3xl font-semibold tracking-wide text-foreground">
              <span className="text-gold">Shavana</span> Luxe
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} className="text-sm font-body uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-foreground hover:text-gold transition-colors" aria-label="Search">
              <Search size={20} />
            </button>

            {user ? (
              <>
                <Link to="/orders" className="hidden md:block text-foreground hover:text-gold transition-colors" title="My Orders">
                  <Package size={20} />
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="hidden md:block text-foreground hover:text-gold transition-colors" title="Admin">
                    <Shield size={20} />
                  </Link>
                )}
                <button onClick={handleSignOut} className="hidden md:block text-foreground hover:text-gold transition-colors" title="Sign Out">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <Link to="/login" className="hidden md:block text-foreground hover:text-gold transition-colors">
                <User size={20} />
              </Link>
            )}

            <Link to="/cart" className="relative text-foreground hover:text-gold transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-body font-medium">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-border overflow-hidden">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center gap-3">
                <Search size={18} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for jewellery, kurtis, sarees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && searchQuery.trim()) window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`; }}
                  className="flex-1 bg-transparent border-none outline-none font-body text-foreground placeholder:text-muted-foreground"
                  autoFocus
                />
                <button onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden border-t border-border overflow-hidden bg-background">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.to} onClick={() => setMobileOpen(false)} className="text-sm font-body uppercase tracking-wider text-muted-foreground hover:text-foreground py-2 border-b border-border">
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/orders" onClick={() => setMobileOpen(false)} className="text-sm font-body uppercase tracking-wider text-muted-foreground hover:text-foreground py-2 border-b border-border">My Orders</Link>
                  {isAdmin && <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-sm font-body uppercase tracking-wider text-muted-foreground hover:text-foreground py-2 border-b border-border">Admin Dashboard</Link>}
                  <button onClick={() => { handleSignOut(); setMobileOpen(false); }} className="text-sm font-body uppercase tracking-wider text-muted-foreground hover:text-foreground py-2 text-left">Sign Out</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-body uppercase tracking-wider text-muted-foreground hover:text-foreground py-2">Login / Register</Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
