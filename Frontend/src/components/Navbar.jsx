import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { RiAiGenerate } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/logo1.png";

export default function Navbar({ logoImg }) {
  const [user, setUser] = useState({
    name: "Guest User",
    email: "not-logged-in@clixora.ai",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user information upon mount
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail =
      localStorage.getItem("userEmail") || localStorage.getItem("email");

    if (storedName) {
      setUser({
        name: storedName,
        email:
          storedEmail ||
          `${storedName.toLowerCase().replace(/\s+/g, "")}@clixora.ai`,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const getInitials = (nameString) => {
    if (!nameString) return "??";
    const trimmedName = nameString.trim();
    const nameParts = trimmedName.split(/\s+/);

    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }
    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 md:px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div
        className="flex items-center gap-2 font-black text-xl text-pink-600 tracking-tight"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        <span className="rounded-lg flex items-center justify-center">
          <img
            src={logoImg}
            className="h-8 w-auto object-contain"
            style={{ width: "100%" }}
            alt="Logo"
          />
        </span>
        CLIXORA
      </div>
      
      <div className="hidden sm:flex gap-6 font-semibold text-sm text-slate-600">
        <a href="/" className="text-pink-600 border-b-2 border-pink-600 pb-1">
          Home
        </a>
        <a href="/dashboard" className="hover:text-slate-900 transition">
          Dashboard
        </a>
        <a href="/generate" className="hover:text-slate-900 transition">
          Generator Matrix
        </a>
      </div>

      {/* Profile Avatar Trigger & Dropdown Menu */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-10 h-10 cursor-pointer rounded-full bg-pink-500 text-white flex items-center justify-center font-bold shadow-md hover:scale-105 transition-all focus:outline-none relative z-50 border-2 border-white uppercase tracking-wider"
        >
          {getInitials(user?.name)}
        </button>

        {isDropdownOpen && (
          <div
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsDropdownOpen(false)}
          />
        )}

        {isDropdownOpen && (
          <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200/80 rounded-2xl shadow-xl py-2.5 z-50 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 border-b border-slate-100/80 mb-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-50 flex-shrink-0 text-xs font-black text-pink-600 flex items-center justify-center border border-pink-100 uppercase">
                {getInitials(user?.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-mono font-bold text-green-400 uppercase tracking-widest leading-none mb-1">
                  Active Node
                </p>
                <p className="text-sm font-bold text-slate-800 truncate leading-tight">
                  {user?.name || "Anonymous User"}
                </p>
                <p className="text-[11px] font-medium text-slate-500 truncate">
                  {user?.email || "No email linked"}
                </p>
              </div>
            </div>

            <div className="space-y-0.5 px-1.5">
              <a
                href="/dashboard"
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-600 rounded-xl hover:bg-slate-50 hover:text-pink-600 transition"
                onClick={() => setIsDropdownOpen(false)}
              >
                <span className="text-base text-slate-400">
                  <MdDashboard />
                </span>
                Dashboard Cluster
              </a>

              <a
                href="/generate"
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-600 rounded-xl hover:bg-slate-50 hover:text-pink-600 transition sm:hidden"
                onClick={() => setIsDropdownOpen(false)}
              >
                <span className="text-base text-slate-400">
                  <RiAiGenerate />
                </span>
                Generator Matrix
              </a>
            </div>

            <div className="border-t border-slate-100 my-1.5 mx-1.5"></div>

            <div className="px-1.5">
              <button
                className="w-full cursor-pointer flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 rounded-xl hover:bg-rose-50/70 transition text-left"
                onClick={() => {
                  setIsDropdownOpen(false);
                  handleLogout();
                }}
              >
                <span className="text-base">
                  <IoIosLogOut />
                </span>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}