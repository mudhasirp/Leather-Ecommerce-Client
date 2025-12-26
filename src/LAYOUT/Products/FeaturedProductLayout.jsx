"use client";

import { useEffect, useState } from "react";
import ProductCardFeatured from "@/Components/Cards/ProductFeaturedCard";
import { getUserProductsApi, addToCart } from "@/API/userAPI";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await getUserProductsApi();

        // support multiple response shapes
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
          ? data.products
          : [];

        // OPTIONAL: pick featured only (badge based)
        const featured = list.filter(
          (p) => Array.isArray(p.badges) && p.badges.includes("New")
        );

        // fallback if no badges
        const finalList = featured.length ? featured : list.slice(0, 8);

        if (mounted) setProducts(finalList);
      } catch (err) {
        console.error("Failed to load featured products:", err);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleAddToCart = async (product) => {
    try {
      // pick first unit variant by default
      const unit = product.unitVariants?.[0];
      if (!unit) return;

      await addToCart({
        productId: product._id,
        unitLabel: unit.label,
        qty: 1,
      });

      console.log("Added to cart:", product.name);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold font-sans text-green-700 mb-2">
            Featured Products
          </h2>
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No featured products
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCardFeatured
                key={product._id}
                id={product._id}
                name={product.name}
                slug={product.slug}
                image={product.mainImage}
                price={
                  product.unitVariants?.[0]
                    ? `₹${product.unitVariants[0].price}`
                    : "—"
                }
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
