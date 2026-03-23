import ChatContainer from "@/components/Chat/ChatContainer"

export default function ChatPage({
  params
}: {
  params: { chatId: string }
}) {
  return <ChatContainer chatId={params.chatId} />
}