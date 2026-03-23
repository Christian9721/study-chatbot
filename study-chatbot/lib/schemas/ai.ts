import { z } from "zod"

export const BlockSchema = z.object({
  type: z.enum(["text", "code", "list", "suggestion"]),
  content: z.string(),
  suggestions: z.array(z.string()).optional()
})

export const AIResponseSchema = z.object({
  blocks: z.array(BlockSchema)
})