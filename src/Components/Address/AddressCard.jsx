// src/Components/Address/AddressCard.jsx
import { Pencil, Trash2, CheckCircle } from "lucide-react";

export default function AddressCard({ address, onEdit, onDefault, onDelete }) {
  return (
    <div
      className="
        relative rounded-2xl border border-green-100
        bg-white p-5 shadow-sm
        hover:shadow-md transition
      "
    >
      {/* DEFAULT BADGE */}
      {address.isDefault && (
        <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
          <CheckCircle size={12} />
          Default
        </span>
      )}

      {/* NAME */}
      <h3 className="text-base font-semibold text-gray-900">
        {address.fullName}
      </h3>

      {/* ADDRESS */}
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        {address.line1}
        {address.line2 && `, ${address.line2}`} <br />
        {address.city}, {address.state} – {address.postalCode} <br />
        {address.country}
      </p>

      {/* PHONE */}
      <p className="mt-3 text-sm font-medium text-gray-800">
        📞 {address.phone}
      </p>

      {/* ACTIONS */}
      <div className="flex items-center gap-3 mt-5">
        {/* EDIT */}
        <button
          onClick={onEdit}
          className="
            inline-flex items-center gap-1.5
            px-3 py-1.5 text-sm
            rounded-lg border border-green-200
            text-green-700 hover:bg-green-50
            transition
          "
        >
          <Pencil size={14} />
          Edit
        </button>

        {/* SET DEFAULT */}
        {!address.isDefault && (
          <button
            onClick={onDefault}
            className="
              inline-flex items-center gap-1.5
              px-3 py-1.5 text-sm
              rounded-lg border border-gray-200
              text-gray-600 hover:bg-gray-50
              transition
            "
          >
            <CheckCircle size={14} />
            Set default
          </button>
        )}

        {/* DELETE */}
        <button
          onClick={onDelete}
          className="
            ml-auto inline-flex items-center gap-1.5
            px-3 py-1.5 text-sm
            rounded-lg border border-red-200
            text-red-600 hover:bg-red-50
            transition
          "
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}
