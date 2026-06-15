import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdTextFields,
  MdColorLens,
  MdFormatSize,
  MdDownload,
  MdLayers,
  MdTune,
  MdFontDownload,
  MdLayersClear,
} from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi";

// Google Fonts ko dynamically inject kar rahe hain designer workflows ke liye
const AVAILABLE_FONTS = [
  // CATEGORY 1: HEAVY HEADLINES (High CTR / Attention Grabbers)
  { name: "Impact Standard", value: "Impact, Charcoal, sans-serif" },
  { name: "Anton (Bold Pop)", value: "'Anton', sans-serif" },
  { name: "Bebas Neue (Viral Style)", value: "'Bebas Neue', sans-serif" },
  { name: "Archivo Black (Ultra Thick)", value: "'Archivo Black', sans-serif" },
  { name: "Oswald (Strong Vertical)", value: "'Oswald', sans-serif" },

  // CATEGORY 2: MODERN TECH & STARTUP (Premium SaaS / Coding / Business)
  { name: "Syne (Futuristic Tech)", value: "'Syne', sans-serif" },
  {
    name: "Space Grotesk (Startup Vibe)",
    value: "'Space Grotesk', sans-serif",
  },
  { name: "Montserrat (Premium Bold)", value: "'Montserrat', sans-serif" },
  { name: "Poppins (Clean Modern)", value: "'Poppins', sans-serif" },

  // CATEGORY 3: GAMING & ENTERTAINMENT (Condensed/Aggressive)
  { name: "Teko (Gaming Intense)", value: "'Teko', sans-serif" },
];

