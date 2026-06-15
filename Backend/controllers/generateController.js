
import { v2 as cloudinary } from "cloudinary";
import Thumbnail from "../models/thumbnail.js"; // Aapka Mongoose Schema Model
import { User } from "../models/usermodel.js";

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

  const json = await response.json();
  const base64String = json.result.image;

  return Buffer.from(base64String, "base64");
};

export const generateThumbnail = async (req, res) => {
  const { style, niche, description, color, title } = req.body;

  if (!style || !niche || !color || !title) {
    return res.status(400).json({
      success: false,
      message: "All configuration fields are required",
    });
  }

  try {
    // 1. Build 4 Varied Variant Prompts
    // const prompts = [
    //   `YouTube thumbnail, ${niche} topic, title text "${title}", ${color} color scheme, ${style} style, cinematic lighting, high contrast background, professional design, sharp details, 16:9 aspect ratio`,
    //   `YouTube thumbnail, ${niche} channel, "${title}", clean minimalist layout, ${color} color palette, ${style} aesthetic, soft studio lighting, bold typography, professional graphic design, 16:9`,
    //   `YouTube thumbnail, ${niche} niche, topic "${title}", vibrant ${color} colors, ${style} style, bright lighting, bold text design, high saturation, eye-catching composition, 16:9`,
    //   `YouTube thumbnail, educational ${niche} video, "${title}", ${color} accent colors, ${style} design style, clean background, clear typography, infographic layout, professional look, 16:9`
    // ];

    const prompts = [
      // Prompt 1: Heavy Text Focus + Dynamic Scene
      `A high-impact YouTube thumbnail. In the center, ultra-bold cinematic typography reading exactly "${title}". The entire background scene must dynamically illustrate: ${description}. Graphics layout, ${color} color palette, ${style} aesthetic, dramatic studio lighting, high contrast, sharp details, 16:9 aspect ratio`,

      // Prompt 2: 3D Pop Style + Immersive Elements
      `Premium YouTube thumbnail design for ${niche} video. Large ultra-sharp 3D text overlay displaying "${title}" prominently in focus. The background environment wraps around the text with elements of: ${description}. Neon ${color} accents, vivid ${style} graphics, eye-catching composition for maximum CTR, 16:9`,

      // Prompt 3: Stylized Character/Object Action + Clear Title
      `Vibrant professional YouTube thumbnail graphic. Clean, massive title design showing exactly "${title}". The scene features highly detailed creative visuals matching: ${description}. Rendered in customized ${style} elements, rich ${color} color scheme, studio depth of field, high resolution, 16:9`,

      // Prompt 4: Clean Modern Layout + Core Topic Graphics
      `Modern minimal YouTube thumbnail layout. Crisp bold typography framing the text "${title}". The background atmosphere perfectly visualizes the theme of: ${description}. Designed in professional ${style} style, glowing ${color} accent lights, premium high-contrast vector elements, 16:9`
    ];
    // 2. Resolve AI Image Generation Buffers in Parallel
    const imageBuffers = await Promise.all(
      prompts.map((prompt) => generateImageFromCloudflare(prompt))
    );

    // 3. Dispatch Parallel Buffers to Cloudinary Target Folder Stream
    const uploadResults = await Promise.all(
      imageBuffers.map((buffer) => uploadToCloudinary(buffer))
    );

    // 4. Collect secure Cloudinary URL arrays
    const secureUrls = uploadResults.map((r) => r.secure_url);

    // 5.  SAVE TO MONGO DATABASE (Connecting to your Schema)
    const newThumbnailDocument = await Thumbnail.create({
      userId: req.user ? req.user.id : "65f1a2b3c4d5e6f7a8b90000",// Temporary dummy Object ID until Auth middleware is linked
      title,
      niche,
      description,
      style,
      color, // Mapping incoming color state to Schema's colorPalette key
      generatedUrls: secureUrls, // Saving all 4 dynamic Cloudinary links inside the single document array
      imageUrl: secureUrls[0],   // Default preview image standard fallback
      ctaScore: null,            // Kept null till explicit user click tracking evaluation
    });

    // 6. Transpile Response payload exactly matching your React Form code structure loops (.map)
    const frontendMatrixResponse = secureUrls.map((url, index) => ({
      _id: `${newThumbnailDocument._id}_variant_${index}`, // Creates unique front keys using parent record ID
      dbRecordId: newThumbnailDocument._id, // References root document record for patch requests (Check Score/Canvas actions)
      title: newThumbnailDocument.title,
      niche: newThumbnailDocument.niche,
      style: newThumbnailDocument.style,
      color: newThumbnailDocument.color,
      description: newThumbnailDocument.description,
      ctaScore: newThumbnailDocument.ctaScore,
      imageUrl: url, // Injecting exact specific Cloudinary URL for that variant card block
    }));

    // Successful Dispatch
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