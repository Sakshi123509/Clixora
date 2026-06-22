import logo from "../assets/logo1.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/Auth.js";

import { MdMailOutline, MdLockOutline, MdOutlinePerson } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

/* ── REUSABLE CUSTOM MATRIX LOADER (Fully Responsive Screen-Center) ── */
function MatrixLoader({ message = "Synchronizing node credentials..." }) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4 w-full max-w-[260px] text-center transform transition-transform duration-300 scale-95 sm:scale-100">
        <div className="relative w-11 h-11 sm:w-12 sm:h-12">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-pink-500 animate-spin" />
          <div className="absolute inset-2.5 rounded-full bg-indigo-600 animate-pulse" />
        </div>
        <p className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-slate-800 uppercase animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}

/* ── INPUT UI CONTEXT ATOM (Mobile Touch Friendly Padding & Height) ── */
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
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[9px] sm:text-[10px] tracking-widest uppercase font-mono font-bold text-slate-400 pl-0.5">
        {label}
      </label>
      <div className="relative w-full group">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 text-base sm:text-lg transition-colors pointer-events-none flex items-center">
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full text-xs font-medium text-slate-700 placeholder-slate-300/95 bg-slate-50 border border-slate-200/80 rounded-xl outline-none transition-all focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 ${icon ? "pl-9 sm:pl-10" : "pl-4"} ${rightEl ? "pr-9 sm:pr-10" : "pr-4"} py-2.5 sm:py-3`}
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

/* ── LOGIN MODULE INTERFACE ── */
function LoginPage({ onSwitch, setLoading, setLoaderMessage }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !pw) return alert("Please populate all credential fragments.");
    setLoaderMessage("Authenticating standard cluster...");
    setLoading(true);
    try {
      const data = await loginUser({ email, password: pw });
      if (data.token) {
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.username);
        navigate("/dashboard");
      } else {
        alert(data.message || "Authentication aborted.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login sequence rejected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3.5 sm:gap-4 animate-fadeIn">
      <div className="flex items-center gap-3 bg-slate-50/60 p-2.5 sm:p-3 rounded-2xl border border-slate-200/50">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 p-0.5 shadow-sm flex-shrink-0">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
            <img src={logo} alt="Logo" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-[11px] sm:text-xs font-black text-slate-900 tracking-wider uppercase">
            Welcome Back
          </h2>
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 truncate">
            Sign in to initialize creator session
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
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
          icon={<MdLockOutline className="text-base sm:text-lg" />} // 🌟 FIXED: Direct icon declaration to bypass crash
          rightEl={
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="text-slate-400 cursor-pointer hover:text-pink-500 text-base transition-colors flex items-center p-1"
            >
              {showPw ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          }
        />
      </div>

      <div className="text-right">
        <span className="text-[9px] sm:text-[10px] text-slate-400 hover:text-pink-600 transition cursor-pointer font-bold uppercase tracking-wider">
          Forgot passkey cipher?
        </span>
      </div>

      <button
        onClick={handleLogin}
        className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 cursor-pointer text-white font-black text-xs rounded-xl shadow-md transition transform active:scale-[0.99] tracking-wider uppercase"
      >
        Authenticate Cluster →
      </button>

      <p className="text-center text-[11px] sm:text-xs font-bold text-slate-400 mt-1">
        New to the matrix?{" "}
        <span
          onClick={onSwitch}
          className="text-pink-500 font-extrabold hover:underline cursor-pointer ml-1 inline-block"
        >
          Create instance node
        </span>
      </p>
    </div>
  );
}

/* ── SIGNUP MODULE INTERFACE ── */
function SignupPage({ onSwitch, setLoading, setLoaderMessage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !pw) return alert("All parameters required.");
    if (pw !== confirm) return alert("Ciphers mismatch!");
    setLoaderMessage("Spawning new node framework...");
    setLoading(true);
    try {
      const data = await registerUser({ username: name, email, password: pw });
      if (data.success || data.user || data.message) {
        alert("Registration successfully committed! 🎉");
        onSwitch();
      }
    } catch (err) {
      alert("Registration pipeline failure.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3.5 sm:gap-4 animate-fadeIn">
      <div className="flex items-center gap-3 bg-slate-50/60 p-2.5 sm:p-3 rounded-2xl border border-slate-200/50">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 p-0.5 shadow-sm flex-shrink-0">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
            <img src={logo} alt="Logo" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-[11px] sm:text-xs font-black text-slate-900 tracking-wider uppercase">
            Join Clixora Matrix
          </h2>
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 truncate">
            Spawn clean node instance profile
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
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
          icon={<MdLockOutline className="text-base sm:text-lg" />} // 🌟 FIXED
          rightEl={
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="text-slate-400 cursor-pointer hover:text-pink-500 text-base transition-colors flex items-center p-1"
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
          icon={<MdLockOutline className="text-base sm:text-lg" />} // 🌟 FIXED
        />
      </div>

      <button
        onClick={handleRegister}
        className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 cursor-pointer text-white font-black text-xs rounded-xl shadow-md transition transform active:scale-[0.99] tracking-wider uppercase mt-1"
      >
        Deploy Node Instance →
      </button>

      <p className="text-center text-[11px] sm:text-xs font-bold text-slate-400 mt-1">
        Already verified cluster?{" "}
        <span
          onClick={onSwitch}
          className="text-pink-500 font-extrabold hover:underline cursor-pointer ml-1 inline-block"
        >
          Sign In
        </span>
      </p>
    </div>
  );
}

/* ── MAIN FRAMEWORK LAYOUT MODULE ── */
export default function AuthPages() {
  const [page, setPage] = useState("login");
  const [loading, setLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState("");

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      .animate-fadeIn { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      {loading && <MatrixLoader message={loaderMessage} />}

      <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans select-none">
        
        {/* Dynamic Mobile Blur Optimizations */}
        <div className="absolute top-[-10%] left-[-10%] w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] rounded-full bg-pink-400/10 blur-[60px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] rounded-full bg-rose-400/10 blur-[60px] sm:blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[350px] sm:max-w-[380px] flex flex-col my-auto">
          
          {/* Header Title */}
          <div className="flex items-center gap-2 justify-center mb-5 sm:mb-6">
            <div className="flex gap-1">
              {["bg-pink-500", "bg-rose-500", "bg-slate-400"].map((color, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${color}`} />
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono font-black tracking-[0.25em] sm:tracking-[0.3em] text-slate-800 uppercase">
              Clixora Engine Matrix
            </span>
          </div>

          {/* Navigation Toggle Tabs */}
          <div className="grid grid-cols-2 gap-1 bg-slate-200/50 border border-slate-200/30 p-1 rounded-2xl mb-4 shadow-inner">
            <button
              onClick={() => setPage("login")}
              className={`py-2 text-[11px] sm:text-xs cursor-pointer font-black tracking-wider uppercase rounded-xl transition-all ${page === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setPage("signup")}
              className={`py-2 text-[11px] sm:text-xs cursor-pointer font-black tracking-wider uppercase rounded-xl transition-all ${page === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
            >
              Register
            </button>
          </div>

          {/* Interactive Core Box Wrapper */}
          <div className="bg-white border border-slate-200/70 rounded-3xl p-4 sm:p-5 shadow-xl shadow-slate-900/[0.02] relative">
            <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-pink-400/30 to-transparent" />
            <div>
              {page === "login" ? (
                <LoginPage
                  key="login"
                  onSwitch={() => setPage("signup")}
                  setLoading={setLoading}
                  setLoaderMessage={setLoaderMessage}
                />
              ) : (
                <SignupPage
                  key="signup"
                  onSwitch={() => setPage("login")}
                  setLoading={setLoading}
                  setLoaderMessage={setLoaderMessage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}