"use client";

import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/Components/Cards/ProductCard";

export default function ProductGrid({ products = [], displayCount = 8 }) {
  const visibleProducts = products.slice(0, displayCount);

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
        {visibleProducts.map((product, index) => (
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
                id: product._id,
                name: product.name,
                price: product.unitVariants?.[0]?.price ?? 0,
                unitLabel: product.unitVariants?.[0]?.label ?? "",
                image: product.mainImage,
                slug: product.slug,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
