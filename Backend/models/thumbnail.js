import mongoose, { model, mongo, Schema } from "mongoose";

const thumbnailSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        ctaScore: {
            type: Number,
            default: null,
        },
        niche: {
            type: String,
        },
        style: {
            type: String,
        },
        color: {
            type: String,
        },
        description:{
            type:String,
            default:"",
        },
        generatedUrls: {
            type: [String], // Sahi Tarika: Cloudinary ke 4 URLs ka array
        },
        selectedUrl: {
            type: String,   // Jo user ne select kiya editor ke liye
        },
        finalExportUrl: {
            type: String,   // Canvas se edit hone ke baad ka final image
        },
        feedbackLogs: {
            type: [String], // Gemini AI ke optimization tips
        },

    }, { timestamps: true }
)

export default mongoose.model("Thumbnail", thumbnailSchema);
