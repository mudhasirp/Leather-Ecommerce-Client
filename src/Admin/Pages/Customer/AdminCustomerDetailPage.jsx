"use client";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminSidebar from "@/Admin/Component/Common/AdminSidebar";
import {
  getAdminCustomerDetailsApi,
  toggleCustomerBlockApi,
} from "@/API/adminApi";
import { toast } from "sonner";

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAdminCustomerDetailsApi(id);
        setData(res);
      } catch {
        toast.error("Failed to load customer");
      }
    })();
  }, [id]);

  if (!data) return null;

  const { user, defaultAddress, orders, enquiries, totalSpent } = data;

  const handleBlockToggle = async () => {
    try {
      await toggleCustomerBlockApi(user._id);
      toast.success("Status updated");
      setData({
        ...data,
        user: { ...user, isBlocked: !user.isBlocked },
      });
    } catch {
      toast.error("Action failed");
    }
  };

  return (

      <div className="h-screen flex overflow-hidden bg-slate-50">

      {/* SIDEBAR */}
      <AdminSidebar activeItem="customers" />

      {/* MAIN */}
       <div className="flex-1 overflow-y-auto">
      <main className="px-4 md:px-8 py-6 space-y-6">

        {/* HEADER CARD */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* USER INFO */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-2xl font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h1 className="text-2xl font-serif font-semibold text-slate-900">
                  {user.name}
                </h1>
                <p className="text-sm text-slate-500">{user.email}</p>
                <p className="text-sm text-slate-500 mt-1">
                  📞 {defaultAddress?.phone || "—"}
                </p>
              </div>
            </div>

            {/* ACTION */}
            <button
              onClick={handleBlockToggle}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition
                ${
                  user.isBlocked
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
            >
              {user.isBlocked ? "Unblock User" : "Block User"}
            </button>
          </div>
        </section>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ADDRESS */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600 mb-3">
              Default Address
            </h2>

            {defaultAddress ? (
              <div className="text-sm text-slate-600 leading-relaxed">
                <p className="font-medium text-slate-900">
                  {defaultAddress.fullName}
                </p>
                <p>{defaultAddress.line1}</p>
                <p>
                  {defaultAddress.city}, {defaultAddress.state}
                </p>
                <p>{defaultAddress.postalCode}</p>
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No address added
              </p>
            )}
          </section>

          {/* ORDERS */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600 mb-4">
              Orders
            </h2>

            <div className="space-y-3">
              {orders.map((o) => (
                <div
                  key={o._id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm hover:bg-slate-50 transition"
                >
                  <span className="text-slate-600 truncate max-w-[160px]">
                    {o._id}
                  </span>
                  <span className="font-medium text-green-700">
                    ₹{o.totalAmount}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-medium">
                    {o.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end font-semibold text-slate-900">
              Total Spent: ₹{totalSpent}
            </div>
          </section>
        </div>

        {/* ENQUIRIES */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600 mb-4">
            Enquiries
          </h2>

          {enquiries.length === 0 ? (
            <p className="text-sm text-slate-500">No enquiries</p>
          ) : (
            <div className="space-y-4">
              {enquiries.map((e) => (
                <div
                  key={e._id}
                  className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition"
                >
                  <p className="font-medium text-slate-900">
                    {e.product.name}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    {e.message}
                  </p>
                  <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-slate-100">
                    {e.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      </div>
    </div>
  );
}
