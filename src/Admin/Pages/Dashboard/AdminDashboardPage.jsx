
import { useEffect, useState } from "react";
import AdminSidebar from "../../Component/Common/AdminSidebar";
import StatCard from "../../Component/Dashboard/StatCard";
import SalesChart from "../../Component/Dashboard/SalesChart";
import TopProducts from "../../Component/Dashboard/TopProducts";
import { getDashboardApi } from "@/API/adminApi";
import SalesReport from "../../Component/Dashboard/SalesReport";
export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const [range, setRange] = useState("month");


   useEffect(() => {
    const fetchDashboard = async () => {
      const res = await getDashboardApi(range);
        console.log(res)

      setData(res);
    };
    fetchDashboard();
  }, [range]);


  if (!data) return null;

  return (
<div className="h-screen flex overflow-hidden bg-background text-foreground">

  <AdminSidebar
    activeItem="dashboard"
    isOpen={sidebarOpen}
    onClose={() => setSidebarOpen(false)}
  />

  <div className="flex flex-col flex-1 overflow-hidden">

    <header className="h-16 shrink-0 border-b bg-white flex items-center px-6">
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden mr-3"
      >
        ☰
      </button>
      <h1 className="text-xl font-semibold">Dashboard</h1>
    </header>

    <main className="flex-1 overflow-y-auto p-6 space-y-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Users" value={data.totalUsers} />
        <StatCard title="Products" value={data.totalProducts} />
        <StatCard title="Orders" value={data.totalOrders} />
        <StatCard title="Revenue" value={`₹${data.totalRevenue}`} />
      </div>

      <SalesChart
        data={data.salesChart}
        range={range}
        setRange={setRange}
      />

      <TopProducts products={data.topProducts} />

      <SalesReport orders={data.recentOrders} />
    </main>
  </div>
</div>


  );
}
