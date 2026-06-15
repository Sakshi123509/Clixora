import logo from "../assets/logo1.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/Auth.js";
import {
  MdDashboard,
  MdMailOutline,
  MdLockOutline,
  MdOutlinePerson,
} from "react-icons/md";
import { RiAiGenerate } from "react-icons/ri";
import { IoIosLogOut, IoMdEye, IoMdEyeOff } from "react-icons/io";

/* ── Google Icon Component ───────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0">
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

/* ── UI Core Reusable Field Input ────────────────────────────── */
function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  rightEl,
  icon,
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[10px] tracking-widest uppercase font-mono font-bold text-slate-400">
        {label}
      </label>
      <div className="relative w-full group">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 text-lg transition-colors pointer-events-none flex items-center">
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full text-xs font-medium text-slate-700 placeholder-slate-300/90 bg-slate-50 border border-slate-200/80 rounded-xl outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${
            icon ? "pl-10" : "pl-4"
          } ${rightEl ? "pr-10" : "pr-4"} py-3`}
        />
        {rightEl && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
            {rightEl}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Split Divider Component ─────────────────────────────────── */
function OrDivider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-200" />
      <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
        or
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-200" />
    </div>
  );
}

/* ── Login Module Interface ──────────────────────────────────── */
function LoginPage({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
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
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };
  const handleGoogleLogin = () => {
    // Point this directly to your backend server port and route
    window.location.href = "http://localhost:8000/api/auth/google";
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-4">
      {/* Dynamic Identity Branding Header Row */}
      <div className="flex items-center gap-3.5 mb-2 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 p-0.5 shadow-sm flex-shrink-0">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
            <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-black text-slate-800 tracking-tight uppercase">
            Welcome Back
          </h2>
          <p className="text-xs font-medium text-slate-400 truncate">
            Sign in to initialize session
          </p>
        </div>
      </div>

      <button
        onClick={() => console.log("Init Google Stream")}
        className="w-full py-3 px-4 
        cursor-pointer bg-white border border-slate-200 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50 hover:text-indigo-600 hover:border-slate-300 transition shadow-sm flex items-center justify-center gap-2.5"
      >
        <GoogleIcon /> Continue with Google
      </button>

      <OrDivider />

      <div className="flex flex-col gap-3.5">
        <Field
          label="Email node address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<MdMailOutline />}
        />
        <Field
          label="Security Key Cipher"
          placeholder="••••••••••"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          type={showPw ? "text" : "password"}
          icon={<LockIconWrapper />}
          rightEl={
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="text-slate-400 cursor-pointer hover:text-pink-500 text-base transition-colors"
            >
              {showPw ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          }
        />
      </div>

      <div className="text-right">
        <span className="text-[11px] text-indigo-600 hover:text-pink-600 transition cursor-pointer font-bold">
          Forgot passkey cipher?
        </span>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-gradient-to-tr cursor-pointer from-pink-500 to-indigo-600 hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/10 hover:scale-[1.01] transition transform active:scale-100 tracking-wider uppercase"
        >
          Authenticate Cluster →
        </button>

        <button
          onClick={fillDummy}
          className="w-full cursor-pointer py-2.5 bg-transparent border-2 border-dashed border-slate-200 text-[11px] font-bold text-slate-400 hover:border-pink-300 hover:text-pink-500 rounded-xl transition uppercase tracking-widest"
        >
          Inject Sandbox Credentials
        </button>
      </div>

      <p className="text-center text-xs font-semibold text-slate-400 mt-2">
        New to the matrix?{" "}
        <span
          onClick={onSwitch}
          className="text-pink-600 font-bold hover:underline cursor-pointer"
        >
          Create instance node
        </span>
      </p>
    </div>
  );
}

/* ── Signup Module Interface ─────────────────────────────────── */
function SignupPage({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);

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
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-4">
      <div className="flex items-center gap-3.5 mb-2 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 p-0.5 shadow-sm flex-shrink-0 flex items-center justify-center text-white text-xl font-bold">
          <MdOutlinePerson />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-black text-slate-800 tracking-tight uppercase">
            Join Clixora Matrix
          </h2>
          <p className="text-xs font-medium text-slate-400 truncate">
            Spawn a clean cloud node instance
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        <Field
          label="Profile Node Identifier"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={<MdOutlinePerson />}
        />
        <Field
          label="Email Node Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<MdMailOutline />}
        />
        <Field
          label="Security Key Cipher"
          placeholder="Create account key"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          type={showPw ? "text" : "password"}
          icon={<LockIconWrapper />}
          rightEl={
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="text-slate-400 cursor-pointer hover:text-pink-500 text-base transition-colors"
            >
              {showPw ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          }
        />
        <Field
          label="Verify Passkey Match"
          type="password"
          placeholder="Repeat account key"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          icon={<LockIconWrapper />}
        />
      </div>

      <p className="text-[11px] font-medium text-slate-400 text-center leading-relaxed px-2">
        By initializing an active profile node framework, you register agreement
        to our{" "}
        <span className="text-indigo-600 hover:underline font-bold cursor-pointer">
          Terms Matrix
        </span>{" "}
        and{" "}
        <span className="text-indigo-600 hover:underline font-bold cursor-pointer">
          Privacy Node
        </span>
        .
      </p>

      <button
        onClick={handleRegister}
        className="w-full py-3 bg-gradient-to-tr cursor-pointer from-pink-500 to-indigo-600 hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/10 hover:scale-[1.01] transition transform active:scale-100 tracking-wider uppercase mt-2"
      >
        Deploy Node Instance →
      </button>

      <p className="text-center text-xs font-semibold text-slate-400 mt-1">
        Already verified within cluster?{" "}
        <span
          onClick={onSwitch}
          className="text-pink-600 font-bold hover:underline cursor-pointer"
        >
          Sign In
        </span>
      </p>
    </div>
  );
}

/* ── Main Framework Layout Module Export ──────────────────────── */
export default function AuthPages() {
  const [page, setPage] = useState("login");

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-pink-500/10 selection:text-pink-600">
      {/* ── Visual Ambient Background Glow System ── */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-pink-200/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-200/30 blur-[130px] pointer-events-none" />

      {/* ✅ FIXED: Changed 'w-fullHon' to 'w-full' to preserve exact layout balance */}
      <div className="relative z-10 w-full max-w-[400px] flex flex-col">
        {/* Core Upper Branding Badge */}
        <div className="flex items-center gap-2 justify-center mb-5">
          <div className="flex gap-1.5">
            {["bg-pink-500", "bg-indigo-600", "bg-purple-400"].map(
              (color, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${color} animate-pulse`}
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ),
            )}
          </div>
          <span className="text-xs font-mono font-black tracking-[0.25em] text-indigo-950 uppercase">
            Clixora Matrix
          </span>
        </div>

        {/* Unified Interface Sliding Navigation Segment */}
        <div className="grid grid-cols-2 gap-1.5 bg-slate-200/60 border border-slate-200/40 p-1.5 rounded-2xl mb-4 shadow-sm backdrop-blur-sm">
          <button
            onClick={() => setPage("login")}
            className={`py-2.5 text-xs cursor-pointer font-bold tracking-wider uppercase rounded-xl transition-all ${
              page === "login"
                ? "bg-white text-slate-800 shadow-md shadow-slate-200/60"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setPage("signup")}
            className={`py-2.5 text-xs cursor-pointer font-bold tracking-wider uppercase rounded-xl transition-all ${
              page === "signup"
                ? "bg-white text-slate-800 shadow-md shadow-slate-200/60"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Register
          </button>
        </div>

        {/* Main Interface Content Display Card */}
        <div className="bg-white/80 border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-950/[0.02] backdrop-blur-xl relative">
          {/* Subtle Top Accent Highlight */}
          <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-pink-400/40 to-transparent" />

          <div>
            {page === "login" ? (
              <LoginPage key="login" onSwitch={() => setPage("signup")} />
            ) : (
              <SignupPage key="signup" onSwitch={() => setPage("login")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline fallback lock interface vector layout hook wrapper
const LockIconWrapper = () => <MdLockOutline className="text-lg" />;
