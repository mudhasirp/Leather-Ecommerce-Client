export default function FilterSidebar({ categories, filters, setFilters, onClose }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium">Search</label>
        <input
          type="text"
          placeholder="Search products"
          value={filters.search}
          onChange={(e) => {
            setFilters((p) => ({ ...p, search: e.target.value }));
            onClose();
          }}
          className="mt-2 w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <h4 className="font-sans  font-semibold mb-2">Categories</h4>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat.id}
              onClick={() => {
                setFilters((p) => ({ ...p, category: cat.id }));
                onClose();
              }}
              className={`cursor-pointer px-3 py-2 font-sans font-medium rounded-md ${
                filters.category === cat.id
                  ? "bg-green-100 text-green-700"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label className=" font-sans font-medium">Sort By</label>
        <select
          className="w-full mt-2 border rounded-md p-2 font-sans font-medium"
          value={filters.sortBy}
          onChange={(e) => {
            setFilters((p) => ({ ...p, sortBy: e.target.value }));
            onClose();
          }}
        >
          <option value="new">New Arrivals</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>
    </div>
  );
}
