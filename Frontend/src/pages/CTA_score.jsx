// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function CTAScore() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const imageUrl = state?.imageUrl || null;

//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   // result shape:
//   // {
//   //   overall: 84,
//   //   metrics: [
//   //     { label:"Contrast",     score:90 },
//   //     { label:"Readability",  score:78 },
//   //     { label:"Color Harmony",score:85 },
//   //     { label:"Title Clarity",score:88 },
//   //     { label:"Click Appeal", score:80 },
//   //   ],
//   //   recommendations: ["Increase text contrast","Add a face/emotion","..."]
//   // }

//   // ── Auto-fetch when page loads ──────────────────────────────
//   useEffect(() => {
//     if (imageUrl) fetchScore();
//   }, []);

//   const fetchScore = async () => {
//     if (!imageUrl) return;
//     setLoading(true);
//     setResult(null);
//     try {
//       const res = await fetch("/api/cta-score", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ imageUrl }),
//       });
//       const data = await res.json();
//       setResult(data);
//     } catch {
//       alert("Score fetch failed. Try again.");
//     }
//     setLoading(false);
//   };

//   // ── helpers ────────────────────────────────────────────────
//   const scoreColor = (s) =>
//     s >= 80 ? "#22c55e" : s >= 60 ? "#f59e0b" : "#ef4444";

//   const scoreLabel = (s) =>
//     s >= 80 ? "Great" : s >= 60 ? "Fair" : "Needs Work";

//   const labelStyle = {
//     fontSize: 13,
//     fontWeight: 600,
//     color: "#24142b",
//     fontFamily: "'Outfit',sans-serif",
//   };
//   const sectionTitle = {
//     fontSize: 10,
//     fontWeight: 700,
//     textTransform: "uppercase",
//     letterSpacing: "0.1em",
//     color: "#a090ab",
//     marginBottom: 12,
//     fontFamily: "'Syne',sans-serif",
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700&display=swap');
//         * { box-sizing:border-box; margin:0; padding:0; }
//         @keyframes shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
//         @keyframes spin    { to{transform:rotate(360deg)} }
//         @keyframes barFill { from{width:0%} to{width:var(--w)} }
//         @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
//         .skel {
//           border-radius:10px;
//           background:linear-gradient(90deg,#f0e8f4 25%,#fce8f0 50%,#f0e8f4 75%);
//           background-size:1200px 100%; animation:shimmer 1.5s infinite linear;
//         }
//         .bar-fill { animation:barFill .9s cubic-bezier(.4,0,.2,1) forwards; }
//         .rec-item:hover { border-color:#ffc2d1 !important; background:#fff8fb !important; }
//       `}</style>

//       <div
//         style={{
//           display: "flex",
//           width: "100%",
//           flexDirection: "column",
//           height: "100vh",
//           background: "#fcf8fa",
//           fontFamily: "'Outfit',sans-serif",
//         }}
//       >
//         <Navbar />

//         <div
//           style={{
//             flex: 1,
//             overflowY: "auto",
//             padding: "28px 32px",
//             maxWidth: 1100,
//             margin: "0 auto",
//             width: "100%",
//           }}
//         >
//           {/* No image passed */}
//           {!imageUrl && (
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: "100%",
//                 gap: 12,
//                 textAlign: "center",
//               }}
//             >
//               <div
//                 style={{
//                   width: 64,
//                   height: 64,
//                   borderRadius: 16,
//                   background: "linear-gradient(135deg,#ffe5ec,#f3e8ff)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: 28,
//                 }}
//               >
//                 ⚠️
//               </div>
//               <p
//                 style={{
//                   fontFamily: "'Syne',sans-serif",
//                   fontSize: "1rem",
//                   fontWeight: 700,
//                   color: "#6b5e73",
//                 }}
//               >
//                 No thumbnail selected
//               </p>
//               <p style={{ fontSize: "0.85rem", color: "#a090ab" }}>
//                 Go back to Generator and select a thumbnail first
//               </p>
//               <button
//                 onClick={() => navigate("/generate")}
//                 style={{
//                   marginTop: 8,
//                   padding: "10px 24px",
//                   border: "none",
//                   borderRadius: 8,
//                   background: "linear-gradient(135deg,#ff91af,#7b2cbf)",
//                   color: "#fff",
//                   fontFamily: "'Outfit',sans-serif",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                 }}
//               >
//                 ← Back to Generator
//               </button>
//             </div>
//           )}

