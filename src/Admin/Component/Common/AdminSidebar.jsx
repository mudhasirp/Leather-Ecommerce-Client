
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function AdminSidebar({
  activeItem,
  isOpen,
  onClose,
}) {
  const navigate = useNavigate();
 const dispatch = useDispatch();

const handleLogout = () => {
  dispatch({ type: "LOGOUT" });
  navigate("/admin"); // 
};

  const menuItems = [
    { id: "dashboard", label: "Dashboard", path: "/admin/dashboard" },
    { id: "orders", label: "Orders", path: "/admin/orders" },
    { id: "products", label: "Products", path: "/admin/product" },
    { id: "customers", label: "Customers", path: "/admin/customers" },
    { id: "categories", label: "Categories", path: "/admin/category" },
    { id: "enquires", label: "Enquiries", path: "/admin/enquiry" },
  ];
const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <aside
        className={`
          fixed z-50 left-0 top-0 h-full w-64
          bg-gradient-to-b from-green-100 to-green-200
          border-r border-green-300/40
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
          overflow-visible
        `}
      >
        <div className="flex items-center justify-between px-5 py-4 md:hidden">
          <h2 className="text-lg font-semibold text-green-900">Admin Panel</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-green-200/50"
          >
            ✕
          </button>
        </div>

        <div className="hidden md:block px-6 py-6 border-b border-green-300/40">
          <h1 className="text-2xl font-bold text-green-900">FreshMart</h1>
          <p className="text-xs uppercase tracking-widest text-green-800/70 mt-1">
            Admin Dashboard
          </p>
        </div>

        <nav className="px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const active = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
                  ${
                    active
                      ? "bg-white text-green-900 font-semibold shadow-sm"
                      : "text-green-900/70 hover:bg-white/50"
                  }
                `}
              >
                <span
                  className={`absolute left-0 h-6 w-[3px] rounded-full ${
                    active ? "bg-green-700" : "bg-transparent"
                  }`}
                />
                {item.label}
              </button>
            );
          })}
        </nav>

     
<div className="absolute bottom-0 left-0 right-0 border-t border-green-300/40 p-4">
  <div className="relative flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center text-sm font-bold">
        AD
      </div>
      <div>
        <p className="text-sm font-medium text-green-900">Admin</p>
        <p className="text-xs text-green-800/70">admin@freshmart.com</p>
      </div>
    </div>

   <div className="relative">
  <button
    onClick={() => setShowMenu((prev) => !prev)}
    className="p-2 rounded-md hover:bg-green-200/60"
  >
    ⋮
  </button>

  {showMenu && (
    <div className="absolute right-0 bottom-12 w-40 bg-white border rounded-lg shadow-lg z-50">
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  )}
</div>

  </div>
</div>

      </aside>
    </>
  );
}
