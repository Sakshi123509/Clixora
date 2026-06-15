import { GoogleGenAI } from "@google/generative-ai";

// 1. Correct SDK Initialization mapping pattern
// Note: Official SDK configurations use object constructor setups directly
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const auditThumbnail = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: "Image URL parsing parameter is missing." });
    }

    console.log("Initializing target remote buffer fetch for URL:", imageUrl);

    // 2. Network Fetch Optimization wrapper rules (Adds strict accept headers to bypass cloudfire protections)
    const imageResponse = await fetch(imageUrl, {
      headers: { 'Accept': 'image/*' },
      signal: AbortSignal.timeout(15000) // 15 seconds internal safety boundary timeout abort loop
    });

    if (!imageResponse.ok) {
      throw new Error(`Failed to download resource node. Status received: ${imageResponse.status}`);
    }

    const arrayBuffer = await imageResponse.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");

    console.log("Image successfully compiled to Base64 payload block. Dispatching to Gemini Vision engine...");

    // 3. Correct API Method call mapping sequence
    // SDK uses explicit object mapping arrays definitions for inline contents streams
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", 
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Data
          }
        },
        "You are an elite YouTube Thumbnail Designer and Growth Expert. Analyze this thumbnail image. Give exactly 3 brutally honest, highly actionable improvement points for text contrast, layout framing, and visual hierarchy to boost CTR. Keep each point under 2-3 short sentences. Be direct. Do not add conversational intro/outro text lines."
      ],
    });

    // Extract text safely from standard candidate sequence matrices
    const feedbackText = response.text || "No diagnostics data could be compiled by the model.";

    console.log("Gemini response stream compiled successfully!");

    return res.json({ 
      success: true, 
      feedback: feedbackText 
    });

  } catch (error) {
    console.error("CRITICAL: Gemini Vision Core Pipeline Interrupted:", error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to audit image asset through remote Vision AI nodes." 
    });
  }
};