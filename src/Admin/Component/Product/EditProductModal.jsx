
import { useEffect, useState } from "react";
import { updateProductApi, getCategoriesApi } from "@/API/adminApi";
import { toast } from "sonner";

export default function EditProductModal({ open, onClose, product, onUpdated }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    isActive: true,
  });

  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [preview, setPreview] = useState("");

  
  useEffect(() => {
    if (!open || !product) return;

    setForm({
      name: product.name || "",
      description: product.description || "",
      category: product.category?._id || "",
      tags: (product.tags || []).join(","),
      isActive: product.isActive ?? true,
    });

    setPreview(product.mainImage || "");

    setVariants(
      (product.unitVariants || []).map(v => ({
        label: v.label,
        weightInGrams: v.weightInGrams,
        price: v.price,
        stock: v.stock,
      }))
    );
  }, [open, product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category) {
      toast.error("Name and category are required");
      return;
    }

    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("description", form.description);
    payload.append("category", form.category);
    payload.append("isActive", form.isActive);

    if (mainImage) payload.append("mainImage", mainImage);

    payload.append(
      "unitVariants",
      JSON.stringify(
        variants.map(v => ({
          label: v.label,
          weightInGrams: Number(v.weightInGrams),
          price: Number(v.price),
          stock: Number(v.stock),
        }))
      )
    );

    try {
      await updateProductApi(product._id, payload);
      toast.success("Product updated");
      onUpdated?.();
      onClose();
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-4xl p-6 rounded-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

        <input
          className="lux-input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Product name"
        />

        <textarea
          className="lux-input mt-3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
        />

        <select
          className="lux-input mt-3"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select category</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <div className="mt-4">
          <label>Main Image</label>
          <input type="file" onChange={e => setMainImage(e.target.files[0])} />
          {preview && <img src={preview} className="mt-2 h-32 rounded" />}
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-2">Variants</h3>

          {variants.map((v, i) => (
            <div key={i} className="border p-3 mb-2">
              <input
                value={v.label}
                onChange={(e) =>
                  setVariants(prev =>
                    prev.map((x, idx) =>
                      idx === i ? { ...x, label: e.target.value } : x
                    )
                  )
                }
                placeholder="Label"
              />

              <input
                value={v.weightInGrams}
                onChange={(e) =>
                  setVariants(prev =>
                    prev.map((x, idx) =>
                      idx === i ? { ...x, weightInGrams: e.target.value } : x
                    )
                  )
                }
                placeholder="Weight"
              />

              <input
                value={v.price}
                onChange={(e) =>
                  setVariants(prev =>
                    prev.map((x, idx) =>
                      idx === i ? { ...x, price: e.target.value } : x
                    )
                  )
                }
                placeholder="Price"
              />

              <input
                value={v.stock}
                onChange={(e) =>
                  setVariants(prev =>
                    prev.map((x, idx) =>
                      idx === i ? { ...x, stock: e.target.value } : x
                    )
                  )
                }
                placeholder="Stock"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button type="button" onClick={onClose} className="border px-4 py-2">
            Cancel
          </button>
          <button type="submit" className="bg-black text-white px-4 py-2">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
