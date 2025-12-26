export default function TopProducts({ products }) {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <h3 className="font-semibold mb-4">Top Products</h3>

      {products.map((p) => (
        <div key={p._id} className="flex justify-between text-sm mb-2">
          <span>{p.name}</span>
          <span className="font-medium">₹{p.revenue}</span>
        </div>
      ))}
    </div>
  );
}
