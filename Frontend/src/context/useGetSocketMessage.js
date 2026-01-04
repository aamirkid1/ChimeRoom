import { useEffect, useRef } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../statemanage/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const {
    setMessage,
    selectedConversation,
    incrementUnseenCount, //  correct name
  } = useConversation();

  const notificationRef = useRef(null);

  useEffect(() => {
    notificationRef.current = new Audio(sound);
    notificationRef.current.volume = 1;
  }, []);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      // Always play sound
      try {
        if (notificationRef.current) {
          notificationRef.current.currentTime = 0;
          notificationRef.current.play().catch(() => {});
        }
      } catch (_) {}

      // If current chat involves this message, append; otherwise increment unseen
      const openChatId = selectedConversation?._id?.toString();
      const fromId = newMessage?.senderId?.toString();
      const toId = newMessage?.receiverId?.toString();

      // if (openChatId && (openChatId === fromId || openChatId === toId)) {
      //   setMessage((prev) => [...prev, newMessage]);
      // } 
      
      if (openChatId && (openChatId === fromId || openChatId === toId)) {
  setMessage((prev) => {
    
    if (prev.some((m) => m._id === newMessage._id)) {
      return prev;
    }
    return [...prev, newMessage];
  });
}

      else if (fromId) {
        incrementUnseenCount(fromId); //  correct call
      }
    };

    socket?.on("newMessage", handleNewMessage);
    return () => socket?.off("newMessage", handleNewMessage);
  }, [socket, setMessage, selectedConversation?._id, incrementUnseenCount]);
};

export default useGetSocketMessage;
