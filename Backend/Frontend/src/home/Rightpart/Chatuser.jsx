import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import axios from "axios";

function Chatuser() {
  const {
    selectedConversation,
    blockedUsers,
    addBlockedUser,
    removeBlockedUser,
    setSelectedConversation,
  } = useConversation();

  const { onlineUsers } = useSocketContext();

  if (!selectedConversation) return null;

  // Online check
  const isUserOnline = () =>
    selectedConversation &&
    onlineUsers.includes(selectedConversation._id.toString());

  // Block check
  const isBlocked = blockedUsers.includes(selectedConversation._id);

  // Block / Unblock
  const handleToggleBlock = async () => {
    try {
      if (isBlocked) {
        await axios.post(
          "/api/user/unblock",
          {
            userIdToUnblock: selectedConversation._id,
          },
          {
            withCredentials: true,
          }
        );

        removeBlockedUser(selectedConversation._id);
      } else {
        await axios.post(
          "/api/user/block",
          {
            userIdToBlock: selectedConversation._id,
          },
          {
            withCredentials: true,
          }
        );

        addBlockedUser(selectedConversation._id);
      }
    } catch (error) {
      console.error("Block/Unblock error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 md:p-4 h-[10vh] md:h-[12vh] border-b bg-[#2c3e50] text-white">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Mobile Back Button */}
        <button
          onClick={() => setSelectedConversation(null)}
          className="md:hidden text-2xl font-bold"
        >
          ←
        </button>

        {/* Avatar */}
        <div className={`avatar ${isUserOnline() ? "online" : "offline"}`}>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden">
            <img
              src={selectedConversation?.avatar || "/myphoto.png"}
              className="w-full h-full object-cover"
              alt="profile"
            />
          </div>
        </div>

        {/* User Info */}
        <div>
          <h1 className="text-lg md:text-xl font-semibold">
            {selectedConversation?.fullname}
          </h1>

          <span className="text-xs md:text-sm text-gray-300">
            {isBlocked
              ? "🚫 Blocked"
              : isUserOnline()
              ? "🟢 Online"
              : "⚪ Offline"}
          </span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        

        {/* Block Button */}
        <button
          onClick={handleToggleBlock}
          className={`px-3 py-1 rounded-md text-sm ${
            isBlocked
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          {isBlocked ? "Unblock" : "Block"}
        </button>
      </div>
    </div>
  );
}

export default Chatuser;