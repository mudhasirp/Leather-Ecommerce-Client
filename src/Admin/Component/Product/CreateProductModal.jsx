
import { useEffect, useState } from "react";
import { createProductApi, getCategoriesApi } from "@/API/adminApi";
import { toast } from "sonner";

const EMPTY_UNIT = {
  label: "",
  weightInGrams: "",
  price: "",
  stock: "",
};

export default function CreateProductModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    isActive: true,
  });

  const [categories, setCategories] = useState([]);
  const [unitVariants, setUnitVariants] = useState([{ ...EMPTY_UNIT }]);

  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState("");

  const [extraImages, setExtraImages] = useState([]);
  const [extraPreviews, setExtraPreviews] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    (async () => {
      try {
        const data = await getCategoriesApi();
        const list = Array.isArray(data) ? data : data.categories ?? [];
        setCategories(list);
      } catch {
        setCategories([]);
      }
    })();
  }, [open]);

  useEffect(() => {
    if (!mainImage) {
      setMainPreview("");
      return;
    }
    const url = URL.createObjectURL(mainImage);
    setMainPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [mainImage]);

  if (!open) return null;

  const updateUnit = (i, patch) =>
    setUnitVariants((u) =>
      u.map((x, idx) => (idx === i ? { ...x, ...patch } : x))
    );

  const addUnit = () => setUnitVariants((u) => [...u, { ...EMPTY_UNIT }]);
  const removeUnit = (i) =>
    setUnitVariants((u) => u.filter((_, idx) => idx !== i));

  const handleExtraImages = (e) => {
    const files = Array.from(e.target.files || []).filter((f) =>
      f.type.startsWith("image/")
    );

    if (extraImages.length + files.length > 3) {
      toast.error("Maximum 3 additional images allowed");
      return;
    }

    const previews = files.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
    }));

    setExtraImages((p) => [...p, ...files]);
    setExtraPreviews((p) => [...p, ...previews]);
  };

  const removeExtraImage = (idx) => {
    URL.revokeObjectURL(extraPreviews[idx].url);
    setExtraImages((p) => p.filter((_, i) => i !== idx));
    setExtraPreviews((p) => p.filter((_, i) => i !== idx));
  };


const resetForm = () => {
  setForm({
    name: "",
    description: "",
    category: "",
    tags: "",
    isActive: true,
  });

  setUnitVariants([{ ...EMPTY_UNIT }]);

  setMainImage(null);
  setMainPreview("");

  extraPreviews.forEach((p) => URL.revokeObjectURL(p.url));
  setExtraImages([]);
  setExtraPreviews([]);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !mainImage) {
      toast.error("Name, category and main image are required");
      return;
    }

    const cleanUnits = unitVariants.filter(
      (u) => u.label && u.weightInGrams && u.price
    );

    if (!cleanUnits.length) {
      toast.error("Add at least one unit variant");
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append(
      "slug",
      form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    );
    fd.append("description", form.description.trim());
    fd.append("category", form.category);
    fd.append("isActive", form.isActive ? "true" : "false");
    fd.append("tags", form.tags);
    fd.append("mainImage", mainImage);
    fd.append("unitVariants", JSON.stringify(cleanUnits));

    extraImages.forEach((img) => fd.append("images", img));

    try {
      setLoading(true);
      const res = await createProductApi(fd);
      onCreated?.(res.product ?? res);
      toast.success("Vegetable created");
      resetForm()
      onClose();
    } catch {
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-8">
      <form
        onSubmit={handleSubmit}
        className="bg-card w-full max-w-4xl rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto"
      >
        <header className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Add Vegetable</h2>
          <button type="button" onClick={onClose}>✕</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Vegetable name"
            className="lux-input"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <select
            className="lux-input"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          rows={4}
          placeholder="Description"
          className="lux-input mt-4"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <div className="mt-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.checked })
              }
            />
            Active
          </label>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium">Main Image</label>
          <input type="file" accept="image/*"
            onChange={(e) => setMainImage(e.target.files[0])} />
          {mainPreview && (
            <img
              src={mainPreview}
              className="mt-2 h-40 rounded-lg object-cover"
            />
          )}
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium">
            Additional Images (max 3)
          </label>
          <input type="file" accept="image/*" multiple onChange={handleExtraImages} />

          <div className="flex gap-3 mt-3">
            {extraPreviews.map((img, i) => (
              <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border">
                <img src={img.url} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeExtraImage(i)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Unit Variants</h3>
            <button type="button" onClick={addUnit} className="text-sm underline">
              + Add
            </button>
          </div>

          {unitVariants.map((u, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-3">
              <input
                placeholder="Label (500g)"
                className="lux-input-sm"
                value={u.label}
                onChange={(e) => updateUnit(i, { label: e.target.value })}
              />
              <input
                placeholder="Weight (g)"
                type="number"
                className="lux-input-sm"
                value={u.weightInGrams}
                onChange={(e) => updateUnit(i, { weightInGrams: e.target.value })}
              />
              <input
                placeholder="Price ₹"
                type="number"
                className="lux-input-sm"
                value={u.price}
                onChange={(e) => updateUnit(i, { price: e.target.value })}
              />
              <input
                placeholder="Stock"
                type="number"
                className="lux-input-sm"
                value={u.stock}
                onChange={(e) => updateUnit(i, { stock: e.target.value })}
              />
              <button
                type="button"
                onClick={() => removeUnit(i)}
                className="text-sm text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <footer className="flex justify-end gap-3 mt-8">
          <button type="button" onClick={onClose} className="lux-btn-outline">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="lux-btn-primary">
            {loading ? "Saving..." : "Create"}
          </button>
        </footer>
      </form>
    </div>
  );
}
