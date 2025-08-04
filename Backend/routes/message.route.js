// import express from "express";
// import mongoose from "mongoose"; // ✅ added
// import Message from "../models/message.model.js"; // ✅ added
// import { getMessage, sendMessage } from "../controller/message.controller.js";
// import secureRoute from "../middleware/secureRoute.js";

// const router = express.Router();

// router.post("/send/:id", secureRoute, sendMessage);
// router.get("/get/:id", secureRoute, getMessage);

// // ✅ NEW route: get unseen message counts grouped by sender
// router.get("/unseen-count/:userId", secureRoute, async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const counts = await Message.aggregate([
//       {
//         $match: {
//           receiverId: new mongoose.Types.ObjectId(userId),
//           seen: false,
//         },
//       },
//       {
//         $group: {
//           _id: "$senderId",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     res.json(counts); // [{ _id: senderId, count: 3 }, ...]
//   } catch (error) {
//     console.log("Error in unseen count route", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;


// import express from "express";
// import { getMessage, sendMessage } from "../controller/message.controller.js";
// import secureRoute from "../middleware/secureRoute.js";
// import mongoose from "mongoose"; // ✅ Add this at the top
// import Message from "../models/message.model.js"; // ✅ Add this at the top


// const router = express.Router();
// router.post("/send/:id", secureRoute, sendMessage);
// router.get("/get/:id", secureRoute, getMessage);

// export default router;


import express from "express";
import { getMessage, sendMessage } from "../controller/message.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();
router.post("/send/:id", secureRoute, sendMessage);
router.get("/get/:id", secureRoute, getMessage);

export default router;