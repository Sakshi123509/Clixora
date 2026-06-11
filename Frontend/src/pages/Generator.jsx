// // ═══════════════════════════════════════════════════════════════
// // Generator.jsx — Main thumbnail generation page
// // ═══════════════════════════════════════════════════════════════
// // CHANGES FROM ORIGINAL:
// //   1. Loader component added — full screen loading with progress
// //   2. Thumbnail cards animate in with stagger when they appear
// //   3. Left panel inputs have subtle slide-in animation on load
// //   4. API URL fixed: /api/generate/generate (sahi route)
// //   5. Simulated progress bar (0→90% during generation)
// //   6. Duplicate useNavigate removed
// // ═══════════════════════════════════════════════════════════════

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Loader from "../components/Loader.jsx" // full screen loader

// export default function Generator() {
//   const navigate = useNavigate();

//   // ── Form state ───────────────────────────────────────────────
//   const [title,    setTitle]    = useState("");
//   const [color,    setColor]    = useState("#7b2cbf");
//   const [style,    setStyle]    = useState("dark");
//   const [niche,    setNiche]    = useState("tech");

//   // ── UI state ─────────────────────────────────────────────────
//   const [images,   setImages]   = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading,  setLoading]  = useState(false);
//   const [progress, setProgress] = useState(0); // 0-100 for loader

//   // ── Panel animation on first load ────────────────────────────
//   const [panelVisible, setPanelVisible] = useState(false);
//   useEffect(() => {
//     setTimeout(() => setPanelVisible(true), 80);
//   }, []);

//   // ── Image cards animation — ek ek karke appear ───────────────
//   // Ye track karta hai ki konse cards visible hain (stagger ke liye)
//   const [visibleCards, setVisibleCards] = useState([]);
//   useEffect(() => {
//     if (images.length > 0) {
//       // Pehle sab hidden karo, phir ek ek delay se dikhao
//       setVisibleCards([]);
//       images.forEach((_, i) => {
//         setTimeout(() => {
//           setVisibleCards(prev => [...prev, i]);
//         }, i * 150); // har card 150ms baad
//       });
//     }
//   }, [images]); // images badalne pe run karo

//   // ── Progress simulation — API call ke time bar fill karo ─────
//   // Real progress nahi pata Cloudflare se, toh simulate karte hain
//   const simulateProgress = () => {
//     setProgress(0);
//     // 0→30% fast (prompt ready)
//     setTimeout(() => setProgress(15), 200);
//     setTimeout(() => setProgress(30), 800);
//     // 30→70% medium (generating)
//     setTimeout(() => setProgress(45), 2000);
//     setTimeout(() => setProgress(60), 5000);
//     setTimeout(() => setProgress(70), 10000);
//     // 70→90% slow (uploading to cloudinary)
//     setTimeout(() => setProgress(80), 18000);
//     setTimeout(() => setProgress(90), 28000);
//     // 100% API response aane ke baad manually set karenge
//   };

//   // ── Main generate handler ─────────────────────────────────────
//   const handleGenerate = async () => {
//     if (!title.trim()) { alert("Please enter a title"); return; }

//     setLoading(true);
//     setImages([]);
//     setSelected(null);
//     simulateProgress(); // progress bar start karo

//     try {
//       const res = await fetch("/api/generate/generate", { // ✅ sahi route
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ title, color, style, niche }),
//       });

//       const data = await res.json();

//       if (data.success && data.images) {
//         setProgress(100); // 100% done!
//         // Small delay taaki 100% dikhe
//         setTimeout(() => {
//           setLoading(false);
//           setImages(data.images);
//         }, 600);
//       } else {
//         throw new Error(data.message || "Generation failed");
//       }
//     } catch (err) {
//       setLoading(false);
//       setProgress(0);
//       alert(err.message || "Generation failed. Try again.");
//     }
//   };

