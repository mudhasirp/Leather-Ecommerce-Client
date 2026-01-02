
import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../../Component/Common/AdminSidebar";
import { getAdminOrdersApi, updateOrderStatusApi } from "@/API/adminApi";
import { toast } from "sonner";

const STATUSES = ["Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 2;

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await getAdminOrdersApi();
      setOrders(res.orders || []);
    } catch {
      toast.error("Failed to load orders");
    }
  };

  const changeStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      const res = await updateOrderStatusApi(orderId, status);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? res.order : o))
      );
      toast.success("Order updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = useMemo(() => {
    if (!search) return orders;
    return orders.filter(
      (o) =>
        o._id.toLowerCase().includes(search.toLowerCase()) ||
        o.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
        o.userId?.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="h-screen flex overflow-hidden bg-background text-foreground">

      <AdminSidebar
        activeItem="orders"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
    <header className="sticky top-0 z-20 bg-white border-b px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-md border"
            >
              ☰
            </button>
            <div>
              <h1 className="text-2xl font-semibold">Orders</h1>
              <p className="text-sm text-muted-foreground">
                Manage customer orders
              </p>
            </div>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="w-1/3 md:w-1/2 md:block px-2  md:px-4 py-1 border rounded-4xl mr-4 md:mr-0  md:rounded-lg"
          />
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6">
          {paginatedOrders.length === 0 ? (
            <p className="text-center text-muted-foreground mt-20">
              No orders found
            </p>
          ) : (
            <div className="flex flex-col justify-center ali space-y-4 max-w-2xl   md:max-w-4xl mx-auto">
              {paginatedOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl border p-4 shadow-sm"
                >
                  <div className="flex justify-between flex-wrap gap-3">
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">
                        Order ID
                      </p>
                      <p className="font-semibold md:font-medium">{order._id}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">
                        {order.status}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          changeStatus(order._id, e.target.value)
                        }
                        disabled={updatingId === order._id}
                        className="border rounded-md px-3 py-1"
                      >
                        {STATUSES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-muted-foreground">
                    {order.userId?.name} • {order.userId?.email}
                  </div>
                  <div className="mt-4 space-y-3">
    {order.items.map((item, idx) => (
      <div
        key={idx}
        className="flex items-center gap-4 border rounded-lg p-3"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-md"
        />

        <div className="flex-1">
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-muted-foreground">
            Unit: {item.unitLabel}g
          </p>
          <p className="text-sm text-muted-foreground">
           Total Qty: {item.qty*item.unitLabel}g
          </p>
        </div>

        <div className="font-semibold text-right">
          ₹{item.price * item.qty}
        </div>
      </div>
    ))}
  </div>

                  <div className="mt-4 border-t pt-3 flex justify-between">
                    <span>Total</span>
                    <span className="font-semibold">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    page === i + 1
                      ? "bg-green-600 text-white"
                      : "border"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
