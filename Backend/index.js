import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import generateRoutes from "./routes/generateRoutes.js";
import thumbnailRoutes from "./routes/thumbnailRoutes.js";
import { v2 as cloudinary } from 'cloudinary';
import aiAuditRoutes from "./routes/aiAuditRoutes.js";
import editorRoutes from "./routes/editorRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

connectDB();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.get('/', (req, res) => {res.send("Welcome to Thumbnail generator Platform")});

app.use("/api/auth", authRoutes);
app.use("/api/generate", generateRoutes);
app.use("/api/thumbnails", thumbnailRoutes);
app.use("/api/editor", editorRoutes);
app.use("/api/dashboard", dashboardRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});