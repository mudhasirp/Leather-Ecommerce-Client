import React, { useEffect, useState } from "react";
import { updateCategoryApi } from "@/API/adminApi";

export default function EditCategoryModal({ open, onClose, category, onUpdated }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    isActive: true,
  });

  const [imageFile, setImageFile] = useState(null);  
  const [preview, setPreview] = useState("");         
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setForm({ name: "", description: "", isActive: true });
      setImageFile(null);
      setPreview("");
      setError("");
      return;
    }

    if (category) {
      setForm({
        name: category.name || "",
        description: category.description || "",
        isActive: typeof category.isActive === "boolean" ? category.isActive : true,
      });

      setPreview(category.image || "");
      setImageFile(null);
      setError("");
    }
  }, [open, category]);

  useEffect(() => {
    if (!imageFile) {
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Only image files allowed");
      return;
    }
    setImageFile(file);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!category?._id) {
      setError("Category not selected");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("name", form.name.trim());
      fd.append("description", form.description || "");
      fd.append("isActive", form.isActive ? "true" : "false");

      if (imageFile) fd.append("image", imageFile);

      const res = await updateCategoryApi(category._id, fd);
      const updated = res?.category ?? res;

      onUpdated && onUpdated(updated);
      onClose && onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-6 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => !loading && onClose()}
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-3xl rounded-2xl bg-card p-4 sm:p-6 shadow-lg border border-border
               max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-6rem)] overflow-auto"
      >
        <header className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-sans">Edit Category</h3>

          <button
            type="button"
            onClick={() => !loading && onClose()}
            className="p-2 text-muted-foreground hover:text-foreground transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 6l12 12M6 18L18 6"
              />
            </svg>
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-4 items-start">
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase text-muted-foreground block mb-2">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-border/60 px-3 py-2 bg-background"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                id="isActive"
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label htmlFor="isActive" className="text-sm select-none">Is Active</label>
            </div>

            <div>
              <label className="text-xs uppercase text-muted-foreground block mb-2">Description</label>
              <textarea
                name="description"
                rows={6}
                value={form.description}
                onChange={handleChange}
                className="w-full rounded-lg border border-border/60 px-3 py-2 bg-background"
              />
            </div>
          </div>

          <div className="space-y-3 flex flex-col self-start">
            <label className="text-xs uppercase text-muted-foreground">Image</label>

            <div>
              <input type="file" accept="image/*" onChange={handleFile} />
            </div>

            <div className="w-full rounded-md border overflow-hidden bg-background relative">
              <div className="w-full h-0 pb-[75%] relative">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-muted-foreground">Select a new image to replace the existing one (optional).</p>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => !loading && onClose()}
            className="px-4 py-2 rounded-md border"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
