// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   MdArrowBack,
//   MdAutoAwesome,
//   MdTextFields,
//   MdCategory,
//   MdStyle,
//   MdPalette,
//   MdVideoLabel,
// } from "react-icons/md";
// import { HiOutlineSparkles } from "react-icons/hi";
// import logoImg from "../assets/logo1.png";
// import Navbar from "../components/Navbar";
// import api from "../api/apiInstance";

// export default function Generate() {
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [niche, setNiche] = useState("SaaS / Tech");
//   const [style, setStyle] = useState("Bold Futuristic");
//   const [color, setColor] = useState("Neon Pink & Purple");
//   const [description, setDescription] = useState("");

//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generatedThumbnails, setGeneratedThumbnails] = useState([]);

//   const niches = ["SaaS / Tech", "Vlogs", "Finance", "Gaming", "Education"];
//   const styles = ["Bold Futuristic", "Minimalist", "Pop 3D", "Dark Cinematic"];

//   const handleGenerateSubmit = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) return alert("Please specify your text layout.");
//     setIsGenerating(true);
//     setGeneratedThumbnails([]);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await api.post(
//         "/api/generate",
//         { title, niche, style, color, description },
//         { headers: { Authorization: token ? `Bearer ${token}` : "" } }
//       );
//       if (response.data.success) {
//         setGeneratedThumbnails(response.data.data);
//       } else {
//         alert("Error: " + response.data.message);
//       }
//     } catch (error) {
//       alert("Connection refused from generation core.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen overflow-hidden bg-slate-50 text-slate-800 font-sans antialiased">
//       <Navbar logoImg={logoImg} />
      
//       {/* MAIN RESPONSIVE CONTAINER */}
//       <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        
//         {/* SIDEBAR INPUT CONTROLS */}
//         <aside className="w-full lg:w-[320px] bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col p-5 shrink-0 overflow-y-auto order-2 lg:order-1 max-h-[48vh] lg:max-h-none">
//           <div className="space-y-5">
//             {/* Back button visible on desktop only */}
//             <div className="hidden lg:block">
//               <button
//                 onClick={() => navigate("/dashboard")}
//                 className="text-slate-400 hover:text-slate-700 transition"
//               >
//                 <MdArrowBack size={20} />
//               </button>
//             </div>

//             <form onSubmit={handleGenerateSubmit} className="space-y-4">
//               {/* THUMBNAIL TITLE INPUT */}
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
//                   <MdTextFields size={14} className="text-slate-400" /> Thumbnail Title
//                 </label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   placeholder="Enter text overlay..."
//                   required
//                   className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-pink-500 transition"
//                 />
//               </div>

//               {/* TARGET NICHE SELECT */}
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
//                   <MdCategory size={14} className="text-slate-400" /> Target Niche
//                 </label>
                
//                 {/* Desktop View: Dropdown select structure */}
//                 <div className="hidden lg:block">
//                   <select
//                     value={niche}
//                     onChange={(e) => setNiche(e.target.value)}
//                     className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-pink-500"
//                   >
//                     {niches.map((n) => <option key={n} value={n}>{n}</option>)}
//                   </select>
//                 </div>

//                 {/* Mobile View: Inline scrolling chips panel */}
//                 <div className="block lg:hidden flex gap-1.5 overflow-x-auto pb-1 no-scrollbar whitespace-nowrap">
//                   {niches.map((n) => (
//                     <button
//                       key={n}
//                       type="button"
//                       onClick={() => setNiche(n)}
//                       className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border shrink-0 ${
//                         niche === n
//                           ? "bg-pink-500 border-pink-500 text-white"
//                           : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
//                       }`}
//                     >
//                       {n}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* LAYOUT STYLE SELECT */}
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
//                   <MdStyle size={14} className="text-slate-400" /> Layout Style
//                 </label>
//                 <select
//                   value={style}
//                   onChange={(e) => setStyle(e.target.value)}
//                   className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-pink-500"
//                 >
//                   {styles.map((s) => <option key={s} value={s}>{s}</option>)}
//                 </select>
//               </div>

//               {/* COLOR PALETTE INPUT */}
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
//                   <MdPalette size={14} className="text-slate-400" /> Color Palette
//                 </label>
//                 <input
//                   type="text"
//                   value={color}
//                   onChange={(e) => setColor(e.target.value)}
//                   placeholder="Neon Pink & Purple"
//                   className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-pink-500"
//                 />
//               </div>

//               {/* VIDEO CONTEXT DESCRIPTION */}
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
//                   <MdVideoLabel size={14} className="text-slate-400" /> Video Context (Description)
//                 </label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Describe details like objects, expressions, setup..."
//                   className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-pink-500 resize-none"
//                   rows={3}
//                 />
//               </div>

