import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    //  Must match jwt/generateToken.js secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in secureRoute:", error.message);
    return res.status(401).json({ error: "Not authorized, token failed" });
  }
};

export default secureRoute;
