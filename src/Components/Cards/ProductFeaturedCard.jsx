import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCardFeatured({
  id,
  name,
  price,
  image,
  onAddToCart,
  slug,
  weight,
  quantity
}) {
  const [qty, setQty] = useState(1);
  console.log(qty)
  console.log(weight)
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      
    
      <Link to={`/product/${slug}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-3 space-y-2">
        <h3 className="text-sm font-medium line-clamp-2">{name}</h3>

        <p className="text-green-600 font-semibold">{price * qty}</p>
     <p
  className={`text-sm ${
    quantity <= qty ? "text-red-600" : "text-green-600"
  }`}
>
  {quantity <= qty
    ? "Only the last stock available"
    : `${quantity * weight} g available`}
</p>

        <div className="flex flex-col md:flex-row items-center gap-2 mt-2">

          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              className="px-3 py-1 text-lg"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="px-3 text-sm">{weight*qty}g</span>
           <button
  className="px-3 py-1 text-lg"
  onClick={() => {
    if (qty < quantity) setQty(qty + 1);
  }}
>
  +
</button>

          </div>

          <button
            onClick={() => onAddToCart({ id, qty,weight })}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-13 py-2 rounded-md text-sm "
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
