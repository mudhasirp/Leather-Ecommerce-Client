// src/Components/Address/AddressFormModal.jsx
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createAddressApi,
  updateAddressApi,
} from "@/API/userAPI";

export default function AddressFormModal({
  open,
  onClose,
  initialData,
  onSuccess,
}) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData?._id) {
        await updateAddressApi(initialData._id, form);
        toast.success("Address updated");
      } else {
        await createAddressApi(form);
        toast.success("Address added");
      }
      onSuccess();
      onClose();
    } catch {
      toast.error("Failed to save address");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-xl p-6"
      >
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Address" : "Add Address"}
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {[
            ["fullName", "Full Name"],
            ["phone", "Phone"],
            ["line1", "Address Line 1"],
            ["line2", "Address Line 2"],
            ["city", "City"],
            ["state", "State"],
            ["postalCode", "Pincode"],
          ].map(([key, label]) => (
            <input
              key={key}
              placeholder={label}
              value={form[key] || ""}
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
              className="border rounded-md px-3 py-2"
              required={key !== "line2"}
            />
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
