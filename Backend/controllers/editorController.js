import { v2 as cloudinary } from "cloudinary";
import Thumbnail from "../models/thumbnail.js";

export const saveCanvasExport = async (req, res) => {
  const { thumbnailId, canvasImageBase64 } = req.body;
  const loggedInUserId = req.user?.userId || req.user?.id || req.userId;

  if (!thumbnailId || !canvasImageBase64) {
    return res.status(400).json({ success: false, error: "Missing thumbnailId or base64 data" });
  }

  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const parts = canvasImageBase64.split(",");
    const base64Data = parts.length > 1 ? parts[1] : parts[0];
    const buffer = Buffer.from(base64Data, "base64");

    console.log("⏳ Uploading asset to Cloudinary...");
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "clixora/exports" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
        .end(buffer);
    });
    console.log("✅ Cloudinary Upload Success:", uploadResult.secure_url);

    console.log(`🔎 Searching Database for Thumbnail ID: ${thumbnailId}`);

    // 🌟 FIX: Overwrite imageUrl as well so main listing shows the edited frame instantly!
    const updatedDocument = await Thumbnail.findOneAndUpdate(
      { _id: thumbnailId, userId: loggedInUserId }, 
      { 
        imageUrl: uploadResult.secure_url,       // Dashboard visual fallback overwrite
        finalExportUrl: uploadResult.secure_url, 
        isEdited: true 
      },
      { new: true }
    );

    if (!updatedDocument) {
      console.error(`❌ DB Error: ID ${thumbnailId} does not exist in MongoDB!`);
      return res.status(404).json({
        success: false,
        error: `Database me is ID (${thumbnailId}) ka koi thumbnail nahi mila.`
      });
    }

    return res.status(200).json({
      success: true,
      message: "Canvas saved and updated successfully!",
      finalExportUrl: updatedDocument.finalExportUrl
    });

  } catch (error) {
    console.error("Canvas export tracking pipeline broken:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};