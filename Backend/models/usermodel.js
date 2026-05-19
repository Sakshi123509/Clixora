import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: false,
        minlength: 6,
    },
    googleId: {
        type: String,
        default: null
    },
    profilepic: {
        type: String,
        default: null
    }
}, { timestamps: true });

export const User = mongoose.model("User", userschema);