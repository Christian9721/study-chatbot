"use client"

import { useChatStore } from "@/store/chat.store"

export default function BlockActions({
  blockId,
  type
}: {
  blockId: string
  type: string
}) {
  const { setActiveBlockReply } = useChatStore()

  return (
    <div className="flex gap-2 mt-2">
      <button onClick={() => setActiveBlockReply(blockId)}>
        Reply
      </button>

      <button>👍</button>
      <button>📌</button>

      {type === "suggestion" && (
        <button className="text-blue-400">
          Quick Action
        </button>
      )}
    </div>
  )
}