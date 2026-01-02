
import React, { useState } from "react";
import EnquiriesLayout from "../../Layout/Enquiry/AdminEnquiryLayout";
import AdminSidebar from "../../Component/Common/AdminSidebar";

export default function AdminEnquiryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-screen bg-background">

      <AdminSidebar
        activeItem="enquiries"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">

        <div className="md:hidden flex items-center justify-between p-4 border-b bg-white">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md border"
          >
            ☰
          </button>
          <h1 className="font-semibold text-lg">Enquiries</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <EnquiriesLayout />
        </div>
      </div>
    </div>
  );
}
