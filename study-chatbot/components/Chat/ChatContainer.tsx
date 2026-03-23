"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sendMessage } from "@/lib/api"
import ChatInput from "./ChatInput"
import Message from "./Message"

export default function ChatContainer({ chatId }: { chatId: string }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      queryClient.setQueryData(["chat", chatId], (old: any) => {
        return {
          ...old,
          messages: [...(old?.messages || []), data.message],
          blocks: [...(old?.blocks || []), ...data.blocks]
        }
      })
    }
  })

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4">
        <Message />
      </div>

      <ChatInput
        onSend={(message) =>
          mutation.mutate({ chatId, message })
        }
      />
    </div>
  )
}