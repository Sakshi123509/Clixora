import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import Thumbnail from "../models/thumbnail.js"; // Aapka Mongoose Model


if (!process.env.GEMINI_API_KEY) {
  console.error("🛑 CRITICAL SERVER CONFIG WARNING: GEMINI_API_KEY is missing inside your .env file!");
}

// 1. ENDPOINT: Calculate overall metrics layout
export const CTAScore = async (req, res) => {
  const { imageUrl, variantId } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ success: false, error: "imageUrl is required" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "GEMINI_API_KEY configuration is missing inside the .env file."
      });
    }

    // 2. Fetch the external Cloudinary image stream bytes
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error("Failed to fetch image from Cloudinary storage network.");

    // Auto-detect exact mime-type (image/png, image/jpeg, etc.) from network headers
    const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
    const imageBuffer = await imageResponse.arrayBuffer();

    // 3. Initialize Google AI Core securely
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 4. Request Structured JSON Output from Gemini
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: Buffer.from(imageBuffer).toString("base64"),
                mimeType: contentType,
              },
            },
            {
              text: `You are a professional YouTube growth strategist and click-through-rate specialist. 
              Critically analyze this thumbnail graphic layout. 
              
              Calculate an authoritative prediction score out of 100, then populate individual element evaluation arrays using values between 1 and 100.
              
              You must return your evaluation response exactly formatted inside this valid JSON template:
              {
                "overall": 0,
                "metrics": [
                  { "label": "Contrast", "score": 0 },
                  { "label": "Readability", "score": 0 },
                  { "label": "Color Harmony", "score": 0 },
                  { "label": "Title Clarity", "score": 0 },
                  { "label": "Click Appeal", "score": 0 }
                ],
                "recommendations": ["Feedback tip 1", "Feedback tip 2", "Feedback tip 3"]
              }`
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const rawResponse = result.response.text().trim();
    const parsedData = JSON.parse(rawResponse);

    // 5. 💾 SAVE TO MONGO DATABASE (Updating using correct schema fields)
    if (variantId) {
      const coreDatabaseId = variantId.includes("_variant_")
        ? variantId.split("_variant_")[0]
        : variantId;

      await Thumbnail.findByIdAndUpdate(
        coreDatabaseId,
        {
          ctaScore: parsedData.overall,
          feedbackLogs: parsedData.recommendations,
          imageUrl: imageUrl
        },
        { new: true }
      );
    }

    // 6. Return response safely back to React
    return res.status(200).json({
      success: true,
      overall: parsedData.overall,
      data: parsedData
    });

  } catch (error) {
    console.error("CTA Pipeline Exception Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// 2. ENDPOINT: Brutally honest feedback analysis pipeline
export const auditThumbnail = async (req, res) => {
  try {
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ success: false, message: "Image URL parsing parameter is missing." });
    }

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