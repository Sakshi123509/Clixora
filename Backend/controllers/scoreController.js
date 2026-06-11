// import dotenv from 'dotenv';
// dotenv.config();
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const CTAScore = async (req, res) => {
//   const { imageurl } = req.body;

//   if (!imageurl) {
//     return res.status(400).json({ success: false, error: "Image URL is required" });
//   }

//   try {
//     // Apni .env file se working API key pull ho rhi h
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//     // Sabse dynamic stable base model initialization
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.0-flash"  // ✅ available hai teri key pe
//     });
//     // Payload URL image fetch configuration
//     const imageResponse = await fetch(imageurl);
//     if (!imageResponse.ok) throw new Error("Failed to fetch image from provided URL");
//     const imageBuffer = await imageResponse.arrayBuffer();

//     const result = await model.generateContent({
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               inlineData: {
//                 data: Buffer.from(imageBuffer).toString("base64"),
//                 mimeType: "image/jpeg",
//               },
//             },
//             {
//               text: `Analyze this YouTube thumbnail and provide a Click-Through Appeal (CTA) score. Return a JSON structure following this scheme:
//               {
//                 "overall": 0,
//                 "metrics": [
//                   { "label": "Contrast", "score": 0 },
//                   { "label": "Readability", "score": 0 },
//                   { "label": "Color Harmony", "score": 0 },
//                   { "label": "Title Clarity", "score": 0 },
//                   { "label": "Click Appeal", "score": 0 }
//                 ],
//                 "recommendations": ["tip1", "tip2", "tip3"]
//               }`
//             }
//           ]
//         }
//       ],
//       generationConfig: {
//         responseMimeType: "application/json"
//       }
//     });

//     const rawResponse = result.response.text().trim();
//     const parsedData = JSON.parse(rawResponse);

//     return res.status(200).json({ success: true, data: parsedData });

//   } catch (error) {
//     console.error("CTA Score Error:", error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// };


import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

export const CTAScore = async (req, res) => {
  const { imageurl } = req.body;

  if (!imageurl) {
    return res.status(400).json({ success: false, error: "Image URL is required" });
  }

  try {
    // Check if API Key is loading correctly from .env
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        error: "GEMINI_API_KEY is completely missing from your .env file." 
      });
    }

    // Initialize with the standard API key string structure
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Using gemini-2.0-flash as required by your endpoint call
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Fetch image from payload URL
    const imageResponse = await fetch(imageurl);
    if (!imageResponse.ok) throw new Error("Failed to fetch image from provided URL");
    const imageBuffer = await imageResponse.arrayBuffer();

    // Generate response using structured JSON output
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: Buffer.from(imageBuffer).toString("base64"),
                mimeType: "image/jpeg",
              },
            },
            {
              text: `Analyze this YouTube thumbnail and provide a Click-Through Appeal (CTA) score. Return a JSON structure following this scheme:
              {
                "overall": 0,
                "metrics": [
                  { "label": "Contrast", "score": 0 },
                  { "label": "Readability", "score": 0 },
                  { "label": "Color Harmony", "score": 0 },
                  { "label": "Title Clarity", "score": 0 },
                  { "label": "Click Appeal", "score": 0 }
                ],
                "recommendations": ["tip1", "tip2", "tip3"]
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

    return res.status(200).json({ success: true, data: parsedData });
    
  } catch (error) {
    console.error("CTA Score Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};