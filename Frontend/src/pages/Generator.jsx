
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Generator() {
  const navigate = useNavigate();
  const [title,    setTitle]    = useState("");
  const [color,    setColor]    = useState("#7b2cbf");
  const [style,    setStyle]    = useState("dark");
  const [niche,    setNiche]    = useState("tech");
  const [images,   setImages]   = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading,  setLoading]  = useState(false);
  const Navigate = useNavigate();

  const handleGenerate = async () => {
    if (!title.trim()) { alert("Please enter a title"); return; }
    setLoading(true); setImages([]); setSelected(null);
    try {
      const res  = await fetch("/api/generate", {
        method:"POST",
        headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ title, color, style, niche }),
      });
      const data = await res.json();
      setImages(data.images);
    } catch { alert("Generation failed. Try again."); }
    setLoading(false);
  };

  const handleDownload = () => {
    if (selected === null) { alert("Select a thumbnail first"); return; }
    const a = document.createElement("a");
    a.href = images[selected];
    a.download = `clixora-${Date.now()}.png`;
    a.click();
  };

  const handleCTAScore = () => {
    if (selected === null) { alert("Select a thumbnail first"); return; }
    navigate("/cta-score", { state: { imageUrl: images[selected] } });
  };

  /* ── shared token styles ── */
  const inputStyle = {
    width:"100%", padding:"11px 14px", borderRadius:8,
    border:"1.5px solid rgba(255,194,209,.55)", background:"#fcf8fa",
    fontFamily:"'Outfit',sans-serif", fontSize:"0.9rem", color:"#24142b",
    outline:"none", boxSizing:"border-box",
  };
  const labelStyle = { fontSize:13, fontWeight:600, color:"#24142b", fontFamily:"'Outfit',sans-serif" };
  const sectionTitle = {
    fontSize:10, fontWeight:700, textTransform:"uppercase",
    letterSpacing:"0.1em", color:"#a090ab", marginBottom:0,
    fontFamily:"'Syne',sans-serif",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        select { appearance:none; -webkit-appearance:none; }
        @keyframes shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        .skel {
          border-radius:12px; aspect-ratio:16/9;
          background:linear-gradient(90deg,#f0e8f4 25%,#fce8f0 50%,#f0e8f4 75%);
          background-size:1200px 100%; animation:shimmer 1.5s infinite linear;
        }
        .spinner {
          width:16px; height:16px; border-radius:50%; flex-shrink:0;
          border:2px solid rgba(255,255,255,.3); border-top-color:#fff;
          animation:spin .7s linear infinite;
        }
        input[type=color] { padding:3px; cursor:pointer; }
        .gen-inp:focus { border-color:#7b2cbf !important; background:#fff !important; box-shadow:0 0 0 3px rgba(123,44,191,.09) !important; }
        .gen-sel:focus  { border-color:#7b2cbf !important; background:#fff !important; }
        .thumb-card { transition:all .22s; }
        .thumb-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(123,44,191,.14) !important; border-color:#ffc2d1 !important; }
      `}</style>

      {/* ── ROOT: full viewport column ── */}
      <div style={{ display:"flex", flexDirection:"column",width:"100%", marginTop:"0px", height:"100vh", background:"#fcf8fa", fontFamily:"'Outfit',sans-serif" }}>

        {/* NAVBAR */}
        <Navbar />

        {/* BODY: left + right, fills remaining height */}
        <div style={{ display:"flex", flex:1, overflow:"hidden"}}>

          {/* ── LEFT PANEL ── */}
          <div style={{
            width:"33%", minWidth:260, maxWidth:340,
            background:"#fff", borderRight:"1px solid rgba(255,194,209,.4)",
            padding:"24px 20px", overflowY:"auto",
            display:"flex", flexDirection:"column", gap:20,
          }}>

            {/* Thumbnail Info */}
            <div>
              <p style={sectionTitle}>Thumbnail Info</p>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <label style={labelStyle}>Title / Headline</label>
                <input
                  className="gen-inp"
                  style={inputStyle}
                  type="text"
                  placeholder="e.g. 10 AI Tools That Changed My Life"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  maxLength={80}
                />
                <span style={{ fontSize:11, color:"#a090ab", textAlign:"right" }}>{title.length}/80</span>
              </div>
            </div>

            {/* Style */}
            <div>
              <p style={sectionTitle}>Style</p>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <label style={labelStyle}>Content Niche</label>
                  <div style={{ position:"relative" }}>
                    <select className="gen-sel" style={{ ...inputStyle, paddingRight:36, cursor:"pointer" }}
                      value={niche} onChange={e => setNiche(e.target.value)}>
                      {["tech","gaming","vlog","cooking","finance","fitness","education","entertainment"]
                        .map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase()+v.slice(1)}</option>)}
                    </select>
                    <span style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#6b5e73", fontSize:12 }}>▾</span>
                  </div>
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <label style={labelStyle}>Visual Style</label>
                  <div style={{ position:"relative" }}>
                    <select className="gen-sel" style={{ ...inputStyle, paddingRight:36, cursor:"pointer" }}
                      value={style} onChange={e => setStyle(e.target.value)}>
                      {[["dark","Dark & Bold"],["bright","Bright & Vibrant"],["minimal","Minimal & Clean"],["gradient","Gradient Pop"],["cinematic","Cinematic"]]
                        .map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                    <span style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#6b5e73", fontSize:12 }}>▾</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Color */}
            <div>
              <p style={sectionTitle}>Color</p>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <label style={labelStyle}>Primary Color</label>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <input
                    type="color"
                    value={color}
                    onChange={e => setColor(e.target.value)}
                    style={{ width:44, height:44, borderRadius:8, border:"1.5px solid rgba(255,194,209,.55)", background:"#fff", padding:3, cursor:"pointer", flexShrink:0 }}
                  />
                  <span style={{ fontSize:13, color:"#6b5e73", fontFamily:"'Outfit',monospace" }}>{color.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Generate btn — pushed to bottom */}
            <div style={{ marginTop:"auto" }}>
              <button
                onClick={handleGenerate}
                disabled={loading}
                style={{
                  width:"100%", padding:13, border:"none", borderRadius:8,
                  background:"linear-gradient(135deg,#ff91af,#7b2cbf)", color:"#fff",
                  fontFamily:"'Outfit',sans-serif", fontSize:"0.95rem", fontWeight:700,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.65 : 1,
                  boxShadow:"0 4px 16px rgba(123,44,191,.3)",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                  transition:"transform .2s, box-shadow .2s",
                }}
                onMouseEnter={e => { if(!loading) e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="none"; }}
              >
                {loading ? <><div className="spinner" />Generating...</> : <>✦ Generate Thumbnails</>}
              </button>
            </div>

          </div>

          {/* ── RIGHT PANEL ── */}
          <div style={{ flex:1, padding:24, overflowY:"auto", display:"flex", flexDirection:"column", gap:20 }}>

            {/* Empty state */}
            {!loading && images.length === 0 && (
              <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12, textAlign:"center" }}>
                <div style={{ width:64, height:64, borderRadius:16, background:"linear-gradient(135deg,#ffe5ec,#f3e8ff)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>✦</div>
                <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"1rem", fontWeight:700, color:"#6b5e73" }}>Your thumbnails will appear here</p>
                <p style={{ fontSize:"0.85rem", color:"#a090ab", maxWidth:260, lineHeight:1.6 }}>Fill in the details on the left and click Generate to create 4 AI-powered thumbnails</p>
              </div>
            )}

            {/* Loading skeletons */}
            {loading && (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
                {[1,2,3,4].map(i => <div key={i} className="skel" />)}
              </div>
            )}

            {/* Images */}
            {!loading && images.length > 0 && (
              <>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
                  {images.map((url, i) => (
                    <div key={i} className="thumb-card" onClick={() => setSelected(i)} style={{
                      position:"relative", borderRadius:12, overflow:"hidden", cursor:"pointer",
                      border: selected===i ? "2.5px solid #7b2cbf" : "2.5px solid transparent",
                      boxShadow: selected===i ? "0 0 0 4px rgba(123,44,191,.15), 0 8px 24px rgba(123,44,191,.14)" : "0 2px 12px rgba(123,44,191,.08)",
                      background:"#fff",
                    }}>
                      <img src={url} alt={`Thumbnail ${i+1}`} style={{ width:"100%", aspectRatio:"16/9", objectFit:"cover", display:"block" }} />
                      <span style={{ position:"absolute", top:8, right:8, background:"rgba(123,44,191,.85)", color:"#fff", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:99 }}>#{i+1}</span>
                      {selected===i && <span style={{ position:"absolute", top:8, left:8, background:"linear-gradient(135deg,#EC4899,#7b2cbf)", color:"#fff", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:99 }}>✓ Selected</span>}
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div style={{ display:"flex", gap:12 }}>
                  <button onClick={handleDownload} disabled={selected===null} style={{
                    flex:1, padding:12, borderRadius:8, cursor: selected===null ? "not-allowed" : "pointer",
                    background:"#f3e8ff", color:"#7b2cbf", border:"1.5px solid rgba(123,44,191,.25)",
                    fontFamily:"'Outfit',sans-serif", fontSize:"0.9rem", fontWeight:600,
                    opacity: selected===null ? 0.45 : 1,
                    display:"flex", alignItems:"center", justifyContent:"center", gap:7,
                  }}
                  onMouseEnter={e => { if(selected!==null) e.currentTarget.style.background="#e9d5ff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="#f3e8ff"; }}
                  >↓ Download</button>

                  <button onClick={handleCTAScore} disabled={selected===null} style={{
                    flex:1, padding:12, borderRadius:8, cursor: selected===null ? "not-allowed" : "pointer",
                    background:"linear-gradient(135deg,#ff91af,#7b2cbf)", color:"#fff", border:"none",
                    fontFamily:"'Outfit',sans-serif", fontSize:"0.9rem", fontWeight:600,
                    opacity: selected===null ? 0.45 : 1,
                    boxShadow:"0 4px 14px rgba(123,44,191,.28)",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:7,
                  }}
                  onMouseEnter={e => { if(selected!==null) e.currentTarget.style.filter="brightness(1.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.filter="none"; }}
                  >✦ Check CTA Score</button>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}