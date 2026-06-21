import express from 'express';
import { generateThumbnail } from "../controllers/generateController.js";
import { CTAScore } from '../controllers/scoreController.js';
import isAuth from '../middleware/isAuth.js';

// Save canvas tracking state
const router = express.Router();

router.post('/', isAuth, generateThumbnail);     // → POST /api/generate
router.post('/cta-score', isAuth, CTAScore);     // → POST /api/generate/cta-score

export default router;