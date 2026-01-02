
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/Admin/Component/Common/AdminSidebar";
import { getAdminCustomersApi } from "@/API/adminApi";
import { toast } from "sonner";

const PAGE_SIZE = 8;

export default function CustomersPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        const res = await getAdminCustomersApi();
        setCustomers(res.customers || []);
      } catch {
        toast.error("Failed to load customers");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredCustomers = useMemo(() => {
    if (!search.trim()) return customers;
    const q = search.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone && c.phone.includes(q))
    );
  }, [customers, search]);
 


  const totalPages = Math.ceil(filteredCustomers.length / PAGE_SIZE);

  const paginatedCustomers = filteredCustomers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="relative flex h-screen overflow-hidden bg-background text-foreground">

      <AdminSidebar
  activeItem="customers"
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
/>


      <main className="flex-1 px-4 md:px-8 py-6 space-y-6 overflow-x-hidden">
        <div className="flex items-center gap-3">
  <button
    onClick={() => setSidebarOpen(true)}
    className="md:hidden p-2 rounded-md border"
  >
    ☰
  </button>

  <div>
    <h1 className="text-3xl font-semibold text-slate-900">Customers</h1>
    <p className="text-sm text-slate-500">
      Manage and track your customers
    </p>
  </div>
</div>


        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
          {loading ? (
            <p className="p-10 text-center text-slate-500">
              Loading customers…
            </p>
          ) : paginatedCustomers.length === 0 ? (
            <p className="p-10 text-center text-slate-500">
              No customers found
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full text-sm">
                  <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
                    <tr>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Phone</th>
                      <th className="px-6 py-4">Orders</th>
                      <th className="px-6 py-4">Spent</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Joined</th>
                      <th className="px-6 py-4 text-right"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {paginatedCustomers.map((c) => (
                      <tr
                        key={c._id}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold">
                            {c.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-slate-900">
                            {c.name}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {c.email}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {c.phone || "—"}
                        </td>

                        <td className="px-6 py-4 font-medium">
                          {c.totalOrders}
                        </td>

                        <td className="px-6 py-4 font-semibold text-green-700">
                          ₹{c.totalSpent}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium
                              ${
                                c.isBlocked
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                          >
                            {c.isBlocked ? "Blocked" : "Active"}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {new Date(c.joinedAt).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() =>
                              navigate(`/admin/customers/${c._id}`)
                            }
                            className="text-green-700 font-medium hover:underline"
                          >
                            View →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t bg-slate-50">
                  <p className="text-sm text-slate-500">
                    Page {page} of {totalPages}
                  </p>

                  <div className="flex gap-2">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                      className="px-4 py-1.5 rounded-lg border text-sm disabled:opacity-40"
                    >
                      Prev
                    </button>
                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => p + 1)}
                      className="px-4 py-1.5 rounded-lg border text-sm disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
