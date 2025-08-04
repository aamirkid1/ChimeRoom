// import { create } from "zustand";

// const useConversation = create((set) => ({
//   selectedConversation: null,
//   setSelectedConversation: (selectedConversation) =>
//     set({ selectedConversation }),

//   messages: [],
//   setMessage: (messages) => set({ messages }),

//   // 🔁 unseen message counts per user
//   unseenMap: {},

//   // ✅ Used in Users.jsx
//   setUnseenMap: (map) => set({ unseenMap: map }),

//   incrementUnseenCount: (userId) =>
//     set((state) => ({
//       unseenMap: {
//         ...state.unseenMap,
//         [userId]: (state.unseenMap[userId] || 0) + 1,
//       },
//     })),

//   clearUnseen: (userId) =>
//     set((state) => ({
//       unseenMap: {
//         ...state.unseenMap,
//         [userId]: 0,
//       },
//     })),
// }));

// export default useConversation;


// // import { create } from "zustand";

// // const useConversation = create((set) => ({
// //   selectedConversation: null,
// //   setSelectedConversation: (selectedConversation) =>
// //     set({ selectedConversation, unseenMessages: {} }),

// //   messages: [],
// //   setMessage: (messages) => set({ messages }),

// //   unseenMessages: {},
// //   incrementUnseen: (userId) =>
// //     set((state) => ({
// //       unseenMessages: {
// //         ...state.unseenMessages,
// //         [userId]: (state.unseenMessages[userId] || 0) + 1,
// //       },
// //     })),
// //   clearUnseen: (userId) =>
// //     set((state) => ({
// //       unseenMessages: {
// //         ...state.unseenMessages,
// //         [userId]: 0,
// //       },
// //     })),
// // }));

// // export default useConversation;




// // import { create } from "zustand";

// // const useConversation = create((set) => ({
// //   selectedConversation: null,
// //   setSelectedConversation: (selectedConversation) =>
// //     set({ selectedConversation }),

// //   messages: [],
// //   setMessage: (messages) => set({ messages }),
// // }));

// // export default useConversation;


import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  messages: [],
  setMessage: (updater) =>
    set((state) => ({
      messages:
        typeof updater === "function"
          ? updater(state.messages || [])  // Ensure messages is an array
          : (Array.isArray(updater) ? updater : []),  // fallback to empty array
    })),

  unseenMap: {},

  setUnseenMap: (map) => set({ unseenMap: map }),

  incrementUnseenCount: (userId) =>
    set((state) => ({
      unseenMap: {
        ...state.unseenMap,
        [userId]: (state.unseenMap[userId] || 0) + 1,
      },
    })),

  clearUnseen: (userId) =>
    set((state) => ({
      unseenMap: {
        ...state.unseenMap,
        [userId]: 0,
      },
    })),
}));

export default useConversation;
