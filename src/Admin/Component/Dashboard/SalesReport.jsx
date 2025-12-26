// Components/Dashboard/SalesReport.jsx
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function SalesReport({ orders }) {
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(orders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales");
    XLSX.writeFile(wb, "sales-report.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Order ID", "Total"]],
      body: orders.map((o) => [o._id, o.totalAmount]),
    });
    doc.save("sales-report.pdf");
  };

  return (
    <div className="bg-white rounded-2xl border p-6">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Sales Report</h3>
        <div className="flex gap-3">
          <button onClick={exportExcel} className="text-green-700 text-sm">
            Excel
          </button>
          <button onClick={exportPDF} className="text-green-700 text-sm">
            PDF
          </button>
        </div>
      </div>

      {orders.map((o) => (
        <div key={o._id} className="flex justify-between text-sm mb-2">
          <span>{o._id}</span>
          <span>₹{o.totalAmount}</span>
        </div>
      ))}
    </div>
  );
}
