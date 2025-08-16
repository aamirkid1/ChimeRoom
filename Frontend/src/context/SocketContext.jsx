import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";
import useConversation from "../statemanage/useConversation";
const socketContext = createContext();

// it is a hook.
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  // ✅ Pull Zustand values for message and unseen count
  const {
    selectedConversation,
    setMessage,
    messages,
    incrementUnseen,
  } = useConversation();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5002", {
        query: {
          userId: authUser.user._id, // yha per authUser.user._id   tha
        },
      });
      



      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
         console.log("Online Users Received:", users); // ✅ Corrected
      });

     


      // ✅ Handle incoming messages
      socket.on("newMessage", (newMessage) => {
        const senderId = newMessage.senderId;

        // ✅ If current chat is open with sender → just show the message
        if (selectedConversation?._id === senderId) {
          setMessage((prev) => [...prev, newMessage]); // ✅ functional update

          // setMessage([...messages, newMessage]);
        } else {
          // ✅ If not selected → increase unseen count
          incrementUnseen(senderId);
        }
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    // }, [authUser]);
  }, [authUser, selectedConversation, messages]); // ✅ Added deps: selectedConversation, messages
  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};

