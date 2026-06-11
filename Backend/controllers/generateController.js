//GEMINI API

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { v2 as cloudinary } from "cloudinary";


// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const generateThumbnail = async (req, res) => {
//   const { style, niche, color, title } = req.body;
//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//   try {
//     const prompt = `
//       Create a premium YouTube thumbnail.
//       Niche: ${niche}
//       Style: ${style}
//       Color: ${color}
//       Title: ${title}
//       Aspect Ratio: 16:9
//     `;

//     // Gemini image generation model (if enabled on your account)
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.0-flash-preview-image-generation",
//     });

//     const result = await model.generateContent(prompt);
//     console.log("Gemini Key:", process.env.GEMINI_API_KEY);

//     // Extract image data according to SDK response format
//     const imagePart = result.response.candidates?.[0]?.content?.parts?.find(
//       part => part.inlineData
//     );

//     if (!imagePart) {
//       throw new Error("No image generated");
//     }

//     const buffer = Buffer.from(
//       imagePart.inlineData.data,
//       "base64"
//     );
//     const uploadResult = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream(
//           {
//             folder: "clixora/thumbnails",
//           },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         )
//         .end(buffer);
//     });

//     // res.json({
//     //   success: true,
//     //   images: [uploadResult.secure_url],
//     // });
//     res.json({
//   success: true,
//   images: [
//     "https://picsum.photos/800/450?1",
//     "https://picsum.photos/800/450?2",
//     "https://picsum.photos/800/450?3",
//     "https://picsum.photos/800/450?4"
//   ]
// });

//   } catch (error) {
//     console.error("Thumbnail generation error:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

//hugging face
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const HF_API_URL =
//   "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";

// async function generateImageFromHF(prompt) {
//   const response = await fetch(HF_API_URL, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.HF_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       inputs: prompt,
//       parameters: {
//         width: 1280,
//         height: 720, // 16:9
//       },
//     }),
//   });

//   if (!response.ok) {
//     const err = await response.text();
//     throw new Error(`HF API error: ${err}`);
//   }

//   // HF returns raw image bytes
//   const arrayBuffer = await response.arrayBuffer();
//   return Buffer.from(arrayBuffer);
// }

// export const generateThumbnail = async (req, res) => {
//   const { style, niche, color, title } = req.body;

//   if (!style || !niche || !color || !title) {
//     return res.status(400).json({ success: false, message: "All fields required" });
//   }

//   try {
//     // Build 4 slightly varied prompts for 4 different thumbnails
//     const variants = [
//       `YouTube thumbnail, ${niche} niche, ${style} style, dominant color ${color}, bold title text "${title}", cinematic lighting, high contrast, 16:9`,
//       `YouTube thumbnail, ${niche} niche, ${style} style, dominant color ${color}, title "${title}", minimalist clean design, professional, 16:9`,
//       `YouTube thumbnail, ${niche} niche, ${style} style, dominant color ${color}, title "${title}", dramatic shadows, eye-catching, viral style, 16:9`,
//       `YouTube thumbnail, ${niche} niche, ${style} style, dominant color ${color}, title "${title}", bright vivid colors, energetic, 16:9`,
//     ];

//     // Generate 4 thumbnails in parallel
//     const buffers = await Promise.all(variants.map(generateImageFromHF));

//     // Upload all 4 to Cloudinary in parallel
//     const uploadResults = await Promise.all(
//       buffers.map(
//         (buffer) =>
//           new Promise((resolve, reject) => {
//             cloudinary.uploader
//               .upload_stream(
//                 { folder: "clixora/thumbnails" },
//                 (error, result) => {
//                   if (error) reject(error);
//                   else resolve(result);
//                 }
//               )
//               .end(buffer);
//           })
//       )
//     );

//     const images = uploadResults.map((r) => r.secure_url);

//     return res.status(200).json({ success: true, images });
//   } catch (error) {
//     console.error("Thumbnail generation error:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

//POLLINATIONS

// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Upload buffer to Cloudinary
// const uploadToCloudinary = (buffer) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream(
//         { folder: "clixora/thumbnails" },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       )
//       .end(buffer);
//   });
// };

// export const generateThumbnail = async (req, res) => {
//   const { style, niche, color, title } = req.body;

//   if (!style || !niche || !color || !title) {
//     return res.status(400).json({
//       success: false,
//       message: "All fields required",
//     });
//   }

//   try {
//     // 4 alag alag prompts — 4 different thumbnails
//     const prompts = [
//       `youtube thumbnail ${niche} ${style} ${color} bold title ${title} cinematic lighting high contrast`,
//       `youtube thumbnail ${niche} ${style} ${color} title ${title} minimalist clean professional`,
//       `youtube thumbnail ${niche} ${style} ${color} title ${title} dramatic shadows viral style`,
//       `youtube thumbnail ${niche} ${style} ${color} title ${title} bright vivid energetic`,
//     ];

//     // Har prompt ke liye Pollinations se image fetch karo
//     const imageBuffers = await Promise.all(
//       prompts.map(async (prompt) => {
//         const encodedPrompt = encodeURIComponent(prompt);
//         const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1280&height=720&nologo=true`;

//         const response = await fetch(url);
//         if (!response.ok) throw new Error("Pollinations fetch failed");

//         const arrayBuffer = await response.arrayBuffer();
//         return Buffer.from(arrayBuffer);
//       })
//     );

//     // Sab images Cloudinary pe upload karo
//     const uploadResults = await Promise.all(
//       imageBuffers.map((buffer) => uploadToCloudinary(buffer))
//     );

//     const images = uploadResults.map((r) => r.secure_url);

//     return res.status(200).json({
//       success: true,
//       images, // 4 Cloudinary URLs
//     });

//   } catch (error) {
//     console.error("Thumbnail generation error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// cloudflare
import { v2 as cloudinary } from "cloudinary";

const uploadToCloudinary = (buffer) => {
  // Config will call in runtime, dotenv already loaded
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "clixora/thumbnails" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });
};
const generateImageFromCloudflare = async (prompt) => {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        num_steps: 4,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Cloudflare AI error: ${err}`);
  }

  // parse JSON and find base64
  const json = await response.json();
  const base64String = json.result.image;

  // Base64 to buffer convert
  return Buffer.from(base64String, "base64");
};

export const generateThumbnail = async (req, res) => {
  const { style, niche, color, title } = req.body;

  if (!style || !niche || !color || !title) {
    return res.status(400).json({
      success: false,
      message: "All fields required",
    });
  }

  try {
const prompts = [
  // 1. Bold & Cinematic
  `YouTube thumbnail, ${niche} topic, title text "${title}", ${color} color scheme, ${style} style, cinematic lighting, high contrast background, professional design, sharp details, 16:9 aspect ratio, high quality`,

  // 2. Clean & Minimal
  `YouTube thumbnail, ${niche} channel, "${title}", clean minimalist layout, ${color} color palette, ${style} aesthetic, soft studio lighting, bold typography, professional graphic design, 16:9`,

  // 3. Vibrant & Energetic  
  `YouTube thumbnail, ${niche} niche, topic "${title}", vibrant ${color} colors, ${style} style, bright lighting, bold text design, high saturation, eye-catching composition, 16:9`,

  // 4. Educational & Informative
  `YouTube thumbnail, educational ${niche} video, "${title}", ${color} accent colors, ${style} design style, clean background, clear typography, infographic layout, professional look, 16:9`
];
    const imageBuffers = await Promise.all(
      prompts.map((prompt) => generateImageFromCloudflare(prompt))
    );

    const uploadResults = await Promise.all(
      imageBuffers.map((buffer) => uploadToCloudinary(buffer))
    );

    const images = uploadResults.map((r) => r.secure_url);

    return res.status(200).json({ success: true, images });

  } catch (error) {
    console.error("Thumbnail generation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};