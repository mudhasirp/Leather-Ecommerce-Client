import { ChevronRight } from "lucide-react"

export default function CustomersTable({ customers, onView }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
            <th className="px-6 py-4 text-left font-semibold">Name</th>
            <th className="px-6 py-4 text-left font-semibold">Email</th>
            <th className="px-6 py-4 text-left font-semibold">Phone</th>
            <th className="px-6 py-4 text-left font-semibold">Orders</th>
            <th className="px-6 py-4 text-left font-semibold">Revenue</th>
            <th className="px-6 py-4 text-left font-semibold">Status</th>
            <th className="px-6 py-4 text-left font-semibold">Joined</th>
            <th className="px-6 py-4 text-right font-semibold">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {customers.map((c) => (
            <tr
              key={c._id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <td className="px-6 py-4 font-semibold">{c.name}</td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                {c.email}
              </td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                {c.phone || "—"}
              </td>
              <td className="px-6 py-4 font-medium">{c.totalOrders}</td>
              <td className="px-6 py-4 font-semibold text-emerald-600 dark:text-emerald-400">
                ₹{c.totalSpent.toLocaleString()}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    c.isBlocked
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  }`}
                >
                  {c.isBlocked ? "Blocked" : "Active"}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                {new Date(c.joinedAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onView(c._id)}
                  className="inline-flex items-center gap-1 px-3 py-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg font-medium transition"
                >
                  View <ChevronRight className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
