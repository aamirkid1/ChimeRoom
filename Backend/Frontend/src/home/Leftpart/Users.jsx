import React, { useEffect, useState } from "react";
import User from "./User.jsx";
import useGetAllUsers from "../../context/useGetAllUsers";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Users() {
  const [allUsers, loading] = useGetAllUsers();
  const [lastMessages, setLastMessages] = useState({});
  const { socket } = useSocketContext();
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));

  //  Listen for new messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      setLastMessages((prev) => ({
        ...prev,
        [message.senderId]: {
          text: message.message,
          createdAt: message.createdAt,
        },
      }));
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket]);

  //  Merge last message data into user objects
  const mergedUsers = allUsers.map((user) => ({
    ...user,
    lastMessage: lastMessages[user._id] || user.lastMessage,
  }));

  //  Sort by latest message time
  const sortedUsers = mergedUsers.slice().sort((a, b) => {
    const aTime = new Date(a.lastMessage?.createdAt || 0);
    const bTime = new Date(b.lastMessage?.createdAt || 0);
    return bTime - aTime;
  });

  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-[#95a5a6] rounded-md">
        Messages
      </h1>
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {sortedUsers.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;

