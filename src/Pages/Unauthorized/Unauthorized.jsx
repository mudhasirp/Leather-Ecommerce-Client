import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>

      <h2 className="text-2xl font-semibold mb-2">
        Access Denied
      </h2>

      <p className="text-gray-600 mb-6">
        You don’t have permission to access this page.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Go to Login
        </Link>

        <Link
          to="/home"
          className="px-5 py-2 rounded-md border border-gray-400 hover:bg-gray-100 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
