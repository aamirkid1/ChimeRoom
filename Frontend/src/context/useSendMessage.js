// import React, { useState } from "react";
// import useConversation from "../statemanage/useConversation.js";
// import axios from "axios";
// const useSendMessage = () => {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessage, selectedConversation } = useConversation();
//   const sendMessages = async (message) => {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `/api/message/send/${selectedConversation._id}`,
//         { message }
//       );
//       setMessage([...messages, res.data]);
//       setLoading(false);
//     } catch (error) {
//       console.log("Error in send messages", error);
//       setLoading(false);
//     }
//   };
//   return { loading, sendMessages };
// };

// export default useSendMessage;

import { useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import api from "../axios"; // ✅ use configured axios

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    if (!selectedConversation?._id) return;
    if (!message?.trim()) return;

    setLoading(true);
    try {
      const res = await api.post(
        `/api/message/send/${selectedConversation._id}`,
        { message },
         { withCredentials: true }  
      );
      // Append only if server accepted (not blocked)
      setMessage([...messages, res.data]);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 403) {
        // Server-side block enforcement is working.
        const reason = error?.response?.data?.error || "Message blocked by policy";
        console.warn("Blocked by server:", reason);
        // Optional: show a toast to the user here.
      } else {
        console.error("Error in send messages:", error?.response?.data || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
