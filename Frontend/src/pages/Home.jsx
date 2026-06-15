import React, { useState } from "react";
import logoImg from "../assets/logo1.png";
import Navbar from "../components/Navbar"; // <-- Imported here
import Footer from "../components/Footer";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);

  const coreFeatures = [
    {
      title: "Predictive Analytics Engine",
      badge: "Gemini Intelligence",
      icon: "🧠",
      tagline: "Stop guessing what designs capture attention.",
      desc: "Our vision model checks layout distributions, focal points, and text contrast metrics against high-performance niches to give you immediate conversion feedback before you upload.",
      stat: "93.4%",
      statLabel: "CTR Prediction Accuracy",
    },
    {
      title: "Concurrent Compositing",
      badge: "Cloudflare AI Core",
      icon: "⚡",
      tagline: "Ultra-low latency variant generation.",
      desc: "Instantly build four separate design structures using concurrent AI pipelines. Scale variants, try alternate styling layouts, and lock down perfect baseline templates in under two seconds.",
      stat: "4x",
      statLabel: "Simultaneous Variant Yield",
    },
    {
      title: "Production Studio Canvas",
      badge: "Vector Framework",
      icon: "🎯",
      tagline: "Granular layout control straight from your browser.",
      desc: "Micro-adjust graphical positioning layers, swap out backgrounds seamlessly, optimize custom branding palettes, and compile pristine production-ready thumbnail components live.",
      stat: "100%",
      statLabel: "Lossless Vector Scaling",
    },
  ];

  const recentDrafts = [
    {
      title: "How I Closed a $100k Client Deal",
      niche: "Business & Sales",
      time: "Edited 2h ago",
      score: 94,
      bgGradient: "from-slate-900 to-indigo-950",
      imgurl: "/thumbnails/1.png",
    },
    {
      title: "The Ultimate Guide to YouTube Growth",
      niche: "Creator Tips",
      time: "Edited 1d ago",
      score: 91,
      bgGradient: "from-purple-950 to-purple-700",
      imgurl: "/thumbnails/2.png",
    },
    {
      title: "Coding a SaaS App in 24 Hours",
      niche: "Tech / Dev",
      time: "Edited 3d ago",
      score: 82,
      bgGradient: "from-gray-950 to-emerald-900",
      imgurl: "/thumbnails/3.png",
    },
  ];

  const howItWorksSteps = [
    {
      stepNum: "01",
      icon: "⚙️",
      method: "STEP ONE",
      title: "Input Generation Parameters",
      mainPoints: [
        "Provide Thumbnail title & choice of niche",
        "Select target visual style presets",
        "Define your brand color palette",
      ],
      desc: "Fill out the content creation framework fields. Clixora contextualizes your text inputs and branding choices to configure custom layout structures before firing the generation matrix.",
      features: [
        "Smart Niche Mapping",
        "Color Harmony Matrix",
        "Intent Interpretation",
      ],
      bgImage: "/thumbnails/step1.jpg",
    },
    {
      stepNum: "02",
      icon: "⚡",
      method: "STEP TWO",
      title: "Generate & Select Variants",
      mainPoints: [
        "Click the 'Generate' trigger button",
        "Cloudflare AI renders 4 unique layouts",
        "Review and select your favorite composition",
      ],
      desc: "Instantly spin up four distinct thumbnail configurations optimized for visual balance. Browse options side-by-side and pick the baseline structure that tells your video's story best.",
      features: [
        "4x Concurrent Rendering",
        "Ultra-low Latency Production",
        "Structural Variance Framework",
      ],
      bgImage: "/thumbnails/step2.jpg",
    },
    {
      stepNum: "03",
      icon: "🔮",
      method: "STEP THREE",
      title: "Score, Optimize & Route",
      mainPoints: [
        "Predictive Gemini AI CTA scoring",
        "Actionable transformation feedback",
        "Dual-destination workflow routing",
      ],
      desc: "Receive an immediate data-backed conversion score alongside target improvement tips. From here, finalize your build instantly with the quick Download button, or navigate smoothly into the Studio Canvas for granular asset layout adjustments.",
      features: [
        "Instant PNG Downloading",
        "Deep Studio Canvas Link",
        "AI Improvement Logs",
      ],
      bgImage: "/thumbnails/step3.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-hidden flex flex-col justify-between">
      {/* Dynamic Keyframes for Sci-Fi Card Drawing Effects */}
      <style>{`
        @keyframes border-draw {
          0% { border-color: rgba(226, 232, 240, 0.8); }
          50% { border-color: #db2777; }
          100% { border-color: #4f46e5; }
        }
        .animate-border-glow:hover {
          animation: border-draw 4s linear infinite;
        }
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
      `}</style>

      {/* Absolute Background Image Layer strictly for this section */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none -z-10 opacity-15"
        style={{ backgroundImage: `url(${logoImg})` }}
      />

      {/* ── HIGH-TECH GRADIENT BACKGROUND ORBS ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[650px] h-[650px] -top-[250px] -left-[150px] rounded-full bg-pink-500/10 blur-[40px]" />
        <div className="absolute w-[550px] h-[550px] -bottom-[150px] -right-[100px] rounded-full bg-indigo-500/10 blur-[50px]" />
      </div>

      <div className="relative z-10 font-outfit flex-grow">
        {/* Render New Componentized Navbar */}
        <Navbar logoImg={logoImg} />

        {/* ── SPLIT HERO SECTION ── */}
        {/* ── SPLIT HERO SECTION ── */}
        <header className="max-w-5xl mx-auto py-20 md:py-28 px-6 min-h-[80vh] flex flex-col justify-center items-center text-center relative z-10">
          {/* The isolated background layer that sits strictly behind this specific content box */}
          <div
            className="absolute inset-0 max-w-4xl mx-auto bg-contain bg-center bg-no-repeat pointer-events-none -z-10 opacity-10"
            style={{ backgroundImage: `url(${logoImg})` }}
          />

          <div className="animate-fade-in-up">
            <span className="bg-gradient-to-r from-pink-500/10 to-indigo-500/10 text-slate-900 text-xs font-mono font-bold tracking-widest px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6 border border-pink-200/60 shadow-sm backdrop-blur-md uppercase">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              ✨ Powered by Cloudflare AI + Gemini Intelligence
            </span>
          </div>

          <h1
            className="text-slate-900 font-black tracking-tight leading-[1.05] max-w-4xl"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
            }}
          >
            Create High CTR Thumbnails <br className="hidden sm:inline" />
            <span className="text-pink-600">That Drive Organic Reach</span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium tracking-tight">
            Generate high-converting compositions instantly using Cloudflare AI,
            run data-backed CTR prediction models via Gemini, and tweak text
            layouts live inside our browser studio canvas.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <a
              href="/generate"
              className="w-full sm:w-auto text-center bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-pink-600/20 transition-all transform hover:-translate-y-0.5 tracking-tight text-sm md:text-base"
            >
              🚀 Launch Generator Matrix
            </a>
            <a
              href="/dashboard"
              className="w-full sm:w-auto text-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold px-8 py-4 rounded-xl transition shadow-sm tracking-tight text-sm md:text-base"
            >
              View Active Dashboard
            </a>
          </div>
        </header>

        {/* ── ✨ INTERACTIVE CORE CAPABILITIES SECTION ✨ ── */}
        <section className="text-slate-800 py-20 px-6 relative overflow-hidden border-y border-slate-200/50">
          <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-5 space-y-4 order-2 md:order-1">
              <div className="mb-6">
                <span className="text-xs font-bold font-mono tracking-widest text-pink-600 uppercase">
                  Core Engine Capabilities
                </span>
                <h2
                  className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 text-slate-900"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Intelligent Architecture
                </h2>
              </div>

              {coreFeatures.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`w-full cursor-pointer text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                    activeTab === index
                      ? "bg-white border-pink-500 shadow-md shadow-pink-500/5"
                      : "bg-white/40 border-slate-200/60 hover:border-slate-300 hover:bg-white/80"
                  }`}
                >
                  <span
                    className={`text-xl p-2.5 rounded-xl ${activeTab === index ? "bg-pink-50 text-pink-600" : "bg-slate-100 text-slate-500"}`}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm tracking-wide text-slate-900">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {item.badge}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="md:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl relative min-h-[320px] flex flex-col justify-between backdrop-blur-sm order-1 md:order-2">
              <div>
                <span className="px-3 py-1 text-[10px] font-mono font-bold bg-pink-50 text-pink-600 rounded-md border border-pink-100 inline-block mb-4">
                  {coreFeatures[activeTab].badge}
                </span>
                <h3
                  className="text-xl md:text-2xl font-bold text-slate-900 mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {coreFeatures[activeTab].title}
                </h3>
                <p className="text-pink-600 text-sm font-semibold tracking-wide mb-3">
                  "{coreFeatures[activeTab].tagline}"
                </p>
                <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
                  {coreFeatures[activeTab].desc}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-6">
                <div>
                  <div className="text-3xl font-black font-mono text-slate-900 tracking-tight">
                    {coreFeatures[activeTab].stat}
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-1">
                    {coreFeatures[activeTab].statLabel}
                  </div>
                </div>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500 transition-all duration-500 rounded-full"
                    style={{
                      width:
                        activeTab === 0
                          ? "93.4%"
                          : activeTab === 1
                            ? "75%"
                            : "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 💻 HOW CLIXORA WORKS SECTION ── */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="mb-16">
            <h2
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4"
              style={{
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              HOW TO ACTIVATE <span className="text-pink-600">CLIXORA</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base font-medium">
              Our optimized three-step workflow streamlines resource-heavy
              graphic design into a unified, lightning-fast rendering operation.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 items-stretch">
            {howItWorksSteps.map((step, idx) => (
              <div
                key={idx}
                className="backdrop-blur-md border-2 border-slate-100/80 rounded-2xl p-6 md:p-8 text-left relative overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl group flex flex-col justify-between min-h-[550px] animate-border-glow bg-white"
                style={{
                  backgroundImage: step.bgImage
                    ? `linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.98)), url(${step.bgImage})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-slate-300 group-hover:border-pink-500 transition-colors duration-300" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-slate-300 group-hover:border-pink-500 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-slate-300 group-hover:border-pink-500 transition-colors duration-300" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-slate-300 group-hover:border-pink-500 transition-colors duration-300" />

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-indigo-600/80 block mb-1 uppercase font-mono">
                        {step.method}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-lg border border-slate-200/60 group-hover:bg-pink-50 group-hover:border-pink-200 transition-all duration-300">
                        {step.icon}
                      </div>
                    </div>
                    <span className="text-6xl font-black text-slate-100 select-none font-mono group-hover:text-pink-100/60 transition-colors duration-300 tracking-tighter">
                      {step.stepNum}
                    </span>
                  </div>

                  <h3
                    className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mb-6 group-hover:text-pink-600 transition-colors duration-200"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {step.title}
                  </h3>

                  <ul className="space-y-3 mb-6">
                    {step.mainPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full border border-pink-500/60 flex items-center justify-center text-[10px] font-bold text-pink-600 mt-0.5 flex-shrink-0 bg-pink-50/40">
                          {pIdx + 1}
                        </span>
                        <span className="text-sm font-semibold text-slate-800 tracking-tight">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-slate-600 text-xs leading-relaxed font-medium mb-6 border-t border-slate-200/60 pt-4">
                    {step.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2">
                    {step.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md border border-slate-200/50 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all duration-300"
                      >
                        • {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DASHBOARD PROJECTS SECTION ── */}
        <main className="max-w-6xl mx-auto px-6 pb-24">
          <div className="flex justify-between items-center mb-8">
            <h2
              className="text-xl md:text-2xl font-bold tracking-tight text-slate-900"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Your Recent Drafts
            </h2>
            <a
              href="/dashboard"
              className="text-pink-600 hover:text-pink-700 font-bold text-sm transition"
            >
              View all projects &rarr;
            </a>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recentDrafts.map((draft, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 group cursor-pointer relative overflow-hidden"
              >
                <div
                  className={`w-full aspect-video bg-gradient-to-br ${draft.bgGradient} rounded-xl mb-4 flex items-center justify-center text-4xl shadow-inner overflow-hidden`}
                >
                  <img
                    src={draft.imgurl}
                    alt={draft.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                </div>

                <div className="absolute top-0 left-0 w-1.5 h-full bg-pink-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 block mb-1 font-mono">
                  {draft.niche}
                </span>

                <h3 className="font-bold text-sm md:text-base text-slate-900 group-hover:text-pink-600 transition line-clamp-1 mb-1">
                  {draft.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4">{draft.time}</p>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold tracking-wide uppercase font-mono">
                    Predictive CTR
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      draft.score >= 85
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {draft.score}% Score
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
