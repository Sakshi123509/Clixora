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
        }
    }, { timestamps: true }
)

export default mongoose.model("Thumbnail", thumbnailSchema);