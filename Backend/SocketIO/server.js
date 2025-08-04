// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import cookieParser from "cookie-parser";   // ✅ ADD
// import cors from "cors";    
// import { Server } from "socket.io"; // ✅ this is required
//                 // ✅ ADD

// // ✅ Setup express
// const app = express();
// const server = http.createServer(app);

// // ✅ CHANGE: Apply middlewares before exporting app
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: ["http://localhost:3001", "http://10.71.17.41:3001"],
//     credentials: true,
//   })
// );

// // ✅ Setup socket.io
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3001", "http://10.71.17.41:3001"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // ✅ Socket logic
// const users = {};

// export const getReceiverSocketId = (receiverId) => {
//   return users[receiverId];
// };

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   const userId = socket.handshake.query.userId;
//   if (userId) {
//     users[userId] = socket.id;
//     console.log("Hello ", users);
//   }

//   io.emit("getOnlineUsers", Object.keys(users));

//   socket.on("disconnect", () => {
//     console.log("a user disconnected", socket.id);
//     delete users[userId];
//     io.emit("getOnlineUsers", Object.keys(users));
//   });
// });

// // ✅ Final export
// export { app, io, server };


import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3001", "http://10.71.17.41:3001"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });



// realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

// used to listen events on server side.
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Hello ", users);
  }
  // used to send the events to all connected users
  io.emit("getOnlineUsers", Object.keys(users));

  console.log("Emitting getOnlineUsers:", Object.keys(users));
  
  // used to listen client side events emitted by server side (server & client)
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };

