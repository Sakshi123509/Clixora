import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drop, setDrop] = useState(false);
  const userName = localStorage.getItem("userName") || "User";
  const initials = userName.charAt(0).toUpperCase();
  const isActive = (p) => location.pathname === p;

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700&display=swap');`}</style>

      <nav
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          zIndex: 100,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,194,209,0.4)",
          boxShadow: "0 1px 10px rgba(123,44,191,0.06)",
          fontFamily: "'Outfit',sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 7,
              background: "linear-gradient(135deg,#EC4899,#7C3AED)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(123,44,191,0.3)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 80 80">
              <defs>
                <linearGradient id="nlg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff" stopOpacity=".95" />
                  <stop offset="100%" stopColor="#f9d0e8" stopOpacity=".9" />
                </linearGradient>
              </defs>
              <path
                d="M62 20 A28 28 0 1 0 62 60"
                stroke="url(#nlg)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />
              <polygon
                points="33,27 33,52 54,40"
                fill="url(#nlg)"
                opacity=".95"
              />
              <rect
                x="5"
                y="25"
                width="7"
                height="7"
                rx="1.5"
                fill="url(#nlg)"
                opacity=".9"
              />
              <rect
                x="14"
                y="19"
                width="5"
                height="5"
                rx="1"
                fill="url(#nlg)"
                opacity=".65"
              />
              <rect
                x="14"
                y="32"
                width="5"
                height="5"
                rx="1"
                fill="url(#nlg)"
                opacity=".65"
              />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "1.1rem",
              background: "linear-gradient(135deg,#EC4899,#7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-.02em",
            }}
          >
            Clixora
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 4 }}>
          {[
            { label: "✦ Generate", path: "/generate" },
            { label: "Dashboard", path: "/dashboard" },
          ].map(({ label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                padding: "7px 14px",
                border: "none",
                borderRadius: 7,
                background: isActive(path) ? "#f3e8ff" : "transparent",
                color: isActive(path) ? "#7b2cbf" : "#6b5e73",
                fontFamily: "'Outfit',sans-serif",
                fontSize: "0.87rem",
                fontWeight: isActive(path) ? 600 : 500,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setDrop((v) => !v)}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#EC4899,#7C3AED)",
              color: "#fff",
              fontFamily: "'Syne',sans-serif",
              fontSize: "0.85rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "2px solid transparent",
              transition: "border-color .2s",
            }}
          >
            {initials}
          </div>
          {/* drop */}
          {drop && (
            <>
              <div
                onClick={() => setDrop(false)}
                style={{ position: "fixed", inset: 0, zIndex: 150 }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  zIndex: 200,
                  background: "#fff",
                  border: "1px solid rgba(255,194,209,.45)",
                  borderRadius: 10,
                  boxShadow: "0 8px 28px rgba(123,44,191,.12)",
                  padding: 6,
                  minWidth: 150,
                }}
              >
                {[
                  { label: "✦ Generate", path: "/generate" },
                  { label: "📊 Dashboard", path: "/dashboard" },
                ].map(({ label, path }) => (
                  <button
                    key={path}
                    onClick={() => {
                      navigate(path);
                      setDrop(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      border: "none",
                      borderRadius: 7,
                      background: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontFamily: "'Outfit',sans-serif",
                      fontSize: "0.85rem",
                      color: "#24142b",
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f3e8ff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    {label}
                  </button>
                ))}
                <div
                  style={{
                    height: 1,
                    background: "rgba(255,194,209,.4)",
                    margin: "4px 0",
                  }}
                />
                <button
                  onClick={logout}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: "none",
                    borderRadius: 7,
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: "'Outfit',sans-serif",
                    fontSize: "0.85rem",
                    color: "#c0392b",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#fdf0ef")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "none")
                  }
                >
                  🚪 Logout
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
