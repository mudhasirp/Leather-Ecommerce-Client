import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ name, image }) {
  const categoryQuery = encodeURIComponent(name);

  return (
    <Link
      to={`/shop?category=${categoryQuery}`}
      className="
        group block w-full
        rounded-xl sm:rounded-2xl
        bg-white border border-border
        overflow-hidden
        transition-all duration-300
        hover:shadow-xl
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative 
          aspect-[4/3] sm:aspect-square 
          bg-green-50 
          overflow-hidden
        "
      >
        <img
          src={image || "/placeholder-category.png"}
          alt={name}
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
          onError={(e) => {
            e.currentTarget.src = "/placeholder-category.png";
          }}
        />

        {/* soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="px-3 py-3 sm:px-4 sm:py-4 text-center">
        <h3
          className="
            text-sm sm:text-base md:text-lg
            font-semibold
            text-green-900
            group-hover:text-green-700
            transition
            truncate
          "
        >
          {name}
        </h3>

        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          Fresh & Organic
        </p>
      </div>
    </Link>
  );
}
