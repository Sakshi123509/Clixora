import React, { useEffect, useRef } from "react";
import * as fabric from "fabric"; // Fabric v6 ke liye

export default function ThumbnailEditor({ aiImageUrl }) {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    // 1. Fabric Canvas ka instance create karo
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 450, // Perfect YouTube Layout Ratio
      backgroundColor: "#0f172a", // Dark background slate
    });

    // 2. Agar backend se AI Image ka URL aaya h, to use background me inject karo
    if (aiImageUrl) {
      fabric.Image.fromURL(aiImageUrl, (img) => {
        img.set({
          selectable: false, // User is image ko hila na sake (background lock)
          hasControls: false,
        });
        img.scaleToWidth(800); // Canvas ke width ke barabar scale karo
        fabricCanvasRef.current.add(img);
        fabricCanvasRef.current.sendToBack(img); // Hamesha text ke piche rahegi
      });
    }

    // Cleanup block jab component close ho
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
      }
    };
  }, [aiImageUrl]);

  // 3. Text Add karne ka demo function
  const handleAddText = () => {
    const boldText = new fabric.Textbox("CLICK TO EDIT", {
      left: 200,
      top: 150,
      fontSize: 48,
      fill: "#f43f5e", // Pink color matching Clixora theme
      fontFamily: "sans-serif",
      fontWeight: "bold",
    });
    fabricCanvasRef.current.add(boldText);
    fabricCanvasRef.current.setActiveObject(boldText); // Auto select new text
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen flex flex-col items-center justify-center gap-6">
      {/* Control Panel (Shadcn Buttons se replace kar sakte ho) */}
      <div className="flex gap-4">
        <button onClick={handleAddText} className="bg-pink-600 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-pink-700 transition">
          ➕ Add Heading Text
        </button>
      </div>

      {/* HTML Canvas Board container */}
      <div className="border border-slate-200 shadow-2xl rounded-2xl overflow-hidden bg-white">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}