//   // ── Download handler ──────────────────────────────────────────
//   const handleDownload = () => {
//     if (selected === null) { alert("Select a thumbnail first"); return; }
//     const a = document.createElement("a");
//     a.href = images[selected];
//     a.download = `clixora-${Date.now()}.png`;
//     a.click();
//   };

//   // ── Navigate to CTA Score with selected image ─────────────────
//   const handleCTAScore = () => {
//     if (selected === null) { alert("Select a thumbnail first"); return; }
//     navigate("/cta-score", { state: { imageUrl: images[selected] } });
//   };

//   // ── Navigate to Canvas editor ─────────────────────────────────
//   const handleCanvas = () => {
//     if (selected === null) { alert("Select a thumbnail first"); return; }
//     navigate("/canvas", { state: { imageUrl: images[selected] } });
//   };

//   /* ── Shared styles ─────────────────────────────────────────── */
//   const inputStyle = {
//     width: "100%", padding: "11px 14px", borderRadius: 8,
//     border: "1.5px solid rgba(255,194,209,.55)", background: "#fcf8fa",
//     fontFamily: "'Outfit',sans-serif", fontSize: "0.9rem", color: "#24142b",
//     outline: "none", boxSizing: "border-box",
//   };
//   const labelStyle = {
//     fontSize: 13, fontWeight: 600, color: "#24142b",
//     fontFamily: "'Outfit',sans-serif",
//   };
//   const sectionTitle = {
//     fontSize: 10, fontWeight: 700, textTransform: "uppercase",
//     letterSpacing: "0.1em", color: "#a090ab", marginBottom: 8,
//     fontFamily: "'Syne',sans-serif",
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         select { appearance: none; -webkit-appearance: none; }

//         /* Spinner for button */
//         @keyframes spin { to { transform: rotate(360deg); } }
//         .spinner {
//           width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0;
//           border: 2px solid rgba(255,255,255,.3); border-top-color: #fff;
//           animation: spin .7s linear infinite;
//         }

//         /* Input focus styles */
//         .gen-inp:focus {
//           border-color: #7b2cbf !important;
//           background: #fff !important;
//           box-shadow: 0 0 0 3px rgba(123,44,191,.09) !important;
//         }
//         .gen-sel:focus {
//           border-color: #7b2cbf !important;
//           background: #fff !important;
//         }

//         /* Thumbnail card hover */
//         .thumb-card {
//           transition: transform .22s, box-shadow .22s, border-color .22s;
//         }
//         .thumb-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 10px 28px rgba(123,44,191,.16) !important;
//           border-color: #ffc2d1 !important;
//         }

//         /* Card appear animation — scale + fade */
//         @keyframes cardAppear {
//           from { opacity: 0; transform: scale(0.92) translateY(16px); }
//           to   { opacity: 1; transform: scale(1) translateY(0); }
//         }
//         .card-appear {
//           animation: cardAppear 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
//         }

//         /* Left panel slide in */
//         @keyframes slideInLeft {
//           from { opacity: 0; transform: translateX(-20px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }

//         /* Skeleton shimmer */
//         @keyframes shimmer {
//           0%   { background-position: -600px 0; }
//           100% { background-position: 600px 0; }
//         }
//         .skel {
//           border-radius: 12px; aspect-ratio: 16/9;
//           background: linear-gradient(90deg, #f0e8f4 25%, #fce8f0 50%, #f0e8f4 75%);
//           background-size: 1200px 100%;
//           animation: shimmer 1.5s infinite linear;
//         }

//         /* Generate button hover */
//         .gen-btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 24px rgba(123,44,191,.4) !important;
//         }

//         input[type=color] { padding: 3px; cursor: pointer; }
//       `}</style>

//       {/* ── FULL SCREEN LOADER — loading ke time dikhta hai ── */}
//       {/* Progress aur message pass karo */}
//       {loading && (
//         <Loader
//           progress={progress}
//           message="Generating your thumbnails..."
//         />
//       )}