//           {imageUrl && (
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 24,
//                 animation: "fadeUp .5s ease both",
//               }}
//             >
//               {/* Page header */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   flexWrap: "wrap",
//                   gap: 12,
//                 }}
//               >
//                 <div>
//                   <h1
//                     style={{
//                       fontFamily: "'Syne',sans-serif",
//                       fontSize: "1.5rem",
//                       fontWeight: 800,
//                       color: "#24142b",
//                       letterSpacing: "-.02em",
//                     }}
//                   >
//                     CTA Score Analysis
//                   </h1>
//                   <p
//                     style={{
//                       fontSize: "0.88rem",
//                       color: "#a090ab",
//                       marginTop: 4,
//                     }}
//                   >
//                     AI-powered click-through appeal breakdown
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => navigate("/generate")}
//                   style={{
//                     padding: "9px 18px",
//                     border: "1.5px solid rgba(255,194,209,.6)",
//                     borderRadius: 8,
//                     background: "#fff",
//                     color: "#6b5e73",
//                     fontFamily: "'Outfit',sans-serif",
//                     fontSize: "0.87rem",
//                     fontWeight: 500,
//                     cursor: "pointer",
//                   }}
//                 >
//                   ← Back to Generator
//                 </button>
//               </div>

//               {/* Two column layout */}
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1.6fr",
//                   gap: 20,
//                   alignItems: "start",
//                 }}
//               >
//                 {/* LEFT — image + overall score */}
//                 <div
//                   style={{ display: "flex", flexDirection: "column", gap: 16 }}
//                 >
//                   {/* Thumbnail preview */}
//                   <div
//                     style={{
//                       background: "#fff",
//                       borderRadius: 14,
//                       border: "1px solid rgba(255,194,209,.4)",
//                       overflow: "hidden",
//                       boxShadow: "0 2px 12px rgba(123,44,191,.08)",
//                     }}
//                   >
//                     <img
//                       src={imageUrl}
//                       alt="Selected thumbnail"
//                       style={{
//                         width: "100%",
//                         aspectRatio: "16/9",
//                         objectFit: "cover",
//                         display: "block",
//                       }}
//                     />
//                     <div
//                       style={{
//                         padding: "10px 14px",
//                         borderTop: "1px solid rgba(255,194,209,.3)",
//                       }}
//                     >
//                       <p style={{ fontSize: 12, color: "#a090ab" }}>
//                         Selected Thumbnail
//                       </p>
//                     </div>
//                   </div>

//                   {/* Overall score card */}
//                   {loading && <div className="skel" style={{ height: 110 }} />}

//                   {result && (
//                     <div
//                       style={{
//                         background: "#fff",
//                         borderRadius: 14,
//                         padding: "20px 22px",
//                         border: "1px solid rgba(255,194,209,.4)",
//                         boxShadow: "0 2px 12px rgba(123,44,191,.08)",
//                         textAlign: "center",
//                       }}
//                     >
//                       <p style={sectionTitle}>Overall CTA Score</p>
//                       <div
//                         style={{
//                           fontSize: "3.5rem",
//                           fontWeight: 800,
//                           lineHeight: 1,
//                           fontFamily: "'Syne',sans-serif",
//                           background: "linear-gradient(135deg,#EC4899,#7b2cbf)",
//                           WebkitBackgroundClip: "text",
//                           WebkitTextFillColor: "transparent",
//                           backgroundClip: "text",
//                         }}
//                       >
//                         {result.overall}
//                       </div>
//                       <div
//                         style={{
//                           fontSize: 13,
//                           fontWeight: 700,
//                           color: scoreColor(result.overall),
//                           marginTop: 6,
//                         }}
//                       >
//                         {scoreLabel(result.overall)}
//                       </div>
//                       <div
//                         style={{
//                           marginTop: 12,
//                           height: 6,
//                           background: "rgba(123,44,191,.1)",
//                           borderRadius: 99,
//                           overflow: "hidden",
//                         }}
//                       >
//                         <div
//                           className="bar-fill"
//                           style={{
//                             "--w": `${result.overall}%`,
//                             height: "100%",
//                             borderRadius: 99,
//                             background:
//                               "linear-gradient(90deg,#EC4899,#7b2cbf)",
//                           }}
//                         />
//                       </div>
//                     </div>
//                   )}

