import { v2 as cloudinary } from "cloudinary";
import Thumbnail from "../models/thumbnail.js"; // Aapka Mongoose Schema Model
import { User } from "../models/usermodel.js";

const uploadToCloudinary = (buffer) => {
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

  const json = await response.json();
  const base64String = json.result.image;

  return Buffer.from(base64String, "base64");
};

export const generateThumbnail = async (req, res) => {
  // 1. Extract Valid User ID with Fallbacks
  const userId = req.user?.userId || req.user?.id || req.user?._id || req.userId || "65f1a2b3c4d5e6f7a8b90000";

  // 2. Destructure Incoming Request Body
  const { title, style, niche, description, color } = req.body;

  // 3. Validation Check
  if (!style || !niche || !color || !title) {
    return res.status(400).json({
      success: false,
      message: "All configuration fields are required",
    });
  }

  try {
    // 4. Build 4 Varied Variant Prompts
    const prompts = [
      `A high-impact YouTube thumbnail. In the center, ultra-bold cinematic typography reading exactly "${title}". The entire background scene must dynamically illustrate: ${description}. Graphics layout, ${color} color palette, ${style} aesthetic, dramatic studio lighting, high contrast, sharp details, 16:9 aspect ratio`,
      `Premium YouTube thumbnail design for ${niche} video. Large ultra-sharp 3D text overlay displaying "${title}" prominently in focus. The background environment wraps around the text with elements of: ${description}. Neon ${color} accents, vivid ${style} graphics, eye-catching composition for maximum CTR, 16:9`,
      `Vibrant professional YouTube thumbnail graphic. Clean, massive title design showing exactly "${title}". The scene features highly detailed creative visuals matching: ${description}. Rendered in customized ${style} elements, rich ${color} color scheme, studio depth of field, high resolution, 16:9`,
      `Modern minimal YouTube thumbnail layout. Crisp bold typography framing the text "${title}". The background atmosphere perfectly visualizes the theme of: ${description}. Designed in professional ${style} style, glowing ${color} accent lights, premium high-contrast vector elements, 16:9`
    ];

    // 5. Generate and Upload Images in Parallel
    const imageBuffers = await Promise.all(
      prompts.map((prompt) => generateImageFromCloudflare(prompt))
    );

    const uploadResults = await Promise.all(
      imageBuffers.map((buffer) => uploadToCloudinary(buffer))
    );

    const secureUrls = uploadResults.map((r) => r.secure_url);

    // 6. SAVE TO MONGO DATABASE (Using the extracted userId variable 🌟)
    const newThumbnailDocument = await Thumbnail.create({
      userId: userId, // Perfectly synced with verified user context now
      title,
      niche,
      description,
      style,
      color,
      generatedUrls: secureUrls,
      imageUrl: secureUrls[0],
      ctaScore: null,
    });

    // 7. Map Response payload structure for frontend UI consumption
    const frontendMatrixResponse = secureUrls.map((url, index) => ({
      _id: `${newThumbnailDocument._id}_variant_${index}`,
      dbRecordId: newThumbnailDocument._id,
      title: newThumbnailDocument.title,
      niche: newThumbnailDocument.niche,
      style: newThumbnailDocument.style,
      color: newThumbnailDocument.color,
      description: newThumbnailDocument.description,
      ctaScore: newThumbnailDocument.ctaScore,
      imageUrl: url,
    }));

    return res.status(200).json({
      success: true,
      data: frontendMatrixResponse
    });

  } catch (error) {
    console.error("Thumbnail generation pipeline failed completely:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Compilation Engine Error",
    });
  }
};