//       {/* ── MAIN PAGE ── */}
//       <div style={{
//         display: "flex", flexDirection: "column",
//         width: "100%", height: "100vh",
//         background: "#fcf8fa",
//         fontFamily: "'Outfit',sans-serif",
//       }}>

//         <Navbar />

//         {/* Left + Right layout */}
//         <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

//           {/* ══ LEFT PANEL — Form inputs ══════════════════════════
//               panelVisible se slide-in animation hoti hai
//           ═════════════════════════════════════════════════════ */}
//           <div style={{
//             width: "33%", minWidth: 260, maxWidth: 340,
//             background: "#fff",
//             borderRight: "1px solid rgba(255,194,209,.4)",
//             padding: "24px 20px", overflowY: "auto",
//             display: "flex", flexDirection: "column", gap: 20,
//             // Slide in from left on load
//             opacity: panelVisible ? 1 : 0,
//             transform: panelVisible ? "translateX(0)" : "translateX(-16px)",
//             transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1)",
//           }}>

//             {/* Thumbnail title input */}
//             <div>
//               <p style={sectionTitle}>Thumbnail Info</p>
//               <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//                 <label style={labelStyle}>Title / Headline</label>
//                 <input
//                   className="gen-inp"
//                   style={inputStyle}
//                   type="text"
//                   placeholder="e.g. 10 AI Tools That Changed My Life"
//                   value={title}
//                   onChange={e => setTitle(e.target.value)}
//                   maxLength={80}
//                 />
//                 <span style={{ fontSize: 11, color: "#a090ab", textAlign: "right" }}>
//                   {title.length}/80
//                 </span>
//               </div>
//             </div>

//             {/* Niche + Style dropdowns */}
//             <div>
//               <p style={sectionTitle}>Style</p>
//               <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

//                 {/* Niche dropdown */}
//                 <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//                   <label style={labelStyle}>Content Niche</label>
//                   <div style={{ position: "relative" }}>
//                     <select
//                       className="gen-sel"
//                       style={{ ...inputStyle, paddingRight: 36, cursor: "pointer" }}
//                       value={niche}
//                       onChange={e => setNiche(e.target.value)}
//                     >
//                       {["tech","gaming","vlog","cooking","finance","fitness","education","entertainment"]
//                         .map(v => (
//                           <option key={v} value={v}>
//                             {v.charAt(0).toUpperCase() + v.slice(1)}
//                           </option>
//                         ))}
//                     </select>
//                     <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6b5e73", fontSize: 12 }}>▾</span>
//                   </div>
//                 </div>

//                 {/* Visual style dropdown */}
//                 <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//                   <label style={labelStyle}>Visual Style</label>
//                   <div style={{ position: "relative" }}>
//                     <select
//                       className="gen-sel"
//                       style={{ ...inputStyle, paddingRight: 36, cursor: "pointer" }}
//                       value={style}
//                       onChange={e => setStyle(e.target.value)}
//                     >
//                       {[
//                         ["dark",      "Dark & Bold"],
//                         ["bright",    "Bright & Vibrant"],
//                         ["minimal",   "Minimal & Clean"],
//                         ["gradient",  "Gradient Pop"],
//                         ["cinematic", "Cinematic"],
//                       ].map(([v, l]) => (
//                         <option key={v} value={v}>{l}</option>
//                       ))}
//                     </select>
//                     <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6b5e73", fontSize: 12 }}>▾</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Color picker */}
//             <div>
//               <p style={sectionTitle}>Color</p>
//               <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//                 <label style={labelStyle}>Primary Color</label>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                   <input
//                     type="color"
//                     value={color}
//                     onChange={e => setColor(e.target.value)}
//                     style={{
//                       width: 44, height: 44, borderRadius: 8,
//                       border: "1.5px solid rgba(255,194,209,.55)",
//                       background: "#fff", padding: 3, cursor: "pointer", flexShrink: 0,
//                     }}
//                   />
//                   <span style={{ fontSize: 13, color: "#6b5e73", fontFamily: "monospace" }}>
//                     {color.toUpperCase()}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Generate button — pushed to bottom */}
//             <div style={{ marginTop: "auto" }}>
//               <button
//                 className="gen-btn"
//                 onClick={handleGenerate}
//                 disabled={loading}
//                 style={{
//                   width: "100%", padding: 13, border: "none", borderRadius: 8,
//                   background: "linear-gradient(135deg, #ff91af, #7b2cbf)",
//                   color: "#fff", fontFamily: "'Outfit',sans-serif",
//                   fontSize: "0.95rem", fontWeight: 700,
//                   cursor: loading ? "not-allowed" : "pointer",
//                   opacity: loading ? 0.65 : 1,
//                   boxShadow: "0 4px 16px rgba(123,44,191,.3)",
//                   display: "flex", alignItems: "center",
//                   justifyContent: "center", gap: 8,
//                   transition: "transform .2s, box-shadow .2s",
//                 }}
//               >
//                 {loading
//                   ? <><div className="spinner" /> Generating...</>
//                   : <>✦ Generate Thumbnails</>
//                 }
//               </button>
//             </div>

