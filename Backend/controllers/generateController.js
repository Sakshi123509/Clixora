import OpenAI from "openai";
import { v2 as cloudinary } from "cloudinary";
import Thumbnail from "../models/thumbnail.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const generateThumbnail = async (req, res) => {
  const { style, niche, colour, title } = req.body;
  const userId = req.user.id;

  try {
    const prompt = `
      A premium, high-impact YouTube thumbnail for the ${niche} space,
      optimized for maximum Click-Through Rate (CTR).

      Main focal element:
      A vivid, dynamically framed scene representing ${niche},
      utilizing an expressive ${style} aesthetic.

      Composition & Text Layout:
      Leaves clean negative space on one side for typography.

      Include bold, 3D high-contrast text:
      "${title}"

      Color & Lighting:
      Dominated by a ${colour} color palette with dramatic rim lighting,
      deep shadows, and high contrast.

      Hyper-detailed, sharp focus, professional YouTube thumbnail,
      16:9 aspect ratio.
    `;

    // Generate 4 thumbnails
    const imagePromises = Array(4)
      .fill(null)
      .map(() =>
        openai.images.generate({
          model: "gpt-image-1",
          prompt,
          size: "1536x1024",
        })
      );

    const results = await Promise.all(imagePromises);

    // Base64 image extraction
    const imageBuffers = results.map((result) =>
      Buffer.from(result.data[0].b64_json, "base64")
    );

    // Upload to Cloudinary
    const uploadPromises = imageBuffers.map(
      (buffer) =>
        new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "clixora/thumbnails",
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(buffer);
        })
    );

    const uploaded = await Promise.all(uploadPromises);
    const finalUrls = uploaded.map((img) => img.secure_url);
    res.json({
      success: true,
      images: finalUrls,
    });
    
  } catch (error) {
    console.error("Thumbnail generation error:", error);

    res.status(500).json({
      success: false,
      message: "Image generation failed",
    });
  }
};