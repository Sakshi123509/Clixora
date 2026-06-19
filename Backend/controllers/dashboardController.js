import Thumbnail from "../models/thumbnail.js";

// @desc    Get ONLY logged-in user's saved projects for dashboard grid
// @route   GET /api/dashboard/saved-projects
export const getSavedProjects = async (req, res) => {
  try {
    // 💡 Strict Auth Check: Token se real incoming ID nikalna
    const loggedInUserId = req.user?.userId || req.user?.id || req.user?._id || req.userId;

    if (!loggedInUserId) {
      return res.status(401).json({ success: false, message: "Unauthorized. Please login again." });
    }

    // 🌟 STRICT FIX: $in aur dummy ID ko hata diya. Ab strictly sirf real user ka data milega!
    const projects = await Thumbnail.find({ userId: loggedInUserId }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a project utility from DB securely
// @route   DELETE /api/dashboard/project/:id
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user?.id || req.user?._id || req.userId;

    if (!loggedInUserId) {
      return res.status(401).json({ success: false, message: "Authentication required." });
    }

    // 🌟 FIXED: findOne check queries 'userId' instead of 'user'
    const project = await Thumbnail.findOne({ _id: id, userId: loggedInUserId });

    if (!project) {
      return res.status(404).json({ success: false, message: "Asset not found or you don't have authorization to purge it." });
    }

    await Thumbnail.findByIdAndDelete(id);

    return res.json({ success: true, message: "Project purged from cloud storage grid securely." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};