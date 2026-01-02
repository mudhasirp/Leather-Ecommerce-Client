import React from "react";

function CategoryRow({ cat, onEdit, onToggleStatus }) {
  return (
    <tr className="border-b last:border-0">
      <td className="py-3 px-4 text-sm font-medium">{cat.name}</td>

      <td className="py-3 px-4 text-sm text-muted-foreground">
        <div className="max-w-[36rem] truncate">{cat.description || "—"}</div>
      </td>

      <td className="py-3 px-4 text-sm space-y-1">
        {cat.isActive ? (
          <span className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs bg-green-50 text-green-700">
            Listed
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs bg-red-50 text-red-700">
            Blocked
          </span>
        )}

        <button
          onClick={() => onToggleStatus && onToggleStatus(cat)}
          className="block text-xs underline text-muted-foreground hover:text-foreground"
          type="button"
        >
          {cat.isActive ? "Block" : "List"}
        </button>
      </td>

      <td className="py-3 px-4 text-sm">
        {cat.image ? (
          <img
            src={cat.image}
            alt={cat.name}
            className="w-24 h-14 object-cover rounded-md border"
          />
        ) : (
          <div className="w-24 h-14 flex items-center justify-center text-xs text-muted-foreground border rounded-md">
            No image
          </div>
        )}
      </td>

      <td className="py-3 px-4 text-sm">
        <button
  onClick={() => onEdit && onEdit(cat)}
  className="
    inline-flex items-center gap-1.5
    text-xs font-medium
    px-2.5 py-1.5
    rounded-lg
    border border-border/50
    bg-card/40
    hover:bg-card/70
    hover:border-border
    transition-colors duration-200
  "
  type="button"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-3.5 h-3.5 opacity-70"
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} 
      d="M11 5h9M11 9h9M11 13h9M5 7h.01M5 11h.01M5 15h.01" />
  </svg>
  Editaa
</button>

      </td>
    </tr>
  );
}

export default CategoryRow;
