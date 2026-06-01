import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    { icon:"✦", title:"AI Generation",    desc:"4 stunning thumbnails created instantly from your inputs using DALL·E 3." },
    { icon:"📊", title:"CTA Score",        desc:"Know exactly how clickable your thumbnail is before posting." },
    { icon:"✏️", title:"Canvas Editor",    desc:"Fine-tune every element with drag & drop — just like Canva." },
    { icon:"📁", title:"Dashboard History",desc:"All your past thumbnails in one place with scores and downloads." },
  ];

  const sectionTitle = { fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"#a090ab", fontFamily:"'Syne',sans-serif" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatOrb { 0%,100%{transform:translate(0,0)} 50%{transform:translate(16px,-18px)} }
        .feat-card:hover { border-color:#ffc2d1 !important; transform:translateY(-3px); box-shadow:0 12px 32px rgba(123,44,191,.11) !important; }
      `}</style>

      <div style={{ display:"flex", width:"100%", flexDirection:"column", minHeight:"100vh", background:"#fcf8fa", fontFamily:"'Outfit',sans-serif", position:"relative", overflow:"hidden" }}>

        {/* bg orbs */}
        <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
          <div style={{ position:"absolute", width:500, height:500, top:-180, left:-150, borderRadius:"50%", background:"radial-gradient(circle,#ffc2d1 0%,transparent 70%)", opacity:.3, animation:"floatOrb 8s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:420, height:420, bottom:-150, right:-120, borderRadius:"50%", background:"radial-gradient(circle,#d8b4fe 0%,transparent 70%)", opacity:.25, animation:"floatOrb 10s ease-in-out 2s infinite reverse" }} />
        </div>

        <div style={{ position:"relative", zIndex:1 }}>
          <Navbar />

          {/* ── HERO ── */}
          <div style={{ maxWidth:780, margin:"0 auto", textAlign:"center", padding:"80px 24px 60px", animation:"fadeUp .7s ease both" }}>

            {/* badge */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:99, background:"rgba(255,255,255,.8)", border:"1px solid rgba(255,194,209,.5)", backdropFilter:"blur(8px)", marginBottom:28 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#EC4899", boxShadow:"0 0 8px rgba(236,72,153,.6)", display:"inline-block" }} />
              <span style={{ fontSize:12, fontWeight:600, color:"#7b2cbf", fontFamily:"'Outfit',sans-serif", letterSpacing:".3px" }}>Powered by Gemini AI</span>
            </div>

            {/* headline */}
            <h1 style={{
              fontFamily:"'Syne',sans-serif", fontWeight:800, lineHeight:1.1, letterSpacing:"-.03em",
              fontSize:"clamp(2rem,5vw,3.2rem)", color:"#24142b", marginBottom:20,
            }}>
              Create Thumbnails That{" "}
              <span style={{ background:"linear-gradient(135deg,#EC4899,#7b2cbf)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Actually Get Clicks
              </span>
            </h1>

            <p style={{ fontSize:"1.05rem", color:"#6b5e73", lineHeight:1.7, maxWidth:520, margin:"0 auto 36px" }}>
              Generate 4 AI-powered YouTube thumbnails in seconds, check your CTA score, and fine-tune in the canvas editor.
            </p>

            {/* CTA button */}
            <button
              onClick={() => navigate("/generate")}
              style={{
                padding:"15px 40px", border:"none", borderRadius:12,
                background:"linear-gradient(135deg,#ff91af,#7b2cbf)", color:"#fff",
                fontFamily:"'Outfit',sans-serif", fontSize:"1rem", fontWeight:700,
                cursor:"pointer", boxShadow:"0 6px 22px rgba(123,44,191,.35)",
                display:"inline-flex", alignItems:"center", gap:10,
                transition:"transform .2s, box-shadow .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 30px rgba(123,44,191,.42)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 6px 22px rgba(123,44,191,.35)"; }}
            >
              ✦ Start Generating
              <span style={{ fontSize:18 }}>→</span>
            </button>

            <p style={{ fontSize:12, color:"#a090ab", marginTop:14 }}>Free to use · No credit card required</p>
          </div>

          {/* ── FEATURES ── */}
          <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px 80px", animation:"fadeUp .7s ease .15s both" }}>
            <div style={{ textAlign:"center", marginBottom:32 }}>
              <p style={sectionTitle}>What you can do</p>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.6rem", fontWeight:800, color:"#24142b", marginTop:8, letterSpacing:"-.02em" }}>
                Everything a creator needs
              </h2>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:16 }}>
              {features.map((f, i) => (
                <div key={i} className="feat-card" style={{
                  background:"rgba(255,255,255,.85)", backdropFilter:"blur(12px)",
                  borderRadius:14, padding:"22px 20px",
                  border:"1px solid rgba(255,194,209,.35)",
                  boxShadow:"0 2px 12px rgba(123,44,191,.07)",
                  transition:"all .22s", cursor:"default",
                  animationDelay:`${i*.08}s`,
                }}>
                  <div style={{ width:42, height:42, borderRadius:11, background:"linear-gradient(135deg,#ffe5ec,#f3e8ff)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginBottom:14 }}>{f.icon}</div>
                  <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"0.95rem", fontWeight:700, color:"#24142b", marginBottom:6 }}>{f.title}</p>
                  <p style={{ fontSize:"0.82rem", color:"#6b5e73", lineHeight:1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── BOTTOM CTA ── */}
          <div style={{ textAlign:"center", padding:"40px 24px 80px", animation:"fadeUp .7s ease .3s both" }}>
            <div style={{ maxWidth:480, margin:"0 auto", padding:"36px 32px", background:"rgba(255,255,255,.85)", backdropFilter:"blur(12px)", borderRadius:20, border:"1px solid rgba(255,194,209,.4)", boxShadow:"0 8px 32px rgba(123,44,191,.1)" }}>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.3rem", fontWeight:800, color:"#24142b", marginBottom:10, letterSpacing:"-.02em" }}>Ready to grow your channel?</h2>
              <p style={{ fontSize:"0.88rem", color:"#6b5e73", marginBottom:22, lineHeight:1.6 }}>Generate your first thumbnail in under 30 seconds.</p>
              <button onClick={() => navigate("/generate")} style={{
                padding:"12px 32px", border:"none", borderRadius:10,
                background:"linear-gradient(135deg,#ff91af,#7b2cbf)", color:"#fff",
                fontFamily:"'Outfit',sans-serif", fontSize:"0.92rem", fontWeight:700,
                cursor:"pointer", boxShadow:"0 4px 16px rgba(123,44,191,.3)",
              }}>✦ Start Generating</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}