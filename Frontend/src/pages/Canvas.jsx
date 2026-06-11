// import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// // ── Canvas page — Fabric.js editor aayega yahan later ──────────
// // Abhi sirf placeholder hai with image preview
// // Fabric.js integration next phase mein hogi

// export default function Canvas() {
//   const { state }  = useLocation();
//   const navigate   = useNavigate();
//   const imageUrl   = state?.imageUrl || null;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700&display=swap');
//         * { box-sizing:border-box; margin:0; padding:0; }
//         @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
//       `}</style>

//       <div style={{ display:"flex", width:"100%", flexDirection:"column", height:"100vh", background:"#fcf8fa", fontFamily:"'Outfit',sans-serif" }}>
//         <Navbar />

//         <div style={{ flex:1, display:"flex", overflow:"hidden" }}>

//           {/* ── LEFT TOOLBAR (placeholder) ── */}
//           <div style={{
//             width:220, background:"#fff", borderRight:"1px solid rgba(255,194,209,.4)",
//             padding:"20px 16px", display:"flex", flexDirection:"column", gap:12,
//           }}>
//             <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#a090ab", fontFamily:"'Syne',sans-serif", marginBottom:4 }}>
//               Tools
//             </p>

//             {/* Tool buttons — coming soon */}
//             {[
//               { icon:"T",  label:"Add Text"    },
//               { icon:"□",  label:"Add Shape"   },
//               { icon:"🖼", label:"Add Image"   },
//               { icon:"🎨", label:"Background"  },
//               { icon:"↔", label:"Resize"       },
//             ].map((t, i) => (
//               <button key={i} style={{
//                 width:"100%", padding:"10px 12px",
//                 background:"#fcf8fa", border:"1px solid rgba(255,194,209,.45)",
//                 borderRadius:8, cursor:"not-allowed",
//                 fontFamily:"'Outfit',sans-serif", fontSize:"0.86rem", color:"#a090ab",
//                 display:"flex", alignItems:"center", gap:9, textAlign:"left",
//                 opacity:.65,
//               }}>
//                 <span style={{ fontSize:16, width:22 }}>{t.icon}</span>
//                 {t.label}
//               </button>
//             ))}

//             <div style={{ marginTop:"auto", padding:"12px 10px", background:"linear-gradient(135deg,#ffe5ec,#f3e8ff)", borderRadius:10, border:"1px solid rgba(255,194,209,.5)" }}>
//               <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"11px", fontWeight:700, color:"#7b2cbf", marginBottom:4 }}>Coming Soon</p>
//               <p style={{ fontSize:"11px", color:"#6b5e73", lineHeight:1.5 }}>Full Fabric.js canvas editor with drag, resize, and text tools.</p>
//             </div>
//           </div>

//           {/* ── CANVAS AREA ── */}
//           <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, gap:20, animation:"fadeUp .5s ease both" }}>

//             {!imageUrl ? (
//               <div style={{ textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
//                 <div style={{ width:64, height:64, borderRadius:16, background:"linear-gradient(135deg,#ffe5ec,#f3e8ff)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>✏️</div>
//                 <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"1rem", fontWeight:700, color:"#6b5e73" }}>No thumbnail to edit</p>
//                 <p style={{ fontSize:"0.85rem", color:"#a090ab", maxWidth:240, lineHeight:1.6 }}>Go to Generator, create a thumbnail, then open it here to edit</p>
//                 <button onClick={() => navigate("/generate")} style={{
//                   marginTop:8, padding:"10px 24px", border:"none", borderRadius:8,
//                   background:"linear-gradient(135deg,#ff91af,#7b2cbf)", color:"#fff",
//                   fontFamily:"'Outfit',sans-serif", fontWeight:600, cursor:"pointer",
//                 }}>← Back to Generator</button>
//               </div>
//             ) : (
//               <>
//                 {/* Canvas preview */}
//                 <div style={{
//                   position:"relative", borderRadius:12, overflow:"hidden",
//                   boxShadow:"0 12px 40px rgba(123,44,191,.16)",
//                   border:"2px solid rgba(123,44,191,.2)",
//                   maxWidth:760, width:"100%",
//                 }}>
//                   <img src={imageUrl} alt="Canvas preview"
//                     style={{ width:"100%", aspectRatio:"16/9", objectFit:"cover", display:"block" }} />

