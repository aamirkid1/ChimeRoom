// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "https://chimeroom-chatapp.onrender.com",     //http://localhost:3001
//     methods: ["GET", "POST"],
//   },
// });

// const users = {}; // map userId → socketId

// // Expose for controllers
// export const getReceiverSocketId = (receiverId) => {
//   return users[receiverId];
// };

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   const userId = socket.handshake.query.userId;
//   if (userId) {
//     users[userId] = socket.id;
//     console.log("Users map:", users);
//   }

//   // notify all clients about online users
//   io.emit("getOnlineUsers", Object.keys(users));

//   socket.on("disconnect", () => {
//     console.log("a user disconnected", socket.id);
//     delete users[userId];
//     io.emit("getOnlineUsers", Object.keys(users));
//   });
// });

// export { app, io, server };


import { Server } from "socket.io";
import http from "http";
import express from "express";

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*", // IMPORTANT for Render stability
    methods: ["GET", "POST"],
  },
});

const users = {}; // userId -> socketId

// Expose helper
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

io.on("connection", (socket) => {
  console.log("⚡ Socket connected:", socket.id);

  const userId = socket.handshake.query?.userId;

  if (userId) {
    users[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);

    if (userId && users[userId]) {
      delete users[userId];
    }

    io.emit("getOnlineUsers", Object.keys(users));
  });
});
