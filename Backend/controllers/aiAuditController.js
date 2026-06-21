import { GoogleGenerativeAI } from "@google/generative-ai";

export const auditThumbnail = async (req, res) => {
  try {
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ success: false, message: "Image URL parsing parameter is missing." });
    }8

    const imageResponse = await fetch(imageUrl, {
      headers: { 'Accept': 'image/*' },
      signal: AbortSignal.timeout(15000)
    });

    if (!imageResponse.ok) {
      throw new Error(`Failed to download resource node. Status received: ${imageResponse.status}`);
    }

    const arrayBuffer = await imageResponse.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 🌟 FIX: Structure contents precisely for multimodal calls
    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Data
              }
            },
            {
              text: "You are an elite YouTube Thumbnail Designer and Growth Expert. Analyze this thumbnail image. Give exactly 3 brutally honest, highly actionable improvement points for text contrast, layout framing, and visual hierarchy to boost CTR. Keep each point under 2-3 short sentences. Be direct. Do not add conversational intro/outro text lines."
            }
          ]
        }
      ]
    });

    const feedbackText = response.response.text() || "No diagnostics data could be compiled by the model.";

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