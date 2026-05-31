import logo from "../assets/logobg.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/Auth.js";

/* ── Google Icon ─────────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

/* ── Eye Toggle ──────────────────────────────────────────────── */
function EyeBtn({ show, toggle }) {
  return (
    <button
      onClick={toggle}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "rgba(212,83,126,.5)",
        display: "flex",
      }}
    >
      {show ? (
        <svg
          width="15"
          height="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"
            strokeLinecap="round"
          />
          <path
            d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"
            strokeLinecap="round"
          />
          <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
        </svg>
      ) : (
        <svg
          width="15"
          height="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );
}

/* ── Field ───────────────────────────────────────────────────── */
function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  rightEl,
  icon,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label
        style={{
          fontSize: "11px",
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontWeight: 600,
          color: focused ? "#7F77DD" : "#993556",
          transition: "color .2s",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <span
            style={{
              position: "absolute",
              left: 11,
              top: "50%",
              transform: "translateY(-50%)",
              color: focused ? "#D4537E" : "rgba(212,83,126,.45)",
              fontSize: 15,
              display: "flex",
              pointerEvents: "none",
              transition: "color .2s",
            }}
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: `10px ${rightEl ? "38px" : "12px"} 10px ${icon ? "34px" : "12px"}`,
            background: focused
              ? "rgba(255,255,255,.92)"
              : "rgba(255,255,255,.65)",
            border: `1px solid ${focused ? "rgba(127,119,221,.5)" : "rgba(212,83,126,.18)"}`,
            borderRadius: "10px",
            color: "#3C3489",
            fontSize: "13px",
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            outline: "none",
            boxShadow: focused ? "0 0 0 3px rgba(127,119,221,.1)" : "none",
            transition: "all .2s",
            boxSizing: "border-box",
          }}
        />
        {rightEl && (
          <div
            style={{
              position: "absolute",
              right: 11,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {rightEl}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── OR Divider ──────────────────────────────────────────────── */
function OrDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          flex: 1,
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(212,83,126,.2),transparent)",
        }}
      />
      <span
        style={{
          fontSize: "11px",
          letterSpacing: "1.5px",
          color: "rgba(212,83,126,.6)",
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontWeight: 600,
        }}
      >
        or
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(212,83,126,.2),transparent)",
        }}
      />
    </div>
  );
}

