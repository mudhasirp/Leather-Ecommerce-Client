
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountDropdown from "../Account/AccountDropdown";

export default function Navbar({ isMenuOpen = false, onToggleMenu = () => {} }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user?.user); 

  const [navOpen, setNavOpen] = useState(isMenuOpen);
  const [accountOpen, setAccountOpen] = useState(false);
  const containerRef = useRef(null);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <nav ref={containerRef} className="relative">
      <div className="flex items-center justify-between">
        <Link to="/home" className="shrink-0">
          <div className="font-sans text-2xl font-light tracking-tight text-green-600 ">
            FM
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/home" className="text-sm tracking-widest text-foreground hover:text-accent transition-colors font-light">
            Home
          </Link>
          <Link to="/shop" className="text-sm tracking-widest text-foreground hover:text-accent transition-colors font-light">
            Shop
          </Link>
        
          <Link to="#" className="text-sm tracking-widest text-foreground hover:text-accent transition-colors font-light">
            About
          </Link>
          <Link to="#" className="text-sm tracking-widest text-foreground hover:text-accent transition-colors font-light">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
         

          <div className="relative group">
            <button
              className="p-2 hover:text-accent transition-colors"
              aria-label="Cart"
              onClick={() => navigate("/cart")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.75 10.5V6a3.75 3.75 0 00-3.75-3.75H6.75A3.75 3.75 0 003 6v10.5m15-6H4.5m15 0a3.75 3.75 0 010 7.5H2.25A3.75 3.75 0 01.75 16.5"
                />
              </svg>
            </button>

            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card/90 px-2 py-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
              Cart
            </span>
          </div>

          <div className="relative group">
            <button
              className="p-2 hover:text-accent transition-colors"
              aria-label="User account"
              onClick={() => setAccountOpen((s) => !s)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </button>

            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card/90 px-2 py-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
              Account
            </span>

            <AccountDropdown
              user={user}
              open={accountOpen}
              onClose={() => setAccountOpen(false)}
              onLogout={handleLogout}
            />
          </div>

          <button
            className="md:hidden p-2 hover:text-accent transition-colors"
            onClick={() => { setNavOpen((s) => !s); onToggleMenu(); }}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {navOpen && (
        <div className="md:hidden mt-4 space-y-3 pb-4">
          <Link to="/home" className="block text-sm tracking-widest text-foreground hover:text-accent transition-colors font-light">
            Home
          </Link>
          <Link to="/shop" className="block text-sm tracking-widest text-foreground hover:text-accent transition-colors font-light">
            Shop
          </Link>
       
          <Link to="#" className="block text-sm tracking-widest text-foreground hover:text-accent transition-colors font-light">
            About
          </Link>
          <Link to="#" className="block text-sm tracking-widest text-foreground hover:text-accent transition-colors font-light">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
