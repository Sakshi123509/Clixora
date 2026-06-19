import express from 'express';
import {
    deleteThumbnail,
    saveThumbnail,
    fetchThumbnail,
} from "../controllers/thumbnailController.js";
import { generateThumbnail } from "../controllers/generateController.js"; 
import { saveCanvasExport } from "../controllers/editorController.js";
import isAuth from "../middleware/isAuth.js"; // 🔒 Auth layer imported

const router = express.Router();

// RENDER/GENERATE: Secure matrix process requiring user identity
router.post('/generate', isAuth, generateThumbnail);

// CANVAS SAVE LAYER: Dono paths par 'isAuth' mandatory hai
router.post("/save-canvas", isAuth, saveCanvasExport); 
router.post("/canvas/save", isAuth, saveCanvasExport); 

// DASHBOARD AND VAULT MANAGEMENT
router.get('/thumbnails', isAuth, fetchThumbnail);       // Sirf logged-in user ke data ko padhne dega
router.post('/thumbnails', isAuth, saveThumbnail);      // Save network asset node
router.delete('/thumbnails/:id', isAuth, deleteThumbnail); // Secure delete node
router.post("/save-project", isAuth, saveThumbnail);

export default router; 