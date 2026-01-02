
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getAdminEnquiriesApi,
  updateEnquiryStatusApi,
} from "@/API/adminApi";

export default function EnquiriesLayout() {
  const [enquiries, setEnquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  const STATUS_FILTERS = ["All", "New", "Contacted", "Closed"];

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getAdminEnquiriesApi();
      setEnquiries(res.enquiries || []);
    } catch {
      toast.error("Failed to load enquiries");
    }
  };

  const filtered = statusFilter === "All"
    ? enquiries
    : enquiries.filter((e) => e.status === statusFilter);

  const updateStatus = async (id, status) => {
    try {
      await updateEnquiryStatusApi(id, status);
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status } : e))
      );
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const formatPhone = (phone) =>
    phone?.startsWith("+") ? phone : `+91${phone}`;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Product Enquiries
        </h1>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                statusFilter === status
                  ? "bg-green-600 text-white"
                  : "bg-white border hover:bg-slate-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((e) => (
          <div
            key={e._id}
            className="bg-white rounded-xl border p-5 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex gap-4">
                <img
                  src={e.product?.image || "/placeholder.png"}
                  className="w-20 h-20 rounded-xl object-cover"
                  alt="product"
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    {e.product?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enquiry by <b>{e.username}</b>
                  </p>
                  <p className="text-sm text-gray-600">
                    📞 {formatPhone(e.userPhone)}
                  </p>
                </div>
              </div>

              <select
                value={e.status}
                onChange={(ev) => updateStatus(e._id, ev.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Closed</option>
              </select>
            </div>

            <div className="mt-4 bg-slate-50 p-4 rounded-lg text-sm">
              {e.message}
            </div>

            <div className="mt-3 text-xs text-slate-500">
              {e.userAddress
                ? `${e.userAddress.line1}, ${e.userAddress.city}, ${e.userAddress.state}`
                : "No address available"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
