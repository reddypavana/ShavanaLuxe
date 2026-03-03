import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl font-semibold mb-4">
              <span className="text-gold">Shavana</span> Luxe
            </h3>
            <p className="text-sm opacity-70 font-body leading-relaxed">
              Premium yet affordable fashion — exquisite artificial jewellery and trendy women's clothing crafted for the modern Indian woman.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/products?category=jewellery", label: "Jewellery" },
                { to: "/products?category=kurtis", label: "Kurtis" },
                { to: "/products?category=sarees", label: "Sarees" },
                { to: "/products?category=tops", label: "Tops" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm font-body opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm font-body opacity-70">
              <li>Shipping & Delivery</li>
              <li>Returns & Exchanges</li>
              <li>Contact Us</li>
              <li>FAQs</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-sm font-body opacity-70">
              <li>support@shavanaluxe.com</li>
              <li>+91 98765 43210</li>
              <li>Mon - Sat: 10AM - 7PM IST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-sm font-body opacity-50">
            © 2026 Shavana Luxe. All rights reserved. Made with ♥ in India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
