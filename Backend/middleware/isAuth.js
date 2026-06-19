import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 🌟 FIXED: Agar token me userId hai ya id hai, dono ko fallback ke sath support karega
    req.user = {
      id: decoded.userId || decoded.id,
    };

    // Backup utility key taaki dashboard controllers ko bhi direct access mile
    req.userId = decoded.userId || decoded.id;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default isAuth;