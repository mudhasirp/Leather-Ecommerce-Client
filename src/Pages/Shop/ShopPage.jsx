

import { useEffect, useMemo, useState } from "react";
import HeaderLayout from "@/Layout/Header/HeaderLayout";
import Footer from "@/Layout/Footer/FooterLayout";
import FilterSidebar from "@/Components/Shop/FilterBar";
import ProductGrid from "@/Layout/Products/ProductGridShop";
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
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    (async () => {
      const [prodRes, catRes] = await Promise.all([
        getUserProductsApi(),
        getCategoriesApi(),
      ]);

      setProducts(prodRes?.products || []);
      setCategories(
        (catRes?.categories || []).map((c) => ({
          id: c._id,
          name: c.name,
        }))
      );
    })();
  }, []);

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (filters.search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category !== "all") {
      data = data.filter(
        (p) => String(p.category?._id) === String(filters.category)
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

      <button
        onClick={() => setShowFilter(true)}
        className="fixed bottom-5 right-5 z-50 bg-black text-white px-4 py-3 rounded-full md:hidden"
      >
        Filter
      </button>

      {showFilter && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setShowFilter(false)}
        />
      )}

      <div className="flex min-h-screen">
        <aside
          className={`fixed md:static top-0 left-0 z-50 h-full w-72 bg-white border-r transition-transform duration-300
          ${showFilter ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center md:hidden mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setShowFilter(false)}>✕</button>
            </div>

            <FilterSidebar
              categories={[{ id: "all", name: "All Categories" }, ...categories]}
              filters={filters}
              setFilters={setFilters}
                onClose={() => setShowFilter(false)}

            />
          </div>
        </aside>

        <main className="flex-1 px-4 md:px-8 py-8">
          <ProductGrid products={filteredProducts} />
        </main>
      </div>

      <Footer />
    </>
  );
}
