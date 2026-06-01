import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [thumbnails, setThumbnails] = useState([]);
  const [loading,    setLoading]    = useState(true);

  // fetch user's saved thumbnails
  useEffect(() => { fetchThumbnails(); }, []);

  const fetchThumbnails = async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/thumbnails", {
        headers:{ "Authorization":`Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setThumbnails(data.thumbnails || []);
    } catch {
      setThumbnails([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this thumbnail?")) return;
    try {
      await fetch(`/api/thumbnails/${id}`, {
        method:"DELETE",
        headers:{ "Authorization":`Bearer ${localStorage.getItem("token")}` },
      });
      setThumbnails(prev => prev.filter(t => t._id !== id));
    } catch { alert("Delete failed"); }
  };

  const handleDownload = (url) => {
    const a = document.createElement("a");
    a.href = url; a.download = `clixora-${Date.now()}.png`; a.click();
  };

  const scoreColor = (s) => s >= 80 ? "#22c55e" : s >= 60 ? "#f59e0b" : "#ef4444";

  const sectionTitle = { fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"#a090ab", fontFamily:"'Syne',sans-serif" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .skel { border-radius:12px; background:linear-gradient(90deg,#f0e8f4 25%,#fce8f0 50%,#f0e8f4 75%); background-size:1200px 100%; animation:shimmer 1.5s infinite linear; }
        .dash-card:hover { border-color:#ffc2d1 !important; box-shadow:0 8px 28px rgba(123,44,191,.12) !important; }
        .dash-card:hover .card-actions { opacity:1 !important; }
      `}</style>

      <div style={{ display:"flex", width:"100%", flexDirection:"column", height:"100vh", background:"#fcf8fa", fontFamily:"'Outfit',sans-serif" }}>
        <Navbar />

        <div style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>

          {/* Header row */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
            <div>
              <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.4rem", fontWeight:800, color:"#24142b", letterSpacing:"-.02em" }}>My Thumbnails</h1>
              <p style={{ fontSize:"0.87rem", color:"#a090ab", marginTop:4 }}>
                {loading ? "Loading..." : `${thumbnails.length} thumbnail${thumbnails.length !== 1 ? "s" : ""} created`}
              </p>
            </div>
            <button onClick={() => navigate("/generate")} style={{
              padding:"10px 22px", border:"none", borderRadius:8,
              background:"linear-gradient(135deg,#ff91af,#7b2cbf)", color:"#fff",
              fontFamily:"'Outfit',sans-serif", fontSize:"0.88rem", fontWeight:700,
              cursor:"pointer", boxShadow:"0 4px 14px rgba(123,44,191,.28)",
              display:"flex", alignItems:"center", gap:7,
            }}>✦ New Thumbnail</button>
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16 }}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i}>
                  <div className="skel" style={{ aspectRatio:"16/9", marginBottom:10 }} />
                  <div className="skel" style={{ height:14, width:"60%", marginBottom:6 }} />
                  <div className="skel" style={{ height:12, width:"40%" }} />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && thumbnails.length === 0 && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:340, gap:14, textAlign:"center", animation:"fadeUp .5s ease both" }}>
              <div style={{ width:64, height:64, borderRadius:16, background:"linear-gradient(135deg,#ffe5ec,#f3e8ff)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>📁</div>
              <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"1rem", fontWeight:700, color:"#6b5e73" }}>No thumbnails yet</p>
              <p style={{ fontSize:"0.85rem", color:"#a090ab", maxWidth:240, lineHeight:1.6 }}>Generate your first thumbnail and it will appear here</p>
              <button onClick={() => navigate("/generate")} style={{
                marginTop:4, padding:"10px 24px", border:"none", borderRadius:8,
                background:"linear-gradient(135deg,#ff91af,#7b2cbf)", color:"#fff",
                fontFamily:"'Outfit',sans-serif", fontWeight:600, cursor:"pointer",
              }}>✦ Start Generating</button>
            </div>
          )}

          {/* Thumbnails grid */}
          {!loading && thumbnails.length > 0 && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16, animation:"fadeUp .5s ease both" }}>
              {thumbnails.map((t, i) => (
                <div key={t._id || i} className="dash-card" style={{
                  background:"#fff", borderRadius:14,
                  border:"1px solid rgba(255,194,209,.35)",
                  boxShadow:"0 2px 10px rgba(123,44,191,.07)",
                  overflow:"hidden", transition:"all .22s",
                  position:"relative",
                }}>
                  {/* Image */}
                  <div style={{ position:"relative" }}>
                    <img src={t.imageUrl} alt={t.title || "Thumbnail"}
                      style={{ width:"100%", aspectRatio:"16/9", objectFit:"cover", display:"block" }} />

                    {/* Score badge */}
                    {t.ctaScore && (
                      <div style={{
                        position:"absolute", top:8, right:8,
                        background:"rgba(0,0,0,.65)", color:"#fff",
                        fontSize:11, fontWeight:700, padding:"3px 9px",
                        borderRadius:99, backdropFilter:"blur(6px)",
                        display:"flex", alignItems:"center", gap:4,
                      }}>
                        <span style={{ color: scoreColor(t.ctaScore) }}>●</span>
                        {t.ctaScore}
                      </div>
                    )}

                    {/* Hover action overlay */}
                    <div className="card-actions" style={{
                      position:"absolute", inset:0,
                      background:"rgba(36,20,43,.55)", backdropFilter:"blur(2px)",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                      opacity:0, transition:"opacity .2s",
                    }}>
                      <button onClick={() => navigate("/cta-score", { state:{ imageUrl: t.imageUrl } })} style={{
                        padding:"8px 14px", border:"none", borderRadius:7,
                        background:"linear-gradient(135deg,#ff91af,#7b2cbf)", color:"#fff",
                        fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif",
                      }}>📊 Score</button>
                      <button onClick={() => navigate("/canvas", { state:{ imageUrl: t.imageUrl } })} style={{
                        padding:"8px 14px", border:"none", borderRadius:7,
                        background:"rgba(255,255,255,.9)", color:"#7b2cbf",
                        fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif",
                      }}>✏️ Edit</button>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div style={{ padding:"12px 14px" }}>
                    <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"0.88rem", fontWeight:700, color:"#24142b", marginBottom:4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {t.title || "Untitled"}
                    </p>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <span style={{ fontSize:11, color:"#a090ab" }}>
                        {t.createdAt ? new Date(t.createdAt).toLocaleDateString("en-IN",{ day:"numeric", month:"short" }) : ""}
                      </span>
                      <div style={{ display:"flex", gap:6 }}>
                        <button onClick={() => handleDownload(t.imageUrl)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:15, padding:3, color:"#7b2cbf" }} title="Download">↓</button>
                        <button onClick={() => handleDelete(t._id)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, padding:3, color:"#c0392b" }} title="Delete">🗑</button>
                      </div>
                    </div>

                    {/* CTA score bar */}
                    {t.ctaScore && (
                      <div style={{ marginTop:8 }}>
                        <div style={{ height:4, background:"rgba(123,44,191,.1)", borderRadius:99, overflow:"hidden" }}>
                          <div style={{ height:"100%", width:`${t.ctaScore}%`, borderRadius:99, background:`linear-gradient(90deg,#EC4899,#7b2cbf)` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}