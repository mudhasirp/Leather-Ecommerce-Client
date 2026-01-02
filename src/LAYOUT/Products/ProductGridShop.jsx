
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/Components/Cards/ProductCard";
import { toast } from "sonner";
import { addToCart } from "@/API/userAPI";

export default function ProductGrid({ products = [], displayCount = 8 }) {
  const visibleProducts = products.slice(0, displayCount);
  
const handleAddToCart = async ({ _id, qty,weight }) => {

  const product = products.find(p => p._id === _id);
  console.log(product)
  if (!product) return;
    
  const unit = product.unitVariants.find((u)=>u.weightInGrams===weight)
  console.log(unit)

  await addToCart({
    productId: _id,
    unitLabel: unit.label,
    qty,
  });

  toast.success("Added to cart");
};
const getAvailableVariant = (product) => {
  if (!product?.unitVariants?.length) return null;

  return product.unitVariants.find(v => v.stock > 0) || null;
};


  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        className="
          grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-4
          md:gap-6
        "
      >
        {visibleProducts.map((product, index) => {
  const variant = getAvailableVariant(product); 
  console.log("variant",variant)

  return (
    <motion.div
      key={product._id}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
        delay: index * 0.03,
      }}
    >
      <ProductCard
        product={{
          _id: product._id,
          name: product.name,
          slug: product.slug,
          image: product.mainImage,

          price: variant ? variant.price : 0,
          unitLabel: variant ? variant.label : "",
          stock: variant ? variant.stock : 0,
          weight: variant ? variant.weightInGrams : 0,
        }}
        onAddToCart={handleAddToCart}
      />
    </motion.div>
  );
})}

      </motion.div>
    </AnimatePresence>
  );
}