//                   {/* Action buttons */}
//                   {result && (
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: 10,
//                       }}
//                     >
//                       <button
//                         onClick={() =>
//                           navigate("/canvas", { state: { imageUrl } })
//                         }
//                         style={{
//                           padding: "12px",
//                           border: "none",
//                           borderRadius: 8,
//                           background: "linear-gradient(135deg,#ff91af,#7b2cbf)",
//                           color: "#fff",
//                           fontFamily: "'Outfit',sans-serif",
//                           fontSize: "0.9rem",
//                           fontWeight: 700,
//                           cursor: "pointer",
//                           boxShadow: "0 4px 14px rgba(123,44,191,.28)",
//                         }}
//                       >
//                         ✏️ Edit in Canvas
//                       </button>
//                       <button
//                         onClick={() => {
//                           const a = document.createElement("a");
//                           a.href = imageUrl;
//                           a.download = `clixora-${Date.now()}.png`;
//                           a.click();
//                         }}
//                         style={{
//                           padding: "11px",
//                           border: "1.5px solid rgba(123,44,191,.25)",
//                           borderRadius: 8,
//                           background: "#f3e8ff",
//                           color: "#7b2cbf",
//                           fontFamily: "'Outfit',sans-serif",
//                           fontSize: "0.9rem",
//                           fontWeight: 600,
//                           cursor: "pointer",
//                         }}
//                       >
//                         ↓ Download Thumbnail
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* RIGHT — metrics + recommendations */}
//                 <div
//                   style={{ display: "flex", flexDirection: "column", gap: 16 }}
//                 >
//                   {/* Metrics */}
//                   <div
//                     style={{
//                       background: "#fff",
//                       borderRadius: 14,
//                       padding: "20px 22px",
//                       border: "1px solid rgba(255,194,209,.4)",
//                       boxShadow: "0 2px 12px rgba(123,44,191,.08)",
//                     }}
//                   >
//                     <p style={sectionTitle}>Score Breakdown</p>

//                     {loading && (
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: 14,
//                         }}
//                       >
//                         {[1, 2, 3, 4, 5].map((i) => (
//                           <div
//                             key={i}
//                             className="skel"
//                             style={{ height: 36 }}
//                           />
//                         ))}
//                       </div>
//                     )}

//                     {result && (
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: 14,
//                         }}
//                       >
//                         {result.metrics.map((m, i) => (
//                           <div key={i}>
//                             <div
//                               style={{
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                                 marginBottom: 6,
//                               }}
//                             >
//                               <span style={labelStyle}>{m.label}</span>
//                               <span
//                                 style={{
//                                   fontSize: 13,
//                                   fontWeight: 700,
//                                   color: scoreColor(m.score),
//                                   fontFamily: "'Syne',sans-serif",
//                                 }}
//                               >
//                                 {m.score}/100
//                               </span>
//                             </div>
//                             <div
//                               style={{
//                                 height: 7,
//                                 background: "rgba(123,44,191,.08)",
//                                 borderRadius: 99,
//                                 overflow: "hidden",
//                               }}
//                             >
//                               <div
//                                 className="bar-fill"
//                                 style={{
//                                   "--w": `${m.score}%`,
//                                   height: "100%",
//                                   borderRadius: 99,
//                                   background:
//                                     m.score >= 80
//                                       ? "linear-gradient(90deg,#86efac,#22c55e)"
//                                       : m.score >= 60
//                                         ? "linear-gradient(90deg,#fcd34d,#f59e0b)"
//                                         : "linear-gradient(90deg,#fca5a5,#ef4444)",
//                                   animationDelay: `${i * 0.1}s`,
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   {/* Recommendations */}
//                   {loading && <div className="skel" style={{ height: 180 }} />}

