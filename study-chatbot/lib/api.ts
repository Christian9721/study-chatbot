export async function sendMessage(data: {
  chatId: string
  message: string
}) {
  const res = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify(data)
  })

  if (!res.ok) throw new Error("Error sending message")

  return res.json()
}