//               {/* SUBMIT RENDER VARIATIONS BUTTON */}
//               <button
//                 type="submit"
//                 disabled={isGenerating}
//                 className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 text-white font-bold rounded-lg text-xs transition relative overflow-hidden ${
//                   isGenerating 
//                     ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
//                     : "bg-[#0f1423] hover:bg-[#1a2136] shadow-sm"
//                 }`}
//               >
//                 {isGenerating ? (
//                   <>
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
//                     <span className="animate-pulse tracking-wide font-mono text-[11px]">RENDERING CLUSTER...</span>
//                   </>
//                 ) : (
//                   <>
//                     <MdAutoAwesome size={14} /> <span>Render Variations</span>
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </aside>

//         {/* WORKSPACE PREVIEW MATRICES */}
//         <main className="flex-1 h-full overflow-y-auto p-5 lg:p-8 order-1 lg:order-2 bg-slate-50 flex flex-col min-h-0">
//           {!isGenerating && generatedThumbnails.length === 0 && (
//             <div className="flex-1 w-full flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl bg-white p-6 text-center">
//               <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-3 border border-slate-100">
//                 <HiOutlineSparkles size={20} className="text-slate-400 animate-pulse" />
//               </div>
//               <h3 className="text-sm font-bold text-slate-800 mb-1">Workspace Empty</h3>
//               <p className="text-xs text-slate-400 max-w-[280px] mx-auto leading-relaxed">
//                 Configure sidebar inputs and execute to render variations.
//               </p>
//             </div>
//           )}

//           {isGenerating && (
//             <div className="grid grid-cols-2 gap-4">
//               {[1, 2, 3, 4].map((id) => (
//                 <div key={id} className="bg-white border border-slate-200 rounded-xl p-2.5 space-y-2 animate-pulse shadow-sm">
//                   <div className="aspect-video w-full bg-slate-100 rounded-lg" />
//                 </div>
//               ))}
//             </div>
//           )}

//           {!isGenerating && generatedThumbnails.length > 0 && (
//             <div className="grid grid-cols-2 gap-4 lg:gap-6 animate-fadeIn">
//               {generatedThumbnails.map((item) => (
//                 <div key={item._id} className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-between shadow-sm group">
//                   <div className="aspect-video w-full rounded-lg bg-slate-50 relative overflow-hidden border border-slate-100">
//                     <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
//                   </div>
//                   <div className="mt-2.5 flex flex-col gap-2">
//                     <h3 className="font-bold text-[11px] text-slate-800 truncate">{item.title || "Variant Frame"}</h3>
//                     <div className="flex gap-1.5">
//                       <button
//                         onClick={() => navigate("/canvas", { state: { imageUrl: item.imageUrl, dbRecordId: item.dbRecordId || item._id, title: item.title } })}
//                         className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold"
//                       >
//                         Studio
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdAutoAwesome,
  MdTextFields,
  MdCategory,
  MdPalette,
  MdStyle,
  MdDownload,
  MdAnalytics,
  MdBrush,
} from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi";
import { RiLoader4Line } from "react-icons/ri";
import logoImg from "../assets/logo1.png";
import Navbar from "../components/Navbar";
import api from "../api/apiInstance";
import { motion } from "motion/react"

