import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  const { _id, name, price, image, unitLabel, stock,weight} = product;
  const [qty, setQty] = useState(1);
  console.log(_id)
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition p-3">
      <Link to={`/product/${product.slug}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-57 object-cover rounded-lg"
        />
      </Link>

      <h3 className="mt-2 font-medium text-sm">{name}</h3>

      <p className="text-green-700 font-semibold">₹{price}</p>
       <p
  className={`text-sm ${
    product.stock <= qty ? "text-red-600" : "text-green-600"
  }`}
>
  {product.stock <= qty
    ? "Only the last stock available"
    : `${product.stock * product.weight} g available`}
</p>
       <div className="flex flex-col md:flex-row items-center gap-2 mt-2">

          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              className="md:px-1   px-3 py-1 text-lg"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="px-3 text-sm">{product.weight*qty}g</span>
           <button
  className="px-3 py-1 text-lg"
  onClick={() => {
    if (qty < product.stock) setQty(qty + 1);
  }}
>
  +
</button>

          </div>

          <button
            onClick={() => onAddToCart({ _id, qty,weight})}
            className="flex-1 md:px-8 bg-green-600 hover:bg-green-700 text-white px-13 py-2 rounded-md text-sm "
          >
            Add
          </button>
        </div>
    </div>
  );
}