//           </div>

//           {/* ══ RIGHT PANEL — Results ══════════════════════════════
//           ═════════════════════════════════════════════════════ */}
//           <div style={{
//             flex: 1, padding: 24, overflowY: "auto",
//             display: "flex", flexDirection: "column", gap: 20,
//           }}>

//             {/* Empty state — koi image nahi aur loading nahi */}
//             {!loading && images.length === 0 && (
//               <div style={{
//                 flex: 1, display: "flex", flexDirection: "column",
//                 alignItems: "center", justifyContent: "center",
//                 gap: 14, textAlign: "center",
//               }}>
//                 {/* Icon */}
//                 <div style={{
//                   width: 70, height: 70, borderRadius: 18,
//                   background: "linear-gradient(135deg, #ffe5ec, #f3e8ff)",
//                   display: "flex", alignItems: "center",
//                   justifyContent: "center", fontSize: 30,
//                   boxShadow: "0 4px 16px rgba(123,44,191,.1)",
//                 }}>
//                   ✦
//                 </div>
//                 <p style={{
//                   fontFamily: "'Syne',sans-serif", fontSize: "1.05rem",
//                   fontWeight: 700, color: "#6b5e73",
//                 }}>
//                   Your thumbnails will appear here
//                 </p>
//                 <p style={{
//                   fontSize: "0.85rem", color: "#a090ab",
//                   maxWidth: 280, lineHeight: 1.65,
//                 }}>
//                   Fill in the details on the left and click Generate
//                   to create 4 AI-powered thumbnails
//                 </p>
//               </div>
//             )}

//             {/* Images grid — staggered card appear animation ─────
//                 visibleCards array track karta hai konse show hain */}
//             {!loading && images.length > 0 && (
//               <>
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
//                   {images.map((url, i) => (
//                     <div
//                       key={i}
//                       className={`thumb-card ${visibleCards.includes(i) ? "card-appear" : ""}`}
//                       onClick={() => setSelected(i)}
//                       style={{
//                         // Visible nahi hai tab invisible
//                         opacity: visibleCards.includes(i) ? 1 : 0,
//                         position: "relative", borderRadius: 12,
//                         overflow: "hidden", cursor: "pointer",
//                         border: selected === i
//                           ? "2.5px solid #7b2cbf"
//                           : "2.5px solid transparent",
//                         boxShadow: selected === i
//                           ? "0 0 0 4px rgba(123,44,191,.15), 0 8px 24px rgba(123,44,191,.14)"
//                           : "0 2px 12px rgba(123,44,191,.08)",
//                         background: "#fff",
//                       }}
//                     >
//                       <img
//                         src={url}
//                         alt={`Thumbnail ${i + 1}`}
//                         style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }}
//                       />
//                       {/* Number badge */}
//                       <span style={{
//                         position: "absolute", top: 8, right: 8,
//                         background: "rgba(123,44,191,.85)", color: "#fff",
//                         fontSize: 11, fontWeight: 700,
//                         padding: "3px 10px", borderRadius: 99,
//                       }}>
//                         #{i + 1}
//                       </span>
//                       {/* Selected badge */}
//                       {selected === i && (
//                         <span style={{
//                           position: "absolute", top: 8, left: 8,
//                           background: "linear-gradient(135deg, #EC4899, #7b2cbf)",
//                           color: "#fff", fontSize: 10, fontWeight: 700,
//                           padding: "3px 10px", borderRadius: 99,
//                         }}>
//                           ✓ Selected
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Action buttons */}
//                 <div style={{ display: "flex", gap: 10 }}>

