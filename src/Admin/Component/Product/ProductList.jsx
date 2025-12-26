// src/Component/Product/ProductList.jsx
import React from "react";

// small toggle UI (re-usable)
function ToggleSwitch({ checked, onChange, disabled, loading }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled || loading}
      onClick={() => !disabled && !loading && onChange(!checked)}
      className={`relative inline-flex items-center h-6 w-12 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        checked ? "bg-emerald-600" : "bg-border/40"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      title={checked ? "Unlist" : "List"}
    >
      <span className={`block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-1"}`} />
      {loading && (
        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 animate-spin text-white" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
          <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

function DesktopRow({ p, onEdit, onToggle, loading }) {
  return (
    <tr className="border-b last:border-0 hover:bg-card/40">
      <td className="py-3 px-4 text-sm font-medium max-w-[18rem]">{p.name}</td>
      <td className="py-3 px-4 text-sm text-muted-foreground">
        <div className="max-w-[36rem] truncate">{p.description || "—"}</div>
      </td>
      <td className="py-3 px-4 text-sm">
        <div className="flex items-center gap-3">
          <div className={`inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-xs font-medium ${p.isActive ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100" : "bg-rose-50 text-rose-700 ring-1 ring-rose-100"}`}>
            {p.isActive ? "Listed" : "Unlisted"}
          </div>
          <ToggleSwitch checked={!!p.isActive} onChange={() => onToggle && onToggle(p)} loading={!!loading} />
        </div>
      </td>
      <td className="py-3 px-4 text-sm">
        <div className="w-36 h-20 rounded-md overflow-hidden border bg-background">
          <img src={p.mainImage} alt={p.name} className="w-full h-full object-cover" />
        </div>
      </td>
      <td className="py-3 px-4 text-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit && onEdit(p)}
            className="text-xs px-3 py-1 rounded-md border bg-card/90 hover:shadow-sm"
            type="button"
          >
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
}

function ProductCard({ p, onEdit, onToggle, loading }) {
  return (
    <article className="flex gap-4 p-4 rounded-xl border border-border/30 bg-card/95 shadow-sm">
      <div className="w-28 h-20 flex-shrink-0 rounded-md overflow-hidden border bg-background">
        <img src={p.mainImage} alt={p.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-medium truncate">{p.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.description}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className={`inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-xs font-medium ${p.isActive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
              {p.isActive ? "Listed" : "Unlisted"}
            </div>
            <ToggleSwitch checked={!!p.isActive} onChange={() => onToggle && onToggle(p)} loading={!!loading} />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <button onClick={() => onEdit && onEdit(p)} className="text-sm px-3 py-1 rounded-md border bg-card/90">Edit</button>
        </div>
      </div>
    </article>
  );
}

export default function ProductList({ products = [], onEdit, onToggle, loadingIds = new Set(), onRefresh }) {
  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif">Products</h2>
        <div className="flex items-center gap-3">
          <button onClick={onRefresh} className="inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm text-muted-foreground hover:bg-card/60">
            Refresh
          </button>
        </div>
      </div>

      <div className="hidden md:block w-full rounded-2xl border border-border/40 bg-card p-4 overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-xs text-muted-foreground uppercase">
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Description</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Image</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 px-4 text-center text-sm text-muted-foreground">No products yet.</td>
              </tr>
            ) : (
              products.map((p) => (
                <DesktopRow key={p._id} p={p} onEdit={onEdit} onToggle={onToggle} loading={loadingIds.has(p._id)} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-border/40 bg-card p-4 text-center text-sm text-muted-foreground">No products yet.</div>
        ) : (
          <div className="space-y-3 px-2">
            {products.map((p) => (
              <ProductCard key={p._id} p={p} onEdit={onEdit} onToggle={onToggle} loading={loadingIds.has(p._id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
