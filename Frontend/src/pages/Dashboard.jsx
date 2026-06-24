import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdBrush,
  MdInsights,
  MdDeleteOutline,
  MdSpeed,
  MdTrendingUp,
} from "react-icons/md";
import { FcBarChart } from "react-icons/fc";
import { HiOutlineSparkles } from "react-icons/hi";
import { RiLoader4Line } from "react-icons/ri";
import Navbar from "../components/Navbar";
import logoImg from "../assets/logo1.png";
import api from "../api/apiInstance.js";
import { motion, AnimatePresence } from "motion/react"; // 🌟 Imported AnimatePresence for deletions

// 🌟 Animation Variants for Orchestrated Staggering
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🌟 DERIVED METRICS FOR LIVE TELEMETRY PANELS
  const totalCloudAssets = projects.length;

  const totalcta = projects.reduce(
    (acc, curr) =>
      acc +
      (Number(curr.ctaScore) !== 0 && curr.ctaScore !== null
        ? Number(curr.ctaScore)
        : 75),
    0,
  );
  const averagePredictiveCta =
    totalCloudAssets > 0 ? Math.round(totalcta / totalCloudAssets) : 0;

  const peakPerformanceIndex =
    totalCloudAssets > 0
      ? Math.max(
          ...projects.map((p) =>
            p.ctaScore !== null ? Number(p.ctaScore) : 75,
          ),
        )
      : 0;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get("/api/dashboard/saved-projects");

        if (data.success) {
          setProjects(data.projects || []);
        }
      } catch (error) {
        console.error("Dashboard synchronization aborted:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDeleteProject = async (id, e) => {
    e.stopPropagation();
    if (
      !window.confirm("Are you sure you want to permanently purge this asset?")
    )
      return;

    try {
      const { data } = await api.delete(`/api/dashboard/project/${id}`);
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error("Purge operations aborted:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-pink-500 selection:text-white">
      <Navbar logoImg={logoImg} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* DASHBOARD HERO HEADER */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-pink-600 uppercase mb-1">
              <MdDashboard className="animate-pulse" />
              Authorized Creator Cluster
            </div>
            <h1
              className="text-3xl md:text-4xl font-black tracking-tight text-slate-900"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Studio Workspace Hub
            </h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/generate")}
            className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-pink-500 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-lg shadow-pink-500/20 hover:shadow-xl transition-all cursor-pointer"
          >
            <HiOutlineSparkles className="group-hover:rotate-12 transition-transform" />
            <span>Generate New Matrix</span>
          </motion.button>
        </motion.header>

        {/* TELEMETRY ANALYTICS PANEL */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12"
        >
          {/* CARD 1: TOTAL INDEX */}
          <motion.div 
            variants={itemVariants}
            className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm relative overflow-hidden group hover:border-pink-300 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 text-slate-900 group-hover:scale-110 transition-transform">
              <FcBarChart size={64} />
            </div>
            <p className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-1">
              Total Cloud Assets
            </p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {isLoading ? "---" : totalCloudAssets}
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Active variants locked in DB
            </p>
          </motion.div>

          {/* CARD 2: AVERAGE PERFORMANCE */}
          <motion.div 
            variants={itemVariants}
            className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm relative overflow-hidden group hover:border-purple-300 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 text-slate-900 group-hover:scale-110 transition-transform">
              <MdSpeed size={64} />
            </div>
            <p className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-1">
              Average Predictive CTA
            </p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {isLoading ? "---" : `${averagePredictiveCta}%`}
            </h3>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              {/* Animated Progress Bar Fill */}
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${isLoading ? 0 : averagePredictiveCta}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* CARD 3: PEAK SCORE */}
          <motion.div 
            variants={itemVariants}
            className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 text-slate-900 group-hover:scale-110 transition-transform">
              <MdTrendingUp size={64} />
            </div>
            <p className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-1">
              Peak Performance Index
            </p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {isLoading ? "---" : `${peakPerformanceIndex}/100`}
            </h3>
            <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
              <span>★</span> Maximum click optimization achieved
            </p>
          </motion.div>
        </motion.section>

        {/* GALLERY GRID MONITOR SECTOR */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              Your Asset Grid Vault
            </h2>
            <span className="text-xs bg-slate-200/60 text-slate-600 px-3 py-1 rounded-full font-semibold">
              {projects.length} Templates
            </span>
          </div>

          {isLoading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-3xl shadow-xs"
            >
              <RiLoader4Line
                size={40}
                className="text-pink-500 animate-spin mb-3"
              />
              <p className="text-xs font-mono tracking-wider font-bold text-slate-400 uppercase animate-pulse">
                Accessing remote media records...
              </p>
            </motion.div>
          ) : projects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white border border-dashed border-slate-200 rounded-3xl"
            >
              <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mb-4 text-2xl shadow-inner">
                🎯
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">
                No Thumbnail Blueprints Registered
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mb-6">
                Your database layer is clear. Let's create an optimized
                thumbnail using our Gemini workflows!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/generate")}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
              >
                Launch Generator Matrix
              </motion.button>
            </motion.div>
          ) : (
            /* 🌟 Animated Grid with layout orchestration */
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {projects.map((project) => {
                  const displayScore =
                    project.ctaScore !== null ? project.ctaScore : 75;
                  return (
                    <motion.div
                      layout // 🌟 Smooth re-positioning when an item is deleted
                      variants={itemVariants}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }} // 🌟 Fade and shrink layout on purge
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      key={project._id}
                      className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="aspect-video bg-slate-900 overflow-hidden relative border-b border-slate-100">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 right-3 drop-shadow-md z-10">
                          <span
                            className={`text-[11px] font-mono font-black px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                              displayScore >= 85
                                ? "bg-emerald-500 border-emerald-400 text-white"
                                : "bg-amber-500 border-amber-400 text-white"
                            }`}
                          >
                            <MdSpeed size={12} />
                            {displayScore}% CTA
                          </span>
                        </div>

                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              navigate("/canvas", {
                                state: {
                                  imageUrl: project.imageUrl,
                                  dbRecordId: project._id,
                                  title: project.title,
                                  niche: project.niche,
                                },
                              })
                            }
                            className="bg-white/95 backdrop-blur-md hover:bg-pink-600 hover:text-white text-slate-900 font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-md flex items-center gap-1.5 cursor-pointer"
                          >
                            <MdBrush size={14} /> Studio Editor
                          </motion.button>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="mb-4">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                            {project.niche || "General Media"}
                          </span>
                          <h3 className="font-bold text-sm text-slate-800 line-clamp-1 mt-1.5 group-hover:text-pink-600 transition">
                            {project.title || "Untitled Visual Grid"}
                          </h3>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Registered{" "}
                            {new Date(project.createdAt).toLocaleDateString(
                              undefined,
                              { month: "short", day: "numeric" },
                            )}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              navigate("/cta-score", {
                                state: {
                                  imageUrl: project.imageUrl,
                                  dbRecordId: project._id,
                                  title: project.title,
                                  niche: project.niche,
                                },
                              })
                            }
                            className="flex cursor-pointer items-center justify-center gap-1 py-2 px-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold rounded-xl text-[11px] transition whitespace-nowrap"
                          >
                            <MdInsights
                              size={13}
                              className="text-purple-500 flex-shrink-0"
                            />
                            <span>Audit Data</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => handleDeleteProject(project._id, e)}
                            className="flex cursor-pointer items-center justify-center gap-1 py-2 px-1.5 bg-rose-50/70 hover:bg-rose-100 text-rose-600 border border-rose-100 font-bold rounded-xl text-[11px] transition whitespace-nowrap"
                          >
                            <MdDeleteOutline
                              size={13}
                              className="flex-shrink-0"
                            />
                            <span>Purge</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}