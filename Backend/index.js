// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import path from "path";
// import userRoute from "./routes/user.route.js";
// import messageRoute from "./routes/message.route.js";
// import { app, server } from "./SocketIO/server.js";

// dotenv.config();

// // middleware
// app.use(express.json());
// app.use(cookieParser());
// // app.use(cors());

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3001",
//       "https://chimeroom-chatapp.onrender.com"
//     ],
//     credentials: true,
//   })
// );

// const PORT = process.env.PORT || 5000;   // 3001 se 500 kiya hai
// const URI = process.env.MONGODB_URI;

// try {
//     mongoose.connect(URI);
//     console.log("Connected to MongoDB");
// } catch (error) {
//     console.log(error);
// }


// //routes
// app.use("/api/user", userRoute);
// app.use("/api/message", messageRoute);


// // ---------------- code for deployment ----------------

// if (process.env.NODE_ENV === 'production') {
//   const dirPath = path.resolve();
//   app.use(express.static('./Frontend/dist'));
//   app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(dirPath, './Frontend/dist', 'index.html'));
//   });
// }

// server.listen(PORT, () => {
//   console.log(`Server is Running on port ${PORT}`);
// });




// // server.listen(PORT, () => {
// //     // console.log(Server is Running on port ${PORT});
// //     console.log(`Server is Running on port ${PORT}`);

// // });



import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// ================= Middleware =================
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "https://chimeroom-chatapp.onrender.com",
    ],
    credentials: true,
  })
);

// ================= Health check (REQUIRED) =================
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// ================= Routes =================
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// ================= Frontend =================
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "Frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend/dist", "index.html"));
  });
}

// ================= Start server ONCE =================
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ================= Mongo (NON-BLOCKING) =================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) =>
    console.error("⚠️ Mongo error (retrying):", err.message)
  );
