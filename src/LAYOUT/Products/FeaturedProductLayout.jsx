
import { useEffect, useState } from "react";
import ProductCardFeatured from "@/Components/Cards/ProductFeaturedCard";
import { getUserProductsApi, addToCart } from "@/API/userAPI";
import { toast } from "sonner";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await getUserProductsApi();

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : [];

        const featured = list.filter(
          (p) => Array.isArray(p.badges) && p.badges.includes("New")
        );

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
const getAvailableVariant = (product) => {
  if (!product?.unitVariants?.length) return null;

  return product.unitVariants.find(v => v.stock > 0) || null;
};

  const handleAddToCart = async ({ id, qty , weight }) => {
    try {
      const product = products.find(p => p._id === id);
       const unit=product.unitVariants.find((u)=>u.weightInGrams===weight)
      console.log("sending", id, qty,weight)
      

             await addToCart({
          productId: id,
          unitLabel: unit.label,
          qty,
        });

      toast.success("Added to cart");
    } catch (error) {
      console.log(error)
      toast.error("Only the previously selected stocks are available");
    }
  };



  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold font-sans text-green-700 mb-2">
            Featured Products
          </h2>
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />
        </div>

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
           {products.map((product) => {
  const variant = getAvailableVariant(product);

  return (
    <ProductCardFeatured
      key={product._id}
      id={product._id}
      name={product.name}
      slug={product.slug}
      image={product.mainImage}
      price={variant ? variant.price : 0}
      weight={variant ? variant.weightInGrams : 0}
      quantity={variant ? variant.stock : 0}
      onAddToCart={handleAddToCart}
    />
  );
})}

          </div>
        )}
      </div>
    </section>
  );
}
