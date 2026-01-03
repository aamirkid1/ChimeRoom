// import React, { useEffect } from "react";
// import useConversation from "../../statemanage/useConversation.js";
// import { useSocketContext } from "../../context/SocketContext.jsx";
// import { CiMenuFries } from "react-icons/ci";

// function Chatuser() {
//   const { selectedConversation } = useConversation();
//   const { onlineUsers } = useSocketContext();

//   useEffect(() => {
//     if (!selectedConversation) {
//       console.log("No conversation selected yet.");
//       return;
//     }

//     console.log("Selected Conversation ID:", selectedConversation._id);
//     console.log("Online Users:", onlineUsers);

//     const isOnline = onlineUsers.includes(selectedConversation._id);
//     console.log("Is user online?", isOnline);
//   }, [selectedConversation, onlineUsers]);

//   // yha tk htana hai baad mai 

//   const getOnlineUsersStatus = (userId) => {
//     return onlineUsers.includes(userId) ? "Online" : "Offline";
//   };

//   return (
//     <div className=" pl-5 pt-5 h-[12vh] flex space-x-4 border-[1px] bg-[#2c3e50] hover:bg-gray-600 duration-300">
//       <div>
//         <div className="avatar online">
//           {/* <div className="w-14 rounded-full">
//             <img src="/myphoto.png" className="w-16 h-16 rounded-full object-cover" alt="profile" />
//           </div> */}
//           <div className="w-16 h-16 rounded-full overflow-hidden">
//             {/* <img src="/myphoto.png" className="w-full h-full object-cover" alt="profile" /> */}
//             <img
//               src={selectedConversation?.avatar || "/myphoto.png"}
//               className="w-full h-full object-cover"
//               alt="profile"
//             />


//           </div>

//         </div>
//       </div>
//       <div>
//         <h1 className="text-xl" >{selectedConversation.fullname}</h1>
//         {/* <h1 className="text-3xl font-bold p-2">{selectedConversation?.name || "No Name"}</h1> */}

//         <span className="text-sm">
//           {getOnlineUsersStatus(selectedConversation._id)}

//         </span>



//       </div>
//     </div>
//   );
// }

// export default Chatuser;


// 

import React, { useEffect } from "react";
import useConversation from "../../statemanage/useConversation.js";   // ✅ make sure Zustand has blockedUsers, addBlockedUser, removeBlockedUser
import { useSocketContext } from "../../context/SocketContext.jsx";
import axios from "axios";

function Chatuser() {
  // ✅ Added blockedUsers, addBlockedUser, removeBlockedUser from Zustand
  const {
    selectedConversation,
    blockedUsers,
    addBlockedUser,
    removeBlockedUser,
  } = useConversation();
  const { onlineUsers } = useSocketContext();

  if (!selectedConversation) return null;

  // ✅ Online check (already existed, just ensure .toString())
  const isUserOnline = () =>
    selectedConversation &&
    onlineUsers.includes(selectedConversation._id.toString());

  // ✅ New: Check if this user is blocked
  const isBlocked = blockedUsers.includes(selectedConversation._id);

  // ✅ New: Function to toggle Block/Unblock
  const handleToggleBlock = async () => {
    try {
      if (isBlocked) {
        // 🔓 Unblock API call
        await axios.post(
          "/api/user/unblock",
          { userIdToUnblock: selectedConversation._id },
          { withCredentials: true }
        );
        removeBlockedUser(selectedConversation._id); // ✅ Update Zustand
      } else {
        // 🚫 Block API call
        await axios.post(
          "/api/user/block",
          { userIdToBlock: selectedConversation._id },
          { withCredentials: true }
        );
        addBlockedUser(selectedConversation._id); // ✅ Update Zustand
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
          {/* ✅ Modified: Show "blocked" status OR Online/Offline */}
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
      {/* ✅ New: Button that toggles Block/Unblock */}
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
