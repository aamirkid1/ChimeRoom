import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const {
    selectedConversation,
    setSelectedConversation,
    unseenMap, // unseen messages count
    clearUnseen,
  } = useConversation();

  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  const unseenCount = unseenMap[user._id] || 0;

  const handleSelect = () => {
    setSelectedConversation(user);
    clearUnseen(user._id); // reset unseen count
  };

  return (
    <div
      className={`hover:bg-[#2ecc71]/20 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={handleSelect}
    >
      <div className="flex space-x-4 px-8 py-3 cursor-pointer relative">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={user?.avatar || "/myphoto.png"}
              className="w-full h-full object-cover"
              alt="profile"
            />
          </div>
        </div>

        <div>
          <h1 className="font-bold">{user.fullname}</h1>
            <span className="text-sm text-gray-400">
            {user.lastMessage?.text || "No messages yet"}
            </span>

        </div>

        {/* Unseen badge */}
        {unseenCount > 0 && (
          <span className="absolute right-4 top-4 flex items-center justify-center bg-green-500 text-white text-xs rounded-full px-2 py-0.5">
            {unseenCount}
          </span>
        )}
      </div>
    </div>
  );
}

export default User;
