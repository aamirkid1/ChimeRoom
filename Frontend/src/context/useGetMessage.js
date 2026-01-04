import { useEffect, useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import api from "../axios"; //  use configured axios

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    let ignore = false; // guard against state updates after unmount

    const getMessages = async () => {
      if (!selectedConversation?._id) return;
      setLoading(true);
      try {
        const res = await api.get(`/api/message/get/${selectedConversation._id}`, { withCredentials: true }  );
        if (!ignore) setMessage(res.data || []);
      } catch (error) {
        // 403 means you (or they) are blocked -> show empty chat
        if (error?.response?.status === 403) {
          if (!ignore) setMessage([]);
          console.warn("Blocked: server returned 403");
        } else {
          console.error("Error in getting messages:", error?.response?.data || error.message);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    getMessages();
    return () => { ignore = true; };
  }, [selectedConversation?._id, setMessage]);

  return { loading, messages };
};

export default useGetMessage;