export default function Generate() {
  const navigate = useNavigate();

  // 1. FORM CONTROL STATES
  const [title, setTitle] = useState("");
  const [niche, setNiche] = useState("SaaS / Tech");
  const [style, setStyle] = useState("Bold Futuristic");
  const [color, setColor] = useState("Neon Pink & Purple");
  const [description, setDescription] = useState("");

  // 2. ENGINE PIPELINE STATES
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedThumbnails, setGeneratedThumbnails] = useState([]);

  // 3. API DISPATCH: GENERATE 4 THUMBNAILS
  const handleGenerateSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim())
      return alert("Please specify your visual text layout content.");

    setIsGenerating(true);
    setGeneratedThumbnails([]);

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/api/generate",
        {
          title,
          niche,
          style,
          color,
          description,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      );

      if (response.data.success) {
        setGeneratedThumbnails(response.data.data);
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error(
        "Failed to compile thumbnail variant matrix cluster:",
        error,
      );
      alert(
        error.response?.data?.message ||
          "Connection refused from generation core.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // 4. ASSET DOWNLOADING UTILITY
  const handleDownload = async (imageUrl, dbId) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const linkElement = document.createElement("a");
      linkElement.href = blobUrl;
      linkElement.download = `clixora-${dbId}.jpg`;
      document.body.appendChild(linkElement);
      linkElement.click();
      document.body.removeChild(linkElement);
    } catch (err) {
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 text-slate-800 font-sans antialiased">
      <Navbar logoImg={logoImg} />
      
      {/* 🌟 FIXED: Responsive container stack changing from single column on mobile to side-by-side flex layout on desktop */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        
        {/* LEFT SIDEBAR CONTROLLER */}
        <aside className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col p-5 shrink-0 overflow-y-auto max-h-[45vh] md:max-h-none">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer text-slate-500 hover:text-slate-900 transition flex items-center gap-1.5 text-xs font-bold"
              >
                <MdArrowBack size={16} />
                <span>Workspace Hub</span>
              </button>
            </div>

            <form onSubmit={handleGenerateSubmit} className="space-y-4">
              {/* Input 1: Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase flex items-center gap-1">
                  <MdTextFields size={12} /> Thumbnail Title
                </label>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter text overlay..."
                  required
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-slate-900 resize-none transition"
                />
              </div>

              {/* Input 2: Niche */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase flex items-center gap-1">
                  <MdCategory size={12} /> Target Niche
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-slate-900 cursor-pointer"
                >
                  <option>SaaS / Tech</option>
                  <option>Vlogs / Lifestyle</option>
                  <option>Finance / Business</option>
                  <option>Gaming</option>
                  <option>Education</option>
                </select>
              </div>

              {/* Input 3: Style */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase flex items-center gap-1">
                  <MdStyle size={12} /> Layout Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-slate-900 cursor-pointer"
                >
                  <option>Bold Futuristic</option>
                  <option>Clean Minimalist</option>
                  <option>Hyper Pop 3D</option>
                  <option>Dark Cinematic</option>
                </select>
              </div>

              {/* Input 4: Color */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase flex items-center gap-1">
                  <MdPalette size={12} /> Color Palette
                </label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g., Hot Pink, Cyberpunk Neon"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-slate-900"
                />
              </div>

              {/* Input 5: Description */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                  🎯 Video Context (Description)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe details like objects, expressions, setup..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-900 resize-none font-medium"
                  rows={2}
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold rounded-xl text-xs cursor-pointer transition-all"
              >
                {isGenerating ? (
                  <RiLoader4Line className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <MdAutoAwesome size={14} className="text-pink-400" /> 
                    <span>Render Variations</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </aside>

        {/* MAIN DISPLAY WORKSPACE */}
        <main className="flex-1 h-full overflow-y-auto p-4 md:p-8 space-y-6">
          {/* EMPTY STATE */}
          {!isGenerating && generatedThumbnails.length === 0 && (
            <div className="h-full min-h-[300px] w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white p-8 text-center">
              <span className="p-3 bg-slate-50 text-slate-400 rounded-xl mb-3 animate-pulse">
                <HiOutlineSparkles size={24} />
              </span>
              <h3 className="text-sm font-bold text-slate-800 font-syne">
                Workspace Empty
              </h3>
              <p className="text-slate-400 text-xs max-w-xs mt-1">
                Configure sidebar inputs and execute to render variations.
              </p>
            </div>
          )}

          {/* LOADING SKELETON */}
          {isGenerating && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[1, 2, 3, 4].map((id) => (
                <div
                  key={id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between animate-pulse shadow-xs"
                >
                  <div className="aspect-video w-full bg-slate-100 rounded-xl" />
                  <div className="h-4 bg-slate-100 rounded-md w-2/3 mt-4" />
                </div>
              ))}
            </div>
          )}

          {/* THUMBNAIL GRID DISPLAY */}
          {!isGenerating && generatedThumbnails.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 font-syne">
                Generated Layout Variations
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {generatedThumbnails.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all group"
                  >
                    {/* Image Layer with Floating Download Icon */}
                    <div className="aspect-video w-full rounded-xl bg-slate-100 relative overflow-hidden border border-slate-100">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />

                      {/* FLOATING DOWNLOAD ICON BUTTON */}
                      <button
                        onClick={() =>
                          handleDownload(
                            item.imageUrl,
                            item.dbRecordId || item._id,
                          )
                        }
                        className="absolute top-2.5 right-2.5 p-2 bg-white/90 hover:bg-white text-slate-800 hover:text-pink-600 rounded-full shadow-lg transition-all border border-slate-200/50 cursor-pointer backdrop-blur-xs group-hover:scale-105"
                        title="Download Image"
                      >
                        <MdDownload size={16} />
                      </button>
                    </div>

                    {/* Metadata and Buttons Section */}
                    <div className="mt-3.5 space-y-3">
                      <h3 className="font-bold text-xs text-slate-800 line-clamp-1">
                        {item.title || "Untitled Variant"}
                      </h3>

                      {/* TWO EXCLUSIVE MAIN ACTION BUTTONS */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                        {/* Button 1: Check CTA Score */}
                        <button
                          onClick={() =>
                            navigate("/cta-score", {
                              state: {
                                imageUrl: item.imageUrl,
                                dbRecordId: item.dbRecordId || item._id,
                                title: item.title,
                                niche: item.niche,
                              },
                            })
                          }
                          className="flex items-center justify-center gap-1 py-2 px-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-[11px] cursor-pointer transition-all whitespace-nowrap"
                        >
                          <MdAnalytics size={13} className="text-pink-500 flex-shrink-0" />
                          <span>Audit Data</span>
                        </button>

                        {/* Button 2: Studio Canvas */}
                        <button
                          onClick={() =>
                            navigate("/canvas", {
                              state: {
                                imageUrl: item.imageUrl,
                                dbRecordId: item.dbRecordId || item._id,
                                title: item.title,
                              },
                            })
                          }
                          className="flex items-center justify-center gap-1 py-2 px-1 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[11px] cursor-pointer transition-all shadow-xs whitespace-nowrap"
                        >
                          <MdBrush size={13} className="text-pink-400 flex-shrink-0" />
                          <span>Studio Canvas</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}