export default function Canvas() {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const { imageUrl, dbRecordId, title: initialTitle } = location.state || {};

  // CORE ADVANCED STATES
  const [textLayers, setTextLayers] = useState([]);
  const [inputText, setInputText] = useState("");
  const [textColor, setTextColor] = useState("#ffffff");
  const [textSize, setTextSize] = useState(60);
  const [selectedFont, setSelectedFont] = useState(
    "Impact, Charcoal, sans-serif",
  );

  // High Contrast Text Background Elements
  const [useBgBox, setUseBgBox] = useState(false);
  const [bgBoxColor, setBgBoxColor] = useState("#ff0055");

  // Image Filter States
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const [selectedLayerId, setSelectedLayerId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const canvasWidth = 1280;
  const canvasHeight = 720;

  // Font stylesheets injection directly to document head dynamically
  useEffect(() => {
    const link = document.createElement("link");
    // Is single query mein humne saare premium bold weights fetch kar liye hain
    link.href =
      "https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Bebas+Neue&family=Montserrat:wght@800;900&family=Oswald:wght@700&family=Poppins:wght@800;900&family=Space+Grotesk:wght@700&family=Syne:wght@800&family=Teko:wght@700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    if (!imageUrl) return;
    if (initialTitle && textLayers.length === 0) {
      setTextLayers([
        {
          id: Date.now(),
          text: initialTitle,
          x: 120,
          y: 250,
          size: 70,
          color: "#ffff00",
          font: "Impact, Charcoal, sans-serif",
          useBgBox: true,
          bgBoxColor: "#000000",
        },
      ]);
    }
  }, [imageUrl, initialTitle]);

  // LIVE GRAPHICS GENERATOR LOOP WITH IMAGE FILTERS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const baseImage = new Image();
    baseImage.crossOrigin = "anonymous";
    baseImage.src = imageUrl;

    baseImage.onload = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Apply CSS Filters live onto the canvas context layers matrix
      ctx.filter = `brightness(${brightness}%) saturate(${saturation}%)`;
      ctx.drawImage(baseImage, 0, 0, canvasWidth, canvasHeight);
      ctx.filter = "none"; // Reset filter so text layer remains crisp un-blurred

      // Draw text layers array element sequences
      textLayers.forEach((layer) => {
        ctx.font = `italic bold ${layer.size}px ${layer.font || selectedFont}`;
        ctx.textBaseline = "top";
        const textWidth = ctx.measureText(layer.text).width;
        const paddingX = 20;
        const paddingY = 10;

        // If block box container pattern background is verified true
        if (layer.useBgBox) {
          ctx.fillStyle = layer.bgBoxColor || "#000000";
          ctx.fillRect(
            layer.x - paddingX,
            layer.y - paddingY,
            textWidth + paddingX * 2,
            layer.size + paddingY * 2,
          );
        }

        // Base typography print tracking parameters
        ctx.fillStyle = layer.color;
        ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;

        ctx.fillText(layer.text, layer.x, layer.y);

        // Active highlighted layer frame boundary indicators code block
        if (layer.id === selectedLayerId) {
          ctx.strokeStyle = "#ec4899";
          ctx.lineWidth = 4;
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.strokeRect(
            layer.x - paddingX - 4,
            layer.y - paddingY - 4,
            textWidth + paddingX * 2 + 8,
            layer.size + paddingY * 2 + 8,
          );
        }
      });
    };
  }, [textLayers, selectedLayerId, imageUrl, brightness, saturation]);

  // SYSTEM DRAG CAPTURE HANDLERS
  const handleCanvasMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * canvasWidth;
    const mouseY = ((e.clientY - rect.top) / rect.height) * canvasHeight;
    const ctx = canvas.getContext("2d");
    let targetLayerFound = false;

    for (let i = textLayers.length - 1; i >= 0; i--) {
      const layer = textLayers[i];
      ctx.font = `bold ${layer.size}px ${layer.font}`;
      const textWidth = ctx.measureText(layer.text).width;

      if (
        mouseX >= layer.x - 20 &&
        mouseX <= layer.x + textWidth + 20 &&
        mouseY >= layer.y - 10 &&
        mouseY <= layer.y + layer.size + 10
      ) {
        setSelectedLayerId(layer.id);
        setInputText(layer.text);
        setTextColor(layer.color);
        setTextSize(layer.size);
        setSelectedFont(layer.font || AVAILABLE_FONTS[0].value);
        setUseBgBox(layer.useBgBox || false);
        setBgBoxColor(layer.bgBoxColor || "#000000");
        setIsDragging(true);
        targetLayerFound = true;
        break;
      }
    }
    if (!targetLayerFound) setSelectedLayerId(null);
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDragging || selectedLayerId === null) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * canvasWidth;
    const mouseY = ((e.clientY - rect.top) / rect.height) * canvasHeight;

    setTextLayers((prev) =>
      prev.map((l) =>
        l.id === selectedLayerId ? { ...l, x: mouseX, y: mouseY } : l,
      ),
    );
  };

  const handleCanvasMouseUp = () => setIsDragging(false);

  const handleAddNewTextLayer = () => {
    const freshLayer = {
      id: Date.now(),
      text: inputText.trim() || "EDIT OVERLAY",
      x: 200,
      y: 200,
      size: Number(textSize),
      color: textColor,
      font: selectedFont,
      useBgBox: useBgBox,
      bgBoxColor: bgBoxColor,
    };
    setTextLayers([...textLayers, freshLayer]);
    setSelectedLayerId(freshLayer.id);
    setInputText("");
  };

  const updateSelectedLayerProperties = (field, val) => {
    if (selectedLayerId === null) return;
    setTextLayers((prev) =>
      prev.map((l) => (l.id === selectedLayerId ? { ...l, [field]: val } : l)),
    );
  };

  const handleExportFinalThumbnail = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/jpeg", 0.98);
    const downloadAnchorElement = document.createElement("a");
    downloadAnchorElement.href = dataUrl;
    downloadAnchorElement.download = `clixora-ultra-ctr-${dbRecordId || "canvas"}.jpg`;
    document.body.appendChild(downloadAnchorElement);
    downloadAnchorElement.click();
    document.body.removeChild(downloadAnchorElement);
  };

  return (
    <div className="h-screen w-full bg-slate-100 text-slate-800 flex justify-between overflow-hidden font-sans antialiased">
      {/* LEFT COMPOSER SIDEBAR ENGINE */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col justify-between p-4 shrink-0 h-full overflow-y-auto z-20 shadow-sm">
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <button
              onClick={() => navigate("/generate")}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition"
            >
              <MdArrowBack size={16} />
            </button>
            <div>
              <h1 className="text-xs font-black text-slate-900 uppercase tracking-wider font-syne flex items-center gap-1">
                <HiOutlineSparkles className="text-pink-500" /> Clixora Engine
                V2
              </h1>
              <p className="text-[10px] text-slate-400">
                Advanced Thumbnail Layer Editor.
              </p>
            </div>
          </div>

          {/* BACKGROUND FILTERS CONTROLLER */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 space-y-3">
            <h4 className="text-[10px] font-black text-slate-500 tracking-wider uppercase flex items-center gap-1">
              <MdTune size={12} /> Backdrop Image Tuning
            </h4>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-600">
                <span>Brightness</span>
                <span>{brightness}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="180"
                value={brightness}
                onChange={(e) => setBrightness(e.target.value)}
                className="w-full accent-slate-900 h-1 bg-slate-200 rounded-lg appearance-none"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-600">
                <span>Saturation (Color Pop)</span>
                <span>{saturation}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                value={saturation}
                onChange={(e) => setSaturation(e.target.value)}
                className="w-full accent-pink-600 h-1 bg-slate-200 rounded-lg appearance-none"
              />
            </div>
          </div>

          {/* INPUT FORM MATRIX AREA */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide flex items-center gap-1">
                <MdTextFields size={12} /> Custom Overlay Content
              </label>
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  updateSelectedLayerProperties("text", e.target.value);
                }}
                placeholder={
                  selectedLayerId
                    ? "Edit highlighted element..."
                    : "Type phrase layer here..."
                }
                rows={2}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-slate-900 resize-none"
              />
            </div>

            {/* FONT FAMILY DROPDOWN PICKER */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide flex items-center gap-1">
                <MdFontDownload size={12} /> Typography Font Style
              </label>
              <select
                value={selectedFont}
                onChange={(e) => {
                  setSelectedFont(e.target.value);
                  updateSelectedLayerProperties("font", e.target.value);
                }}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-slate-900"
              >
                {AVAILABLE_FONTS.map((f, idx) => (
                  <option key={idx} value={f.value}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* FONT PROPERTIES CLUSTER */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                  Font Size
                </label>
                <input
                  type="number"
                  value={textSize}
                  onChange={(e) => {
                    setTextSize(e.target.value);
                    updateSelectedLayerProperties(
                      "size",
                      Number(e.target.value),
                    );
                  }}
                  className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-center"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                  Text Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => {
                      setTextColor(e.target.value);
                      updateSelectedLayerProperties("color", e.target.value);
                    }}
                    className="w-8 h-8 rounded border-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={textColor}
                    readOnly
                    className="w-full text-center bg-slate-50 text-[10px] rounded border border-slate-200 font-mono uppercase"
                  />
                </div>
              </div>
            </div>

            {/* HIGH CONTRAST BLOCK SHAPE OPTIONS */}
            <div className="bg-slate-50/80 p-3 border border-slate-200 rounded-xl space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-[11px] font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={useBgBox}
                  onChange={(e) => {
                    setUseBgBox(e.target.checked);
                    updateSelectedLayerProperties("useBgBox", e.target.checked);
                  }}
                  className="accent-pink-600 rounded"
                />
                <span>Enable Solid Text Background Box</span>
              </label>

              {useBgBox && (
                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="text-[10px] text-slate-400 font-bold">
                    Box Color:
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgBoxColor}
                      onChange={(e) => {
                        setBgBoxColor(e.target.value);
                        updateSelectedLayerProperties(
                          "bgBoxColor",
                          e.target.value,
                        );
                      }}
                      className="w-7 h-7 border-0 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={bgBoxColor}
                      readOnly
                      className="w-16 text-center text-[9px] font-mono border rounded bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ACTION INTERACTIVE LAYERS TRIGGERS */}
            <div className="pt-2">
              {selectedLayerId === null ? (
                <button
                  onClick={handleAddNewTextLayer}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition"
                >
                  + Append Text Block Layer
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedLayerId(null)}
                    className="w-1/2 py-1.5 border border-slate-200 text-slate-600 font-bold rounded-md text-[11px]"
                  >
                    Deselect
                  </button>
                  <button
                    onClick={() => {
                      setTextLayers(
                        textLayers.filter((l) => l.id !== selectedLayerId),
                      );
                      setSelectedLayerId(null);
                      setInputText("");
                    }}
                    className="w-1/2 py-1.5 bg-rose-50 text-rose-600 font-bold rounded-md text-[11px] border border-rose-200/50"
                  >
                    Delete Layer
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ACTIVE MANAGEMENT PILE STACK MAP */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MdLayers size={11} /> Layer Management Stack
            </h4>
            <div className="max-h-[110px] overflow-y-auto space-y-1 pr-1">
              {textLayers.map((l) => (
                <div
                  key={l.id}
                  onClick={() => {
                    setSelectedLayerId(l.id);
                    setInputText(l.text);
                    setTextColor(l.color);
                    setTextSize(l.size);
                    setSelectedFont(l.font || AVAILABLE_FONTS[0].value);
                    setUseBgBox(l.useBgBox || false);
                    setBgBoxColor(l.bgBoxColor || "#000000");
                  }}
                  className={`p-2 border rounded-md text-[10px] font-bold cursor-pointer transition truncate ${
                    l.id === selectedLayerId
                      ? "bg-pink-50 border-pink-300 text-pink-700"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  📝 {l.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DOWNLOADING COMPOSITE TERMINAL HANDLER */}
        <div className="pt-2">
          <button
            onClick={handleExportFinalThumbnail}
            className="w-full flex items-center justify-center gap-1 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black rounded-xl text-xs shadow-md transition transform hover:scale-[1.01]"
          >
            <MdDownload size={14} />
            <span>Download High-CTR Asset</span>
          </button>
        </div>
      </aside>

      {/* MONITOR CANVAS WORKSPACE ELEMENT */}
      <main className="flex-1 h-full flex flex-col items-center justify-center p-6 bg-slate-900/5">
        <div className="w-full max-w-4xl bg-white p-3 rounded-2xl border border-slate-200 shadow-md">
          <div className="flex items-center justify-between mb-2 px-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span>
              🔴 HD Viewport Guidelines Monitor [1280x720 16:9 Standard]
            </span>
            {selectedLayerId && (
              <span className="text-pink-500 animate-pulse">
                ⚡ Mode: Drag & Custom Editing Activated
              </span>
            )}
          </div>

          <div className="w-full aspect-video rounded-xl bg-slate-950 overflow-hidden relative cursor-crosshair border border-slate-900/10 shadow-inner">
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
