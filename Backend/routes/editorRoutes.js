import express from "express";
import { saveCanvasExport } from "../controllers/editorController.js";

const router = express.Router();

// Maps the POST request from Canvas.jsx directly to your editorController logic
router.post("/save-canvas", saveCanvasExport);

export default router;