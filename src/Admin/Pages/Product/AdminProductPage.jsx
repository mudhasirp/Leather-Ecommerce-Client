import React, { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../../Component/Common/AdminSidebar";
import { getProductsApi, toggleProductApi } from "@/API/adminApi";
import CreateProductModal from "../../Component/Product/CreateProductModal";
import EditProductModal from "../../Component/Product/EditProductModal";
import ProductList from "../../Component/Product/ProductList";
import { toast } from "sonner";

const PAGE_SIZE = 3; 

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loadingIds, setLoadingIds] = useState(new Set());

  const [currentPage, setCurrentPage] = useState(1);

  const loadProducts = async () => {
    try {
      const data = await getProductsApi();
      setProducts(data?.products ?? []);
      setCurrentPage(1); 
    } catch (err) {
      console.error("Failed to load products", err);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, currentPage]);

  const handleCreated = (p) => {
    setProducts((prev) => [p, ...prev]);
    toast.success("Product created");
  };

  const handleEditOpen = (product) => setEditing(product);

  const handleUpdated = (updatedProduct) => {
  if (!updatedProduct || !updatedProduct._id) {
    console.error("Invalid updated product:", updatedProduct);
    return;
  }

  setProducts((prev) =>
    prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
  );

  setEditing(null);
  toast.success("Product updated");
};

  const handleToggle = async (product) => {
    const id = product._id;
    const newStatus = !product.isActive;

    setProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, isActive: newStatus } : p
      )
    );

    setLoadingIds((s) => new Set(s).add(id));

    try {
      await toggleProductApi(id);
      toast.success(newStatus ? "Product listed" : "Product unlisted");
    } catch (err) {
      toast.error("Failed to update status");
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, isActive: product.isActive } : p
        )
      );
    } finally {
      setLoadingIds((s) => {
        const next = new Set(s);
        next.delete(id);
        return next;
      });
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background text-foreground">
      <AdminSidebar
        activeItem="products"
        onNavigate={() => {}}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1">
      
       <header className="w-full px-6 py-6 flex items-center justify-between">
  <div className="flex items-center gap-3">
    <button
      className="md:hidden p-2 rounded-md border"
      onClick={() => setSidebarOpen(true)}
    >
      ☰
    </button>

    <div>
      <h1 className="text-3xl font-sans tracking-tight">Products</h1>
      <p className="text-sm text-muted-foreground">
        Manage products
      </p>
    </div>
  </div>

  <div className="flex items-center gap-3">
    <button
      onClick={() => setCreateOpen(true)}
      className="text-sm md:text-xl rounded-md px-3 md:px-4 py-2 bg-primary text-primary-foreground md:font-medium shadow-sm"
    >
      + Create product
    </button>

  </div>
</header>


        <main className="w-full px-6 pb-6">
          <ProductList
            products={paginatedProducts}
            onEdit={handleEditOpen}
            onToggle={handleToggle}
            loadingIds={loadingIds}
            onRefresh={loadProducts}
          />

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded-md disabled:opacity-40"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === i + 1
                      ? "bg-green-600 text-white"
                      : "hover:bg-muted"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded-md disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>

      <CreateProductModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={handleCreated}
      />

      <EditProductModal
        open={!!editing}
        product={editing}
        onClose={() => setEditing(null)}
        onUpdated={handleUpdated}
      />
    </div>
  );
}
