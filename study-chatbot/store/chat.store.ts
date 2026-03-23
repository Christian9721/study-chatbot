import { create } from "zustand"

type ChatState = {
  activeBlockReply: string | null
  setActiveBlockReply: (id: string | null) => void
}

export const useChatStore = create<ChatState>((set) => ({
  activeBlockReply: null,
  setActiveBlockReply: (id) => set({ activeBlockReply: id })
}))