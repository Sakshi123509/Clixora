import { v2 as cloudinary } from "cloudinary";
import Thumbnail from "../models/thumbnail.js";

export const saveCanvasExport = async (req, res) => {
  const { thumbnailId, canvasImageBase64 } = req.body;

  if (!thumbnailId || !canvasImageBase64) {
    return res.status(400).json({ success: false, error: "Missing thumbnailId or base64 data" });
  }

  try {
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
    
    // Mongoose update option fix ke sath 🚀
    const updatedDocument = await Thumbnail.findByIdAndUpdate(
      thumbnailId,
      { 
        finalExportUrl: uploadResult.secure_url,
        isEdited: true 
      },
      { returnDocument: 'after' } 
    );

    // 🚨 Agar ID database me nahi mili toh server crash nahi hoga:
    if (!updatedDocument) {
      console.error(`❌ DB Error: ID ${thumbnailId} does not exist in MongoDB!`);
      return res.status(404).json({ 
        success: false, 
        error: `Database me is ID (${thumbnailId}) ka koi thumbnail nahi mila. Fresh generation se test karein.` 
      });
    }

    return res.status(200).json({
      success: true,
      message: "Canvas saved and updated successfully!",
      finalExportUrl: updatedDocument.finalExportUrl
    });

  } catch (error) {
    console.error("💥 Canvas export tracking pipeline broken:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};