//                   {result && result.recommendations?.length > 0 && (
//                     <div
//                       style={{
//                         background: "#fff",
//                         borderRadius: 14,
//                         padding: "20px 22px",
//                         border: "1px solid rgba(255,194,209,.4)",
//                         boxShadow: "0 2px 12px rgba(123,44,191,.08)",
//                       }}
//                     >
//                       <p style={sectionTitle}>AI Recommendations</p>
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: 10,
//                         }}
//                       >
//                         {result.recommendations.map((rec, i) => (
//                           <div
//                             key={i}
//                             className="rec-item"
//                             style={{
//                               display: "flex",
//                               alignItems: "flex-start",
//                               gap: 10,
//                               padding: "11px 14px",
//                               borderRadius: 8,
//                               background: "#fcf8fa",
//                               border: "1px solid rgba(255,194,209,.35)",
//                               transition: "all .2s",
//                             }}
//                           >
//                             <span
//                               style={{
//                                 fontSize: 16,
//                                 flexShrink: 0,
//                                 marginTop: 1,
//                               }}
//                             >
//                               💡
//                             </span>
//                             <span
//                               style={{
//                                 fontSize: 13,
//                                 color: "#24142b",
//                                 lineHeight: 1.55,
//                               }}
//                             >
//                               {rec}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Re-analyze button */}
//                   {result && (
//                     <button
//                       onClick={fetchScore}
//                       style={{
//                         padding: "11px",
//                         border: "1.5px solid rgba(255,194,209,.6)",
//                         borderRadius: 8,
//                         background: "#fff",
//                         color: "#6b5e73",
//                         fontFamily: "'Outfit',sans-serif",
//                         fontSize: "0.88rem",
//                         fontWeight: 500,
//                         cursor: "pointer",
//                       }}
//                     >
//                       ↻ Re-analyze
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";

export default function CTAScore() {
  const metrics = [
    {
      title: "Vocabulary Pacing",
      score: 92,
      status: "Excellent",
      desc: "Varied, highly engaging choice of strong stylistic adjectives throughout chapters.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Dialogue Density",
      score: 74,
      status: "Moderate",
      desc: "Strong structural action tags, but guard text against excessive monologues.",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Structural Flow",
      score: 88,
      status: "Good Quality",
      desc: "Paragraph transitions show exceptional cadences and structural symmetry.",
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
  ];

  return (
    <div className="min-h-screen  bg-slate-50 text-slate-900 font-sans p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Analytics Header Section */}
        <header className="flex justify-between items-start">
          <div>
            <button className="text-sm font-medium text-slate-500 hover:text-slate-900 mb-2 block">
              &larr; Return to Dashboard
            </button>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              City Score Index
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Deep publishing readability and technical index evaluation
              diagnostics metrics.
            </p>
          </div>
          <button className="bg-white border cursor-pointer border-slate-200 hover:bg-slate-50 text-slate-800 font-bold px-4 py-2 rounded-xl text-sm transition shadow-sm">
            🔄 Re-Analyze Script
          </button>
        </header>

        {/* Big Interactive Banner Score Hero */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full transform translate-x-10 -translate-y-10"></div>
          <div className="w-24 h-24 rounded-xl bg-gradient-to-tr from-pink-600 to-pink-600 text-white flex flex-col items-center justify-center shadow-lg shadow-pink-600/20 shrink-0">
            <span className="text-3xl font-black">87</span>
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
              / 100
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              Excellent Literary Health Quality Score
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
              Your manuscript pacing falls directly into target benchmark
              boundaries. Micro-vocabulary modifications could lift alignment
              parameters higher into targeted dynamic mainstream fiction spaces.
            </p>
          </div>
        </div>

        {/* Dynamic Metric Grid System Panels */}
        <section>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Detailed Structural Diagnostic Indices
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-slate-800 text-base">
                    {m.title}
                  </h4>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${m.bg} ${m.color}`}
                  >
                    {m.status}
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-900 mb-3">
                  {m.score}%
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Action Priority Checklist Box Container */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            📋 Recommended Improvement Sequence
          </h3>
          <div className="space-y-3">
            {[
              "Reduce passive sentence voice indicators in Chapter 2 by roughly 15% optimization values.",
              "Deconstruct consecutive dense paragraph segments found inside the dynamic transitions of page 14.",
              "Establish deeper early developmental context constraints surrounding historical relationship backgrounds.",
            ].map((text, index) => (
              <label
                key={index}
                className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-xl transition cursor-pointer text-sm font-medium text-slate-700"
              >
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-pink-600 border-slate-300 rounded focus:ring-pink-500"
                />
                <span>{text}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