/* ── Icon SVGs ───────────────────────────────────────────────── */
const MailIcon = () => (
  <svg
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      strokeLinecap="round"
    />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const LockIcon = () => (
  <svg
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
  </svg>
);
const UserIcon = () => (
  <svg
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* ── Login Form ──────────────────────────────────────────────── */
function LoginPage({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [hover, setHover] = useState(false);
  const [gHover, setGHover] = useState(false);
  const navigate = useNavigate();

  const fillDummy = () => {
    setEmail("dummy@gmail.com");
    setPw("Dummy@123");
  };

  const handleLogin = async () => {
    try {
      const data = await loginUser({ email, password: pw });
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.username);
        navigate("/home");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  useEffect(() => {
    if (!window.google) return;
    window.google.accounts.id.initialize({
      client_id: "CLIENT_ID",
      callback: async (res) => {
        try {
          const r = await fetch("/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: res.credential }),
          });
          const d = await r.json();
          if (d.token) {
            localStorage.setItem("token", d.token);
            navigate("/home");
          }
        } catch {
          alert("Google login failed");
        }
      },
    });
    window.google.accounts.id.renderButton(
      document.getElementById("gSignInLogin"),
      { theme: "outline", size: "large", width: "260" },
    );
  }, []);

  return (
    <div style={{ animation: "slideUp .55s cubic-bezier(.23,1,.32,1) both" }}>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 44,
            height: 40,
            borderRadius: "50%",
            flexShrink: 0,
            // background: "linear-gradient(135deg,#F4C0D1,#ED93B1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100%", object: "cover", height: "100%" }}
          />
        </div>
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#3C3489",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
            }}
          >
            WELCOME BACK
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#993556",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
            }}
          >
            Sign in to your account
          </div>
        </div>
      </div>

      {/* Google */}
      <button
        onMouseEnter={() => setGHover(true)}
        onMouseLeave={() => setGHover(false)}
        style={{
          width: "100%",
          padding: "10px 14px",
          background: gHover ? "#fff" : "rgba(255,255,255,.75)",
          border: `1px solid ${gHover ? "rgba(127,119,221,.4)" : "rgba(212,83,126,.2)"}`,
          borderRadius: 12,
          fontSize: 13,
          fontWeight: 600,
          color: gHover ? "#3C3489" : "#72243E",
          cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 9,
          transition: "all .2s",
          marginBottom: 14,
        }}
      >
        <GoogleIcon /> Continue with Google
      </button>

      <OrDivider />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 13,
          margin: "14px 0",
        }}
      >
        <Field
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<MailIcon />}
        />
        <Field
          label="Password"
          placeholder="••••••••••"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          type={showPw ? "text" : "password"}
          icon={<LockIcon />}
          rightEl={<EyeBtn show={showPw} toggle={() => setShowPw((v) => !v)} />}
        />
      </div>

      <div style={{ textAlign: "right", marginBottom: 18 }}>
        <span
          style={{
            fontSize: 11,
            color: "#7F77DD",
            cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontWeight: 600,
            letterSpacing: ".3px",
          }}
        >
          Forgot password?
        </span>
      </div>

      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: 12,
          background: hover
            ? "linear-gradient(135deg,#C4446E 0%,#9990D0 60%,#6F68CC 100%)"
            : "linear-gradient(135deg,#D4537E 0%,#AFA9EC 60%,#7F77DD 100%)",
          cursor: "pointer",
          color: "#fff",
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 1,
          transform: hover ? "translateY(-1px)" : "translateY(0)",
          boxShadow: hover
            ? "0 6px 20px rgba(127,119,221,.3)"
            : "0 2px 10px rgba(212,83,126,.15)",
          transition: "all .22s",
        }}
      >
        Authenticate →
      </button>

      <button
        onClick={fillDummy}
        style={{
          marginTop: 10,
          width: "100%",
          padding: "9px",
          background: "transparent",
          border: "1px dashed rgba(127,119,221,.35)",
          borderRadius: 10,
          color: "rgba(127,119,221,.7)",
          cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "1.5px",
          transition: "all .2s",
        }}
      >
        use dummy credentials
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: 18,
          marginBottom: 0,
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: 12,
          color: "#7F77DD",
        }}
      >
        New here?{" "}
        <span
          onClick={onSwitch}
          style={{
            color: "#D4537E",
            cursor: "pointer",
            textDecoration: "underline",
            textUnderlineOffset: 2,
            fontWeight: 700,
          }}
        >
          Create account
        </span>
      </p>
    </div>
  );
}

