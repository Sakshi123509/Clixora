import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // 1. Apne logic ke hisab se authentication check karo (LocalStorage, Context, ya Redux)
  const token = localStorage.getItem("token"); 
  const location = useLocation();

  if (!token) {
    // Agar token nahi hai, toh login page par bhej do 
    // state={{ from: location }} se login ke baad wapas isi page par laa sakte ho
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Agar logged in hai, toh normal component render hoga
  return children;
}