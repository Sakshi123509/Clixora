// thumbnailController.js - Updated version
import { v2 as cloudinary } from "cloudinary";
import Thumbnail from "../models/thumbnail.js";


export const saveThumbnail = async (req, res) => {
    const { thumbnailId, title, description, niche, style, color } = req.body;
    const userId = req.userId || req.user?.id;

    if (!userId) {
        return res.status(401).json({ success: false, error: "Unauthorized access" });
    }

    try {
        // Agar dynamic update payload chalana hai to update karein, create nahi!
        const updatedThumb = await Thumbnail.findOneAndUpdate(
            { _id: thumbnailId, userId: userId },
            { title, description, niche, style, color },
            { new: true }
        );

        if (!updatedThumb) {
            return res.status(404).json({ success: false, error: "Thumbnail not found to update" });
        }

        res.json({ success: true, thumbnail: updatedThumb });
    } catch (error) {
        console.error('Update error', error);
        res.status(500).json({ success: false, error: "Failed to update thumbnail metadata" });
    }
};


export const fetchThumbnail = async (req, res) => {
    try {
        const userId = req.userId || req.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        // strictly filter using authenticated user id token reference
        const thumb = await Thumbnail.find({ userId }).sort({ createdAt: -1 });
        res.json({ success: true, thumbnails: thumb });
    } catch (error) {
        res.status(500).json({ success: false, error: "Fetch pipeline failed" });
    }
};


export const deleteThumbnail = async (req, res) => {
    try {
        const userId = req.userId || req.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const thumb = await Thumbnail.findOne({
            _id: req.params.id,
            userId: userId,
        });

        if (!thumb) {
            return res.status(404).json({ success: false, error: "Asset not found" });
        }

        // Clean up code from Cloudinary if publicId exists...
        await thumb.deleteOne();
        res.json({ success: true, message: "Thumbnail wiped out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Delete operation failed" });
    }
};