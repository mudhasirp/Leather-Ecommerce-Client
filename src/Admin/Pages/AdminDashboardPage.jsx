// src/Admin/Pages/DashboardPage.jsx
"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../Component/Common/AdminSidebar";
import StatCard from "../Component/Dashboard/StatCard";
import SalesChart from "../Component/Dashboard/SalesChart";
import TopProducts from "../Component/Dashboard/TopProducts";
import SalesReport from "../Component/Dashboard/SalesReport";
import { getDashboardApi } from "@/API/adminApi";

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboardApi().then(setData);
  }, []);

  if (!data) return null;

  return (
    <div className="h-screen flex bg-background">
      <AdminSidebar activeItem="dashboard" />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* KPI */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard title="Users" value={data.totalUsers} />
          <StatCard title="Products" value={data.totalProducts} />
          <StatCard title="Orders" value={data.totalOrders} />
          <StatCard title="Revenue" value={`₹${data.totalRevenue}`} />
        </div>

        {/* GRAPH */}
        <SalesChart data={data.salesChart} />

        <div className="grid md:grid-cols-2 gap-6">
          <TopProducts products={data.topProducts} />
          <SalesReport orders={data.recentOrders} />
        </div>
      </main>
    </div>
  );
}
