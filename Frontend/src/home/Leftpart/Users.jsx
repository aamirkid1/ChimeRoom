import React, { useEffect, useState } from "react";
import User from "./User.jsx";
import useGetAllUsers from "../../context/useGetAllUsers";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Users() {
  const [allUsers, loading] = useGetAllUsers();
  const [lastMessages, setLastMessages] = useState({});
  const { socket } = useSocketContext();
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));

  // 🔁 Listen for new messages
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

  // 🔀 Merge last message data into user objects
  const mergedUsers = allUsers.map((user) => ({
    ...user,
    lastMessage: lastMessages[user._id] || user.lastMessage,
  }));

  // ✅ Sort by latest message time
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


// import React, { useEffect, useState } from "react";
// import User from "./User";
// import useGetAllUsers from "../../context/useGetAllUsers";
// import { useSocketContext } from "../../context/SocketContext.jsx";

// import useConversation from "../../statemanage/useConversation";


// function Users() {
//   const [allUsers, loading] = useGetAllUsers();
//   const [lastMessages, setLastMessages] = useState({});
//   const { socket } = useSocketContext();
//   const authUser = JSON.parse(localStorage.getItem("ChatApp")); // 🔧 Step 2: Get current user

//   const { unseenMap, setUnseenMap, incrementUnseenCount } = useConversation(); // 🔧 Step 3: Zustand state

//   // 🔧 Step 4: Fetch unseen messages from backend on mount
//   useEffect(() => {
//     const fetchUnseenCounts = async () => {
//       try {
//         const res = await fetch(`/api/message/unseen-count/${authUser.user._id}`);
//         const data = await res.json();

//         // const unseen = {};
//         // data.forEach(({ _id, count }) => {
//         //   unseen[_id] = count;
//         // });

//         setUnseenMap(unseen); // ✅ Store in Zustand
//       } catch (err) {
//         console.error("Failed to fetch unseen counts", err);
//       }
//     };

//     if (authUser) fetchUnseenCounts();
//   }, [authUser]);

//   // 🔁 Listen for new messages
//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (message) => {
//       setLastMessages((prev) => ({
//         ...prev,
//         [message.senderId]: {
//           text: message.message,
//           createdAt: message.createdAt,
//         },
//       }));

//       // ✅ Step 5: If sender is NOT the selected conversation, count as unseen
//       if (message.senderId !== useConversation.getState().selectedConversation?._id) {
//         incrementUnseenCount(message.senderId);
//       }
//     };

//     socket.on("newMessage", handleNewMessage);
//     return () => socket.off("newMessage", handleNewMessage);
//   }, [socket]);

//   // 🔀 Merge last message data into user objects
//   const mergedUsers = allUsers.map((user) => ({
//     ...user,
//     lastMessage: lastMessages[user._id] || user.lastMessage,
//   }));

//   // ✅ Sort by latest message time
//   const sortedUsers = mergedUsers.slice().sort((a, b) => {
//     const aTime = new Date(a.lastMessage?.createdAt || 0);
//     const bTime = new Date(b.lastMessage?.createdAt || 0);
//     return bTime - aTime;
//   });

//   return (
//     <div>
//       <h1 className="px-8 py-2 text-white font-semibold bg-[#95a5a6] rounded-md">
//         Messages
//       </h1>
//       <div
//         className="py-2 flex-1 overflow-y-auto"
//         style={{ maxHeight: "calc(84vh - 10vh)" }}
//       >
//         {/* 🔁 Render sorted users */}
//         {sortedUsers.map((user) => (
//           // <User key={user._id} user={user} />
//           <User key={user._id} user={user} unseenCount={unseenMap[user._id] || 0} />

//         ))}
//       </div>
//     </div>
//   );
// }

// export default Users;


// import React from "react";
// import User from "./User";
// import useGetAllUsers from "../../context/useGetAllUsers";
// import { useEffect, useState } from "react";
// import { useSocketContext } from "../../context/SocketContext.jsx";

// function Users() {
//   const [allUsers, loading] = useGetAllUsers();
//   const [lastMessages, setLastMessages] = useState({});
//   const { socket } = useSocketContext();

//     useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (message) => {
//       setLastMessages((prev) => ({
//         ...prev,
//         [message.senderId]: {
//           text: message.message,
//           createdAt: message.createdAt,
//         },
//       }));
//     };

//     socket.on("newMessage", handleNewMessage);

//     return () => socket.off("newMessage", handleNewMessage);
//   }, [socket]);

//   console.log(allUsers);

//     const mergedUsers = allUsers.map((user) => ({
//     ...user,
//     lastMessage: lastMessages[user._id] || user.lastMessage,
//   }));

//   // ✅ 🔁 SORT users by latest message timestamp
//   // const sortedUsers = allUsers.slice().sort((a, b) => {
//     const sortedUsers = mergedUsers.slice().sort((a, b) => {

//     const aTime = new Date(a.lastMessage?.createdAt || 0); // 🧠 If no message, fallback to 0
//     const bTime = new Date(b.lastMessage?.createdAt || 0);
//     return bTime - aTime; // 🟢 Sort descending (latest first)

//   });

//   return (
//     <div>
//       <h1 className="px-8 py-2 text-white font-semibold bg-[#95a5a6] rounded-md">
//         Messages
//       </h1>
//       <div
//         className="py-2 flex-1 overflow-y-auto"
//         style={{ maxHeight: "calc(84vh - 10vh)" }}
//       >
//         {/* {allUsers.map((user, index) => (
//           <User key={index} user={user} />
//         ))} */}

//         {/* ✅ Map over sortedUsers instead of allUsers */}
//         {sortedUsers.map((user) => (
//           <User key={user._id} user={user} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Users;
