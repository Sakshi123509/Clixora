import express from "express";
import { getSavedProjects, deleteProject } from "../controllers/dashboardController.js";

const router = express.Router();

// Route mapping matrices
router.get("/saved-projects", getSavedProjects);
router.delete("/project/:id", deleteProject);

export default router;