import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdBrush,
  MdInsights,
  MdDeleteOutline,
  MdCloudDone,
  MdInsertChartOutlined,
  MdSpeed,
  MdAddPhotoAlternate,
} from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi";
import { RiLoader4Line } from "react-icons/ri";
import axios from "axios";
import logoImg from "../assets/logo1.png";

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Analytics Dashboard KPI counters metrics
  const [stats, setStats] = useState({ total: 0, avgcta: 0, peakcta: 0 });

  // FETCH PROJECTS ENGINE ON LOAD
  useEffect(() => {
    fetchSavedThumbnails();
  }, []);

  const fetchSavedThumbnails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/dashboard/saved-projects",
      );
      if (response.data.success) {
        const fetchedData = response.data.projects;
        setProjects(fetchedData);

        // Calculate Live KPI vectors
        if (fetchedData.length > 0) {
          const scores = fetchedData.map((p) => p.ctaScore || 0);
          const maxcta = Math.max(...scores);
          const avg = Math.round(
            scores.reduce((a, b) => a + b, 0) / fetchedData.length,
          );
          setStats({ total: fetchedData.length, avgcta: avg, peakcta: maxcta });
        }
      }
    } catch (error) {
      console.error("Dashboard core telemetry offline:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // PURGE DELETE PROJECT HANDLER
  const handleDeleteProject = async (id, e) => {
    e.stopPropagation(); // Prevents click triggering page redirect maps
    if (
      !window.confirm(
        "Are you sure you want to permanently erase this asset from dashboard grid?",
      )
    )
      return;

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/dashboard/project/${id}`,
      );
      if (response.data.success) {
        setProjects(projects.filter((p) => p._id !== id));
        // Refresh structural stats matrices natively
        fetchSavedThumbnails();
      }
    } catch (error) {
      alert("Failed to drop database link metadata schema.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 flex flex-col font-sans antialiased overflow-x-hidden">
      {/* GLOBAL COMMAND HEADER */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-50 shrink-0 shadow-xs">
        <div className="flex items-center gap-4">
          {/* BRAND LOGO - Now using global uniform heavy tracking typography */}
          <div
            className="flex items-center gap-2 text-lg font-extrabold text-slate-950 tracking-tight cursor-pointer shrink-0 font-sans select-none"
            onClick={() => navigate("/")}
          >
            <img
              src={logoImg}
              alt="Clixora"
              className="h-6 w-auto object-contain antialiased"
            />
            <span className="tracking-tighter">
              CLIXORA<span className="text-pink-500 font-black">.ai</span>
            </span>
          </div>

          {/* VERTICAL SEPARATOR LINE */}
          <div className="h-6 w-[1px] bg-slate-200/80 shrink-0 hidden sm:block" />

          {/* CONTEXTUAL PAGE INFORMATION */}
          <div className="hidden sm:block font-sans">
            <h1 className="text-xs font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
              <span>Creator Hub Dashboard</span>
              <span className="text-[9px] bg-slate-100 text-slate-500 py-0.5 px-1.5 rounded-full border border-slate-200/60 font-mono font-bold tracking-normal normal-case">
                v2.0
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 mt-0.5 font-semibold tracking-wide">
              Unified Studio Repository Control Desk.
            </p>
          </div>
        </div>

        {/* PRIMARY CALL TO ACTION */}
        <button
          onClick={() => navigate("/generate")}
          className="flex items-center cursor-pointer gap-1.5 py-2 px-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-xl text-xs cursor-pointer shadow-md transition transform hover:scale-[1.01]"
        >
          <MdAddPhotoAlternate size={15} />
          <span>Launch Creative Engine</span>
        </button>
      </header>

      {/* CORE CONTROL SHEET CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        {/* METRICS ROW SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex items-center justify-between relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Cloud Storage Registry
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-syne">
                {stats.total} Projects
              </h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-500 border border-blue-100 rounded-xl">
              <MdCloudDone size={22} />
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex items-center justify-between relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Median Performance
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-syne">
                {stats.avgcta}% cta
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-xl">
              <MdInsertChartOutlined size={22} />
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500" />
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-purple-500 tracking-wider flex items-center gap-0.5">
                <HiOutlineSparkles /> Peak Vector Spike
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-syne text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-slate-900">
                {stats.peakcta}% Max cta
              </h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-500 border border-purple-100 rounded-xl">
              <MdSpeed size={22} />
            </div>
          </div>
        </section>

        {/* PROJECTS HOUSING GRID MATRIX */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Active Historic Thumbnail Schemas
            </h3>
            <span className="text-[11px] font-bold text-slate-400">
              Total Synchronized Nodes: {projects.length}
            </span>
          </div>

          {/* LOADING GRID SCREEN ROUTINES */}
          {isLoading ? (
            <div className="py-24 text-center space-y-3">
              <RiLoader4Line
                className="animate-spin text-slate-400 mx-auto"
                size={32}
              />
              <p className="text-xs font-bold text-slate-400 tracking-wide animate-pulse">
                Syncing cluster databases repositories...
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-white/60 space-y-4 max-w-md mx-auto">
              <p className="text-xs text-slate-400 font-semibold max-w-[240px] mx-auto leading-relaxed">
                No elements compiled inside cloud repository cluster grids yet.
              </p>
              <button
                onClick={() => navigate("/generate")}
                className="py-1.5 px-4 bg-slate-900 cursor-pointer text-white font-bold rounded-lg text-[11px]"
              >
                Compile Initial Asset
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                >
                  {/* Image Grid Overlay Header Component Wrapper */}
                  <div className="aspect-video w-full bg-slate-900/5 overflow-hidden relative border-b border-slate-100">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
                    />

                    {/* Performance cta Floating Ring Display */}
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1 font-mono text-[10px] font-black">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>{project.ctaScore || 78}% cta</span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-slate-900/80 text-pink-400 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                      {project.niche || "Tech / Core"}
                    </div>
                  </div>

                  {/* Body Content Descriptive Meta Panels */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4
                        className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-pink-600 transition"
                        title={project.title}
                      >
                        {project.title}
                      </h4>
                      <p className="text-[10px] font-mono text-slate-400">
                        Compiled on:{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Operational Trigger Action Arrays */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() =>
                          navigate("/canvas", {
                            state: {
                              imageUrl: project.imageUrl,
                              dbRecordId: project._id,
                              title: project.title,
                            },
                          })
                        }
                        className="flex cursor-pointer items-center justify-center gap-1 py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold rounded-lg text-[10px] transition"
                        title="Modify on studio interface workspace"
                      >
                        <MdBrush size={12} className="text-purple-500" />
                        <span>Studio</span>
                      </button>

                      <button
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
                        className="flex cursor-pointer items-center justify-center gap-1 py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold rounded-lg text-[10px] transition"
                        title="Examine cta neural matrix score map"
                      >
                        <MdInsights size={12} className="text-pink-500" />
                        <span>Metrics</span>
                      </button>

                      <button
                        onClick={(e) => handleDeleteProject(project._id, e)}
                        className="flex cursor-pointer items-center justify-center gap-1 py-1.5 px-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 font-bold rounded-lg text-[10px] transition"
                        title="Drop resource frame permanently"
                      >
                        <MdDeleteOutline size={12} />
                        <span>Purge</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
