import express from 'express';
import { generateThumbnail } from "../controllers/generateController.js";
import { CTAScore } from '../controllers/scoreController.js';
import isAuth from '../middleware/isAuth.js';

// Save canvas tracking state
const router = express.Router();

router.post('/generate', isAuth, generateThumbnail);
router.post('/cta-score', isAuth, CTAScore);
// Backend Route Placeholder (Express)



export default router;