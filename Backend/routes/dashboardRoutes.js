import express from "express";
import isAuth from "../middleware/isAuth.js"; // Aapka auth middleware
import { getSavedProjects, deleteProject } from "../controllers/dashboardController.js"; // Controller file se import karein

const router = express.Router();

// 🔒 Ab dono routes protected hain aur controllers ke sath linked hain
router.get("/saved-projects", isAuth, getSavedProjects);
router.delete("/project/:id", isAuth, deleteProject);

export default router;