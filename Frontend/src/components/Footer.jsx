import React from "react";

const Footer = () => {
  return (
    <div>
      {/* ── 🌐 MODERN RESPONSIVE FOOTER SECTION ── */}
      <footer className="bg-white border-t border-slate-200 w-full relative z-20 font-outfit mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Logo & Manifesto column */}
          <div className="md:col-span-5 space-y-3">
            <div
              className="font-black text-xl text-pink-500  tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              CLIXORA{" "}
              <span className="text-slate-900 text-xs font-mono font-normal">
                .AI
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-medium">
              Deploying advanced distributed edge vector generation models
              alongside real-time multi-niche performance evaluation indices.
            </p>
          </div>

          {/* Quick Route Links Matrix */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono mb-3">
                Core Routing
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                <li>
                  <a href="/" className="hover:text-pink-600 transition">
                    Home Node
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboard"
                    className="hover:text-pink-600 transition"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/generate"
                    className="hover:text-pink-600 transition"
                  >
                    Generator
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono mb-3">
                System
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                <li>
                  <a href="#" className="hover:text-pink-600 transition">
                    API Endpoints
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-600 transition">
                    Docs Matrix
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Live System Operational Status Node */}
          <div className="md:col-span-3 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between w-full">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                Edge Cluster
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="mt-2 text-xs font-bold text-slate-800 font-mono tracking-tight">
              All Pipelines Operational
            </div>
          </div>
        </div>

        {/* Lower System Metadata Bar */}
        <div className="bg-slate-50/60 border-t border-slate-200/60 py-4 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] font-medium text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} Clixora Dev Nodes. All
              architectural assets secure.
            </div>
            <div className="font-mono text-[10px] tracking-tight">
              v1.2.0_stable // Cloudflare Layered Architecture
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
