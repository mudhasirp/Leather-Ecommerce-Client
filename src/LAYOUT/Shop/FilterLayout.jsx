
import { useEffect, useState } from "react";
import FilterSidebar from "@/Components/Shop/FilterBar";

export default function FilterLayout({ categories = [], onFilterChange }) {
  const [filters, setFilters] = useState({
    category: "all",
    sortBy: "new",
    search: "",
  });

  useEffect(() => {
    onFilterChange?.(filters);
  }, [filters]);

  return (
    <div className="flex w-full">

      <aside className="w-72 shrink-0 bg-white border-r">
          <FilterSidebar
            categories={[{ id: "all", name: "All Categories" }, ...categories]}
            sortOptions={[
              { label: "New Arrivals", value: "new" },
              { label: "Best Selling", value: "bestselling" },
              { label: "Price: Low to High", value: "price-asc" },
              { label: "Price: High to Low", value: "price-desc" },
            ]}
            filters={filters}
            setFilters={setFilters}
          />
      </aside>

    
      <main className="flex-1 p-4">
      </main>

    </div>
  );
}
