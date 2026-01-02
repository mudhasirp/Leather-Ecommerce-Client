import { useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Download, FileText, Calendar } from "lucide-react";

export default function SalesReport({ orders = [] }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const filteredOrders = orders.filter(order => {
    const date = new Date(order.createdAt);
    if (startDate && new Date(startDate) > date) return false;
    if (endDate && new Date(endDate) < date) return false;
    if (month && date.getMonth() + 1 !== Number(month)) return false;
    if (year && date.getFullYear() !== Number(year)) return false;
    return true;
  });

  const totalRevenue = filteredOrders.reduce(
    (sum, o) => sum + o.totalAmount,
    0
  );

  const exportExcel = () => {
    const data = filteredOrders.map(order => ({
      OrderID: order._id,
      Customer: order.userId?.name || "N/A",
      Products: order.items.map(i => `${i.name} x${i.qty}`).join(", "),
      Total: order.totalAmount,
      Date: new Date(order.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
    XLSX.writeFile(wb, "sales-report.xlsx");
  };

 const exportPDF = () => {
  const doc = new jsPDF("p", "mm", "a4");

  doc.setFontSize(16);
  doc.text("Sales Report", 14, 16);

  autoTable(doc, {
    startY: 25,
    head: [["Order ID", "Customer", "Products", "Amount", "Date"]],
    body: filteredOrders.map(o => [
      o._id,
      o.userId?.name || "N/A",
      o.items.map(i => `${i.name} x${i.qty}`).join(", "),
      `₹${o.totalAmount}`,
      new Date(o.createdAt).toLocaleDateString(),
    ]),
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: 255,
    },
  });

  doc.save("sales-report.pdf");
};


  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded:sm  md:rounded-2xl shadow-xl space-y-6">

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className=" text-[24px] md:text-4xl font-bold tracking-tight">Sales Analytics</h2>
          <p className="text-[13px] md:text-sm  text-muted-foreground">
            Track revenue, orders and export detailed reports
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={exportExcel}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            <Download size={16} /> Excel
          </button>
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition"
          >
            <FileText size={16} /> PDF
          </button>
        </div>
      </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-5 rounded-xl border shadow-sm">

  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium">From</label>
    <input
      type="date"
      className="input w-full"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
  </div>

  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium">To</label>
    <input
      type="date"
      className="input w-full"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    />
  </div>

  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium">Month</label>
    <select
      className="input w-full"
      value={month}
      onChange={(e) => setMonth(e.target.value)}
    >
      <option value="">All</option>
      {[...Array(12)].map((_, i) => (
        <option key={i} value={i + 1}>
          {new Date(0, i).toLocaleString("default", { month: "long" })}
        </option>
      ))}
    </select>
  </div>

  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium">Year</label>
    <input
      type="number"
      className="input w-full"
      value={year}
      onChange={(e) => setYear(e.target.value)}
    />
  </div>

</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h3 className="text-2xl font-bold">{filteredOrders.length}</h3>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h3 className="text-2xl font-bold text-emerald-600">
            ₹{totalRevenue.toLocaleString()}
          </h3>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">Average Order</p>
          <h3 className="text-2xl font-bold">
            ₹{filteredOrders.length ? Math.round(totalRevenue / filteredOrders.length) : 0}
          </h3>
        </div>
      </div>

     <div className="bg-white rounded-xl shadow overflow-hidden">

  <div className="hidden md:block overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-100 text-sm">
        <tr>
          <th className="p-3 text-left">Order</th>
          <th className="p-3 text-left">Customer</th>
          <th className="p-3 text-left">Products</th>
          <th className="p-3 text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {filteredOrders.map(order => (
          <tr key={order._id} className="border-t hover:bg-gray-50">
            <td className="p-3 text-sm font-mono">{order._id}</td>
            <td className="p-3">{order.userId?.name}</td>
            <td className="p-3 text-sm">
              {order.items.map(i => i.name).join(", ")}
            </td>
            <td className="p-3 text-right font-semibold">
              ₹{order.totalAmount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="md:hidden space-y-4 p-4">
    {filteredOrders.map(order => (
      <div
        key={order._id}
        className="border rounded-lg p-4 shadow-sm space-y-2"
      >
        <div className="text-sm font-semibold">
          Order: {order._id}
        </div>

        <div className="text-sm text-gray-600">
          <strong>Customer:</strong> {order.userId?.name}
        </div>

        <div className="text-sm text-gray-600">
          <strong>Products:</strong>{" "}
          {order.items.map(i => i.name).join(", ")}
        </div>

        <div className="text-right font-semibold text-emerald-600">
          ₹{order.totalAmount}
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}
