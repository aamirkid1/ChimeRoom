import express from "express";
import {
  allUsers,
  login,
  logout,
  signup,
  checkUser,
  verifyEmail,      
  blockUser,
  unblockUser,
  getBlockedUsers,
} from "../controller/user.controller.js";

import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

// AUTH ROUTES
router.post("/check-user", checkUser); 
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail); 



// USER ROUTES
router.get("/allusers", secureRoute, allUsers);

// BLOCK/UNBLOCK USER ROUTES
router.post("/block", secureRoute, blockUser);
router.post("/unblock", secureRoute, unblockUser);
router.get("/blocked", secureRoute, getBlockedUsers);

export default router;

