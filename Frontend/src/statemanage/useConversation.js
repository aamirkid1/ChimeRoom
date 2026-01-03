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
          ? updater(state.messages || []) // Ensure messages is an array
          : (Array.isArray(updater) ? updater : []),
    })),

  unseenMap: {}, // { userId: count }

  setUnseenMap: (map) => set({ unseenMap: map }),

  // ⬇ Increase unseen count for specific user
  incrementUnseen: (userId) =>
    set((state) => ({
      unseenMap: {
        ...state.unseenMap,
        [userId]: (state.unseenMap[userId] || 0) + 1,
      },
    })),

  // ⬇ Remove unseen entry for user (reset count)
  clearUnseen: (userId) =>
    set((state) => {
      const updated = { ...state.unseenMap };
      delete updated[userId]; // Instead of setting to 0
      return { unseenMap: updated }; 
    }),

      // 🚨 NEW: block state
  blockedUsers: [],

  setBlockedUsers: (list) => set({ blockedUsers: list }),
  addBlockedUser: (id) =>
    set((state) => ({ blockedUsers: [...state.blockedUsers, id] })),
  removeBlockedUser: (id) =>
    set((state) => ({
      blockedUsers: state.blockedUsers.filter((uid) => uid !== id),
    })),

    
}));

export default useConversation;
