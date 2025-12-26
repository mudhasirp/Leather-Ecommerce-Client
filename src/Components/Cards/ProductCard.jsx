"use client";

import { useNavigate } from "react-router-dom";
export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { slug, name, price, image } = product;

  return (
    <div
      onClick={() => navigate(`/product/${slug}`)}
      className="cursor-pointer rounded-2xl bg-green-950 border border-green-100 hover:border-green-300 hover:shadow-lg transition"
    >
      {/* Image */}
      <div className="overflow-hidden rounded-t-2xl">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-56 object-cover hover:scale-105 transition"
        />
      </div>

      {/* Info */}
      <div className="px-4 py-3 text-center ">
        <h3 className="text-sm font-medium text-white bg-green-950 truncate">
          {name}
        </h3>

        <p className="text-white bg-green-80 font-semibold mt-1">
          ₹{Number(price).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
