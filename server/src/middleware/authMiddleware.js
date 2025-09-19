import { encryptResponse, verifyToken } from "../utils/index.js";
import User from "../config/models/user.js";

 const protect = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      return res
        .status(401)
        .json({
          encrypted: encryptResponse({ message: "Not authorized, no token" }),
        });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);

    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res
        .status(401)
        .json({ encrypted: encryptResponse({ message: "User not found" }) });
    }

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res
      .status(401)
      .json({
        encrypted: encryptResponse({ message: "Not authorized, token failed" }),
      });
  }
};
 export default protect