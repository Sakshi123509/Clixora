import React, { useState } from "react";
import logoImg from "../assets/logo1.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// 🌟 FIXED: Standard package entry point setup
import { motion, useScroll } from "motion/react";
import { AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const { scrollYProgress } = useScroll();

  // Animation Variants (Optimized cubic curves mapping)
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Har card ek ke baad ek smoothly aayega
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Premium springy deceleration curve
      },
    },
  };

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
      title: "Input Parameters",
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
      title: "Select Variants",
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
      title: "Score & Optimize",
      mainPoints: [
        "Predictive Gemini AI CTA scoring",
        "Actionable transformation feedback",
        "Dual-destination workflow routing",
      ],
      desc: "Receive an immediate data-backed conversion score alongside target improvement tips. From here, finalize your build instantly with the quick Download button, or navigate smoothly into the Studio Canvas.",
      features: [
        "Instant PNG Downloading",
        "Deep Studio Canvas Link",
        "AI Improvement Logs",
      ],
      bgImage: "/thumbnails/step3.jpg",
    },
  ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-pink-600 z-50"
        style={{ scaleX: scrollYProgress, originX: 0 }}
      />
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-hidden flex flex-col justify-between">
        <style>{`
        @keyframes border-draw {
          0% { border-color: rgba(226, 232, 240, 0.8); }
          50% { border-color: #db2777; }
          100% { border-color: #4f46e5; }
        }
        .animate-border-glow:hover {
          animation: border-draw 4s linear infinite;
        }
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght=700;800&family=Outfit:wght=400;500;600;700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
      `}</style>

        {/* Background Image Layer */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none -z-10 opacity-[0.08] sm:opacity-15"
          style={{ backgroundImage: `url(${logoImg})` }}
        />

        {/* Orbs Background - Scaled for smaller mobile frames */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute w-[320px] sm:w-[650px] h-[320px] sm:h-[650px] -top-[100px] sm:-top-[250px] -left-[80px] sm:-left-[150px] rounded-full bg-pink-500/10 blur-[30px] sm:blur-[40px]" />
          <div className="absolute w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] -bottom-[80px] sm:-bottom-[150px] -right-[50px] sm:-right-[100px] rounded-full bg-indigo-500/10 blur-[35px] sm:blur-[50px]" />
        </div>

        <div className="relative z-10 font-outfit flex-grow">
          <Navbar logoImg={logoImg} />

          {/* ── HERO SECTION ── */}
          <motion.header
            initial="initial"
            animate="animate"
            className="flex flex-col items-center text-center justify-center"
            className="max-w-5xl mx-auto py-12 md:py-24 px-4 sm:px-6 min-h-[75vh] flex flex-col justify-center items-center text-center relative z-10"
          >
            <div className="w-full">
              <span className="bg-gradient-to-r from-pink-500/10 to-indigo-500/10 text-slate-900 text-[11px] sm:text-xs font-mono font-bold tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded-full inline-flex items-center gap-2 mb-5 sm:mb-6 border border-pink-200/60 shadow-sm backdrop-blur-md uppercase max-w-[90vw] sm:max-w-none">
                <span className="flex h-2 w-2 relative flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                </span>
                <span className="truncate">
                  ✨ Powered by Cloudflare AI + Gemini
                </span>
              </span>
            </div>

            {/* 1. Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a smooth springy stop
                delay: 0.2,
              }}
              className="text-slate-900 font-black tracking-tight leading-[1.1] max-w-4xl px-2"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(1.85rem, 5.2vw, 4.25rem)",
              }}
            >
              Create High CTR Thumbnails <br className="hidden sm:inline" />
              <span className="text-pink-600">That Drive Organic Reach</span>
            </motion.h1>

            {/* 2. Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.45,
              }}
              className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium tracking-tight px-4"
            >
              Generate high-converting compositions instantly using Cloudflare
              AI, run data-backed CTR prediction models via Gemini, and tweak
              text layouts live inside our browser studio canvas.
            </motion.p>

            {/* 3. CTA Buttons Container (Added smooth fade-in entry for buttons too) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.6, // Subheadline ke baad buttons smoothly enter karenge
              }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4 sm:px-0"
            >
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/generate"
                className="w-full sm:w-auto text-center bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-pink-600/10 transition-all tracking-tight text-sm"
              >
                🚀 Launch Generator Matrix
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/dashboard"
                className="w-full sm:w-auto text-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition shadow-sm tracking-tight text-sm"
              >
                View Active Dashboard
              </motion.a>
            </motion.div>
          </motion.header>

          {/* ── CORE CAPABILITIES SECTION ── */}
          <section className="text-slate-800 py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden border-y border-slate-200/50">
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-6 sm:gap-8 items-start relative z-10">
              {/* Left side tabs */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="lg:col-span-5 w-full space-y-3 sm:space-y-4 order-2 lg:order-1"
              >
                <div className="mb-4 sm:mb-6 text-center lg:text-left">
                  <span className="text-[10px] sm:text-xs font-bold font-mono tracking-widest text-pink-600 uppercase">
                    Core Engine Capabilities
                  </span>
                  <h2
                    className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mt-1 text-slate-900"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Intelligent Architecture
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3 lg:gap-4">
                  {coreFeatures.map((item, index) => (
                    <motion.button
                      variants={fadeInUp}
                      key={index}
                      onClick={() => setActiveTab(index)}
                      whileHover={{ scale: 1.01, x: 4 }} // Hover karne par tab halka sa right move hoga
                      whileTap={{ scale: 0.99 }}
                      className={`w-full cursor-pointer text-left p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 flex flex-row lg:items-center gap-3 sm:gap-4 ${
                        activeTab === index
                          ? "bg-white border-pink-500 shadow-md shadow-pink-500/5"
                          : "bg-white/50 border-slate-200/60 hover:border-slate-300 hover:bg-white/90"
                      }`}
                    >
                      <span
                        className={`text-lg p-2 rounded-lg flex-shrink-0 flex items-center justify-center h-10 w-10 transition-colors duration-300 ${
                          activeTab === index
                            ? "bg-pink-50 text-pink-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs sm:text-sm tracking-wide text-slate-900 truncate">
                          {item.title}
                        </h4>
                        <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono block truncate">
                          {item.badge}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Right Side Content Box */}
              <div className="lg:col-span-7 w-full bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl relative min-h-[280px] sm:min-h-[340px] flex flex-col justify-between backdrop-blur-sm order-1 lg:order-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 15 }} // Halka sa lateral slide tab change hone par
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold bg-pink-50 text-pink-600 rounded border border-pink-100 inline-block mb-3">
                      {coreFeatures[activeTab].badge}
                    </span>
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-1.5"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {coreFeatures[activeTab].title}
                    </h3>
                    <p className="text-pink-600 text-xs sm:text-sm font-semibold tracking-wide mb-2.5">
                      "{coreFeatures[activeTab].tagline}"
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
                      {coreFeatures[activeTab].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-4 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
                      {coreFeatures[activeTab].stat}
                    </div>
                    <div className="text-[9px] uppercase font-bold tracking-wider text-slate-400 mt-0.5">
                      {coreFeatures[activeTab].statLabel}
                    </div>
                  </div>
                  <div className="flex-1 h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-pink-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          activeTab === 0
                            ? "93.4%"
                            : activeTab === 1
                              ? "75%"
                              : "100%",
                      }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Status bar filling motion upgrade
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── HOW CLIXORA WORKS SECTION ── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
            <div className="mb-10 sm:mb-14">
              <span className="text-[10px] sm:text-xs font-bold font-mono tracking-widest text-pink-600 uppercase">
                Pipeline Automation
              </span>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                HOW TO ACTIVATE <span className="text-pink-600">CLIXORA</span>
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-medium px-2">
                Our optimized three-step workflow streamlines resource-heavy
                graphic design into a unified, lightning-fast rendering
                operation.
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 sm:gap-8 items-stretch"
            >
              {howItWorksSteps.map((step, idx) => (
                <motion.div
                  variants={fadeInUp}
                  whileHover={{
                    y: -8,
                    scale: 1.01,
                    boxShadow:
                      "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
                  }}
                  key={idx}
                  className="backdrop-blur-md border-2 border-slate-100/80 rounded-2xl p-5 sm:p-8 text-left relative overflow-hidden group flex flex-col justify-between min-h-[460px] sm:min-h-[520px] bg-white shadow-sm transition-all duration-300"
                  style={{
                    backgroundImage: step.bgImage
                      ? `linear-gradient(to bottom, rgba(255, 255, 255, 0.90), rgba(255, 255, 255, 0.98)), url(${step.bgImage})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Tech Corners Component - Added clean hover accent colors */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-slate-200 group-hover:border-pink-500 transition-colors duration-300" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-slate-200 group-hover:border-pink-500 transition-colors duration-300" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-slate-200 group-hover:border-pink-500 transition-colors duration-300" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-slate-200 group-hover:border-pink-500 transition-colors duration-300" />

                  <div>
                    <div className="flex justify-between items-start mb-4 sm:mb-6">
                      <div>
                        <span className="text-[9px] font-bold tracking-widest text-indigo-600/80 block mb-1 uppercase font-mono">
                          {step.method}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-base border border-slate-200/60 group-hover:bg-pink-50 group-hover:border-pink-200 transition-all duration-300">
                          {step.icon}
                        </div>
                      </div>
                      <span className="text-4xl sm:text-6xl font-black text-slate-100/80 select-none font-mono group-hover:text-pink-100/50 transition-colors duration-300 tracking-tighter">
                        {step.stepNum}
                      </span>
                    </div>

                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-900 mb-4 group-hover:text-pink-600 transition-colors duration-200"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {step.title}
                    </h3>

                    <ul className="space-y-2.5 mb-5">
                      {step.mainPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <span className="w-4 h-4 rounded-full border border-pink-500/50 flex items-center justify-center text-[9px] font-bold text-pink-600 mt-0.5 flex-shrink-0 bg-pink-50/40">
                            {pIdx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight leading-snug">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-medium mb-5 border-t border-slate-100 pt-3.5">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {step.features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="text-[9px] font-mono px-2 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-200/40 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all duration-300"
                        >
                          • {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── DASHBOARD PROJECTS SECTION ── */}
          <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h2
                className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-900"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Your Recent Drafts
              </h2>
              <a
                href="/dashboard"
                className="text-pink-600 hover:text-pink-700 font-bold text-xs sm:text-sm transition-colors duration-200"
              >
                View all projects &rarr;
              </a>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
            >
              {recentDrafts.map((draft, idx) => (
                <motion.div
                  variants={fadeInUp}
                  whileHover={{
                    y: -6,
                    boxShadow:
                      "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 group cursor-pointer relative overflow-hidden flex flex-col justify-between transition-all duration-300"
                >
                  {/* Left edge dynamic reveal accent line */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-pink-500 origin-bottom transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out z-10" />

                  <div>
                    <div
                      className={`w-full aspect-video bg-gradient-to-br ${draft.bgGradient} rounded-xl mb-3.5 flex items-center justify-center text-3xl shadow-inner overflow-hidden relative`}
                    >
                      <img
                        src={draft.imgurl}
                        alt={draft.title}
                        className="w-full h-full object-cover transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                    </div>

                    <span className="text-[9px] font-bold uppercase tracking-wider text-pink-600 block mb-0.5 font-mono">
                      {draft.niche}
                    </span>

                    <h3 className="font-bold text-xs sm:text-sm md:text-base text-slate-900 group-hover:text-pink-600 transition-colors duration-200 line-clamp-1 mb-0.5">
                      {draft.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 mb-3.5">
                      {draft.time}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2.5 border-t border-slate-100 mt-auto">
                    <span className="text-[9px] text-slate-400 font-bold tracking-wide uppercase font-mono">
                      Predictive CTR
                    </span>
                    <span
                      className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded-md transition-colors duration-300 ${
                        draft.score >= 85
                          ? "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100"
                          : "bg-amber-50 text-amber-700 group-hover:bg-amber-100"
                      }`}
                    >
                      {draft.score}% Score
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
}