/* ── Signup Form ─────────────────────────────────────────────── */
function SignupPage({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [hover, setHover] = useState(false);

  const handleRegister = async () => {
    if (pw !== confirm) {
      alert("Passwords do not match");
      return;
    }
    try {
      const data = await registerUser({ username: name, email, password: pw });
      if (data.success || data.user || data.message) {
        alert("Registration successful");
        onSwitch();
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.log(err.response?.data);

      alert(
        err.response?.data?.msg ||
          err.response?.data?.error ||
          "Registration failed",
      );
    }
  };

  return (
    <div style={{ animation: "slideUp .55s cubic-bezier(.23,1,.32,1) both" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            flexShrink: 0,
            background: "linear-gradient(135deg,#CECBF6,#AFA9EC)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserIcon />
        </div>
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#3C3489",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
            }}
          >
            Join Clixora
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#993556",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
            }}
          >
            Create your free account today
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 13,
          marginBottom: 16,
        }}
      >
        <Field
          label="Full name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={<UserIcon />}
        />
        <Field
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<MailIcon />}
        />
        <Field
          label="Password"
          placeholder="Create a strong password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          type={showPw ? "text" : "password"}
          icon={<LockIcon />}
          rightEl={<EyeBtn show={showPw} toggle={() => setShowPw((v) => !v)} />}
        />
        <Field
          label="Confirm password"
          type="password"
          placeholder="Repeat password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          icon={<LockIcon />}
        />
      </div>

      <p
        style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: 11,
          color: "rgba(127,119,221,.6)",
          textAlign: "center",
          marginBottom: 14,
          lineHeight: 1.5,
        }}
      >
        By joining you agree to our{" "}
        <span style={{ color: "#D4537E", cursor: "pointer", fontWeight: 600 }}>
          Terms
        </span>
        {" & "}
        <span style={{ color: "#D4537E", cursor: "pointer", fontWeight: 600 }}>
          Privacy Policy
        </span>
      </p>

      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleRegister}
        style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: 12,
          background: hover
            ? "linear-gradient(135deg,#9990D0 0%,#C4446E 100%)"
            : "linear-gradient(135deg,#AFA9EC 0%,#D4537E 100%)",
          cursor: "pointer",
          color: "#fff",
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 1,
          transform: hover ? "translateY(-1px)" : "translateY(0)",
          boxShadow: hover
            ? "0 6px 20px rgba(212,83,126,.3)"
            : "0 2px 10px rgba(127,119,221,.15)",
          transition: "all .22s",
        }}
      >
        Create account →
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: 16,
          marginBottom: 0,
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: 12,
          color: "#7F77DD",
        }}
      >
        Already have an account?{" "}
        <span
          onClick={onSwitch}
          style={{
            color: "#D4537E",
            cursor: "pointer",
            textDecoration: "underline",
            textUnderlineOffset: 2,
            fontWeight: 700,
          }}
        >
          Sign in
        </span>
      </p>
    </div>
  );
}

/* ── Main Export ─────────────────────────────────────────────── */
export default function AuthPages() {
  const [page, setPage] = useState("login");

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        background: "#fdf0f7",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 420,
        }}
      >
        {/* Dot cluster + brand name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            justifyContent: "center",
            marginBottom: 18,
          }}
        >
          <div style={{ display: "flex", gap: 4 }}>
            {["#D4537E", "#7F77DD", "#ED93B1"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 2,
              color: "#993556",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              textTransform: "uppercase",
            }}
          >
            Clixora
          </span>
        </div>

        {/* Tab switcher */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 6,
            background: "rgba(212,83,126,.06)",
            borderRadius: 14,
            padding: 5,
            marginBottom: 16,
            border: "1px solid rgba(212,83,126,.1)",
          }}
        >
          {["login", "signup"].map((t) => (
            <button
              key={t}
              onClick={() => setPage(t)}
              style={{
                padding: "9px",
                border: "none",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".8px",
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                color: page === t ? "#3C3489" : "#993556",
                background:
                  page === t
                    ? "linear-gradient(135deg,#F4C0D1,#CECBF6)"
                    : "transparent",
                boxShadow:
                  page === t ? "0 2px 8px rgba(127,119,221,.15)" : "none",
                transition: "all .22s",
              }}
            >
              {t === "login" ? "Sign in" : "Register"}
            </button>
          ))}
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(255,255,255,.62)",
            border: "1px solid rgba(212,83,126,.18)",
            borderRadius: 24,
            padding: "28px 28px 24px",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 8px 32px rgba(212,83,126,.08), 0 2px 8px rgba(127,119,221,.06), inset 0 1px 0 rgba(255,255,255,.8)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* shimmer top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "15%",
              right: "15%",
              height: 1,
              background:
                "linear-gradient(90deg,transparent,rgba(212,83,126,.35),rgba(127,119,221,.3),transparent)",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {page === "login" ? (
              <LoginPage key="login" onSwitch={() => setPage("signup")} />
            ) : (
              <SignupPage key="signup" onSwitch={() => setPage("login")} />
            )}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.5)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
        body { margin: 0; }
        input::placeholder { color: rgba(153,53,86,.28) !important; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px rgba(253,240,247,.95) inset !important;
          -webkit-text-fill-color: #3C3489 !important;
        }
      `}</style>
    </div>
  );
}
