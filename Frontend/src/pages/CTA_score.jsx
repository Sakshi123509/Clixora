import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdBrush,
  MdInsights,
  MdCheckCircle,
  MdWarning,
  MdAutoAwesome,
  MdInfoOutline,
} from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi";
import { RiLoader4Line } from "react-icons/ri";
import api from "../api/apiInstance.js";
import Navbar from "../components/Navbar";

export default function CtaScore() {
  const location = useLocation();
  const navigate = useNavigate();

  const { imageUrl, dbRecordId, title, niche } = location.state || {};

  const [ctaScore, setctaScore] = useState(78);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  // Holds all metrics & recommendations returned by Gemini
  const [geminiData, setGeminiData] = useState(null);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const fetchScore = async () => {
      if (!imageUrl || !dbRecordId) {
        setIsAnalyzing(false);
        return;
      }
      setIsAnalyzing(true);
      try {
        const { data } = await api.post("/api/generate/cta-score", {
          imageUrl,
          variantId: dbRecordId,
        });

        if (data.success) {
          setctaScore(data.overall || 78);
          setGeminiData(data.data);
        }
      } catch (error) {
        console.error("Error fetching CTA score workflow stream:", error);
      } finally {
        setIsAnalyzing(false);
      }
    };

    fetchScore();
  }, [imageUrl, dbRecordId]);

  const handleAiAuditRequest = async () => {
    if (!imageUrl) {
      setAiFeedback("Missing target image URL asset link.");
      return;
    }

    setIsAiLoading(true);
    setAiFeedback(null);

    try {
      const { data } = await api.post("/api/audit/audit-thumbnail", {
        imageUrl,
      });

      if (data.success) {
        setAiFeedback(data.feedback);
      } else {
        setAiFeedback(
          data.message || "Failed to extract diagnostic data matrix.",
        );
      }
    } catch (error) {
      console.error("AI Doctor validation pipeline broke down:", error);
      setAiFeedback(
        error.response?.data?.message ||
          "Internal Engine Error during parsing workflow.",
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  // 🌟 SAFEGUARD: Fallback state for direct access without state tracking
  if (!imageUrl || !dbRecordId) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center pt-24 font-sans">
          <div className="bg-white p-8 border border-slate-200 rounded-3xl shadow-xl max-w-md w-full space-y-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit mx-auto">
              <MdInfoOutline size={32} />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-syne">No Thumbnail Asset Loaded</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              It seems you accessed this auditing terminal directly. Please navigate back to the workspace panel to generate or select a thumbnail variant matrix.
            </p>
            <button
              onClick={() => navigate("/generate")}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer transition shadow-xs"
            >
              <MdArrowBack size={14} /> Back to Studio Generator
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans pt-24 px-4 md:px-12 pb-12 flex flex-col items-center">
        
        {/* TOP LEVEL NAVIGATION ROW */}
        <div className="w-full max-w-6xl flex items-center justify-between mb-6 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer shrink-0"
          >
            <MdArrowBack size={16} /> Back to Generator
          </button>

          <div className="text-right min-w-0">
            <span className="text-[10px] font-mono font-black text-pink-500 uppercase tracking-widest block truncate">
              {niche || "General Matrix Target"}
            </span>
            <h2 className="text-base md:text-lg font-black text-slate-900 tracking-tight truncate max-w-[250px] sm:max-w-md">
              {title || "Untitled Blueprint"}
            </h2>
          </div>
        </div>

        {/* EXPANDED TWO-COLUMN ANALYSIS HUB */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT PANEL: MASSIVE ASSET VIEWPORT */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-950 rounded-3xl p-4 md:p-6 shadow-xl flex flex-col justify-center min-h-[300px] lg:min-h-0">
            <div className="w-full flex items-center justify-center rounded-2xl overflow-hidden bg-slate-950 border border-white/5 shadow-inner aspect-video">
              <img
                src={imageUrl}
                alt="Target Stream Base"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* RIGHT PANEL: LARGE-SCALE ANALYTICS METRIC CONTROLS */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {/* HEADER INSIGHT LABEL */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="p-2.5 bg-pink-50 rounded-xl text-pink-600 shrink-0">
                  <MdInsights size={20} />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Predictive Scoreboard
                  </h1>
                  <p className="text-[11px] text-slate-400 font-medium truncate">
                    Vision LLM real-time telemetry analytics matrix
                  </p>
                </div>
              </div>

              {/* ENLARGED GAUGES PANEL */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col items-center text-center relative">
                {isAnalyzing ? (
                  <div className="py-8 flex flex-col items-center gap-2">
                    <RiLoader4Line
                      size={36}
                      className="text-pink-500 animate-spin"
                    />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 animate-pulse">
                      Computing telemetry vectors...
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="relative flex flex-col items-center justify-center">
                      <span className="text-6xl font-black tracking-tighter text-slate-900 font-syne leading-none">
                        {ctaScore}
                      </span>
                      <span className="text-[10px] font-black text-slate-400 mt-2 font-mono uppercase tracking-widest">
                        Total Performance / 100
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider mt-4">
                      {ctaScore >= 80 ? (
                        <span className="text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-4 py-1.5 rounded-xl flex items-center gap-1">
                          <MdCheckCircle size={14} /> High CTR Potential
                        </span>
                      ) : (
                        <span className="text-amber-700 bg-amber-50 border border-amber-200/60 px-4 py-1.5 rounded-xl flex items-center gap-1">
                          <MdWarning size={14} /> Low Contrast Warning
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* DYNAMIC METRIC BARS LAYER */}
              {geminiData?.metrics && (
                <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 max-h-[160px] overflow-y-auto">
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400 sticky top-0 bg-transparent">
                    Granular Telemetry Breaks
                  </h3>
                  {geminiData.metrics.map((m, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-700">
                        <span>{m.label}</span>
                        <span>{m.score}/100</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-pink-500 h-full transition-all duration-500"
                          style={{ width: `${m.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* AI RECOMMENDATIONS ACTION WINDOW */}
              <div className="space-y-3">
                {!aiFeedback && !isAiLoading && (
                  <button
                    onClick={handleAiAuditRequest}
                    className="w-full flex cursor-pointer items-center justify-center gap-2 py-3 bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition shadow-lg shadow-purple-600/20 active:scale-98"
                  >
                    <MdAutoAwesome size={15} /> Extract Gemini Enhancement Tips
                  </button>
                )}

                {isAiLoading && (
                  <div className="w-full py-6 bg-purple-50/50 border border-purple-100 rounded-xl flex flex-col items-center justify-center gap-2">
                    <RiLoader4Line
                      size={24}
                      className="text-purple-600 animate-spin"
                    />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400 animate-pulse">
                      Parsing diagnostic matrix tips...
                    </span>
                  </div>
                )}

                {!isAiLoading && aiFeedback && (
                  <div className="bg-purple-50/40 border border-purple-100 rounded-2xl p-4 space-y-2.5 animate-fadeIn">
                    <div className="text-[10px] font-black text-purple-700 uppercase tracking-widest flex items-center gap-1.5">
                      <HiOutlineSparkles size={13} /> Strategic Recommendations:
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed font-medium whitespace-pre-wrap font-sans bg-white p-3.5 rounded-xl border border-purple-100 shadow-xs max-h-[140px] overflow-y-auto">
                      {aiFeedback}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* QUICK LINK TO CANVAS WORKSPACE */}
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() =>
                  navigate("/canvas", {
                    state: { imageUrl, dbRecordId, title },
                  })
                }
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer transition shadow-xs"
              >
                <MdBrush size={14} className="text-pink-400" />
                <span>Inject directly to Studio Canvas</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}