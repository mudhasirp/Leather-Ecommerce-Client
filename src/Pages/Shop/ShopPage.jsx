"use client";

import { useEffect, useMemo, useState } from "react";
import HeaderLayout from "@/Layout/Header/HeaderLayout";
import FilterLayout from "@/Layout/Shop/FilterLayout";
import ProductGrid from "@/Layout/Products/ProductGridShop";
import Footer from "@/Layout/Footer/FooterLayout";
import { getUserProductsApi } from "@/API/userAPI";
import { getCategoriesApi } from "@/API/adminApi";

export default function ShopPage() {
  const [filters, setFilters] = useState({
    category: "all",
    sortBy: "new",
    search: "",
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products & categories
  useEffect(() => {
    (async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          getUserProductsApi(),
          getCategoriesApi(),
        ]);

        const productsData = prodRes?.products ?? prodRes ?? [];
        const categoriesData = (catRes?.categories ?? catRes ?? []).map((c) => ({
          id: String(c._id ?? c.id),
          name: c.name,
        }));

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error loading shop data:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔍 Filtering logic
  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (filters.category !== "all") {
      data = data.filter(
        (p) =>
          String(p.category?._id ?? p.category) ===
          String(filters.category)
      );
    }

    if (filters.sortBy === "price-asc") {
      data.sort((a, b) => a.unitVariants[0].price - b.unitVariants[0].price);
    }

    if (filters.sortBy === "price-desc") {
      data.sort((a, b) => b.unitVariants[0].price - a.unitVariants[0].price);
    }

    return data;
  }, [products, filters]);

  return (
    <>
      <HeaderLayout />

<div className="flex">
  {/* LEFT SIDEBAR – FULL HEIGHT, LEFT EDGE */}
  <aside className="w-72 border-r bg-white">
    <FilterLayout
      categories={categories}
      onFilterChange={setFilters}
    />
  </aside>

  {/* RIGHT CONTENT (centered) */}
  <div className="flex-1">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          Loading...
        </div>
      ) : (
        <ProductGrid
          products={filteredProducts}
          onLoadMore={() => {}}
        />
      )}
    </div>
  </div>
</div>

<Footer />

    </>
  );
}
