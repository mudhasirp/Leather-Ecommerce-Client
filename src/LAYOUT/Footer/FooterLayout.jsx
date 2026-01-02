import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-foreground/5 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="space-y-4">
            <h3 className="font-sans text-2xl font-light text-green-600">FM</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Freshness you can see. Quality you can taste.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm tracking-widest text-foreground font-light uppercase">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors font-light">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-sm text-muted-foreground hover:text-accent transition-colors font-light">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-sm text-muted-foreground hover:text-accent transition-colors font-light">Returns</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-accent transition-colors font-light">FAQ</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm tracking-widest text-foreground font-light uppercase">About</h4>
            <ul className="space-y-2">
              <li><Link to="/story" className="text-sm text-muted-foreground hover:text-accent transition-colors font-light">Our Story</Link></li>
              <li><Link to="/craftsmanship" className="text-sm text-muted-foreground hover:text-accent transition-colors font-light">Craftsmanship</Link></li>
              <li><Link to="/sustainability" className="text-sm text-muted-foreground hover:text-accent transition-colors font-light">Sustainability</Link></li>
              <li><Link to="/careers" className="text-sm text-muted-foreground hover:text-accent transition-colors font-light">Careers</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm tracking-widest text-foreground font-light uppercase">Policies</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-accent transition-colors font-light">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-accent transition-colors font-light">Terms of Service</Link></li>
              <li><Link to="/shipping-policy" className="text-sm text-muted-foreground hover:text-accent transition-colors font-light">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-sm text-muted-foreground hover:text-accent transition-colors font-light">Returns</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 space-y-6">
          <div className="flex gap-6 justify-start">
          </div>

          <p className="text-xs text-muted-foreground font-light tracking-widest">
            © 2025 Fresh Mart — All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
