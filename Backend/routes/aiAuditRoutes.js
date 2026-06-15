import express from "express";
import { auditThumbnail } from "../controllers/aiAuditController.js";

const router = express.Router();

router.post("/audit-thumbnail", auditThumbnail);

export default router;