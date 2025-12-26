"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getAdminEnquiriesApi,
  updateEnquiryStatusApi,
} from "@/API/adminApi";

export default function EnquiriesLayout() {
  const [enquiries, setEnquiries] = useState([]);
 const STATUS_FILTERS = ["All", "New", "Contacted", "Closed"];

const [statusFilter, setStatusFilter] = useState("All");


  const load = async () => {
    try {
      const res = await getAdminEnquiriesApi();
      setEnquiries(res.enquiries || []);
    } catch {
      toast.error("Failed to load enquiries");
    }
  };
  const filteredEnquiries =
  statusFilter === "All"
    ? enquiries
    : enquiries.filter((e) => e.status === statusFilter);
  useEffect(() => {
    load();
  }, []);
 const formatPhone = (phone) => {
  if (!phone) return "";
  return phone.startsWith("+91") ? phone : `+91${phone}`;
};

  const updateStatus = async (id, status) => {
    try {
      await updateEnquiryStatusApi(id, status);
      setEnquiries((prev) =>
        prev.map((e) =>
          e._id === id ? { ...e, status } : e
        )
      );
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-serif text-green-800">
        Product Enquiries
      </h1>
      {/* FILTER BAR */}
<div className="flex gap-2 bg-muted/40 p-1 rounded-xl w-fit">
  {STATUS_FILTERS.map((status) => (
    <button
      key={status}
      onClick={() => setStatusFilter(status)}
      className={`
        px-4 py-1.5 rounded-lg text-sm font-medium transition
        ${
          statusFilter === status
            ? "bg-white shadow text-green-700"
            : "text-muted-foreground hover:text-foreground"
        }
      `}
    >
      {status}
    </button>
  ))}
</div>


      <div className="grid gap-5">
        {filteredEnquiries.map((e) => (
          <div
            key={e._id}
            className="bg-white border rounded-2xl p-6 shadow-sm"
          >
            {/* PRODUCT */}
            {/* PRODUCT */}
<div className="flex gap-4">
  <img
    src={e.product?.image || "/placeholder.png"}
    className="w-20 h-20 rounded-xl object-cover border"
    alt={e.product?.name}
  />

  <div className="flex-1 space-y-1">
    <h3 className="font-medium text-lg">
      {e.product?.name}
    </h3>

    <p className="text-sm text-muted-foreground">
      Enquiry by: <span className="font-medium">{e.username}</span>
    </p>

    <p className="text-sm">📞 {e.userPhone}</p>

    {/* 🔥 CALL + WHATSAPP BUTTONS */}
    <div className="flex gap-3 mt-2">
      <a
        href={`tel:${formatPhone(e.userPhone)}`}
        className="
          inline-flex items-center gap-2
          px-3 py-1.5
          rounded-lg
          text-sm font-medium
          border border-green-200
          bg-green-50 text-green-700
          hover:bg-green-100
          transition
        "
      >
        📞 Call
      </a>

      <a
        href={`https://wa.me/${formatPhone(e.userPhone).replace("+", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center gap-2
          px-3 py-1.5
          rounded-lg
          text-sm font-medium
          bg-[#25D366]
          text-white
          hover:opacity-90
          transition
        "
      >
        💬 WhatsApp
      </a>
    </div>
  </div>

  {/* STATUS */}
  <select
    value={e.status}
    onChange={(ev) =>
      updateStatus(e._id, ev.target.value)
    }
    className="border rounded-lg px-3 py-2 text-sm h-fit"
  >
    <option value="New">New</option>
    <option value="Contacted">Contacted</option>
    <option value="Closed">Closed</option>
  </select>
</div>


              {/* STATUS */}
              

            {/* MESSAGE */}
            <div className="mt-4 text-sm bg-muted/30 p-4 rounded-xl">
              {e.message}
            </div>

            {/* ADDRESS */}
            <div className="mt-4 text-xs text-muted-foreground">
              {e.userAddress ? (
                <>
                  {e.userAddress.line1}, {e.userAddress.city},{" "}
                  {e.userAddress.state} – {e.userAddress.postalCode}
                </>
              ) : (
                <i>No address provided</i>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
