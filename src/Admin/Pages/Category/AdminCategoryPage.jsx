import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Component/Common/AdminSidebar";
import CategoryPageHeader from "../../Layout/Category/CategoryPageHeader";
import CategoryList from "../../Component/Categories/CategoryList";
import CreateCategoryModal from "../../Component/Categories/CreateCategoryModal";
import EditCategoryModal from "../../Component/Categories/EditCategoryModal"; 
import { getCategoriesApi, toggleCategoryStatusApi } from "@/API/adminApi";
import { toast } from "sonner";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); 
  const [editing, setEditing] = useState(null);     
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingIds, setLoadingIds] = useState(new Set());

  const loadCategories = async () => {
    try {
      const data = await getCategoriesApi();
      setCategories(data?.categories ?? []);
    } catch (err) {
      console.error("Failed to load categories", err);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleToggleStatus = async (cat) => {
    const id = cat._id;
    const newStatus = !cat.isActive;
    setCategories((prev) => prev.map((c) => (c._id === id ? { ...c, isActive: newStatus } : c)));
    setLoadingIds((s) => new Set(s).add(id));

    try {
      await toggleCategoryStatusApi(id);
      if (newStatus) toast.success(`${cat.name} listed successfully`);
      else toast.error(`${cat.name} blocked`);
    } catch (err) {
      console.error("toggle error:", err);
      toast.error(err?.response?.data?.message || `Failed to update status for ${cat.name}`);
      setCategories((prev) => prev.map((c) => (c._id === id ? { ...c, isActive: cat.isActive } : c)));
    } finally {
      setLoadingIds((s) => {
        const next = new Set(s);
        next.delete(id);
        return next;
      });
    }
  };

  const handleEdit = (cat) => {
    console.log("handleEdit called:", cat?._id); 
    setModalOpen(false);
    setEditing(cat);
  };

  const handleUpdatedCategory = (updated) => {
    setCategories((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
    setEditing(null);
    toast.success("Category updated");
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background text-foreground">

      <AdminSidebar activeItem="categories" onNavigate={() => {}} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

  <div className="flex-1 overflow-y-auto">

        <CategoryPageHeader onCreate={() => setModalOpen(true)} onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="w-full px-6 py-6 md:pl-0">
          <CategoryList
            categories={categories}
            onRefresh={loadCategories}
            onEdit={handleEdit}                
            onToggleStatus={handleToggleStatus}
            loadingIds={loadingIds}
          />
        </main>
      </div>

      <CreateCategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={(c) => setCategories((prev) => [c, ...prev])}
      />

      <EditCategoryModal
        open={!!editing}
        category={editing}
        onClose={() => setEditing(null)}
        onUpdated={handleUpdatedCategory}
      />
    </div>
  );
}
