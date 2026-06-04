import mongoose, { model, mongo, Schema } from "mongoose"
import CTAScore from "../../Frontend/src/pages/CTA_score"

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
        imageUrl: {//cloudinary
            tyep: String,
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
        colour: {
            type: String,
        }
    }, { timestamps: true }
)

module.exports = mongoose.model("Thumbnail", thumbnailSchema)