import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js"; // ⬅ required

// ---------------- SEND MESSAGE ----------------
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // current logged in user

    //  BLOCK CHECKS
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: "User not found" });
    }

    //  Case 1: Receiver has blocked sender
    if (
      receiver.blockedUsers &&
      receiver.blockedUsers.some((id) => id.toString() === senderId.toString())
    ) {
      return res.status(403).json({ error: "You are blocked by this user" });
    }

    //  Case 2: Sender has blocked receiver
    if (
      sender.blockedUsers &&
      sender.blockedUsers.some((id) => id.toString() === receiverId.toString())
    ) {
      return res.status(403).json({ error: "You have blocked this user" });
    }

    //  Proceed with message saving
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

    await Promise.all([conversation.save(), newMessage.save()]);

    // Send message in real-time
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

// ---------------- GET MESSAGES ----------------
export const getMessage = async (req, res) => {
  try {
    const { id: chatUserId } = req.params;
    const senderId = req.user._id;

    const currentUser = await User.findById(senderId);
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    //  BLOCK CHECKS
    // If current user has blocked chatUser → empty messages
    if (
      currentUser.blockedUsers &&
      currentUser.blockedUsers.some((id) => id.toString() === chatUserId.toString())
    ) {
      return res.status(200).json([]);
    }

    // If chatUser has blocked current user → empty messages
    const chatUser = await User.findById(chatUserId);
    if (
      chatUser &&
      chatUser.blockedUsers &&
      chatUser.blockedUsers.some((id) => id.toString() === senderId.toString())
    ) {
      return res.status(200).json([]);
    }

    //  Otherwise return conversation
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUserId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
