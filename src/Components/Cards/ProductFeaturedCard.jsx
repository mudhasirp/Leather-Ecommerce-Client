import { Link } from "react-router-dom";

export default function ProductCardFeatured({ id, name, price, image, onAddToCart ,slug}) {
  return (
    <div className="group animate-fade-in relative">
      
      {/* CARD CLICK → PRODUCT PAGE */}
      <Link to={`/product/${slug}`} className="block">
        <div className="relative overflow-hidden rounded-xl bg-background mb-3 aspect-[1/1]">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-medium text-foreground">
            {name}
          </h3>
          <p className="text-green-700 font-semibold text-sm">
            ₹{price}
          </p>
        </div>
      </Link>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();   // ⛔ stop navigation
          e.preventDefault();
          onAddToCart?.(id);
        }}
        className="absolute bottom-3 right-3 w-9 h-9 bg-primary/90 hover:bg-primary 
                   text-primary-foreground rounded-full flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
