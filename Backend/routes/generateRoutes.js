import express from 'express';
import {generateThumbnail} from "../controllers/generateController.js";
import { CTAScore } from '../controllers/scoreController.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.post('/generate',isAuth, generateThumbnail);
router.post('/cta-score', isAuth, CTAScore);

export default router;