//                   {/* coming soon overlay */}
//                   <div style={{
//                     position:"absolute", inset:0,
//                     background:"rgba(36,20,43,.45)", backdropFilter:"blur(3px)",
//                     display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10,
//                   }}>
//                     <div style={{ background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.25)", borderRadius:14, padding:"18px 28px", textAlign:"center" }}>
//                       <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.1rem", fontWeight:800, color:"#fff", marginBottom:6 }}>Canvas Editor</p>
//                       <p style={{ fontSize:"0.85rem", color:"rgba(255,255,255,.7)", lineHeight:1.5 }}>Fabric.js drag & drop editor<br/>coming in the next phase</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bottom actions */}
//                 <div style={{ display:"flex", gap:12 }}>
//                   <button onClick={() => navigate(-1)} style={{
//                     padding:"10px 22px", border:"1.5px solid rgba(255,194,209,.6)", borderRadius:8,
//                     background:"#fff", color:"#6b5e73",
//                     fontFamily:"'Outfit',sans-serif", fontSize:"0.88rem", fontWeight:500, cursor:"pointer",
//                   }}>← Go Back</button>
//                   <button onClick={() => {
//                     const a = document.createElement("a");
//                     a.href = imageUrl; a.download = `clixora-${Date.now()}.png`; a.click();
//                   }} style={{
//                     padding:"10px 22px", border:"none", borderRadius:8,
//                     background:"linear-gradient(135deg,#ff91af,#7b2cbf)", color:"#fff",
//                     fontFamily:"'Outfit',sans-serif", fontSize:"0.88rem", fontWeight:600, cursor:"pointer",
//                   }}>↓ Download</button>
//                 </div>
//               </>
//             )}
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }


import React from 'react';

export default function CanvasDashboard() {
  return (
    <div className="h-screen flex flex-col bg-white text-slate-900 font-sans">
      {/* Platform Sub-Menu Toolbar */}
      <header className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex justify-between items-center shrink-0 text-sm font-medium text-slate-600">
        <div className="flex gap-4">
          <button className="hover:text-slate-900 transition">File</button>
          <button className="hover:text-slate-900 transition">Edit</button>
          <button className="hover:text-slate-900 transition text-pink-600 font-semibold">Tools</button>
          <button className="hover:text-slate-900 transition">Export</button>
        </div>
        <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm">
          ✨ Share / Sync Sync
        </button>
      </header>

      {/* Tri-Pane Writing Interface */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar Pane: Sidebar Navigation Chapters */}
        <aside className="w-[240px] border-r border-slate-200 bg-slate-50/50 p-4 space-y-4 overflow-y-auto">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-2 mb-2">Outline Maps</span>
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer">Manuscript Summary</div>
              <div className="px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer">Character Index</div>
            </div>
          </div>
          
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-2 mb-2">Manuscript Chapters</span>
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm font-semibold rounded-lg bg-pink-50 text-pink-700 cursor-pointer">Chapter 1: The Entry</div>
              <div className="px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer">Chapter 2: False Leads</div>
              <div className="px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer">Chapter 3: Red Herring</div>
            </div>
          </div>
          <button className="w-full py-2 text-dashed border border-dashed border-slate-300 hover:border-slate-400 text-slate-500 rounded-lg text-xs font-semibold transition mt-2">+ Add New Chapter</button>
        </aside>

        {/* Center Main Dynamic Writing Canvas Workspace */}
        <main className="flex-1 bg-white overflow-y-auto px-12 py-16 flex justify-center">
          <article className="max-w-2xl w-full">
            <h1 className="font-sans font-extrabold text-4xl text-slate-900 tracking-tight mb-8">The Investigation Begins</h1>
            <div className="font-serif text-xl leading-relaxed text-slate-800 space-y-6 focus:outline-none" contentEditable defaultValue="">
              <p>
                Detective Marcus stared down at the wet pavement, his collar flipped up against the relentless drizzle. The streetlamps cast long, distorted yellow ribs across the asphalt, giving the entire alleyway the appearance of a skeletal cage.
              </p>
              <p>
                He hadn't seen a crime scene this sterile and deliberate since his early operational days in the dark underbelly of the Third District. No stray prints, no dynamic tracking fiber indicators left trailing behind.
              </p>
              <p>
                "We found something," Elena whispered directly behind him out of the shadows. Her voice was steady, but her fingers shook visibly as she held up a microscopic crystal vial glowing with a deep crimson hue.
              </p>
            </div>
          </article>
        </main>

        {/* Right Panel Workspace Assistant */}
        <aside className="w-[280px] border-l border-slate-200 bg-slate-50/50 p-5 space-y-6 overflow-y-auto">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Workspace Scope</span>
            <div className="bg-white p-3.5 border border-slate-200 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-slate-900">1,240</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Total Words Written</div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Daily Writing Target</span>
              <span className="text-xs font-semibold text-slate-600">62%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-pink-600 h-full rounded-full" style={{ width: '62%' }}></div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">AI Context Commands</span>
            <div className="space-y-2">
              <button className="w-full text-left bg-white border border-slate-200 hover:border-pink-400 hover:text-pink-600 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-slate-700 shadow-sm flex items-center justify-between">
                <span>🔍 Grammar & Polish Fix</span> <span>&rarr;</span>
              </button>
              <button className="w-full text-left bg-white border border-slate-200 hover:border-pink-400 hover:text-pink-600 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-slate-700 shadow-sm flex items-center justify-between">
                <span>🚀 Expand Creative Sequence</span> <span>&rarr;</span>
              </button>
              <button className="w-full text-left bg-white border border-slate-200 hover:border-pink-400 hover:text-pink-600 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-slate-700 shadow-sm flex items-center justify-between">
                <span>📉 Simplify Narrative Flow</span> <span>&rarr;</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
