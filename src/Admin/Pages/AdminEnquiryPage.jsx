import React, { useState } from "react";
import EnquiriesLayout from "../Layout/Enquiry/AdminEnquiryLayout";
import AdminSidebar from "../Component/Common/AdminSidebar";
function AdminEnquiryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 


  return (
    <div className="h-screen flex overflow-hidden bg-background text-foreground">
      
      <AdminSidebar
        activeItem="enquiries"
        onNavigate={() => {}}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ONLY THIS SCROLLS */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        
        <EnquiriesLayout
          onToggleSidebar={() => setSidebarOpen(true)}
        />
      </div>

    </div>
  );
}


export default AdminEnquiryPage;
