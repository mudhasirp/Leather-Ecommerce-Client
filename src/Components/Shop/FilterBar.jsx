"use client";

import { Search } from "lucide-react";

export default function FilterSidebar({
  categories,
  sortOptions,
  filters,
  setFilters,
}) {
  return (
    <aside
      className="
        w-full
        lg:w-72
        shrink-0
        bg-white
        border border-border
        rounded-2xl
        p-5
        space-y-6
        lg:sticky lg:top-24
        h-fit
      "
    >
      {/* SEARCH */}
      <div className="bg-white rounded-2xl border border-border p-5 space-y-6">

        <label className="block text-sm font-medium text-foreground mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) =>
              setFilters((p) => ({ ...p, search: e.target.value }))
            }
            placeholder="Search products"
            className="
              w-full pl-9 pr-3 py-2
              rounded-lg border border-border
              text-sm
              focus:outline-none focus:ring-2 focus:ring-green-200
            "
          />
        </div>
      </div>

      {/* CATEGORIES */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Categories
        </h4>

        <div className="flex flex-col gap-1 max-h-[240px] overflow-y-auto pr-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setFilters((p) => ({ ...p, category: cat.id }))
              }
              className={`text-left px-3 py-2 rounded-lg text-sm transition
                ${
                  filters.category === cat.id
                    ? "bg-green-100 text-green-800 font-medium"
                    : "hover:bg-muted text-muted-foreground"
                }
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* SORT */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            setFilters((p) => ({ ...p, sortBy: e.target.value }))
          }
          className="
            w-full border border-border
            rounded-lg px-3 py-2
            text-sm
            focus:outline-none focus:ring-2 focus:ring-green-200
          "
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
