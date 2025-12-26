// Components/Dashboard/SalesChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart({ data }) {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <h3 className="font-semibold mb-4">Sales Overview</h3>

      <ResponsiveContainer height={300}>
        <LineChart data={data}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Line dataKey="revenue" stroke="#16a34a" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
