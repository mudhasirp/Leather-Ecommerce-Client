export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-3xl font-semibold text-green-700 mt-2">{value}</p>
    </div>
  );
}
