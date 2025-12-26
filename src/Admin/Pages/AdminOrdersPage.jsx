"use client"

import { useEffect, useMemo, useState } from "react"
import AdminSidebar from "../Component/Common/AdminSidebar"
import { getAdminOrdersApi, updateOrderStatusApi } from "@/API/adminApi"
import { toast } from "sonner"

const STATUSES = ["Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [updatingId, setUpdatingId] = useState(null)
  const [search, setSearch] = useState("")
  const ITEMS_PER_PAGE = 2
const [page, setPage] = useState(1)


  useEffect(() => {
    loadOrders()
  }, [])
  useEffect(() => {
  setPage(1)
}, [search])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const res = await getAdminOrdersApi()
      setOrders(res.orders || [])
    } catch {
      toast.error("Failed to load orders")
    } finally {
      setLoading(false)
    }
  }

  const changeStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId)
      const res = await updateOrderStatusApi(orderId, status)
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? res.order : o))
      )
      toast.success("Order status updated")
    } catch {
      toast.error("Failed to update status")
    } finally {
      setUpdatingId(null)
    }
  }

  /* ---------------- SEARCH ---------------- */
  const filteredOrders = useMemo(() => {
    if (!search.trim()) return orders
    const q = search.toLowerCase()

    return orders.filter(
      (o) =>
        o._id.toLowerCase().includes(q) ||
        o.userId?.name?.toLowerCase().includes(q) ||
        o.userId?.email?.toLowerCase().includes(q)
    )
  }, [orders, search])
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)

const paginatedOrders = filteredOrders.slice(
  (page - 1) * ITEMS_PER_PAGE,
  page * ITEMS_PER_PAGE
)


  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 to-slate-100 text-foreground overflow-hidden">
      {/* SIDEBAR */}
      <AdminSidebar
        activeItem="orders"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={() => {}}
      />

      {/* CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-green-700">
              Orders
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              View & manage customer orders
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order, name, email…"
              className="
                px-4 py-2 rounded-xl border
                text-sm w-64
                focus:outline-none focus:ring-2 focus:ring-green-200
              "
            />

            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden px-3 py-2 border rounded-lg"
            >
              ☰
            </button>
          </div>
        </header>

        {/* SCROLL AREA */}
        <main className="flex-1 overflow-y-auto hide-scrollbar px-8 py-8">
          {loading ? (
            <p className="text-center text-muted-foreground py-20">
              Loading orders…
            </p>
          ) : filteredOrders.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">
              No orders found
            </p>
          ) : (
            <div className="space-y-4 max-w-7xl mx-auto">
              {paginatedOrders.map((order) => (
                <div
                  key={order._id}
                  className="
                    relative bg-white rounded-2xl border shadow-sm
                    hover:shadow-lg transition
                    pl-5 pr-6 py-6
                  "
                >
                  {/* GREEN ACCENT LINE */}
                  <span className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-green-500" />

                  {/* TOP */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Order ID
                      </p>
                      <p className="font-mono font-semibold mt-1">
                        {order._id}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                          ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : order.status === "Confirmed"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "Shipped"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {order.status}
                      </span>

                      <select
                        value={order.status}
                        disabled={updatingId === order._id}
                        onChange={(e) =>
                          changeStatus(order._id, e.target.value)
                        }
                        className="border rounded-lg px-3 py-2 text-sm bg-white"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* CUSTOMER */}
                  <div className="grid md:grid-cols-2 gap-6 mt-6 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Customer
                      </p>
                      <p className="font-medium mt-1">
                        {order.userId?.name || "—"}
                      </p>
                      <p className="text-muted-foreground">
                        {order.userId?.email || "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Payment
                      </p>
                      <p className="font-medium mt-1">
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="mt-6 pt-5 border-t space-y-2 text-sm">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {item.name} × {item.qty}
                        </span>
                        <span className="font-medium">
                          ₹{item.price * item.qty}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* TOTAL */}
                  <div className="mt-6 pt-5 border-t flex justify-between items-center">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      Total
                    </span>
                    <span className="text-xl font-semibold text-green-700">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {totalPages > 1 && (
  <div className="flex justify-center items-center gap-3 mt-10">
    <button
      disabled={page === 1}
      onClick={() => setPage((p) => p - 1)}
      className="
        px-4 py-2 rounded-lg border text-sm
        disabled:opacity-40 disabled:cursor-not-allowed
        hover:bg-green-50 transition
      "
    >
      ← Prev
    </button>

    {Array.from({ length: totalPages }).map((_, i) => {
      const p = i + 1
      return (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`
            w-9 h-9 rounded-lg text-sm font-medium transition
            ${
              page === p
                ? "bg-green-600 text-white shadow"
                : "border hover:bg-green-50"
            }
          `}
        >
          {p}
        </button>
      )
    })}

    <button
      disabled={page === totalPages}
      onClick={() => setPage((p) => p + 1)}
      className="
        px-4 py-2 rounded-lg border text-sm
        disabled:opacity-40 disabled:cursor-not-allowed
        hover:bg-green-50 transition
      "
    >
      Next →
    </button>
  </div>
)}

        </main>
      </div>
    </div>
  )
}