//                   {/* Download */}
//                   <button
//                     onClick={handleDownload}
//                     disabled={selected === null}
//                     style={{
//                       flex: 1, padding: 12, borderRadius: 8,
//                       cursor: selected === null ? "not-allowed" : "pointer",
//                       background: "#f3e8ff", color: "#7b2cbf",
//                       border: "1.5px solid rgba(123,44,191,.25)",
//                       fontFamily: "'Outfit',sans-serif",
//                       fontSize: "0.88rem", fontWeight: 600,
//                       opacity: selected === null ? 0.45 : 1,
//                       display: "flex", alignItems: "center",
//                       justifyContent: "center", gap: 7,
//                       transition: "background .2s",
//                     }}
//                     onMouseEnter={e => { if (selected !== null) e.currentTarget.style.background = "#e9d5ff"; }}
//                     onMouseLeave={e => { e.currentTarget.style.background = "#f3e8ff"; }}
//                   >
//                     ↓ Download
//                   </button>

//                   {/* Canvas editor */}
//                   <button
//                     onClick={handleCanvas}
//                     disabled={selected === null}
//                     style={{
//                       flex: 1, padding: 12, borderRadius: 8,
//                       cursor: selected === null ? "not-allowed" : "pointer",
//                       background: "#fff", color: "#6b5e73",
//                       border: "1.5px solid rgba(255,194,209,.6)",
//                       fontFamily: "'Outfit',sans-serif",
//                       fontSize: "0.88rem", fontWeight: 600,
//                       opacity: selected === null ? 0.45 : 1,
//                       display: "flex", alignItems: "center",
//                       justifyContent: "center", gap: 7,
//                     }}
//                   >
//                     ✏️ Edit
//                   </button>

//                   {/* CTA Score */}
//                   <button
//                     onClick={handleCTAScore}
//                     disabled={selected === null}
//                     style={{
//                       flex: 1, padding: 12, borderRadius: 8,
//                       cursor: selected === null ? "not-allowed" : "pointer",
//                       background: "linear-gradient(135deg, #ff91af, #7b2cbf)",
//                       color: "#fff", border: "none",
//                       fontFamily: "'Outfit',sans-serif",
//                       fontSize: "0.88rem", fontWeight: 600,
//                       opacity: selected === null ? 0.45 : 1,
//                       boxShadow: "0 4px 14px rgba(123,44,191,.28)",
//                       display: "flex", alignItems: "center",
//                       justifyContent: "center", gap: 7,
//                     }}
//                     onMouseEnter={e => { if (selected !== null) e.currentTarget.style.filter = "brightness(1.06)"; }}
//                     onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
//                   >
//                     ✦ CTA Score
//                   </button>
//                 </div>
//               </>
//             )}

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";

