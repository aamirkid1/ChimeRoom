import { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../statemanage/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      // ✅ Debug: Check received message
      console.log("New message received:", newMessage);

      
      // Only update messages if the message is for the currently selected conversation
      if (selectedConversation?._id === newMessage.senderId || selectedConversation?._id === newMessage.receiverId) {
        setMessage((prevMessages) => [...prevMessages, newMessage]);
      } else {
        // // Play notification sound for other conversations
        
        // const notification = new Audio(sound);
        // notification.play();
         // ✅ Debug: Ensure this block is triggered
        console.log("Playing Notification Sound 🚀");

        const notification = new Audio(sound);
        notification.volume = 1;  // Ensure volume is max

        notification.play()
          .then(() => {
            console.log("Notification sound played successfully.");
          })
          .catch((err) => {
            console.error("Audio Play Error:", err);
          });

        // Here, you might want to store unseen count (we’ll handle that in another step)
        // E.g. update unseen count for user card
      }
    };

    socket?.on("newMessage", handleNewMessage);
    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedConversation, setMessage]);
};

export default useGetSocketMessage;





// import { useEffect } from "react";
// import { useSocketContext } from "./SocketContext";
// import useConversation from "../statemanage/useConversation.js";
// import sound from "../assets/notification.mp3";

// const useGetSocketMessage = () => {
//   const { socket } = useSocketContext();
//   const { setMessage, selectedConversation } = useConversation();

//   useEffect(() => {
//     const handleNewMessage = (newMessage) => {
//       // Only update messages if the message is for the currently selected conversation
//       if (
//         selectedConversation?._id === newMessage.senderId ||
//         selectedConversation?._id === newMessage.receiverId
//       ) {
//         setMessage((prevMessages) => [...prevMessages, newMessage]);
//       } else {
//         // Play notification sound for other conversations
//         const notification = new Audio(sound);
//         notification.play();
//       }
//     };

//     socket?.on("newMessage", handleNewMessage);
//     return () => {
//       socket?.off("newMessage", handleNewMessage);
//     };
//   }, [socket, selectedConversation, setMessage]);
// };

// export default useGetSocketMessage;


// import React, { useEffect } from "react";
// import { useSocketContext } from "./SocketContext";
// import useConversation from "../statemanage/useConversation.js";
// import sound from "../assets/notification.mp3";
// const useGetSocketMessage = () => {
//   const { socket } = useSocketContext();
//   const { messages, setMessage } = useConversation();



//   useEffect(() => {
//     socket.on("newMessage", (newMessage) => {
//       const notification = new Audio(sound);
//       notification.play();
//       setMessage([...messages, newMessage]);
//     });
//     return () => {
//       socket.off("newMessage");
//     };
//   }, [socket, messages, setMessage]);
// };
// export default useGetSocketMessage;
