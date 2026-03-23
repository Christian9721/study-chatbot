import { openai } from "@/lib/openai"
import { prisma } from "@/lib/prisma"
import { AIResponseSchema } from "@/lib/schemas/ai"
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { chatId, message } = await req.json()

  // 1. Guardar mensaje usuario
  const userMessage = await prisma.message.create({
    data: {
      chatId,
      role: "user",
      content: message
    }
  })

  // 2. Llamar OpenAI
  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: `
Return ONLY JSON:

{
  "blocks": [
    {
      "type": "text",
      "content": "..."
    }
  ]
}
`
      },
      {
        role: "user",
        content: message
      }
    ]
  })

  const raw = completion.choices[0].message.content || ""

  let parsed

  try {
    parsed = JSON.parse(raw)
  } catch {
    return Response.json({ error: "Invalid JSON from AI" }, { status: 500 })
  }

  const result = AIResponseSchema.safeParse(parsed)

  if (!result.success) {
    return Response.json({ error: "Invalid schema" }, { status: 500 })
  }

  // 3. Guardar mensaje AI
  const aiMessage = await prisma.message.create({
    data: {
      chatId,
      role: "assistant",
      content: raw
    }
  })

  // 4. Guardar bloques
  const blocks = await Promise.all(
    result.data.blocks.map((block, index) =>
      prisma.block.create({
        data: {
          messageId: aiMessage.id,
          index,
          type: block.type,
          content: block.content
        }
      })
    )
  )

  return Response.json({
    message: aiMessage,
    blocks
  })
}