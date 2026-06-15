import Thumbnail from "../models/Thumbnail.js";

// @desc    Get all saved projects for dashboard grid
// @route   GET /api/dashboard/saved-projects
export const getSavedProjects = async (req, res) => {
  try {
    const projects = await Thumbnail.find().sort({ createdAt: -1 });
    return res.json({ success: true, projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a project utility from DB
// @route   DELETE /api/dashboard/project/:id
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedThumbnail = await Thumbnail.findByIdAndDelete(id);

    if (!deletedThumbnail) {
      return res.status(404).json({ success: false, message: "Asset not found in database registry." });
    }

    return res.json({ success: true, message: "Project purged from cloud storage grid." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};