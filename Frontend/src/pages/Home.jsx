import React, { useState } from "react";

export default function HomePage() {
  // Active state handler for interactive core engine capabilities section
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-hidden">
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
      `}</style>

      {/* ── HIGH-TECH GRADIENT BACKGROUND ORBS ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[650px] h-[650px] -top-[250px] -left-[150px] rounded-full bg-pink-500/10 blur-[40px]" />
        <div className="absolute w-[550px] h-[550px] -bottom-[150px] -right-[100px] rounded-full bg-indigo-500/10 blur-[50px]" />
      </div>

      <div className="relative z-1">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-2 font-bold text-xl text-pink-600 tracking-tight">
            <span className="p-2 bg-pink-50 text-pink-600 rounded-lg">
              <img
                src="../assets/logo.jpg"
                className="h-6 w-auto object-contain"
              />
            </span>
            CLIXORA
          </div>
          <div className="flex gap-6 font-medium text-slate-600">
            <a
              href="/"
              className="text-pink-600 border-b-2 border-pink-600 pb-1"
            >
              Home
            </a>
            <a href="/dashboard" className="hover:text-slate-900 transition">
              Dashboard
            </a>
            <a href="/canvas" className="hover:text-slate-900 transition">
              Canvas
            </a>
            <a href="/cta-score" className="hover:text-slate-900 transition">
              CTA-Score
            </a>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-sm">
            JD
          </div>
        </nav>

        {/* ── SPLIT HERO SECTION ── */}
        <header className="max-w-6xl mx-auto py-16 px-6 min-h-screen grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Copywriting Content */}
          <div className="text-left">
            <span className="bg-pink-50 text-pink-700 text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm border border-pink-100">
              ✨ Powered by Cloudflare AI + Gemini Intelligence
            </span>
            <h1
              className="text-slate-900 font-extrabold tracking-tight leading-none"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.5rem, 4.5vw, 3.6rem)",
              }}
            >
              Create High CTR Thumbnails{" "}
              <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                That Get Clicks
              </span>
            </h1>
            <p className="mt-5 text-[1.1rem] text-slate-600 leading-relaxed">
              Generate high-converting compositions instantly using Cloudflare
              AI, run data-backed CTR prediction models via Gemini, and tweak
              text layouts live inside our browser studio canvas.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <a
                href="/generate"
                className="bg-pink-600 cursor-pointer hover:bg-pink-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-pink-600/20 transition-all transform hover:-translate-y-0.5"
              >
                + Generate New Thumbnail
              </a>
              <a
                href="/dashboard"
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3.5 rounded-xl transition shadow-sm"
              >
                Watch Walkthrough
              </a>
            </div>
          </div>

          {/* Right Side: Visual Mockup */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white shadow-slate-900/20">
            <img
              src="/thumbnails/shake.jpg"
              alt="Workspace Thumbnail Asset"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 z-10">
              🛠️ AI CANVAS WORKSPACE
            </div>

            <div className="absolute bottom-4 right-4 bg-emerald-500 text-white text-sm font-extrabold px-3.5 py-1.5 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-1 z-10">
              <span>94%</span>
              <span className="text-[10px] font-medium opacity-90">
                CTA SCORE
              </span>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-10">
              <div className="w-[45%] h-full bg-red-500" />
            </div>
          </div>
        </header>

        {/* ── ✨ INTERACTIVE CORE CAPABILITIES SECTION ✨ ── */}
        <section className=" text-slate-800 py-20 px-6 relative overflow-hidden border-y border-slate-200/50">
          <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Column: Interactive Nav Selectors (Force onto top position for mobile via md:order-1) */}
            <div className="md:col-span-5 space-y-4 order-1 md:order-1">
              <div className="mb-6">
                <span className="text-xs font-bold font-mono tracking-widest text-pink-600 uppercase">
                  Core Engine Capabilities
                </span>
                <h2
                  className="text-3xl font-extrabold tracking-tight mt-1 text-slate-900"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Intelligent Architecture
                </h2>
              </div>

              {coreFeatures.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                    activeTab === index
                      ? "bg-white border-pink-500 shadow-md shadow-pink-500/5"
                      : "bg-white/40 border-slate-200/60 hover:border-slate-300 hover:bg-white/80"
                  }`}
                >
                  <span
                    className={`text-2xl p-2.5 rounded-xl ${activeTab === index ? "bg-pink-50 text-pink-600" : "bg-slate-100 text-slate-500"}`}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm tracking-wide text-slate-900">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {item.badge}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Column: Visual Feature Presentation Sandbox (md:order-2 shifts it behind tabs on desktop) */}
            <div className="md:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative min-h-[340px] flex flex-col justify-between backdrop-blur-sm order-2 md:order-2">
              <div>
                <span className="px-3 py-1 text-[11px] font-mono font-bold bg-pink-50 text-pink-600 rounded-md border border-pink-100 inline-block mb-4">
                  {coreFeatures[activeTab].badge}
                </span>
                <h3
                  className="text-2xl font-bold text-slate-900 mb-2"
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

              {/* Data Visualization Metric Counter Box */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-6">
                <div>
                  <div className="text-4xl font-black font-mono text-slate-900 tracking-tight">
                    {coreFeatures[activeTab].stat}
                  </div>
                  <div className="text-[11px] uppercase font-bold tracking-wider text-slate-400 mt-1">
                    {coreFeatures[activeTab].statLabel}
                  </div>
                </div>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-indigo-500 transition-all duration-500 rounded-full"
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
              className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4"
              style={{
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              HOW TO ACTIVATE <span className="text-pink-600">CLIXORA</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base font-medium">
              Our optimized three-step workflow streamlines resource-heavy
              graphic design into a unified, lightning-fast rendering operation.
            </p>
          </div>

          {/* Grid Container */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 items-stretch">
            {howItWorksSteps.map((step, idx) => (
              <div
                key={idx}
                className="backdrop-blur-md border-2 border-slate-200/80 rounded-2xl p-8 text-left relative overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl group flex flex-col justify-between min-h-[580px] animate-border-glow bg-white"
                style={{
                  backgroundImage: step.bgImage
                    ? `linear-gradient(to bottom, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.97)), url(${step.bgImage})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Visual Accent Layer: Corner Brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-slate-300 group-hover:border-pink-500 transition-colors duration-300" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-slate-300 group-hover:border-pink-500 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-slate-300 group-hover:border-pink-500 transition-colors duration-300" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-slate-300 group-hover:border-pink-500 transition-colors duration-300" />

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-xs font-bold tracking-widest text-indigo-600/80 block mb-1 uppercase font-mono">
                        {step.method}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl border border-slate-200/60 group-hover:bg-pink-50 group-hover:border-pink-200 transition-all duration-300">
                        {step.icon}
                      </div>
                    </div>
                    <span className="text-7xl font-black text-slate-100 select-none font-mono group-hover:text-pink-100/60 transition-colors duration-300 tracking-tighter">
                      {step.stepNum}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-bold tracking-tight text-slate-900 mb-6 group-hover:text-pink-600 transition-colors duration-200"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {step.title}
                  </h3>

                  <ul className="space-y-3.5 mb-6">
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

                  <p className="text-slate-600 text-xs leading-relaxed font-medium mb-8 border-t border-slate-200/60 pt-4">
                    {step.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {step.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[11px] font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md border border-slate-200/50 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all duration-300"
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
              className="text-2xl font-bold tracking-tight text-slate-900"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Your Recent Drafts
            </h2>
            <button className="text-pink-600 hover:text-pink-700 cursor-pointer font-semibold text-sm transition">
              View all projects &rarr;
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentDrafts.map((draft, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 group cursor-pointer relative overflow-hidden"
              >
                {/* Miniature Image Shell via standard Tailwind instead of raw styles */}
                <div
                  className={`w-full aspect-video bg-gradient-to-br ${draft.bgGradient} rounded-xl mb-4 flex items-center justify-center text-4xl shadow-inner overflow-hidden`}
                >
                  <img
                    src={draft.imgurl}
                    alt={draft.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://i.pinimg.com/1200x/52/33/ec/5233ec1dfa7dae333595f9301004ec6e.jpg";
                    }}
                  />
                </div>

                <div className="absolute top-0 left-0 w-1.5 h-full bg-pink-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>

                <span className="text-xs font-bold uppercase tracking-wider text-pink-600 block mb-1">
                  {draft.niche}
                </span>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-pink-600 transition line-clamp-1 mb-1">
                  {draft.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4">{draft.time}</p>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">
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
