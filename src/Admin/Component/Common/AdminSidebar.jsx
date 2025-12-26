"use client";

import React from "react";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({
  activeItem,
  isOpen = false,
  onClose = () => {},
}) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", path: "/admin" },
    { id: "orders", label: "Orders", path: "/admin/orders" },
    { id: "products", label: "Products", path: "/admin/product" },
    { id: "customers", label: "Customers", path: "/admin/customers" },
    { id: "categories", label: "Categories", path: "/admin/category" },
    { id: "enquires", label: "Enquiry", path: "/admin/enquiry" },
  ];

  return (
    <>
      {/* Backdrop (mobile) */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64
          flex flex-col
          border-r border-green-200/40
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
        style={{
          background:
            "linear-gradient(180deg, oklch(0.88 0.12 145), oklch(0.80 0.10 145))",
        }}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-6 py-4 md:hidden">
          <h1 className="text-lg font-semibold text-green-900">
            Veg Admin
          </h1>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-green-200/40"
          >
            ✕
          </button>
        </div>

        {/* Brand */}
        <div className="px-8 py-6 hidden md:block">
          <h1 className="text-2xl font-semibold text-green-900 tracking-wide">
            FreshMart
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-green-800/70 mt-2">
            Admin Panel
          </p>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                className={`
                  relative w-full text-left px-4 py-3 rounded-xl
                  text-sm uppercase tracking-wider
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-white/60 text-green-900 font-semibold"
                      : "text-green-900/70 hover:bg-white/40 hover:text-green-900"
                  }
                `}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] bg-green-700 rounded-full" />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-green-300/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-green-700 text-white rounded-full flex items-center justify-center text-xs font-bold">
              AD
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Admin</p>
              <p className="text-xs text-green-800/70">
                admin@freshmart.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
