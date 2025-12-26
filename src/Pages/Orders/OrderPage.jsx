// src/Pages/OrdersPage.jsx
"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrdersApi } from "@/API/userAPI";
import HeaderLayout from "@/Layout/Header/HeaderLayout";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await getMyOrdersApi();
      setOrders(res.orders || []);
    })();
  }, []);

  return (
    <>
    <HeaderLayout/>
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-green-800">
        My Orders
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            onClick={() => navigate(`/orders/${order._id}`)}
            className="
              cursor-pointer
              border rounded-xl p-4
              bg-white
              hover:border-green-300
              hover:shadow-sm
              transition
            "
          >
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">
                  Order #{order._id.slice(-6)}
                </p>
                <p className="text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">₹{order.totalAmount}</p>
                <p
                  className={`text-xs mt-1 ${
                    order.isPaid
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  {order.isPaid ? "PAID" : "NOT PAID"}
                </p>
              </div>
            </div>

            <div className="mt-3 text-sm">
              <span className="text-muted-foreground">Status: </span>
              <span className="font-medium">{order.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
