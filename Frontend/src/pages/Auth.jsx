import logo from "../assets/logo1.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/Auth.js";

import { MdMailOutline, MdLockOutline, MdOutlinePerson } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

/* ── Reusable Custom Matrix Loader Component ─────────────────── */
function MatrixLoader({ message = "Synchronizing node credentials..." }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex flex-col items-center justify-center animate-in fade-in duration-300">
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4 max-w-[280px] text-center">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-pink-500 animate-spin" />
          <div className="absolute inset-2.5 rounded-full bg-indigo-600 animate-pulse" />
        </div>
        <p className="text-xs font-mono font-bold tracking-wider text-slate-800 uppercase animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}

/* ── Input UI Context Atom ───────────────────────────────────── */
function Field({ label, type = "text", placeholder, value, onChange, rightEl, icon }) {
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
          type={type} placeholder={placeholder} value={value} onChange={onChange}
          className={`w-full text-xs font-medium text-slate-700 placeholder-slate-300/95 bg-slate-50 border border-slate-200/80 rounded-xl outline-none transition-all focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 ${icon ? "pl-10" : "pl-4"} ${rightEl ? "pr-10" : "pr-4"} py-3`}
        />
        {rightEl && <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">{rightEl}</div>}
      </div>
    </div>
  );
}

/* ── Login Module Interface ──────────────────────────────────── */
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
    <div className="flex flex-col gap-4 animate-fadeIn">
      <div className="flex items-center gap-3.5 mb-1 bg-slate-50/60 p-3 rounded-2xl border border-slate-200/50">
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 p-0.5 shadow-sm flex-shrink-0">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
            <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-xs font-black text-slate-900 tracking-wider uppercase">Welcome Back</h2>
          <p className="text-[11px] font-bold text-slate-400 truncate">Sign in to initialize creator session</p>
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        <Field label="Email node address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} icon={<MdMailOutline />} />
        <Field
          label="Security Key Cipher" placeholder="••••••••••" value={pw} onChange={(e) => setPw(e.target.value)} type={showPw ? "text" : "password"} icon={<LockIconWrapper />}
          rightEl={<button type="button" onClick={() => setShowPw(!showPw)} className="text-slate-400 cursor-pointer hover:text-pink-500 text-base transition-colors flex items-center">{showPw ? <IoMdEyeOff /> : <IoMdEye />}</button>}
        />
      </div>

      <div className="text-right">
        <span className="text-[10px] text-slate-400 hover:text-pink-600 transition cursor-pointer font-bold uppercase tracking-wider">Forgot passkey cipher?</span>
      </div>

      <button onClick={handleLogin} className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 cursor-pointer text-white font-black text-xs rounded-xl shadow-md transition transform active:scale-98 tracking-wider uppercase">
        Authenticate Cluster →
      </button>

      <p className="text-center text-xs font-bold text-slate-400 mt-1">
        New to the matrix? <span onClick={onSwitch} className="text-pink-500 font-extrabold hover:underline cursor-pointer ml-1">Create instance node</span>
      </p>
    </div>
  );
}

/* ── Signup Module Interface ─────────────────────────────────── */
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
    <div className="flex flex-col gap-4 animate-fadeIn">
      <div className="flex items-center gap-3.5 mb-1 bg-slate-50/60 p-3 rounded-2xl border border-slate-200/50">
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 p-0.5 shadow-sm flex-shrink-0">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
            <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-xs font-black text-slate-900 tracking-wider uppercase">Join Clixora Matrix</h2>
          <p className="text-[11px] font-bold text-slate-400 truncate">Spawn clean node instance profile</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Field label="Profile Node Identifier" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} icon={<MdOutlinePerson />} />
        <Field label="Email Node Address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} icon={<MdMailOutline />} />
        <Field
          label="Security Key Cipher" placeholder="Create account key" value={pw} onChange={(e) => setPw(e.target.value)} type={showPw ? "text" : "password"} icon={<LockIconWrapper />}
          rightEl={<button type="button" onClick={() => setShowPw(!showPw)} className="text-slate-400 cursor-pointer hover:text-pink-500 text-base transition-colors flex items-center">{showPw ? <IoMdEyeOff /> : <IoMdEye />}</button>}
        />
        <Field label="Verify Passkey Match" type="password" placeholder="Repeat account key" value={confirm} onChange={(e) => setConfirm(e.target.value)} icon={<LockIconWrapper />} />
      </div>

      <button onClick={handleRegister} className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 cursor-pointer text-white font-black text-xs rounded-xl shadow-md transition transform active:scale-98 tracking-wider uppercase mt-1">
        Deploy Node Instance →
      </button>

      <p className="text-center text-xs font-bold text-slate-400 mt-1">
        Already verified cluster? <span onClick={onSwitch} className="text-pink-500 font-extrabold hover:underline cursor-pointer ml-1">Sign In</span>
      </p>
    </div>
  );
}

/* ── Main Framework Layout Module Export ──────────────────────── */
export default function AuthPages() {
  const [page, setPage] = useState("login");
  const [loading, setLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState("");

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      .animate-fadeIn { animation: fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      {loading && <MatrixLoader message={loaderMessage} />}

      <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans select-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-pink-400/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-rose-400/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[380px] flex flex-col">
          
          <div className="flex items-center gap-2 justify-center mb-6">
            <div className="flex gap-1">
              {["bg-pink-500", "bg-rose-500", "bg-slate-400"].map((color, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${color}`} />
              ))}
            </div>
            <span className="text-[11px] font-syne font-black tracking-[0.3em] text-slate-800 uppercase">
              Clixora Engine Matrix
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1 bg-slate-200/50 border border-slate-200/30 p-1 rounded-2xl mb-4 shadow-inner">
            <button onClick={() => setPage("login")} className={`py-2 text-xs cursor-pointer font-black tracking-wider uppercase rounded-xl transition-all ${page === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>Sign In</button>
            <button onClick={() => setPage("signup")} className={`py-2 text-xs cursor-pointer font-black tracking-wider uppercase rounded-xl transition-all ${page === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>Register</button>
          </div>

          <div className="bg-white border border-slate-200/70 rounded-3xl p-5 shadow-xl shadow-slate-900/[0.02] relative">
            <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-pink-400/30 to-transparent" />
            <div>
              {page === "login" ? (
                <LoginPage key="login" onSwitch={() => setPage("signup")} setLoading={setLoading} setLoaderMessage={setLoaderMessage} />
              ) : (
                <SignupPage key="signup" onSwitch={() => setPage("login")} setLoading={setLoading} setLoaderMessage={setLoaderMessage} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const LockIconWrapper = () => <MdLockOutline className="text-lg" />;