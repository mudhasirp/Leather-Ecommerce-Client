// src/Pages/OrderDetailsPage.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetailsApi } from "@/API/userAPI";
import HeaderLayout from "@/Layout/Header/HeaderLayout";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getOrderDetailsApi(id);
      setOrder(res.order);
    })();
  }, [id]);

  if (!order) return null;

  return (
    <>
    <HeaderLayout/>
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-2xl font-semibold text-green-800">
        Order Details
      </h1>

      {/* ITEMS */}
      <div className="bg-white border rounded-2xl p-6">
        <h2 className="font-medium mb-5 text-lg">Items</h2>

        <div className="space-y-4">
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4"
            >
              {/* LEFT: image + name */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover border"
                />

                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.qty}
                  </p>
                </div>
              </div>

              {/* RIGHT: price */}
              <div className="font-medium">
                ₹{item.price * item.qty}
              </div>
            </div>
          ))}
        </div>
      </div>
{/* ADDRESS */}
{/* ADDRESS */}
<div className="bg-white border rounded-2xl p-6">
  <h2 className="font-medium mb-3 text-lg">
    Delivery Address
  </h2>

  <div className="text-sm text-muted-foreground space-y-1 leading-relaxed">
    <p className="font-medium text-foreground">
      {order.address?.fullName}
    </p>

    <p>
      {order.address?.line1}
      {order.address?.line2 && `, ${order.address.line2}`}
    </p>

    <p>
      {order.address?.city}, {order.address?.state} –{" "}
      {order.address?.postalCode}
    </p>

    <p>{order.address?.country}</p>

    <p className="mt-2">📞 {order.address?.phone}</p>
  </div>
</div>



      {/* SUMMARY */}
      <div className="bg-white border rounded-2xl p-6 space-y-2">
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-semibold text-lg">
            ₹{order.totalAmount}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Status</span>
          <span className="font-medium">{order.status}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Payment</span>
          <span>
            {order.isPaid ? "Paid" : "Cash on Delivery"}
          </span>
        </div>
      </div>
    </div>
    </>
  );
}
