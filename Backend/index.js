import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import generateRoutes from "./routes/generateRoutes.js";
import thumbnailRoutes from "./routes/thumbnailRoutes.js";

import dotenv from 'dotenv';
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173", // your Vite port
    credentials: true
})); //middleware to enable CORS
app.use(express.json());

app.get('/', (req, res) => {
    res.send(" Welcome to Thumbnail generator Platform")
})

app.use("/api/auth", authRoutes);
app.use("/api/generate", generateRoutes);
app.use("/api/thumbnail", thumbnailRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})