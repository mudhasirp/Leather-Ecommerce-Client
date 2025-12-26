import { Users } from "lucide-react"

export default function CustomerStatsCards({ customers }) {
  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => !c.isBlocked).length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
          Total Customers
        </p>
        <p className="text-3xl font-bold text-slate-900 dark:text-white">
          {totalCustomers}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
          Active Customers
        </p>
        <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
          {activeCustomers}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
          Total Revenue
        </p>
        <p className="text-3xl font-bold text-slate-900 dark:text-white">
          ₹{totalRevenue.toLocaleString()}
        </p>
      </div>
    </div>
  )
}
