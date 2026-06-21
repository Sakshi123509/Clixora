import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import Thumbnail from "../models/thumbnail.js"; // Aapka Mongoose Model

export const CTAScore = async (req, res) => {
  // 1. Extracting exactly 'imageUrl' and 'variantId' from the incoming request body
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
    const imageResponse = await fetch(imageUrl); // Using strict camelCase variable
    if (!imageResponse.ok) throw new Error("Failed to fetch image from Cloudinary storage network.");

    // Auto-detect exact mime-type (image/png, image/jpeg, etc.) from network headers
    const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
    const imageBuffer = await imageResponse.arrayBuffer();

    // 3. Initialize Google AI Core
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

    // if (variantId) {
    //   // Stripping frontend variant index to find the main MongoDB Document ID
    //   const coreDatabaseId = variantId.split("_variant_")[0];

    //   await Thumbnail.findByIdAndUpdate(
    //     coreDatabaseId,
    //     {
    //       ctaScore: parsedData.overall,               // Saving score to DB
    //       feedbackLogs: parsedData.recommendations,  // Saving feedback tips to DB
    //       imageUrl: imageUrl                          // Matching your exact schema field name
    //     },
    //     { new: true }
    //   );
    // }

    // 5. 💾 SAVE TO MONGO DATABASE (Updating using correct schema fields)
    if (variantId) {
      // Clean up the conditional lookup to safely capture any ID variant structure
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