export default function GeneratePage() {
  // Generation setup state parameters
  const [formData, setFormData] = useState({
    title: "",
    niche: "Business & Sales",
    stylePreset: "Dark & Bold Cyberpunk",
    brandColors: "#db2777", // default pink-600 hex
    customPrompt: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVariants, setGeneratedVariants] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Style presets mapping exact UI choices
  const stylePresets = [
    {
      id: "cyber",
      name: "Dark & Bold Cyberpunk",
      desc: "High contrast neon variants",
    },
    {
      id: "minimal",
      name: "Minimalist Studio Clean",
      desc: "Flat layouts with deep focus",
    },
    {
      id: "cinematic",
      name: "Cinematic 3D Render",
      desc: "Dramatic lighting with depth layers",
    },
    {
      id: "vibrant",
      name: "Vibrant YouTube Hyper",
      desc: "Max saturation click drivers",
    },
  ];

  const niches = [
    "Business & Sales",
    "Creator Tips",
    "Tech / Dev",
    "Gaming",
    "Vlog / Lifestyle",
  ];

  // Mock engine submission handler mapping Cloudflare AI core steps
  const handleTriggerGeneration = (e) => {
    e.preventDefault();
    if (!formData.title)
      return alert("Please input a thumbnail concept title.");

    setIsGenerating(true);

    // Simulating Cloudflare 4x concurrent rendering timeline
    setTimeout(() => {
      setGeneratedVariants([
        {
          id: 1,
          img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
          score: 94,
          structure: "Left Text Focal Split",
        },
        {
          id: 2,
          img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
          score: 88,
          structure: "Centered Isometric Badge",
        },
        {
          id: 3,
          img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
          score: 91,
          structure: "Right Face Ambient Backdrop",
        },
        {
          id: 4,
          img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
          score: 79,
          structure: "Rule of Thirds Macro Scale",
        },
      ]);
      setIsGenerating(false);
      setSelectedVariant(1); // Auto select variant 1
    }, 2000);
  };

  return (
    <div className="min-h-screen min-w-screen bg-slate-50 text-slate-900 font-sans relative overflow-hidden">
      {/* ── DYNAMIC KEYFRAMES AND FONTS IMPORT FROM HOMEPAGE ── */}
      <style>{`
        
        @keyframes border-draw {
          0% { border-color: rgba(226, 232, 240, 0.8); }
          50% { border-color: #db2777; }
          100% { border-color: #4f46e5; }
        }
        .animate-border-glow:hover {
          animation: border-draw 4s linear infinite;
        }
      `}</style>

      {/* ── HIGH-TECH GRADIENT BACKGROUND ORBS ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[650px] h-[650px] -top-[250px] -left-[150px] rounded-full bg-pink-500/10 blur-[40px]" />
        <div className="absolute w-[550px] h-[550px] -bottom-[150px] -right-[100px] rounded-full bg-indigo-500/10 blur-[50px]" />
      </div>

      <div className="relative z-10 font-outfit">
        {/* ── NAVIGATION (MATCHES HOMEPAGE ACCENTS) ── */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
          <div
            className="flex items-center  font-bold text-xl text-pink-600 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span className="p-2 bg-pink-50 text-pink-600 rounded-lg">
              <img
                src="../assets/logo.jpg"
                alt="Logo"
                className="h-6 w-auto object-contain"
                onError={(e) => (e.target.style.display = "none")}
              />
            </span>
            CLIXORA
          </div>
          <div className="flex gap-6 font-medium text-slate-600">
            <a href="/" className="hover:text-slate-900 transition">
              Home
            </a>
            <a href="/dashboard" className="hover:text-slate-900 transition">
              Dashboard
            </a>
            <a
              href="/generate"
              className="text-pink-600 border-b-2 border-pink-600 pb-1"
            >
              Generator Engine
            </a>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-sm">
            JD
          </div>
        </nav>

        {/* ── GENERATOR WORKSPACE HEADER ── */}
        <header className="max-w-7xl mx-auto pt-10 px-6 text-left">
          <span className="bg-pink-50 text-pink-700 text-xs font-bold px-3 py-1 rounded-full border border-pink-100 inline-block mb-3">
            ⚡ ENGINE WORKSPACE ACTIVE
          </span>
          <h1
            className="text-slate-900 font-extrabold tracking-tight leading-none"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "2.6rem",
            }}
          >Thumbnail{" "}
            <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Generation Matrix{" "}
            </span>
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Configure system rendering constraints below. Cloudflare nodes
            dispatch four structural layout mutations concurrently for
            evaluation.
          </p>
        </header>

        {/* ── CONCURRENT SPLIT CORE WORKSPACE ── */}
        <main className="max-w-7xl mx-auto py-8 px-6 grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: CONFIGURATION CONTROL PARAMETERS PANEL (5 COLS) */}
          <form
            onSubmit={handleTriggerGeneration}
            className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xl space-y-6 backdrop-blur-sm relative z-10"
          >
            {/* Input Parameter 1: Title */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider uppercase text-slate-500 block">
                1. Text Overlay Headline Content
              </label>
              <input
                type="text"
                placeholder="e.g., Coding a SaaS App in 24 Hours"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 focus:bg-white px-4 py-3 rounded-xl text-sm font-medium transition outline-none"
              />
            </div>

            {/* Input Parameter 2: Niche Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider uppercase text-slate-500 block">
                2. Target Performance Niche
              </label>
              <select
                value={formData.niche}
                onChange={(e) =>
                  setFormData({ ...formData, niche: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 focus:bg-white px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 transition outline-none"
              >
                {niches.map((n, i) => (
                  <option key={i} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Input Parameter 3: Visual Presets Style Matrix */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider uppercase text-slate-500 block">
                3. Select Visual Style Preset
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stylePresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, stylePreset: preset.name })
                    }
                    className={`p-3.5 text-left border rounded-xl transition flex flex-col justify-between h-20 ${
                      formData.stylePreset === preset.name
                        ? "border-pink-500 bg-pink-50/20 shadow-sm shadow-pink-500/10"
                        : "border-slate-200/80 bg-slate-50/50 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900 block">
                      {preset.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block truncate w-full">
                      {preset.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Parameter 4: Colors & Fine Tuning Props */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4 space-y-2">
                <label className="text-xs font-bold tracking-wider uppercase text-slate-500 block">
                  Brand Hue
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl h-11">
                  <input
                    type="color"
                    value={formData.brandColors}
                    onChange={(e) =>
                      setFormData({ ...formData, brandColors: e.target.value })
                    }
                    className="w-7 h-7 border-none rounded-md cursor-pointer bg-transparent"
                  />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-tight text-slate-500">
                    {formData.brandColors}
                  </span>
                </div>
              </div>
              <div className="col-span-8 space-y-2">
                <label className="text-xs font-bold tracking-wider uppercase text-slate-500 block">
                  Context Modifier (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Dark studio background, extreme glow..."
                  value={formData.customPrompt}
                  onChange={(e) =>
                    setFormData({ ...formData, customPrompt: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 focus:bg-white px-3 h-11 rounded-xl text-xs font-medium transition outline-none"
                />
              </div>
            </div>

            {/* Trigger Button Executer */}
            <button
              type="submit"
              disabled={isGenerating}
              className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm ${
                isGenerating
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700 shadow-pink-600/20 cursor-pointer"
              }`}
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin text-lg">⚡</span> Rendering 4x
                  Comp Variants...
                </>
              ) : (
                <>✨Generate..</>
              )}
            </button>
          </form>

          {/* RIGHT SIDE: LIVE RENDERING VIEWPORTS LOG & DIAGNOSTICS (7 COLS) */}
          <section className="lg:col-span-7 space-y-6">
            {!generatedVariants && !isGenerating ? (
              // Empty System Stage Entry State
              <div className="border-2 border-dashed border-slate-200/80 rounded-2xl p-12 text-center bg-white/40 backdrop-blur-sm min-h-[510px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl text-slate-400 border border-slate-200/40 mb-4 animate-bounce">
                  ⚙️
                </div>
                <h3
                  className="text-lg font-bold text-slate-800 tracking-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  System Engine Idle
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1 mx-auto leading-relaxed">
                  Fill out the parameters schema on the left to fire cloud
                  clusters. Cloudflare AI generates four unique spatial
                  variations layout templates instantly.
                </p>
              </div>
            ) : isGenerating ? (
              // Computing Rendering Intermediary Stage
              <div className="border border-slate-200 rounded-2xl p-12 text-center bg-white min-h-[510px] flex flex-col items-center justify-center space-y-4 shadow-sm">
                <div className="relative w-14 h-14">
                  <div className="absolute inset-0 border-4 border-pink-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-pink-600 rounded-full animate-spin"></div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800">
                    Allocating Node Cluster Workers
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    Executing dynamic layered vector compositions based on style
                    profile configuration tags.
                  </p>
                </div>
              </div>
            ) : (
              // Active Render Variant Grid Output Matrix
              <div className="space-y-6">
                {/* Active Main Variant Spotlight Focus Component Layer */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xl space-y-4 relative overflow-hidden animate-border-glow">
                  {/* Visual Accent Layer: Corner Brackets (From howItWorks homepage layout) */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-slate-300" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-slate-300" />

                  <div className="aspect-video w-full rounded-xl bg-slate-900 overflow-hidden relative shadow-inner">
                    <img
                      src={
                        generatedVariants.find((v) => v.id === selectedVariant)
                          ?.img
                      }
                      alt="Spotlight Selection"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md border border-white/10 tracking-wider">
                      🎯 ACTIVE VARIANT LOG 0{selectedVariant} —{" "}
                      {
                        generatedVariants.find((v) => v.id === selectedVariant)
                          ?.structure
                      }
                    </div>

                    {/* Realtime AI Predictive Vision scoring indicator matching home index card stats */}
                    <div className="absolute bottom-4 right-4 bg-emerald-500 text-white text-sm font-extrabold px-3.5 py-1.5 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-1">
                      <span>
                        {
                          generatedVariants.find(
                            (v) => v.id === selectedVariant,
                          )?.score
                        }
                        %
                      </span>
                      <span className="text-[9px] font-medium opacity-90 tracking-wider">
                        PREDICTIVE CTR
                      </span>
                    </div>
                  </div>

                  {/* Operational Action Routes Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 tracking-tight">
                        {formData.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {formData.niche} • Style Preset Variant Matrix
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs transition">
                        Edit in Canvas Studio
                      </button>
                      <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs shadow-md shadow-pink-600/10 transition">
                        Download PNG
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4x Concurrent Matrix Previews Row Panel Selector */}
                <div className="space-y-2">
                  <h3
                    className="text-xs font-bold uppercase tracking-wider text-slate-400 block"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Concurrent Structural Variant Output Yield
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {generatedVariants.map((variant) => (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`bg-white p-2 rounded-xl text-left border transition-all duration-300 group ${
                          selectedVariant === variant.id
                            ? "border-pink-500 ring-2 ring-pink-500/10"
                            : "border-slate-200 hover:border-slate-300 shadow-sm"
                        }`}
                      >
                        <div className="aspect-video w-full bg-slate-100 rounded-lg overflow-hidden mb-2 relative">
                          <img
                            src={variant.img}
                            alt="variant template"
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-102"
                          />
                          <div
                            className={`absolute bottom-1 right-1 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              variant.score >= 85
                                ? "bg-emerald-500 text-white"
                                : "bg-amber-500 text-white"
                            }`}
                          >
                            {variant.score}%
                          </div>
                        </div>
                        <div className="px-1">
                          <span className="text-[10px] font-bold text-slate-800 block">
                            Variant 0{variant.id}
                          </span>
                          <span className="text-[9px] text-slate-400 font-medium block truncate mt-0.5">
                            {variant.structure}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
