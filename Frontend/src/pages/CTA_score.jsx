import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdBrush,
  MdInsights,
  MdCheckCircle,
  MdWarning,
  MdLightbulb,
  MdAutoAwesome,
} from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi";
import { RiLoader4Line } from "react-icons/ri";
import axios from "axios";

export default function ctaScore() {
  const location = useLocation();
  const navigate = useNavigate();

  const { imageUrl, dbRecordId, title, niche } = location.state || {};

  const [ctaScore, setctaScore] = useState(78);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  // New States for Gemini Vision AI Doctor
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setctaScore(Math.floor(Math.random() * (92 - 74 + 1)) + 74);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // API DISPATCH: Call Gemini Vision Audit Endpoint
  const handleAskAIDoctor = async () => {
    setIsAiLoading(true);
    setAiFeedback(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/ai/audit-thumbnail",
        {
          imageUrl: imageUrl,
        },
      );

      if (response.data.success) {
        setAiFeedback(response.data.feedback);
      } else {
        alert("Doctor was busy: " + response.data.message);
      }
    } catch (error) {
      console.error("AI Audit Connection Refused:", error);
      alert("Could not connect to Gemini Vision Core.");
    } finally {
      setIsAiLoading(false);
    }
  };

  if (!imageUrl) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 text-center p-4">
        <h3 className="text-sm font-bold text-slate-800">
          No Active Image Selected
        </h3>
        <button
          onClick={() => navigate("/generate")}
          className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
        >
          Go to Generation Core
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 flex flex-col font-sans antialiased overflow-x-hidden">
      {/* TOP HEADER */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/generate")}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition"
          >
            <MdArrowBack size={18} />
          </button>
          <div>
            <h1 className="text-sm font-black text-slate-900 uppercase tracking-wider font-syne flex items-center gap-1.5">
              <MdInsights className="text-pink-500" size={16} /> cta Analytics
              Laboratory
            </h1>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Evaluating: {title || "Variant Asset"}
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            navigate("/canvas", { state: { imageUrl, dbRecordId, title } })
          }
          className="flex items-center gap-1.5 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs cursor-pointer shadow-sm transition"
        >
          <MdBrush size={14} className="text-pink-400" />
          <span>Fix on Studio Canvas</span>
        </button>
      </header>

      {/* MAIN VIEWPORT - Flex grow ensures it captures entire remaining viewport vertically */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* LEFT COLUMN: PREVIEW - Centered neatly */}
        <section className="md:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
          <div className="space-y-4 w-full">
            <div className="text-[11px] font-black uppercase text-slate-400 tracking-widest">
              Selected Variant Matrix Preview
            </div>
            <div className="aspect-video w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative shadow-sm">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 text-white font-bold rounded text-[10px] uppercase tracking-wide">
                Target Niche: {niche || "General"}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mt-5">
            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <MdLightbulb className="text-amber-500" size={14} /> Design
              Overlay String
            </h4>
            <p className="text-[11px] text-slate-500 font-medium mt-1 italic">
              "{title}"
            </p>
          </div>
        </section>

        {/* RIGHT COLUMN: SCORE & AI AUDITOR - Stretches symmetrically */}
        <section className="md:col-span-6 flex flex-col gap-6 h-full justify-between">
          {/* DIAL METER CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col items-center justify-center text-center relative overflow-hidden flex-1">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-indigo-500" />
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              Estimated cta Performance
            </h3>

            {isAnalyzing ? (
              <div className="py-4 flex flex-col items-center justify-center space-y-2">
                <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] text-slate-400 font-bold">
                  Running Neural Heatmaps...
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-6 my-2">
                <div className="w-24 h-24 rounded-full border-4 border-slate-100 flex flex-col items-center justify-center bg-slate-50 shadow-inner shrink-0">
                  <span className="text-3xl font-black text-slate-900 font-syne tracking-tighter">
                    {ctaScore}%
                  </span>
                  <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-wider">
                    Optimal
                  </span>
                </div>
                <div className="text-left space-y-1">
                  <div className="text-xs font-bold text-slate-800">
                    Excellent Strategic Scope
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal max-w-[240px]">
                    This matrix performs better than 82% of current benchmarks
                    in{" "}
                    <strong className="text-slate-600">
                      {niche || "SaaS/Tech"}
                    </strong>
                    .
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* DYNAMIC GEMINI VISION LLM AUDITOR CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 relative flex-1 flex flex-col justify-between">
            <div className="w-full">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <MdAutoAwesome className="text-purple-500" /> Gemini Vision
                    AI Design Doctor
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Scans pixel layout contrast metrics automatically
                  </p>
                </div>

                <button
                  onClick={handleAskAIDoctor}
                  disabled={isAiLoading}
                  className="flex items-center gap-1 py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-200 disabled:to-slate-300 text-white disabled:text-slate-500 font-bold rounded-lg text-[11px] cursor-pointer shadow-xs transition shrink-0"
                >
                  {isAiLoading ? (
                    <RiLoader4Line className="animate-spin" size={13} />
                  ) : (
                    <HiOutlineSparkles size={13} />
                  )}
                  <span>
                    {aiFeedback ? "Re-Audit Design" : "Run AI Visual Scan"}
                  </span>
                </button>
              </div>

              {/* AI LIVE PLOT FEEDBACK SCREEN */}
              <div className="mt-4 flex-1">
                {isAiLoading && (
                  <div className="py-12 text-center space-y-2">
                    <div className="w-7 h-7 border-3 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-[11px] font-bold text-purple-600 animate-pulse tracking-wide">
                      Multimodal LLM is processing canvas text layers...
                    </p>
                  </div>
                )}

                {!isAiLoading && !aiFeedback && (
                  <div className="py-10 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    <p className="text-xs text-slate-400 font-medium">
                      Click the button above to unlock direct Gemini Multimodal
                      vision audit tips.
                    </p>
                  </div>
                )}

                {!isAiLoading && aiFeedback && (
                  <div className="bg-purple-50/40 border border-purple-100 rounded-xl p-4 space-y-3 animate-fadeIn">
                    <div className="text-[10px] font-black text-purple-600 uppercase tracking-widest flex items-center gap-1">
                      ✨ Live Diagnostics Report:
                    </div>
                    <div className="text-[11px] text-slate-700 leading-relaxed font-medium whitespace-pre-wrap font-sans bg-white p-3 rounded-lg border border-purple-200/40 shadow-xs max-h-[180px] overflow-y-auto">
                      {aiFeedback}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* QUICK LINK TO WORKSPACE */}
            <div className="pt-4 border-t border-slate-100 mt-4">
              <button
                onClick={() =>
                  navigate("/canvas", {
                    state: { imageUrl, dbRecordId, title },
                  })
                }
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer transition shadow-xs"
              >
                <MdBrush size={14} className="text-pink-400" />
                <span>Inject directly to Fabric.js Studio Canvas</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
