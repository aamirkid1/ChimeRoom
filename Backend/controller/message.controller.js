// import { getReceiverSocketId, io } from "../SocketIO/server.js";
// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// export const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id; // current logged in user
//     let conversation = await Conversation.findOne({
//       members: { $all: [senderId, receiverId] },
//     });
//     if (!conversation) {
//       conversation = await Conversation.create({
//         members: [senderId, receiverId],
//       });
//     }
//     // const newMessage = new Message({
//     //   senderId,
//     //   receiverId,
//     //   message,
//     // });
//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//       seen: false, // ✅ Mark as unseen when sending
//     });

//     if (newMessage) {
//       conversation.messages.push(newMessage._id);
//     }
//     // await conversation.save()
//     // await newMessage.save();
//     await Promise.all([conversation.save(), newMessage.save()]); // run parallel
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }
//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error in sendMessage", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getMessage = async (req, res) => {
//   try {
//     const { id: chatUser } = req.params;
//     const senderId = req.user._id; // current logged in user
//     let conversation = await Conversation.findOne({
//       members: { $all: [senderId, chatUser] },
//     }).populate("messages");
//     if (!conversation) {
//       return res.status(201).json([]);
//     }
//     // ✅ New code to mark messages as seen
//     await Message.updateMany(
//       {
//         senderId: chatUser,   // messages sent by the other user
//         receiverId: senderId, // received by the logged-in user
//         seen: false,          // only unseen messages
//       },
//       {
//         $set: { seen: true },
//       }
//     );

//     const messages = conversation.messages;
//     res.status(201).json(messages);
//   } catch (error) {
//     console.log("Error in getMessage", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // current logged in user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save()
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]); // run parallel
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; // current logged in user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]);
    }
    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
