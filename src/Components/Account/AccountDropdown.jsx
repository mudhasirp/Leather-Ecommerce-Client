

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { User, PackageSearch, MapPin, LogOut } from "lucide-react";


export default function AccountDropdown({ open = false, onClose = () => {}, user = null, onLogout = () => {} }) {
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onDoc(e) {
      if (!open) return;
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
    };
  }, [open, onClose]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const panel = {
    hidden: { opacity: 0, y: -6, scale: 0.98 },
    enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18 } },
    exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.14 } },
  };

  const panelStyle = {
    backgroundColor: "var(--card)", 
    color: "var(--card-foreground, var(--foreground))",
    borderColor: "var(--border)",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={panel}
          className="absolute right-0 mt-3 z-50"
          style={{ minWidth: 320 }}
        >
          <div
            ref={ref}
            role="dialog"
            aria-modal="false"
            aria-label="Account menu"
            className="rounded-2xl shadow-2xl ring-1 ring-black/6 border overflow-hidden"
            style={panelStyle}
          >
            <div className="px-5 py-4 flex items-center gap-4 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--background)]/80 border" style={{ borderColor: "var(--border)" }}>
                <User className="w-6 h-6 text-[color:var(--foreground)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-sans font-semibold leading-tight truncate" style={{ color: "var(--card-foreground)" }}>
                  {user?.name || "Guest"}
                </div>
                <div className="text-xs text-muted-foreground truncate">{user?.email || "Not signed in"}</div>
              </div>
            </div>

            <div className="px-2 py-2">
              
              <MenuItem
                label="My Orders"
                sub="Track your purchases"
                icon={<PackageSearch className="w-4 h-4" />}
                onClick={() => {
                  onClose();
                  navigate("/orders");
                }}
              />
              <MenuItem
                label="Address"
                sub="Shipping addresses"
                icon={<MapPin className="w-4 h-4" />}
                onClick={() => {
                  onClose();
                  navigate("/account/addresses");
                }}
              />

              <div className="h-px my-2" style={{ backgroundColor: "var(--border)" }} />

              <div className="px-3">
                <button
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-[color:var(--background)]/60 transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium font-sans">Sign out</span>
                </button>
              </div>
            </div>

            <div className="px-4 py-3 text-xs text-muted-foreground border-t" style={{ borderColor: "var(--border)" }}>
              <div>Fresh Mart — Available Fresh Vegetables</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Small helper component for menu rows */
function MenuItem({ icon, label, sub, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-[color:var(--background)]/60 transition-colors text-left"
    >
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="flex-1">
        <div className="text-sm font-medium text-card-foreground">{label}</div>
        {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
      </div>
    </button>
  );
}
