import React, { useMemo } from "react";
import {
  format,
  isToday,
  isYesterday,
  differenceInDays,
} from "date-fns";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-gray-300" : "bg-[#99e2c2]";

  const createdAt = message.createdAt ? new Date(message.createdAt) : null;

  if (!createdAt || isNaN(createdAt)) {
    console.warn("Invalid message.createdAt:", message.createdAt);
    return null; // or <div>Invalid timestamp</div>
  }

  const formattedTime = useMemo(() => {
    if (isToday(createdAt)) {
      const diffMins = Math.floor((new Date() - createdAt) / (1000 * 60));
      if (diffMins < 1) {
        return "just now";
      } else if (diffMins < 60) {
        return `${diffMins} minutes ago`;
      } else {
        return `Today at ${format(createdAt, "h:mm a")}`;
      }
    } else if (isYesterday(createdAt)) {
      return `Yesterday at ${format(createdAt, "h:mm a")}`;
    } else if (differenceInDays(new Date(), createdAt) < 2) {
      return `${format(createdAt, "EEEE")} at ${format(createdAt, "h:mm a")}`;
    } else {
      return `${format(createdAt, "MMM d, yyyy 'at' h:mm a")}`;
    }
  }, [createdAt]);

  return (
    <div className="p-4">
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-[#2c3e50] ${chatColor}`}>
          {message.message}
        </div>
        <div className="chat-footer text-xs mt-1 text-black">{formattedTime}</div>
      </div>
    </div>
  );
}

export default Message;


// import React from "react";
// // import { format } from "timeago.js";
// import {
//   format,
//   isToday,
//   isYesterday,
//   formatDistanceToNow,
//   differenceInDays,
// } from "date-fns";


// function Message({ message }) {
//   const authUser = JSON.parse(localStorage.getItem("ChatApp"));
//   const itsMe = message.senderId === authUser.user._id;

//   const chatName = itsMe ? " chat-end" : "chat-start";
//   const chatColor = itsMe ? "bg-gray-300" : "bg-[#99e2c2]";

  


//   // const createdAt = new Date(message.createdAt);
//   // const formattedTime = createdAt.toLocaleTimeString([], {
//   //   hour: "2-digit",
//   //   minute: "2-digit",
//   // });

//   //  const formattedTime = format(message.createdAt);

//   const formattedTime = useMemo(() => {
//     if (isToday(createdAt)) {
//       const diffMins = Math.floor((new Date() - createdAt) / (1000 * 60));
//       if (diffMins < 1) {
//         return "just now";
//       } else if (diffMins < 60) {
//         return `${diffMins} minutes ago`;
//       } else {
//         return `Today at ${format(createdAt, "h:mm a")}`;
//       }
//     } else if (isYesterday(createdAt)) {
//       return `Yesterday at ${format(createdAt, "h:mm a")}`;
//     } else if (differenceInDays(new Date(), createdAt) < 2) {
//       return `${format(createdAt, "EEEE")} at ${format(createdAt, "h:mm a")}`;
//     } else {
//       return `${format(createdAt, "MMM d, yyyy 'at' h:mm a")}`;
//     }
//   }, [createdAt]);


//   return (
//     <div>
//       <div className="p-4">
//         <div className={`chat ${chatName}`}>
//           <div className={`chat-bubble text-[#2c3e50] ${chatColor}`}>
//             {message.message}
//           </div>
//           <div className="chat-footer text-xs mt-1 text-black">{formattedTime}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Message;
