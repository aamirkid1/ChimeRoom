// import express from "express";
// import {
//   allUsers,
//   login,
//   logout,
//   signup,
// } from "../controller/user.controller.js";
// import secureRoute from "../middleware/secureRoute.js";
// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);
// router.get("/allusers", secureRoute, allUsers);

// export default router;


import express from "express";
import {
  allUsers,
  login,
  logout,
  signup,

  blockUser,       // ⬅ add
  unblockUser,     // ⬅ add
  getBlockedUsers, // ⬅ add

} from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers);

// 🚨 NEW ROUTES
router.post("/block", secureRoute, blockUser);
router.post("/unblock", secureRoute, unblockUser);
router.get("/blocked", secureRoute, getBlockedUsers);


export default router;
