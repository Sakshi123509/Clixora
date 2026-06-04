//save,get,delete
import { v2 as cloudinary } from "cloudinary";
import Thumbnail from "../models/thumbnail.js";

export const saveThumbnail = async (req, res) => {
    const { title, imageUrl, ctaScore, niche, style, color } = req.body;
    const userId = req.user.id;

    try {
        const thumb = await Thumbnail.create
            ({ userId, title, imageUrl, niche, ctaScore, style, color });

        res.json({ success: true, thumbnail: thumb });
    } catch (error) {
        console.log('Save error', error);
        res.status(500).json({ error: "saved failed" })
    }
}


//fetch thumbnail
export const fetchThumbnail = async (req, res) => {
    try {
        const thumb = await Thumbnail.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json({ thumbnails: thumb })
    } catch (error) {
        res.status(500).json({ error: "fetch failed" })
    }
}


//delete Thumbnail
export const deleteThumbnail = async (req, res) => {
    try {
        const thumb = await Thumbnail.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!thumb) {
            return res.status(404).json({
                error: "Thumbnail not found",
            });
        }

        if (thumb.publicId) {
            await cloudinary.uploader.destroy(
                thumb.publicId
            );
        }

        await thumb.deleteOne();

        res.json({
            success: true,
            message: "Thumbnail deleted successfully",
        });

    } catch (error) {
        console.log("Delete Error:", error);

        res.status(500).json({
            error: "Delete failed",
        });
    }
};