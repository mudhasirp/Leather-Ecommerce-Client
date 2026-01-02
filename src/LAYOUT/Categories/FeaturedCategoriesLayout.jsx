
import React, { useEffect, useState } from "react";
import CategoryCard from "@/Components/Cards/CategoryCard";
import { getUserCategories } from "@/API/userAPI";

export default function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await getUserCategories();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.categories)
          ? data.categories
          : data?.data?.categories || [];

        if (!mounted) return;

        setCategories(
          list.map((c) => ({
            id: c._id ?? c.id,
            name: c.name,
            image: c.image || c.icon || "/placeholder-category.png",
          }))
        );
      } catch (err) {
        console.error("Failed to load categories:", err);
        if (mounted) setCategories([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-sans text-green-700 font-semibold ">
            Featured Categories
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-14 bg-green-500 rounded" />
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No categories available
          </div>
        ) : (
          <div
  className="
    grid
    grid-cols-2
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    gap-4
  "
>
  {categories.map((category) => (
    <CategoryCard
      key={category.id}
      id={category.id}
      name={category.name}
      image={category.image}
    />
  ))}
</div>

        )}
      </div>
    </section>
  );
}
