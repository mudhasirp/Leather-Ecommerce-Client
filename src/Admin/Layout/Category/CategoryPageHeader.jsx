import React from "react";

export default function CategoryPageHeader({ onCreate, onToggleSidebar }) {
  return (
    <section className="border-b border-border/40 bg-card/80 backdrop-blur-sm">
      <div className="w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-muted/20"
            aria-label="Open menu"
            type="button"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div>
            <h1 className="text-2xl sm:ml-5 md:ml-0 md:text-4xl font-sans tracking-tight">Categories</h1>
            <p className="text-muted-foreground mt-1">
              Manage your product categories
            </p>
          </div>
        </div>

        <div>
          <button
            onClick={onCreate}
            className="bg-primary text-primary-foreground px-2 py-1 ml-7 mb-8 md:ml-0 md:mb-0 md:px-3 md:py-3 rounded-lg text-sm md:text-xl md:font-medium tracking-wide hover:bg-primary/95"
          >
            Create Category
          </button>
        </div>
      </div>
    </section>
  );
}
