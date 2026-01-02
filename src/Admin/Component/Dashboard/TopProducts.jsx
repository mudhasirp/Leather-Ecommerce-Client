export default function TopProducts({ products =[]}) {
  return (
        <div className="bg-white md:rounded-2xl border p-4  mx-auto rounded-sm s">

      <h3 className="font-semibold text-lg mb-4">Top Products</h3>

      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p._id}
            className=" flex items-center md:justify-between gap-3 p-1 md:p-3 md:rounded-lg hover:bg-gray-50 transition"
          >
            <p className="text-sm font-medium truncate max-w-[65%]">
              {p.name}
            </p>

            <span className="text-sm font-semibold text-emerald-600 whitespace-nowrap mr-2">
              ₹{p.revenue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
