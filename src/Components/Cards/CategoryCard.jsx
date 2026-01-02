import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ name, image }) {
  const categoryQuery = encodeURIComponent(name);

  return (
    <Link
      to={`/shop?category=${categoryQuery}`}
      className="flex flex-col items-center gap-3 group"
    >
      <div
        className="
          w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40
          rounded-full
          overflow-hidden
          bg-green-50
          border border-border
          flex items-center justify-center
          transition-all duration-300
          group-hover:scale-105
          group-hover:shadow-xl
        "
      >
        <img
          src={image || "/placeholder-category.png"}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-category.png";
          }}
        />
      </div>

      <p
        className="
          text-base sm:text-lg
          font-semibold
          text-center
          text-green-900
          leading-tight
        "
      >
        {name}
      </p>
    </Link>
  );
}
