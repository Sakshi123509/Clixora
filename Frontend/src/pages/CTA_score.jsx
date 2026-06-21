import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdBrush,
  MdInsights,
  MdCheckCircle,
  MdWarning,
  MdAutoAwesome,
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
        // Fetch real data from your scoreController pipeline
        const { data } = await api.post("/api/generate/cta-score", {
          imageUrl,
          variantId: dbRecordId,
        });

        if (data.success) {
          setctaScore(data.overall || 78);
          setGeminiData(data.data); // Stores metrics and recommendations safely
        }
      } catch (error) {
        console.error("Error fetching CTA score workflow stream:", error);
      } finally {
        setIsAnalyzing(false);
      }
    };

    fetchScore();
  }, [imageUrl, dbRecordId]);

  // Purple Button Handler: Reveals real Gemini tips instantly without broken endpoint errors
  const handleAiAuditRequest = async () => {
    if (!imageUrl) {
      setAiFeedback("Missing target image URL asset link.");
      return;
    }

    setIsAiLoading(true);
    setAiFeedback(null);

    try {
      // 🚀 Send the real network request to your audit controller!
      const { data } = await api.post("/api/audit/audit-thumbnail", {
        imageUrl,
      });

      if (data.success) {
        // Set the brutally honest feedback returned from your new backend method
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
  return (
    <>
      <Navbar />
      {/* CLEAN & ROOMY DASHBOARD WRAPPER */}
      <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans pt-24 px-6 md:px-12 pb-12 flex flex-col items-center">
        {/* TOP LEVEL NAVIGATION ROW */}
        <div className="w-full max-w-6xl flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <MdArrowBack size={16} /> Back to Generator
          </button>

          <div className="text-right">
            <span className="text-[10px] font-mono font-black text-pink-500 uppercase tracking-widest block">
              {niche || "General Matrix Target"}
            </span>
            <h2 className="text-lg font-black text-slate-900 tracking-tight max-w-md truncate">
              {title || "Untitled Blueprint"}
            </h2>
          </div>
        </div>

        {/* EXPANDED TWO-COLUMN ANALYSIS HUB */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT PANEL: MASSIVE ASSET VIEWPORT (7 Columns wide) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-950 rounded-3xl p-6 shadow-xl flex flex-col h-full min-h-[350px]">
            <div className="w-full flex-1 flex items-center justify-center rounded-2xl overflow-hidden bg-slate-950 border border-white/5 shadow-inner aspect-video">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Target Stream Base"
                  className="w-full h-full object-contain max-h-[500px]"
                />
              ) : (
                <div className="text-sm font-bold text-slate-500">
                  Asset stream invalid or unreadable.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: LARGE-SCALE ANALYTICS METRIC CONTROLS (5 Columns wide) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* HEADER INSIGHT LABEL */}
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                <div className="p-2.5 bg-pink-50 rounded-xl text-pink-600">
                  <MdInsights size={22} />
                </div>
                <div>
                  <h1 className="text-sm font-black uppercase tracking-wider text-slate-900">
                    Predictive Scoreboard
                  </h1>
                  <p className="text-xs text-slate-400 font-medium">
                    Vision LLM real-time telemetry analytics matrix
                  </p>
                </div>
              </div>

              {/* ENLARGED GAUGES PANEL */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col items-center text-center relative">
                {isAnalyzing ? (
                  <div className="py-12 flex flex-col items-center gap-3">
                    <RiLoader4Line
                      size={40}
                      className="text-pink-500 animate-spin"
                    />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 animate-pulse">
                      Computing telemetry vectors...
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="relative flex flex-col items-center justify-center my-2">
                      <span className="text-7xl font-black tracking-tighter text-slate-900 font-syne">
                        {ctaScore}
                      </span>
                      <span className="text-xs font-black text-slate-400 mt-1 font-mono uppercase tracking-widest">
                        Total Performance / 100
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-black uppercase tracking-wider mt-4">
                      {ctaScore >= 80 ? (
                        <span className="text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-4 py-1.5 rounded-xl flex items-center gap-1">
                          <MdCheckCircle size={16} /> High CTR Potential
                        </span>
                      ) : (
                        <span className="text-amber-700 bg-amber-50 border border-amber-200/60 px-4 py-1.5 rounded-xl flex items-center gap-1">
                          <MdWarning size={16} /> Low Contrast Warning
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* DYNAMIC METRIC BARS LAYER */}
              {geminiData?.metrics && (
                <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Granular Telemetry Breaks
                  </h3>
                  {geminiData.metrics.map((m, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>{m.label}</span>
                        <span>{m.score}/100</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
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
              <div className="space-y-3 pt-2">
                {!aiFeedback && !isAiLoading && (
                  <button
                    onClick={handleAiAuditRequest}
                    className="w-full flex cursor-pointer items-center justify-center gap-2 py-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition shadow-lg shadow-purple-600/20 active:scale-98"
                  >
                    <MdAutoAwesome size={16} /> Extract Gemini Enhancement Tips
                  </button>
                )}

                {isAiLoading && (
                  <div className="w-full py-6 bg-purple-50/50 border border-purple-100 rounded-xl flex flex-col items-center justify-center gap-2">
                    <RiLoader4Line
                      size={28}
                      className="text-purple-600 animate-spin"
                    />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 animate-pulse">
                      Parsing diagnostic matrix tips...
                    </span>
                  </div>
                )}

                {!isAiLoading && aiFeedback && (
                  <div className="bg-purple-50/40 border border-purple-100 rounded-2xl p-5 space-y-3 animate-fadeIn">
                    <div className="text-xs font-black text-purple-700 uppercase tracking-widest flex items-center gap-1.5">
                      <HiOutlineSparkles size={14} /> Strategic Recommendations:
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed font-medium whitespace-pre-wrap font-sans bg-white p-4 rounded-xl border border-purple-100 shadow-xs max-h-[220px] overflow-y-auto">
                      {aiFeedback}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* QUICK LINK TO CANVAS WORKSPACE */}
            <div className="pt-4 border-t border-slate-100 mt-6">
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
