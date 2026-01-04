import React, { useEffect } from "react";
import useConversation from "../../statemanage/useConversation.js";   //  make sure Zustand has blockedUsers, addBlockedUser, removeBlockedUser
import { useSocketContext } from "../../context/SocketContext.jsx";
import axios from "axios";

function Chatuser() {
  //  Added blockedUsers, addBlockedUser, removeBlockedUser from Zustand
  const {
    selectedConversation,
    blockedUsers,
    addBlockedUser,
    removeBlockedUser,
  } = useConversation();
  const { onlineUsers } = useSocketContext();

  if (!selectedConversation) return null;

  //  Online check (already existed, just ensure .toString())
  const isUserOnline = () =>
    selectedConversation &&
    onlineUsers.includes(selectedConversation._id.toString());

  //  New: Check if this user is blocked
  const isBlocked = blockedUsers.includes(selectedConversation._id);

  //  New: Function to toggle Block/Unblock
  const handleToggleBlock = async () => {
    try {
      if (isBlocked) {
        //  Unblock API call
        await axios.post(
          "/api/user/unblock",
          { userIdToUnblock: selectedConversation._id },
          { withCredentials: true }
        );
        removeBlockedUser(selectedConversation._id); // Update Zustand
      } else {
        //  Block API call
        await axios.post(
          "/api/user/block",
          { userIdToBlock: selectedConversation._id },
          { withCredentials: true }
        );
        addBlockedUser(selectedConversation._id); //  Update Zustand
      }
    } catch (error) {
      console.error("Block/Unblock error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 h-[12vh] border-b bg-[#2c3e50] text-white">
      {/* ---------------- Left side: Avatar + user info ---------------- */}
      <div className="flex items-center gap-4">
        <div className={`avatar ${isUserOnline() ? "online" : "offline"}`}>
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={selectedConversation?.avatar || "/myphoto.png"}
              className="w-full h-full object-cover"
              alt="profile"
            />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold">
            {selectedConversation?.fullname}
          </h1>
          {/* Modified: Show "blocked" status OR Online/Offline */}
          <span className="text-sm">
            {isBlocked
              ? "🚫 You blocked this user"
              : isUserOnline()
              ? "Online"
              : "Offline"}
          </span>
        </div>
      </div>

      {/* ---------------- Right side: Block/Unblock button ---------------- */}
      {/*  New: Button that toggles Block/Unblock */}
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
  );
}

export default Chatuser;
