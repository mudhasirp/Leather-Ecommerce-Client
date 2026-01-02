import React, { useState } from "react";
import { toast } from "sonner";


function IconRefresh() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 12a9 9 0 10-3 6.36" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 3v6h-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatusPill({ isActive }) {
  return isActive ? (
    <span className="inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
      Listed
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-xs font-medium bg-rose-50 text-rose-700 ring-1 ring-rose-100">
      Blocked
    </span>
  );
}

/* Accessible slide toggle */
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
      title={checked ? "Unlist (Block)" : "List"}
    >
      <span
        className={`block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
      {/* tiny spinner overlay when loading */}
      {loading && (
        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 animate-spin text-white" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
          <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
function DesktopRow({ cat, onEdit, onToggleStatus, loading }) {
  return (
    <tr className="border-b last:border-0 hover:bg-card/40">
      <td className="py-3 px-4 text-sm font-medium max-w-[18rem]">{cat.name}</td>
      <td className="py-3 px-4 text-sm text-muted-foreground">
        <div className="max-w-[36rem] truncate">{cat.description || "—"}</div>
      </td>
      <td className="py-3 px-4 text-sm flex items-center gap-3">
        <StatusPill isActive={!!cat.isActive} />
        {/* call parent handler directly */}
        <ToggleSwitch checked={!!cat.isActive} onChange={() => onToggleStatus && onToggleStatus(cat)} loading={!!loading} />
      </td>
      <td className="py-3 px-4 text-sm">
        {cat.image ? <img src={cat.image} alt={cat.name} className="w-28 h-16 object-cover rounded-md border" /> : <div className="w-28 h-16 flex items-center justify-center text-xs text-muted-foreground border rounded-md">No image</div>}
      </td>
      <td className="py-3 px-4 text-sm">
        <div className="flex items-center gap-3">
         <div className="flex items-center gap-3">
  <button
    onClick={() => onEdit && onEdit(cat)}
    type="button"
    aria-label={`Edit ${cat.name}`}
    className="
      inline-flex items-center gap-2
      px-3 py-1.5
      rounded-lg
      border border-border/50
      bg-card/40
      text-sm font-medium
      text-foreground
      hover:bg-card/70 hover:scale-[1.01]
      transition-transform transition-colors duration-150
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40
    "
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536M4 20h4.768l9.97-9.97a2 2 0 00-2.828-2.828L6 17.172V20z" />
    </svg>

    <span> Edit </span>
  </button>
</div>

        </div>
      </td>
    </tr>
  );
}

function CategoryCard({ cat, onEdit, onToggleStatus, loading }) {
  return (
    <article className="flex gap-4 p-4 rounded-xl border border-border/30 bg-card/95 shadow-sm">
      <div className="w-28 h-20 flex-shrink-0 rounded-md overflow-hidden border bg-background">
        {cat.image ? <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No image</div>}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-medium truncate">{cat.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-3">{cat.description || "—"}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <StatusPill isActive={!!cat.isActive} />
            <ToggleSwitch checked={!!cat.isActive} onChange={() => onToggleStatus && onToggleStatus(cat)} loading={!!loading} />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <button
  onClick={() => onEdit && onEdit(cat)}
  type="button"
  aria-label={`Edit ${cat.name}`}
  className="
    inline-flex items-center gap-2
    px-3 py-1
    rounded-md
    border border-border/40
    bg-card/30
    text-sm font-medium
    hover:bg-card/60
    transition-colors duration-150
  "
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536M4 20h4.768l9.97-9.97a2 2 0 00-2.828-2.828L6 17.172V20z" />
  </svg>
  <span>Edit</span>
</button>

          <button className="text-sm text-muted-foreground" disabled>View</button>
        </div>
      </div>
    </article>
  );
}

export default function CategoryList({ categories = [], onRefresh, onEdit, onToggleStatus, loadingIds = new Set() }) {
  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-sans"></h2>
        <div className="flex items-center gap-3">
          <button onClick={onRefresh} className="inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm text-muted-foreground hover:bg-card/60">
            <IconRefresh />
            <span>Refresh</span>
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
            {categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 px-4 text-center text-sm text-muted-foreground">No categories yet.</td>
              </tr>
            ) : (
              categories.map((c) => (
                <DesktopRow key={c._id} cat={c} onEdit={onEdit} onToggleStatus={onToggleStatus} loading={loadingIds.has(c._id)} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {categories.length === 0 ? (
          <div className="rounded-2xl border border-border/40 bg-card p-4 text-center text-sm text-muted-foreground">No categories yet.</div>
        ) : (
          <div className="space-y-3 px-2">
            {categories.map((c) => (
              <CategoryCard key={c._id} cat={c} onEdit={onEdit} onToggleStatus={onToggleStatus} loading={loadingIds.has(c._id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}