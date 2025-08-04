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


import React, { useEffect } from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isUserOnline = () => {
    if (!selectedConversation) return false;
    return onlineUsers.includes(selectedConversation._id.toString());
  };

  useEffect(() => {
    if (!selectedConversation) {
      console.log("No conversation selected yet.");
      return;
    }

    // console.log("Selected Conversation ID:", selectedConversation._id);
    // console.log("Online Users:", onlineUsers);
    // console.log("Is user online?", isUserOnline());
  }, [selectedConversation, onlineUsers]);

  return (
    <div className="pl-5 pt-5 h-[12vh] flex space-x-4 border-[1px] bg-[#2c3e50] hover:bg-gray-600 duration-300">
      <div>
        <div className={`avatar ${isUserOnline() ? "online" : "offline"}`}>
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={selectedConversation?.avatar || "/myphoto.png"}
              className="w-full h-full object-cover"
              alt="profile"
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl">{selectedConversation?.fullname}</h1>
        <span className="text-sm">
          {isUserOnline() ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;
