import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [thumbnails, setThumbnails] = useState([]);
  const [loading,    setLoading]    = useState(true);

  // fetch user's saved thumbnails
  useEffect(() => { fetchThumbnails(); }, []);

  const fetchThumbnails = async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/thumbnails", {
        headers:{ "Authorization":`Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setThumbnails(data.thumbnails || []);
    } catch {
      setThumbnails([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this thumbnail?")) return;
    try {
      await fetch(`/api/thumbnails/${id}`, {
        method:"DELETE",
        headers:{ "Authorization":`Bearer ${localStorage.getItem("token")}` },
      });
      setThumbnails(prev => prev.filter(t => t._id !== id));
    } catch { alert("Delete failed"); }
  };

  const handleDownload = (url) => {
    const a = document.createElement("a");
    a.href = url; a.download = `clixora-${Date.now()}.png`; a.click();
  };

  const scoreColor = (s) => s >= 80 ? "#22c55e" : s >= 60 ? "#f59e0b" : "#ef4444";

  const sectionTitle = { fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"#a090ab", fontFamily:"'Syne',sans-serif" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .skel { border-radius:12px; background:linear-gradient(90deg,#f0e8f4 25%,#fce8f0 50%,#f0e8f4 75%); background-size:1200px 100%; animation:shimmer 1.5s infinite linear; }
        .dash-card:hover { border-color:#ffc2d1 !important; box-shadow:0 8px 28px rgba(123,44,191,.12) !important; }
        .dash-card:hover .card-actions { opacity:1 !important; }
      `}</style>

      <div style={{ display:"flex", width:"100%", flexDirection:"column", height:"100vh", background:"#fcf8fa", fontFamily:"'Outfit',sans-serif" }}>
        <Navbar />

        <div style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>

          {/* Header row */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
            <div>
              <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.4rem", fontWeight:800, color:"#24142b", letterSpacing:"-.02em" }}>My Thumbnails</h1>
              <p style={{ fontSize:"0.87rem", color:"#a090ab", marginTop:4 }}>
                {loading ? "Loading..." : `${thumbnails.length} thumbnail${thumbnails.length !== 1 ? "s" : ""} created`}
              </p>
            </div>
            <button onClick={() => navigate("/generate")} style={{
              padding:"10px 22px", border:"none", borderRadius:8,
              background:"linear-gradient(135deg,#ff91af,#7b2cbf)", color:"#fff",
              fontFamily:"'Outfit',sans-serif", fontSize:"0.88rem", fontWeight:700,
              cursor:"pointer", boxShadow:"0 4px 14px rgba(123,44,191,.28)",
              display:"flex", alignItems:"center", gap:7,
            }}>✦ New Thumbnail</button>
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16 }}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i}>
                  <div className="skel" style={{ aspectRatio:"16/9", marginBottom:10 }} />
                  <div className="skel" style={{ height:14, width:"60%", marginBottom:6 }} />
                  <div className="skel" style={{ height:12, width:"40%" }} />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && thumbnails.length === 0 && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:340, gap:14, textAlign:"center", animation:"fadeUp .5s ease both" }}>
              <div style={{ width:64, height:64, borderRadius:16, background:"linear-gradient(135deg,#ffe5ec,#f3e8ff)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>📁</div>
              <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"1rem", fontWeight:700, color:"#6b5e73" }}>No thumbnails yet</p>
              <p style={{ fontSize:"0.85rem", color:"#a090ab", maxWidth:240, lineHeight:1.6 }}>Generate your first thumbnail and it will appear here</p>
              <button onClick={() => navigate("/generate")} style={{
                marginTop:4, padding:"10px 24px", border:"none", borderRadius:8,
                background:"linear-gradient(135deg,#ff91af,#7b2cbf)", color:"#fff",
                fontFamily:"'Outfit',sans-serif", fontWeight:600, cursor:"pointer",
              }}>✦ Start Generating</button>
            </div>
          )}

          {/* Thumbnails grid */}
          {!loading && thumbnails.length > 0 && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16, animation:"fadeUp .5s ease both" }}>
              {thumbnails.map((t, i) => (
                <div key={t._id || i} className="dash-card" style={{
                  background:"#fff", borderRadius:14,
                  border:"1px solid rgba(255,194,209,.35)",
                  boxShadow:"0 2px 10px rgba(123,44,191,.07)",
                  overflow:"hidden", transition:"all .22s",
                  position:"relative",
                }}>
                  {/* Image */}
                  <div style={{ position:"relative" }}>
                    <img src={t.imageUrl} alt={t.title || "Thumbnail"}
                      style={{ width:"100%", aspectRatio:"16/9", objectFit:"cover", display:"block" }} />

                    {/* Score badge */}
                    {t.ctaScore && (
                      <div style={{
                        position:"absolute", top:8, right:8,
                        background:"rgba(0,0,0,.65)", color:"#fff",
                        fontSize:11, fontWeight:700, padding:"3px 9px",
                        borderRadius:99, backdropFilter:"blur(6px)",
                        display:"flex", alignItems:"center", gap:4,
                      }}>
                        <span style={{ color: scoreColor(t.ctaScore) }}>●</span>
                        {t.ctaScore}
                      </div>
                    )}

                    {/* Hover action overlay */}
                    <div className="card-actions" style={{
                      position:"absolute", inset:0,
                      background:"rgba(36,20,43,.55)", backdropFilter:"blur(2px)",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                      opacity:0, transition:"opacity .2s",
                    }}>
                      <button onClick={() => navigate("/cta-score", { state:{ imageUrl: t.imageUrl } })} style={{
                        padding:"8px 14px", border:"none", borderRadius:7,
                        background:"linear-gradient(135deg,#ff91af,#7b2cbf)", color:"#fff",
                        fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif",
                      }}>📊 Score</button>
                      <button onClick={() => navigate("/canvas", { state:{ imageUrl: t.imageUrl } })} style={{
                        padding:"8px 14px", border:"none", borderRadius:7,
                        background:"rgba(255,255,255,.9)", color:"#7b2cbf",
                        fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif",
                      }}>✏️ Edit</button>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div style={{ padding:"12px 14px" }}>
                    <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"0.88rem", fontWeight:700, color:"#24142b", marginBottom:4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {t.title || "Untitled"}
                    </p>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <span style={{ fontSize:11, color:"#a090ab" }}>
                        {t.createdAt ? new Date(t.createdAt).toLocaleDateString("en-IN",{ day:"numeric", month:"short" }) : ""}
                      </span>
                      <div style={{ display:"flex", gap:6 }}>
                        <button onClick={() => handleDownload(t.imageUrl)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:15, padding:3, color:"#7b2cbf" }} title="Download">↓</button>
                        <button onClick={() => handleDelete(t._id)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, padding:3, color:"#c0392b" }} title="Delete">🗑</button>
                      </div>
                    </div>

                    {/* CTA score bar */}
                    {t.ctaScore && (
                      <div style={{ marginTop:8 }}>
                        <div style={{ height:4, background:"rgba(123,44,191,.1)", borderRadius:99, overflow:"hidden" }}>
                          <div style={{ height:"100%", width:`${t.ctaScore}%`, borderRadius:99, background:`linear-gradient(90deg,#EC4899,#7b2cbf)` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

// import React from "react";

// export default function DashboardPage() {
//   const recentDrafts = [
//     {
//       title: "How I Closed a $100k Client Deal",
//       niche: "Business & Sales",
//       time: "Edited 2h ago",
//       score: 94,
//       imgurl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop",
//     },
//     {
//       title: "The Ultimate Guide to YouTube Growth",
//       niche: "Creator Tips",
//       time: "Edited 1d ago",
//       score: 91,
//       imgurl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=500&auto=format&fit=crop",
//     },
//     {
//       title: "Coding a SaaS App in 24 Hours",
//       niche: "Tech / Dev",
//       time: "Edited 3d ago",
//       score: 82,
//       imgurl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop",
//     },
//   ];

//   const quickStats = [
//     { title: "Generations Remaining", val: "148 / 200", icon: "💎" },
//     { title: "Average CTR Score", val: "89.2%", icon: "📈" },
//     { title: "Active Canvas Vectors", val: "24 Layers", icon: "📐" },
//     { title: "Cloudflare Sync Status", val: "Online", icon: "🟢" },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700&display=swap');
//         .font-outfit { font-family: 'Outfit', sans-serif; }
//       `}</style>

//       {/* TECH BACKGROUND OVERLAYS */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
//         <div className="absolute w-[700px] h-[700px] top-[20%] -right-[100px] rounded-full bg-indigo-600/10 blur-[140px]" />
//         <div className="absolute w-[600px] h-[600px] -bottom-[100px] left-[5%] rounded-full bg-pink-600/5 blur-[120px]" />
//       </div>

//       <div className="relative z-10 font-outfit">
//         {/* NAV */}
//         <nav className="bg-slate-950/60 backdrop-blur-xl border-b border-slate-800/80 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
//           <div className="flex items-center gap-3 font-black text-2xl tracking-tighter cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400" style={{ fontFamily: "'Syne', sans-serif" }}>
//             CLIXORA
//           </div>
//           <div className="flex gap-8 font-semibold text-slate-400 text-sm">
//             <a href="/" className="hover:text-pink-500 transition">Home</a>
//             <a href="/dashboard" className="text-pink-500 border-b-2 border-pink-500 pb-1">Dashboard</a>
//             <a href="/generate" className="hover:text-pink-500 transition">Generator Matrix</a>
//           </div>
//           <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md">JD</div>
//         </nav>

//         {/* METRICS HUB OVERVIEW */}
//         <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          
//           {/* USER VERIFICATION BAR */}
//           <div className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 backdrop-blur-xl relative overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center font-black text-xl shadow-xl shadow-pink-500/10">
//                 JD
//               </div>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h2 className="text-2xl font-black tracking-tight text-slate-100" style={{ fontFamily: "'Syne', sans-serif" }}>Workspace Console</h2>
//                   <span className="bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded">PRO LEVEL</span>
//                 </div>
//                 <p className="text-xs text-slate-400 font-medium mt-0.5">Session Key: <span className="font-mono text-indigo-400 select-all">clx_token_9472_auth_active</span></p>
//               </div>
//             </div>
//             <div className="flex gap-3 w-full md:w-auto">
//               <button className="flex-1 md:flex-none bg-slate-900 hover:bg-slate-800 border border-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition">Settings</button>
//               <a href="/generate" className="flex-1 md:flex-none text-center bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-pink-600/10 hover:from-pink-700 transition">
//                 + Launch Engine
//               </a>
//             </div>
//           </div>

//           {/* QUICK ANALYTICS METRICS */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {quickStats.map((m, i) => (
//               <div key={i} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 space-y-2 backdrop-blur-md">
//                 <div className="flex justify-between items-center">
//                   <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 font-mono">{m.title}</span>
//                   <span className="text-sm opacity-80">{m.icon}</span>
//                 </div>
//                 <div className="text-xl font-black text-slate-200 font-mono tracking-tight">{m.val}</div>
//               </div>
//             ))}
//           </div>

//           {/* RECENT THUMBNAILS CONTAINER */}
//           <div className="space-y-6">
//             <div className="flex justify-between items-end">
//               <div>
//                 <h3 className="text-xl font-black text-slate-200 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>RECENT GENERATED DRAUGHTS</h3>
//                 <p className="text-xs text-slate-500 mt-0.5">Live index matrix synchronized from user cloud nodes.</p>
//               </div>
//               <button className="text-xs font-mono font-bold text-pink-400 hover:text-pink-300 transition uppercase tracking-wider">All Assets &rarr;</button>
//             </div>

//             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {recentDrafts.map((draft, idx) => (
//                 <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 shadow-xl hover:border-slate-700 transition duration-300 group cursor-pointer flex flex-col justify-between">
//                   <div>
//                     {/* THUMBNAIL CONTAINER OVERLAY */}
//                     <div className="w-full aspect-video rounded-xl mb-4 overflow-hidden relative border border-slate-900 bg-slate-900">
//                       <img src={draft.imgurl} alt={draft.title} className="w-full h-full object-cover group-hover:scale-102 transition duration-500" />
//                       <div className="absolute top-2 right-2 bg-slate-950/90 backdrop-blur-md border border-slate-800 text-[9px] font-mono text-slate-400 px-2 py-0.5 rounded">
//                         {draft.time}
//                       </div>
//                     </div>
//                     <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400 block font-mono mb-1">{draft.niche}</span>
//                     <h4 className="font-bold text-sm text-slate-200 line-clamp-1 group-hover:text-pink-400 transition">{draft.title}</h4>
//                   </div>

//                   <div className="flex justify-between items-center pt-4 mt-4 border-t border-slate-900">
//                     <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">PREDICTIVE SCORE</span>
//                     <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md ${draft.score >= 85 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
//                       {draft.score}% CTR
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </main>
//       </div>
//     </div>
//   );
// }