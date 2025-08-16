import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const {
    selectedConversation,
    setSelectedConversation,
    unseenMap, // ⬅ Get unseen map
    clearUnseen, // ⬅ Clear count when chat opened
  } = useConversation();

  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  const unseenCount = unseenMap[user._id] || 0; // ⬅ Get count for this user

  const handleSelect = () => {
    setSelectedConversation(user);
    clearUnseen(user._id); // ⬅ Reset unseen count when chat opened
  };

  return (
    <div
      className={`hover:bg-[#2ecc71]/20 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={handleSelect} // ⬅ Use handleSelect
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-[#2ecc71]/20 duration-300 cursor-pointer relative">
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
            {user.lastMessage?.text || user.email}
          </span>
        </div>

        {/* ⬇ Show unseen count badge */}
        {unseenCount > 0 && (
          <span className="absolute right-4 top-4 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
            {unseenCount}
          </span>
        )}
      </div>
    </div>
  );
}

export default User;



// this is working properly----------->

// import React from "react";
// import useConversation from "../../statemanage/useConversation.js";
// import { useSocketContext } from "../../context/SocketContext.jsx";

// function User({ user }) {
//   const {
//     selectedConversation,
//     setSelectedConversation,
//   } = useConversation();

//   const isSelected = selectedConversation?._id === user._id;
//   const { onlineUsers } = useSocketContext();
//   const isOnline = onlineUsers.includes(user._id);

//   return (
//     <div
//       className={`hover:bg-[#2ecc71]/20 duration-300 ${
//         isSelected ? "bg-slate-700" : ""
//       }`}
//       onClick={() => setSelectedConversation(user)}
//     >
//       <div className="flex space-x-4 px-8 py-3 hover:bg-[#2ecc71]/20 duration-300 cursor-pointer">
//         <div className={`avatar ${isOnline ? "online" : ""}`}>
//           <div className="w-16 h-16 rounded-full overflow-hidden">
//             <img
//               src={user?.avatar || "/myphoto.png"}
//               className="w-full h-full object-cover"
//               alt="profile"
//             />
//           </div>
//         </div>

//         <div>
//           <h1 className="font-bold">{user.fullname}</h1>
//           <span className="text-sm text-gray-400">
//             {user.lastMessage?.text || user.email}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default User;


// import React from "react";
// import useConversation from "../../statemanage/useConversation.js";
// import { useSocketContext } from "../../context/SocketContext.jsx";
// import { format } from "timeago.js";

// function User({ user }) {
//   const {
//     selectedConversation,
//     setSelectedConversation,
//     unseenMessages,
//     clearUnseen,
//   } = useConversation();

//   const isSelected = selectedConversation?._id === user._id;
//   const { socket, onlineUsers } = useSocketContext();
//   const isOnline = onlineUsers.includes(user._id);
//   const unseenCount = unseenMessages[user._id] || 0;

//   return (
//     <div
//       className={`hover:bg-[#2ecc71]/20 duration-300 ${
//         isSelected ? "bg-slate-700" : ""
//       }`}
//       onClick={() => {
//         setSelectedConversation(user);
//         clearUnseen(user._id);
//       }}
//     >
//       <div className="flex space-x-4 px-8 py-3 hover:bg-[#2ecc71]/20 duration-300 cursor-pointer">
//         <div className={`avatar ${isOnline ? "online" : ""}`}>
//           <div className="w-16 h-16 rounded-full overflow-hidden">
//             <img
//               src={user?.avatar || "/myphoto.png"}
//               className="w-full h-full object-cover"
//               alt="profile"
//             />
//           </div>
//         </div>

//         <div>
//           <h1 className="font-bold">{user.fullname}</h1>
//           <span className="text-sm text-gray-400">
//             {user.lastMessage?.text || user.email}
//           </span>
// {/* 
//           {unseenCount > 0 && (
//             <div className="mt-1">
//               <span className="bg-red-500 text-white text-xs rounded-full px-2">
//                 {unseenCount}
//               </span>
//             </div>
//           )} */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default User;


// 

// import React from "react";
// import useConversation from "../../statemanage/useConversation.js";
// import { useSocketContext } from "../../context/SocketContext.jsx";
// import { format } from "timeago.js";

// function User({ user }) {
//   const { selectedConversation, setSelectedConversation, unseenMessages } = useConversation();
//   const isSelected = selectedConversation?._id === user._id;

//   const { onlineUsers } = useSocketContext();
//   const isOnline = onlineUsers.includes(user._id);

//   const unseenCount = unseenMessages?.[user._id] || 0;

//   const handleClick = () => {
//     setSelectedConversation(user);
//   };

//   return (
//     <div
//       className={`cursor-pointer duration-300 ${isSelected ? "bg-slate-700" : "hover:bg-[#2ecc71]/20"}`}
//       onClick={handleClick}
//     >
//       <div className="flex space-x-4 px-8 py-3 items-center">
//         <div className={`avatar ${isOnline ? "online" : ""}`}>
//           <div className="w-16 h-16 rounded-full overflow-hidden">
//             <img
//               src={user?.avatar || "/myphoto.png"}
//               className="w-full h-full object-cover"
//               alt="profile"
//             />
//           </div>
//         </div>

//         <div className="flex-1">
//           <h1 className="font-bold">{user.fullname}</h1>
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-400">
//               {user.lastMessage?.text || user.email}
//             </span>
//             {unseenCount > 0 && (
//               <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
//                 {unseenCount}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default User;
