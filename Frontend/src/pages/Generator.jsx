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
import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:8000/api/thumbnails/generate",
        {
          title,
          description,
          niche,
          style,
          color,
        }
      );

      if (response.data.success) {
        setGeneratedThumbnails(response.data.data);
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Failed to compile thumbnail variant matrix cluster:", error);
      alert(error.response?.data?.message || "Connection refused from generation core.");
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
    <div className="h-screen w-full bg-slate-50 text-slate-800 flex justify-between overflow-x-hidden font-sans antialiased">
      {/* LEFT SIDEBAR CONTROLLER */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col justify-between p-5 shrink-0 h-full overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition"
            >
              <MdArrowBack size={16} />
            </button>
            <div className="flex items-center gap-2 font-black text-xl text-pink-600 tracking-tight cursor-pointer font-syne" onClick={() => navigate("/")}>
              <img src={logoImg} alt="Clixora" className="h-7 w-auto object-contain" />
              CLIXORA
            </div>
          </div>

          <form onSubmit={handleGenerateSubmit} className="space-y-5">
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
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-slate-900 resize-none"
              />
            </div>

            {/* Input 2: Niche */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase flex items-center gap-1">
                <MdCategory size={12} /> Target Niche
              </label>
              <select value={niche} onChange={(e) => setNiche(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-slate-900">
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
              <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-slate-900">
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
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-slate-900"
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
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-slate-900 resize-none font-medium"
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold rounded-lg text-xs cursor-pointer"
            >
              {isGenerating ? <RiLoader4Line className="w-4 h-4 animate-spin" /> : <><MdAutoAwesome size={14} className="text-pink-400" /> Render Variations</>}
            </button>
          </form>
        </div>
      </aside>

      {/* MAIN DISPLAY WORKSPACE */}
      <main className="flex-1 h-full overflow-y-auto p-6 lg:p-8 space-y-6">
        {/* EMPTY STATE */}
        {!isGenerating && generatedThumbnails.length === 0 && (
          <div className="h-full w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-white p-8 text-center max-h-[85vh]">
            <span className="p-3 bg-slate-50 text-slate-400 rounded-xl mb-3 animate-pulse"><HiOutlineSparkles size={24} /></span>
            <h3 className="text-sm font-bold text-slate-800 font-syne">Workspace Empty</h3>
            <p className="text-slate-400 text-xs max-w-xs mt-1">Configure sidebar inputs and execute to render variations.</p>
          </div>
        )}

        {/* LOADING SKELETON */}
        {isGenerating && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full max-h-[85vh]">
            {[1, 2, 3, 4].map((id) => (
              <div key={id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between animate-pulse shadow-sm">
                <div className="aspect-video w-full bg-slate-100 rounded-lg" />
              </div>
            ))}
          </div>
        )}

        {/* THUMBNAIL GRID DISPLAY */}
        {!isGenerating && generatedThumbnails.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 font-syne">Generated Layout Variations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {generatedThumbnails.map((item) => (
                <div key={item._id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all group">
                  
                  {/* Image Layer with Floating Download Icon */}
                  <div className="aspect-video w-full rounded-lg bg-slate-100 relative overflow-hidden border border-slate-100">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    
                    {/* 🚀 FLOATING DOWNLOAD ICON BUTTON */}
                    <button
                      onClick={() => handleDownload(item.imageUrl, item.dbRecordId || item._id)}
                      className="absolute top-2.5 right-2.5 p-2 bg-white/90 hover:bg-white text-slate-800 hover:text-pink-600 rounded-full shadow-lg transition-all border border-slate-200/50 cursor-pointer backdrop-blur-xs group-hover:scale-105"
                      title="Download Image"
                    >
                      <MdDownload size={16} />
                    </button>
                  </div>

                  {/* Metadata and Buttons Section */}
                  <div className="mt-3.5 space-y-3">
                    <h3 className="font-bold text-xs text-slate-800 line-clamp-1">{item.title || "Untitled Variant"}</h3>
                    
                    {/* 🚀 TWO EXCLUSIVE MAIN ACTION BUTTONS */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                      
                      {/* Button 1: Navigate to CTA Score Route */}
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
                        className="flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-xs cursor-pointer transition-all"
                      >
                        <MdAnalytics size={14} className="text-pink-500" />
                        <span>Check CTA Score</span>
                      </button>

                      {/* Button 2: Navigate to Studio Canvas Route */}
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
                        className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs cursor-pointer transition-all shadow-xs"
                      >
                        <MdBrush size={14} className="text-pink-400" />
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
  );
}